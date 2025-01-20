import { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

function createMsg({ color, title, desc, fields, icon, image, footer, footerIcon, timestamp }) {
	const embed = new EmbedBuilder();

	if (color) embed.setColor(color); else embed.setColor('000000');
	if (title) embed.setTitle(title);
	if (desc) embed.setDescription(desc);
	if (icon) embed.setThumbnail(icon);
	if (image) embed.setImage(image);
	if (footer) embed.setFooter({ text: footer, iconURL: footerIcon });
	if (fields) {
		fields.forEach(field => {
			embed.addFields({
				name: field.title,
				value: field.desc,
				inline: field.inline || false
			});
		});
	}
	if (timestamp === 'relative' || timestamp === 'fixed') {
		const now = new Date();
		const newTimestamp = `<t:${getTimestamp(now)}:${timestamp === 'relative' ? 'R' : 'f'}>`;
		embed.addFields({
			name: '\u200B',
			value: newTimestamp,
			inline: false
		});
	}

	return embed;
}

function createCmd({ name, desc, options = [], permissions = [], execute }) {
	const commandBuilder = new SlashCommandBuilder()
		.setName(name)
		.setDescription(desc);

	options.forEach((option) => {
		const { type, name, desc, required, choices } = option;
		const isRequired = required === undefined ? false : required;
		const hasChoices = choices || [];

		switch (type) {
			case 'user':
				commandBuilder.addUserOption((o) => o.setName(name).setDescription(desc).setRequired(isRequired));
				break;
			case 'role':
				commandBuilder.addRoleOption((o) => o.setName(name).setDescription(desc).setRequired(isRequired));
				break;
			case 'channel':
				commandBuilder.addChannelOption((o) => o.setName(name).setDescription(desc).setRequired(isRequired));
				break;
			case 'string':
				commandBuilder.addStringOption((o) => {
					o.setName(name).setDescription(desc).setRequired(isRequired);
					if (hasChoices.length > 0) o.addChoices(...hasChoices);
					return o;
				});
				break;
			case 'integer':
				commandBuilder.addIntegerOption((o) => {
					o.setName(name).setDescription(desc).setRequired(isRequired);
					if (hasChoices.length > 0) o.addChoices(...hasChoices);
					return o;
				});
				break;
			default:
				throw new Error(`Unsupported option type: ${type}`);
		}
	});

	if (permissions && permissions.length > 0) {
		const permissionBits = permissions.reduce((acc, perm) => {
			const permBit = PermissionFlagsBits[perm];
			if (permBit === undefined) {
				throw new Error(`Unsupported permission: ${perm}`);
			}
			return acc | BigInt(permBit);
		}, BigInt(0));

		commandBuilder.setDefaultMemberPermissions(permissionBits);
	}

	return {
		data: commandBuilder,
		execute,
		permissions
	};
}

export {
    createMsg,
    createCmd
};
