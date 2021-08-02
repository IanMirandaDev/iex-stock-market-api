import process from 'process';
import axios from 'axios';

function IEXClientRequest(url) {
	return axios.get(url, {
		params: {
			token: process.env.IEX_SECRET_TOKEN,
			displayPercent: true
		}
	});
}

class IEXClient {
	constructor(symbol) {
		this.baseUrl = `https://cloud.iexapis.com/${process.env.IEX_API_VERSION}/stock/${symbol}`;
	}

	async getCompanyData() {
		try {
			const url = `${this.baseUrl}/company`;
			const { data, status } = await IEXClientRequest(url);
            
			if (status !== 200) {
				return { error: 'IEX request error on get company data' };
			}

			return data;
		} catch(err) {
			console.error(err);
			return { error: 'Server error on get company data' };
		}
	}

	async getQuoteData() {
		try {
			const url = `${this.baseUrl}/quote`;
			const { data, status } = await IEXClientRequest(url);

			if (status !== 200) {
				return { error: 'IEX request error on get quote data' };
			}

			return data;
		} catch(err) {
			console.error(err);
			return { error: 'Server error on get quote data' };
		}
	}
}

export default IEXClient;