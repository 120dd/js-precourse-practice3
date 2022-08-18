export class DataPersister {
	constructor() {
		if (this.constructor === DataPersister) {
			throw new Error('추상 클래스는 직접 객체를 생성할 수 없습니다');
		}
	}

	// eslint-disable-next-line no-unused-vars
	save(key, value) {
		throw new Error('save 메소드가 오버라이딩 되지 않았습니다');
	}

	// eslint-disable-next-line no-unused-vars
	load(key) {
		throw new Error('save 메소드가 오버라이딩 되지 않았습니다');
	}
}
