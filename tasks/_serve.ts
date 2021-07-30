import browsersync from 'browser-sync'
import {watchFonts} from './fonts.handler'
import {watchPug} from './pug.handler'
import {watchScss} from './scss.handler'
import {watchTS} from './ts.handler'
import {watchImg} from "./img.handler";

export function serve() {
	browsersync.init({
		server: "./dist/",
		port: 8080,
		notify: false,
		ghostMode: false,
	})

	watchTS()
	watchPug()
	watchImg()
	watchScss()
	watchFonts()
}

export default serve