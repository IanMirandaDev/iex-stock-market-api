import IEXClient from '../../modules/IEXClient.js';

async function getCompanyData(symbol) {
	try {
		const IEX = new IEXClient(symbol);

		// save in database

		return IEX.getCompanyData();
	} catch(err) {
		console.error(err);
		return err;
	}
}

async function getQuoteData(symbol) {
	try {
		const IEX = new IEXClient(symbol);
		const quoteData = await IEX.getQuoteData();

		const changePercentFormatted = new Intl.NumberFormat('nu', { maximumFractionDigits: 2 }).format(quoteData.changePercent) + '%';
		quoteData.quoteChangeClassView = 'text-danger';

		if (quoteData.change > 0) {
			quoteData.change = '+'+quoteData.change;
			quoteData.quoteChangeClassView = 'text-success';
		}
		const quoteChange = `${quoteData.change} (${changePercentFormatted})`;

		quoteData.quoteChange = quoteChange;

		return quoteData;
	} catch(err) {
		console.error(err);
		return err;
	}
}

class HomePageController {
	async show(req, res) {
		try {
			const symbol = 'aapl';

			const companyData = await getCompanyData(symbol);

			if (companyData.website && companyData.website.split('https://').length < 2) {
				companyData.website = 'https://'+companyData.website;
			}

			const quoteData = await getQuoteData(symbol);

			const viewData = { 
				title: `${companyData.companyName} (${companyData.symbol})`,
				companyData,
				quoteData
			};
            
			return res.render('home', viewData);
		} catch(err) {
			console.error(err);
			return res.json('Server error on get company details');
		}
	}
}

export default new HomePageController();