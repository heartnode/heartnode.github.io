/******************************************
Treehouse FSJS Techdegree:en
project 1 - A Random Quote Generator
******************************************/

// For assistance: 
  // Check the "Project Resources" section of the project instructions
  // Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/*** 
 * `quotes` array 
***/
const quotes = [
	{
		quote: "I'm a little pencil in the hand of a writing God, who is sending a love letter to the world.",
		source: "Mother Teresa",
		citation:"Quotes.net",
		year: "2022"
	},
	{ 
		quote: "Kind words can be short and easy to speak, but their echoes are truly endless.",
		source:"Mother Teresa",
		citation: "Quotes.net",
		year: "2022",
		tags: ["humor"]
	},
	{
		quote: "All the world is a stage and each and every person is a player",
		source:"William Shakespeare",
		citation: "Quotes.net",
		year: "2022"
	},
	{ 
		quote: "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control an at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
		source: "Marilyn Monroe",
		citation: "Goodreads.com",
		tags: ["contemporary","self-declaration"]
	},
	{
		quote:"Happiness is not by chance, but by choice.",
		source: "Jim Rohn",
		/*citation: "RealSimple",*/
		year:"2022"
	},
	{
		quote:"It does not matter how slowly you go as long as you do not stop.",
		source:"Confucius",
		year:"2022"
	}
];


//console.log(quotes);

/***
 * `getRandomQuote` function
***/
function getRandomQuote(){
	let quoteIndex = Math.floor(Math.random() * quotes.length);
	let quoteObj =  quotes[quoteIndex];
	console.log(quoteIndex,quoteObj);
	return quoteObj;
}


/***
 * `printQuote` function
***/
function printQuote(){
	let quoteObj = getRandomQuote();
	let quoteBox = document.getElementById('quote-box');
	let quoteContent = `
	<p class="quote">${quoteObj.quote}</p>
	<p class="source">${quoteObj.source}`;
	if (quoteObj.citation)
		quoteContent += `<span class="citation">${quoteObj.citation}</span>`;
	if (quoteObj.year)
		quoteContent += `<span class="year">${quoteObj.year}</span>`;
	if (quoteObj.tags && quoteObj.tags.length)
		quoteContent += `<span class="tags">${quoteObj.tags.join(" | ")}</span>`;
	quoteContent += `</p>`;

	quoteBox.innerHTML = quoteContent;
	randomBackgroundColor();
}
/***
 * randomBackgroundColor function 
 * set the background color to a random rgb value
 */
function randomBackgroundColor(){
	document.body.style.backgroundColor = `rgb(${ [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)].join()})`;
}

let autoRefresh = setInterval(printQuote,10000);

/***
 * stop auto refresh
 */
function stopAutoRefresh(){
	clearInterval(autoRefresh);
}

function enableAutoRefresh(){
	autoRefresh = setInterval(printQuote, 10000);
}
/***
 * change event listener for the auto refresh checkbox 
 */
document.getElementById('cb-auto-refresh').addEventListener("change",function(){
	if (this.checked) 
		enableAutoRefresh() 
	else 
		stopAutoRefresh();
});
/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);