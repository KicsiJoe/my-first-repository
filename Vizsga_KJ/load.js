export const loadData = async (country, terulet_1, terulet_2) => {
  

   try {
    const terulet_Eset = await eset(country, terulet_1)
    const terulet_vakcina = await vakcina(country, terulet_2)
    const osszegzes = [terulet_Eset, terulet_vakcina]
    return osszegzes;
    
} catch (error) {
    console.error('Error loading vaccines data', error);
    throw error;
}

}

const eset = async (country, terulet_1) => {
    const response = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`)
    if (response.status !== 200) {
        throw "Error loading problem"
    }
    const jsonResponse = await response.json();
    return jsonResponse.All[terulet_1];
}



const vakcina = async (country, terulet_2) => {
    const response = await fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${country}`)
    if (response.status !== 200) {
        throw "Error loading problem"
    }
    const jsonResponse = await response.json();
    return jsonResponse.All[terulet_2];
}

