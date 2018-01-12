<?php

/**
 * Fired during plugin activation
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    CCMT_Forms_Subsite
 * @subpackage CCMT_Forms_Subsite/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    CCMT_Forms_Subsite
 * @subpackage CCMT_Forms_Subsite/includes
 * @author     Your Name <email@example.com>
 */
class CCMT_Forms_Subsite_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		add_option('ccmt_cff_api_key', '');
		add_option('ccmt_cff_api_endpoint', '');
	}

}