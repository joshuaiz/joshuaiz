---
path: "/words/ordering-events-by-advanced-custom-fields-date-time-picker-field"
date: "2014-03-01"
title: "Ordering Events by Advanced Custom Fields Date & Time Picker Field"
image: "../images/acf.png"
postExcerpt: "At a certain point it became necessary to filter and sort by the start date & time using the Advanced Custom Fields Date & Time Picker. This isn't as easy as it seems."
withAudio: false
---

While working on the DJ Gigs plugin, at a certain point it became necessary to filter and sort dj gigs by the start date & time using the [Advanced Custom Fields Date & Time Picker](http://wordpress.org/plugins/acf-field-date-time-picker/). This isn't as easy as it seems. Hours of creative Googling got me all kinds of code snippets that looked promising but in the end didn't work.

For this example, we need to show all events that are either from today or in the future. So we need to compare our event start date + time with today's date and time. The answer is deceptively simple however. The main point to remember is that your date + time format has to match the format of today's date + time that you grab from the server. Once those formats match, the filtering is a piece of cake.

In your ACF Date & Time Picker field settings, make sure you have both 'Save as timestamp' and 'Get field as timestamp' checked. This makes it much easier to compare and filter by date. I'll show you later how to format dates to use in your theme.

So now on to our custom loop using `WP_Query`. First we need to get the current `datetime` as a unix timestamp:

```php
$time = current_time( 'timestamp' ); // Get current unix timestamp
```

Then set up our custom event loop with a `meta_compare` operator:

```php
<?php
$time = current_time( 'timestamp' ); // Get current unix timestamp

// Set up custom query with meta_query to compare event start date with today's date
$args = array (
    'post_type'         => 'event', // your event post type slug
    'post_status'       => 'publish', // only show published events
    'orderby' 		    => 'meta_value', // order by date
    'meta_key' 		    => 'event_start_date', // your ACF Date & Time Picker field
    'meta_value'    	=> $time, // Use the current time from above
    'meta_compare'      => '>=', // Compare today's datetime with our event datetime
    'order' 			=> 'ASC', // Show earlier events first
    'posts_per_page'    => 10,
);

$query = new WP_Query( $args );

    if ( $query->have_posts() ) :
    while ( $query->have_posts() ) : 
        $query->the_post(); // Start loop

        // Your custom loop code here

    wp_reset_postdata();

    endif;
?>
```

And that's it! Again, the main thing to remember is that your `datetime` formats have to match. There are other WordPress and PHP methods to get the current datetime: `date()`, `getdate()`, etc. so whichever method you choose has to match the way your ACF Date & Time Picker saves the `datetime` in the database. Thus if you *don't* select 'Save as timestamp' in your Date & Time Picker settings, just echo your date field to see what the format is. If it is an array you can use either [strtotime](http://us3.php.net/strtotime) or WordPress' built-in [date_i18n function](https://codex.wordpress.org/Function_Reference/date_i18n) to output the current time to match.

To use your timestamp ACF Date & Time Picker field data in your theme, use something like this:

```php
<?php $start = get_field('event_start_date'); echo date_i18n('Y-m-d', $start);  ?>
```

So if your event starts on April 1, this will output 2014-04-01. More on WordPress [datetime formats](https://codex.wordpress.org/Formatting_Date_and_Time).