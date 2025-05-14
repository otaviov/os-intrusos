import axios from 'axios';

export const buscarLocalizacoes = async (query) => {
  if (!query) return [];

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 5,
        countrycodes: 'br', // só Brasil
        'accept-language': 'pt-BR',
      },
      headers: {
        'User-Agent': 'os-intrusos-app/1.0 (seuemail@example.com)',
      },
    });

    return response.data
      .filter(item => item.address.state === 'Pernambuco') // só PE
      .map(item => {
        const cidade = item.address.city || item.address.town || item.address.village || '';
        const estado = item.address.state || '';
        return {
          nome: `${cidade}${estado ? ' - ' + estado : ''}`,
          full: item.display_name,
          lat: item.lat,
          lon: item.lon,
        };
      });
  } catch (error) {
    console.error('Erro ao buscar localizações:', error);
    return [];
  }
};
