// actions.ts
export interface Candidate {
  id: number;
  lastname: string;
  name: string;
  email: string;
  tel: string;
  poste: string;
  message: string;
  cv: string;
  status: string;
}

// Fonction pour récupérer tous les candidats
export function fetchCandidates(): Promise<Candidate[]> {
  return fetch('/api/candidates')
    .then((response) => {
      if (!response.ok) throw new Error('Erreur de récupération des candidats');
      return response.json();
    });
}

// Fonction pour ajouter un candidat
export function addCandidate(candidate: Candidate): Promise<Candidate> {
  return fetch('/api/candidates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(candidate),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Erreur d\'ajout du candidat');
      return response.json();
    });
}

// Fonction pour mettre à jour un candidat
export function updateCandidate(candidate: Candidate): Promise<Candidate> {
  return fetch(`/api/candidates/${candidate.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(candidate),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Erreur de mise à jour du candidat');
      return response.json();
    });
}

// Fonction pour supprimer un candidat
export function deleteCandidate(id: number): Promise<void> {
  return fetch(`/api/candidates/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) throw new Error('Erreur de suppression du candidat');
    });
}
