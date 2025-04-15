// Définition de l'interface Candidate pour décrire la structure des données d'un candidat
export interface Candidate {
  id: number;         // Identifiant unique du candidat
  lastname: string;   // Nom de famille du candidat
  name: string;       // Prénom du candidat
  email: string;      // Email du candidat
  tel: string;        // Numéro de téléphone du candidat
  poste: string;      // Poste visé par le candidat
  message: string;    // Message laissé par le candidat
  cv: string;         // URL ou chemin vers le CV du candidat
  status: string;     // Statut du candidat (ex: Nouveau, Accepté, Refusé, etc.)
}

// Fonction pour récupérer tous les candidats
// Cette fonction fait un appel à l'API pour obtenir la liste complète des candidats
export function fetchCandidates(): Promise<Candidate[]> {
  return fetch('/api/candidates')  // Appel GET à l'API pour récupérer les candidats
    .then((response) => {
      if (!response.ok) throw new Error('Erreur de récupération des candidats');  // Gestion des erreurs si la réponse n'est pas OK
      return response.json();  // Renvoie les données JSON de la réponse
    });
}

// Fonction pour ajouter un nouveau candidat
// Cette fonction fait un appel à l'API avec une méthode POST pour ajouter un candidat
export function addCandidate(candidate: Candidate): Promise<Candidate> {
  return fetch('/api/candidates', {
    method: 'POST',  // Méthode POST pour créer un nouvel élément
    headers: {
      'Content-Type': 'application/json',  // Spécifie que le corps de la requête contient du JSON
    },
    body: JSON.stringify(candidate),  // Convertit l'objet `candidate` en chaîne JSON pour l'envoyer
  })
    .then((response) => {
      if (!response.ok) throw new Error('Erreur d\'ajout du candidat');  // Gestion des erreurs si la réponse n'est pas OK
      return response.json();  // Renvoie le candidat ajouté au format JSON
    });
}

// Fonction pour mettre à jour un candidat existant
// Cette fonction fait un appel PUT à l'API pour modifier un candidat
export function updateCandidate(candidate: Candidate): Promise<Candidate> {
  return fetch(`/api/candidates/${candidate.id}`, {
    method: 'PUT',  // Méthode PUT pour mettre à jour un candidat existant
    headers: {
      'Content-Type': 'application/json',  // Spécifie que le corps de la requête contient du JSON
    },
    body: JSON.stringify(candidate),  // Convertit l'objet `candidate` en chaîne JSON pour l'envoyer
  })
    .then((response) => {
      if (!response.ok) throw new Error('Erreur de mise à jour du candidat');  // Gestion des erreurs si la réponse n'est pas OK
      return response.json();  // Renvoie le candidat mis à jour au format JSON
    });
}

// Fonction pour supprimer un candidat
// Cette fonction fait un appel DELETE à l'API pour supprimer un candidat par son ID
export function deleteCandidate(id: number): Promise<void> {
  return fetch(`/api/candidates/${id}`, {
    method: 'DELETE',  // Méthode DELETE pour supprimer un candidat
  })
    .then((response) => {
      if (!response.ok) throw new Error('Erreur de suppression du candidat');  // Gestion des erreurs si la réponse n'est pas OK
    });
}
