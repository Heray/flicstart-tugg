
var selectedItem;
$(window).load(function() {
	$('#poster-banner #box').show();
	// $('img').removeClass('hidden-block');
});
$(document).ready(function() {
	// $('img').addClass('hidden-block');
	
	$('.datepicker').datepicker({
		format: 'mm-dd-yyyy',
		date: get_date_string(10),
		disableEarlierDate: get_date(6),
		click_custom: function(){
			show_datetime_picked();
			validate_new_screen_form_datetime();
		}
	});
	
	$('.datepicker-us').datepicker({
		format: 'mm-dd-yyyy',
		date: get_date_string(3),
		disableEarlierDate: get_date(0),
		click_custom: function(){
		}
	});
	
	// Screen box
	$('.screen-box').click(function(){
		$(this).submit();
	});
	

	$('.toolstip').tooltip({'placement':'bottom'});
	
	// Index
	$("#promotion-city").typeahead({
		query_entered_custom: function() {
			$('#pitch-box .spinner').show();
		},
		render_custom: function() {
			$('#pitch-box .spinner').hide();
		},
		ajax: '/city/get',
		select_custom: function(item) {
			var city_id = item.attr('data-value');
			$('#promotion_city_id').val(city_id);
			update_user_city(city_id);
			// refresh_theater_list_by_city(city_id);
			$('#pitch-box form').submit();
		}
	});
	
	$("#pitch-box #continue").click(function(){
		$('#pitch-box form').submit();
	});

	// Start Screen
	/*
	$("#movie_field").typeahead({
		ajax: '/movie/get',
		select_custom: function(item) {
			selectedItem = item;
			var movie_id = item.attr('data-value');
			$('#screen_new_movie_id').attr('value', movie_id)
		}
	});
	 */
	
	// Once user selected a movie, update the poster and the field
	$("#start-screen-search-box").on('click', '.movie-search-box', function() {
		var name = $(this).attr('name');
		var rt_id = $(this).attr('rt_id');
		var detailed = $(this).attr('detailed');
		$('#screen_new_movie_id').val(rt_id);
		$('#start-screen-poster').attr('src', detailed);
		
		// Update title
		$('#start_screen_movie_title_selected .title').text(name);
		$('#start_screen_movie_title').hide();
		$('#start_screen_movie_title_selected').show();
		$('#start-screen-search-box').html('');
		
		// Update error alert
		validate_new_screen_form_movie();
	});

	// Edit button for movie title
	$("#start_screen_movie_title_selected .edit").click(function() {
		$('#start_screen_movie_title_selected').hide();
		$('#start_screen_movie_title').show();
	});
	
	
	
	// Once user selected a theater, update the city and theater box
	$("#start-screen-search-box").on('click', '.theater-box', function() {
		var name = $(this).find('.name a').text();
		var address = $(this).find('.address').text();
		var google_reference = $(this).attr('google_reference');
		var google_id = $(this).attr('google_id');
		
		$('#screen_new_theater_reference').val(google_reference);
		$('#screen_new_theater_id').val(google_id);
		
		// Update title
		$('#start_screen_theater_selected .name').text(name);
		$('#start_screen_theater_selected .address').text(address);
		$('#start_screen_city_theater').hide();
		$('#start_screen_theater_selected').show();
		$('#start-screen-search-box').html('');
		
		// Update error alert
		validate_new_screen_form_theater();
	});

	// Edit button for movie title
	$("#start_screen_theater_selected .edit").click(function() {
		$('#start_screen_theater_selected').hide();
		$('#start_screen_city_theater').show();
	});
	
	
	
	/*

	$('#start-screen-theater select').change(function(){
		validate_new_screen_form();
	});
	
	$('#start-screen-date input').change(function() {
		validate_new_screen_form();
	});
	*/
	/*
	// Once user selected a theater, update the field
	// Once user selected a movie, update the poster and the field
	$("#start-screen-search-box").on('click', '.theater-box', function() {
		var name = $(this).attr('name');
		var theater_id = $(this).attr('id');
		// var detailed = $(this).attr('detailed');
		// alert(detailed);
		$('#screen_new_theater_id').val(theater_id);
		// $('#start_screen_poster').attr('src', detailed);
		
		// Update theater name
		$('#start_screen_theater_name_selected .name').text(name);
		$('#start_screen_theater_name_selected').show();
		$('#start-screen-search-box').html('');
	});

	// Edit button for theater name
	$("#start_screen_theater_name_selected .edit").click(function() {
		$('#start_screen_theater_name_selected').hide();
	});
	*/

	$('.dropdown-toggle').dropdown();

	
	$("#zipcode_field").typeahead({
		query_entered_custom: function() {
			$('#city_zipcode .spinner').show();
		},
		render_custom: function() {
			$('#city_zipcode .spinner').hide();
		},
		ajax: '/city/get',
		select_custom: function(item) {
			var city_id = item.attr('data-value');
			$('#screen_new_city_id').val(city_id);
			update_user_city(city_id);
			// refresh_theater_list_by_city(city_id);
		}
	});
	
	// Discover
	$('#discover-zipcode-field').typeahead({
		query_entered_custom: function() {
			$('#discover-zipcode .spinner').show();
		},
		render_custom: function() {
			$('#discover-zipcode .spinner').hide();
		},
		ajax: '/city/get',
		select_custom: function(item) {
			var city_id = item.attr('data-value');
			$('#discover_city_id').val(city_id);
			update_user_city(city_id);
			$('#discover-right').submit();
			//refresh_discover_screens(city_id);
			//refresh_discover_filters(city_id);
		}
	});

	$('#discover-right').on('click', '.sel', function() {
		var select_keyword = 'selected';
		if ($(this).hasClass(select_keyword)) {
			$(this).removeClass(select_keyword);
		} else {
			$(this).addClass(select_keyword);
		}
		filter_by_discover_filters();
	});

	$('.movie-box').mouseenter(function() {
		$(this).find('.hovershow').show();
	}).mouseleave(function() {
		$(this).find('.hovershow').hide();
	});
	
	$('.movie-box .btn').click(function(){
		var rt_id = $(this).parent().attr('rt_id');
		
	});
	
	$('.screen-box-tight-wrapper').mouseenter(function() {
		$(this).find('.btn').show();
	}).mouseleave(function() {
		$(this).find('.btn').hide();
	});
	
	$('.movie-box .poster-img').mouseenter(function() {
		$(this).find('img').fadeTo('fast', 0.4);
	}).mouseleave(function() {
		$(this).find('img').fadeTo('fast', 1);
	});
	
	// refresh_discover_filters();
	// refresh_discover_screens();

	// Screen Page
	/*
	$('#ticket-price').change(function() {
		var ticket_num = $(this).val();
		var ticket_id = $(this).attr('ticket_id');
		$('#ticket-info .spinner').show();
		$.ajax({
			type: 'POST',
			url: '/payment/get_form_content',
			data: {'ticket_id': ticket_id, 'ticket_num': ticket_num},
			success: function(res) {
				$('#ticket-info .spinner').hide();
				$('#payment-form-content').html(res);
			}
		});
	});
	*/
	
	$('#free-ticket-btn').click(function(){
		$('.referral-box').show();
		$(this).hide();
	})

	// Sign up
	$('#sign-up-link').click(function() {
		$('#sign-up-box').show();
	});
	
});

//Start Screen
function search_movie() {
	$("#start_screen_movie_title .spinner").show();
	$.ajax({
		type: 'POST',
		url: '/movie/get',
		data: {'query': $('#movie_field').val()},
		success: function(res) {
			$("#start-screen-search-box").html(res);
			$("#start_screen_movie_title .spinner").hide();
		}
	});
	return false;
}

function search_theater() {
	if (!validate_new_screen_form_city()) {
		return false;
	}

	$("#start_screen_theater_name .spinner").show();
	$.ajax({
		type: 'POST',
		url: '/theater/get',
		data: {'query': $('#theater_field').val(),
				'city_id': $('#screen_new_city_id').val()
				},
		success: function(res) {
			$("#start-screen-search-box").html(res);
			$("#start_screen_theater_name .spinner").hide();
		}
	});
	return false;
}

function update_user_city(city_id) {
	$.ajax({
		type: 'POST',
		url: '/city/update_user_city',
		data: {'city_id': city_id}
	});
}

function refresh_theater_list_by_city(city_id) {
	$('#start-screen-theater .spinner').show();
	$.ajax({
		type: 'POST',
		url: '/theater/get_by_city',
		data: {'city_id': city_id},
		success: function(res) {
			// $("#start-screen-search-box").html(res);
			$('#start-screen-theater .spinner').hide();

			for (var i = 0; i < res.length; i++) {
				var theater = res[i];
				$('#start-screen-theater select').append(
						'<option value="' + theater.id + '">' + theater.name + '</option>');
			}
		}
	});
}

function refresh_theater_list_by_zipcode(zipcode) {

}

//Discover

function refresh_discover_screens(city_id) {
	$.ajax({
		type: 'GET',
		url: '/home/discover_screens',
		data: {'city_id' : city_id},
		success: function(res) {
			$('#discover-screen-box').html(res);
		}
	});
}

function refresh_discover_filters(city_id) {
	$.ajax({
		type: 'GET',
		url: '/home/discover_filters',
		data: {'city_id' : city_id},
		success: function(res) {
			$('#discover-filter-box').html(res);
		}
	});
}

function filter_by_discover_filters() {
	$.ajax({
		type: 'GET',
		url: '/home/filter_discover_screens',
		data: get_page_filter_selections(),
		success: function(res) {
			$('#discover-screen-box').html(res);
		}
	});
}

var dt;
function get_page_filter_selections() {
	// theaters
	var theater_ids = [];
	$('#theater-options .sel.selected').each(function(){
		var tid = $(this).attr('theater_id');
		if (tid != null) {
			theater_ids.push(tid);
		}
	});

	// genres
	genre_ids = [];
	$('#genre-options .sel.selected').each(function(){
		var gid = $(this).attr('genre_id');
		if (gid != null) {
			genre_ids.push(gid);
		}
	});

	var dict = {'theater_ids':theater_ids, 'genre_ids':genre_ids};
	dt = dict;
	return dict;
}

function get_date(days_from_today) {
	var today = new Date();
	var future_date = new Date();
	future_date.setDate(today.getDate()+days_from_today);
	return future_date;
}

function get_date_string(days_from_today) {
	var future_date = get_date(days_from_today);

	var dd = future_date.getDate();
	var mm = future_date.getMonth()+1; //January is 0!

	var yyyy = future_date.getFullYear();
	if (dd < 10){
		dd = '0'+dd;
	}
	if (mm < 10){
		mm='0'+mm;
	} 
	var future_date = mm+'-'+dd+'-'+yyyy;
	return future_date;
}

function validate_new_screen_form_movie() {
	var movie = $('#start_screen_movie_title .alert');

	if (!$('#screen_new_movie_id').val()) {
		movie.show();
		return false;
	}
	movie.hide();
	return true;
}

function validate_new_screen_form_city() {
	var city = $('#city_zipcode .alert');
	if (!$('#screen_new_city_id').val()) {
		city.show();
		return false;
	}
	city.hide();
	return true;
	
}
function validate_new_screen_form_theater() {
	var theater = $('#start_screen_theater_name .alert');
	if (!$('#screen_new_theater_reference').val()) {
		theater.show();
		return false;
	}
	theater.hide();
	return true;
}

function validate_new_screen_form_datetime() {
	var datetime = $('#start-screen-date .alert');
	if ((!$('#start-screen-date input').val()) ||
			(!$('#start-screen-time-select').val())) {
		datetime.show();
		return false;
	}
	datetime.hide();
	return true;
}

function validate_new_screen_form_email() {
	var email_field = $('#visitor_email');
	if (email_field && email_field.length > 0) {
		email_alert = email_field.parent().find('.alert'); 
		if (!email_field.val()) {
			email_alert.show();
			return false;
		}
		email_alert.hide();
	}
	return true;
}

function validate_new_screen_form() {
	var approved = true;
	approved &= validate_new_screen_form_movie();
	approved &= validate_new_screen_form_city();
	approved &= validate_new_screen_form_theater();
	approved &= validate_new_screen_form_datetime();
	approved &= validate_new_screen_form_email();
	if (!approved) {
		return false;
	}
}

function validate_new_screen_form_not_used() {
	var movie = $('#start_screen_movie_title .alert');
	var theater = $('#start_screen_theater_name .alert');
	var datetime = $('#start-screen-date .alert');
	
	var approved = true;
	
	if (!$('#screen_new_movie_id').val()) {
		movie.html('Please enter movie').show();
		approved = false;
	} else {
		movie.hide();
	}
	if (!($('#screen_new_theater_reference').val() && $('#screen_new_city_id').val())) {
		theater.html("Please enter city and theater").show();
		approved = false;
	} else {
		theater.hide();
	}
	if ((!$('#start-screen-date input').val()) ||
			(!$('#start-screen-time-select').val())) {
		datetime.html("Please enter date and time").show();
		approved = false;
	} else {
		datetime.hide();
	}
	return approved;
}

function check_payment_form_element_empty(element) {
	var input = element.find('input');
	var help_inline = element.find('.help-inline');
	
	if (input.val()) {
		help_inline.hide();
		element.removeClass('error');
		return true;
	}
	help_inline.show();
	element.addClass('error');
	
	return false;
}

function check_payment_form_expiry_empty() {
	var cc_expiry = $('#cc_expiry');
	var help_inline = cc_expiry.find('.help-inline');

	var cc_month = cc_expiry.find('select[name=cc_month]');
	var cc_year = cc_expiry.find('select[name=cc_year]');
	if (cc_month.val() && cc_year.val()) {
		cc_expiry.removeClass('error');
		help_inline.hide();
		return true;
	}
	cc_expiry.addClass('error');
	help_inline.show();
	return false;
}

function check_payment_form_password() {
	var approved = true;
	var pwd = $('#pwd');
	var pwdc = $('#pwdc');
	var pwd_input = pwd.find('input');
	var pwdc_input = pwdc.find('input');
	var pwd_val = (pwd_input && pwd_input.val()) ? pwd_input.val() : "";
	var pwdc_val = (pwdc_input && pwdc_input.val()) ? pwdc_input.val() : "";
	if (pwd_val || pwdc_val) {
		var pwd_helpinline = pwd.find('.help-inline');
		var pwdc_helpinline = pwdc.find('.help-inline');
		if (pwd_val.length < 6) {
			approved = false;
			pwd_helpinline.show();
			pwd.addClass('error');
		} else {
			pwd_helpinline.hide();
			pwd.removeClass('error');
		}
		if (pwd_val != pwdc_val) {
			approved = false;
			pwdc_helpinline.show();
			pwdc.addClass('error');
		} else {
			pwdc_helpinline.hide();
			pwdc.removeClass('error');
		}
	}
	return approved;
}

function validate_payment_form() {
	var approved = true;
	approved &= check_payment_form_element_empty($('#fname'));
	approved &= check_payment_form_element_empty($('#lname'));
	approved &= check_payment_form_element_empty($('#email'));
	approved &= check_payment_form_element_empty($('#address'));
	approved &= check_payment_form_element_empty($('#city'));
	approved &= check_payment_form_element_empty($('#state'));
	approved &= check_payment_form_element_empty($('#zipcode'));
	approved &= check_payment_form_element_empty($('#cc_name'));
	approved &= check_payment_form_element_empty($('#cc_number'));
	
	// Check expiry
	approved &= check_payment_form_expiry_empty();
	
	// Check password
	approved &= check_payment_form_password();
	
	if (!approved) {
		return false;
	}
}

function validate_price_box() {
	var ticket_chosen_num = 0;
	$('#ticket-info .ticket-num').each(function(id, element) {
		if (parseInt($(element).val()) > 0) {
			ticket_chosen_num += 1;
		}
	});
	if (ticket_chosen_num < 1) {
		alert("Please choose at least one type of tickets");
		return false;
	} else if (ticket_chosen_num > 1) {
		alert("Please only choose one type of tickets");
		return false;
		//return true;
	}
}

// For sign in and sign up form
function validate_username() {
	var approved = true;
	if (!$('#user_fname').val()) {
		approved = false;
		var sec = $('.fname-sec');
		sec.addClass('error');
		sec.find('.help-inline').show();
	} else {
		var sec = $('.fname-sec');
		sec.removeClass('error');
		sec.find('.help-inline').hide();
	}
	if (!$('#user_lname').val()) {
		approved = false;
		var sec = $('.lname-sec');
		sec.addClass('error');
		sec.find('.help-inline').show();
	} else {
		var sec = $('.lname-sec');
		sec.removeClass('error');
		sec.find('.help-inline').hide();
	}
	return approved;
}