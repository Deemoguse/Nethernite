import swiper, {Swiper} from 'swiper'

class NavButtons {

	protected buttons: NodeListOf<HTMLElement>
	protected tabs: NodeListOf<HTMLElement>
	protected activeTabId: number

	constructor () {
		this.buttons = document.querySelectorAll('.shop-nav__item')
		this.tabs = document.querySelectorAll('.shop-tab')
		this.activeTabId = 1
	}

	private _render (): void {
		const nodeLists = [this.tabs, this.buttons]

		nodeLists.forEach(list => list.forEach(el => {
			const active = el.classList[0] + '--active'
			const elemId = Number(el.dataset.id)

			if (elemId === this.activeTabId) el.classList.add(active)
			else el.classList.remove(active)
		}))
	}

	protected _handleClick (newActiveTabId: number): void {
		this.activeTabId = newActiveTabId
		this._render()
	}

	init () {
		this._render()
		this.buttons.forEach(el => el.addEventListener('click', () => {
			this._handleClick(Number(el.dataset.id))
		}))
	}
}

class NavSwiper {

	protected nav: HTMLElement
	protected navSwiper: Swiper

	constructor () {
		this.nav = document.querySelector('.shop-nav-swiper-container')
	}

	private _swiperInit (): void {
		this.navSwiper = new swiper(this.nav, {
			slidesPerView: 'auto',
			slideClass: 'shop-nav__item',
			wrapperClass: 'shop-nav',
			watchOverflow: true,
			freeMode: true,
			mousewheel: true
		})
	}

	public init (): void  {
		this._swiperInit()
	}
}

export {
	NavSwiper,
	NavButtons
}