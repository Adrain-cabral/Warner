const { Client, GatewayIntentBits } = require('discord.js');

var ano = 2013;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('clientReady', () => {
  console.log('Bot online!');
});

//comando ping
client.on('messageCreate', message => {
  if (message.content === '*ping') {
    message.reply('Pong!');
  }
});

// comando ano
client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === '*ano') {
    message.reply("# " + ano + " #");
  }
});

// função que atualiza o ano
function atualizarAno() {
  ano++;

  fs.writeFileSync('ano.json', JSON.stringify({ ano: ano }));

  console.log("# " + ano + " #");

  const canal = client.channels.cache.get('1488786657434927224');

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

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.startsWith('*pais ')) {
    const nome = message.content.replace('*pais ', '').trim();

    db.get(
      'SELECT * FROM paises WHERE nome = ?',
      [nome],
      (err, row) => {
        if (err) {
          console.error(err);
          return message.reply('Erro ao buscar o país.');
        }

        if (!row) {
          return message.reply('País não encontrado.');
        }

        message.reply(
`🌍 ${row.nome}
💰 Dinheiro: ${row.dinheiro}
👥 População: ${row.populacao}
🪖 Exército: ${row.exercito}
📉 Estabilidade: ${row.estabilidade}`
        );
      }
    );
  }
});

