export class DataPersister {
	setPersistData(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	getPersistData(key) {
		return JSON.parse(localStorage.getItem(key));
	}
}
