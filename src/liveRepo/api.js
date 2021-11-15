import axios from 'axios';

class LiveRepo {
	constructor({ url, endpoint = '/live', id }) {
		// Must pass in url and id
		this.url = url;
		this.endpoint = `${endpoint}/${id}`;
	}

	async getLive() {
		try {
			const response = await axios.get(this.url + this.endpoint);
			return response.data;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}

}

class LiveMockRepo {
	async getLive() {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		return {
			liveName: 'เพลงเดือด เพลงเศร้ามาทางนี้',
			cast: 'เพลงเดือด เพลงเศร้าโดย DJ Toto',
			djName: 'snoopy',
			port: '7938.18.41',
			listener: '1',
			comments: [
				{	
					sbName : 'sb',
					sbComment: '1'
				},
				{	
					sbName : 'sb',
					sbComment: '2'
				},{	
					sbName : 'sb',
					sbComment: '3'
				},{	
					sbName : 'sb',
					sbComment: '4'
				},{	
					sbName : 'sb',
					sbComment: '5'
				},{	
					sbName : 'sb',
					sbComment: '6'
				}
			],
			musicName: 'krypyonite',
			musicID: 'Numcha'
		};
	}
}

function getLiveRepo({ url, env, id }) {
	if (env === 'development') {
		return new LiveMockRepo();
	}
  return new LiveMockRepo();
	// return new LiveRepo({ url, id });
}

export { LiveRepo, LiveMockRepo, getLiveRepo };