import process from 'process';
import axios from 'axios';

async function Connection(url) {
	return axios.get(url, {
		params: {
			token: process.env.IEX_SECRET_TOKEN
		}
	});
}

class IEXClient {
	constructor(symbol) {
		this.baseUrl = `https://cloud.iexapis.com/${process.env.IEX_API_VERSION}/stock/${symbol}`;
	}

	async getQuoteData() {
		try {
			const url = `${this.baseUrl}/quote`;
			const { data, status } = await Connection(url);
            
			if (status !== 200) {
				return {
					error: 'IEX request error'
				};
			}

			return data;
		} catch(err) {
			console.error(err);
			return err;
		}
	}
	
	async getCompanyData() {
		try {
			const url = `${this.baseUrl}/company`;
			const { data, status } = await Connection(url);
        
			if (status !== 200) {
				return {
					error: 'IEX request error'
				};
			}

			return data;
		} catch(err) {
			console.error(err);
			return err;
		}
	}
}

export default IEXClient;