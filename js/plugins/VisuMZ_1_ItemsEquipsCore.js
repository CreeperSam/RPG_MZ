//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.00] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * - Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * - Categorizing items in unique and multiple categories.
 * - Item Scene and Shop Scene will now display detailed information on items.
 * - NEW! marker can be displayed over recently acquired items in-game.
 * - Equipment notetags to adjust parameters past the editor limitations.
 * - Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * - Equipment Type Handling offers more control over equipment loadouts.
 * - Items sold in shops can be hidden/shown based on Switches.
 * - Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  visible = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optomized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"true","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will automatically enable the Status Window.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @textm Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optomized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x2aa6=['scope','drawItemDamage','limitedPageUpDownSceneCheck','Scene_ItemBase_activateItemWindow','ckEvc','checkItemConditionsSwitchNotetags','EFFECT_GAIN_TP','IncludeShopItem','XsmGv','KeyItemProtect','Window_ShopSell_isEnabled','drawItemEffectsHpDamage','USLIy','changeBuff','Window_ItemCategory_setItemWindow','max','aLTWS','paramchangeTextColor','AbNyh','isUseItemsEquipsCoreUpdatedLayout','StGGc','TkMMc','Scene_Shop_sellWindowRect','Step3Start','activateItemWindow','Enable','meetsItemConditions','WsYRn','hide','jzvnH','IgLoT','revertGlobalNamespaceVariables','drawItemDamageElement','note','mainAreaHeight','Step1Start','getItemScopeText','addBuyCommand','onBuyCancelItemsEquipsCore','getItemConsumableText','JiYaK','deselect','nonOptimizeEtypes','PtvOd','isShowNew','_tempActor','selfTP','Window_EquipStatus_refresh','iconWidth','updatedLayoutStyle','LabelHitType','addItemCategory','iaOxj','_shopStatusMenuAlly','scrollTo','drawItem','ExtDisplayedParams','flatMP','fAPYW','PeJUF','Scene_Shop_onSellCancel','refreshActorEquipSlotsIfUpdated','ConvertNumberToString','process_VisuMZ_ItemsEquipsCore_ParamJS','cancel','buyWindowRectItemsEquipsCore','LabelRecoverTP','vTFYM','getItemEffectsHpDamageText','_slotWindow','hwJRS','right','commandName','dqarQ','buttonAssistCategory','DrawFaceJS','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setCategory','drawItemHitType','OffsetY','Text','createCommandNameWindow','eLBaO','ElementNone','RemoveEquipIcon','FontColor','Scene_Equip_onActorChange','HitType%1','BaLEK','currencyUnit','ATK','New','setNewItem','ZzhDc','DrawItemData','gjkXm','translucentOpacity','consumable','isRightInputMode','spBXy','Step2End','nextActor','_slotId','removeBuff','commandSellItemsEquipsCore','clearEquipments','drawItemEffectsMpRecovery','auto','Speed0','TextAlign','deactivate','+%1%','_categoryNameWindow','isClearCommandEnabled','mdDlI','ncuoq','Game_BattlerBase_param','bzPdp','drawItemData','Scene_Equip_commandEquip','ARRAYEVAL','rnXrQ','changeEquip','addEquipCommand','powerUpColor','FadeLimit','paramPlus','callUpdateHelp','BnWjq','VhBGh','gSFbO','Scene_Equip_commandWindowRect','_newLabelOpacityUpperLimit','numberWindowRectItemsEquipsCore','uiInputPosition','clear','ParamChangeFontSize','commandBuy','drawRemoveItem','maxItems','MaxWeapons','icon','getItemDamageAmountText','FNGqg','Scene_Equip_create','bitmap','Step3End','iYyGA','zpqPJ','AWFIG','processDrawIcon','height','\x5cI[%1]%2','actor','processCursorSpecialCheckModernControls','commandWindowRectItemsEquipsCore','CmdIconCancel','NndNF','characterName','refreshCursor','replace','armor-%1','addState','down','categories','YKRzc','convertInitEquipsToItems','CleBt','MaxArmors','sell','bvVgX','_item','getDamageStyle','setStatusWindow','helpWindowRectItemsEquipsCore','_list','split','commandNameWindowDrawBackground','lNHhy','XjYFL','equipTypes','log','lineHeight','addCancelCommand','onMenuImageLoad','clamp','MaxHP','postCreateSlotWindowItemsEquipsCore','Game_Actor_changeEquip','BYpON','Speed2000','createSellWindow','wtPks','setItemWindow','changeEquipById','ABraJ','GztZY','W%1','HiddenItemB','_resetFontSize','A%1','floor','CmdTextAlign','Game_BattlerBase_meetsItemConditions','Scene_Equip_statusWindowRect','weapon-%1','categoryWindowRectItemsEquipsCore','clearNewItem','smallParamFontSize','canConsumeItem','drawItemQuantity','Window_Selectable_setHelpWindowItem','buttonAssistRemove','AatGO','resetFontSettings','getItemEffectsAddedStatesBuffsText','actorParams','_shopStatusMenuMode','windowPadding','fontSizeRatio','onTouchOk','getItemEffectsMpRecoveryText','isHovered','LabelRepeats','cursorRight','DPxOt','drawNewLabelText','HqBZP','rateMP','active','ETuzJ','processCursorMoveModernControls','getItemEffectsMpRecoveryLabel','onSellOk','ARRAYNUM','YpgxI','addCommand','qbSzO','optKeyItemsNumber','iconText','possession','isOpenAndActive','Scene_Shop_goldWindowRect','PRVAr','StatusWindow','gGQWp','jrdnf','ShowShopStatus','FhMNm','version','etypeId','isItem','zKpgo','Scene_Equip_slotWindowRect','drawNewLabelIcon','PCQdi','makeItemData','reloadMapIfUpdated','qearG','OtVsT','hideAdditionalSprites','drawItemEffectsAddedStatesBuffs','Game_Actor_forceChangeEquip','MDF','smoothSelect','newLabelEnabled','addInnerChild','drawItemCustomEntryLine','itemTextAlign','TP\x20RECOVERY','lvFYA','LUK','OlxAO','commandWindowRect','powerDownColor','MObpk','initNewItemsList','onCategoryCancel','drawItemOccasion','helpWindowRect','kHjNu','lEDKK','(+%1)','vzQGF','isCancelled','toUpperCase','drawUpdatedParamValueDiff','sellWindowRectItemsEquipsCore','Scene_Item_categoryWindowRect','isClearEquipOk','setShopStatusWindowMode','getItemOccasionText','BSHAI','forceChangeEquip','postCreateSellWindowItemsEquipsCore','addClearCommand','map','FieldUsable','AlreadyEquipMarker','yfMmk','itemDataFontSize','BMiyZ','gainItem','left','paramValueByName','DrawIcons','getItemEffectsRemovedStatesBuffsText','Scene_Shop_create','uXuqU','ARRAYSTR','parse','commandNameWindowCenter','_goods','textSizeEx','onSellCancel','LabelRemove','name','sumFi','type','ItemSceneAdjustItemList','process_VisuMZ_ItemsEquipsCore_EnableJS','tjxdm','atk','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','getItemSuccessRateLabel','itypeId','FZPzJ','adjustHiddenShownGoods','addWindow','isBuyCommandEnabled','isEquipped','onSellOkItemsEquipsCore','value','Scene_Shop_commandBuy','aLDbr','index','HzIJg','eTdxC','drawItemConsumable','optimize','getItemEffectsHpRecoveryText','eEcIP','TMKwO','mzCum','EFFECT_REMOVE_DEBUFF','create','oIsXs','Step1End','hideNewLabelSprites','alzqE','CommandAddClear','drawItemRepeats','quGEJ','drawItemStyleIcon','keyItem','Scene_Shop_commandSell','previousActor','equipSlots','equips','buyWindowRect','buttonAssistText3','onActorChange','_calculatingJSParameters','lFfdq','buttonAssistKey3','fNlgb','CommandAddOptimize','seIoG','sellPriceRate','maxCols','Scene_Shop_onCategoryCancel','drawItemEquipType','equip2','tradeItemWithParty','drawParamsItemsEquipsCore','loadCharacter','ElementWeapon','statusWindowRect','getItemDamageAmountLabel','BorderRegExp','ceil','item','PIhym','getItemEffectsAddedStatesBuffsLabel','SpeedNeg2000','drawItemEffectsSelfTpGain','armorTypes','onSlotOk','LGBlU','textColor','UODeo','JNYCj','AllArmors','EsqSb','AlwaysUsable','DrawPortraitJS','buy','TP\x20DAMAGE','EVAL','Occasion%1','_tempActorA','isPlaytest','Window_EquipCommand_initialize','ListWindowCols','helpAreaTop','flatHP','EFFECT_REMOVE_STATE','changeTextColor','Scene_Shop_activateSellWindow','KfTRv','isKeyItem','_resetFontColor','Step2Start','Scene_Equip_createSlotWindow','getItemEffectsHpRecoveryLabel','playCursorSound','getItemConsumableLabel','buttonAssistSmallIncrement','RGfSb','fbgfe','getItemEffectsMpDamageLabel','initNewLabelSprites','JRWAP','Window_Selectable_update','price','splice','rhtHQ','equip','cZAuQ','QUANTITY','oxdah','paHxJ','postCreateCategoryWindowItemsEquipsCore','drawItemSpeed','HzgiC','Qeiwl','paramJS','cwfHP','iOGub','categoryList','NonRemoveETypes','Speed1','getItemEffectsMpDamageText','getInputButtonString','AllWeapons','AWjnn','?????','jtUqN','show','filter','currentExt','AGI','BattleUsable','Scene_Item_itemWindowRect','shift','USER\x20TP\x20GAIN','AllItems','_newLabelOpacity','paramValueFontSize','push','tCxNK','defaultItemMax','_itemWindow','process_VisuMZ_ItemsEquipsCore_EquipSlots','XGjSn','colSpacing','NORKD','MaxIcons','REMOVED\x20EFFECTS','Nonconsumable','Scene_Shop_createCategoryWindow','innerWidth','RegExp','indexOf','tpGain','Window_ShopBuy_refresh','ADDED\x20EFFECTS','MP\x20RECOVERY','pageup','EFFECT_ADD_BUFF','ConvertParams','code','Window_ItemList_colSpacing','TYUVL','buttonAssistItemListRequirement','BYlIh','commandSell','dkRrv','TjqXl','mpRate','LabelSuccessRate','_data','ygaUj','_dummyWindow','onCategoryCancelItemsEquipsCore','Scene_Shop_prepare','lVeAW','qnsXV','fcwKw','isOptimizeCommandAdded','updateCommandNameWindow','slotWindowRect','placeNewLabel','PKdMq','drawUpdatedParamName','aoydl','bKrTm','MultiplierStandard','drawParamName','PqmcL','CmdHideDisabled','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','elements','cursorPageup','setHandler','getMenuImage','Window_ItemList_drawItem','categoryStyleCheck','oYLiG','nXJgK','commandBuyItemsEquipsCore','zuKhn','RMEAi','isUseParamNamesWithIcons','_tempActorB','processHandling','postCreateItemsEquipsCore','contents','IRbmF','NonOptimizeETypes','determineBaseSellingPrice','isSellCommandEnabled','ChbhI','isEnabled','Scene_Shop_buyWindowRect','LabelSpeed','JVxMv','RWJdz','text','MANUAL','CzCUh','mHsfb','getItemEffectsRemovedStatesBuffsLabel','statusWindowRectItemsEquipsCore','CmdIconOptimize','drawItemEffectsRemovedStatesBuffs','PDvpU','statusWidth','round','drawItemEffectsTpDamage','KWMxg','sellingPrice','TfYcw','Yyrlz','lXAvb','update','includes','isBottomHelpMode','getTextColor','dncVl','TLMWN','OSqMf','activate','getItemDamageElementText','RemoveEquipText','gLZUq','getItemEffectsTpRecoveryLabel','Scene_Item_createItemWindow','elementId','RjUmk','updateCategoryNameWindow','\x5cb%1\x5cb','OffsetX','isEquipItem','getItemEffectsTpDamageLabel','BatchShop','isRepeated','EFFECT_ADD_DEBUFF','_bypassNewLabel','LZxDf','lnxRH','match','knPdw','LayoutStyle','QoL','wtypeId','mainFontSize','onSlotOkAutoSelect','buttonAssistText1','buttonAssistLargeIncrement','YmcVG','popScene','paintOpacity','itemAt','getItemSpeedText','isUseModernControls','removeStateBuffChanges','Style','isGoodShown','drawItemDarkRect','LabelConsume','trim','itemLineRect','_newLabelSprites','createStatusWindow','damageColor','\x5cI[%1]','NeverUsable','isPressed','100%','Window_Selectable_refresh','Window_EquipItem_includes','Game_Actor_tradeItemWithParty','XnMFl','sellWindowRect','xCCoB','fill','JSON','ALEYj','YjqTf','_statusWindow','category','OBvTO','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','vsXKJ','visible','onSlotCancel','LabelRecoverHP','changePaintOpacity','removeState','JjOZI','occasion','categoryNameWindowDrawBackground','isArmor','zSieC','isDualWield','zyIHp','process_VisuMZ_ItemsEquipsCore_Category','playOkSound','cursorDown','allowCreateStatusWindow','LabelDamageMP','RegularItems','InVTT','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','processTouchModernControls','drawItemDamageAmount','SmBKs','Window_ItemList_updateHelp','prepareNextScene','paramPlusItemsEquipsCoreCustomJS','XZvGL','_actor','onTouchSelectModern','Scene_Shop_commandWindowRect','loadSystem','getItemEffectsHpDamageLabel','Game_Party_initialize','drawParamText','NUM','process_VisuMZ_ItemsEquipsCore_RegExp','drawItemStyleIconText','VisuMZ_1_MainMenuCore','getMatchingInitEquip','Categories','pagedown','status','cBGXV','textWidth','getItemDamageAmountLabelOriginal','ARRAYSTRUCT','getItemSpeedLabel','iufKs','discardEquip','XpYJa','DlCwE','DuHva','Param','categoryItemTypes','bvTkE','updateMoneyAmount','xWKff','Scene_Shop_categoryWindowRect','hitIndex','resetTextColor','ZSQfw','qHryO','EFFECT_RECOVER_HP','mainAreaTop','cursorLeft','LabelSelfGainTP','EquipAdjustHpMp','qVJRf','bestEquipItem','_sellWindow','hideDisabledCommands','Speed1000','commandStyle','drawItemEffectsMpDamage','Scene_Item_create','LabelApply','processShiftRemoveShortcut','HIT\x20TYPE','_purchaseOnly','ScopeRandomAllies','bind','CoreEngine','ARRAYJSON','prototype','Game_Party_gainItem','processCursorMove','setupItemDamageTempActors','weapon','NcGXK','lsGII','%1%','clearNewLabelFromItem','aoRHW','Scene_Shop_onSellOk','Window_ShopBuy_price','xSFRK','isClicked','BJFZm','naqcD','getItemDamageAmountLabelBattleCore','0000','Scene_Boot_onDatabaseLoaded','categoryWindowRect','getItemEffectsSelfTpGainLabel','hpRate','initEquips','postCreateItemWindowModernControls','activateSellWindow','isHoverEnabled','_newItemsList','nmIpf','initialize','Scene_Shop_onBuyCancel','isEquipChangeOk','LabelDamageHP','width','format','DuJKu','cSSJc','modifiedBuyPriceItemsEquipsCore','LpVCT','isHandled','OCCASION','gaugeBackColor','XBSGL','onTouchSelectModernControls','MVcss','setMp','emJNv','_newLabelOpacityChange','_money','getItemEffectsTpDamageText','updateHelp','STR','xmNMB','damage','drawItemSuccessRate','mhp','_category','_goodsCount','Game_Actor_paramPlus','isClearCommandAdded','makeDeepCopy','fillRect','ldqKB','wloGA','gainTP','HP\x20DAMAGE','process_VisuMZ_ItemsEquipsCore_Prices','_equips','EFFECT_ADD_STATE','cBIrl','Consumable','_numberWindow','drawActorParamDifference','Window_EquipItem_isEnabled','txhcr','categoryNameWindowCenter','xsWiN','constructor','exit','isShiftRemoveShortcutEnabled','members','meetsItemConditionsNotetags','rVGFR','Settings','parameters','SHysF','uqswu','CmdIconSell','normalColor','MaxItems','mainAreaBottom','NroXs','isCommandEnabled','lfHSQ','_buyWindow','Window_ShopCommand_initialize','CXpsd','Scene_Shop_numberWindowRect','equipAdjustHpMp','ScopeAlliesButUser','Scene_Load_reloadMapIfUpdated','goldWindowRect','MaxMP','successRate','SUCCESS\x20RATE','repeats','fRcYx','onTouchCancel','drawItemCustomEntries','Type','uiMenuStyle','KeyItems','NUfTk','mainCommandWidth','getInputMultiButtonStrings','drawItemEffectsTpRecovery','Width','setObject','buttonAssistKey2','isWeapon','DrawEquipData','CmdIconClear','ItemQuantityFmt','value1','iconHeight','return\x200','eugue','numItems','buttonAssistOffset3','jjcvn','addChild','systemColor','(%1)','onCategoryOk','isTriggered','NsJGM','eluFG','getItemEffectsTpRecoveryText','EnableLayout','createCategoryNameWindow','CmdCancelRename','Scene_Equip_onSlotOk','ATPtW','PPuka','slotWindowRectItemsEquipsCore','getItemQuantityText','itemEnableJS','NoChangeMarker','drawTextEx','VBRFr','_handlers','buttonAssistText2','LabelDamageTP','item-%1','canEquip','weaponTypes','_commandWindow','SkXTW','ShopMenuStatusStandard','placeItemNewLabel','smoothScrollTo','_commandNameWindow','sJRTl','%1-%2','prepareRefreshItemsEquipsCoreLayout','registerCommand','BgTEk','commandEquip','values','DAMAGE\x20MULTIPLIER','GMOQy','EquipScene','addSellCommand','cursorPagedown','isOpen','HzVLd','MP\x20DAMAGE','refreshItemsEquipsCoreNoMenuImage','SCOPE','ShiftShortcutKey','drawUpdatedBeforeParamValue','EquipParams','getNextAvailableEtypeId','createCategoryWindow','onTouchSelect','opacity','FUNC','playBuzzerSound','dataId','EFFECT_RECOVER_MP','HiddenItemA','itemWindowRect','Scene_Item_createCategoryWindow','rateHP','VuzCg','getItemEffectsSelfTpGainText','playEquip','SpeedNeg1999','getItemRepeatsText','vINIo','MOlkC','buffIconIndex','mmp','categoryStyle','isEquipCommandAdded','IZPFr','HP\x20RECOVERY','isMainMenuCoreMenuImageOptionAvailable','_scene','RCdjo','itemWindowRectItemsEquipsCore','getItemColor','drawItemKeyData','commandNameWindowDrawText','VBLMc','kVxQT','Scene_Equip_onSlotCancel','SPEED','meetsItemConditionsJS','Scene_Shop_statusWindowRect','iYdOM','ShopScene','VisuMZ_0_CoreEngine','Scene_Shop_createSellWindow','addStateBuffChanges','Window_Selectable_initialize','×%1','geUpdatedLayoutStatusWidth','paramId','blt','center','description','KQpGH','createBitmap','drawItemNumber','call','drawUpdatedAfterParamValue','calcWindowHeight','commandStyleCheck','_itemData','Scene_Equip_itemWindowRect','nPgHE','createNewLabelSprite','QTcwx','JAAfc','nonRemovableEtypes','currentSymbol','versionId','setTempActor','releaseUnequippableItems','adjustItemWidthByStatus','numberWindowRect','tLNQC','fontSize','drawing','Gamyi','_doubleTouch','isOptimizeEquipOk','AJqJW','uiHelpPosition','XnGUE','isDrawItemNumber','swOmG','gWloc','bGmbv','_customItemInfo','loadPicture','STRUCT','KMIAD','value2','Window_ItemList_maxCols','drawItemEffectsHpRecovery','maxItemAmount','createSlotWindow','drawItemName','removeDebuff','getItemDamageElementLabel','MenuPortraits','OUFzJ','getItemDamageAmountTextOriginal','refresh','boxWidth','VCGXy','oqXln','buttonAssistKey1','getItemHitTypeLabel','goldWindowRectItemsEquipsCore','DEF','param','prepareItemCustomData','Blacklist','addOptimizeCommand','VisuMZ_1_BattleCore','drawEquipData','GTXxn','ScopeRandomAny','pugVN','NlWeH','drawIcon','PurchaseOnly','length','isNewItem','categoryNameWindowDrawText','ItemMenuStatusRect','IkYpv','createItemWindow','LfIjE','prepareNewEquipSlotsOnLoad','helpAreaHeight','EsKQA','getItemDamageAmountTextBattleCore','+%1','itemPadding','yTHvv','WEHEz','isCursorMovable','isOptimizeCommandEnabled','buttonAssistSlotWindowShift','_categoryWindow','SpeedNeg999','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','NofBq','prepare','isEquipCommandEnabled','qMagp','iconIndex','ItemScene','qbfxj','OFuZj','drawText','select','isShiftShortcutKeyForRemove','contentsBack','yWmCM','vcerF','makeCommandList','params','tAZJW','_buttonAssistWindow','effects','armor','cQTwR','getItemSuccessRateText','WlkAE','KcTXm','Icon','money','EFFECT_REMOVE_BUFF','lyDAd','getItemHitTypeText','Zwshx','QKELp','onBuyCancel','NBWNH','XdNsC','QTquG','Window_ItemCategory_initialize','_buyWindowLastIndex','Wuqqu','pgWKY','IconSet','drawItemScope','onDatabaseLoaded','Game_Actor_discardEquip','MAT','qkVzO','setItem','KFpFU','yjjtV','drawItemActorMenuImage','ItemsEquipsCore','drawItemEffects','CmdStyle'];(function(_0x330e49,_0x2aa660){const _0xb3c6fc=function(_0x590614){while(--_0x590614){_0x330e49['push'](_0x330e49['shift']());}};_0xb3c6fc(++_0x2aa660);}(_0x2aa6,0x13a));const _0xb3c6=function(_0x330e49,_0x2aa660){_0x330e49=_0x330e49-0x0;let _0xb3c6fc=_0x2aa6[_0x330e49];return _0xb3c6fc;};var label=_0xb3c6('0x2fb'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xb3c6('0x87')](function(_0x35dab7){return _0x35dab7[_0xb3c6('0x160')]&&_0x35dab7[_0xb3c6('0x270')]['includes']('['+label+']');})[0x0];VisuMZ[label][_0xb3c6('0x1dc')]=VisuMZ[label][_0xb3c6('0x1dc')]||{},VisuMZ[_0xb3c6('0xa6')]=function(_0x14ce92,_0x5b12d2){for(const _0x338a43 in _0x5b12d2){if(_0x338a43['match'](/(.*):(.*)/i)){if('ckEvc'!==_0xb3c6('0x302')){function _0x4e91b1(){_0x4dcf0e[_0xb3c6('0x2fb')][_0xb3c6('0x194')][_0xb3c6('0x274')](this),this[_0xb3c6('0x311')]()&&this[_0xb3c6('0x11')]();}}else{const _0xbae88b=String(RegExp['$1']),_0x527bd3=String(RegExp['$2'])[_0xb3c6('0x41b')]()[_0xb3c6('0x11f')]();let _0x282b42,_0x1a88d2,_0x45efff;switch(_0x527bd3){case _0xb3c6('0x159'):_0x282b42=_0x5b12d2[_0x338a43]!==''?Number(_0x5b12d2[_0x338a43]):0x0;break;case _0xb3c6('0x3e8'):_0x1a88d2=_0x5b12d2[_0x338a43]!==''?JSON[_0xb3c6('0x434')](_0x5b12d2[_0x338a43]):[],_0x282b42=_0x1a88d2[_0xb3c6('0x426')](_0x4b8c42=>Number(_0x4b8c42));break;case _0xb3c6('0x54'):_0x282b42=_0x5b12d2[_0x338a43]!==''?eval(_0x5b12d2[_0x338a43]):null;break;case _0xb3c6('0x376'):_0x1a88d2=_0x5b12d2[_0x338a43]!==''?JSON[_0xb3c6('0x434')](_0x5b12d2[_0x338a43]):[],_0x282b42=_0x1a88d2[_0xb3c6('0x426')](_0x27d2f8=>eval(_0x27d2f8));break;case _0xb3c6('0x12f'):_0x282b42=_0x5b12d2[_0x338a43]!==''?JSON[_0xb3c6('0x434')](_0x5b12d2[_0x338a43]):'';break;case _0xb3c6('0x189'):_0x1a88d2=_0x5b12d2[_0x338a43]!==''?JSON['parse'](_0x5b12d2[_0x338a43]):[],_0x282b42=_0x1a88d2[_0xb3c6('0x426')](_0x9bddfd=>JSON[_0xb3c6('0x434')](_0x9bddfd));break;case _0xb3c6('0x243'):_0x282b42=_0x5b12d2[_0x338a43]!==''?new Function(JSON[_0xb3c6('0x434')](_0x5b12d2[_0x338a43])):new Function(_0xb3c6('0x206'));break;case'ARRAYFUNC':_0x1a88d2=_0x5b12d2[_0x338a43]!==''?JSON[_0xb3c6('0x434')](_0x5b12d2[_0x338a43]):[],_0x282b42=_0x1a88d2[_0xb3c6('0x426')](_0x4355ae=>new Function(JSON[_0xb3c6('0x434')](_0x4355ae)));break;case _0xb3c6('0x1bc'):_0x282b42=_0x5b12d2[_0x338a43]!==''?String(_0x5b12d2[_0x338a43]):'';break;case _0xb3c6('0x433'):_0x1a88d2=_0x5b12d2[_0x338a43]!==''?JSON[_0xb3c6('0x434')](_0x5b12d2[_0x338a43]):[],_0x282b42=_0x1a88d2[_0xb3c6('0x426')](_0x41815f=>String(_0x41815f));break;case _0xb3c6('0x294'):_0x45efff=_0x5b12d2[_0x338a43]!==''?JSON['parse'](_0x5b12d2[_0x338a43]):{},_0x14ce92[_0xbae88b]={},VisuMZ[_0xb3c6('0xa6')](_0x14ce92[_0xbae88b],_0x45efff);continue;case _0xb3c6('0x164'):_0x1a88d2=_0x5b12d2[_0x338a43]!==''?JSON[_0xb3c6('0x434')](_0x5b12d2[_0x338a43]):[],_0x282b42=_0x1a88d2[_0xb3c6('0x426')](_0x562513=>VisuMZ[_0xb3c6('0xa6')]({},JSON[_0xb3c6('0x434')](_0x562513)));break;default:continue;}_0x14ce92[_0xbae88b]=_0x282b42;}}}return _0x14ce92;},(_0x26710b=>{const _0x137c2d=_0x26710b[_0xb3c6('0x2')];for(const _0x1e5b7e of dependencies){if(_0xb3c6('0x4a')!==_0xb3c6('0x4a')){function _0x50c3c0(){this[_0xb3c6('0x132')][_0xb3c6('0x86')]();}}else{if(!Imported[_0x1e5b7e]){alert(_0xb3c6('0x14a')['format'](_0x137c2d,_0x1e5b7e)),SceneManager[_0xb3c6('0x1d7')]();break;}}}const _0x4c66d8=_0x26710b[_0xb3c6('0x270')];if(_0x4c66d8[_0xb3c6('0x10b')](/\[Version[ ](.*?)\]/i)){const _0x2763e9=Number(RegExp['$1']);_0x2763e9!==VisuMZ[label][_0xb3c6('0x3f7')]&&(alert(_0xb3c6('0x135')[_0xb3c6('0x1ab')](_0x137c2d,_0x2763e9)),SceneManager[_0xb3c6('0x1d7')]());}if(_0x4c66d8[_0xb3c6('0x10b')](/\[Tier[ ](\d+)\]/i)){const _0x1ce223=Number(RegExp['$1']);if(_0x1ce223<tier)alert(_0xb3c6('0x34a')['format'](_0x137c2d,_0x1ce223,tier)),SceneManager[_0xb3c6('0x1d7')]();else{if(_0xb3c6('0x3fa')===_0xb3c6('0x3fa'))tier=Math[_0xb3c6('0x30d')](_0x1ce223,tier);else{function _0x356062(){_0xf0855['prototype'][_0xb3c6('0x335')][_0xb3c6('0x274')](this,_0x5bcf7f);}}}}VisuMZ[_0xb3c6('0xa6')](VisuMZ[label][_0xb3c6('0x1dc')],_0x26710b[_0xb3c6('0x1dd')]);})(pluginData),PluginManager[_0xb3c6('0x22e')](pluginData[_0xb3c6('0x2')],_0xb3c6('0x105'),_0x88f41a=>{VisuMZ[_0xb3c6('0xa6')](_0x88f41a,_0x88f41a);const _0x453b79=[],_0x145927=_0x88f41a[_0xb3c6('0x2ab')]['map'](_0x124d1f=>_0x124d1f[_0xb3c6('0x41b')]()[_0xb3c6('0x11f')]()),_0x26ae7c=_0x88f41a['Whitelist']['map'](_0x184f28=>_0x184f28[_0xb3c6('0x41b')]()['trim']()),_0x5d68f4=_0x88f41a[_0xb3c6('0x21')]>=_0x88f41a[_0xb3c6('0x321')]?_0x88f41a[_0xb3c6('0x321')]:_0x88f41a[_0xb3c6('0x21')],_0x5b0cd8=_0x88f41a[_0xb3c6('0x21')]>=_0x88f41a[_0xb3c6('0x321')]?_0x88f41a[_0xb3c6('0x21')]:_0x88f41a[_0xb3c6('0x321')],_0x36e6e8=Array(_0x5b0cd8-_0x5d68f4+0x1)[_0xb3c6('0x12e')]()[_0xb3c6('0x426')]((_0x5d7150,_0x17df01)=>_0x5d68f4+_0x17df01);for(const _0x14ebca of _0x36e6e8){if(_0xb3c6('0x2ca')!==_0xb3c6('0x69')){const _0x597212=$dataItems[_0x14ebca];if(!_0x597212)continue;if(!VisuMZ['ItemsEquipsCore'][_0xb3c6('0x305')](_0x597212,_0x145927,_0x26ae7c))continue;_0x453b79[_0xb3c6('0x91')]([0x0,_0x14ebca,0x0,_0x597212[_0xb3c6('0x6e')]]);}else{function _0x1fa32b(){_0x17acea[_0xb3c6('0x18a')][_0xb3c6('0x3e5')][_0xb3c6('0x274')](this);}}}const _0x4cde81=_0x88f41a['Step2End']>=_0x88f41a[_0xb3c6('0x62')]?_0x88f41a[_0xb3c6('0x62')]:_0x88f41a[_0xb3c6('0x362')],_0x551f0d=_0x88f41a[_0xb3c6('0x362')]>=_0x88f41a[_0xb3c6('0x62')]?_0x88f41a['Step2End']:_0x88f41a[_0xb3c6('0x62')],_0x513244=Array(_0x551f0d-_0x4cde81+0x1)[_0xb3c6('0x12e')]()[_0xb3c6('0x426')]((_0x70a658,_0xbe8e0f)=>_0x4cde81+_0xbe8e0f);for(const _0x1f0a7f of _0x513244){const _0x11879d=$dataWeapons[_0x1f0a7f];if(!_0x11879d)continue;if(!VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x305')](_0x11879d,_0x145927,_0x26ae7c))continue;_0x453b79[_0xb3c6('0x91')]([0x1,_0x1f0a7f,0x0,_0x11879d[_0xb3c6('0x6e')]]);}const _0x43da0f=_0x88f41a[_0xb3c6('0x390')]>=_0x88f41a[_0xb3c6('0x315')]?_0x88f41a[_0xb3c6('0x315')]:_0x88f41a[_0xb3c6('0x390')],_0x2cd864=_0x88f41a[_0xb3c6('0x390')]>=_0x88f41a[_0xb3c6('0x315')]?_0x88f41a[_0xb3c6('0x390')]:_0x88f41a[_0xb3c6('0x315')],_0x471880=Array(_0x2cd864-_0x43da0f+0x1)[_0xb3c6('0x12e')]()[_0xb3c6('0x426')]((_0x525855,_0x30c779)=>_0x43da0f+_0x30c779);for(const _0x29ab8d of _0x471880){const _0xc2c7a=$dataArmors[_0x29ab8d];if(!_0xc2c7a)continue;if(!VisuMZ[_0xb3c6('0x2fb')]['IncludeShopItem'](_0xc2c7a,_0x145927,_0x26ae7c))continue;_0x453b79[_0xb3c6('0x91')]([0x2,_0x29ab8d,0x0,_0xc2c7a[_0xb3c6('0x6e')]]);}SceneManager['push'](Scene_Shop),SceneManager[_0xb3c6('0x14f')](_0x453b79,_0x88f41a[_0xb3c6('0x2b4')]);}),VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x305')]=function(_0x249676,_0x54db57,_0xffee){if(_0x249676['name']['trim']()==='')return![];if(_0x249676[_0xb3c6('0x2')][_0xb3c6('0x10b')](/-----/i))return![];const _0x506ff3=_0x249676[_0xb3c6('0x3a2')];if(_0x54db57[_0xb3c6('0x2b5')]>0x0){if(_0xb3c6('0x16f')===_0xb3c6('0x16f'))for(const _0x594f28 of _0x54db57){if(!_0x594f28)continue;if(_0x506ff3[_0xb3c6('0xf2')](_0x594f28))return![];}else{function _0x5c0f8e(){return this[_0xb3c6('0xe5')]();}}}if(_0xffee[_0xb3c6('0x2b5')]>0x0){if(_0xb3c6('0x20a')===_0xb3c6('0x416')){function _0xbd4798(){return _0x566a9c[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0xdd')];}}else{for(const _0x37fa97 of _0xffee){if(!_0x37fa97)continue;if(_0x506ff3[_0xb3c6('0xf2')](_0x37fa97))return!![];}return![];}}return!![];},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x19c')]=Scene_Boot[_0xb3c6('0x18a')]['onDatabaseLoaded'],Scene_Boot[_0xb3c6('0x18a')][_0xb3c6('0x2f3')]=function(){VisuMZ['ItemsEquipsCore'][_0xb3c6('0x19c')][_0xb3c6('0x274')](this),this[_0xb3c6('0x15a')](),this['process_VisuMZ_ItemsEquipsCore_Notetags']();},Scene_Boot[_0xb3c6('0x18a')][_0xb3c6('0x15a')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x9e')]={},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x9e')][_0xb3c6('0x23e')]=[],VisuMZ['ItemsEquipsCore']['RegExp'][_0xb3c6('0x41')]=[];const _0xd7a424=[_0xb3c6('0x3b8'),_0xb3c6('0x1ef'),_0xb3c6('0x358'),_0xb3c6('0x2a8'),_0xb3c6('0x2f5'),_0xb3c6('0x405'),_0xb3c6('0x89'),_0xb3c6('0x40d')];for(const _0x54338b of _0xd7a424){const _0x5d15b4=_0xb3c6('0x9')[_0xb3c6('0x1ab')](_0x54338b);VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x9e')]['EquipParams']['push'](new RegExp(_0x5d15b4,'i'));const _0xaa4b25=_0xb3c6('0x101')['format'](_0x54338b);VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x9e')][_0xb3c6('0x41')][_0xb3c6('0x91')](new RegExp(_0xaa4b25,'g'));}},Scene_Boot['prototype']['process_VisuMZ_ItemsEquipsCore_Notetags']=function(){this[_0xb3c6('0x95')]();const _0xe7308b=[$dataItems,$dataWeapons,$dataArmors];for(const _0x5dd4ad of _0xe7308b){for(const _0x4bee97 of _0x5dd4ad){if(!_0x4bee97)continue;this[_0xb3c6('0x143')](_0x4bee97,_0x5dd4ad),this[_0xb3c6('0x1cb')](_0x4bee97,_0x5dd4ad),this['process_VisuMZ_ItemsEquipsCore_ParamValues'](_0x4bee97,_0x5dd4ad),this[_0xb3c6('0x33d')](_0x4bee97,_0x5dd4ad),this[_0xb3c6('0x6')](_0x4bee97,_0x5dd4ad);}}},Scene_Boot[_0xb3c6('0x18a')][_0xb3c6('0x95')]=function(){for(const _0x49bf85 of $dataClasses){if(_0xb3c6('0x28b')!==_0xb3c6('0x28b')){function _0x4573f7(){const _0xf98099=_0x49c109[_0xb3c6('0x2b')]()[this['index']()];_0x552364[_0xb3c6('0x27e')]()[_0xb3c6('0xf2')](_0xf98099)?this[_0xb3c6('0x244')]():this[_0xb3c6('0x183')]();}}else{if(!_0x49bf85)continue;_0x49bf85['equipSlots']=[];if(_0x49bf85[_0xb3c6('0x31f')][_0xb3c6('0x10b')](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x457d12=String(RegExp['$1'])[_0xb3c6('0x3ae')](/[\r\n]+/);for(const _0x5a1aef of _0x457d12){if(_0xb3c6('0x2ec')===_0xb3c6('0xef')){function _0x10453d(){this[_0xb3c6('0x1b4')](![]);}}else{const _0x28455e=$dataSystem[_0xb3c6('0x3b2')][_0xb3c6('0x9f')](_0x5a1aef[_0xb3c6('0x11f')]());if(_0x28455e>0x0)_0x49bf85['equipSlots']['push'](_0x28455e);}}}else{if(_0xb3c6('0x12b')!=='XnMFl'){function _0x1e3673(){return this[_0xb3c6('0x399')]();}}else for(const _0x1a92f1 of $dataSystem[_0xb3c6('0x3b2')]){const _0x4b2c3f=$dataSystem[_0xb3c6('0x3b2')][_0xb3c6('0x9f')](_0x1a92f1[_0xb3c6('0x11f')]());if(_0x4b2c3f>0x0)_0x49bf85[_0xb3c6('0x2b')][_0xb3c6('0x91')](_0x4b2c3f);}}}}},Scene_Boot[_0xb3c6('0x18a')][_0xb3c6('0x143')]=function(_0x3ba71e,_0x4f25fb){_0x3ba71e[_0xb3c6('0x3a2')]=[];const _0xeb7a53=_0x3ba71e[_0xb3c6('0x31f')],_0xa77376=_0xeb7a53['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0xa77376)for(const _0x1b804d of _0xa77376){if(_0xb3c6('0x260')==='kVxQT'){_0x1b804d[_0xb3c6('0x10b')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x59cd78=String(RegExp['$1'])[_0xb3c6('0x41b')]()['trim']()[_0xb3c6('0x3ae')](',');for(const _0x4e6245 of _0x59cd78){_0x3ba71e[_0xb3c6('0x3a2')][_0xb3c6('0x91')](_0x4e6245[_0xb3c6('0x11f')]());}}else{function _0x549fd9(){if(!this[_0xb3c6('0x32f')]())return![];if(!this['isUseModernControls']())return![];if(!this[_0xb3c6('0x94')])return![];if(!this[_0xb3c6('0x94')][_0xb3c6('0x3e3')])return![];return this[_0xb3c6('0x32f')]()&&this[_0xb3c6('0x119')]();}}}if(_0xeb7a53[_0xb3c6('0x10b')](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x513a96=RegExp['$1'][_0xb3c6('0x3ae')](/[\r\n]+/);for(const _0x97fdcf of _0x513a96){_0x3ba71e[_0xb3c6('0x3a2')][_0xb3c6('0x91')](_0x97fdcf[_0xb3c6('0x41b')]()[_0xb3c6('0x11f')]());}}},Scene_Boot[_0xb3c6('0x18a')][_0xb3c6('0x1cb')]=function(_0xa3b1b6,_0xeafbd9){if(_0xa3b1b6[_0xb3c6('0x31f')][_0xb3c6('0x10b')](/<PRICE:[ ](\d+)>/i)){if(_0xb3c6('0x3f1')===_0xb3c6('0x72')){function _0x4bb827(){this[_0xb3c6('0x236')]();}}else _0xa3b1b6[_0xb3c6('0x6e')]=Number(RegExp['$1']);}},Scene_Boot['prototype']['process_VisuMZ_ItemsEquipsCore_ParamValues']=function(_0x30952f,_0xf8fca2){if(_0xf8fca2===$dataItems)return;for(let _0x1b168f=0x0;_0x1b168f<0x8;_0x1b168f++){if(_0xb3c6('0x233')!==_0xb3c6('0x233')){function _0xd8e952(){if(_0x1637b2)_0x4217df['prepareNewEquipSlotsOnLoad']();}}else{const _0x4a08e5=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x9e')][_0xb3c6('0x23e')][_0x1b168f];if(_0x30952f[_0xb3c6('0x31f')][_0xb3c6('0x10b')](_0x4a08e5)){if(_0xb3c6('0x114')===_0xb3c6('0x114'))_0x30952f[_0xb3c6('0x2d9')][_0x1b168f]=parseInt(RegExp['$1']);else{function _0x23f35d(){const _0xb74c3a=_0x203528[_0xb3c6('0x1c5')](this);_0xb74c3a[_0xb3c6('0x32b')]=!![],_0x3d2003[_0xb3c6('0x2fb')][_0xb3c6('0x3ba')][_0xb3c6('0x274')](this,_0x5dead2,_0x4fa068),this[_0xb3c6('0x1eb')](_0xb74c3a);}}}}}},VisuMZ['ItemsEquipsCore'][_0xb3c6('0x7a')]={},Scene_Boot[_0xb3c6('0x18a')][_0xb3c6('0x33d')]=function(_0x2c5b54,_0x4a692c){if(_0x4a692c===$dataItems)return;if(_0x2c5b54['note']['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){if('BKbvT'!==_0xb3c6('0x1db')){const _0x357f3f=String(RegExp['$1']),_0x3fd4fd=(_0x4a692c===$dataWeapons?_0xb3c6('0x3c3'):'A%1')[_0xb3c6('0x1ab')](_0x2c5b54['id']),_0x34124a=_0xb3c6('0xc5')['format'](_0x357f3f);for(let _0x3a2f51=0x0;_0x3a2f51<0x8;_0x3a2f51++){if(_0x357f3f[_0xb3c6('0x10b')](VisuMZ[_0xb3c6('0x2fb')]['RegExp']['BorderRegExp'][_0x3a2f51])){const _0x5a96a6=_0xb3c6('0x22c')[_0xb3c6('0x1ab')](_0x3fd4fd,_0x3a2f51);VisuMZ['ItemsEquipsCore'][_0xb3c6('0x7a')][_0x5a96a6]=new Function(_0xb3c6('0x43'),_0xb3c6('0x26d'),_0x34124a);}}}else{function _0x5f0352(){if(this['_tempActor'])return;if(!_0x14405b[_0xb3c6('0x2fb')]['Settings']['EquipScene']['EquipAdjustHpMp'])return;const _0x20ec08=_0x2ece66[_0xb3c6('0xea')](_0x375217[_0xb3c6('0x19f')]()*this[_0xb3c6('0x1c0')]),_0x2ecebc=_0x218ef2[_0xb3c6('0xea')](_0x1d8acd['mpRate']()*this[_0xb3c6('0x253')]);if(this['hp']>0x0)this['setHp'](_0x20ec08);if(this['mp']>0x0)this[_0xb3c6('0x1b6')](_0x2ecebc);}}}},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x21b')]={},Scene_Boot[_0xb3c6('0x18a')][_0xb3c6('0x6')]=function(_0x595fb9,_0x434d9f){if(_0x434d9f!==$dataItems)return;if(_0x595fb9[_0xb3c6('0x31f')][_0xb3c6('0x10b')](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0xb3c6('0x10a')==='lnxRH'){const _0x56b709=String(RegExp['$1']),_0xe2c637=_0xb3c6('0x2c9')[_0xb3c6('0x1ab')](_0x56b709);VisuMZ['ItemsEquipsCore']['itemEnableJS'][_0x595fb9['id']]=new Function(_0xb3c6('0x43'),_0xe2c637);}else{function _0x4e36bb(){return _0x531683[_0xb3c6('0x2b0')][_0xb3c6('0x1ab')](_0x5b1233(_0x427d9['$1']));}}}},DataManager[_0xb3c6('0x60')]=function(_0x9e14ef){return this[_0xb3c6('0x3f9')](_0x9e14ef)&&_0x9e14ef[_0xb3c6('0xb')]===0x2;},DataManager[_0xb3c6('0x299')]=function(_0x2e272d){if(!_0x2e272d){if(_0xb3c6('0xde')!=='JVxMv'){function _0x1b9a8d(){_0x16f7f8=_0xb3c6('0x3cb')[_0xb3c6('0x1ab')](_0x1f5eb1['id']);}}else return 0x63;}else return _0x2e272d[_0xb3c6('0x31f')]['match'](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0xb3c6('0x93')](_0x2e272d);},DataManager[_0xb3c6('0x93')]=function(_0x17362e){if(this['isItem'](_0x17362e))return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')][_0xb3c6('0x1e2')];else{if(this[_0xb3c6('0x200')](_0x17362e)){if(_0xb3c6('0x2eb')!==_0xb3c6('0x422'))return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['ItemScene'][_0xb3c6('0x38a')];else{function _0x20672f(){this[_0xb3c6('0x145')](_0x356fb8[_0xb3c6('0x20f')]('down'));}}}else{if(this[_0xb3c6('0x13f')](_0x17362e)){if(_0xb3c6('0x2de')===_0xb3c6('0x2de'))return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')][_0xb3c6('0x3a6')];else{function _0x46d2ec(){return _0x120066['floor'](_0x443c48[_0xb3c6('0x2a2')]/0x2);}}}}}},ColorManager['getItemColor']=function(_0x32d45f){if(!_0x32d45f){if(_0xb3c6('0x310')===_0xb3c6('0x92')){function _0x7c0eb4(){const _0x5ba160=_0xb3c6('0x1ca');if(this[_0xb3c6('0x278')][_0xb3c6('0x24a')]>=0x0&&this[_0xb3c6('0x278')][_0xb3c6('0x5b')]>=0x0&&!this['_customItemInfo'][_0x5ba160])return![];const _0x2d8282=this[_0xb3c6('0x156')]();this[_0xb3c6('0x25d')](_0x2d8282,_0x221122,_0x3d7e53,_0x45e146,!![]);const _0x101fad=this[_0xb3c6('0x342')]();return this[_0xb3c6('0x5d')](_0x47ad2f[_0xb3c6('0x123')](0x0)),this[_0xb3c6('0x25d')](_0x101fad,_0x2533e4,_0x478968,_0x85a158,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x1226c0,_0x1aad7b,_0x4d7824),this[_0xb3c6('0x3d4')](),!![];}}else return this['normalColor']();}else{if(_0x32d45f[_0xb3c6('0x31f')][_0xb3c6('0x10b')](/<COLOR:[ ](\d+)>/i)){if('NUfTk'!==_0xb3c6('0x1f9')){function _0x42d7ee(){_0x52f1ad['ItemsEquipsCore'][_0xb3c6('0x249')][_0xb3c6('0x274')](this),this[_0xb3c6('0x119')]()&&this['postCreateCategoryWindowItemsEquipsCore']();}}else return this[_0xb3c6('0x4b')](Number(RegExp['$1'])[_0xb3c6('0x3b7')](0x0,0x1f));}else{if(_0x32d45f[_0xb3c6('0x31f')][_0xb3c6('0x10b')](/<COLOR:[ ]#(.*)>/i)){if(_0xb3c6('0x329')!==_0xb3c6('0x329')){function _0x3ed51e(){const _0x15f454=_0x23ec5d[_0xb3c6('0x30d')](_0x2507d7(_0x17f750),0x0)/_0x55d7b2['a'][_0xb3c6('0x8')];return this[_0xb3c6('0x31d')](),_0x1f2109(_0x15f454)?'?????':'%1%'[_0xb3c6('0x1ab')](_0x2570db['round'](_0x15f454*0x64));}}else return'#'+String(RegExp['$1']);}else return this['normalColor']();}}},Game_Temp[_0xb3c6('0x18a')][_0xb3c6('0x407')]=function(){if(this[_0xb3c6('0x108')])return![];return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['New'][_0xb3c6('0x317')];},VisuMZ['ShopMenuStatusStandard']=VisuMZ[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x3f2')][_0xb3c6('0xc1')],VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x372')]=Game_BattlerBase[_0xb3c6('0x18a')]['param'],Game_BattlerBase[_0xb3c6('0x18a')]['param']=function(_0x167a38){if(this[_0xb3c6('0x3d7')])return this[_0xb3c6('0x333')]?VisuMZ[_0xb3c6('0x227')]:0x1;else{if(_0xb3c6('0x79')!==_0xb3c6('0x79')){function _0x505602(){this[_0xb3c6('0xce')]();}}else return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x372')]['call'](this,_0x167a38);}},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x3c9')]=Game_BattlerBase[_0xb3c6('0x18a')][_0xb3c6('0x318')],Game_BattlerBase[_0xb3c6('0x18a')]['meetsItemConditions']=function(_0x18e404){if(!_0x18e404)return![];if(!VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x3c9')][_0xb3c6('0x274')](this,_0x18e404))return![];if(!this['meetsItemConditionsNotetags'](_0x18e404))return![];if(!this[_0xb3c6('0x263')](_0x18e404))return![];return!![];},Game_BattlerBase['prototype'][_0xb3c6('0x1da')]=function(_0x12e086){if(!this[_0xb3c6('0x303')](_0x12e086))return![];return!![];},Game_BattlerBase[_0xb3c6('0x18a')]['checkItemConditionsSwitchNotetags']=function(_0x31be13){const _0x302351=_0x31be13[_0xb3c6('0x31f')];if(_0x302351[_0xb3c6('0x10b')](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb3c6('0x306')!==_0xb3c6('0x306')){function _0x51314d(){const _0x402f48=this['getNextAvailableEtypeId'](_0x4fa5fc);if(_0x402f48<0x0)return;const _0x58c407=_0x43dfd1===0x1?_0x2e5024[_0x3766ef]:_0x29a272[_0x2fe353];this[_0xb3c6('0x378')](_0x402f48,_0x58c407);}}else{const _0x4aaac7=JSON[_0xb3c6('0x434')]('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x56978e of _0x4aaac7){if(_0xb3c6('0xf5')!==_0xb3c6('0xf5')){function _0x515bd4(){const _0x5c6e1f=_0x500a71['_scene'],_0x59eb0=[_0x48f9a6,_0x4fc7ee];return _0x59eb0['includes'](_0x5c6e1f[_0xb3c6('0x1d6')]);}}else{if(!$gameSwitches[_0xb3c6('0x12')](_0x56978e))return![];}}return!![];}}if(_0x302351[_0xb3c6('0x10b')](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x500175=JSON[_0xb3c6('0x434')]('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x1eec49 of _0x500175){if(!$gameSwitches[_0xb3c6('0x12')](_0x1eec49))return![];}return!![];}if(_0x302351[_0xb3c6('0x10b')](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2669f6=JSON['parse']('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x19db3d of _0x2669f6){if(_0xb3c6('0x21e')!==_0xb3c6('0x350')){if($gameSwitches[_0xb3c6('0x12')](_0x19db3d))return!![];}else{function _0x2ee26a(){const _0x419702=this[_0xb3c6('0x165')]();this[_0xb3c6('0x25d')](_0x419702,_0x2aadc8,_0x79b4f0,_0x40e253,!![]);const _0x44bbed=this[_0xb3c6('0x118')]();return this[_0xb3c6('0x25d')](_0x44bbed,_0x4b7c22,_0x2531b9,_0x44c610,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x4adbce,_0x2feb81,_0x51f904),this[_0xb3c6('0x3d4')](),!![];}}}return![];}if(_0x302351[_0xb3c6('0x10b')](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x165aa8=JSON['parse']('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0xcd213a of _0x165aa8){if(_0xb3c6('0x3be')===_0xb3c6('0x3be')){if(!$gameSwitches[_0xb3c6('0x12')](_0xcd213a))return!![];}else{function _0x10a257(){return _0x3a431d===null&&this[_0xb3c6('0x27e')]()[_0xb3c6('0xf2')](this[_0xb3c6('0x3f8')]())?this['_data'][_0xb3c6('0x2b5')]>0x0?![]:!![]:_0x1d4693[_0xb3c6('0x2fb')]['Window_EquipItem_includes'][_0xb3c6('0x274')](this,_0x167364);}}}return![];}if(_0x302351[_0xb3c6('0x10b')](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x41b077=JSON[_0xb3c6('0x434')]('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x4220ff of _0x41b077){if(!$gameSwitches[_0xb3c6('0x12')](_0x4220ff))return!![];}return![];}if(_0x302351[_0xb3c6('0x10b')](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb3c6('0x29f')!==_0xb3c6('0x29f')){function _0x235e5c(){return _0x5e0c77[_0xb3c6('0x18a')][_0xb3c6('0x415')]['call'](this);}}else{const _0x3d09c7=JSON[_0xb3c6('0x434')]('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0xcfae50 of _0x3d09c7){if($gameSwitches[_0xb3c6('0x12')](_0xcfae50))return![];}return!![];}}return!![];},Game_BattlerBase[_0xb3c6('0x18a')][_0xb3c6('0x263')]=function(_0x1d5017){const _0x1acf80=_0x1d5017[_0xb3c6('0x31f')],_0x158cfa=VisuMZ[_0xb3c6('0x2fb')]['itemEnableJS'];if(_0x158cfa[_0x1d5017['id']]){if(_0xb3c6('0x161')===_0xb3c6('0x161'))return _0x158cfa[_0x1d5017['id']][_0xb3c6('0x274')](this,_0x1d5017);else{function _0x213da8(){return this[_0xb3c6('0x93')](_0x86d1ac);}}}else return!![];},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x1a0')]=function(_0x9af9f5){_0x9af9f5=this[_0xb3c6('0x3a4')](_0x9af9f5);const _0x561f47=this['equipSlots']();this['_equips']=[];for(let _0x52f2ea=0x0;_0x52f2ea<_0x561f47[_0xb3c6('0x2b5')];_0x52f2ea++){this[_0xb3c6('0x1cc')][_0x52f2ea]=new Game_Item();}for(let _0x4ba0ff=0x0;_0x4ba0ff<_0x561f47[_0xb3c6('0x2b5')];_0x4ba0ff++){if(_0xb3c6('0x74')===_0xb3c6('0x74')){const _0x7fec81=_0x561f47[_0x4ba0ff],_0x2ac6b7=this[_0xb3c6('0x15d')](_0x9af9f5,_0x7fec81);if(this['canEquip'](_0x2ac6b7))this[_0xb3c6('0x1cc')][_0x4ba0ff][_0xb3c6('0x1fe')](_0x2ac6b7);}else{function _0x204df5(){this[_0xb3c6('0x2c7')][_0xb3c6('0x36c')]();}}}this['releaseUnequippableItems'](!![]),this[_0xb3c6('0x2a1')]();},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x3a4')]=function(_0x1d9808){const _0x3757db=[];for(let _0x4f3130=0x0;_0x4f3130<_0x1d9808[_0xb3c6('0x2b5')];_0x4f3130++){const _0x394d7d=_0x1d9808[_0x4f3130];if(_0x394d7d<=0x0)continue;const _0x4c0b3f=$dataSystem[_0xb3c6('0x3b2')][_0x4f3130+0x1];if(_0x4c0b3f===$dataSystem['equipTypes'][0x1]||_0x4f3130===0x1&&this[_0xb3c6('0x141')]()){if(_0xb3c6('0xf6')!==_0xb3c6('0x2b2'))_0x3757db[_0xb3c6('0x91')]($dataWeapons[_0x394d7d]);else{function _0x5465b2(){this[_0xb3c6('0x343')]['smoothSelect'](0x0),this[_0xb3c6('0x343')][_0xb3c6('0xf8')]();}}}else _0x3757db[_0xb3c6('0x91')]($dataArmors[_0x394d7d]);}return _0x3757db;},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x15d')]=function(_0x33424b,_0x326f98){for(const _0x4bb09d of _0x33424b){if(_0x4bb09d[_0xb3c6('0x3f8')]===_0x326f98)return _0x33424b[_0xb3c6('0x6f')](_0x33424b[_0xb3c6('0x9f')](_0x4bb09d),0x1),_0x4bb09d;}return null;},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x2b')]=function(){const _0x5c0c1c=JsonEx[_0xb3c6('0x1c5')](this['currentClass']()['equipSlots']);if(_0x5c0c1c[_0xb3c6('0x2b5')]>=0x2&&this['isDualWield']())_0x5c0c1c[0x1]=0x1;return _0x5c0c1c;},Game_Actor[_0xb3c6('0x18a')]['prepareNewEquipSlotsOnLoad']=function(){const _0x193324=this['equipSlots']();for(let _0x34f892=0x0;_0x34f892<_0x193324[_0xb3c6('0x2b5')];_0x34f892++){if(_0xb3c6('0x10c')!==_0xb3c6('0x10c')){function _0x5e5da4(){_0x29ae56=_0xb3c6('0x3cb')[_0xb3c6('0x1ab')](_0x2ae79f['id']);}}else{if(!this[_0xb3c6('0x1cc')][_0x34f892])this[_0xb3c6('0x1cc')][_0x34f892]=new Game_Item();}}this[_0xb3c6('0x282')](![]),this[_0xb3c6('0x2a1')]();},VisuMZ[_0xb3c6('0x2fb')]['Game_Actor_changeEquip']=Game_Actor['prototype'][_0xb3c6('0x378')],Game_Actor[_0xb3c6('0x18a')]['changeEquip']=function(_0x22829b,_0x310283){if(this[_0xb3c6('0x32b')]){const _0x3044f4=JsonEx[_0xb3c6('0x1c5')](this);_0x3044f4['_tempActor']=!![],VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x3ba')][_0xb3c6('0x274')](this,_0x22829b,_0x310283),this[_0xb3c6('0x1eb')](_0x3044f4);}else{if(_0xb3c6('0x226')!==_0xb3c6('0x226')){function _0x27a71c(){this[_0xb3c6('0x27')](_0x3650af);}}else VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x3ba')][_0xb3c6('0x274')](this,_0x22829b,_0x310283);}},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x404')]=Game_Actor['prototype'][_0xb3c6('0x423')],Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x423')]=function(_0x140260,_0xf8a6cb){if(this[_0xb3c6('0x32b')]){if(_0xb3c6('0x291')!==_0xb3c6('0x25f')){const _0x8969e6=JsonEx[_0xb3c6('0x1c5')](this);_0x8969e6[_0xb3c6('0x32b')]=!![],VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x404')][_0xb3c6('0x274')](this,_0x140260,_0xf8a6cb),this[_0xb3c6('0x1eb')](_0x8969e6);}else{function _0x1f4393(){this[_0xb3c6('0x2ee')]=this[_0xb3c6('0x2ee')]||0x0,this['_buyWindow'][_0xb3c6('0x406')](this[_0xb3c6('0x2ee')]);}}}else VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x404')][_0xb3c6('0x274')](this,_0x140260,_0xf8a6cb);},VisuMZ[_0xb3c6('0x2fb')]['Game_Actor_discardEquip']=Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x167')],Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x167')]=function(_0x564e4f){if(!this[_0xb3c6('0x32b')]){const _0x20d496=JsonEx[_0xb3c6('0x1c5')](this);_0x20d496[_0xb3c6('0x32b')]=!![],VisuMZ[_0xb3c6('0x2fb')]['Game_Actor_discardEquip'][_0xb3c6('0x274')](this,_0x564e4f),this[_0xb3c6('0x1eb')](_0x20d496);}else VisuMZ['ItemsEquipsCore'][_0xb3c6('0x2f4')][_0xb3c6('0x274')](this,_0x564e4f);},Game_Actor[_0xb3c6('0x18a')]['releaseUnequippableItems']=function(_0x59cd72){for(;;){const _0xa0f7bd=this[_0xb3c6('0x2b')](),_0x55fd28=this[_0xb3c6('0x2c')]();let _0x45e4e0=![];for(let _0x47b381=0x0;_0x47b381<_0x55fd28[_0xb3c6('0x2b5')];_0x47b381++){const _0x2f02b0=_0x55fd28[_0x47b381];if(_0x2f02b0&&(!this[_0xb3c6('0x223')](_0x2f02b0)||_0x2f02b0[_0xb3c6('0x3f8')]!==_0xa0f7bd[_0x47b381])){if(!_0x59cd72){if('jzvnH'!==_0xb3c6('0x31b')){function _0xdbf6d0(){this[_0xb3c6('0x406')](0x0);}}else this[_0xb3c6('0x3b')](null,_0x2f02b0);}if(!this[_0xb3c6('0x32b')]){if(_0xb3c6('0xfb')===_0xb3c6('0x356')){function _0x5ada7d(){if(this[_0xb3c6('0x278')]['changeBuff'][_0x28b154]!==0x0)this[_0xb3c6('0x278')][_0xb3c6('0x269')]=!![];}}else{const _0x3296bf=JsonEx[_0xb3c6('0x1c5')](this);_0x3296bf['_tempActor']=!![],this[_0xb3c6('0x1cc')][_0x47b381][_0xb3c6('0x1fe')](null),this['equipAdjustHpMp'](_0x3296bf);}}else this['_equips'][_0x47b381][_0xb3c6('0x1fe')](null);_0x45e4e0=!![];}}if(!_0x45e4e0){if('DVPCx'==='DVPCx')break;else{function _0x3f0cc4(){return;}}}}},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x1eb')]=function(_0x581642){if(this[_0xb3c6('0x32b')])return;if(!VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0x179')])return;const _0x4a0180=Math[_0xb3c6('0xea')](_0x581642[_0xb3c6('0x19f')]()*this[_0xb3c6('0x1c0')]),_0x3e6270=Math['round'](_0x581642[_0xb3c6('0xaf')]()*this[_0xb3c6('0x253')]);if(this['hp']>0x0)this['setHp'](_0x4a0180);if(this['mp']>0x0)this[_0xb3c6('0x1b6')](_0x3e6270);},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x367')]=function(){const _0xff9176=this['equipSlots']()['length'];for(let _0x31314b=0x0;_0x31314b<_0xff9176;_0x31314b++){if(_0xb3c6('0xae')!==_0xb3c6('0xae')){function _0xe56f8(){if(!_0x163a1b[_0xb3c6('0x12')](_0xaccb53))return![];}}else{if(this[_0xb3c6('0x41f')](_0x31314b))this['changeEquip'](_0x31314b,null);}}},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x41f')]=function(_0x52f955){if(this[_0xb3c6('0x27e')]()[_0xb3c6('0xf2')](this[_0xb3c6('0x2b')]()[_0x52f955])){if(_0xb3c6('0x265')!==_0xb3c6('0x3df'))return![];else{function _0x44a2cb(){return 0x0;}}}else return this[_0xb3c6('0x1a8')](_0x52f955);},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x27e')]=function(){return VisuMZ[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x234')][_0xb3c6('0x7e')];},Game_Actor[_0xb3c6('0x18a')]['optimizeEquipments']=function(){const _0x255ab5=this[_0xb3c6('0x2b')]()[_0xb3c6('0x2b5')];for(let _0xd426c=0x0;_0xd426c<_0x255ab5;_0xd426c++){if(_0xb3c6('0x149')===_0xb3c6('0xcf')){function _0x1f7467(){this[_0xb3c6('0x2c7')][_0xb3c6('0x406')](0x0),this[_0xb3c6('0x20e')]();}}else{if(this[_0xb3c6('0x28a')](_0xd426c))this[_0xb3c6('0x378')](_0xd426c,null);}}for(let _0x557519=0x0;_0x557519<_0x255ab5;_0x557519++){if(this[_0xb3c6('0x28a')](_0x557519))this[_0xb3c6('0x378')](_0x557519,this['bestEquipItem'](_0x557519));}},Game_Actor[_0xb3c6('0x18a')]['isOptimizeEquipOk']=function(_0xda6644){if(this['nonOptimizeEtypes']()[_0xb3c6('0xf2')](this[_0xb3c6('0x2b')]()[_0xda6644])){if(_0xb3c6('0x344')==='takMk'){function _0x29966c(){return'iconText';}}else return![];}else return this[_0xb3c6('0x1a8')](_0xda6644);},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x328')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0xd7')];},VisuMZ[_0xb3c6('0x2fb')]['Game_Actor_tradeItemWithParty']=Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x3b')],Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x3b')]=function(_0x48c16b,_0x2392c4){$gameTemp[_0xb3c6('0x108')]=!![];const _0x8197b6=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x12a')][_0xb3c6('0x274')](this,_0x48c16b,_0x2392c4);return $gameTemp['_bypassNewLabel']=![],_0x8197b6;},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x3c0')]=function(_0x2e63de,_0x138083){const _0x4faae8=this[_0xb3c6('0x23f')](_0x2e63de);if(_0x4faae8<0x0)return;const _0x355566=_0x2e63de===0x1?$dataWeapons[_0x138083]:$dataArmors[_0x138083];this[_0xb3c6('0x378')](_0x4faae8,_0x355566);},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x23f')]=function(_0x862009){let _0xf35fba=0x0;const _0x5aeedd=this[_0xb3c6('0x2b')](),_0x485a0a=this[_0xb3c6('0x2c')]();for(let _0x2dad07=0x0;_0x2dad07<_0x5aeedd['length'];_0x2dad07++){if(_0x5aeedd[_0x2dad07]===_0x862009){_0xf35fba=_0x2dad07;if(!_0x485a0a[_0x2dad07])return _0xf35fba;}}return _0xf35fba;},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1c3')]=Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x37c')],Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x37c')]=function(_0x177428){let _0x255112=VisuMZ[_0xb3c6('0x2fb')]['Game_Actor_paramPlus']['call'](this,_0x177428);for(const _0xa0b053 of this[_0xb3c6('0x2c')]()){if(_0xa0b053)_0x255112+=this['paramPlusItemsEquipsCoreCustomJS'](_0xa0b053,_0x177428);}return _0x255112;},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x150')]=function(_0x3e9f16,_0x3cd2a2){if(this[_0xb3c6('0x30')])return 0x0;const _0xa2ad18=(DataManager[_0xb3c6('0x200')](_0x3e9f16)?_0xb3c6('0x3c3'):_0xb3c6('0x3c6'))[_0xb3c6('0x1ab')](_0x3e9f16['id']),_0x280139=_0xb3c6('0x22c')[_0xb3c6('0x1ab')](_0xa2ad18,_0x3cd2a2);if(VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x7a')][_0x280139]){this[_0xb3c6('0x30')]=!![];const _0x3ed787=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x7a')][_0x280139][_0xb3c6('0x274')](this,_0x3e9f16,_0x3cd2a2);return this[_0xb3c6('0x30')]=![],_0x3ed787;}else return 0x0;},Game_Actor[_0xb3c6('0x18a')][_0xb3c6('0x420')]=function(_0x434d74){this[_0xb3c6('0x3d7')]=!![],this[_0xb3c6('0x333')]=_0x434d74;},VisuMZ[_0xb3c6('0x2fb')]['Game_Party_initialize']=Game_Party[_0xb3c6('0x18a')][_0xb3c6('0x1a6')],Game_Party[_0xb3c6('0x18a')]['initialize']=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x157')][_0xb3c6('0x274')](this),this[_0xb3c6('0x412')]();},Game_Party['prototype'][_0xb3c6('0x412')]=function(){this['_newItemsList']=[];},Game_Party[_0xb3c6('0x18a')][_0xb3c6('0x2b6')]=function(_0x3898c2){if(!$gameTemp[_0xb3c6('0x407')]())return![];if(this['_newItemsList']===undefined)this[_0xb3c6('0x412')]();let _0x1906cf='';if(DataManager[_0xb3c6('0x3f9')](_0x3898c2))_0x1906cf=_0xb3c6('0x222')[_0xb3c6('0x1ab')](_0x3898c2['id']);else{if(DataManager[_0xb3c6('0x200')](_0x3898c2))_0x1906cf=_0xb3c6('0x3cb')[_0xb3c6('0x1ab')](_0x3898c2['id']);else{if(DataManager[_0xb3c6('0x13f')](_0x3898c2))_0x1906cf=_0xb3c6('0x39f')[_0xb3c6('0x1ab')](_0x3898c2['id']);else return;}}return this[_0xb3c6('0x1a4')][_0xb3c6('0xf2')](_0x1906cf);},Game_Party[_0xb3c6('0x18a')][_0xb3c6('0x35a')]=function(_0x4d4501){if(!$gameTemp['newLabelEnabled']())return;if(this['_newItemsList']===undefined)this[_0xb3c6('0x412')]();let _0x43c4e2='';if(DataManager[_0xb3c6('0x3f9')](_0x4d4501))_0x43c4e2=_0xb3c6('0x222')['format'](_0x4d4501['id']);else{if(DataManager[_0xb3c6('0x200')](_0x4d4501)){if(_0xb3c6('0x2ef')!==_0xb3c6('0x2ef')){function _0x19cf3c(){_0xe4c369[_0xb3c6('0x91')](_0x5c64aa[_0x54c812]);}}else _0x43c4e2=_0xb3c6('0x3cb')[_0xb3c6('0x1ab')](_0x4d4501['id']);}else{if(DataManager[_0xb3c6('0x13f')](_0x4d4501))_0x43c4e2=_0xb3c6('0x39f')[_0xb3c6('0x1ab')](_0x4d4501['id']);else return;}}if(!this[_0xb3c6('0x1a4')][_0xb3c6('0xf2')](_0x43c4e2))this[_0xb3c6('0x1a4')][_0xb3c6('0x91')](_0x43c4e2);},Game_Party[_0xb3c6('0x18a')][_0xb3c6('0x3cd')]=function(_0x5762d3){if(!$gameTemp[_0xb3c6('0x407')]())return;if(this['_newItemsList']===undefined)this[_0xb3c6('0x412')]();let _0x3166f5='';if(DataManager['isItem'](_0x5762d3)){if(_0xb3c6('0x1a5')!==_0xb3c6('0x1b5'))_0x3166f5=_0xb3c6('0x222')[_0xb3c6('0x1ab')](_0x5762d3['id']);else{function _0x57e4ce(){this['_commandWindow'][_0xb3c6('0x406')](0x0),this[_0xb3c6('0x343')][_0xb3c6('0x36c')]();}}}else{if(DataManager['isWeapon'](_0x5762d3)){if(_0xb3c6('0x2e7')!==_0xb3c6('0x2e7')){function _0x55b92c(){return _0xc9f656[_0xb3c6('0x18a')][_0xb3c6('0x1a3')]['call'](this);}}else _0x3166f5=_0xb3c6('0x3cb')['format'](_0x5762d3['id']);}else{if(DataManager[_0xb3c6('0x13f')](_0x5762d3)){if(_0xb3c6('0x3c2')!==_0xb3c6('0x3c2')){function _0x3926bc(){_0x2a6e71=this[_0xb3c6('0x152')][_0xb3c6('0x42e')](_0x338a1f,!![]);}}else _0x3166f5=_0xb3c6('0x39f')[_0xb3c6('0x1ab')](_0x5762d3['id']);}else return;}}if(this[_0xb3c6('0x1a4')][_0xb3c6('0xf2')](_0x3166f5)){if(_0xb3c6('0x27a')!==_0xb3c6('0x361'))this[_0xb3c6('0x1a4')][_0xb3c6('0x6f')](this[_0xb3c6('0x1a4')]['indexOf'](_0x3166f5),0x1);else{function _0x44621a(){return _0x57d8a4['_scene'][_0xb3c6('0x311')]()?0x1:0x2;}}}},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x18b')]=Game_Party['prototype'][_0xb3c6('0x42c')],Game_Party['prototype'][_0xb3c6('0x42c')]=function(_0x4bfe47,_0x2b2abf,_0x5777d7){const _0x2f006c=this[_0xb3c6('0x208')](_0x4bfe47);VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x18b')][_0xb3c6('0x274')](this,_0x4bfe47,_0x2b2abf,_0x5777d7);if(this[_0xb3c6('0x208')](_0x4bfe47)>_0x2f006c)this[_0xb3c6('0x35a')](_0x4bfe47);},Game_Party[_0xb3c6('0x18a')][_0xb3c6('0x389')]=function(_0x3d948f){return DataManager['maxItemAmount'](_0x3d948f);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x301')]=Scene_ItemBase[_0xb3c6('0x18a')][_0xb3c6('0x316')],Scene_ItemBase[_0xb3c6('0x18a')][_0xb3c6('0x316')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x301')]['call'](this),this[_0xb3c6('0x94')][_0xb3c6('0x37d')]();},Scene_Item['prototype'][_0xb3c6('0xf3')]=function(){if(ConfigManager[_0xb3c6('0x1f7')]&&ConfigManager[_0xb3c6('0x28c')]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0x134')===_0xb3c6('0x134'))return this[_0xb3c6('0x32f')]()['match'](/LOWER/i);else{function _0x49bf15(){_0x5ed3b2[_0xb3c6('0x91')](_0x586324[_0x1c2970]);}}}else{if(_0xb3c6('0x1e9')===_0xb3c6('0xd6')){function _0x34515c(){this[_0xb3c6('0x374')]();}}else Scene_ItemBase[_0xb3c6('0x18a')][_0xb3c6('0x360')]['call'](this);}}},Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x360')]=function(){if(ConfigManager['uiMenuStyle']&&ConfigManager[_0xb3c6('0x384')]!==undefined)return ConfigManager[_0xb3c6('0x384')];else{if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0x3a3')===_0xb3c6('0x3a3'))return this[_0xb3c6('0x32f')]()[_0xb3c6('0x10b')](/RIGHT/i);else{function _0x5dfdbd(){const _0x1688b4=this[_0xb3c6('0x208')](_0x2fb8c2);_0x5ab9aa['ItemsEquipsCore'][_0xb3c6('0x18b')][_0xb3c6('0x274')](this,_0x2948c2,_0x4e40ae,_0x28cc3c);if(this[_0xb3c6('0x208')](_0x116487)>_0x1688b4)this['setNewItem'](_0x4e856e);}}}else{if(_0xb3c6('0x238')===_0xb3c6('0x238'))Scene_ItemBase['prototype'][_0xb3c6('0x360')][_0xb3c6('0x274')](this);else{function _0x5a6c71(){return _0x4b5113[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x182')];}}}}},Scene_Item['prototype']['updatedLayoutStyle']=function(){return VisuMZ[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x2cf')][_0xb3c6('0x10d')];},Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x119')]=function(){return this['_categoryWindow']&&this[_0xb3c6('0x2c7')][_0xb3c6('0x119')]();},Scene_Item['prototype'][_0xb3c6('0x311')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['ItemScene'][_0xb3c6('0x213')];},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x181')]=Scene_Item[_0xb3c6('0x18a')]['create'],Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x1f')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x181')]['call'](this),this['isUseModernControls']()&&this[_0xb3c6('0x20e')]();},Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x415')]=function(){if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0x75')!=='LiOVX')return this[_0xb3c6('0x3ac')]();else{function _0x48cae5(){return _0xb3c6('0x127');}}}else return Scene_ItemBase[_0xb3c6('0x18a')][_0xb3c6('0x415')][_0xb3c6('0x274')](this);},Scene_Item['prototype'][_0xb3c6('0x3ac')]=function(){const _0x4eda9b=0x0,_0x4411c3=this[_0xb3c6('0x5a')](),_0xde7dee=Graphics[_0xb3c6('0x2a2')],_0x1424c7=this['helpAreaHeight']();return new Rectangle(_0x4eda9b,_0x4411c3,_0xde7dee,_0x1424c7);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x249')]=Scene_Item['prototype'][_0xb3c6('0x240')],Scene_Item['prototype']['createCategoryWindow']=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x249')]['call'](this),this[_0xb3c6('0x119')]()&&this['postCreateCategoryWindowItemsEquipsCore']();},Scene_Item[_0xb3c6('0x18a')]['postCreateCategoryWindowItemsEquipsCore']=function(){delete this[_0xb3c6('0x2c7')]['_handlers']['ok'],delete this['_categoryWindow'][_0xb3c6('0x21f')][_0xb3c6('0x33e')];},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x41e')]=Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x19d')],Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x19d')]=function(){return this[_0xb3c6('0x311')]()?this[_0xb3c6('0x3cc')]():VisuMZ['ItemsEquipsCore'][_0xb3c6('0x41e')][_0xb3c6('0x274')](this);},Scene_Item['prototype'][_0xb3c6('0x3cc')]=function(){const _0x5281e9=0x0,_0xf45ac7=this[_0xb3c6('0x176')](),_0x52b36b=Graphics[_0xb3c6('0x2a2')],_0x5cc8b=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x5281e9,_0xf45ac7,_0x52b36b,_0x5cc8b);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0xfd')]=Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x2ba')],Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x2ba')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0xfd')]['call'](this);this['isUseModernControls']()&&this[_0xb3c6('0x1a1')]();if(this[_0xb3c6('0x146')]()){if(_0xb3c6('0x24b')===_0xb3c6('0x3f6')){function _0x127345(){this[_0xb3c6('0x76')]();}}else this[_0xb3c6('0x122')]();}},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x8b')]=Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x248')],Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x248')]=function(){if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0xb3c6('0x25b')]();else{const _0x53a2ab=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x8b')][_0xb3c6('0x274')](this);return this['allowCreateStatusWindow']()&&this[_0xb3c6('0x283')]()&&(_0x53a2ab[_0xb3c6('0x1aa')]-=this['statusWidth']()),_0x53a2ab;}},Scene_Item[_0xb3c6('0x18a')]['itemWindowRectItemsEquipsCore']=function(){const _0x35529e=this['isRightInputMode']()?this[_0xb3c6('0xe9')]():0x0,_0x45d47f=this[_0xb3c6('0x2c7')]['y']+this[_0xb3c6('0x2c7')][_0xb3c6('0x395')],_0x1293a8=Graphics[_0xb3c6('0x2a2')]-this[_0xb3c6('0xe9')](),_0x48a02d=this[_0xb3c6('0x1e3')]()-_0x45d47f;return new Rectangle(_0x35529e,_0x45d47f,_0x1293a8,_0x48a02d);},Scene_Item['prototype'][_0xb3c6('0x1a1')]=function(){this['_itemWindow'][_0xb3c6('0xc8')](_0xb3c6('0x33e'),this['popScene'][_0xb3c6('0x187')](this));},Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x146')]=function(){if(this[_0xb3c6('0x311')]())return!![];else{if('IZPFr'!==_0xb3c6('0x256')){function _0x585c5e(){return![];}}else return VisuMZ['ItemsEquipsCore']['Settings'][_0xb3c6('0x2cf')][_0xb3c6('0x3f5')];}},Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x283')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')][_0xb3c6('0x5')];},Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x122')]=function(){const _0x4c8d6a=this[_0xb3c6('0x3f')]();this[_0xb3c6('0x132')]=new Window_ShopStatus(_0x4c8d6a),this[_0xb3c6('0xe')](this[_0xb3c6('0x132')]),this[_0xb3c6('0x94')][_0xb3c6('0x3ab')](this[_0xb3c6('0x132')]);},Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x3f')]=function(){return this[_0xb3c6('0x311')]()?this[_0xb3c6('0xe5')]():VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['ItemScene'][_0xb3c6('0x2b8')][_0xb3c6('0x274')](this);},Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0xe5')]=function(){const _0x170a9e=this[_0xb3c6('0xe9')](),_0x5665a6=this[_0xb3c6('0x94')][_0xb3c6('0x395')],_0x4e88e6=this['isRightInputMode']()?0x0:Graphics[_0xb3c6('0x2a2')]-this[_0xb3c6('0xe9')](),_0x5dcc84=this[_0xb3c6('0x94')]['y'];return new Rectangle(_0x4e88e6,_0x5dcc84,_0x170a9e,_0x5665a6);},Scene_Item[_0xb3c6('0x18a')]['statusWidth']=function(){return Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0xe9')]();},Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0xaa')]=function(){if(!this['updatedLayoutStyle']())return![];if(!this['isUseModernControls']())return![];if(!this['_itemWindow'])return![];if(!this['_itemWindow'][_0xb3c6('0x3e3')])return![];return this[_0xb3c6('0x32f')]()&&this['isUseModernControls']();},Scene_Item[_0xb3c6('0x18a')]['buttonAssistKey1']=function(){if(this[_0xb3c6('0xaa')]()){if(this[_0xb3c6('0x94')][_0xb3c6('0x37')]()===0x1){if(_0xb3c6('0x37e')===_0xb3c6('0x37e'))return TextManager[_0xb3c6('0x1fb')](_0xb3c6('0x42d'),_0xb3c6('0x345'));else{function _0x206741(){return this[_0xb3c6('0x32f')]()[_0xb3c6('0x10b')](/LOWER/i);}}}else return TextManager['getInputMultiButtonStrings'](_0xb3c6('0xa4'),_0xb3c6('0x15f'));}return Scene_ItemBase[_0xb3c6('0x18a')][_0xb3c6('0x2a5')][_0xb3c6('0x274')](this);},Scene_Item[_0xb3c6('0x18a')][_0xb3c6('0x112')]=function(){if(this[_0xb3c6('0xaa')]())return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')]['buttonAssistCategory'];return Scene_ItemBase[_0xb3c6('0x18a')][_0xb3c6('0x112')][_0xb3c6('0x274')](this);},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0xf3')]=function(){if(ConfigManager[_0xb3c6('0x1f7')]&&ConfigManager[_0xb3c6('0x28c')]!==undefined)return ConfigManager[_0xb3c6('0x28c')];else{if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0x2f9')!==_0xb3c6('0x40c'))return this[_0xb3c6('0x32f')]()[_0xb3c6('0x10b')](/LOWER/i);else{function _0x4270e6(){return this[_0xb3c6('0x25b')]();}}}else{if(_0xb3c6('0x2cd')!==_0xb3c6('0x1ce'))Scene_MenuBase[_0xb3c6('0x18a')][_0xb3c6('0x360')][_0xb3c6('0x274')](this);else{function _0xced70a(){return _0x55b34b[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x1fd')];}}}}},Scene_Equip['prototype'][_0xb3c6('0x360')]=function(){if(ConfigManager[_0xb3c6('0x1f7')]&&ConfigManager[_0xb3c6('0x384')]!==undefined)return ConfigManager['uiInputPosition'];else{if(this[_0xb3c6('0x311')]())return this[_0xb3c6('0x32f')]()['match'](/RIGHT/i);else Scene_MenuBase[_0xb3c6('0x18a')]['isRightInputMode'][_0xb3c6('0x274')](this);}},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x32f')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0x10d')];},Scene_Equip[_0xb3c6('0x18a')]['isUseModernControls']=function(){return this['_commandWindow']&&this[_0xb3c6('0x225')][_0xb3c6('0x119')]();},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x311')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0x213')];},VisuMZ['ItemsEquipsCore'][_0xb3c6('0x38e')]=Scene_Equip[_0xb3c6('0x18a')]['create'],Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x1f')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x38e')][_0xb3c6('0x274')](this),this[_0xb3c6('0x119')]()&&this['commandEquip']();},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x415')]=function(){if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0x2f0')!==_0xb3c6('0x1e4'))return this[_0xb3c6('0x3ac')]();else{function _0xe6c161(){return _0x31d687[_0xb3c6('0x188')][_0xb3c6('0x1dc')][_0xb3c6('0x16b')]['ExtDisplayedParams'];}}}else{if(_0xb3c6('0x38d')==='FNGqg')return Scene_MenuBase[_0xb3c6('0x18a')][_0xb3c6('0x415')][_0xb3c6('0x274')](this);else{function _0x6ee5a7(){return _0x579c2d[_0xb3c6('0x267')]?_0x56380c[_0xb3c6('0x188')][_0xb3c6('0x1dc')][_0xb3c6('0x16b')][_0xb3c6('0x336')]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}}},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x3ac')]=function(){const _0xbacaea=0x0,_0x579c22=this[_0xb3c6('0x5a')](),_0x306404=Graphics['boxWidth'],_0x59c2c5=this[_0xb3c6('0x2bd')]();return new Rectangle(_0xbacaea,_0x579c22,_0x306404,_0x59c2c5);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x3ca')]=Scene_Equip[_0xb3c6('0x18a')]['statusWindowRect'],Scene_Equip[_0xb3c6('0x18a')]['statusWindowRect']=function(){if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0x199')!=='naqcD'){function _0x18ec79(){this[_0xb3c6('0x21d')](_0x40222b,_0x482c7d['x'],_0x1f4db['y'],_0x41507d);}}else return this[_0xb3c6('0xe5')]();}else{if(_0xb3c6('0x85')===_0xb3c6('0x85'))return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x3ca')][_0xb3c6('0x274')](this);else{function _0x2f1587(){return _0xb3c6('0xe0');}}}},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0xe5')]=function(){const _0x123ded=this[_0xb3c6('0x360')]()?0x0:Graphics[_0xb3c6('0x2a2')]-this[_0xb3c6('0xe9')](),_0x159c2c=this['mainAreaTop'](),_0x44abf0=this['statusWidth'](),_0x5410dd=this[_0xb3c6('0x320')]();return new Rectangle(_0x123ded,_0x159c2c,_0x44abf0,_0x5410dd);},VisuMZ['ItemsEquipsCore'][_0xb3c6('0x381')]=Scene_Equip[_0xb3c6('0x18a')]['commandWindowRect'],Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x40f')]=function(){return this[_0xb3c6('0x311')]()?this['commandWindowRectItemsEquipsCore']():VisuMZ[_0xb3c6('0x2fb')]['Scene_Equip_commandWindowRect'][_0xb3c6('0x274')](this);},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x399')]=function(){const _0x232665=this[_0xb3c6('0x360')]()?this['statusWidth']():0x0,_0x3b37b7=this['mainAreaTop'](),_0x2e22b5=Graphics[_0xb3c6('0x2a2')]-this[_0xb3c6('0xe9')](),_0x3c8a85=this[_0xb3c6('0x276')](0x1,!![]);return new Rectangle(_0x232665,_0x3b37b7,_0x2e22b5,_0x3c8a85);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x63')]=Scene_Equip[_0xb3c6('0x18a')]['createSlotWindow'],Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x29a')]=function(){VisuMZ['ItemsEquipsCore'][_0xb3c6('0x63')][_0xb3c6('0x274')](this),this[_0xb3c6('0x119')]()&&this[_0xb3c6('0x3b9')]();},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x3fb')]=Scene_Equip['prototype'][_0xb3c6('0xbb')],Scene_Equip['prototype']['slotWindowRect']=function(){if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0x3c1')!==_0xb3c6('0x3c1')){function _0x3bc14f(){return this[_0xb3c6('0x1a8')](_0x2c918d);}}else return this[_0xb3c6('0x219')]();}else return VisuMZ[_0xb3c6('0x2fb')]['Scene_Equip_slotWindowRect']['call'](this);},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x219')]=function(){const _0x3f6478=this[_0xb3c6('0x40f')](),_0x303007=this[_0xb3c6('0x360')]()?this['statusWidth']():0x0,_0x5e598d=_0x3f6478['y']+_0x3f6478[_0xb3c6('0x395')],_0x145f3e=Graphics[_0xb3c6('0x2a2')]-this[_0xb3c6('0xe9')](),_0x3dc7e5=this[_0xb3c6('0x320')]()-_0x3f6478[_0xb3c6('0x395')];return new Rectangle(_0x303007,_0x5e598d,_0x145f3e,_0x3dc7e5);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x279')]=Scene_Equip[_0xb3c6('0x18a')]['itemWindowRect'],Scene_Equip[_0xb3c6('0x18a')]['itemWindowRect']=function(){if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0x20')!==_0xb3c6('0x30a'))return this[_0xb3c6('0xbb')]();else{function _0xe5612e(){_0xd9d0b7=_0x2b8285[_0xb3c6('0x1c5')](_0x13377b),_0x5a94d8[_0xb3c6('0x2fb')][_0xb3c6('0xb5')]['call'](this,_0x4a9c0b,_0x44120c),this[_0xb3c6('0xd')]();}}}else return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x279')][_0xb3c6('0x274')](this);},Scene_Equip['prototype']['statusWidth']=function(){if(this[_0xb3c6('0x311')]())return this[_0xb3c6('0x26c')]();else{if('nAmgH'==='FcVYK'){function _0x3e97ef(){const _0x5efae0=this['_newLabelSprites'];if(_0x5efae0[_0x5db5e2])return _0x5efae0[_0x2503d3];else{const _0x2727b8=new _0x28719e();return _0x5efae0[_0x481409]=_0x2727b8,this['addInnerChild'](_0x2727b8),_0x2727b8;}}}else return VisuMZ[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x234')]['StatusWindowWidth'];}},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x26c')]=function(){return Math[_0xb3c6('0x3c7')](Graphics[_0xb3c6('0x2a2')]/0x2);},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x3b9')]=function(){this[_0xb3c6('0x343')]['setHandler'](_0xb3c6('0x33e'),this[_0xb3c6('0x115')][_0xb3c6('0x187')](this)),this[_0xb3c6('0x343')][_0xb3c6('0xc8')](_0xb3c6('0x15f'),this[_0xb3c6('0x363')][_0xb3c6('0x187')](this)),this[_0xb3c6('0x343')][_0xb3c6('0xc8')](_0xb3c6('0xa4'),this[_0xb3c6('0x2a')][_0xb3c6('0x187')](this));},VisuMZ['ItemsEquipsCore'][_0xb3c6('0x375')]=Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x230')],Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x230')]=function(){this['isUseModernControls']()&&(this[_0xb3c6('0x225')][_0xb3c6('0x327')](),this['_commandWindow']['deactivate']()),VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x375')][_0xb3c6('0x274')](this);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x216')]=Scene_Equip['prototype']['onSlotOk'],Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x49')]=function(){this[_0xb3c6('0x343')]['index']()>=0x0?(VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x216')][_0xb3c6('0x274')](this),this['onSlotOkAutoSelect']()):(this[_0xb3c6('0x343')][_0xb3c6('0x406')](0x0),this[_0xb3c6('0x343')][_0xb3c6('0xf8')]());},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x111')]=function(){const _0x517751=this[_0xb3c6('0x343')][_0xb3c6('0x43')](),_0x44e2c5=this[_0xb3c6('0x94')][_0xb3c6('0xb1')]['indexOf'](_0x517751),_0x25de15=Math[_0xb3c6('0x3c7')](this[_0xb3c6('0x94')]['maxVisibleItems']()/0x2)-0x1;this[_0xb3c6('0x94')][_0xb3c6('0x406')](_0x44e2c5>=0x0?_0x44e2c5:0x0),this[_0xb3c6('0x94')]['setTopRow'](this[_0xb3c6('0x94')][_0xb3c6('0x15')]()-_0x25de15);},VisuMZ[_0xb3c6('0x2fb')]['Scene_Equip_onSlotCancel']=Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x138')],Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x138')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x261')][_0xb3c6('0x274')](this);if(this[_0xb3c6('0x119')]()){if(_0xb3c6('0x151')===_0xb3c6('0x151'))this[_0xb3c6('0x225')][_0xb3c6('0x406')](0x0),this[_0xb3c6('0x343')][_0xb3c6('0x36c')]();else{function _0x5d8c87(){this[_0xb3c6('0x3d4')](),_0x1e5aef[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x234')]['DrawParamJS'][_0xb3c6('0x274')](this);}}}},VisuMZ[_0xb3c6('0x2fb')]['Scene_Equip_onActorChange']=Scene_Equip[_0xb3c6('0x18a')]['onActorChange'],Scene_Equip['prototype'][_0xb3c6('0x2f')]=function(){VisuMZ['ItemsEquipsCore'][_0xb3c6('0x354')][_0xb3c6('0x274')](this),this[_0xb3c6('0x119')]()&&(this[_0xb3c6('0x225')]['deactivate'](),this[_0xb3c6('0x225')]['deselect'](),this[_0xb3c6('0x343')][_0xb3c6('0x406')](0x0),this[_0xb3c6('0x343')][_0xb3c6('0xf8')]());},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x2c6')]=function(){if(!this['_slotWindow'])return![];if(!this[_0xb3c6('0x343')][_0xb3c6('0x3e3')])return![];return this[_0xb3c6('0x343')][_0xb3c6('0x1d8')]();},Scene_Equip['prototype'][_0xb3c6('0x32')]=function(){if(this[_0xb3c6('0x2c6')]()){if(_0xb3c6('0x31')!=='lFfdq'){function _0x421620(){_0x1b363b(_0x260330);}}else return TextManager['getInputButtonString'](_0xb3c6('0x8c'));}return Scene_MenuBase['prototype'][_0xb3c6('0x32')][_0xb3c6('0x274')](this);},Scene_Equip[_0xb3c6('0x18a')]['buttonAssistText3']=function(){if(this[_0xb3c6('0x2c6')]()){if(_0xb3c6('0x217')!==_0xb3c6('0x2a4'))return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['EquipScene'][_0xb3c6('0x3d2')];else{function _0x52c9d9(){return _0x595add[_0xb3c6('0x267')]&&_0x51a98e['prototype'][_0xb3c6('0x119')]['call'](this);}}}return Scene_MenuBase[_0xb3c6('0x18a')][_0xb3c6('0x2e')][_0xb3c6('0x274')](this);},Scene_Equip[_0xb3c6('0x18a')][_0xb3c6('0x209')]=function(){if(this[_0xb3c6('0x2c6')]())return this[_0xb3c6('0x2db')][_0xb3c6('0x1aa')]/0x5/-0x3;return Scene_MenuBase[_0xb3c6('0x18a')][_0xb3c6('0x209')][_0xb3c6('0x274')](this);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1ed')]=Scene_Load[_0xb3c6('0x18a')][_0xb3c6('0x3ff')],Scene_Load[_0xb3c6('0x18a')]['reloadMapIfUpdated']=function(){VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1ed')][_0xb3c6('0x274')](this),this['refreshActorEquipSlotsIfUpdated']();},Scene_Load[_0xb3c6('0x18a')][_0xb3c6('0x33b')]=function(){if($gameSystem[_0xb3c6('0x280')]()!==$dataSystem[_0xb3c6('0x280')])for(const _0x3fadb5 of $gameActors[_0xb3c6('0xb1')]){if(_0xb3c6('0x3eb')!==_0xb3c6('0x3eb')){function _0x2a855f(){this[_0xb3c6('0x5d')](_0x1ec280[_0xb3c6('0x410')]());}}else{if(_0x3fadb5)_0x3fadb5[_0xb3c6('0x2bc')]();}}},Scene_Shop['prototype'][_0xb3c6('0xf3')]=function(){if(ConfigManager[_0xb3c6('0x1f7')]&&ConfigManager[_0xb3c6('0x28c')]!==undefined){if(_0xb3c6('0x7b')===_0xb3c6('0xc3')){function _0x38455e(){_0x4112ef[_0xb3c6('0x126')]('shift')?this[_0xb3c6('0x236')]():this[_0xb3c6('0x145')](_0x2983a8[_0xb3c6('0x20f')]('down'));}}else return ConfigManager[_0xb3c6('0x28c')];}else{if(this[_0xb3c6('0x311')]())return this[_0xb3c6('0x32f')]()['match'](/LOWER/i);else Scene_MenuBase['prototype'][_0xb3c6('0x360')][_0xb3c6('0x274')](this);}},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x360')]=function(){if(ConfigManager[_0xb3c6('0x1f7')]&&ConfigManager[_0xb3c6('0x384')]!==undefined)return ConfigManager[_0xb3c6('0x384')];else{if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0x400')==='qearG')return this[_0xb3c6('0x32f')]()[_0xb3c6('0x10b')](/RIGHT/i);else{function _0x9ecf35(){return _0x5c3619[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x330')];}}}else Scene_MenuBase[_0xb3c6('0x18a')]['isRightInputMode']['call'](this);}},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x32f')]=function(){return VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x266')][_0xb3c6('0x10d')];},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x119')]=function(){return this[_0xb3c6('0x2c7')]&&this[_0xb3c6('0x2c7')][_0xb3c6('0x119')]();},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x311')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['ShopScene']['EnableLayout'];},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0xb5')]=Scene_Shop['prototype'][_0xb3c6('0x2cb')],Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x2cb')]=function(_0x354ef7,_0x3901e9){_0x354ef7=JsonEx[_0xb3c6('0x1c5')](_0x354ef7),VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0xb5')][_0xb3c6('0x274')](this,_0x354ef7,_0x3901e9),this[_0xb3c6('0xd')]();},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0xd')]=function(){this[_0xb3c6('0x1c2')]=0x0;for(const _0x1f8d6f of this[_0xb3c6('0x436')]){if(this[_0xb3c6('0x11c')](_0x1f8d6f)){if(_0xb3c6('0x432')!==_0xb3c6('0x432')){function _0x28ff39(){const _0x6d41d4=this[_0xb3c6('0x2b')]()[_0xb3c6('0x2b5')];for(let _0x281304=0x0;_0x281304<_0x6d41d4;_0x281304++){if(this[_0xb3c6('0x41f')](_0x281304))this[_0xb3c6('0x378')](_0x281304,null);}}}else this[_0xb3c6('0x1c2')]++;}else _0x1f8d6f[0x0]=-0x1;}},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x11c')]=function(_0x4dedea){if(_0x4dedea[0x0]>0x2||_0x4dedea[0x0]<0x0)return![];const _0x2862b4=[$dataItems,$dataWeapons,$dataArmors][_0x4dedea[0x0]][_0x4dedea[0x1]];if(!_0x2862b4)return![];const _0x38f1ad=_0x2862b4[_0xb3c6('0x31f')]||'';if(_0x38f1ad[_0xb3c6('0x10b')](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3666b0=JSON[_0xb3c6('0x434')]('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x483f0c of _0x3666b0){if(!$gameSwitches[_0xb3c6('0x12')](_0x483f0c))return![];}return!![];}if(_0x38f1ad['match'](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('YXuyA'===_0xb3c6('0x312')){function _0x5c2688(){return this[_0xb3c6('0x2bf')]();}}else{const _0x4098de=JSON[_0xb3c6('0x434')]('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x1662bc of _0x4098de){if(_0xb3c6('0xee')!==_0xb3c6('0x338')){if(!$gameSwitches[_0xb3c6('0x12')](_0x1662bc))return![];}else{function _0xe95adb(){return _0x15ed75[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')]['LayoutStyle'];}}}return!![];}}if(_0x38f1ad[_0xb3c6('0x10b')](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x12e147=JSON[_0xb3c6('0x434')]('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x408aed of _0x12e147){if(_0xb3c6('0xbd')!=='tGMVe'){if($gameSwitches[_0xb3c6('0x12')](_0x408aed))return!![];}else{function _0x322362(){const _0x4ac7d0=new _0x48cc35(0x0,0x0,_0x22cb0d['width'],_0x3978b4[_0xb3c6('0x395')]);this[_0xb3c6('0x36e')]=new _0x184cc7(_0x4ac7d0),this['_categoryNameWindow'][_0xb3c6('0x242')]=0x0,this[_0xb3c6('0x20b')](this[_0xb3c6('0x36e')]),this[_0xb3c6('0x100')]();}}}return![];}if(_0x38f1ad[_0xb3c6('0x10b')](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x18e8a6=JSON[_0xb3c6('0x434')]('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x426c1b of _0x18e8a6){if(_0xb3c6('0x174')===_0xb3c6('0x174')){if(!$gameSwitches[_0xb3c6('0x12')](_0x426c1b))return!![];}else{function _0xe55b4b(){if(!this['isOptimizeCommandAdded']())return;const _0x4f0fb7=this[_0xb3c6('0x17f')](),_0x434f3f=_0x29906a[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0xe6')],_0x3d2fe6=_0x4f0fb7===_0xb3c6('0xe0')?_0x37ab6c[_0xb3c6('0x19')]:_0xb3c6('0x396')[_0xb3c6('0x1ab')](_0x434f3f,_0x1ba74c[_0xb3c6('0x19')]),_0x31a7c4=this['isOptimizeCommandEnabled']();this[_0xb3c6('0x3ea')](_0x3d2fe6,_0xb3c6('0x19'),_0x31a7c4);}}}return![];}if(_0x38f1ad[_0xb3c6('0x10b')](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb3c6('0x1ad')===_0xb3c6('0x1ad')){const _0x295a9c=JSON[_0xb3c6('0x434')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2cf536 of _0x295a9c){if(!$gameSwitches[_0xb3c6('0x12')](_0x2cf536))return!![];}return![];}else{function _0xf66c33(){if(this[_0xb3c6('0x3f9')](_0x32f2c1))return _0x19dfdc[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')]['MaxItems'];else{if(this[_0xb3c6('0x200')](_0x205c3a))return _0x30468a[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x2cf')][_0xb3c6('0x38a')];else{if(this[_0xb3c6('0x13f')](_0x16c604))return _0x1a1a75['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')][_0xb3c6('0x3a6')];}}}}}if(_0x38f1ad[_0xb3c6('0x10b')](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb3c6('0x2d1')!==_0xb3c6('0x2d1')){function _0x69aed0(){this[_0xb3c6('0x1c1')]!==_0x3a2242&&(this[_0xb3c6('0x1c1')]=_0x5b4aef,this['refresh'](),this[_0xb3c6('0x2c7')]&&this['_categoryWindow'][_0xb3c6('0x119')]()?this['smoothSelect'](0x0):this[_0xb3c6('0x334')](0x0,0x0));}}else{const _0xcbec30=JSON['parse']('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x5aa6f4 of _0xcbec30){if($gameSwitches['value'](_0x5aa6f4))return![];}return!![];}}return!![];},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x431')]=Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x1f')],Scene_Shop['prototype'][_0xb3c6('0x1f')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x431')][_0xb3c6('0x274')](this),this[_0xb3c6('0x311')]()&&this[_0xb3c6('0xd4')]();},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0xd4')]=function(){this[_0xb3c6('0xb3')]['hide'](),this[_0xb3c6('0x1e7')][_0xb3c6('0x86')](),this[_0xb3c6('0x1e7')][_0xb3c6('0x327')](),this['_statusWindow'][_0xb3c6('0x86')]();},Scene_Shop[_0xb3c6('0x18a')]['helpWindowRect']=function(){return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0xb3c6('0x3ac')]():Scene_MenuBase[_0xb3c6('0x18a')]['helpWindowRect'][_0xb3c6('0x274')](this);},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x3ac')]=function(){const _0xa98f9d=0x0,_0x456f8d=this['helpAreaTop'](),_0x534427=Graphics[_0xb3c6('0x2a2')],_0x6d8698=this[_0xb3c6('0x2bd')]();return new Rectangle(_0xa98f9d,_0x456f8d,_0x534427,_0x6d8698);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x3f0')]=Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x1ee')],Scene_Shop[_0xb3c6('0x18a')]['goldWindowRect']=function(){return this[_0xb3c6('0x311')]()?this[_0xb3c6('0x2a7')]():VisuMZ[_0xb3c6('0x2fb')]['Scene_Shop_goldWindowRect'][_0xb3c6('0x274')](this);},Scene_Shop[_0xb3c6('0x18a')]['goldWindowRectItemsEquipsCore']=function(){const _0x20969b=this['mainCommandWidth'](),_0x30985b=this['calcWindowHeight'](0x1,!![]),_0x594fd3=this[_0xb3c6('0x360')]()?0x0:Graphics[_0xb3c6('0x2a2')]-_0x20969b,_0x29dab3=this[_0xb3c6('0x176')]();return new Rectangle(_0x594fd3,_0x29dab3,_0x20969b,_0x30985b);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x154')]=Scene_Shop[_0xb3c6('0x18a')]['commandWindowRect'],Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x40f')]=function(){return this[_0xb3c6('0x311')]()?this[_0xb3c6('0x399')]():VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x154')][_0xb3c6('0x274')](this);},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x399')]=function(){const _0x32d1f7=this['isRightInputMode']()?this[_0xb3c6('0x1fa')]():0x0,_0x459ff3=this[_0xb3c6('0x176')](),_0x356568=Graphics[_0xb3c6('0x2a2')]-this[_0xb3c6('0x1fa')](),_0x494f73=this[_0xb3c6('0x276')](0x1,!![]);return new Rectangle(_0x32d1f7,_0x459ff3,_0x356568,_0x494f73);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1ea')]=Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x284')],Scene_Shop[_0xb3c6('0x18a')]['numberWindowRect']=function(){if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0x1af')!==_0xb3c6('0x380'))return this[_0xb3c6('0x383')]();else{function _0x1bd8b6(){return _0x1a147f(_0x3c1790['$1']);}}}else return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1ea')][_0xb3c6('0x274')](this);},Scene_Shop[_0xb3c6('0x18a')]['numberWindowRectItemsEquipsCore']=function(){const _0x4c856f=this['_commandWindow']['y']+this[_0xb3c6('0x225')][_0xb3c6('0x395')],_0x2b528d=Graphics[_0xb3c6('0x2a2')]-this[_0xb3c6('0xe9')](),_0x10a5b5=this[_0xb3c6('0x360')]()?Graphics[_0xb3c6('0x2a2')]-_0x2b528d:0x0,_0xe73b91=this[_0xb3c6('0x320')]()-this[_0xb3c6('0x225')][_0xb3c6('0x395')];return new Rectangle(_0x10a5b5,_0x4c856f,_0x2b528d,_0xe73b91);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x264')]=Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x3f')],Scene_Shop[_0xb3c6('0x18a')]['statusWindowRect']=function(){return this[_0xb3c6('0x311')]()?this[_0xb3c6('0xe5')]():VisuMZ['ItemsEquipsCore'][_0xb3c6('0x264')][_0xb3c6('0x274')](this);},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0xe5')]=function(){const _0x464ead=this[_0xb3c6('0xe9')](),_0x532b92=this[_0xb3c6('0x320')]()-this['_commandWindow'][_0xb3c6('0x395')],_0x500817=this[_0xb3c6('0x360')]()?0x0:Graphics[_0xb3c6('0x2a2')]-_0x464ead,_0x3f129e=this[_0xb3c6('0x225')]['y']+this[_0xb3c6('0x225')][_0xb3c6('0x395')];return new Rectangle(_0x500817,_0x3f129e,_0x464ead,_0x532b92);},VisuMZ[_0xb3c6('0x2fb')]['Scene_Shop_buyWindowRect']=Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x2d')],Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x2d')]=function(){return this[_0xb3c6('0x311')]()?this[_0xb3c6('0x33f')]():VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0xdc')][_0xb3c6('0x274')](this);},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x33f')]=function(){const _0x3f7c39=this[_0xb3c6('0x225')]['y']+this[_0xb3c6('0x225')][_0xb3c6('0x395')],_0x266a68=Graphics[_0xb3c6('0x2a2')]-this['statusWidth'](),_0x75e99d=this[_0xb3c6('0x320')]()-this[_0xb3c6('0x225')][_0xb3c6('0x395')],_0x28284d=this[_0xb3c6('0x360')]()?Graphics[_0xb3c6('0x2a2')]-_0x266a68:0x0;return new Rectangle(_0x28284d,_0x3f7c39,_0x266a68,_0x75e99d);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x9c')]=Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x240')],Scene_Shop[_0xb3c6('0x18a')]['createCategoryWindow']=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x9c')]['call'](this),this[_0xb3c6('0x119')]()&&this[_0xb3c6('0x76')]();},VisuMZ['ItemsEquipsCore']['Scene_Shop_categoryWindowRect']=Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x19d')],Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x19d')]=function(){if(this[_0xb3c6('0x311')]())return this[_0xb3c6('0x3cc')]();else{if(_0xb3c6('0x23')==='alzqE')return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x170')][_0xb3c6('0x274')](this);else{function _0x3117d0(){_0x2f8a4e+='%1'['format'](this[_0xb3c6('0x278')]['selfTP']);}}}},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x3cc')]=function(){const _0x3dbb52=this['_commandWindow']['y'],_0x2e4595=this['_commandWindow'][_0xb3c6('0x1aa')],_0x2e986e=this[_0xb3c6('0x276')](0x1,!![]),_0x2c001e=this['isRightInputMode']()?Graphics['boxWidth']-_0x2e4595:0x0;return new Rectangle(_0x2c001e,_0x3dbb52,_0x2e4595,_0x2e986e);},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x76')]=function(){delete this[_0xb3c6('0x2c7')][_0xb3c6('0x21f')]['ok'],delete this[_0xb3c6('0x2c7')][_0xb3c6('0x21f')][_0xb3c6('0x33e')];},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x268')]=Scene_Shop['prototype'][_0xb3c6('0x3bd')],Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x3bd')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x268')][_0xb3c6('0x274')](this),this[_0xb3c6('0x311')]()&&this[_0xb3c6('0x424')]();},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x314')]=Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x12c')],Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x12c')]=function(){if(this[_0xb3c6('0x311')]()){if('pUWSR'!==_0xb3c6('0x251'))return this[_0xb3c6('0x41d')]();else{function _0x32f192(){!this[_0xb3c6('0x398')]()&&_0x4dad76[_0xb3c6('0x18a')][_0xb3c6('0x3e5')]['call'](this);}}}else{if(_0xb3c6('0x2f8')==='KFpFU')return VisuMZ[_0xb3c6('0x2fb')]['Scene_Shop_sellWindowRect'][_0xb3c6('0x274')](this);else{function _0x4ba940(){const _0x2f1e0f=_0x249ff7[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x1a9')];return _0x2f1e0f[_0xb3c6('0x1ab')](_0x825b4d['hp']);}}}},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x41d')]=function(){const _0x3f4913=this[_0xb3c6('0x2c7')]['y']+this[_0xb3c6('0x2c7')]['height'],_0x17d5f6=Graphics[_0xb3c6('0x2a2')]-this[_0xb3c6('0xe9')](),_0x31c871=this[_0xb3c6('0x320')]()-this[_0xb3c6('0x2c7')][_0xb3c6('0x395')],_0x440bc2=this[_0xb3c6('0x360')]()?Graphics[_0xb3c6('0x2a2')]-_0x17d5f6:0x0;return new Rectangle(_0x440bc2,_0x3f4913,_0x17d5f6,_0x31c871);},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x424')]=function(){this[_0xb3c6('0x17c')][_0xb3c6('0x3ab')](this[_0xb3c6('0x132')]);},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0xe9')]=function(){return VisuMZ[_0xb3c6('0x2fb')]['Settings']['StatusWindow'][_0xb3c6('0x1fd')];},VisuMZ[_0xb3c6('0x2fb')]['Scene_Shop_activateSellWindow']=Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x1a2')],Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x1a2')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x5e')][_0xb3c6('0x274')](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0xb3c6('0x132')][_0xb3c6('0x86')]();},VisuMZ[_0xb3c6('0x2fb')]['Scene_Shop_commandBuy']=Scene_Shop['prototype'][_0xb3c6('0x387')],Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x387')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x13')]['call'](this);if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0x2be')!==_0xb3c6('0x2c2'))this[_0xb3c6('0xce')]();else{function _0x293eeb(){this['changeTextColor'](_0x17a5bc[_0xb3c6('0x30f')](_0x568ee3)),_0x22ce23=(_0x14f423>0x0?_0xb3c6('0x418'):_0xb3c6('0x20d'))[_0xb3c6('0x1ab')](_0x289ab8),this[_0xb3c6('0x2d2')](_0x167d88,_0x396fdc+_0xcda03a,_0x50a913,_0x5cec33,'left');}}}},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0xce')]=function(){this[_0xb3c6('0x2ee')]=this[_0xb3c6('0x2ee')]||0x0,this[_0xb3c6('0x1e7')][_0xb3c6('0x406')](this[_0xb3c6('0x2ee')]);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x29')]=Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0xac')],Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0xac')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x29')][_0xb3c6('0x274')](this);if(this[_0xb3c6('0x311')]()){if(_0xb3c6('0xe8')==='PDvpU')this['commandSellItemsEquipsCore']();else{function _0x10d633(){return _0x89c1e7['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')][_0xb3c6('0x348')];}}}this[_0xb3c6('0x119')]()&&(this[_0xb3c6('0x2c7')][_0xb3c6('0x406')](0x0),this[_0xb3c6('0x20e')]());},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x366')]=function(){this[_0xb3c6('0x1e7')]['hide'](),this[_0xb3c6('0x225')]['hide']();},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1a7')]=Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x2e9')],Scene_Shop['prototype'][_0xb3c6('0x2e9')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1a7')]['call'](this),this[_0xb3c6('0x311')]()&&this[_0xb3c6('0x324')]();},Scene_Shop['prototype']['onBuyCancelItemsEquipsCore']=function(){this['_buyWindowLastIndex']=this[_0xb3c6('0x1e7')][_0xb3c6('0x15')](),this[_0xb3c6('0x1e7')][_0xb3c6('0x86')](),this[_0xb3c6('0x1e7')][_0xb3c6('0x327')](),this['_buyWindow'][_0xb3c6('0x229')](0x0,0x0),this[_0xb3c6('0x132')][_0xb3c6('0x86')](),this[_0xb3c6('0xb3')][_0xb3c6('0x31a')]();},VisuMZ['ItemsEquipsCore']['Scene_Shop_onCategoryCancel']=Scene_Shop['prototype'][_0xb3c6('0x413')],Scene_Shop['prototype']['onCategoryCancel']=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x38')]['call'](this),this[_0xb3c6('0x311')]()&&this[_0xb3c6('0xb4')]();},Scene_Shop[_0xb3c6('0x18a')]['onCategoryCancelItemsEquipsCore']=function(){this[_0xb3c6('0x1e7')]['show'](),this[_0xb3c6('0x225')][_0xb3c6('0x86')]();},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x194')]=Scene_Shop['prototype'][_0xb3c6('0x3e7')],Scene_Shop[_0xb3c6('0x18a')]['onSellOk']=function(){VisuMZ['ItemsEquipsCore'][_0xb3c6('0x194')][_0xb3c6('0x274')](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0xb3c6('0x3e9')===_0xb3c6('0x1c7')){function _0xefe796(){_0x73709a[_0xb3c6('0x2fb')][_0xb3c6('0x29')]['call'](this),this[_0xb3c6('0x311')]()&&this[_0xb3c6('0x366')](),this[_0xb3c6('0x119')]()&&(this['_categoryWindow'][_0xb3c6('0x406')](0x0),this[_0xb3c6('0x20e')]());}}else this[_0xb3c6('0x11')]();}},Scene_Shop[_0xb3c6('0x18a')]['onSellOkItemsEquipsCore']=function(){this[_0xb3c6('0x2c7')][_0xb3c6('0x86')]();},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x33a')]=Scene_Shop['prototype'][_0xb3c6('0x0')],Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x0')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x33a')]['call'](this);if(this[_0xb3c6('0x119')]()){if(_0xb3c6('0x16a')!==_0xb3c6('0x16a')){function _0x14419e(){return this[_0xb3c6('0x26c')]();}}else this[_0xb3c6('0x413')]();}},VisuMZ[_0xb3c6('0x2fb')]['Scene_Shop_sellingPrice']=Scene_Shop['prototype']['sellingPrice'],Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0xed')]=function(){let _0x3dbe78=this[_0xb3c6('0xd8')]();const _0x378f21=this[_0xb3c6('0x3a9')];return _0x3dbe78=VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x266')]['SellPriceJS'][_0xb3c6('0x274')](this,_0x378f21,_0x3dbe78),_0x3dbe78;},Scene_Shop['prototype'][_0xb3c6('0xd8')]=function(){if(!this[_0xb3c6('0x3a9')]){if(_0xb3c6('0x347')!==_0xb3c6('0x198'))return 0x0;else{function _0x3bbd64(){const _0x4fdc0f=this[_0xb3c6('0xe9')](),_0x3d5230=this[_0xb3c6('0x94')][_0xb3c6('0x395')],_0x3a7ea5=this[_0xb3c6('0x360')]()?0x0:_0x30bc28['boxWidth']-this[_0xb3c6('0xe9')](),_0x416875=this[_0xb3c6('0x94')]['y'];return new _0x394a81(_0x3a7ea5,_0x416875,_0x4fdc0f,_0x3d5230);}}}else{if(this[_0xb3c6('0x3a9')][_0xb3c6('0x31f')][_0xb3c6('0x10b')](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if(_0xb3c6('0x211')!==_0xb3c6('0x211')){function _0x525a6a(){this[_0xb3c6('0x5d')](_0x42b8e5[_0xb3c6('0x37a')]());}}else{const _0x39a74a=String(RegExp['$1']);let _0x32234b=this[_0xb3c6('0x3a9')],_0x19a856=_0x32234b[_0xb3c6('0x6e')]*this[_0xb3c6('0x36')]();try{if(_0xb3c6('0x35b')===_0xb3c6('0x35b'))eval(_0x39a74a);else{function _0x4e191b(){delete this[_0xb3c6('0x2c7')][_0xb3c6('0x21f')]['ok'],delete this[_0xb3c6('0x2c7')][_0xb3c6('0x21f')][_0xb3c6('0x33e')];}}}catch(_0x33b4aa){if(_0xb3c6('0x2b1')===_0xb3c6('0x2b1')){if($gameTemp['isPlaytest']())console[_0xb3c6('0x3b3')](_0x33b4aa);}else{function _0x131506(){const _0xb42169=_0x4cf796[_0xb3c6('0x1c5')](this['currentClass']()[_0xb3c6('0x2b')]);if(_0xb42169[_0xb3c6('0x2b5')]>=0x2&&this['isDualWield']())_0xb42169[0x1]=0x1;return _0xb42169;}}}if(isNaN(_0x19a856))_0x19a856=0x0;return Math[_0xb3c6('0x3c7')](_0x19a856);}}else{if(this[_0xb3c6('0x3a9')]['note'][_0xb3c6('0x10b')](/<SELL PRICE:[ ](\d+)>/i)){if(_0xb3c6('0x3b0')===_0xb3c6('0x3b0'))return parseInt(RegExp['$1']);else{function _0xa2fdc1(){return!!_0x262340&&_0x530b98[_0xb3c6('0x3f8')]===_0x6ed6(_0x2ea18['$1']);}}}else{if(_0xb3c6('0x2d6')!==_0xb3c6('0x2d6')){function _0x43097f(){_0x2e6f0c[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x201')][_0xb3c6('0x274')](this);}}else return Math['floor'](this['_item'][_0xb3c6('0x6e')]*this[_0xb3c6('0x36')]());}}}},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x36')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')]['SellPriceRate'];},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0xaa')]=function(){if(!this[_0xb3c6('0x32f')]())return![];if(!this[_0xb3c6('0x119')]())return![];if(!this[_0xb3c6('0x17c')])return![];if(!this[_0xb3c6('0x17c')][_0xb3c6('0x3e3')])return![];return this[_0xb3c6('0x32f')]()&&this[_0xb3c6('0x119')]();},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x2a5')]=function(){if(this[_0xb3c6('0xaa')]())return this['_sellWindow']['maxCols']()===0x1?TextManager[_0xb3c6('0x1fb')](_0xb3c6('0x42d'),_0xb3c6('0x345')):TextManager[_0xb3c6('0x1fb')](_0xb3c6('0xa4'),_0xb3c6('0x15f'));else{if(this['_numberWindow']&&this[_0xb3c6('0x1d0')]['active'])return TextManager[_0xb3c6('0x1fb')](_0xb3c6('0x42d'),_0xb3c6('0x345'));}return Scene_MenuBase[_0xb3c6('0x18a')][_0xb3c6('0x2a5')][_0xb3c6('0x274')](this);},Scene_Shop[_0xb3c6('0x18a')]['buttonAssistKey2']=function(){if(this[_0xb3c6('0x1d0')]&&this[_0xb3c6('0x1d0')][_0xb3c6('0x3e3')])return TextManager[_0xb3c6('0x1fb')]('up',_0xb3c6('0x3a1'));return Scene_MenuBase[_0xb3c6('0x18a')][_0xb3c6('0x1ff')]['call'](this);},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x112')]=function(){if(this[_0xb3c6('0xaa')]())return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')][_0xb3c6('0x348')];else{if(this[_0xb3c6('0x1d0')]&&this[_0xb3c6('0x1d0')][_0xb3c6('0x3e3')])return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')][_0xb3c6('0x67')];}return Scene_MenuBase['prototype'][_0xb3c6('0x112')][_0xb3c6('0x274')](this);},Scene_Shop[_0xb3c6('0x18a')][_0xb3c6('0x220')]=function(){if(this['_numberWindow']&&this[_0xb3c6('0x1d0')][_0xb3c6('0x3e3')]){if(_0xb3c6('0x142')!==_0xb3c6('0x142')){function _0x467db0(){const _0xc9ac38=this['_item'][_0xb3c6('0x31f')];if(_0xc9ac38['match'](/<ALWAYS HIT>/i))return _0xb3c6('0x127');else{if(_0xc9ac38[_0xb3c6('0x10b')](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0xb3c6('0x191')[_0xb3c6('0x1ab')](_0x4b8501(_0x1f6672['$1']));}}}else return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')][_0xb3c6('0x113')];}return Scene_MenuBase[_0xb3c6('0x18a')][_0xb3c6('0x220')]['call'](this);};function Sprite_NewLabel(){this[_0xb3c6('0x1a6')](...arguments);}Sprite_NewLabel[_0xb3c6('0x18a')]=Object[_0xb3c6('0x1f')](Sprite[_0xb3c6('0x18a')]),Sprite_NewLabel[_0xb3c6('0x18a')][_0xb3c6('0x1d6')]=Sprite_NewLabel,Sprite_NewLabel[_0xb3c6('0x18a')][_0xb3c6('0x1a6')]=function(){Sprite['prototype'][_0xb3c6('0x1a6')][_0xb3c6('0x274')](this),this[_0xb3c6('0x272')]();},Sprite_NewLabel[_0xb3c6('0x18a')][_0xb3c6('0x272')]=function(){const _0x4d94ae=ImageManager[_0xb3c6('0x32e')],_0x554a31=ImageManager[_0xb3c6('0x205')];this[_0xb3c6('0x38f')]=new Bitmap(_0x4d94ae,_0x554a31),this[_0xb3c6('0x3fc')](),this[_0xb3c6('0x3e0')]();},Sprite_NewLabel[_0xb3c6('0x18a')][_0xb3c6('0x3fc')]=function(){const _0x1c9b57=VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x359')][_0xb3c6('0x2e2')];if(_0x1c9b57<=0x0)return;const _0x59b218=ImageManager[_0xb3c6('0x155')](_0xb3c6('0x2f1')),_0x59231f=ImageManager[_0xb3c6('0x32e')],_0x3f45d9=ImageManager[_0xb3c6('0x205')],_0xcc4488=_0x1c9b57%0x10*_0x59231f,_0x334914=Math[_0xb3c6('0x3c7')](_0x1c9b57/0x10)*_0x3f45d9;this[_0xb3c6('0x38f')][_0xb3c6('0x26e')](_0x59b218,_0xcc4488,_0x334914,_0x59231f,_0x3f45d9,0x0,0x0);},Sprite_NewLabel[_0xb3c6('0x18a')][_0xb3c6('0x3e0')]=function(){const _0x403e46=VisuMZ['ItemsEquipsCore']['Settings'][_0xb3c6('0x359')][_0xb3c6('0x34e')];if(_0x403e46==='')return;const _0x523d73=ImageManager['iconWidth'],_0x4832f2=ImageManager[_0xb3c6('0x205')];this[_0xb3c6('0x38f')]['textColor']=this[_0xb3c6('0xf4')](),this[_0xb3c6('0x38f')][_0xb3c6('0x286')]=VisuMZ[_0xb3c6('0x2fb')]['Settings']['New']['FontSize'],this['bitmap']['drawText'](_0x403e46,0x0,_0x4832f2/0x2,_0x523d73,_0x4832f2/0x2,_0xb3c6('0x26f'));},Sprite_NewLabel[_0xb3c6('0x18a')]['getTextColor']=function(){const _0x50e002=VisuMZ[_0xb3c6('0x2fb')]['Settings']['New'][_0xb3c6('0x353')];return _0x50e002['match'](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0xb3c6('0x4b')](_0x50e002);},Window_Base[_0xb3c6('0x18a')][_0xb3c6('0x29b')]=function(_0x5c52e0,_0x8be321,_0x5e8367,_0x3e5082){if(_0x5c52e0){const _0x360969=_0x5e8367+(this[_0xb3c6('0x3b4')]()-ImageManager[_0xb3c6('0x205')])/0x2,_0x165103=ImageManager[_0xb3c6('0x32e')]+0x4,_0x14f00d=Math[_0xb3c6('0x30d')](0x0,_0x3e5082-_0x165103);this['changeTextColor'](ColorManager[_0xb3c6('0x25c')](_0x5c52e0)),this[_0xb3c6('0x2b3')](_0x5c52e0[_0xb3c6('0x2ce')],_0x8be321,_0x360969),this[_0xb3c6('0x2d2')](_0x5c52e0[_0xb3c6('0x2')],_0x8be321+_0x165103,_0x5e8367,_0x14f00d),this[_0xb3c6('0x172')]();}},Window_Base[_0xb3c6('0x18a')][_0xb3c6('0x273')]=function(_0x43a2bc,_0x308045,_0x152162,_0x13755b){if(this[_0xb3c6('0x28e')](_0x43a2bc)){this['resetFontSettings']();const _0x27dc3c=VisuMZ[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x2cf')],_0x384655=_0x27dc3c[_0xb3c6('0x203')],_0x399dda=_0x384655[_0xb3c6('0x1ab')]($gameParty[_0xb3c6('0x208')](_0x43a2bc));this[_0xb3c6('0xd5')][_0xb3c6('0x286')]=_0x27dc3c['ItemQuantityFontSize'],this[_0xb3c6('0x2d2')](_0x399dda,_0x308045,_0x152162,_0x13755b,_0xb3c6('0x345')),this[_0xb3c6('0x3d4')]();}},Window_Base[_0xb3c6('0x18a')][_0xb3c6('0x28e')]=function(_0x594ae3){if(DataManager[_0xb3c6('0x60')](_0x594ae3))return $dataSystem['optKeyItemsNumber'];return!![];},Window_Base[_0xb3c6('0x18a')][_0xb3c6('0x11d')]=function(_0x28278b,_0x4d96dd,_0x1e2504,_0x2bae0a,_0x453b19){_0x453b19=Math[_0xb3c6('0x30d')](_0x453b19||0x1,0x1);while(_0x453b19--){if(_0xb3c6('0x341')===_0xb3c6('0x2bb')){function _0x4f2c95(){const _0x258afb=_0x2d3771[_0xb3c6('0x434')]('['+_0x2f3ce4['$1']['match'](/\d+/g)+']');for(const _0x4fc619 of _0x258afb){if(_0x1cb4a8['value'](_0x4fc619))return!![];}return![];}}else{_0x2bae0a=_0x2bae0a||this[_0xb3c6('0x3b4')](),this['contentsBack'][_0xb3c6('0x116')]=0xa0;const _0x1f0829=ColorManager[_0xb3c6('0x1b2')]();this[_0xb3c6('0x2d5')][_0xb3c6('0x1c6')](_0x28278b+0x1,_0x4d96dd+0x1,_0x1e2504-0x2,_0x2bae0a-0x2,_0x1f0829),this[_0xb3c6('0x2d5')]['paintOpacity']=0xff;}}},VisuMZ['ItemsEquipsCore'][_0xb3c6('0x26a')]=Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0x1a6')],Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0x1a6')]=function(_0x43c606){this[_0xb3c6('0x6b')](),VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x26a')][_0xb3c6('0x274')](this,_0x43c606);},Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0x6b')]=function(){this[_0xb3c6('0x121')]={},this[_0xb3c6('0x8f')]=0xff,this[_0xb3c6('0x1b8')]=VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x359')]['FadeSpeed'],this[_0xb3c6('0x382')]=VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x359')][_0xb3c6('0x37b')];},Window_Selectable[_0xb3c6('0x18a')]['isShowNew']=function(){return![];},VisuMZ['ItemsEquipsCore'][_0xb3c6('0x3d1')]=Window_Selectable[_0xb3c6('0x18a')]['setHelpWindowItem'],Window_Selectable[_0xb3c6('0x18a')]['setHelpWindowItem']=function(_0x2154f3){VisuMZ[_0xb3c6('0x2fb')]['Window_Selectable_setHelpWindowItem'][_0xb3c6('0x274')](this,_0x2154f3);if(this[_0xb3c6('0x32a')]())this[_0xb3c6('0x192')](_0x2154f3);},Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0x192')]=function(_0x1d1e2d){if(!_0x1d1e2d)return;$gameParty[_0xb3c6('0x3cd')](_0x1d1e2d);let _0x3d57fd='';if(DataManager[_0xb3c6('0x3f9')](_0x1d1e2d))_0x3d57fd='item-%1'['format'](_0x1d1e2d['id']);else{if(DataManager[_0xb3c6('0x200')](_0x1d1e2d))_0x3d57fd=_0xb3c6('0x3cb')[_0xb3c6('0x1ab')](_0x1d1e2d['id']);else{if(DataManager[_0xb3c6('0x13f')](_0x1d1e2d)){if(_0xb3c6('0x1bd')===_0xb3c6('0xa9')){function _0xef25d9(){return _0x235743[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')][_0xb3c6('0x213')];}}else _0x3d57fd=_0xb3c6('0x39f')[_0xb3c6('0x1ab')](_0x1d1e2d['id']);}else return;}}const _0x413c0d=this[_0xb3c6('0x121')][_0x3d57fd];if(_0x413c0d)_0x413c0d[_0xb3c6('0x31a')]();},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x128')]=Window_Selectable[_0xb3c6('0x18a')]['refresh'],Window_Selectable['prototype'][_0xb3c6('0x2a1')]=function(){this[_0xb3c6('0x22')](),VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x128')][_0xb3c6('0x274')](this);},Window_Selectable['prototype'][_0xb3c6('0x22')]=function(){for(const _0xfff983 of Object[_0xb3c6('0x231')](this[_0xb3c6('0x121')])){if('NuQyv'==='NuQyv')_0xfff983[_0xb3c6('0x31a')]();else{function _0x24e0aa(){const _0x1c8d01=_0x3e4a67[_0xb3c6('0x434')]('['+_0x2b1d7b['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0xfcff2d of _0x1c8d01){if(!_0x673151[_0xb3c6('0x12')](_0xfcff2d))return!![];}return![];}}}},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x6d')]=Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0xf1')],Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0xf1')]=function(){this['updateNewLabelOpacity'](),VisuMZ['ItemsEquipsCore'][_0xb3c6('0x6d')][_0xb3c6('0x274')](this);},Window_Selectable[_0xb3c6('0x18a')]['updateNewLabelOpacity']=function(){if(!this[_0xb3c6('0x32a')]())return;const _0x5c1b57=this[_0xb3c6('0x382')];this[_0xb3c6('0x8f')]+=this[_0xb3c6('0x1b8')];(this[_0xb3c6('0x8f')]>=_0x5c1b57||this['_newLabelOpacity']<=0x0)&&(this[_0xb3c6('0x1b8')]*=-0x1);this[_0xb3c6('0x8f')]=this[_0xb3c6('0x8f')][_0xb3c6('0x3b7')](0x0,_0x5c1b57);for(const _0x2fb9f3 of Object[_0xb3c6('0x231')](this[_0xb3c6('0x121')])){_0x2fb9f3[_0xb3c6('0x242')]=this['_newLabelOpacity'];}},Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0x27b')]=function(_0x3affd7){const _0x27b57d=this[_0xb3c6('0x121')];if(_0x27b57d[_0x3affd7]){if(_0xb3c6('0x25a')!==_0xb3c6('0x2f6'))return _0x27b57d[_0x3affd7];else{function _0x55f28d(){return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0xb3c6('0x3ac')]():_0x1a635e[_0xb3c6('0x18a')][_0xb3c6('0x415')][_0xb3c6('0x274')](this);}}}else{if(_0xb3c6('0x1b7')===_0xb3c6('0x1b7')){const _0x5cb8dc=new Sprite_NewLabel();return _0x27b57d[_0x3affd7]=_0x5cb8dc,this[_0xb3c6('0x408')](_0x5cb8dc),_0x5cb8dc;}else{function _0x53781f(){this[_0xb3c6('0x1cc')][_0x427bfd][_0xb3c6('0x1fe')](null);}}}},Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0xbc')]=function(_0x2cf053,_0xc3db92,_0x32d907){let _0x40ea52='';if(DataManager[_0xb3c6('0x3f9')](_0x2cf053))_0x40ea52=_0xb3c6('0x222')[_0xb3c6('0x1ab')](_0x2cf053['id']);else{if(DataManager[_0xb3c6('0x200')](_0x2cf053))_0x40ea52=_0xb3c6('0x3cb')[_0xb3c6('0x1ab')](_0x2cf053['id']);else{if(DataManager[_0xb3c6('0x13f')](_0x2cf053))_0x40ea52=_0xb3c6('0x39f')[_0xb3c6('0x1ab')](_0x2cf053['id']);else{if('oAfSS'===_0xb3c6('0x3bb')){function _0x4b06f7(){return 0x63;}}else return;}}}const _0x145030=this[_0xb3c6('0x27b')](_0x40ea52);_0x145030['move'](_0xc3db92,_0x32d907),_0x145030[_0xb3c6('0x86')](),_0x145030[_0xb3c6('0x242')]=this[_0xb3c6('0x8f')];},Window_ItemCategory['categoryList']=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x15e')]['List'],Window_ItemCategory[_0xb3c6('0x16c')]=[_0xb3c6('0x8e'),_0xb3c6('0x247'),_0xb3c6('0x3c4'),_0xb3c6('0x9b'),_0xb3c6('0x1cf'),_0xb3c6('0x50'),_0xb3c6('0x8a'),_0xb3c6('0x427'),_0xb3c6('0x125')],VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x2ed')]=Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x1a6')],Window_ItemCategory[_0xb3c6('0x18a')]['initialize']=function(_0x101fac){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x2ed')][_0xb3c6('0x274')](this,_0x101fac),this[_0xb3c6('0x214')](_0x101fac);},Window_ItemCategory['prototype'][_0xb3c6('0x214')]=function(_0x491e68){const _0xa28354=new Rectangle(0x0,0x0,_0x491e68[_0xb3c6('0x1aa')],_0x491e68[_0xb3c6('0x395')]);this[_0xb3c6('0x36e')]=new Window_Base(_0xa28354),this[_0xb3c6('0x36e')][_0xb3c6('0x242')]=0x0,this[_0xb3c6('0x20b')](this['_categoryNameWindow']),this[_0xb3c6('0x100')]();},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x119')]=function(){return Imported[_0xb3c6('0x267')]&&Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x119')][_0xb3c6('0x274')](this);},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x144')]=function(){if(!this[_0xb3c6('0x119')]())Window_HorzCommand['prototype']['playOkSound'][_0xb3c6('0x274')](this);},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x37')]=function(){return this['_list']?this[_0xb3c6('0x389')]():0x4;},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0xf1')]=function(){Window_HorzCommand['prototype'][_0xb3c6('0xf1')]['call'](this);if(this[_0xb3c6('0x94')]){if(_0xb3c6('0x68')!==_0xb3c6('0x140'))this[_0xb3c6('0x94')][_0xb3c6('0x34b')](this[_0xb3c6('0x88')]());else{function _0x271504(){this[_0xb3c6('0x27')](_0x4c92f0);}}}},Window_ItemCategory['prototype'][_0xb3c6('0x3e5')]=function(){if(this[_0xb3c6('0x2c4')]()){const _0x32df0d=this['index']();if(this[_0xb3c6('0x94')]&&this['_itemWindow'][_0xb3c6('0x37')]()<=0x1){Input['isRepeated'](_0xb3c6('0x345'))&&this[_0xb3c6('0x3de')](Input[_0xb3c6('0x20f')]('right'));if(Input[_0xb3c6('0x106')](_0xb3c6('0x42d'))){if(_0xb3c6('0x393')!==_0xb3c6('0x28d'))this[_0xb3c6('0x177')](Input[_0xb3c6('0x20f')](_0xb3c6('0x42d')));else{function _0x2eaf26(){return _0x1253bf[_0xb3c6('0x15c')]&&this[_0xb3c6('0x152')][_0xb3c6('0xc9')]()!==''&&_0x538d1e[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0x29e')];}}}}else{if(this['_itemWindow']&&this[_0xb3c6('0x94')][_0xb3c6('0x37')]()>0x1){Input[_0xb3c6('0x106')](_0xb3c6('0x15f'))&&!Input['isPressed'](_0xb3c6('0x8c'))&&this['cursorRight'](Input['isTriggered'](_0xb3c6('0x15f')));if(Input[_0xb3c6('0x106')](_0xb3c6('0xa4'))&&!Input[_0xb3c6('0x126')](_0xb3c6('0x8c'))){if(_0xb3c6('0x16d')===_0xb3c6('0xff')){function _0x377e7a(){this['changePaintOpacity'](this[_0xb3c6('0xdb')](null));const _0x54e780=_0x3eaa81[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')],_0x265aca=this[_0xb3c6('0x120')](_0x25f93e),_0x16faec=_0x265aca['y']+(this[_0xb3c6('0x3b4')]()-_0x47e524['iconHeight'])/0x2,_0x432593=_0x3988d4['iconWidth']+0x4,_0x505c23=_0x2c970f[_0xb3c6('0x30d')](0x0,_0x265aca[_0xb3c6('0x1aa')]-_0x432593);this['resetTextColor'](),this[_0xb3c6('0x2b3')](_0x54e780['RemoveEquipIcon'],_0x265aca['x'],_0x16faec),this['drawText'](_0x54e780[_0xb3c6('0xfa')],_0x265aca['x']+_0x432593,_0x265aca['y'],_0x505c23),this[_0xb3c6('0x13a')](!![]);}}else this[_0xb3c6('0x177')](Input[_0xb3c6('0x20f')]('pageup'));}}}this['index']()!==_0x32df0d&&this[_0xb3c6('0x65')]();}},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0xd3')]=function(){if(this[_0xb3c6('0x119')]())return;Window_HorzCommand[_0xb3c6('0x18a')]['processHandling'][_0xb3c6('0x274')](this);},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x1a3')]=function(){if(this[_0xb3c6('0x119')]()){if(_0xb3c6('0x1f3')===_0xb3c6('0x2e8')){function _0x374c85(){return'#'+_0x5eac82(_0x590695['$1']);}}else return![];}else{if(_0xb3c6('0x417')!==_0xb3c6('0x417')){function _0x487c7f(){this['onTouchSelect'](!![]);}}else return Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x1a3')][_0xb3c6('0x274')](this);}},Window_ItemCategory['prototype']['processTouchModernControls']=function(){if(this[_0xb3c6('0x3ef')]()){if(_0xb3c6('0x70')!==_0xb3c6('0x70')){function _0x24a318(){const _0x279295=_0xb3c6('0x8d');if(this[_0xb3c6('0x292')][_0x279295])return this[_0xb3c6('0x292')][_0x279295];let _0x1d7a22='';return this[_0xb3c6('0x278')][_0xb3c6('0x32c')]>0x0?_0x1d7a22+='+%1'[_0xb3c6('0x1ab')](this[_0xb3c6('0x278')][_0xb3c6('0x32c')]):_0x1d7a22+='%1'['format'](this[_0xb3c6('0x278')][_0xb3c6('0x32c')]),_0x1d7a22;}}else{TouchInput[_0xb3c6('0x20f')]()&&this[_0xb3c6('0x241')](!![]);if(TouchInput[_0xb3c6('0x197')]())this[_0xb3c6('0x3da')]();else{if(TouchInput[_0xb3c6('0x41a')]()){if(_0xb3c6('0x1d3')!==_0xb3c6('0x173'))this[_0xb3c6('0x1f4')]();else{function _0x568971(){return _0xb61c9f[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x15e')][_0xb3c6('0x11b')];}}}}}}},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x241')]=function(_0x580d55){this[_0xb3c6('0x119')]()?this[_0xb3c6('0x153')](!![]):Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x241')][_0xb3c6('0x274')](this,_0x580d55);},Window_ItemCategory[_0xb3c6('0x18a')]['onTouchSelectModern']=function(_0x298dcb){this[_0xb3c6('0x289')]=![];if(this[_0xb3c6('0x2c4')]()){if('XixbK'==='FHNCE'){function _0x165ddd(){const _0x30c445=_0x2e8701[_0xb3c6('0x434')]('['+_0x427215['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x5072e3 of _0x30c445){if(!_0x22e3b9[_0xb3c6('0x12')](_0x5072e3))return!![];}return![];}}else{const _0x14e633=this[_0xb3c6('0x15')](),_0x339aa8=this[_0xb3c6('0x171')]();_0x339aa8>=0x0&&_0x339aa8!==this[_0xb3c6('0x15')]()&&this['select'](_0x339aa8);if(_0x298dcb&&this[_0xb3c6('0x15')]()!==_0x14e633){if(_0xb3c6('0xbf')===_0xb3c6('0x2d0')){function _0x1bc54a(){this[_0xb3c6('0x122')]();}}else this['playCursorSound']();}}}},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x2d8')]=function(){for(const _0x144951 of Window_ItemCategory[_0xb3c6('0x7d')]){this[_0xb3c6('0x331')](_0x144951);}this[_0xb3c6('0x2d3')](this['index']());},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x331')]=function(_0x28d723){const _0x1f2766=_0x28d723[_0xb3c6('0x1f6')],_0x2d250d=_0x28d723[_0xb3c6('0x2e2')];let _0x484f77='',_0x9a7b1c=_0xb3c6('0x133'),_0x512aac=_0x1f2766;if(_0x1f2766[_0xb3c6('0x10b')](/Category:(.*)/i))_0x484f77=String(RegExp['$1'])[_0xb3c6('0x11f')]();else{if(Window_ItemCategory['categoryItemTypes'][_0xb3c6('0xf2')](_0x1f2766))_0x484f77=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x15e')][_0x1f2766];else{if([_0xb3c6('0x8e'),_0xb3c6('0x148')]['includes'](_0x1f2766))_0x484f77=TextManager[_0xb3c6('0x43')];else{if(_0x1f2766===_0xb3c6('0x1f8')){if(_0xb3c6('0x2c3')==='HVqsB'){function _0x466508(){return _0x405cc8[_0xb3c6('0x1ec')];}}else _0x484f77=TextManager['keyItem'];}else{if(_0x1f2766===_0xb3c6('0x82')){if(_0xb3c6('0x1c8')!==_0xb3c6('0x1c8')){function _0x23550b(){return _0x2c5957[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['StatusWindow']['LabelRepeats'];}}else _0x484f77=TextManager[_0xb3c6('0x18e')];}else{if(_0x1f2766==='AllArmors')_0x484f77=TextManager[_0xb3c6('0x2dd')];else{if(_0x1f2766[_0xb3c6('0x10b')](/WTYPE:(\d+)/i))_0x484f77=$dataSystem[_0xb3c6('0x224')][Number(RegExp['$1'])]||'';else{if(_0x1f2766['match'](/ATYPE:(\d+)/i))_0x484f77=$dataSystem[_0xb3c6('0x48')][Number(RegExp['$1'])]||'';else _0x1f2766[_0xb3c6('0x10b')](/ETYPE:(\d+)/i)&&(_0x484f77=$dataSystem[_0xb3c6('0x3b2')][Number(RegExp['$1'])]||'');}}}}}}}_0x2d250d>0x0&&this[_0xb3c6('0x254')]()!=='text'&&(_0x484f77=_0xb3c6('0x396')[_0xb3c6('0x1ab')](_0x2d250d,_0x484f77)),this[_0xb3c6('0x3ea')](_0x484f77,_0x9a7b1c,!![],_0x512aac);},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x40a')]=function(){return VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')]['Categories'][_0xb3c6('0x36b')];},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x335')]=function(_0x54fda9){const _0x1301c0=this[_0xb3c6('0xcb')](_0x54fda9);if(_0x1301c0==='iconText'){if(_0xb3c6('0x1e6')==='VcvzB'){function _0x206bcf(){_0x4c0069['a']=_0x2b4cc7,_0x349a49['b']=_0x7aef3f;}}else this[_0xb3c6('0x15b')](_0x54fda9);}else{if(_0x1301c0===_0xb3c6('0x38b')){if(_0xb3c6('0x6c')!=='ngzXl')this[_0xb3c6('0x27')](_0x54fda9);else{function _0x3451a3(){this['cursorPagedown']();}}}else Window_HorzCommand[_0xb3c6('0x18a')]['drawItem'][_0xb3c6('0x274')](this,_0x54fda9);}},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x254')]=function(){return VisuMZ[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x15e')]['Style'];},Window_ItemCategory[_0xb3c6('0x18a')]['categoryStyleCheck']=function(_0x2fb494){if(_0x2fb494<0x0)return _0xb3c6('0xe0');const _0x52af28=this[_0xb3c6('0x254')]();if(_0x52af28!=='auto')return _0x52af28;else{if('SmBKs'===_0xb3c6('0x14d')){const _0x5ed97c=this[_0xb3c6('0x346')](_0x2fb494);if(_0x5ed97c[_0xb3c6('0x10b')](/\\I\[(\d+)\]/i)){const _0x1094bc=this[_0xb3c6('0x120')](_0x2fb494),_0x318907=this[_0xb3c6('0x437')](_0x5ed97c)[_0xb3c6('0x1aa')];if(_0x318907<=_0x1094bc[_0xb3c6('0x1aa')]){if(_0xb3c6('0x429')==='CZoXe'){function _0x401f1e(){const _0x1060b9=_0xb3c6('0xa3');if(this[_0xb3c6('0x278')][_0xb3c6('0x3e2')]<=0x0&&this['_itemData'][_0xb3c6('0x337')]<=0x0&&!this[_0xb3c6('0x292')][_0x1060b9])return![];const _0x33155d=this['getItemEffectsMpRecoveryLabel']();this[_0xb3c6('0x25d')](_0x33155d,_0xb470dd,_0x272682,_0x25bce6,!![]);const _0x3eb784=this['getItemEffectsMpRecoveryText']();return this[_0xb3c6('0x5d')](_0x5be7b3[_0xb3c6('0x123')](0x3)),this['drawItemKeyData'](_0x3eb784,_0x5680fa,_0x19665e,_0x4e3611,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x3fba69,_0x39bd9a,_0x5b9559),this[_0xb3c6('0x3d4')](),!![];}}else return _0xb3c6('0x3ed');}else return _0xb3c6('0x38b');}else{if('KcTXm'===_0xb3c6('0x2e1'))return'text';else{function _0x3ede92(){return this[_0xb3c6('0x3ac')]();}}}}else{function _0x4250c6(){_0x524a66[_0xb3c6('0x2fb')][_0xb3c6('0x63')][_0xb3c6('0x274')](this),this['isUseModernControls']()&&this[_0xb3c6('0x3b9')]();}}}},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x15b')]=function(_0x43da64){const _0x2d2e31=this[_0xb3c6('0x120')](_0x43da64),_0x8ff216=this[_0xb3c6('0x346')](_0x43da64),_0x1458cc=this['textSizeEx'](_0x8ff216)[_0xb3c6('0x1aa')];this[_0xb3c6('0x13a')](this[_0xb3c6('0x1e5')](_0x43da64));const _0x1ff640=this[_0xb3c6('0x40a')]();if(_0x1ff640===_0xb3c6('0x345')){if(_0xb3c6('0x22f')==='BgTEk')this[_0xb3c6('0x21d')](_0x8ff216,_0x2d2e31['x']+_0x2d2e31[_0xb3c6('0x1aa')]-_0x1458cc,_0x2d2e31['y'],_0x1458cc);else{function _0x30321e(){_0x4e8cbc[_0xb3c6('0x6e')]=_0x551f4a(_0x5c4493['$1']);}}}else{if(_0x1ff640==='center'){const _0x2e7d03=_0x2d2e31['x']+Math[_0xb3c6('0x3c7')]((_0x2d2e31[_0xb3c6('0x1aa')]-_0x1458cc)/0x2);this['drawTextEx'](_0x8ff216,_0x2e7d03,_0x2d2e31['y'],_0x1458cc);}else this['drawTextEx'](_0x8ff216,_0x2d2e31['x'],_0x2d2e31['y'],_0x1458cc);}},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x27')]=function(_0x1e8421){this[_0xb3c6('0x346')](_0x1e8421)[_0xb3c6('0x10b')](/\\I\[(\d+)\]/i);const _0x1a2064=Number(RegExp['$1'])||0x0,_0x50ee9b=this['itemLineRect'](_0x1e8421),_0x43c3e7=_0x50ee9b['x']+Math[_0xb3c6('0x3c7')]((_0x50ee9b[_0xb3c6('0x1aa')]-ImageManager[_0xb3c6('0x32e')])/0x2),_0x5ea1c6=_0x50ee9b['y']+(_0x50ee9b['height']-ImageManager[_0xb3c6('0x205')])/0x2;this[_0xb3c6('0x2b3')](_0x1a2064,_0x43c3e7,_0x5ea1c6);},VisuMZ['ItemsEquipsCore']['Window_ItemCategory_setItemWindow']=Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x3bf')],Window_ItemCategory['prototype']['setItemWindow']=function(_0x19a80d){VisuMZ['ItemsEquipsCore'][_0xb3c6('0x30c')][_0xb3c6('0x274')](this,_0x19a80d),_0x19a80d[_0xb3c6('0x2c7')]=this;},Window_ItemCategory[_0xb3c6('0x18a')]['callUpdateHelp']=function(){Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x37d')][_0xb3c6('0x274')](this);if(this['_categoryNameWindow'])this[_0xb3c6('0x100')]();},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x100')]=function(){const _0xfdee8c=this[_0xb3c6('0x36e')];_0xfdee8c[_0xb3c6('0xd5')][_0xb3c6('0x385')]();const _0x29c1de=this[_0xb3c6('0xcb')](this[_0xb3c6('0x15')]());if(_0x29c1de===_0xb3c6('0x38b')){const _0x13572c=this[_0xb3c6('0x120')](this[_0xb3c6('0x15')]());let _0x3e3fc6=this[_0xb3c6('0x346')](this[_0xb3c6('0x15')]());_0x3e3fc6=_0x3e3fc6[_0xb3c6('0x39e')](/\\I\[(\d+)\]/gi,''),_0xfdee8c[_0xb3c6('0x3d4')](),this[_0xb3c6('0x13e')](_0x3e3fc6,_0x13572c),this[_0xb3c6('0x2b7')](_0x3e3fc6,_0x13572c),this[_0xb3c6('0x1d4')](_0x3e3fc6,_0x13572c);}},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x13e')]=function(_0x25ff23,_0x4f2119){},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x2b7')]=function(_0x316a45,_0x58f155){const _0x1d0f5a=this['_categoryNameWindow'];_0x1d0f5a[_0xb3c6('0x2d2')](_0x316a45,0x0,_0x58f155['y'],_0x1d0f5a[_0xb3c6('0x9d')],_0xb3c6('0x26f'));},Window_ItemCategory[_0xb3c6('0x18a')][_0xb3c6('0x1d4')]=function(_0x1f9d22,_0xdbcc43){const _0x37a4f1=this[_0xb3c6('0x36e')],_0x489ff5=$gameSystem[_0xb3c6('0x3d8')](),_0x3a65a0=_0xdbcc43['x']+Math[_0xb3c6('0x3c7')](_0xdbcc43['width']/0x2)+_0x489ff5;_0x37a4f1['x']=_0x37a4f1[_0xb3c6('0x1aa')]/-0x2+_0x3a65a0,_0x37a4f1['y']=Math[_0xb3c6('0x3c7')](_0xdbcc43[_0xb3c6('0x395')]/0x2);},Window_ItemList[_0xb3c6('0x18a')][_0xb3c6('0x3e5')]=function(){if(this['isCursorMovable']()){const _0x2f0620=this[_0xb3c6('0x15')]();if(this[_0xb3c6('0x37')]()<=0x1)!this[_0xb3c6('0x1b0')](_0xb3c6('0x15f'))&&Input[_0xb3c6('0x20f')](_0xb3c6('0x15f'))&&this[_0xb3c6('0x236')](),!this[_0xb3c6('0x1b0')](_0xb3c6('0xa4'))&&Input['isTriggered'](_0xb3c6('0xa4'))&&this[_0xb3c6('0xc7')]();else{if(this[_0xb3c6('0x37')]()>0x1){if(_0xb3c6('0x3d3')!==_0xb3c6('0x3d3')){function _0xae7504(){return _0x165dee[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['StatusWindow'][_0xb3c6('0x46')];}}else{if(Input[_0xb3c6('0x106')](_0xb3c6('0x345'))){if('hruBL'!==_0xb3c6('0x27d'))this['cursorRight'](Input[_0xb3c6('0x20f')]('right'));else{function _0xa40ba9(){const _0x1a5761=this[_0xb3c6('0x120')](_0x4dbb4f),_0x3685c3=this[_0xb3c6('0x437')](_0x33fedb)[_0xb3c6('0x1aa')];return _0x3685c3<=_0x1a5761[_0xb3c6('0x1aa')]?'iconText':_0xb3c6('0x38b');}}}if(Input[_0xb3c6('0x106')](_0xb3c6('0x42d'))){if(_0xb3c6('0x17')!==_0xb3c6('0x3f3'))this[_0xb3c6('0x177')](Input[_0xb3c6('0x20f')](_0xb3c6('0x42d')));else{function _0x38bcbf(){return _0x139d18[_0xb3c6('0x2fb')]['Game_BattlerBase_param'][_0xb3c6('0x274')](this,_0x2149f9);}}}if(this[_0xb3c6('0x300')]()){Input[_0xb3c6('0x20f')]('pagedown')&&Input[_0xb3c6('0x126')](_0xb3c6('0x8c'))&&this[_0xb3c6('0x236')]();if(Input['isTriggered'](_0xb3c6('0xa4'))&&Input[_0xb3c6('0x126')](_0xb3c6('0x8c'))){if('OTuiU'==='IYPdB'){function _0x1e9a13(){!this['isHandled'](_0xb3c6('0x15f'))&&_0x31980d['isTriggered'](_0xb3c6('0x15f'))&&this[_0xb3c6('0x236')](),!this[_0xb3c6('0x1b0')](_0xb3c6('0xa4'))&&_0x4b7ce5['isTriggered'](_0xb3c6('0xa4'))&&this[_0xb3c6('0xc7')]();}}else this[_0xb3c6('0xc7')]();}}else{if(_0xb3c6('0x326')===_0xb3c6('0x17a')){function _0x4ca628(){if(_0x2e91b5>=0x0)_0x349f7a===this['index']()&&(this['_doubleTouch']=!![]),this['activate'](),this[_0xb3c6('0x2d3')](_0x3b71e4);else _0x3522b2[_0xb3c6('0x171')]()>=0x0&&(this['deactivate'](),this[_0xb3c6('0x327')]());}}else{if(Input[_0xb3c6('0x20f')](_0xb3c6('0x15f'))){if(_0xb3c6('0x169')===_0xb3c6('0x169'))this[_0xb3c6('0x236')]();else{function _0x148c2d(){if(this['buttonAssistItemListRequirement']())return _0x39870f[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['ItemScene']['buttonAssistCategory'];return _0x55daca[_0xb3c6('0x18a')]['buttonAssistText1']['call'](this);}}}if(Input[_0xb3c6('0x20f')](_0xb3c6('0xa4'))){if(_0xb3c6('0xb6')===_0xb3c6('0xb6'))this[_0xb3c6('0xc7')]();else{function _0x2c24a3(){_0x75aa3d[_0xb3c6('0x3d')](_0x268bf6[_0xb3c6('0x39c')]());}}}}}}}}if(Input[_0xb3c6('0x106')]('down')){if(Input[_0xb3c6('0x126')](_0xb3c6('0x8c')))this[_0xb3c6('0x236')]();else{if(_0xb3c6('0x250')===_0xb3c6('0x18f')){function _0x53ca92(){this[_0xb3c6('0x289')]=!![];}}else this[_0xb3c6('0x145')](Input[_0xb3c6('0x20f')](_0xb3c6('0x3a1')));}}if(Input[_0xb3c6('0x106')]('up')){if(Input['isPressed'](_0xb3c6('0x8c')))this[_0xb3c6('0xc7')]();else{if('tGMIq'!==_0xb3c6('0x295'))this['cursorUp'](Input[_0xb3c6('0x20f')]('up'));else{function _0x4a3b91(){let _0x5a7c73=_0x560eea['ItemsEquipsCore'][_0xb3c6('0x1c3')][_0xb3c6('0x274')](this,_0x1a36b8);for(const _0x5764b0 of this[_0xb3c6('0x2c')]()){if(_0x5764b0)_0x5a7c73+=this[_0xb3c6('0x150')](_0x5764b0,_0x612031);}return _0x5a7c73;}}}}Imported[_0xb3c6('0x267')]&&this['processCursorHomeEndTrigger'](),this[_0xb3c6('0x15')]()!==_0x2f0620&&this[_0xb3c6('0x65')]();}},Window_ItemList[_0xb3c6('0x18a')][_0xb3c6('0x300')]=function(){const _0x401702=SceneManager[_0xb3c6('0x259')],_0x3bc532=[Scene_Item,Scene_Shop];return _0x3bc532[_0xb3c6('0xf2')](_0x401702[_0xb3c6('0x1d6')]);},Window_ItemList[_0xb3c6('0x18a')][_0xb3c6('0xf8')]=function(){Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0xf8')][_0xb3c6('0x274')](this);if(this[_0xb3c6('0x2c7')]&&this['_categoryWindow'][_0xb3c6('0x119')]()){if(_0xb3c6('0x313')!==_0xb3c6('0x313')){function _0x37ef6b(){return this[_0xb3c6('0x225')]&&this[_0xb3c6('0x225')][_0xb3c6('0x119')]();}}else this[_0xb3c6('0x2c7')][_0xb3c6('0xf8')]();}},Window_ItemList[_0xb3c6('0x18a')]['deactivate']=function(){Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0x36c')][_0xb3c6('0x274')](this);if(this[_0xb3c6('0x2c7')]&&this['_categoryWindow']['isUseModernControls']()){if(_0xb3c6('0xb8')!==_0xb3c6('0x12d'))this[_0xb3c6('0x2c7')][_0xb3c6('0x36c')]();else{function _0xaf239e(){const _0x4048de=this[_0xb3c6('0x225')]['y'],_0x12f89b=this[_0xb3c6('0x225')]['width'],_0x5c3b41=this[_0xb3c6('0x276')](0x1,!![]),_0x4bab54=this[_0xb3c6('0x360')]()?_0x18894e[_0xb3c6('0x2a2')]-_0x12f89b:0x0;return new _0x3566e0(_0x4bab54,_0x4048de,_0x12f89b,_0x5c3b41);}}}},Window_ItemList[_0xb3c6('0x18a')][_0xb3c6('0x34b')]=function(_0x135d4c){if(this['_category']!==_0x135d4c){this[_0xb3c6('0x1c1')]=_0x135d4c,this[_0xb3c6('0x2a1')]();if(this[_0xb3c6('0x2c7')]&&this[_0xb3c6('0x2c7')][_0xb3c6('0x119')]())this['smoothSelect'](0x0);else{if(_0xb3c6('0x42b')===_0xb3c6('0x42b'))this[_0xb3c6('0x334')](0x0,0x0);else{function _0x5da161(){return _0xfd3f67[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x3f2')][_0xb3c6('0x386')];}}}}},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x297')]=Window_ItemList['prototype'][_0xb3c6('0x37')],Window_ItemList[_0xb3c6('0x18a')][_0xb3c6('0x37')]=function(){return SceneManager[_0xb3c6('0x259')][_0xb3c6('0x1d6')]===Scene_Battle?VisuMZ[_0xb3c6('0x2fb')]['Window_ItemList_maxCols'][_0xb3c6('0x274')](this):VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')][_0xb3c6('0x59')];},VisuMZ[_0xb3c6('0x2fb')]['Window_ItemList_colSpacing']=Window_ItemList['prototype']['colSpacing'],Window_ItemList[_0xb3c6('0x18a')][_0xb3c6('0x97')]=function(){if(this['maxCols']()<=0x1)return Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0x97')][_0xb3c6('0x274')](this);else{if(_0xb3c6('0x401')===_0xb3c6('0x401'))return VisuMZ['ItemsEquipsCore'][_0xb3c6('0xa8')][_0xb3c6('0x274')](this);else{function _0x1d4aa2(){_0x5b073a=_0x1775b2[_0xb3c6('0x28')];}}}},Window_ItemList['prototype'][_0xb3c6('0xf2')]=function(_0x60b05a){switch(this[_0xb3c6('0x1c1')]){case _0xb3c6('0x8e'):return DataManager['isItem'](_0x60b05a);case _0xb3c6('0x148'):return DataManager[_0xb3c6('0x3f9')](_0x60b05a)&&_0x60b05a[_0xb3c6('0xb')]===0x1;case _0xb3c6('0x1f8'):return DataManager[_0xb3c6('0x3f9')](_0x60b05a)&&_0x60b05a['itypeId']===0x2;case _0xb3c6('0x247'):return DataManager['isItem'](_0x60b05a)&&_0x60b05a[_0xb3c6('0xb')]===0x3;case _0xb3c6('0x3c4'):return DataManager['isItem'](_0x60b05a)&&_0x60b05a['itypeId']===0x4;case _0xb3c6('0x1cf'):return DataManager['isItem'](_0x60b05a)&&_0x60b05a[_0xb3c6('0x35f')];case _0xb3c6('0x9b'):return DataManager['isItem'](_0x60b05a)&&!_0x60b05a['consumable'];case _0xb3c6('0x50'):return DataManager['isItem'](_0x60b05a)&&[0x0][_0xb3c6('0xf2')](_0x60b05a['occasion']);case _0xb3c6('0x8a'):return DataManager[_0xb3c6('0x3f9')](_0x60b05a)&&[0x0,0x1][_0xb3c6('0xf2')](_0x60b05a[_0xb3c6('0x13d')]);case _0xb3c6('0x427'):return DataManager[_0xb3c6('0x3f9')](_0x60b05a)&&[0x0,0x2]['includes'](_0x60b05a[_0xb3c6('0x13d')]);case _0xb3c6('0x125'):return DataManager[_0xb3c6('0x3f9')](_0x60b05a)&&[0x3][_0xb3c6('0xf2')](_0x60b05a[_0xb3c6('0x13d')]);case'AllWeapons':return DataManager[_0xb3c6('0x200')](_0x60b05a);case _0xb3c6('0x4e'):return DataManager[_0xb3c6('0x13f')](_0x60b05a);default:if(this[_0xb3c6('0x1c1')][_0xb3c6('0x10b')](/WTYPE:(\d+)/i))return DataManager[_0xb3c6('0x200')](_0x60b05a)&&_0x60b05a[_0xb3c6('0x10f')]===Number(RegExp['$1']);else{if(this[_0xb3c6('0x1c1')]['match'](/ATYPE:(\d+)/i)){if(_0xb3c6('0x3a5')===_0xb3c6('0x1c')){function _0xce6a19(){this['_shopStatusMenuMode']=!![],this[_0xb3c6('0x333')]=_0x735a06;}}else return DataManager['isArmor'](_0x60b05a)&&_0x60b05a[_0xb3c6('0x3f8')]===Number(RegExp['$1']);}else{if(this[_0xb3c6('0x1c1')][_0xb3c6('0x10b')](/ETYPE:(\d+)/i))return!!_0x60b05a&&_0x60b05a[_0xb3c6('0x3f8')]===Number(RegExp['$1']);else{if(this['_category'][_0xb3c6('0x10b')](/Category:(.*)/i))return!!_0x60b05a&&_0x60b05a[_0xb3c6('0x3a2')]['includes'](String(RegExp['$1'])[_0xb3c6('0x41b')]()['trim']());}}}}return![];},Window_ItemList['prototype'][_0xb3c6('0x32a')]=function(){return!![];},VisuMZ['ItemsEquipsCore'][_0xb3c6('0xca')]=Window_ItemList[_0xb3c6('0x18a')]['drawItem'],Window_ItemList[_0xb3c6('0x18a')][_0xb3c6('0x335')]=function(_0x7abb80){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0xca')][_0xb3c6('0x274')](this,_0x7abb80),this['placeItemNewLabel'](_0x7abb80);},Window_ItemList['prototype']['drawItemNumber']=function(_0x4d04bf,_0x31b39f,_0x53c343,_0x43fb23){Window_Selectable[_0xb3c6('0x18a')][_0xb3c6('0x273')]['call'](this,_0x4d04bf,_0x31b39f,_0x53c343,_0x43fb23);},Window_ItemList['prototype'][_0xb3c6('0x228')]=function(_0x550d34){const _0x78fca1=this[_0xb3c6('0x117')](_0x550d34);if(!_0x78fca1||!this[_0xb3c6('0x32a')]())return;if(!$gameParty[_0xb3c6('0x2b6')](_0x78fca1))return;const _0x13c234=this[_0xb3c6('0x120')](_0x550d34),_0x503879=_0x13c234['x'],_0x3ea922=_0x13c234['y']+(this[_0xb3c6('0x3b4')]()-ImageManager[_0xb3c6('0x205')])/0x2,_0x500716=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x359')][_0xb3c6('0x102')],_0x36f8f6=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['New'][_0xb3c6('0x34d')];this['placeNewLabel'](_0x78fca1,_0x503879+_0x500716,_0x3ea922+_0x36f8f6);},Window_ItemList[_0xb3c6('0x18a')][_0xb3c6('0x3ab')]=function(_0x2df5d8){this[_0xb3c6('0x132')]=_0x2df5d8,this[_0xb3c6('0x37d')]();},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x14e')]=Window_ItemList[_0xb3c6('0x18a')][_0xb3c6('0x1bb')],Window_ItemList[_0xb3c6('0x18a')][_0xb3c6('0x1bb')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x14e')]['call'](this);if(this[_0xb3c6('0x132')]&&this[_0xb3c6('0x132')][_0xb3c6('0x1d6')]===Window_ShopStatus){if(_0xb3c6('0xab')!==_0xb3c6('0x98'))this['_statusWindow']['setItem'](this[_0xb3c6('0x43')]());else{function _0x2a97fb(){this[_0xb3c6('0x1c2')]++;}}}},Window_EventItem['prototype'][_0xb3c6('0x32a')]=function(){return![];},Window_EquipStatus[_0xb3c6('0x18a')][_0xb3c6('0x311')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0x213')];},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x32d')]=Window_EquipStatus['prototype'][_0xb3c6('0x2a1')],Window_EquipStatus['prototype']['refresh']=function(){this[_0xb3c6('0x402')](),this[_0xb3c6('0x3d4')]();if(this['_actor'])this[_0xb3c6('0x152')][_0xb3c6('0x2a1')]();if(this[_0xb3c6('0x311')]())this[_0xb3c6('0x22d')]();else{if(_0xb3c6('0x131')===_0xb3c6('0xda')){function _0x379dc5(){if(_0x3546ab[_0xb3c6('0x12')](_0x32324c))return![];}}else VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x32d')]['call'](this);}},Window_EquipStatus[_0xb3c6('0x18a')][_0xb3c6('0x22d')]=function(){this[_0xb3c6('0xd5')][_0xb3c6('0x385')]();if(!this[_0xb3c6('0x152')])return;if(this[_0xb3c6('0x258')]()){if(_0xb3c6('0x377')!=='JdnZH'){const _0x5067f7=ImageManager[_0xb3c6('0x293')](this[_0xb3c6('0x152')]['getMenuImage']());_0x5067f7['addLoadListener'](this[_0xb3c6('0x3b6')][_0xb3c6('0x187')](this));}else{function _0x20d9b8(){this[_0xb3c6('0x153')](!![]);}}}else this[_0xb3c6('0x23a')]();},Window_EquipStatus['prototype'][_0xb3c6('0x258')]=function(){return Imported[_0xb3c6('0x15c')]&&this[_0xb3c6('0x152')][_0xb3c6('0xc9')]()!==''&&VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')]['MenuPortraits'];},Window_EquipStatus[_0xb3c6('0x18a')][_0xb3c6('0x3b6')]=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['EquipScene'][_0xb3c6('0x51')][_0xb3c6('0x274')](this),this[_0xb3c6('0x3c')]();},Window_EquipStatus['prototype']['refreshItemsEquipsCoreNoMenuImage']=function(){VisuMZ[_0xb3c6('0x2fb')]['Settings']['EquipScene'][_0xb3c6('0x349')][_0xb3c6('0x274')](this),this[_0xb3c6('0x3c')]();},Window_EquipStatus[_0xb3c6('0x18a')][_0xb3c6('0x3c')]=function(){this[_0xb3c6('0x3d4')](),VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['EquipScene']['DrawParamJS'][_0xb3c6('0x274')](this);},Window_EquipStatus[_0xb3c6('0x18a')]['drawItemActorMenuImage']=function(_0x181bd5,_0x563d8b,_0x159aa1,_0x263dd3,_0x59dd1f){const _0x5b3fb3=ImageManager[_0xb3c6('0x293')](_0x181bd5[_0xb3c6('0xc9')]()),_0x247ad1=this[_0xb3c6('0x9d')]-_0x5b3fb3[_0xb3c6('0x1aa')];_0x563d8b+=_0x247ad1/0x2;if(_0x247ad1<0x0)_0x263dd3-=_0x247ad1;Window_StatusBase[_0xb3c6('0x18a')][_0xb3c6('0x2fa')][_0xb3c6('0x274')](this,_0x181bd5,_0x563d8b,_0x159aa1,_0x263dd3,_0x59dd1f);},Window_EquipStatus['prototype'][_0xb3c6('0x3d6')]=function(){return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0xb3c6('0x188')]['Settings'][_0xb3c6('0x16b')][_0xb3c6('0x336')]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus['prototype'][_0xb3c6('0x90')]=function(){return VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')]['EquipScene']['ParamValueFontSize'];},Window_EquipStatus[_0xb3c6('0x18a')][_0xb3c6('0xd1')]=function(){return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0xb3c6('0x188')][_0xb3c6('0x1dc')][_0xb3c6('0x16b')][_0xb3c6('0x42f')];},Window_EquipStatus[_0xb3c6('0x18a')][_0xb3c6('0x11d')]=function(_0x53f02c,_0x3de5a8,_0x2509b0,_0x18c58a,_0x22e153){_0x22e153=Math[_0xb3c6('0x30d')](_0x22e153||0x1,0x1);while(_0x22e153--){_0x18c58a=_0x18c58a||this[_0xb3c6('0x3b4')](),this[_0xb3c6('0xd5')][_0xb3c6('0x116')]=0xa0;const _0x37ea0d=ColorManager[_0xb3c6('0x1b2')]();this[_0xb3c6('0xd5')][_0xb3c6('0x1c6')](_0x53f02c+0x1,_0x3de5a8+0x1,_0x2509b0-0x2,_0x18c58a-0x2,_0x37ea0d),this[_0xb3c6('0xd5')][_0xb3c6('0x116')]=0xff;}},Window_EquipStatus[_0xb3c6('0x18a')][_0xb3c6('0xbe')]=function(_0x142d54,_0x271c7f,_0x406d0a,_0x2a1987){const _0x426fa7=this['itemPadding']();Imported[_0xb3c6('0x267')]?this[_0xb3c6('0x158')](_0x271c7f+_0x426fa7,_0x406d0a,_0x2a1987,_0x142d54,![]):this['drawText'](TextManager[_0xb3c6('0x2a9')](_0x142d54),_0x271c7f+_0x426fa7,_0x406d0a,_0x2a1987);},Window_EquipStatus[_0xb3c6('0x18a')][_0xb3c6('0x23d')]=function(_0x241489,_0x206d6e,_0x488a0e,_0x2bb4b1){const _0x1eefc7=this[_0xb3c6('0x2c1')]();let _0xd63d85=0x0;if(Imported[_0xb3c6('0x267')])_0xd63d85=this['_actor'][_0xb3c6('0x42e')](_0x241489,!![]);else{if(_0xb3c6('0xec')!=='HbSFh')_0xd63d85=this[_0xb3c6('0x152')][_0xb3c6('0x2a9')](_0x241489);else{function _0x3757ac(){if(!_0x5735e8)return 0x0;const _0x251777=_0x543529[_0xb3c6('0x2fb')][_0xb3c6('0x195')][_0xb3c6('0x274')](this,_0x54d2a0);return this[_0xb3c6('0x1ae')](_0x48629c,_0x251777);}}}const _0x50bdcb=_0xd63d85;this[_0xb3c6('0x2d2')](_0xd63d85,_0x206d6e,_0x488a0e,_0x2bb4b1-_0x1eefc7,'right');},Window_EquipStatus['prototype'][_0xb3c6('0x275')]=function(_0x1d4063,_0x430eb1,_0x4ed875,_0x3310bd){const _0xbffa3=this[_0xb3c6('0x2c1')]();let _0x324366=0x0,_0x213406=0x0,_0x2f8c97='';if(this[_0xb3c6('0x32b')]){if(_0xb3c6('0xf0')==='lXAvb'){Imported[_0xb3c6('0x267')]?(_0x324366=this[_0xb3c6('0x152')][_0xb3c6('0x42e')](_0x1d4063,![]),_0x213406=this[_0xb3c6('0x32b')][_0xb3c6('0x42e')](_0x1d4063,![]),_0x2f8c97=this[_0xb3c6('0x32b')][_0xb3c6('0x42e')](_0x1d4063,!![])):(_0x324366=this[_0xb3c6('0x152')][_0xb3c6('0x2a9')](_0x1d4063),_0x213406=this['_tempActor'][_0xb3c6('0x2a9')](_0x1d4063),_0x2f8c97=this[_0xb3c6('0x32b')][_0xb3c6('0x2a9')](_0x1d4063));const _0x27c719=_0x324366,_0x2dc258=_0x213406;diffValue=_0x2dc258-_0x27c719,this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x30f')](diffValue)),this[_0xb3c6('0x2d2')](_0x2f8c97,_0x430eb1,_0x4ed875,_0x3310bd-_0xbffa3,_0xb3c6('0x345'));}else{function _0xcf367(){_0x488c55=this[_0xb3c6('0x152')]['paramValueByName'](_0x3e955e,![]),_0x36db03=this['_tempActor']['paramValueByName'](_0x58e9c9,![]);}}}},Window_EquipStatus[_0xb3c6('0x18a')][_0xb3c6('0x41c')]=function(_0x4ba959,_0x3875e2,_0x58e127,_0x34f138){const _0x36cc5b=this[_0xb3c6('0x2c1')]();let _0x10dbe7=0x0,_0x42f146=0x0;if(this[_0xb3c6('0x32b')]){if('oyQiQ'!==_0xb3c6('0x13c')){if(Imported['VisuMZ_0_CoreEngine'])_0x10dbe7=this[_0xb3c6('0x152')][_0xb3c6('0x42e')](_0x4ba959,![]),_0x42f146=this['_tempActor'][_0xb3c6('0x42e')](_0x4ba959,![]);else{if('LZuZO'!=='LZuZO'){function _0x25dbb4(){return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}else _0x10dbe7=this[_0xb3c6('0x152')][_0xb3c6('0x2a9')](_0x4ba959),_0x42f146=this[_0xb3c6('0x32b')][_0xb3c6('0x2a9')](_0x4ba959);}const _0x11a3ee=_0x10dbe7,_0x4843f8=_0x42f146,_0xc8779a=_0x4843f8-_0x11a3ee;let _0x2a1e9f=_0xc8779a;if(_0x10dbe7%0x1!==0x0)_0x2a1e9f=Math[_0xb3c6('0xea')](_0xc8779a*0x64)+'%';if(_0xc8779a!==0x0){if(_0xb3c6('0x166')!=='iufKs'){function _0x1f2b50(){this['postCreateSellWindowItemsEquipsCore']();}}else this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x30f')](_0xc8779a)),_0x2a1e9f=(_0xc8779a>0x0?_0xb3c6('0x418'):_0xb3c6('0x20d'))[_0xb3c6('0x1ab')](_0x2a1e9f),this[_0xb3c6('0x2d2')](_0x2a1e9f,_0x3875e2+_0x36cc5b,_0x58e127,_0x34f138,_0xb3c6('0x42d'));}}else{function _0x466ee6(){if(_0x223ae1[_0xb3c6('0x280')]()!==_0x4d6b2a[_0xb3c6('0x280')])for(const _0x1f208f of _0x3b9e4a[_0xb3c6('0xb1')]){if(_0x1f208f)_0x1f208f[_0xb3c6('0x2bc')]();}}}}},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x58')]=Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x1a6')],Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x1a6')]=function(_0xa23e5){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x58')]['call'](this,_0xa23e5),this[_0xb3c6('0x34f')](_0xa23e5);},Window_EquipCommand[_0xb3c6('0x18a')]['createCommandNameWindow']=function(_0x51c14b){const _0x26558d=new Rectangle(0x0,0x0,_0x51c14b[_0xb3c6('0x1aa')],_0x51c14b[_0xb3c6('0x395')]);this[_0xb3c6('0x22a')]=new Window_Base(_0x26558d),this[_0xb3c6('0x22a')]['opacity']=0x0,this[_0xb3c6('0x20b')](this['_commandNameWindow']),this[_0xb3c6('0xba')]();},Window_EquipCommand[_0xb3c6('0x18a')]['callUpdateHelp']=function(){Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x37d')][_0xb3c6('0x274')](this);if(this[_0xb3c6('0x22a')])this[_0xb3c6('0xba')]();},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0xba')]=function(){const _0x433268=this[_0xb3c6('0x22a')];_0x433268[_0xb3c6('0xd5')]['clear']();const _0x459085=this[_0xb3c6('0x277')](this['index']());if(_0x459085===_0xb3c6('0x38b')){const _0x45a705=this[_0xb3c6('0x120')](this[_0xb3c6('0x15')]());let _0x2620b4=this['commandName'](this[_0xb3c6('0x15')]());_0x2620b4=_0x2620b4[_0xb3c6('0x39e')](/\\I\[(\d+)\]/gi,''),_0x433268[_0xb3c6('0x3d4')](),this[_0xb3c6('0x3af')](_0x2620b4,_0x45a705),this[_0xb3c6('0x25e')](_0x2620b4,_0x45a705),this[_0xb3c6('0x435')](_0x2620b4,_0x45a705);}},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x3af')]=function(_0x1dd57d,_0x1ec821){},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x25e')]=function(_0x3825ac,_0x1f1ed9){const _0x34e12a=this[_0xb3c6('0x22a')];_0x34e12a[_0xb3c6('0x2d2')](_0x3825ac,0x0,_0x1f1ed9['y'],_0x34e12a[_0xb3c6('0x9d')],_0xb3c6('0x26f'));},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x435')]=function(_0x155564,_0x3c5ebd){const _0x56deac=this['_commandNameWindow'],_0x5c9443=$gameSystem[_0xb3c6('0x3d8')](),_0xb69c96=_0x3c5ebd['x']+Math[_0xb3c6('0x3c7')](_0x3c5ebd[_0xb3c6('0x1aa')]/0x2)+_0x5c9443;_0x56deac['x']=_0x56deac[_0xb3c6('0x1aa')]/-0x2+_0xb69c96,_0x56deac['y']=Math[_0xb3c6('0x3c7')](_0x3c5ebd[_0xb3c6('0x395')]/0x2);},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x119')]=function(){return Imported[_0xb3c6('0x267')]&&Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x119')][_0xb3c6('0x274')](this);},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x144')]=function(){if(this['currentSymbol']()===_0xb3c6('0x71'))Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x144')][_0xb3c6('0x274')](this);},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x3e5')]=function(){!this[_0xb3c6('0x398')]()&&Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x3e5')]['call'](this);},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x398')]=function(){if(!this[_0xb3c6('0x2c4')]())return![];if(SceneManager[_0xb3c6('0x259')][_0xb3c6('0x1d6')]!==Scene_Equip)return![];return Input[_0xb3c6('0x20f')](_0xb3c6('0x3a1'))&&(this[_0xb3c6('0x65')](),SceneManager[_0xb3c6('0x259')]['commandEquip'](),SceneManager['_scene'][_0xb3c6('0x343')][_0xb3c6('0x406')](-0x1)),![];},Window_EquipCommand[_0xb3c6('0x18a')]['maxCols']=function(){return this['_list']?this[_0xb3c6('0x3ad')]['length']:0x3;},Window_EquipCommand['prototype'][_0xb3c6('0x14b')]=function(){if(this[_0xb3c6('0x237')]()&&this[_0xb3c6('0x137')]&&SceneManager[_0xb3c6('0x259')][_0xb3c6('0x1d6')]===Scene_Equip){if(_0xb3c6('0x40e')===_0xb3c6('0x40e')){if(this['isHoverEnabled']()&&TouchInput[_0xb3c6('0x3dc')]())this[_0xb3c6('0x1b4')](![]);else TouchInput[_0xb3c6('0x20f')]()&&this[_0xb3c6('0x1b4')](!![]);if(TouchInput[_0xb3c6('0x197')]())this['onTouchOk']();else{if(TouchInput[_0xb3c6('0x41a')]()){if(_0xb3c6('0x2d7')!==_0xb3c6('0xc'))this['onTouchCancel']();else{function _0x901cda(){this['cursorRight'](_0x5988d8['isTriggered'](_0xb3c6('0x345')));}}}}}else{function _0x5c008d(){this[_0xb3c6('0x334')](0x0,0x0);}}}},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x1b4')]=function(_0x1f0dd1){this[_0xb3c6('0x289')]=![];const _0x4663da=this[_0xb3c6('0x15')](),_0x225b7c=this[_0xb3c6('0x171')](),_0x59fa3e=SceneManager[_0xb3c6('0x259')]['_slotWindow'];if(_0x59fa3e[_0xb3c6('0x237')]()&&_0x59fa3e[_0xb3c6('0x137')]){if(_0x225b7c>=0x0){if(_0xb3c6('0x190')!==_0xb3c6('0x190')){function _0x27c928(){return _0x1935b7[_0xb3c6('0x57')]()&&(_0x1b5f7d[_0xb3c6('0x3b3')]('Damage\x20Formula\x20Error\x20for\x20%1'[_0xb3c6('0x1ab')](this[_0xb3c6('0x3a9')]['name'])),_0x46393a[_0xb3c6('0x3b3')](_0x30b216)),this[_0xb3c6('0x31d')](),'?????';}}else _0x225b7c===this[_0xb3c6('0x15')]()&&(this[_0xb3c6('0x289')]=!![]),this[_0xb3c6('0xf8')](),this[_0xb3c6('0x2d3')](_0x225b7c);}else{if(_0x59fa3e[_0xb3c6('0x171')]()>=0x0){if(_0xb3c6('0x332')!==_0xb3c6('0x419'))this[_0xb3c6('0x36c')](),this[_0xb3c6('0x327')]();else{function _0x3bfd5d(){return _0x141800[_0xb3c6('0x81')]('shift');}}}}}_0x1f0dd1&&this[_0xb3c6('0x15')]()!==_0x4663da&&this['playCursorSound']();},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x2d8')]=function(){this[_0xb3c6('0x379')](),this[_0xb3c6('0x2ac')](),this[_0xb3c6('0x425')]();},Window_EquipCommand[_0xb3c6('0x18a')]['refresh']=function(){Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x2a1')][_0xb3c6('0x274')](this),this[_0xb3c6('0x39d')]();},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x379')]=function(){if(!this[_0xb3c6('0x255')]())return;const _0x2672fa=this[_0xb3c6('0x17f')](),_0x4387ea=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['EquipScene']['CmdIconEquip'],_0x270e1d=_0x2672fa===_0xb3c6('0xe0')?TextManager[_0xb3c6('0x3a')]:_0xb3c6('0x396')[_0xb3c6('0x1ab')](_0x4387ea,TextManager[_0xb3c6('0x3a')]),_0x5d8788=this[_0xb3c6('0x2cc')]();this[_0xb3c6('0x3ea')](_0x270e1d,_0xb3c6('0x71'),_0x5d8788);},Window_EquipCommand[_0xb3c6('0x18a')]['isEquipCommandAdded']=function(){return!this[_0xb3c6('0x119')]();},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x2cc')]=function(){return!![];},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x2ac')]=function(){if(!this[_0xb3c6('0xb9')]())return;const _0x2c022d=this['commandStyle'](),_0x98d905=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0xe6')],_0xf476da=_0x2c022d===_0xb3c6('0xe0')?TextManager[_0xb3c6('0x19')]:_0xb3c6('0x396')[_0xb3c6('0x1ab')](_0x98d905,TextManager[_0xb3c6('0x19')]),_0x4485ab=this[_0xb3c6('0x2c5')]();this[_0xb3c6('0x3ea')](_0xf476da,_0xb3c6('0x19'),_0x4485ab);},Window_EquipCommand['prototype'][_0xb3c6('0xb9')]=function(){return VisuMZ['ItemsEquipsCore']['Settings'][_0xb3c6('0x234')][_0xb3c6('0x34')];},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x2c5')]=function(){return!![];},Window_EquipCommand['prototype'][_0xb3c6('0x425')]=function(){if(!this[_0xb3c6('0x1c4')]())return;const _0x50648f=this[_0xb3c6('0x17f')](),_0xa3bf59=VisuMZ[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x234')][_0xb3c6('0x202')],_0x2bb0f6=_0x50648f===_0xb3c6('0xe0')?TextManager[_0xb3c6('0x385')]:_0xb3c6('0x396')[_0xb3c6('0x1ab')](_0xa3bf59,TextManager[_0xb3c6('0x385')]),_0x126c5a=this['isClearCommandEnabled']();this[_0xb3c6('0x3ea')](_0x2bb0f6,_0xb3c6('0x385'),_0x126c5a);},Window_EquipCommand[_0xb3c6('0x18a')]['isClearCommandAdded']=function(){return VisuMZ[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x234')][_0xb3c6('0x24')];},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x36f')]=function(){return!![];},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x40a')]=function(){return VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0x3c8')];},Window_EquipCommand['prototype'][_0xb3c6('0x335')]=function(_0x35ac00){const _0x19fc66=this[_0xb3c6('0x277')](_0x35ac00);if(_0x19fc66==='iconText')this[_0xb3c6('0x15b')](_0x35ac00);else{if(_0x19fc66==='icon'){if('VhBGh'!==_0xb3c6('0x37f')){function _0x253c61(){return this[_0xb3c6('0x1e1')]();}}else this[_0xb3c6('0x27')](_0x35ac00);}else Window_HorzCommand['prototype'][_0xb3c6('0x335')][_0xb3c6('0x274')](this,_0x35ac00);}},Window_EquipCommand[_0xb3c6('0x18a')][_0xb3c6('0x17f')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0x2fd')];},Window_EquipCommand[_0xb3c6('0x18a')]['commandStyleCheck']=function(_0x3655e9){if(_0x3655e9<0x0)return _0xb3c6('0xe0');const _0x56cb9d=this[_0xb3c6('0x17f')]();if(_0x56cb9d!=='auto'){if('vGrWh'!==_0xb3c6('0x373'))return _0x56cb9d;else{function _0x40e313(){this[_0xb3c6('0x3b')](null,_0x3d434f);}}}else{if(this[_0xb3c6('0x389')]()>0x0){const _0x25cd31=this[_0xb3c6('0x346')](_0x3655e9);if(_0x25cd31[_0xb3c6('0x10b')](/\\I\[(\d+)\]/i)){const _0x5996cc=this['itemLineRect'](_0x3655e9),_0x1f60d8=this[_0xb3c6('0x437')](_0x25cd31)[_0xb3c6('0x1aa')];if(_0x1f60d8<=_0x5996cc[_0xb3c6('0x1aa')])return _0xb3c6('0x3ed');else{if(_0xb3c6('0x109')!=='yXcHs')return'icon';else{function _0x4adb15(){if(this[_0xb3c6('0xaa')]())return _0x17da64[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')][_0xb3c6('0x348')];else{if(this[_0xb3c6('0x1d0')]&&this[_0xb3c6('0x1d0')][_0xb3c6('0x3e3')])return _0x3b68e0['ItemsEquipsCore'][_0xb3c6('0x1dc')]['ShopScene'][_0xb3c6('0x67')];}return _0x4c5cc8[_0xb3c6('0x18a')][_0xb3c6('0x112')][_0xb3c6('0x274')](this);}}}}}}return _0xb3c6('0xe0');},Window_EquipCommand['prototype'][_0xb3c6('0x15b')]=function(_0x1573c3){const _0x369300=this[_0xb3c6('0x120')](_0x1573c3),_0x2f7f3b=this['commandName'](_0x1573c3),_0x477bb3=this[_0xb3c6('0x437')](_0x2f7f3b)[_0xb3c6('0x1aa')];this['changePaintOpacity'](this['isCommandEnabled'](_0x1573c3));const _0x19466a=this[_0xb3c6('0x40a')]();if(_0x19466a===_0xb3c6('0x345')){if(_0xb3c6('0x3b1')===_0xb3c6('0x3b1'))this['drawTextEx'](_0x2f7f3b,_0x369300['x']+_0x369300[_0xb3c6('0x1aa')]-_0x477bb3,_0x369300['y'],_0x477bb3);else{function _0x226430(){return _0xd9f1c5['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0x7e')];}}}else{if(_0x19466a===_0xb3c6('0x26f')){if(_0xb3c6('0x1df')==='nIAug'){function _0x238d8f(){_0x233882===this[_0xb3c6('0x15')]()&&(this[_0xb3c6('0x289')]=!![]),this['activate'](),this[_0xb3c6('0x2d3')](_0x11bb1a);}}else{const _0x16833a=_0x369300['x']+Math[_0xb3c6('0x3c7')]((_0x369300[_0xb3c6('0x1aa')]-_0x477bb3)/0x2);this['drawTextEx'](_0x2f7f3b,_0x16833a,_0x369300['y'],_0x477bb3);}}else this[_0xb3c6('0x21d')](_0x2f7f3b,_0x369300['x'],_0x369300['y'],_0x477bb3);}},Window_EquipCommand['prototype'][_0xb3c6('0x27')]=function(_0x47dadd){this['commandName'](_0x47dadd)[_0xb3c6('0x10b')](/\\I\[(\d+)\]/i);const _0x5be5b3=Number(RegExp['$1'])||0x0,_0x4902ef=this[_0xb3c6('0x120')](_0x47dadd),_0x806714=_0x4902ef['x']+Math[_0xb3c6('0x3c7')]((_0x4902ef[_0xb3c6('0x1aa')]-ImageManager['iconWidth'])/0x2),_0x35c6d0=_0x4902ef['y']+(_0x4902ef[_0xb3c6('0x395')]-ImageManager[_0xb3c6('0x205')])/0x2;this['drawIcon'](_0x5be5b3,_0x806714,_0x35c6d0);},Window_EquipSlot[_0xb3c6('0x18a')][_0xb3c6('0x119')]=function(){return Imported[_0xb3c6('0x267')]&&Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x119')][_0xb3c6('0x274')](this);},Window_EquipSlot['prototype'][_0xb3c6('0xf8')]=function(){Window_StatusBase[_0xb3c6('0x18a')][_0xb3c6('0xf8')][_0xb3c6('0x274')](this),this[_0xb3c6('0x37d')]();},Window_EquipSlot['prototype'][_0xb3c6('0x18c')]=function(){Window_StatusBase[_0xb3c6('0x18a')]['processCursorMove'][_0xb3c6('0x274')](this),this['checkShiftRemoveShortcut']();},Window_EquipSlot[_0xb3c6('0x18a')]['checkShiftRemoveShortcut']=function(){if(!this[_0xb3c6('0x1d8')]())return;if(Input['isTriggered']('shift')&&this['item']()){const _0x168f45=SceneManager[_0xb3c6('0x259')][_0xb3c6('0x152')];if(_0x168f45){const _0x22e9d1=_0x168f45[_0xb3c6('0x2b')]()[this[_0xb3c6('0x15')]()];if(_0x168f45['nonRemovableEtypes']()[_0xb3c6('0xf2')](_0x22e9d1)){if(_0xb3c6('0x339')===_0xb3c6('0x3e4')){function _0x374550(){if(_0x25fbac)_0x54e615+=this[_0xb3c6('0x150')](_0x14cd73,_0xefbce6);}}else this['playBuzzerSound']();}else this[_0xb3c6('0x183')]();}}},Window_EquipSlot[_0xb3c6('0x18a')][_0xb3c6('0x183')]=function(){SoundManager[_0xb3c6('0x24d')]();const _0x1eeea4=SceneManager[_0xb3c6('0x259')][_0xb3c6('0x152')];_0x1eeea4[_0xb3c6('0x378')](this['index'](),null),this[_0xb3c6('0x2a1')]();},Window_EquipSlot[_0xb3c6('0x18a')][_0xb3c6('0x1d8')]=function(){return this['active']&&VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['EquipScene']['ShiftShortcutKey'];},Window_EquipSlot[_0xb3c6('0x18a')]['processCursorMoveModernControls']=function(){!this[_0xb3c6('0x398')]()&&Window_StatusBase['prototype']['processCursorMoveModernControls'][_0xb3c6('0x274')](this);},Window_EquipSlot[_0xb3c6('0x18a')][_0xb3c6('0x398')]=function(){if(!this[_0xb3c6('0x2c4')]())return![];if(SceneManager['_scene']['constructor']!==Scene_Equip)return![];if(this['index']()===0x0&&Input[_0xb3c6('0x20f')]('up'))this[_0xb3c6('0x65')](),Input[_0xb3c6('0x385')](),SceneManager[_0xb3c6('0x259')][_0xb3c6('0x138')]();else{if(Input[_0xb3c6('0x106')]('down')){if(_0xb3c6('0x14')==='aLDbr'){const _0x427fb4=this[_0xb3c6('0x15')]();if(Input[_0xb3c6('0x126')](_0xb3c6('0x8c'))){if(_0xb3c6('0x39b')===_0xb3c6('0xe3')){function _0x57e47a(){this[_0xb3c6('0x21d')](_0x1fa6e9,_0x15f937['x'],_0x461495['y'],_0x8d3fed);}}else this['cursorPagedown']();}else this[_0xb3c6('0x145')](![]);if(this[_0xb3c6('0x15')]()!==_0x427fb4){if(_0xb3c6('0x2e0')===_0xb3c6('0x26')){function _0x143f32(){this[_0xb3c6('0x76')]();}}else this[_0xb3c6('0x65')]();}return!![];}else{function _0x520bf6(){_0x982d27[_0xb3c6('0x2fb')][_0xb3c6('0x2ed')]['call'](this,_0x5ab887),this[_0xb3c6('0x214')](_0x407116);}}}else{if(this[_0xb3c6('0x2d4')]()&&Input[_0xb3c6('0x20f')](_0xb3c6('0x8c')))return!![];}}return![];},Window_EquipSlot[_0xb3c6('0x18a')][_0xb3c6('0x2d4')]=function(){return VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0x23c')];},Window_EquipSlot[_0xb3c6('0x18a')][_0xb3c6('0x14b')]=function(){if(this['isOpen']()&&this['visible']&&SceneManager[_0xb3c6('0x259')][_0xb3c6('0x1d6')]===Scene_Equip){if(_0xb3c6('0x4f')!==_0xb3c6('0x2a3')){if(this[_0xb3c6('0x1a3')]()&&TouchInput[_0xb3c6('0x3dc')]())this[_0xb3c6('0x1b4')](![]);else TouchInput['isTriggered']()&&this[_0xb3c6('0x1b4')](!![]);if(TouchInput[_0xb3c6('0x197')]()){if('XGjSn'!==_0xb3c6('0x96')){function _0x169679(){const _0x21a825=this[_0xb3c6('0x22a')];_0x21a825[_0xb3c6('0xd5')]['clear']();const _0x547a8f=this[_0xb3c6('0x277')](this[_0xb3c6('0x15')]());if(_0x547a8f===_0xb3c6('0x38b')){const _0x1be3d2=this[_0xb3c6('0x120')](this[_0xb3c6('0x15')]());let _0x5d66f0=this[_0xb3c6('0x346')](this['index']());_0x5d66f0=_0x5d66f0[_0xb3c6('0x39e')](/\\I\[(\d+)\]/gi,''),_0x21a825[_0xb3c6('0x3d4')](),this[_0xb3c6('0x3af')](_0x5d66f0,_0x1be3d2),this[_0xb3c6('0x25e')](_0x5d66f0,_0x1be3d2),this['commandNameWindowCenter'](_0x5d66f0,_0x1be3d2);}}}else this[_0xb3c6('0x3da')]();}else{if(TouchInput['isCancelled']()){if(_0xb3c6('0x210')===_0xb3c6('0x370')){function _0x30b7db(){_0x3302a5[_0xb3c6('0x287')]&&this['drawIcon'](_0x3d816a,_0x403f23['x'],_0x458247['y']+0x2);_0xd44bc4['x']+=_0x5d8d64[_0xb3c6('0x42')](_0x3e3e66[_0xb3c6('0x32e')]*this[_0xb3c6('0x3d9')]());if(this[_0xb3c6('0x3d9')]()===0x1)_0x247770['x']+=0x4;}}else this[_0xb3c6('0x1f4')]();}}}else{function _0x4c7a9e(){this[_0xb3c6('0x11')]();}}}},Window_EquipSlot[_0xb3c6('0x18a')][_0xb3c6('0x1b4')]=function(_0x42068d){this['_doubleTouch']=![];const _0x1a6748=this[_0xb3c6('0x15')](),_0x19d58c=this[_0xb3c6('0x171')](),_0x38d251=SceneManager['_scene'][_0xb3c6('0x225')];if(_0x38d251[_0xb3c6('0x237')]()&&_0x38d251['visible']){if(_0x19d58c>=0x0){if(_0xb3c6('0x78')!==_0xb3c6('0x78')){function _0x2b9af4(){_0x522c7d[_0xb3c6('0x108')]=!![];const _0xdd7153=_0x16d09f[_0xb3c6('0x2fb')]['Game_Actor_tradeItemWithParty'][_0xb3c6('0x274')](this,_0x469d2f,_0x3dddd3);return _0x226d68[_0xb3c6('0x108')]=![],_0xdd7153;}}else _0x19d58c===this[_0xb3c6('0x15')]()&&(this[_0xb3c6('0x289')]=!![]),this['activate'](),this[_0xb3c6('0x2d3')](_0x19d58c);}else _0x38d251[_0xb3c6('0x171')]()>=0x0&&(this[_0xb3c6('0x36c')](),this['deselect']());}if(_0x42068d&&this[_0xb3c6('0x15')]()!==_0x1a6748){if(_0xb3c6('0xd0')===_0xb3c6('0xd0'))this[_0xb3c6('0x65')]();else{function _0x3c1052(){if(_0x46d8aa[_0x30f8cc]===_0xe703ca){_0x7f67f2=_0x34528e;if(!_0x4d3b83[_0xaff710])return _0x288148;}}}}},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x129')]=Window_EquipItem[_0xb3c6('0x18a')][_0xb3c6('0xf2')],Window_EquipItem['prototype'][_0xb3c6('0xf2')]=function(_0x895748){if(_0x895748===null&&this['nonRemovableEtypes']()['includes'](this[_0xb3c6('0x3f8')]())){if(_0xb3c6('0x2af')==='WzTlo'){function _0x404ad6(){this['cursorPageup']();}}else return this[_0xb3c6('0xb1')][_0xb3c6('0x2b5')]>0x0?![]:!![];}else return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x129')][_0xb3c6('0x274')](this,_0x895748);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1d2')]=Window_EquipItem['prototype'][_0xb3c6('0xdb')],Window_EquipItem['prototype']['isEnabled']=function(_0x20bf20){if(!_0x20bf20&&this['nonRemovableEtypes']()['includes'](this[_0xb3c6('0x3f8')]()))return![];else{if(_0xb3c6('0x30e')===_0xb3c6('0x2e5')){function _0x1fee29(){if(!this[_0xb3c6('0x303')](_0x21d321))return![];return!![];}}else return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1d2')][_0xb3c6('0x274')](this,_0x20bf20);}},Window_EquipItem[_0xb3c6('0x18a')][_0xb3c6('0x27e')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x234')][_0xb3c6('0x7e')];},Window_EquipItem[_0xb3c6('0x18a')][_0xb3c6('0x335')]=function(_0x47532c){const _0x2041ec=this['itemAt'](_0x47532c);_0x2041ec?Window_ItemList['prototype'][_0xb3c6('0x335')][_0xb3c6('0x274')](this,_0x47532c):this[_0xb3c6('0x388')](_0x47532c);},Window_EquipItem[_0xb3c6('0x18a')][_0xb3c6('0x388')]=function(_0x730a29){this[_0xb3c6('0x13a')](this[_0xb3c6('0xdb')](null));const _0x298bfa=VisuMZ['ItemsEquipsCore']['Settings'][_0xb3c6('0x234')],_0x11fca0=this[_0xb3c6('0x120')](_0x730a29),_0x4b13b7=_0x11fca0['y']+(this['lineHeight']()-ImageManager[_0xb3c6('0x205')])/0x2,_0x2970f1=ImageManager[_0xb3c6('0x32e')]+0x4,_0x34f67f=Math[_0xb3c6('0x30d')](0x0,_0x11fca0[_0xb3c6('0x1aa')]-_0x2970f1);this[_0xb3c6('0x172')](),this[_0xb3c6('0x2b3')](_0x298bfa[_0xb3c6('0x352')],_0x11fca0['x'],_0x4b13b7),this['drawText'](_0x298bfa['RemoveEquipText'],_0x11fca0['x']+_0x2970f1,_0x11fca0['y'],_0x34f67f),this[_0xb3c6('0x13a')](!![]);},Window_EquipItem[_0xb3c6('0x18a')][_0xb3c6('0x1bb')]=function(){Window_ItemList[_0xb3c6('0x18a')][_0xb3c6('0x1bb')][_0xb3c6('0x274')](this);if(this[_0xb3c6('0x152')]&&this[_0xb3c6('0x132')]&&this[_0xb3c6('0x364')]>=0x0){const _0x5a5982=JsonEx[_0xb3c6('0x1c5')](this[_0xb3c6('0x152')]);_0x5a5982['_tempActor']=!![],_0x5a5982[_0xb3c6('0x423')](this[_0xb3c6('0x364')],this[_0xb3c6('0x43')]()),this[_0xb3c6('0x132')][_0xb3c6('0x281')](_0x5a5982);}},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1e8')]=Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x1a6')],Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x1a6')]=function(_0x308eba){VisuMZ['ItemsEquipsCore']['Window_ShopCommand_initialize'][_0xb3c6('0x274')](this,_0x308eba),this[_0xb3c6('0x34f')](_0x308eba);},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x34f')]=function(_0x4006a7){const _0x460efe=new Rectangle(0x0,0x0,_0x4006a7['width'],_0x4006a7[_0xb3c6('0x395')]);this['_commandNameWindow']=new Window_Base(_0x460efe),this[_0xb3c6('0x22a')]['opacity']=0x0,this[_0xb3c6('0x20b')](this[_0xb3c6('0x22a')]),this[_0xb3c6('0xba')]();},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x37d')]=function(){Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x37d')][_0xb3c6('0x274')](this);if(this[_0xb3c6('0x22a')])this[_0xb3c6('0xba')]();},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0xba')]=function(){const _0x3554d6=this['_commandNameWindow'];_0x3554d6[_0xb3c6('0xd5')][_0xb3c6('0x385')]();const _0x4b72ec=this[_0xb3c6('0x277')](this[_0xb3c6('0x15')]());if(_0x4b72ec===_0xb3c6('0x38b')){const _0x151689=this[_0xb3c6('0x120')](this[_0xb3c6('0x15')]());let _0x34f0a5=this[_0xb3c6('0x346')](this[_0xb3c6('0x15')]());_0x34f0a5=_0x34f0a5['replace'](/\\I\[(\d+)\]/gi,''),_0x3554d6[_0xb3c6('0x3d4')](),this[_0xb3c6('0x3af')](_0x34f0a5,_0x151689),this[_0xb3c6('0x25e')](_0x34f0a5,_0x151689),this['commandNameWindowCenter'](_0x34f0a5,_0x151689);}},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x3af')]=function(_0x428bfe,_0x3339fc){},Window_ShopCommand['prototype'][_0xb3c6('0x25e')]=function(_0x4b1334,_0x3f2d29){const _0x8be676=this[_0xb3c6('0x22a')];_0x8be676[_0xb3c6('0x2d2')](_0x4b1334,0x0,_0x3f2d29['y'],_0x8be676[_0xb3c6('0x9d')],_0xb3c6('0x26f'));},Window_ShopCommand['prototype'][_0xb3c6('0x435')]=function(_0x322761,_0x44c654){const _0x3f52d4=this[_0xb3c6('0x22a')],_0x2059d9=$gameSystem[_0xb3c6('0x3d8')](),_0x3fabdd=_0x44c654['x']+Math[_0xb3c6('0x3c7')](_0x44c654['width']/0x2)+_0x2059d9;_0x3f52d4['x']=_0x3f52d4[_0xb3c6('0x1aa')]/-0x2+_0x3fabdd,_0x3f52d4['y']=Math[_0xb3c6('0x3c7')](_0x44c654[_0xb3c6('0x395')]/0x2);},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x37')]=function(){return this[_0xb3c6('0x3ad')]?this[_0xb3c6('0x3ad')]['length']:0x3;},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x17d')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')][_0xb3c6('0xc4')];},Window_ShopCommand['prototype'][_0xb3c6('0x2d8')]=function(){this[_0xb3c6('0x323')](),this[_0xb3c6('0x235')](),this[_0xb3c6('0x3b5')]();},Window_ShopCommand[_0xb3c6('0x18a')]['refresh']=function(){Window_HorzCommand[_0xb3c6('0x18a')]['refresh'][_0xb3c6('0x274')](this),this[_0xb3c6('0x39d')]();},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x323')]=function(){const _0x5d1c67=this[_0xb3c6('0x17f')](),_0x27e970=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['ShopScene']['CmdIconBuy'],_0x3ea80a=_0x5d1c67===_0xb3c6('0xe0')?TextManager[_0xb3c6('0x52')]:_0xb3c6('0x396')['format'](_0x27e970,TextManager[_0xb3c6('0x52')]),_0x49b868=this[_0xb3c6('0xf')]();if(this[_0xb3c6('0x17d')]()&&!_0x49b868)return;this[_0xb3c6('0x3ea')](_0x3ea80a,_0xb3c6('0x52'),_0x49b868);},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0xf')]=function(){if(SceneManager[_0xb3c6('0x259')][_0xb3c6('0x1d6')]===Scene_Shop){if(_0xb3c6('0x4d')!=='JNYCj'){function _0x1bc537(){return this[_0xb3c6('0x33f')]();}}else return SceneManager[_0xb3c6('0x259')][_0xb3c6('0x1c2')]>0x0;}else{if(_0xb3c6('0x3')!=='fnXYQ')return!![];else{function _0x17a854(){_0x2e248f=_0x1802da[_0xb3c6('0x42e')](_0x368189),_0x26e328=_0x282ac4-_0x3c3810[_0xb3c6('0x42e')](_0x16091a),this[_0xb3c6('0x5d')](_0x2225df[_0xb3c6('0x30f')](_0x2b34fb)),_0x2b43f3=(_0x4367e4>=0x0?'+':'')+_0x28e3be[_0xb3c6('0x33c')](_0x3dd489,0x0);}}}},Window_ShopCommand[_0xb3c6('0x18a')]['addSellCommand']=function(){const _0x17a69b=this[_0xb3c6('0x17f')](),_0x366509=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')][_0xb3c6('0x1e0')],_0x1431c1=_0x17a69b==='text'?TextManager[_0xb3c6('0x3a7')]:'\x5cI[%1]%2'[_0xb3c6('0x1ab')](_0x366509,TextManager[_0xb3c6('0x3a7')]),_0xa924da=this[_0xb3c6('0xd9')]();if(this[_0xb3c6('0x17d')]()&&!_0xa924da)return;this[_0xb3c6('0x3ea')](_0x1431c1,_0xb3c6('0x3a7'),_0xa924da);},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0xd9')]=function(){return!this[_0xb3c6('0x185')];},Window_ShopCommand['prototype'][_0xb3c6('0x3b5')]=function(){const _0x47392e=this[_0xb3c6('0x17f')](),_0x6064fc=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')][_0xb3c6('0x39a')],_0x1b9cef=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')][_0xb3c6('0x215')],_0x636b53=_0x47392e===_0xb3c6('0xe0')?_0x1b9cef:'\x5cI[%1]%2'['format'](_0x6064fc,_0x1b9cef);this[_0xb3c6('0x3ea')](_0x636b53,_0xb3c6('0x33e'));},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x40a')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')][_0xb3c6('0x3c8')];},Window_ShopCommand[_0xb3c6('0x18a')]['drawItem']=function(_0x7c9cf5){const _0x298035=this['commandStyleCheck'](_0x7c9cf5);if(_0x298035===_0xb3c6('0x3ed')){if(_0xb3c6('0x1ac')!==_0xb3c6('0x22b'))this[_0xb3c6('0x15b')](_0x7c9cf5);else{function _0x291d14(){_0xd10b9d[_0xb3c6('0x2fb')]['Window_ItemList_updateHelp'][_0xb3c6('0x274')](this),this[_0xb3c6('0x132')]&&this[_0xb3c6('0x132')][_0xb3c6('0x1d6')]===_0x3e6f6a&&this['_statusWindow'][_0xb3c6('0x2f7')](this[_0xb3c6('0x43')]());}}}else{if(_0x298035===_0xb3c6('0x38b')){if(_0xb3c6('0xb7')!==_0xb3c6('0xb7')){function _0x49dc95(){return this['_shopStatusMenuAlly']?_0x1ccdb9[_0xb3c6('0x227')]:0x1;}}else this['drawItemStyleIcon'](_0x7c9cf5);}else Window_HorzCommand[_0xb3c6('0x18a')][_0xb3c6('0x335')][_0xb3c6('0x274')](this,_0x7c9cf5);}},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x17f')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')][_0xb3c6('0x2fd')];},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x277')]=function(_0x52c52e){if(_0x52c52e<0x0)return _0xb3c6('0xe0');const _0x1b8cf7=this[_0xb3c6('0x17f')]();if(_0x1b8cf7!==_0xb3c6('0x369'))return _0x1b8cf7;else{if(this[_0xb3c6('0x389')]()>0x0){if(_0xb3c6('0x130')!==_0xb3c6('0x130')){function _0x5798db(){const _0x512ef1='REPEAT';if(this['_customItemInfo'][_0x512ef1])return this[_0xb3c6('0x292')][_0x512ef1];const _0x31f9dd=_0xb3c6('0x26b');return _0x31f9dd[_0xb3c6('0x1ab')](this[_0xb3c6('0x3a9')][_0xb3c6('0x1f2')]);}}else{const _0x4c1e37=this[_0xb3c6('0x346')](_0x52c52e);if(_0x4c1e37['match'](/\\I\[(\d+)\]/i)){const _0x162a71=this['itemLineRect'](_0x52c52e),_0x129dba=this[_0xb3c6('0x437')](_0x4c1e37)['width'];if(_0x129dba<=_0x162a71[_0xb3c6('0x1aa')]){if('ygaUj'!==_0xb3c6('0xb2')){function _0x219609(){const _0x133e22=this[_0xb3c6('0x120')](_0x349e5f),_0x192920=this[_0xb3c6('0x346')](_0x6e4ea5),_0x1301c2=this[_0xb3c6('0x437')](_0x192920)[_0xb3c6('0x1aa')];this[_0xb3c6('0x13a')](this['isCommandEnabled'](_0xe4a2a9));const _0x316d54=this['itemTextAlign']();if(_0x316d54===_0xb3c6('0x345'))this[_0xb3c6('0x21d')](_0x192920,_0x133e22['x']+_0x133e22[_0xb3c6('0x1aa')]-_0x1301c2,_0x133e22['y'],_0x1301c2);else{if(_0x316d54===_0xb3c6('0x26f')){const _0x1dd24d=_0x133e22['x']+_0x5ebe24['floor']((_0x133e22[_0xb3c6('0x1aa')]-_0x1301c2)/0x2);this[_0xb3c6('0x21d')](_0x192920,_0x1dd24d,_0x133e22['y'],_0x1301c2);}else this[_0xb3c6('0x21d')](_0x192920,_0x133e22['x'],_0x133e22['y'],_0x1301c2);}}}else return _0xb3c6('0x3ed');}else{if(_0xb3c6('0x3a8')===_0xb3c6('0x3a8'))return _0xb3c6('0x38b');else{function _0x7ce122(){return _0x32fb54[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x3bc')];}}}}}}}return'text';},Window_ShopCommand['prototype'][_0xb3c6('0x15b')]=function(_0x14242f){const _0x2536c9=this[_0xb3c6('0x120')](_0x14242f),_0x2ea72a=this[_0xb3c6('0x346')](_0x14242f),_0x26ddae=this[_0xb3c6('0x437')](_0x2ea72a)[_0xb3c6('0x1aa')];this[_0xb3c6('0x13a')](this[_0xb3c6('0x1e5')](_0x14242f));const _0x4a6fac=this[_0xb3c6('0x40a')]();if(_0x4a6fac===_0xb3c6('0x345'))this[_0xb3c6('0x21d')](_0x2ea72a,_0x2536c9['x']+_0x2536c9[_0xb3c6('0x1aa')]-_0x26ddae,_0x2536c9['y'],_0x26ddae);else{if(_0x4a6fac===_0xb3c6('0x26f')){const _0x207b15=_0x2536c9['x']+Math[_0xb3c6('0x3c7')]((_0x2536c9[_0xb3c6('0x1aa')]-_0x26ddae)/0x2);this[_0xb3c6('0x21d')](_0x2ea72a,_0x207b15,_0x2536c9['y'],_0x26ddae);}else this['drawTextEx'](_0x2ea72a,_0x2536c9['x'],_0x2536c9['y'],_0x26ddae);}},Window_ShopCommand[_0xb3c6('0x18a')][_0xb3c6('0x27')]=function(_0x2e706a){this[_0xb3c6('0x346')](_0x2e706a)[_0xb3c6('0x10b')](/\\I\[(\d+)\]/i);const _0x494d14=Number(RegExp['$1'])||0x0,_0x4cd392=this[_0xb3c6('0x120')](_0x2e706a),_0x461f40=_0x4cd392['x']+Math[_0xb3c6('0x3c7')]((_0x4cd392[_0xb3c6('0x1aa')]-ImageManager[_0xb3c6('0x32e')])/0x2),_0x135f2c=_0x4cd392['y']+(_0x4cd392[_0xb3c6('0x395')]-ImageManager[_0xb3c6('0x205')])/0x2;this[_0xb3c6('0x2b3')](_0x494d14,_0x461f40,_0x135f2c);},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0xa1')]=Window_ShopBuy[_0xb3c6('0x18a')][_0xb3c6('0x2a1')],Window_ShopBuy[_0xb3c6('0x18a')][_0xb3c6('0x2a1')]=function(){this[_0xb3c6('0x16e')](),VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0xa1')]['call'](this);},Window_ShopBuy[_0xb3c6('0x18a')][_0xb3c6('0x16e')]=function(){SceneManager[_0xb3c6('0x259')][_0xb3c6('0x1d6')]===Scene_Shop&&(this[_0xb3c6('0x1b9')]=SceneManager[_0xb3c6('0x259')][_0xb3c6('0x2e3')]());},VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x195')]=Window_ShopBuy['prototype'][_0xb3c6('0x6e')],Window_ShopBuy[_0xb3c6('0x18a')]['price']=function(_0x64eba6){if(!_0x64eba6)return 0x0;const _0x104edd=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x195')][_0xb3c6('0x274')](this,_0x64eba6);return this[_0xb3c6('0x1ae')](_0x64eba6,_0x104edd);},Window_ShopBuy[_0xb3c6('0x18a')][_0xb3c6('0x1ae')]=function(_0x9c58e2,_0x519d58){const _0x5e5ab6=_0x9c58e2['note'];if(_0x5e5ab6[_0xb3c6('0x10b')](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x21a223=String(RegExp['$1']);try{eval(_0x21a223);}catch(_0x2a9a5d){if('jGtEH'===_0xb3c6('0x33')){function _0x2744d6(){if(!_0x46caea[_0xb3c6('0x3f9')](this[_0xb3c6('0x3a9')]))return![];const _0x54a35d=this[_0xb3c6('0x66')]();this[_0xb3c6('0x25d')](_0x54a35d,_0xf300ef,_0x3a3ebd,_0x37532a,!![]);const _0x3f0e04=this[_0xb3c6('0x325')]();return this[_0xb3c6('0x25d')](_0x3f0e04,_0x3b1f2c,_0x28da25,_0x212083,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x4e4105,_0x1b37d7,_0x3e2a55),this[_0xb3c6('0x3d4')](),!![];}}else{if($gameTemp[_0xb3c6('0x57')]())console[_0xb3c6('0x3b3')](_0x2a9a5d);}}}_0x519d58=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x266')]['BuyPriceJS']['call'](this,_0x9c58e2,_0x519d58);if(isNaN(_0x519d58))_0x519d58=0x0;return Math[_0xb3c6('0x3c7')](_0x519d58);},Window_ShopBuy[_0xb3c6('0x18a')][_0xb3c6('0x335')]=function(_0x42dbc9){this[_0xb3c6('0x3d4')]();const _0x8a815d=this[_0xb3c6('0x117')](_0x42dbc9),_0x40e49d=this[_0xb3c6('0x6e')](_0x8a815d),_0xa58be3=TextManager[_0xb3c6('0x357')],_0x503641=this[_0xb3c6('0x120')](_0x42dbc9),_0x2240b9=this['priceWidth'](),_0x2a9896=this[_0xb3c6('0x162')](_0xa58be3),_0x363e1=_0x503641['x']+_0x503641[_0xb3c6('0x1aa')]-_0x2240b9-_0x2a9896,_0x42be4b=_0x503641[_0xb3c6('0x1aa')]-_0x2240b9-_0x2a9896;this[_0xb3c6('0x13a')](this[_0xb3c6('0xdb')](_0x8a815d)),this['drawItemName'](_0x8a815d,_0x503641['x'],_0x503641['y'],_0x42be4b),this[_0xb3c6('0x2d2')](_0x40e49d,_0x363e1,_0x503641['y'],_0x2240b9,_0xb3c6('0x345')),this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x20c')]()),this[_0xb3c6('0x2d2')](_0xa58be3,_0x503641['x'],_0x503641['y'],_0x503641[_0xb3c6('0x1aa')],_0xb3c6('0x345')),this[_0xb3c6('0x13a')](!![]);},Window_ShopSell[_0xb3c6('0x18a')][_0xb3c6('0x37')]=function(){return SceneManager[_0xb3c6('0x259')]['isUseItemsEquipsCoreUpdatedLayout']()?0x1:0x2;},VisuMZ['ItemsEquipsCore'][_0xb3c6('0x308')]=Window_ShopSell[_0xb3c6('0x18a')][_0xb3c6('0xdb')],Window_ShopSell[_0xb3c6('0x18a')][_0xb3c6('0xdb')]=function(_0x23ce8d){if(!_0x23ce8d)return![];const _0x2512e4=_0x23ce8d[_0xb3c6('0x31f')];if(_0x2512e4[_0xb3c6('0x10b')](/<CANNOT SELL>/i))return![];if(_0x2512e4[_0xb3c6('0x10b')](/<CAN SELL>/i))return!![];if(_0x2512e4[_0xb3c6('0x10b')](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x374b37=JSON[_0xb3c6('0x434')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3163d8 of _0x374b37){if(!$gameSwitches[_0xb3c6('0x12')](_0x3163d8))return![];}}if(_0x2512e4[_0xb3c6('0x10b')](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb3c6('0xc0')!==_0xb3c6('0xc0')){function _0x1e34f7(){_0x397632['opacity']=this[_0xb3c6('0x8f')];}}else{const _0x3a292c=JSON['parse']('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x4f0e22 of _0x3a292c){if(_0xb3c6('0x28f')===_0xb3c6('0x391')){function _0x1435f2(){const _0x229ba8=_0x319173[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x359')][_0xb3c6('0x34e')];if(_0x229ba8==='')return;const _0x2d6c3e=_0x310eac[_0xb3c6('0x32e')],_0x572a66=_0x48501b[_0xb3c6('0x205')];this[_0xb3c6('0x38f')][_0xb3c6('0x4b')]=this['getTextColor'](),this[_0xb3c6('0x38f')][_0xb3c6('0x286')]=_0x47a4dc['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x359')]['FontSize'],this[_0xb3c6('0x38f')][_0xb3c6('0x2d2')](_0x229ba8,0x0,_0x572a66/0x2,_0x2d6c3e,_0x572a66/0x2,_0xb3c6('0x26f'));}}else{if(!$gameSwitches[_0xb3c6('0x12')](_0x4f0e22))return![];}}}}if(_0x2512e4[_0xb3c6('0x10b')](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11d9f7=JSON['parse']('['+RegExp['$1'][_0xb3c6('0x10b')](/\d+/g)+']');for(const _0x25d158 of _0x11d9f7){if(_0xb3c6('0x290')!==_0xb3c6('0x207')){if($gameSwitches[_0xb3c6('0x12')](_0x25d158))return![];}else{function _0x240a20(){return _0xb3c6('0x38b');}}}}return VisuMZ['ItemsEquipsCore'][_0xb3c6('0x308')][_0xb3c6('0x274')](this,_0x23ce8d);},Window_ShopStatus['prototype']['loadFaceImages']=function(){Window_StatusBase[_0xb3c6('0x18a')]['loadFaceImages'][_0xb3c6('0x274')](this);for(const _0xbd83f6 of $gameParty[_0xb3c6('0x1d9')]()){ImageManager[_0xb3c6('0x3d')](_0xbd83f6['characterName']());}},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x35e')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')]['Translucent'];},Window_ShopStatus['prototype'][_0xb3c6('0x2a1')]=function(){this[_0xb3c6('0xd5')][_0xb3c6('0x385')](),this[_0xb3c6('0x2d5')][_0xb3c6('0x385')](),this[_0xb3c6('0x3a9')]&&(this[_0xb3c6('0x3d4')](),this[_0xb3c6('0x13a')](!![]),this[_0xb3c6('0x2aa')](),this[_0xb3c6('0x103')]()?this[_0xb3c6('0x2ae')]():this['drawItemData']());},Window_ShopStatus[_0xb3c6('0x18a')]['drawPossession']=function(_0x160d69,_0x1b967c){if(!this[_0xb3c6('0x103')]()&&!DataManager[_0xb3c6('0x3f9')](this[_0xb3c6('0x3a9')]))return;const _0x37e797=this[_0xb3c6('0x9d')]-this['itemPadding']()-_0x160d69,_0x23ce2c=this[_0xb3c6('0x162')](_0xb3c6('0x19b'));this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x20c')]()),this[_0xb3c6('0x2d2')](TextManager[_0xb3c6('0x3ee')],_0x160d69+this[_0xb3c6('0x2c1')](),_0x1b967c,_0x37e797-_0x23ce2c),this[_0xb3c6('0x172')](),this['drawItemNumber'](this[_0xb3c6('0x3a9')],_0x160d69,_0x1b967c,_0x37e797);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x2ae')]=function(){VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x201')]['call'](this);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x39')]=function(_0x1b0672,_0x4738bc,_0x1a8786){if(!this['isEquipItem']())return![];const _0x4bded9=$dataSystem[_0xb3c6('0x3b2')][this[_0xb3c6('0x3a9')][_0xb3c6('0x3f8')]];return this['drawItemKeyData'](_0x4bded9,_0x1b0672,_0x4738bc,_0x1a8786,!![]),this[_0xb3c6('0x11d')](_0x1b0672,_0x4738bc,_0x1a8786),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus['prototype'][_0xb3c6('0x21a')]=function(){const _0x24c64d=VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')]['ItemQuantityFmt'];return _0x24c64d[_0xb3c6('0x1ab')]($gameParty[_0xb3c6('0x208')](this[_0xb3c6('0x3a9')]));},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x3d6')]=function(){if(Imported[_0xb3c6('0x267')])return VisuMZ[_0xb3c6('0x188')][_0xb3c6('0x1dc')][_0xb3c6('0x16b')][_0xb3c6('0x336')];else{if(_0xb3c6('0x1b3')===_0xb3c6('0x27c')){function _0x336701(){_0x5d4226='armor-%1'[_0xb3c6('0x1ab')](_0x23231d['id']);}}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x3ce')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['StatusWindow']['ParamChangeFontSize'];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0xc2')]=function(_0x26cada,_0x2ca4df,_0x42d165,_0x59b88e){this[_0xb3c6('0x3d4')](),this[_0xb3c6('0xd5')][_0xb3c6('0x286')]=this[_0xb3c6('0x3ce')]();let _0x443ab3=this[_0xb3c6('0x162')](TextManager[_0xb3c6('0x2a9')](_0x26cada))+0x4+_0x2ca4df;if(Imported[_0xb3c6('0x267')]){if(_0xb3c6('0x218')!==_0xb3c6('0x218')){function _0x538477(){return _0x577b5e[_0xb3c6('0x28c')];}}else this[_0xb3c6('0x158')](_0x2ca4df,_0x42d165,_0x59b88e,_0x26cada,!![]),VisuMZ[_0xb3c6('0x188')]['Settings']['Param'][_0xb3c6('0x42f')]&&(_0x443ab3+=ImageManager[_0xb3c6('0x32e')]+0x4);}else{if('nXJgK'!==_0xb3c6('0xcd')){function _0xa65894(){if(!_0xb7c8d)return 0x63;else return _0x7ce3ba[_0xb3c6('0x31f')][_0xb3c6('0x10b')](/<MAX:[ ](\d+)>/i)?_0x1e6fb4(_0x46b48e['$1']):this['defaultItemMax'](_0x496479);}}else this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x20c')]()),this[_0xb3c6('0x2d2')](TextManager['param'](_0x26cada),_0x2ca4df,_0x42d165,_0x59b88e);}return this['resetFontSettings'](),_0x443ab3;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x1d1')]=function(_0x424857,_0x37d81e,_0x5e5ed1,_0xfa1752,_0x352297){_0x5e5ed1+=this[_0xb3c6('0x2c1')](),_0x352297-=this[_0xb3c6('0x2c1')]()*0x2;const _0x395d37=VisuMZ[_0xb3c6('0x2fb')]['Settings']['StatusWindow'];this[_0xb3c6('0xd5')][_0xb3c6('0x286')]=_0x395d37[_0xb3c6('0x386')],this[_0xb3c6('0x13a')](_0x424857['canEquip'](this[_0xb3c6('0x3a9')]));if(_0x424857[_0xb3c6('0x10')](this[_0xb3c6('0x3a9')])){const _0x3a921a=_0x395d37[_0xb3c6('0x428')];this['drawText'](_0x3a921a,_0x5e5ed1,_0xfa1752,_0x352297,'center');}else{if(_0x424857[_0xb3c6('0x223')](this[_0xb3c6('0x3a9')])){const _0x578d11=this['currentEquippedItem'](_0x424857,this[_0xb3c6('0x3a9')]['etypeId']),_0x3de6bb=JsonEx[_0xb3c6('0x1c5')](_0x424857);_0x3de6bb[_0xb3c6('0x32b')]=!![];const _0x22e1f0=_0x3de6bb[_0xb3c6('0x2b')]()[_0xb3c6('0x9f')](this['_item'][_0xb3c6('0x3f8')]);if(_0x22e1f0>=0x0)_0x3de6bb[_0xb3c6('0x423')](_0x22e1f0,this[_0xb3c6('0x3a9')]);let _0x2fd5ea=0x0,_0x5c39ad=0x0,_0x2fdcd3=0x0;if(Imported[_0xb3c6('0x267')])_0x2fd5ea=_0x3de6bb[_0xb3c6('0x42e')](_0x37d81e),_0x5c39ad=_0x2fd5ea-_0x424857[_0xb3c6('0x42e')](_0x37d81e),this['changeTextColor'](ColorManager[_0xb3c6('0x30f')](_0x5c39ad)),_0x2fdcd3=(_0x5c39ad>=0x0?'+':'')+VisuMZ[_0xb3c6('0x33c')](_0x5c39ad,0x0);else{if(_0xb3c6('0x31c')===_0xb3c6('0x31c'))_0x2fd5ea=_0x3de6bb[_0xb3c6('0x2a9')](_0x37d81e),_0x5c39ad=_0x2fd5ea-_0x424857[_0xb3c6('0x2a9')](_0x37d81e),this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x30f')](_0x5c39ad)),_0x2fdcd3=(_0x5c39ad>=0x0?'+':'')+_0x5c39ad;else{function _0x444c4f(){if(this[_0xb3c6('0x27f')]()===_0xb3c6('0x71'))_0x265473['prototype'][_0xb3c6('0x144')][_0xb3c6('0x274')](this);}}}if(_0x2fdcd3==='+0')_0x2fdcd3=_0x395d37[_0xb3c6('0x21c')];this[_0xb3c6('0x2d2')](_0x2fdcd3,_0x5e5ed1,_0xfa1752,_0x352297,'center');}else{if(_0xb3c6('0x3fd')!==_0xb3c6('0x3fd')){function _0x3715d2(){return this['helpWindowRectItemsEquipsCore']();}}else{const _0x265400=_0x395d37['CannotEquipMarker'];this[_0xb3c6('0x2d2')](_0x265400,_0x5e5ed1,_0xfa1752,_0x352297,_0xb3c6('0x26f'));}}}this[_0xb3c6('0x3d4')](),this[_0xb3c6('0x13a')](!![]);},Window_ShopStatus[_0xb3c6('0x18a')]['drawItemData']=function(){VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x35c')]['call'](this);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x2aa')]=function(){this[_0xb3c6('0x292')]={};if(!this[_0xb3c6('0x3a9')])return;const _0x26853a=this[_0xb3c6('0x3a9')][_0xb3c6('0x31f')];if(_0x26853a[_0xb3c6('0x10b')](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0xe5c2ad=String(RegExp['$1'])[_0xb3c6('0x3ae')](/[\r\n]+/);for(const _0xd69523 of _0xe5c2ad){if('aoRHW'===_0xb3c6('0x193')){if(_0xd69523[_0xb3c6('0x10b')](/(.*):[ ](.*)/i)){const _0x1e5e9a=String(RegExp['$1'])[_0xb3c6('0x41b')]()[_0xb3c6('0x11f')](),_0x371a5a=String(RegExp['$2'])['trim']();this['_customItemInfo'][_0x1e5e9a]=_0x371a5a;}}else{function _0x462633(){_0x17cb4b[_0xb3c6('0x18a')]['initialize'][_0xb3c6('0x274')](this),this[_0xb3c6('0x272')]();}}}}},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x42a')]=function(){return 0x16;},Window_ShopStatus['prototype'][_0xb3c6('0x3d4')]=function(){Window_StatusBase[_0xb3c6('0x18a')][_0xb3c6('0x3d4')][_0xb3c6('0x274')](this),this['contents'][_0xb3c6('0x286')]=this[_0xb3c6('0x3c5')]||this['contents']['fontSize'],this[_0xb3c6('0xd5')][_0xb3c6('0x4b')]=this[_0xb3c6('0x61')]||this['contents'][_0xb3c6('0x4b')];},Window_ShopStatus['prototype'][_0xb3c6('0x3d9')]=function(){return this[_0xb3c6('0xd5')][_0xb3c6('0x286')]/$gameSystem[_0xb3c6('0x110')]();},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x2b3')]=function(_0x66ed99,_0x426c96,_0x35371a){const _0x4adaef=ImageManager[_0xb3c6('0x155')](_0xb3c6('0x2f1')),_0x5c6b9b=ImageManager[_0xb3c6('0x32e')],_0x206820=ImageManager['iconHeight'],_0xf368c3=_0x66ed99%0x10*_0x5c6b9b,_0xbf86eb=Math[_0xb3c6('0x3c7')](_0x66ed99/0x10)*_0x206820,_0x56f9d5=Math[_0xb3c6('0x42')](_0x5c6b9b*this['fontSizeRatio']()),_0x432b34=Math[_0xb3c6('0x42')](_0x206820*this[_0xb3c6('0x3d9')]());this[_0xb3c6('0xd5')][_0xb3c6('0x26e')](_0x4adaef,_0xf368c3,_0xbf86eb,_0x5c6b9b,_0x206820,_0x426c96,_0x35371a,_0x56f9d5,_0x432b34);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x394')]=function(_0x4e25ea,_0x353162){_0x353162[_0xb3c6('0x287')]&&this[_0xb3c6('0x2b3')](_0x4e25ea,_0x353162['x'],_0x353162['y']+0x2);_0x353162['x']+=Math[_0xb3c6('0x42')](ImageManager[_0xb3c6('0x32e')]*this[_0xb3c6('0x3d9')]());if(this[_0xb3c6('0x3d9')]()===0x1)_0x353162['x']+=0x4;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x25d')]=function(_0x384867,_0x109c75,_0x1c5dcd,_0x190d48,_0x5e2497,_0x540f1c){_0x384867=_0x384867||'',_0x540f1c=_0x540f1c||_0xb3c6('0x42d'),this['_resetFontSize']=this[_0xb3c6('0x42a')](),this['_resetFontColor']=_0x5e2497?ColorManager[_0xb3c6('0x20c')]():this[_0xb3c6('0xd5')]['textColor'],_0x109c75+=this[_0xb3c6('0x2c1')](),_0x190d48-=this[_0xb3c6('0x2c1')]()*0x2;const _0x1b89c1=this[_0xb3c6('0x437')](_0x384867);if(_0x540f1c==='center'){if(_0xb3c6('0xad')!==_0xb3c6('0xad')){function _0x4541dd(){for(const _0x4fe0fe of _0x3316d2[_0xb3c6('0x3b2')]){const _0x516379=_0x27e501[_0xb3c6('0x3b2')][_0xb3c6('0x9f')](_0x4fe0fe['trim']());if(_0x516379>0x0)_0x41d778[_0xb3c6('0x2b')][_0xb3c6('0x91')](_0x516379);}}}else _0x109c75=_0x109c75+Math[_0xb3c6('0x3c7')]((_0x190d48-_0x1b89c1[_0xb3c6('0x1aa')])/0x2);}else _0x540f1c===_0xb3c6('0x345')&&(_0x109c75=_0x109c75+_0x190d48-_0x1b89c1[_0xb3c6('0x1aa')]);_0x1c5dcd+=(this['lineHeight']()-_0x1b89c1[_0xb3c6('0x395')])/0x2,this[_0xb3c6('0x21d')](_0x384867,_0x109c75,_0x1c5dcd,_0x190d48),this[_0xb3c6('0x3c5')]=undefined,this[_0xb3c6('0x61')]=undefined,this[_0xb3c6('0x3d4')]();},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x18')]=function(_0x2be3db,_0x1230d0,_0x229678){if(!DataManager[_0xb3c6('0x3f9')](this[_0xb3c6('0x3a9')]))return![];const _0x5c0b7e=this[_0xb3c6('0x66')]();this[_0xb3c6('0x25d')](_0x5c0b7e,_0x2be3db,_0x1230d0,_0x229678,!![]);const _0x4c3bbf=this[_0xb3c6('0x325')]();return this['drawItemKeyData'](_0x4c3bbf,_0x2be3db,_0x1230d0,_0x229678,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x2be3db,_0x1230d0,_0x229678),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')]['getItemConsumableLabel']=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x11e')];},Window_ShopStatus['prototype'][_0xb3c6('0x325')]=function(){const _0x119324='CONSUMABLE';if(this[_0xb3c6('0x292')][_0x119324])return this[_0xb3c6('0x292')][_0x119324];if(this[_0xb3c6('0x3cf')]()){if(_0xb3c6('0xdf')===_0xb3c6('0xdf'))return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['StatusWindow']['Consumable'];else{function _0xb523fd(){_0xb7714f[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['EquipScene'][_0xb3c6('0x349')][_0xb3c6('0x274')](this),this[_0xb3c6('0x3c')]();}}}else{if('oYLiG'!==_0xb3c6('0xcc')){function _0xffab6b(){const _0x3821f2=this[_0xb3c6('0xe9')](),_0x3b57f7=this[_0xb3c6('0x320')]()-this[_0xb3c6('0x225')][_0xb3c6('0x395')],_0x375c1e=this[_0xb3c6('0x360')]()?0x0:_0x450b66[_0xb3c6('0x2a2')]-_0x3821f2,_0x5dfa9c=this[_0xb3c6('0x225')]['y']+this[_0xb3c6('0x225')][_0xb3c6('0x395')];return new _0xa7ab52(_0x375c1e,_0x5dfa9c,_0x3821f2,_0x3b57f7);}}else return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')]['NotConsumable'];}},Window_ShopStatus['prototype'][_0xb3c6('0x3cf')]=function(){if(VisuMZ[_0xb3c6('0x188')]&&VisuMZ[_0xb3c6('0x188')][_0xb3c6('0x1dc')][_0xb3c6('0x10e')][_0xb3c6('0x307')]&&DataManager[_0xb3c6('0x60')](this[_0xb3c6('0x3a9')]))return![];else{if('yCcGj'===_0xb3c6('0x7c')){function _0x278c30(){return!this[_0xb3c6('0x119')]();}}else return this['_item'][_0xb3c6('0x35f')];}},Window_ShopStatus['prototype'][_0xb3c6('0x3d0')]=function(_0x75e83a,_0x231e0c,_0x368b7c){if(!this['isEquipItem']()&&!DataManager[_0xb3c6('0x3f9')](this[_0xb3c6('0x3a9')]))return![];if(DataManager[_0xb3c6('0x60')](this[_0xb3c6('0x3a9')])&&!$dataSystem[_0xb3c6('0x3ec')]){if(_0xb3c6('0x35d')!==_0xb3c6('0x196')){const _0x1b6fd7=TextManager['keyItem'];this[_0xb3c6('0x25d')](_0x1b6fd7,_0x75e83a,_0x231e0c,_0x368b7c,!![],_0xb3c6('0x26f'));}else{function _0x1d8990(){return _0x26721a['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')][_0xb3c6('0x2b8')][_0xb3c6('0x274')](this);}}}else{if(_0xb3c6('0x411')===_0xb3c6('0x411')){const _0x150675=TextManager[_0xb3c6('0x3ee')];this[_0xb3c6('0x25d')](_0x150675,_0x75e83a,_0x231e0c,_0x368b7c,!![]);const _0x24c6d3=this[_0xb3c6('0x21a')]();this[_0xb3c6('0x25d')](_0x24c6d3,_0x75e83a,_0x231e0c,_0x368b7c,![],_0xb3c6('0x345'));}else{function _0x58567c(){if(this[_0xb3c6('0x28a')](_0x509699))this[_0xb3c6('0x378')](_0x53ede3,this[_0xb3c6('0x17b')](_0x3126cf));}}}return this[_0xb3c6('0x11d')](_0x75e83a,_0x231e0c,_0x368b7c),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')]['getItemQuantityText']=function(){const _0x5596da=_0xb3c6('0x73');if(this[_0xb3c6('0x292')][_0x5596da])return this[_0xb3c6('0x292')][_0x5596da];const _0x17fd32=VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x2cf')][_0xb3c6('0x203')];return _0x17fd32['format']($gameParty['numItems'](this[_0xb3c6('0x3a9')]));},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x414')]=function(_0x2e44c2,_0x39b746,_0x210773){const _0x362e8d=this[_0xb3c6('0x421')]();return this['drawItemKeyData'](_0x362e8d,_0x2e44c2,_0x39b746,_0x210773,![],_0xb3c6('0x26f')),this[_0xb3c6('0x11d')](_0x2e44c2,_0x39b746,_0x210773),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x421')]=function(){const _0x38510c=_0xb3c6('0x1b1');if(this['_customItemInfo'][_0x38510c])return this[_0xb3c6('0x292')][_0x38510c];const _0x59bc89=VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')],_0x3b9120=_0xb3c6('0x55')[_0xb3c6('0x1ab')](this['_item'][_0xb3c6('0x13d')]);return _0x59bc89[_0x3b9120];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x2f2')]=function(_0x300506,_0x496da7,_0x4c99a2){const _0x5988c7=this[_0xb3c6('0x322')]();return this[_0xb3c6('0x25d')](_0x5988c7,_0x300506,_0x496da7,_0x4c99a2,![],_0xb3c6('0x26f')),this[_0xb3c6('0x11d')](_0x300506,_0x496da7,_0x4c99a2),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x322')]=function(){const _0x528571=_0xb3c6('0x23b');if(this[_0xb3c6('0x292')][_0x528571])return this[_0xb3c6('0x292')][_0x528571];const _0x506c62=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')];if(Imported['VisuMZ_1_BattleCore']){const _0x545f4b=this[_0xb3c6('0x3a9')][_0xb3c6('0x31f')];if(_0x545f4b[_0xb3c6('0x10b')](/<TARGET:[ ](.*)>/i)){const _0x3c2ebe=String(RegExp['$1']);if(_0x3c2ebe[_0xb3c6('0x10b')](/(\d+) RANDOM ANY/i))return _0x506c62[_0xb3c6('0x2b0')][_0xb3c6('0x1ab')](Number(RegExp['$1']));else{if(_0x3c2ebe['match'](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x506c62['ScopeRandomEnemies']['format'](Number(RegExp['$1']));else{if(_0x3c2ebe[_0xb3c6('0x10b')](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x506c62[_0xb3c6('0x186')][_0xb3c6('0x1ab')](Number(RegExp['$1']));else{if(_0x3c2ebe[_0xb3c6('0x10b')](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x506c62['ScopeAlliesButUser'];}}}}}const _0x4c26e8='Scope%1'[_0xb3c6('0x1ab')](this[_0xb3c6('0x3a9')][_0xb3c6('0x2fe')]);return _0x506c62[_0x4c26e8];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x77')]=function(_0x1f5acb,_0x14ab7e,_0x519850){const _0x48106e=this[_0xb3c6('0x165')]();this[_0xb3c6('0x25d')](_0x48106e,_0x1f5acb,_0x14ab7e,_0x519850,!![]);const _0x1f7705=this[_0xb3c6('0x118')]();return this[_0xb3c6('0x25d')](_0x1f7705,_0x1f5acb,_0x14ab7e,_0x519850,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x1f5acb,_0x14ab7e,_0x519850),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x165')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0xdd')];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x118')]=function(){const _0x570817=_0xb3c6('0x262');if(this[_0xb3c6('0x292')][_0x570817])return this[_0xb3c6('0x292')][_0x570817];const _0x342101=this[_0xb3c6('0x3a9')]['speed'];if(_0x342101>=0x7d0)return VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x3bc')];else{if(_0x342101>=0x3e8){if(_0xb3c6('0x16')!==_0xb3c6('0x2da'))return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x17e')];else{function _0x566522(){if(_0x486d28[_0xb3c6('0x10b')](_0x3f8316[_0xb3c6('0x2fb')][_0xb3c6('0x9e')][_0xb3c6('0x41')][_0x1a3f91])){const _0x44f1f8=_0xb3c6('0x22c')[_0xb3c6('0x1ab')](_0x2bb1ae,_0x4ee50a);_0x1bc56a['ItemsEquipsCore'][_0xb3c6('0x7a')][_0x44f1f8]=new _0x340e31(_0xb3c6('0x43'),_0xb3c6('0x26d'),_0x180e0d);}}}}else{if(_0x342101>0x0)return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x7f')];else{if(_0x342101===0x0){if(_0xb3c6('0x1d')!==_0xb3c6('0x1d')){function _0x18142a(){if(_0x3dbbc9[_0xb3c6('0x10b')](/(.*):[ ](.*)/i)){const _0x5a958a=_0x7a401(_0x5aa4c3['$1'])[_0xb3c6('0x11f')](),_0x4243cc=_0x1a9233(_0x10333f['$2'])[_0xb3c6('0x11f')]();this[_0xb3c6('0x409')](_0x5a958a,_0x4243cc,_0x43dbbe,_0x33f0a5,_0x3e280a),_0x5153cc+=this['lineHeight']();}}}else return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['StatusWindow'][_0xb3c6('0x36a')];}else{if(_0x342101>-0x3e8){if(_0xb3c6('0x35')!=='xTImu')return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x2c8')];else{function _0x184ddf(){this[_0xb3c6('0x121')]={},this['_newLabelOpacity']=0xff,this[_0xb3c6('0x1b8')]=_0x5bac0c['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x359')]['FadeSpeed'],this['_newLabelOpacityUpperLimit']=_0x1ab603['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x359')][_0xb3c6('0x37b')];}}}else{if(_0x342101>-0x7d0){if(_0xb3c6('0xe2')===_0xb3c6('0xe2'))return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['StatusWindow'][_0xb3c6('0x24e')];else{function _0x6474e9(){this[_0xb3c6('0x343')][_0xb3c6('0xc8')](_0xb3c6('0x33e'),this[_0xb3c6('0x115')]['bind'](this)),this[_0xb3c6('0x343')][_0xb3c6('0xc8')]('pagedown',this[_0xb3c6('0x363')]['bind'](this)),this['_slotWindow'][_0xb3c6('0xc8')](_0xb3c6('0xa4'),this[_0xb3c6('0x2a')]['bind'](this));}}}else return _0x342101<=-0x7d0?VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x46')]:_0xb3c6('0x84');}}}}}},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x1bf')]=function(_0x1c8a30,_0x3f162a,_0x14a775){const _0x5cccb9=this[_0xb3c6('0xa')]();this[_0xb3c6('0x25d')](_0x5cccb9,_0x1c8a30,_0x3f162a,_0x14a775,!![]);const _0x3ae723=this['getItemSuccessRateText']();return this[_0xb3c6('0x25d')](_0x3ae723,_0x1c8a30,_0x3f162a,_0x14a775,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x1c8a30,_0x3f162a,_0x14a775),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0xa')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0xb0')];},Window_ShopStatus['prototype'][_0xb3c6('0x2df')]=function(){const _0x14f2c5=_0xb3c6('0x1f1');if(this[_0xb3c6('0x292')][_0x14f2c5])return this[_0xb3c6('0x292')][_0x14f2c5];if(Imported[_0xb3c6('0x2ad')]){if(_0xb3c6('0x371')!==_0xb3c6('0x7')){const _0x568674=this[_0xb3c6('0x3a9')][_0xb3c6('0x31f')];if(_0x568674[_0xb3c6('0x10b')](/<ALWAYS HIT>/i))return'100%';else{if(_0x568674[_0xb3c6('0x10b')](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0xb3c6('0x191')[_0xb3c6('0x1ab')](Number(RegExp['$1']));}}else{function _0x17ee79(){_0x4a9ed2[_0xb3c6('0x18a')][_0xb3c6('0x37d')][_0xb3c6('0x274')](this);if(this[_0xb3c6('0x36e')])this[_0xb3c6('0x100')]();}}}return _0xb3c6('0x191')[_0xb3c6('0x1ab')](this[_0xb3c6('0x3a9')][_0xb3c6('0x1f0')]);},Window_ShopStatus['prototype'][_0xb3c6('0x25')]=function(_0x2ceeaf,_0x748345,_0x253bd6){const _0x2c1a62=this['getItemRepeatsLabel']();this['drawItemKeyData'](_0x2c1a62,_0x2ceeaf,_0x748345,_0x253bd6,!![]);const _0x50516a=this[_0xb3c6('0x24f')]();return this[_0xb3c6('0x25d')](_0x50516a,_0x2ceeaf,_0x748345,_0x253bd6,![],_0xb3c6('0x345')),this['drawItemDarkRect'](_0x2ceeaf,_0x748345,_0x253bd6),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')]['getItemRepeatsLabel']=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x3dd')];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x24f')]=function(){const _0x44971b='REPEAT';if(this[_0xb3c6('0x292')][_0x44971b])return this[_0xb3c6('0x292')][_0x44971b];const _0x8c6f30=_0xb3c6('0x26b');return _0x8c6f30['format'](this['_item'][_0xb3c6('0x1f2')]);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x34c')]=function(_0x20e037,_0x529c7b,_0x5ce2b0){const _0x38f234=this[_0xb3c6('0x2a6')]();this[_0xb3c6('0x25d')](_0x38f234,_0x20e037,_0x529c7b,_0x5ce2b0,!![]);const _0x2d3b84=this[_0xb3c6('0x2e6')]();return this[_0xb3c6('0x25d')](_0x2d3b84,_0x20e037,_0x529c7b,_0x5ce2b0,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x20e037,_0x529c7b,_0x5ce2b0),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x2a6')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x330')];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x2e6')]=function(){const _0x467a02=_0xb3c6('0x184');if(this[_0xb3c6('0x292')][_0x467a02])return this[_0xb3c6('0x292')][_0x467a02];const _0x5ac3e7=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')],_0x106672=_0xb3c6('0x355')[_0xb3c6('0x1ab')](this['_item']['hitType']);return _0x5ac3e7[_0x106672];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x2ff')]=function(_0x617b17,_0x12cd66,_0x13444e){if(this['_item'][_0xb3c6('0x1be')][_0xb3c6('0x4')]<=0x0)return _0x12cd66;if(this['drawItemDamageElement'](_0x617b17,_0x12cd66,_0x13444e))_0x12cd66+=this['lineHeight']();if(this[_0xb3c6('0x14c')](_0x617b17,_0x12cd66,_0x13444e))_0x12cd66+=this[_0xb3c6('0x3b4')]();return this[_0xb3c6('0x3d4')](),_0x12cd66;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x31e')]=function(_0x35391c,_0x2398ee,_0x48a848){const _0x471b8b=this[_0xb3c6('0x29d')]();this[_0xb3c6('0x25d')](_0x471b8b,_0x35391c,_0x2398ee,_0x48a848,!![]);const _0x2f1b25=this[_0xb3c6('0xf9')]();return this[_0xb3c6('0x25d')](_0x2f1b25,_0x35391c,_0x2398ee,_0x48a848,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x35391c,_0x2398ee,_0x48a848),this['resetFontSettings'](),!![];},Window_ShopStatus[_0xb3c6('0x18a')]['getItemDamageElementLabel']=function(){return VisuMZ['ItemsEquipsCore']['Settings'][_0xb3c6('0x3f2')]['LabelElement'];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0xf9')]=function(){const _0x481d3d='ELEMENT';if(this['_customItemInfo'][_0x481d3d])return this[_0xb3c6('0x292')][_0x481d3d];if(this[_0xb3c6('0x3a9')][_0xb3c6('0x1be')][_0xb3c6('0xfe')]<=-0x1){if(_0xb3c6('0x1b')!==_0xb3c6('0x3e1'))return VisuMZ[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x3f2')][_0xb3c6('0x3e')];else{function _0x185d01(){this['_statusWindow']=_0x5ab077,this[_0xb3c6('0x37d')]();}}}else{if(this[_0xb3c6('0x3a9')][_0xb3c6('0x1be')][_0xb3c6('0xfe')]===0x0)return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x351')];else{if(_0xb3c6('0x2ea')===_0xb3c6('0x44')){function _0x536d08(){return this[_0xb3c6('0x311')]()?this[_0xb3c6('0x41d')]():_0x394089[_0xb3c6('0x2fb')][_0xb3c6('0x314')][_0xb3c6('0x274')](this);}}else return $dataSystem[_0xb3c6('0xc6')][this[_0xb3c6('0x3a9')]['damage'][_0xb3c6('0xfe')]];}}},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x14c')]=function(_0xcd5883,_0x4ed5de,_0x4cd60e){const _0x3c3127=this[_0xb3c6('0x40')]();this['drawItemKeyData'](_0x3c3127,_0xcd5883,_0x4ed5de,_0x4cd60e,!![]),this[_0xb3c6('0x18d')]();const _0x44327f=this[_0xb3c6('0x38c')](),_0x1d0c63=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0xb3c6('0x3a9')][_0xb3c6('0x1be')]['type']]);return this[_0xb3c6('0x5d')](_0x1d0c63),this[_0xb3c6('0x25d')](_0x44327f,_0xcd5883,_0x4ed5de,_0x4cd60e,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0xcd5883,_0x4ed5de,_0x4cd60e),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x40')]=function(){return Imported[_0xb3c6('0x2ad')]&&DataManager['getDamageStyle'](this[_0xb3c6('0x3a9')])!==_0xb3c6('0xe1')?this[_0xb3c6('0x19a')]():this[_0xb3c6('0x163')]();},Window_ShopStatus[_0xb3c6('0x18a')]['getItemDamageAmountLabelOriginal']=function(){const _0xf824d5=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')],_0x41d572='DamageType%1'[_0xb3c6('0x1ab')](this[_0xb3c6('0x3a9')][_0xb3c6('0x1be')][_0xb3c6('0x4')]),_0x5e6cc2=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item']['damage'][_0xb3c6('0x4')]];return _0xf824d5[_0x41d572][_0xb3c6('0x1ab')](_0x5e6cc2);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x18d')]=function(){const _0x5d4a9a=$gameActors[_0xb3c6('0x397')](0x1);this['_tempActorA']=JsonEx[_0xb3c6('0x1c5')](_0x5d4a9a),this[_0xb3c6('0xd2')]=JsonEx[_0xb3c6('0x1c5')](_0x5d4a9a);},Window_ShopStatus['prototype'][_0xb3c6('0x38c')]=function(){const _0x1b46c6=_0xb3c6('0x232');if(this['_customItemInfo'][_0x1b46c6])return this[_0xb3c6('0x292')][_0x1b46c6];return Imported[_0xb3c6('0x2ad')]&&DataManager[_0xb3c6('0x3aa')](this[_0xb3c6('0x3a9')])!=='MANUAL'?this[_0xb3c6('0x2bf')]():this[_0xb3c6('0x2a0')]();},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x2a0')]=function(){window['a']=this[_0xb3c6('0x56')],window['b']=this[_0xb3c6('0xd2')],this[_0xb3c6('0x56')][_0xb3c6('0x420')](!![]),this[_0xb3c6('0xd2')][_0xb3c6('0x420')]([0x3,0x4][_0xb3c6('0xf2')](this[_0xb3c6('0x3a9')][_0xb3c6('0x1be')][_0xb3c6('0x4')]));let _0x550ed7=this[_0xb3c6('0x3a9')]['damage']['formula'];try{if('eIGZQ'==='CwvkI'){function _0x2c1db1(){if(_0x46bdc7['value'](_0x124f91))return!![];}}else{const _0x3821a8=Math[_0xb3c6('0x30d')](eval(_0x550ed7),0x0)/window['a'][_0xb3c6('0x8')];this[_0xb3c6('0x31d')]();if(isNaN(_0x3821a8))return _0xb3c6('0x84');else{if(_0xb3c6('0x319')===_0xb3c6('0x4c')){function _0x463083(){this[_0xb3c6('0x183')]();}}else return'%1%'[_0xb3c6('0x1ab')](Math['round'](_0x3821a8*0x64));}}}catch(_0x2b3257){return $gameTemp[_0xb3c6('0x57')]()&&(console['log']('Damage\x20Formula\x20Error\x20for\x20%1'[_0xb3c6('0x1ab')](this[_0xb3c6('0x3a9')][_0xb3c6('0x2')])),console['log'](_0x2b3257)),this[_0xb3c6('0x31d')](),_0xb3c6('0x84');}},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x31d')]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x2fc')]=function(_0x3968e1,_0x3c3d88,_0x33434b){if(!this[_0xb3c6('0x3fe')]())return _0x3c3d88;if(this['drawItemEffectsHpRecovery'](_0x3968e1,_0x3c3d88,_0x33434b))_0x3c3d88+=this[_0xb3c6('0x3b4')]();if(this[_0xb3c6('0x368')](_0x3968e1,_0x3c3d88,_0x33434b))_0x3c3d88+=this[_0xb3c6('0x3b4')]();if(this[_0xb3c6('0x1fc')](_0x3968e1,_0x3c3d88,_0x33434b))_0x3c3d88+=this[_0xb3c6('0x3b4')]();if(this[_0xb3c6('0x309')](_0x3968e1,_0x3c3d88,_0x33434b))_0x3c3d88+=this[_0xb3c6('0x3b4')]();if(this[_0xb3c6('0x180')](_0x3968e1,_0x3c3d88,_0x33434b))_0x3c3d88+=this[_0xb3c6('0x3b4')]();if(this[_0xb3c6('0xeb')](_0x3968e1,_0x3c3d88,_0x33434b))_0x3c3d88+=this[_0xb3c6('0x3b4')]();if(this[_0xb3c6('0x47')](_0x3968e1,_0x3c3d88,_0x33434b))_0x3c3d88+=this[_0xb3c6('0x3b4')]();if(this[_0xb3c6('0x403')](_0x3968e1,_0x3c3d88,_0x33434b))_0x3c3d88+=this[_0xb3c6('0x3b4')]();if(this[_0xb3c6('0xe7')](_0x3968e1,_0x3c3d88,_0x33434b))_0x3c3d88+=this[_0xb3c6('0x3b4')]();return this['resetFontSettings'](),_0x3c3d88;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x3fe')]=function(){let _0x205e13=![];this[_0xb3c6('0x278')]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x17cd3 of this[_0xb3c6('0x3a9')][_0xb3c6('0x2dc')]){switch(_0x17cd3[_0xb3c6('0xa7')]){case Game_Action[_0xb3c6('0x175')]:this[_0xb3c6('0x278')]['rateHP']+=_0x17cd3[_0xb3c6('0x204')],this[_0xb3c6('0x278')]['flatHP']+=_0x17cd3[_0xb3c6('0x296')],_0x205e13=!![];break;case Game_Action[_0xb3c6('0x246')]:this[_0xb3c6('0x278')][_0xb3c6('0x3e2')]+=_0x17cd3[_0xb3c6('0x204')],this[_0xb3c6('0x278')][_0xb3c6('0x337')]+=_0x17cd3[_0xb3c6('0x296')],_0x205e13=!![];break;case Game_Action[_0xb3c6('0x304')]:this[_0xb3c6('0x278')][_0xb3c6('0x1c9')]+=_0x17cd3['value1'],_0x205e13=!![];break;case Game_Action[_0xb3c6('0x1cd')]:this['_itemData']['addState'][_0xb3c6('0x91')](_0x17cd3[_0xb3c6('0x245')]),_0x205e13=!![];break;case Game_Action[_0xb3c6('0x5c')]:this[_0xb3c6('0x278')][_0xb3c6('0x13b')][_0xb3c6('0x91')](_0x17cd3['dataId']),this[_0xb3c6('0x278')]['removeStateBuffChanges']=!![],_0x205e13=!![];break;case Game_Action[_0xb3c6('0xa5')]:this[_0xb3c6('0x278')][_0xb3c6('0x30b')][_0x17cd3[_0xb3c6('0x245')]]+=0x1,_0x205e13=!![];break;case Game_Action[_0xb3c6('0x107')]:this[_0xb3c6('0x278')][_0xb3c6('0x30b')][_0x17cd3[_0xb3c6('0x245')]]-=0x1,_0x205e13=!![];break;case Game_Action[_0xb3c6('0x2e4')]:this[_0xb3c6('0x278')][_0xb3c6('0x365')][_0xb3c6('0x91')](_0x17cd3[_0xb3c6('0x245')]),this[_0xb3c6('0x278')][_0xb3c6('0x11a')]=!![],_0x205e13=!![];break;case Game_Action[_0xb3c6('0x1e')]:this['_itemData'][_0xb3c6('0x29c')][_0xb3c6('0x91')](_0x17cd3['dataId']),this[_0xb3c6('0x278')][_0xb3c6('0x11a')]=!![],_0x205e13=!![];break;}}if(this['_itemData'][_0xb3c6('0x3a0')][_0xb3c6('0x2b5')]>0x0)this[_0xb3c6('0x278')][_0xb3c6('0x269')]=!![];for(let _0x8d259b=0x0;_0x8d259b<this[_0xb3c6('0x278')][_0xb3c6('0x30b')][_0xb3c6('0x2b5')];_0x8d259b++){if(this[_0xb3c6('0x278')][_0xb3c6('0x30b')][_0x8d259b]!==0x0)this[_0xb3c6('0x278')][_0xb3c6('0x269')]=!![];}this[_0xb3c6('0x3a9')][_0xb3c6('0xa0')]!==0x0&&(this['_itemData'][_0xb3c6('0x32c')]=this[_0xb3c6('0x3a9')][_0xb3c6('0xa0')],_0x205e13=!![]);const _0x474dd9=[_0xb3c6('0x257'),_0xb3c6('0xa3'),_0xb3c6('0x40b'),_0xb3c6('0x1ca'),_0xb3c6('0x239'),_0xb3c6('0x53'),_0xb3c6('0x8d'),_0xb3c6('0xa2'),_0xb3c6('0x9a')];for(const _0x221912 of _0x474dd9){if(this[_0xb3c6('0x292')][_0x221912]){if('KfTRv'===_0xb3c6('0x5f')){_0x205e13=!![];break;}else{function _0x2e4e21(){this[_0xb3c6('0x21d')](_0x4d07ed,_0x53f8d7['x']+_0x2967b0[_0xb3c6('0x1aa')]-_0x487f72,_0x21879b['y'],_0x5182cc);}}}}return _0x205e13;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x298')]=function(_0x267135,_0x43ff2e,_0x566a08){const _0x94103a=_0xb3c6('0x257');if(this[_0xb3c6('0x278')][_0xb3c6('0x24a')]<=0x0&&this[_0xb3c6('0x278')][_0xb3c6('0x5b')]<=0x0&&!this[_0xb3c6('0x292')][_0x94103a])return![];const _0x3bf387=this[_0xb3c6('0x64')]();this[_0xb3c6('0x25d')](_0x3bf387,_0x267135,_0x43ff2e,_0x566a08,!![]);const _0x4f1f57=this[_0xb3c6('0x1a')]();return this['changeTextColor'](ColorManager['damageColor'](0x1)),this[_0xb3c6('0x25d')](_0x4f1f57,_0x267135,_0x43ff2e,_0x566a08,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x267135,_0x43ff2e,_0x566a08),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x64')]=function(){const _0x5d59e6=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x139')];return _0x5d59e6[_0xb3c6('0x1ab')](TextManager['hp']);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x1a')]=function(){const _0x3cb052=_0xb3c6('0x257');if(this[_0xb3c6('0x292')][_0x3cb052])return this[_0xb3c6('0x292')][_0x3cb052];let _0x49c412='';if(this[_0xb3c6('0x278')][_0xb3c6('0x24a')]>0x0)_0x49c412+=_0xb3c6('0x36d')[_0xb3c6('0x1ab')](Math[_0xb3c6('0x3c7')](this[_0xb3c6('0x278')][_0xb3c6('0x24a')]*0x64));if(this['_itemData'][_0xb3c6('0x24a')]>0x0&&this[_0xb3c6('0x278')][_0xb3c6('0x5b')]>0x0)_0x49c412+='\x20';if(this[_0xb3c6('0x278')][_0xb3c6('0x5b')]>0x0)_0x49c412+=_0xb3c6('0x2c0')[_0xb3c6('0x1ab')](this[_0xb3c6('0x278')][_0xb3c6('0x5b')]);return _0x49c412;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x368')]=function(_0x3fccf6,_0x15b9ea,_0xad8f31){const _0x3f7a1c=_0xb3c6('0xa3');if(this[_0xb3c6('0x278')][_0xb3c6('0x3e2')]<=0x0&&this['_itemData'][_0xb3c6('0x337')]<=0x0&&!this[_0xb3c6('0x292')][_0x3f7a1c])return![];const _0x52248d=this['getItemEffectsMpRecoveryLabel']();this[_0xb3c6('0x25d')](_0x52248d,_0x3fccf6,_0x15b9ea,_0xad8f31,!![]);const _0x1df381=this[_0xb3c6('0x3db')]();return this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x123')](0x3)),this[_0xb3c6('0x25d')](_0x1df381,_0x3fccf6,_0x15b9ea,_0xad8f31,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x3fccf6,_0x15b9ea,_0xad8f31),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x3e6')]=function(){const _0x5222f6=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')]['StatusWindow']['LabelRecoverMP'];return _0x5222f6[_0xb3c6('0x1ab')](TextManager['mp']);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x3db')]=function(){const _0x4efa59=_0xb3c6('0xa3');if(this['_customItemInfo'][_0x4efa59])return this[_0xb3c6('0x292')][_0x4efa59];let _0x33e0aa='';if(this[_0xb3c6('0x278')][_0xb3c6('0x3e2')]>0x0)_0x33e0aa+=_0xb3c6('0x36d')[_0xb3c6('0x1ab')](Math[_0xb3c6('0x3c7')](this['_itemData'][_0xb3c6('0x3e2')]*0x64));if(this[_0xb3c6('0x278')][_0xb3c6('0x3e2')]>0x0&&this[_0xb3c6('0x278')][_0xb3c6('0x337')]>0x0)_0x33e0aa+='\x20';if(this[_0xb3c6('0x278')][_0xb3c6('0x337')]>0x0)_0x33e0aa+=_0xb3c6('0x2c0')[_0xb3c6('0x1ab')](this[_0xb3c6('0x278')][_0xb3c6('0x337')]);return _0x33e0aa;},Window_ShopStatus['prototype'][_0xb3c6('0x1fc')]=function(_0x1ee9c8,_0x2c607a,_0x120dd8){const _0x17c582=_0xb3c6('0x40b');if(this[_0xb3c6('0x278')]['gainTP']<=0x0&&!this[_0xb3c6('0x292')][_0x17c582])return![];const _0x1a2367=this['getItemEffectsTpRecoveryLabel']();this['drawItemKeyData'](_0x1a2367,_0x1ee9c8,_0x2c607a,_0x120dd8,!![]);const _0x1adfde=this[_0xb3c6('0x212')]();return this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x37a')]()),this[_0xb3c6('0x25d')](_0x1adfde,_0x1ee9c8,_0x2c607a,_0x120dd8,![],'right'),this[_0xb3c6('0x11d')](_0x1ee9c8,_0x2c607a,_0x120dd8),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus['prototype'][_0xb3c6('0xfc')]=function(){const _0x300051=VisuMZ[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x3f2')][_0xb3c6('0x340')];return _0x300051[_0xb3c6('0x1ab')](TextManager['tp']);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x212')]=function(){const _0x4ab704=_0xb3c6('0x40b');if(this[_0xb3c6('0x292')][_0x4ab704])return this[_0xb3c6('0x292')][_0x4ab704];let _0x23e64f='';return _0x23e64f+='+%1'[_0xb3c6('0x1ab')](this[_0xb3c6('0x278')][_0xb3c6('0x1c9')]),_0x23e64f;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x47')]=function(_0x276aa2,_0x37d9bd,_0x117d82){const _0x432f82=_0xb3c6('0x8d');if(this[_0xb3c6('0x278')][_0xb3c6('0x32c')]===0x0&&!this[_0xb3c6('0x292')][_0x432f82])return![];const _0x55b30a=this[_0xb3c6('0x19e')]();this['drawItemKeyData'](_0x55b30a,_0x276aa2,_0x37d9bd,_0x117d82,!![]);const _0x6e7f15=this[_0xb3c6('0x24c')]();if(this[_0xb3c6('0x278')][_0xb3c6('0x32c')]>0x0){if(_0xb3c6('0x168')===_0xb3c6('0x2b9')){function _0x546c66(){return!![];}}else this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x37a')]());}else{if(_0xb3c6('0x83')!==_0xb3c6('0x83')){function _0x4b1531(){return 0x16;}}else this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x410')]());}return this[_0xb3c6('0x25d')](_0x6e7f15,_0x276aa2,_0x37d9bd,_0x117d82,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x276aa2,_0x37d9bd,_0x117d82),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus['prototype'][_0xb3c6('0x19e')]=function(){const _0x393af9=VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x178')];return _0x393af9['format'](TextManager['tp']);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x24c')]=function(){const _0x5b3ad7=_0xb3c6('0x8d');if(this['_customItemInfo'][_0x5b3ad7])return this[_0xb3c6('0x292')][_0x5b3ad7];let _0x32d242='';if(this['_itemData'][_0xb3c6('0x32c')]>0x0){if(_0xb3c6('0x271')===_0xb3c6('0x1d5')){function _0x11486c(){return this[_0xb3c6('0x2db')]['width']/0x5/-0x3;}}else _0x32d242+=_0xb3c6('0x2c0')['format'](this['_itemData']['selfTP']);}else _0x32d242+='%1'['format'](this[_0xb3c6('0x278')]['selfTP']);return _0x32d242;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x309')]=function(_0x2da4bd,_0x7b5bab,_0x4852ec){const _0x327383=_0xb3c6('0x1ca');if(this[_0xb3c6('0x278')][_0xb3c6('0x24a')]>=0x0&&this[_0xb3c6('0x278')][_0xb3c6('0x5b')]>=0x0&&!this[_0xb3c6('0x292')][_0x327383])return![];const _0x28aef2=this[_0xb3c6('0x156')]();this[_0xb3c6('0x25d')](_0x28aef2,_0x2da4bd,_0x7b5bab,_0x4852ec,!![]);const _0x1697a6=this[_0xb3c6('0x342')]();return this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x123')](0x0)),this['drawItemKeyData'](_0x1697a6,_0x2da4bd,_0x7b5bab,_0x4852ec,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x2da4bd,_0x7b5bab,_0x4852ec),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x156')]=function(){const _0x3f371e=VisuMZ['ItemsEquipsCore'][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x1a9')];return _0x3f371e[_0xb3c6('0x1ab')](TextManager['hp']);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x342')]=function(){const _0x54381d=_0xb3c6('0x1ca');if(this[_0xb3c6('0x292')][_0x54381d])return this[_0xb3c6('0x292')][_0x54381d];let _0x2ff353='';if(this[_0xb3c6('0x278')]['rateHP']<0x0)_0x2ff353+=_0xb3c6('0x191')[_0xb3c6('0x1ab')](Math[_0xb3c6('0x3c7')](this['_itemData'][_0xb3c6('0x24a')]*0x64));if(this['_itemData']['rateHP']<0x0&&this['_itemData'][_0xb3c6('0x5b')]<0x0)_0x2ff353+='\x20';if(this[_0xb3c6('0x278')][_0xb3c6('0x5b')]<0x0)_0x2ff353+='%1'['format'](this[_0xb3c6('0x278')][_0xb3c6('0x5b')]);return _0x2ff353;},Window_ShopStatus['prototype'][_0xb3c6('0x180')]=function(_0x277fb6,_0x1a3944,_0x5dd6fc){const _0x438d64=_0xb3c6('0x239');if(this['_itemData']['rateMP']>=0x0&&this[_0xb3c6('0x278')][_0xb3c6('0x337')]>=0x0&&!this['_customItemInfo'][_0x438d64])return![];const _0x5bb07e=this['getItemEffectsMpDamageLabel']();this['drawItemKeyData'](_0x5bb07e,_0x277fb6,_0x1a3944,_0x5dd6fc,!![]);const _0x42448b=this['getItemEffectsMpDamageText']();return this[_0xb3c6('0x5d')](ColorManager[_0xb3c6('0x123')](0x2)),this[_0xb3c6('0x25d')](_0x42448b,_0x277fb6,_0x1a3944,_0x5dd6fc,![],_0xb3c6('0x345')),this['drawItemDarkRect'](_0x277fb6,_0x1a3944,_0x5dd6fc),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x6a')]=function(){const _0x3b6478=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x147')];return _0x3b6478['format'](TextManager['mp']);},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x80')]=function(){const _0x4e3d35=_0xb3c6('0x239');if(this[_0xb3c6('0x292')][_0x4e3d35])return this[_0xb3c6('0x292')][_0x4e3d35];let _0x3cef16='';if(this[_0xb3c6('0x278')][_0xb3c6('0x3e2')]<0x0)_0x3cef16+=_0xb3c6('0x191')[_0xb3c6('0x1ab')](Math[_0xb3c6('0x3c7')](this[_0xb3c6('0x278')]['rateMP']*0x64));if(this['_itemData'][_0xb3c6('0x3e2')]<0x0&&this[_0xb3c6('0x278')][_0xb3c6('0x337')]<0x0)_0x3cef16+='\x20';if(this[_0xb3c6('0x278')]['flatMP']<0x0)_0x3cef16+='%1'[_0xb3c6('0x1ab')](this[_0xb3c6('0x278')]['flatMP']);return _0x3cef16;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0xeb')]=function(_0x40abd1,_0x1836f8,_0x2dd2f7){const _0x423db5=_0xb3c6('0x53');if(this[_0xb3c6('0x278')]['gainTP']>=0x0&&!this['_customItemInfo'][_0x423db5])return![];const _0x593eaf=this['getItemEffectsTpDamageLabel']();this[_0xb3c6('0x25d')](_0x593eaf,_0x40abd1,_0x1836f8,_0x2dd2f7,!![]);const _0x5bdcf4=this[_0xb3c6('0x1ba')]();return this[_0xb3c6('0x5d')](ColorManager['powerDownColor']()),this[_0xb3c6('0x25d')](_0x5bdcf4,_0x40abd1,_0x1836f8,_0x2dd2f7,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x40abd1,_0x1836f8,_0x2dd2f7),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x104')]=function(){const _0xa78eae=VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x221')];return _0xa78eae[_0xb3c6('0x1ab')](TextManager['tp']);},Window_ShopStatus[_0xb3c6('0x18a')]['getItemEffectsTpDamageText']=function(){const _0x562428=_0xb3c6('0x53');if(this[_0xb3c6('0x292')][_0x562428])return this[_0xb3c6('0x292')][_0x562428];let _0x4a04af='';return _0x4a04af+='%1'[_0xb3c6('0x1ab')](this[_0xb3c6('0x278')][_0xb3c6('0x1c9')]),_0x4a04af;},Window_ShopStatus[_0xb3c6('0x18a')]['drawItemEffectsAddedStatesBuffs']=function(_0xa5d320,_0x23bb69,_0x433db3){const _0x129191='ADDED\x20EFFECTS';if(!this[_0xb3c6('0x278')][_0xb3c6('0x269')]&&!this[_0xb3c6('0x292')][_0x129191])return![];const _0x1eded1=this[_0xb3c6('0x45')]();this[_0xb3c6('0x25d')](_0x1eded1,_0xa5d320,_0x23bb69,_0x433db3,!![]);const _0x2d0ff0=this[_0xb3c6('0x3d5')]();return this[_0xb3c6('0x25d')](_0x2d0ff0,_0xa5d320,_0x23bb69,_0x433db3,![],'right'),this['drawItemDarkRect'](_0xa5d320,_0x23bb69,_0x433db3),this[_0xb3c6('0x3d4')](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x45')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x182')];},Window_ShopStatus['prototype'][_0xb3c6('0x3d5')]=function(){const _0x9ece41=_0xb3c6('0xa2');if(this[_0xb3c6('0x292')][_0x9ece41])return this['_customItemInfo'][_0x9ece41];let _0x28364d='',_0x2fe8fd=0x0;const _0x15b124=0x8;for(const _0x331e4b of this[_0xb3c6('0x278')]['addState']){const _0x2fbfb5=$dataStates[_0x331e4b];if(_0x2fbfb5&&_0x2fbfb5[_0xb3c6('0x2ce')]>0x0){_0x28364d+='\x5cI[%1]'[_0xb3c6('0x1ab')](_0x2fbfb5[_0xb3c6('0x2ce')]),_0x2fe8fd++;if(_0x2fe8fd>=_0x15b124)return _0x28364d;}}for(let _0x49a9c3=0x0;_0x49a9c3<this[_0xb3c6('0x278')]['changeBuff']['length'];_0x49a9c3++){if(_0xb3c6('0x285')===_0xb3c6('0x1de')){function _0x453f5a(){return _0x292ff0[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')]['Speed1'];}}else{const _0x311cb9=this[_0xb3c6('0x278')][_0xb3c6('0x30b')][_0x49a9c3],_0x4c4ea4=Game_BattlerBase['prototype']['buffIconIndex'](_0x311cb9,_0x49a9c3);if(_0x4c4ea4>0x0){_0x28364d+=_0xb3c6('0x124')[_0xb3c6('0x1ab')](_0x4c4ea4),_0x2fe8fd++;if(_0x2fe8fd>=_0x15b124)return _0x28364d;}}}return _0x28364d;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0xe7')]=function(_0x109580,_0xba0345,_0x229561){const _0x4eed3a=_0xb3c6('0x9a');if(!this[_0xb3c6('0x278')][_0xb3c6('0x11a')]&&!this[_0xb3c6('0x292')][_0x4eed3a])return![];const _0x2ff6bf=this[_0xb3c6('0xe4')]();this[_0xb3c6('0x25d')](_0x2ff6bf,_0x109580,_0xba0345,_0x229561,!![]);const _0x11e9a3=this[_0xb3c6('0x430')]();return this[_0xb3c6('0x25d')](_0x11e9a3,_0x109580,_0xba0345,_0x229561,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x109580,_0xba0345,_0x229561),this['resetFontSettings'](),!![];},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0xe4')]=function(){return VisuMZ[_0xb3c6('0x2fb')][_0xb3c6('0x1dc')][_0xb3c6('0x3f2')][_0xb3c6('0x1')];},Window_ShopStatus[_0xb3c6('0x18a')]['getItemEffectsRemovedStatesBuffsText']=function(){const _0x1b7abe=_0xb3c6('0x9a');if(this[_0xb3c6('0x292')][_0x1b7abe])return this[_0xb3c6('0x292')][_0x1b7abe];let _0x3ed911='',_0x248e8d=0x0;const _0x393250=VisuMZ[_0xb3c6('0x2fb')]['Settings'][_0xb3c6('0x3f2')][_0xb3c6('0x99')];for(const _0x42f3ea of this[_0xb3c6('0x278')][_0xb3c6('0x13b')]){if(_0xb3c6('0xf7')!==_0xb3c6('0x392')){const _0x5955ee=$dataStates[_0x42f3ea];if(_0x5955ee&&_0x5955ee[_0xb3c6('0x2ce')]>0x0){if(_0xb3c6('0x3f4')===_0xb3c6('0x136')){function _0x591011(){const _0x467c5c=_0xb3c6('0x257');if(this[_0xb3c6('0x278')][_0xb3c6('0x24a')]<=0x0&&this['_itemData'][_0xb3c6('0x5b')]<=0x0&&!this[_0xb3c6('0x292')][_0x467c5c])return![];const _0x38d5b8=this[_0xb3c6('0x64')]();this[_0xb3c6('0x25d')](_0x38d5b8,_0x65ae42,_0x37daca,_0x3eb7b0,!![]);const _0x42ac03=this[_0xb3c6('0x1a')]();return this[_0xb3c6('0x5d')](_0x187e91[_0xb3c6('0x123')](0x1)),this[_0xb3c6('0x25d')](_0x42ac03,_0x4d3a5f,_0x56417e,_0x5a5989,![],_0xb3c6('0x345')),this['drawItemDarkRect'](_0x539ecf,_0x251011,_0x2164d7),this[_0xb3c6('0x3d4')](),!![];}}else{_0x3ed911+=_0xb3c6('0x124')[_0xb3c6('0x1ab')](_0x5955ee['iconIndex']),_0x248e8d++;if(_0x248e8d>=_0x393250)return _0x3ed911;}}}else{function _0x5c8285(){const _0x237ab9=_0xb3c6('0x232');if(this[_0xb3c6('0x292')][_0x237ab9])return this['_customItemInfo'][_0x237ab9];return _0xf99d59[_0xb3c6('0x2ad')]&&_0x2d8cd2[_0xb3c6('0x3aa')](this['_item'])!==_0xb3c6('0xe1')?this['getItemDamageAmountTextBattleCore']():this[_0xb3c6('0x2a0')]();}}}for(let _0x1f12c3=0x0;_0x1f12c3<this[_0xb3c6('0x278')][_0xb3c6('0x365')][_0xb3c6('0x2b5')];_0x1f12c3++){const _0x105619=Game_BattlerBase[_0xb3c6('0x18a')][_0xb3c6('0x252')](0x1,_0x1f12c3);if(_0x105619>0x0){_0x3ed911+=_0xb3c6('0x124')[_0xb3c6('0x1ab')](_0x105619),_0x248e8d++;if(_0x248e8d>=_0x393250)return _0x3ed911;}}for(let _0x95264b=0x0;_0x95264b<this[_0xb3c6('0x278')][_0xb3c6('0x29c')][_0xb3c6('0x2b5')];_0x95264b++){const _0x9d763b=Game_BattlerBase[_0xb3c6('0x18a')]['buffIconIndex'](-0x1,_0x95264b);if(_0x9d763b>0x0){_0x3ed911+=_0xb3c6('0x124')[_0xb3c6('0x1ab')](_0x9d763b),_0x248e8d++;if(_0x248e8d>=_0x393250)return _0x3ed911;}}return _0x3ed911;},Window_ShopStatus['prototype'][_0xb3c6('0x1f5')]=function(_0x129ffc,_0x1a6a20,_0x454ab8){if(this['_item'][_0xb3c6('0x31f')][_0xb3c6('0x10b')](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){if('Gamyi'!==_0xb3c6('0x288')){function _0x449b9d(){_0x391127=this[_0xb3c6('0x152')][_0xb3c6('0x2a9')](_0x39f862);}}else{const _0x2d7db1=String(RegExp['$1'])[_0xb3c6('0x3ae')](/[\r\n]+/);for(const _0x3bf0f3 of _0x2d7db1){if(_0x3bf0f3['match'](/(.*):[ ](.*)/i)){const _0x217f83=String(RegExp['$1'])['trim'](),_0x3d4cb0=String(RegExp['$2'])[_0xb3c6('0x11f')]();this[_0xb3c6('0x409')](_0x217f83,_0x3d4cb0,_0x129ffc,_0x1a6a20,_0x454ab8),_0x1a6a20+=this[_0xb3c6('0x3b4')]();}}}}return this[_0xb3c6('0x3d4')](),_0x1a6a20;},Window_ShopStatus[_0xb3c6('0x18a')][_0xb3c6('0x409')]=function(_0x281ef2,_0x1d7cdf,_0x247a24,_0x1a04fb,_0x369dd0){this[_0xb3c6('0x25d')](_0x281ef2,_0x247a24,_0x1a04fb,_0x369dd0,!![]),this[_0xb3c6('0x25d')](_0x1d7cdf,_0x247a24,_0x1a04fb,_0x369dd0,![],_0xb3c6('0x345')),this[_0xb3c6('0x11d')](_0x247a24,_0x1a04fb,_0x369dd0),this[_0xb3c6('0x3d4')]();};