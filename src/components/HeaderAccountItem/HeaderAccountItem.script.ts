
class TriadsNumbers
{

	protected initialValues: [{value: string, source: HTMLElement}] | any = []
	protected numberPrefixes = {2:'k', 3:'m', 4:'b'}
	protected lock: boolean = false

	constructor () {
		const counts = document.querySelectorAll('.header-account-item__count')
		counts.forEach(el => this.initialValues.push({
			value: el.innerHTML,
			source: el as HTMLElement
		}))
	}

	protected _getTriads (value: string): string[] {
		return value.replace(/[^0-9]/gi, '').match(/[0-9]{1,3}(?=([0-9]{3}|)+$)/g)
	}

	protected _handleTriads (triads: string[]): string {
		const resultLength = triads.join('').length
		if (triads.length >= 2 && resultLength >= 6) {
			return triads[0] + (triads[1][0] !== '0' ? '.' + triads[1][0] : '') + this.numberPrefixes[triads.length]
		}
		return triads.join(' ')
	}

	public init (): void {
		this.initialValues.forEach(el => {
			el.source.innerText = window.innerWidth < 600
				? this._handleTriads(this._getTriads(el.value))
				: this._getTriads(el.value).join(' ')
		})

		window.addEventListener('resize', () => {
			if (window.innerWidth < 600 && this.lock === false) {
				this.lock = true
				this.initialValues.forEach(el => {
					el.source.innerText = this._handleTriads(this._getTriads(el.value))
				})
			}
			if (window.innerWidth > 600 && this.lock === true) {
				this.lock = false
				this.initialValues.forEach(el => {
					el.source.innerText = this._getTriads(el.value).join(' ')
				})
			}
		})
	}
}

export default TriadsNumbers