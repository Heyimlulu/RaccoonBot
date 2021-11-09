// Tic Tac Toe made by giorgiocav123 - https://gist.github.com/giorgi-o/9c7eede3b5c72c8b9f071b6dc8c8cd3c
// Discord new components docs - https://discord.com/developers/docs/interactions/message-components

module.exports = async(button) => {
	const message = button.message;

	let xs = 0,
		os = 0;

	for(let actionRow of message.components) {
		for(let btn of actionRow.components) {
			if(btn.label === 'X') xs++;
			else if(btn.label === 'O') os++;
		}
	}

	const xs_turn = xs <= os;
	const i = parseInt(button.id[3]),
		j = parseInt(button.id[4]);

	const buttonPressed = message.components[i-1].components[j-1];

	if(buttonPressed.label !== '_')
		return await button.reply.send("Someone already played there!", true);

	buttonPressed.label = xs_turn ? 'X' : 'O';
	buttonPressed.style = xs_turn ? "SUCCESS" : "DANGER";

	const components = [];

	for(let actionRow of message.components) {
		components.push({type: 1, components: []});
		for (let btn of actionRow.components) {
			components[components.length - 1].components.push({type: 2, label: btn.label, style: 2, custom_id: btn.custom_id});
		}
	}

	await message.edit({components: components});

	await button.reply.defer(false);

}