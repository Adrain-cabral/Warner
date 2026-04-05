const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log('Bot online!');
});

client.on('messageCreate', message => {
  if (message.content === '*ping') {
    message.reply('Pong!');
  }
});

// comando !ano
client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === '!ano') {
    message.reply('Ano atual: ' + ano);
  }
});

// função que atualiza o ano
function atualizarAno() {
  ano++;

  fs.writeFileSync('ano.json', JSON.stringify({ ano: ano }));

  console.log('Ano atualizado para: ' + ano);

  const canal = client.channels.cache.get('826216641363968005');

  if (canal) {
    canal.send(ano); 
  }
}

// calcula tempo até meia-noite
function tempoAteMeiaNoite() {
  const agora = new Date();
  const meiaNoite = new Date();

  meiaNoite.setHours(24, 0, 0, 0);

  return meiaNoite - agora;
}

// espera até meia-noite
setTimeout(() => {
  atualizarAno();

  // depois roda todo dia
  setInterval(atualizarAno, 86400000);
}, tempoAteMeiaNoite());

client.login(process.env.TOKEN);