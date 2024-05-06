// Telegraf - конструктор, Markup - для роботи з клавіатурою
import { Markup, Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'

const token = '7102467671:AAG7WDffMr_y52jK7fM9zex9lH4KbdnPGjA'
const webAppUrl = 'https://angular-tg-app-a5dea.web.app'

const bot = new Telegraf(token)

// ctx - context
// віддаємо кнопку від клавіатури Markup щоб запустити бота
bot.command('start', ctx => {
	ctx.reply(
		'Welcome. Click on the button to launch the application',
		Markup.keyboard([
			Markup.button.webApp('Send a message', `${webAppUrl}/feedback`),
		])
	)
})

bot.on(message('web_app_data'), async ctx => {
	const data = ctx.webAppData.data.json()
	ctx.reply(`Your message: ${data?.feedback}` ?? 'Empty message')
})

bot.launch()
