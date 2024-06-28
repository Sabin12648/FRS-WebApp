import axios from 'axios';

const fetchItems = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/items');
    console.log(response.data);
  } catch (error) {
    console.error("There was an error fetching items!", error);
  }
};

const addItem = async (item: { name: string, description?: string }) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/items', item);
    console.log(response.data);
  } catch (error) {
    console.error("There was an error adding the item!", error);
  }
};
