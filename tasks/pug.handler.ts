import fs from 'fs'
import path from 'path'
import {src, dest, watch} from 'gulp'
import {_src, _dist, _baseSrc} from './_paths'
import browsersync from 'browser-sync'
import replace from 'gulp-replace-image-src'
import pug, {Options} from 'gulp-pug'
import inlineSvg from './modules/svg.filter'

const pugConfig: Options = {
	filters: {
		svg: inlineSvg
	}
}

function getPugLocals () {
	const pathToPugLocals = path.normalize('src/locals.json')
	const pugLocalsJSON = fs.readFileSync(pathToPugLocals, {encoding: 'utf-8'})
	const pugLocalsData = JSON.parse(pugLocalsJSON)
	return pugLocalsData
}

// TASKS

function devHandlePug() {
	return src(_src.pug.file)
		.pipe(pug({...pugConfig, locals: getPugLocals()}))
		.pipe(dest(_dist.html))
		.pipe(browsersync.stream())
}

function prodHandlePug() {
	return src(_src.pug.file)
		.pipe(pug({...pugConfig, locals:  getPugLocals()}))
		.pipe(replace({prependSrc:'assets/', keepOrigin:false}))
		.pipe(dest(_dist.html))
}

function watchPug() {
	watch([_src.pug.watch, _baseSrc + '/locals.json'], devHandlePug)
}

export {
	devHandlePug,
	prodHandlePug,
	watchPug
}