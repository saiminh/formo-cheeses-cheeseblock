<?php
/**
 * Plugin Name:       Formo Cheesepage Cheese Block
 * Description:       Displays stuff
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       formo-cheeses-cheeseblock
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_formo_cheeses_cheeseblock_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_formo_cheeses_cheeseblock_init' );

function render_cheeseblock_image_with_srcset( $block_content, $block ) {
  if ( $block['blockName'] === 'create-block/formo-cheeses-cheeseblock' ) {
      $doc = new DOMDocument();
      @$doc->loadHTML( $block_content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
      $images = $doc->getElementsByTagName( 'img' );
      foreach ( $images as $image ) {
          $id = $image->getAttribute( 'data-id' );
          $srcset = wp_get_attachment_image_srcset( $id, 'full' );
          $sizes = '(max-width: 782px) 100vw, 50vw';
          $image->setAttribute( 'srcset', $srcset );
          $image->setAttribute( 'sizes', $sizes );
      }
      $block_content = $doc->saveHTML();
  }
  return $block_content;
}
add_filter( 'render_block', 'render_cheeseblock_image_with_srcset', 10, 2 );