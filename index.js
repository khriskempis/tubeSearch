const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"

function getDataFromAPI(searchTerm, callback){

	const query = {
		part: "snippet",
		key: "AIzaSyB3HWY2aDPUtANaAbl1upxAJ2O2IbBrqQs",
		q: `${searchTerm} in:name`
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

	$.getJSON('/endpoint.jsp', function(data) {
     console.log(data)    
  });

	const results = data.items.map(function(item, index){
		return renderResults(item)
	});

	handleNextButton(data); 
	
	displayDiv.html(results)
}

function handleNextButton(data){

	const nextButton = $('section').find('.js-next-button');
	nextButton.removeClass('hidden')
	

	nextButton.click(function(event){
		console.log(data.nextPageToken);
	});

};

function handleSubmit(){
	$('.js-search-form').submit(function(event){
		event.preventDefault(); 

		const queryTarget = $('.js-search-form').find('.query'); 
		const query = queryTarget.val(); 

		getDataFromAPI(query, displayYouTubeSearchData)

		queryTarget.val('');

	});
}

$(handleSubmit())