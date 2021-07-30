import Scrollbar, { default as PerfectScrollbar } from 'perfect-scrollbar'

class ShopTabsWrapperScroll {

	private wrapper: HTMLElement
	private cover: HTMLElement
	private scrollbar: PerfectScrollbar

	constructor () {
		this.wrapper = document.querySelector('.shop-tabs-wrapper')
		this.cover = document.querySelector('.shop__cover')
	}

	private _scrollBarInit (): void {
		this.scrollbar = new Scrollbar(this.wrapper, {
			swipeEasing: true
		})
	}

	init (): void {
		this._scrollBarInit()
		this.wrapper.addEventListener('scroll', () => {
			if (this.wrapper.scrollHeight === this.wrapper.scrollTop + this.wrapper.clientHeight) {
				return this.cover.classList.remove('shop__cover--active')
			}
			return this.cover.classList.add('shop__cover--active')
		})
	}
}

export default ShopTabsWrapperScroll