/** Global State 
 * @returns {Object} 
 * store: data to be shared across components.
 * 
 * actions: functions to be called by components.
*/
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            access_token: '',
            base_url: process.env.REACT_APP_URL_BACKEND,
            bucket_name: process.env.REACT_APP_BUCKET_NAME,
            billing_url: process.env.REACT_APP_BILLING_URL,
            allImages: null,
            
        },
        actions: {
            /**
             * Get especific public images from modyo
             * THIS IS USED TO GET PUBLIC images
             * @param {number} page 
             * @returns 
             */

            getAllImages: async (page) => {
                const store = getStore();
                const options = {
                    method: 'GET',
                    headers: {
                        /* 'X-RapidAPI-Key': '75e515f612msh600b868c18b42dep1f7478jsnbddde5a396c2',
                        'X-RapidAPI-Host': 'pokedex2.p.rapidapi.com' */
                    }
                };
                try {
                    const response = await fetch(`https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=${page}`, options)
                    if (response.status === 200) {
                        const data = await response.json();
                        let newData = [...data.entries, ...data.entries].sort(() => Math.random() - 0.5);
                        setStore({
                            allImages: newData,
                        });
                        return data;
                    }
                } catch (e) {
                    console.error(e);
                }
                
            },
        }
    }
};
export default getState;