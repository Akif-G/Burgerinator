import axios from 'axios';

const instance=axios.create({
    baseURL:"https://react-my-burger-387a1.firebaseio.com"
});

export default instance;