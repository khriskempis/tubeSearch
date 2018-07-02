const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"
const YOUTUBE_KEY = "AIzaSyB3HWY2aDPUtANaAbl1upxAJ2O2IbBrqQs"

function getDataFromAPI(searchTerm, callback){

	const query = {
		part: "snippet",
		key: YOUTUBE_KEY,
		q: `${searchTerm} in:name`,
		pageToken: "",
		maxResults: 8
	}

	$.getJSON(YOUTUBE_SEARCH_URL, query, callback); 
}

function renderResults(item){
	const htmlString = `			<div class="result">
				<a href="http://www.youtube.com/watch?v=${item.id.videoId}" target="_blank" class="js-result-name">
					<img class ="youtube-thumbnail" src=${item.snippet.thumbnails.medium.url}>
				</a>
				<section role="contentinfo" class="content-info">
					<h3 class="result-title"><a href="http://www.youtube.com/watch?v=${item.id.videoId}" target="blank" class="js-result-title">${item.snippet.title}</a></h3>
					<p class="description">${item.snippet.description}</p>
					<p class="content-creator"><a href="http://www.youtube.com/channel/${item.snippet.channelId}" target="_blank" class="content-creator js-content-creator">${item.snippet.channelTitle}</a></p>
				</section>
			</div>`

		return htmlString

}

function displayYouTubeSearchData(data){
	const displayDiv = $('.js-search-results')
	const displayResults = $('.js-number-results');

	const results = data.items.map(function(item, index){
		return renderResults(item)
	});

	displayResults.text(`${data.pageInfo.resultsPerPage} Results`)

	handleNextButton(data); 
	
	displayDiv.html(results)
}

function handleNextButton(data){

	const nextButton = $('section').find('.js-next-button');	

	nextButton.click(function(event){
		handleSubmit()
	});

};

function handleSubmit(){
	$('.js-search-form').submit(function(event){
		event.preventDefault(); 

		const queryTarget = $('.js-search-form').find('#query'); 
		const query = queryTarget.val(); 
		const labelResults = $('#js-results')
		
		getDataFromAPI(query, displayYouTubeSearchData)

		queryTarget.val('');

		labelResults.prop('hidden', false); 

	});
}

$(handleSubmit())