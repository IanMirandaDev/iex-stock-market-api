import StockMarketService from '../services/StockMarketService.js';

async function getQuoteData(symbol) {
	try {
		const stockMarket = new StockMarketService(symbol);
		const quoteData = await stockMarket.getQuoteData();

		quoteData.title = `${quoteData.companyName} (${quoteData.symbol})`;
		return quoteData;
	} catch(err) {
		console.error('err');
		return 'error';
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
		const updatesInterval = this.emitUpdatesByInterval(socket, symbol);
        
		socket.on('changeCompany', () => this.clearOldInterval(updatesInterval));
        
		socket.on('disconnect', () => this.clearOldInterval(updatesInterval));
	}
    
	emitUpdatesByInterval(socket, symbol) {
		async function emitQuoteData() {
			const quoteData = await getQuoteData(symbol);
            
			return socket.emit('quoteUpdate', quoteData);
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