
module.exports = {
    // Application Port
    port: 3000,

    // Patient ID for Sample Data - Just needed for test
    ptId: 12345,

    // Valid Data Types
    datatypes: ['allergies', 'medicians', 'problems'],

    // Transformation Types
    jsonata_maps: {
        "TransformA-Allergy-UI2openEHR": `{
            "allergies_and_adverse_reactions": {
              "adverse_reaction_risk": {
                "causative_agent": {
                  "value": cause,
                  "code": causeCode,
                  "terminology": causeTerminology
                },
                "reaction_details": {
                  "manifestation": {
                    "code": terminologyCode,
                    "value": reaction
                  }
                }
              }
            },
            "composer": {
              "value": author
            },
            "start_time": $fromMillis(dateCreated),
            "host": source,
            "uid": sourceId,
            "patientId": patientId
          }`,
        "TransformB-Allergy-UI2FHIR": `{
            "resourceType": "AllergyIntolerance",
            "identifier": [
              {
                "system": source,
                "value": sourceId
              }
            ],
            "onset": $fromMillis(dateCreated),
            "recordedDate": $fromMillis(dateCreated),
            "recorder": {
              "reference": "GMC Doctor",
              "display": author
            },
            "patient": {
              "reference": "=> fhirReference(patientId, 'Patient', false)",
              "display": "{{patientName}}"
            },
            "substance": {
              "coding": [
                {
                  "system": causeCode,
                  "code": causeTerminology,
                  "display": cause
                }
              ]
            },
            "status": "active",
            "type": "allergy",
            "category": "other",
            "reaction": [
              {
                "substance": {
                  "coding": [
                    {
                      "system": causeCode,
                      "code": causeTerminology,
                      "display": cause
                    }
                  ],
                  "text": cause
                },
                "certainty": "confirmed",
                "manifestation": [
                  {
                    "coding": [
                      {
                        "system": terminologyCode,
                        "code": "TBC",
                        "display": reaction
                      }
                    ],
                    "text": reaction
                  }
                ],
                "description": reaction
              }
            ],
            "note": reaction
            
            }`,
    },

    // Sample Data
    sample_data: {
      'allergies': {
          "author": "Dr George Shannon",
          "cause": "allergy to penicillin",
          "causeCode": "SNOMED-CT",
          "causeTerminology": 91936005,
          "dateCreated": 1482178262000,
          "originalComposition": "",
          "originalSource": "",
          "reaction": "eruption due to drug",
          "source": "ethercis",
          "sourceId": "74d1e386-5c2e-404c-bf65-29e3344285ef",
          "terminologyCode": "SNOMED-CT"
      },
      'medicians': {
          "author": "c4h_ripple_osi",
          "dateCreated": 1446482102197,
          "doseAmount": "1000mg",
          "doseDirections": "Orally",
          "doseTiming": "Orally Daily",
          "medicationCode": "DefaultCode",
          "medicationTerminology": "SNOMED-CT",
          "name": "Amoxicillin",
          "route": "RouteValue",
          "source": "Marand",
          "sourceId": "ba75d477-5ad4-4ad6-b126-94bd2324c101",
          "startDate": 1448629200000,
          "startTime": 46800000
      },
      'problems': {
          "author": "Dr Tony Shannon",
          "code": 299757012,
          "dateCreated": 1445458262000,
          "dateOfOnset": 963833437553,
          "description": "",
          "problem": "angina pectoris",
          "source": "EtherCIS",
          "sourceId": "12f02a05-a14f-4b35-be45-9e52bbe535ed",
          "terminology": "SNOMED-CT"
      }
    }
};
