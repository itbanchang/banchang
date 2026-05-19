// ============================================================
// BCH 360° Intelligence V.10 - HL7 FHIR Middleware
// Integration layer for Hospital Information System (HIS)
// ============================================================

/**
 * HL7 FHIR R4 Middleware for HIS Integration
 * Transforms hospital data to/from FHIR format
 * Supports: Patient, Encounter, Condition, Claim, Observation resources
 */

const FHIR_BASE_URL = process.env.HIS_FHIR_URL || 'http://localhost:8080/fhir';

/**
 * Transform internal patient data to FHIR Patient resource
 */
export function toFHIRPatient(patient) {
    return {
        resourceType: 'Patient',
        id: patient.patient_id,
        meta: { lastUpdated: new Date().toISOString() },
        identifier: [{
            system: 'urn:oid:2.16.764.1.4.100.3.2.1', // Thai National ID
            value: patient.patient_id
        }],
        name: [{
            use: 'official',
            text: patient.patient_name
        }],
        gender: patient.gender === 'M' ? 'male' : patient.gender === 'F' ? 'female' : 'other',
        ...(patient.age && {
            birthDate: new Date(Date.now() - patient.age * 365.25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        })
    };
}

/**
 * Transform internal admission to FHIR Encounter resource
 */
export function toFHIREncounter(admission) {
    return {
        resourceType: 'Encounter',
        id: admission.id,
        status: admission.status === 'active' ? 'in-progress' : 'finished',
        class: {
            system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
            code: 'IMP',
            display: 'inpatient encounter'
        },
        subject: { reference: `Patient/${admission.patient_id}` },
        period: {
            start: admission.admission_date,
            ...(admission.actual_discharge && { end: admission.actual_discharge })
        },
        diagnosis: admission.diagnosis ? [{
            condition: { display: admission.diagnosis },
            use: { text: 'admission' }
        }] : [],
        participant: admission.attending_physician ? [{
            individual: { display: admission.attending_physician }
        }] : []
    };
}

/**
 * Transform vital signs to FHIR Observation resource (bundle)
 */
export function toFHIRVitalSigns(vitals) {
    const observations = [];

    const vitalMappings = [
        { code: '8867-4', display: 'Heart rate', value: vitals.heart_rate, unit: 'beats/min' },
        { code: '8480-6', display: 'Systolic BP', value: vitals.systolic_bp, unit: 'mmHg' },
        { code: '8462-4', display: 'Diastolic BP', value: vitals.diastolic_bp, unit: 'mmHg' },
        { code: '9279-1', display: 'Respiratory rate', value: vitals.respiratory_rate, unit: 'breaths/min' },
        { code: '8310-5', display: 'Body temperature', value: vitals.temperature, unit: 'Cel' },
        { code: '2708-6', display: 'SpO2', value: vitals.spo2, unit: '%' }
    ];

    vitalMappings.forEach(v => {
        if (v.value != null) {
            observations.push({
                resourceType: 'Observation',
                id: `${vitals.id}-${v.code}`,
                status: 'final',
                category: [{ coding: [{ system: 'http://terminology.hl7.org/CodeSystem/observation-category', code: 'vital-signs' }] }],
                code: { coding: [{ system: 'http://loinc.org', code: v.code, display: v.display }] },
                subject: { reference: `Patient/${vitals.patient_id}` },
                effectiveDateTime: vitals.recorded_at,
                valueQuantity: { value: v.value, unit: v.unit, system: 'http://unitsofmeasure.org' }
            });
        }
    });

    return {
        resourceType: 'Bundle',
        type: 'collection',
        entry: observations.map(obs => ({ resource: obs }))
    };
}

/**
 * Transform claim to FHIR Claim resource
 */
export function toFHIRClaim(claim) {
    return {
        resourceType: 'Claim',
        id: claim.id,
        status: claim.status === 'approved' ? 'active' : claim.status === 'denied' ? 'cancelled' : 'draft',
        type: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/claim-type', code: 'institutional' }] },
        patient: { reference: `Patient/${claim.patient_id}` },
        created: claim.submission_date || claim.created_at,
        provider: { display: 'BCH Hospital' },
        priority: { coding: [{ code: 'normal' }] },
        diagnosis: [{
            sequence: 1,
            diagnosisCodeableConcept: {
                coding: [{ system: 'http://hl7.org/fhir/sid/icd-10', code: claim.icd10_primary }]
            }
        }],
        total: { value: claim.total_amount, currency: 'THB' },
        insurance: [{ coverage: { display: claim.payer_type } }]
    };
}

/**
 * Fetch data from external HIS via FHIR API
 * @param {string} resourceType - FHIR resource type (Patient, Encounter, etc.)
 * @param {Object} params - Search parameters
 */
export async function fetchFromHIS(resourceType, params = {}) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `${FHIR_BASE_URL}/${resourceType}?${queryString}`;

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/fhir+json',
                'Authorization': `Bearer ${process.env.HIS_API_TOKEN || ''}`
            }
        });

        if (!response.ok) {
            throw new Error(`HIS API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`FHIR fetch error (${resourceType}):`, error.message);
        return null;
    }
}

/**
 * Express middleware for FHIR response format
 */
export function fhirResponseMiddleware(req, res, next) {
    if (req.headers.accept?.includes('fhir+json')) {
        req.wantsFHIR = true;
    }
    next();
}

export default {
    toFHIRPatient,
    toFHIREncounter,
    toFHIRVitalSigns,
    toFHIRClaim,
    fetchFromHIS,
    fhirResponseMiddleware
};
