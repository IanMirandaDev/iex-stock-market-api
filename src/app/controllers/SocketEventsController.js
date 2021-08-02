import StockMarketService from '../services/StockMarketService.js';

async function GetStockData(socket, symbol) {
	try {
		const StockMarket = new StockMarketService(symbol);
		const quoteData = await StockMarket.getQuoteData();
        
		const ResponseData = {
			title: `${quoteData.companyName} (${quoteData.symbol})`,
			quoteData
		};
        
		const now = new Date();
        
		if (now > socket.updateCompanyTime || now > socket.newRequestTime) {
			ResponseData.companyData = await StockMarket.getCompanyData();
		}
        
		return ResponseData;
	} catch(err) {
		console.error(err);
		return { error: 'Server error on get company and quote data' };
	}
}

class SocketEventsController {
	constructor(io) {
		io.on('connection', (socket) => {
			socket.on('newPage', (symbol) => this.newEvents(socket, symbol));
            
			socket.on('changeCompany', (symbol) => this.newEvents(socket, symbol));
		});
	}
    
	newEvents(socket, symbol) {
		const now = new Date();
		now.setSeconds(now.getSeconds() - 30);
		socket.newRequestTime = new Date(now);

		const updateCompanyTime = new Date(socket.handshake.time);
		socket.updateCompanyTime = updateCompanyTime.setHours(updateCompanyTime.getHours() + 24);

		const updatesInterval = this.emitUpdatesByInterval(socket, symbol);
        
		socket.on('changeCompany', () => this.clearOldInterval(updatesInterval));
        
		socket.on('disconnect', () => this.clearOldInterval(updatesInterval));
	}
    
	emitUpdatesByInterval(socket, symbol) {
		async function emitQuoteData() {
			const stockData = await GetStockData(socket, symbol);
            
			return socket.emit('quoteUpdate', stockData);
		}
        
		emitQuoteData();
		return setInterval(emitQuoteData, 5000);
	}
    
	clearOldInterval(oldInterval) {
		if (!oldInterval._destroyed) {
			clearInterval(oldInterval);
		}
	}
}

export default SocketEventsController;