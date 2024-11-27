import { makeApiGetCall } from '@/api/api' 
import {  API_ENDPOINTS,LOCAL_STORAGE_KEYS } from '@/constants/index.js'

const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)


  const getZones = async (level_id, parent_id) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken); // Récupère le token (s'il existe)
  let params = new URLSearchParams();

  // Ajout conditionnel des paramètres
  if (level_id !== null && level_id !== undefined) {
    params.append('level_id', level_id);
  }

  if (parent_id !== null && parent_id !== undefined) {
    params.append('parent_id', parent_id);
  }

  try {
    const headers = {};

    // Inclure l'en-tête d'authentification seulement si le token est disponible
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const response = await makeApiGetCall(
      `${API_ENDPOINTS.zone}?${params.toString()}`,
      headers
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching zones:', error);
    throw error;
  }
};

  const getSpecificZones = async (id) => {

    try {
      const response = await makeApiGetCall(
        `${API_ENDPOINTS.zone}/${id}`
      )
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching zones:', error);
      throw error;
    }
  }
const getSpecificMapZones = async (parent_id, name, size, level_id, token) => {
  let defaulWithVector = 1;
  let params = new URLSearchParams();

  // Check each parameter and only set if not null or undefined
if (parent_id != null && parent_id !== '') {
  params.append('parent_id', parent_id.toString());
}

if (name != null && name.trim() !== '') {
  params.append('code', name.toString());
}

if (size != null && size !== '') {
  params.append('size', size.toString());
}

if (defaulWithVector != null && defaulWithVector !== '') {
  params.append('with_vector', defaulWithVector.toString());
}


  try {
    const response = await makeApiGetCall(
      `${API_ENDPOINTS.zone}?${params.toString()}`,
      token || authToken
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching zones:', error);
    throw error;
  }
}

const getSpecificMapZonesWithName = async (parent_id, name, size, level_id, token) => {
  let defaulWithVector = 1;
  let params = new URLSearchParams();

  // Check each parameter and only set if not null or undefined
if (parent_id != null && parent_id !== '') {
  params.append('parent_id', parent_id.toString());
}

if (name != null && name.trim() !== '') {
  params.append('name', name.toString());
}

if (size != null && size !== '') {
  params.append('size', size.toString());
}

if (defaulWithVector != null && defaulWithVector !== '') {
  params.append('with_vector', defaulWithVector.toString());
}


  try {
    const response = await makeApiGetCall(
      `${API_ENDPOINTS.zone}?${params.toString()}`,
      token || authToken
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching zones:', error);
    throw error;
  }
};

  


  export {getZones,getSpecificZones,getSpecificMapZones,getSpecificMapZonesWithName}