//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.00] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * - Bug fixes for the problems existing in the RPG Maker MZ base code.
 * - Failsafes added for Script Call related event commands.
 * - Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * - Control over the various Text Colors used throughout the game.
 * - Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * - Preload images as the game boots up.
 * - Add specific background images for menus found throughout the game.
 * - A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * - Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * - Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * - Reposition actors and enemies if the battle resolution is larger.
 * - Allow class names and nicknames to support text codes when displayed.
 * - Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * - Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * - If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 *
 * Move Picture, Origin Differences
 *
 * - If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
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
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
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
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
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
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Time Progress Battle
 * - Switch between Default or Time Progress battle system.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Outline Color:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *   
 *   Title Picture Buttons:
 *   - Buttons that can be inserted into the title screen.
 *   - Add new title buttons here.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
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
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetTimeProgress
 * @text System: Time Progress Battle
 * @desc Switch between Default or Time Progress battle system.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Default Turn Battle
 * @value Default Turn Battle
 * @option Time Progress Battle
 * @value Time Progress Battle
 * @option Toggle
 * @value Toggle
 * @desc Choose which battle system to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"true","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"2","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"newGame\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.newGame;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandNewGame();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"continue\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.continue_;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return DataManager.isAnySavefileExists();\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandContinue();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"options\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.options;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandOptions();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"TitlePicButtons:arraystruct\":\"[]\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindoheighteight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = ImageManager.faceHeight + padding * 2;\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - (height + inputWindoheighteight + 8)) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height + 8;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game is started.
 * @default 0
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 0
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Outline Color
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"newGame\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.newGame;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandNewGame();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"continue\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.continue_;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return DataManager.isAnySavefileExists();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandContinue();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"options\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.options;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandOptions();\\\\\\\"\\\"}\"]","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","TitlePicButtons:arraystruct":"[]","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2;\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}"]
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitlePicButtons:arraystruct
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it off may have unwanted effects.
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
//=============================================================================

const _0x18fd=['_isWindow','calcCoreEasing','renderNoMask','duration','attackSkillId','isClosed','Sprite_Button_initialize','folTh','processEscape','applyEasing','parameters','SkillMenu','changeClass','image-rendering','_encounterCount','Window_Base_initialize','Spriteset_Base_initialize','<%1\x20%2:[\x20]','normal','_fauxAnimationQueue','ARRAYSTRUCT','GRD','SPACE','processAlwaysEscape','JbLRC','Scene_MenuBase_createPageButtons','StatusBgType','setupCoreEasing','down2','_backSprite1','sparamPlusJS','isRepeated','_sideButtonLayout','GoldFontSize','refreshDimmerBitmap','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','HYPHEN_MINUS','OUTQUINT','OUTEXPO','CLOSE_BRACKET','MCR','LINEAR','toUpperCase','paramMaxJS','LESS_THAN','params','IconParam6','makeCommandList','_actor','stretch','TRAIT_PARAM','ARRAYSTR','NUM_LOCK','Window_Base_createTextState','cursorDown','qeajc','NUMPAD8','Sprite_Picture_updateOrigin','fkVDr','ColorHPGauge2','IconSParam8','ButtonFadeSpeed','djLAu','EQUALS','PRINT','Max','GBUaL','nsMVb','Actor','sparamPlus1','BgType','Sprite_Battler_startMove','srnqL','Game_System_initialize','xparamRateJS','get','PDR','isPlaytest','EREOF','SLASH','FontShadows','img/%1/','push','zEPWC','NUMPAD1','mainAreaHeightSideButtonLayout','guardSkillId','exit','Scene_Menu_create','ItemPadding','buttonAssistOffset5','isCursorMovable','createCustomBackgroundImages','isAnimationForEach','faces','RequireFocus','buttonAssistOffset4','process_VisuMZ_CoreEngine_Notetags','Game_Interpreter_command111','_stored_mpGaugeColor2','skillTypeWindowRect','BACK_QUOTE','isUseModernControls','mainCommandWidth','disable','children','ONE_MINUS_SRC_ALPHA','IconSParam1','reserveCommonEvent','dimColor1','Game_Interpreter_command232','Window_StatusBase_drawActorLevel','WIN_OEM_FINISH','ARRAYFUNC','StatusMenu','OUTCUBIC','REPLACE','exec','Scene_MenuBase_helpAreaTop','Scene_MenuBase_mainAreaHeight','xparamFlatJS','param','aACwc','IconXParam4','setupButtonImage','TextStr','_centerElementCoreEngine','ItemBackColor1','_targetOffsetX','IoKSl','LvExpGauge','clearCachedKeys','OPEN_CURLY_BRACKET','TimeProgress','Window_Base_drawText','ARRAYJSON','_slotWindow','XParameterFormula','textWidth','ItemMenu','drawActorNickname','_stored_expGaugeColor1','setAnchor','ImprovedAccuracySystem','ListRect','Graphics_printError','Game_BattlerBase_refresh','Window','characters','wmFBR','EncounterRateMinimum','CommandBgType','Renderer','Scene_Equip_create','_centerElement','showDevTools','DimColor2','CANCEL','OpenURL','drawParamText','isKeyItem','(\x5cd+\x5c.?\x5cd+)>','Game_Interpreter_command355','eoFAl','ENTER_SPECIAL','max','ALTGR','_hovered','_coreEasingType','keyCode','skills','destroy','applyCoreEasing','top','toFixed','anchorCoreEasing','Plus2','currentValue','onMoveEnd','PRxJl','changeTextColor','GhCGy','makeDeepCopy','isGameActive','pictures','toLocaleString','HelpBgType','itemHeight','trim','setActorHomeRepositioned','xparamPlus1','FBUAg','hpColor','_commandList','sparamPlus','Game_Picture_updateMove','dwhku','Scene_MenuBase_mainAreaTop','processMoveCommand','endAnimation','ActorRect','ColorNormal','_skillTypeWindow','onDatabaseLoaded','scaleSprite','gameTitle','mainAreaHeight','targetScaleY','SParamVocab2','none','TextManager_param','ACCEPT','atxGy','_moveEasingType','version','MAX_GL_TEXTURES','ColorMPCost','_helpWindow','OUTCIRC','DZBUI','WIN_OEM_AUTO','process_VisuMZ_CoreEngine_Enemy_Notetags','MODECHANGE','format','pSibc','ARRAYEVAL','_stored_systemColor','SParamVocab6','resetFontSettings','Window_ShopSell_isEnabled','processTouch','KeyUnlisted','end','PixelateImageRendering','isDying','WIN_OEM_CUSEL','buttonAssistOffset3','playTestF7','animationBaseDelay','level','tilesets','skillTypes','test','QUOTE','_blank','removeAllFauxAnimations','STENCIL_BUFFER_BIT','tpGaugeColor2','NHvTJ','GetParamIcon','RjLEH','isMapScrollLinked','HDGPM','MenuLayout','kRcKC','windowPadding','CoreEngine','initialize','buttonAssistText1','INOUTBACK','ColorMaxLvGauge1','height','SHIFT','CIRCUMFLEX','MAX_SAFE_INTEGER','LevelUpFullMp','playOk','isNormalPriority','BgFilename2','skipBranch','_buttonAssistWindow','_opening','start','key%1','setup','Sprite_AnimationMV_processTimingData','yScrollLinkedOffset','_offsetX','create','BaseTexture','ItemBackColor2','boxHeight','createMenuButton','levelUpRecovery','WIN_OEM_FJ_MASSHOU','playEscape','NONCONVERT','animations','Scene_Boot_updateDocumentTitle','puVbH','tosmB','fXHMH','DigitGroupingDamageSprites','exp','_cache','description','currencyUnit','FCXzW','isPressed','neRCB','GameEnd','RuMbg','EXSEL','actor','addChild','BACK_SLASH','setSideButtonLayout','eXODy','Sprite_Button_updateOpacity','stringKeyMap','_drawTextOutline','mAiTA','KjbCA','DOWN','DrawIcons','TextFmt','CBvzh','BlSHN','createFauxAnimationSprite','isCollidedWithEvents','PziIQ','enemies','StatusParamsBgType','areButtonsOutsideMainUI','ColorSystem','F19','isReleased','CancelText','_playtestF7Looping','paramPlus','updateAnchor','contents','mmJHr','parse','eva','buttonAssistWindowButtonRect','oxIzo','_stored_expGaugeColor2','QoL','Scene_Shop_create','Game_Character_processMoveCommand','DigitGroupingExText','Plus1','Game_Interpreter_command231','drawValue','note','process_VisuMZ_CoreEngine_Settings','drawTextEx','TitlePicButtons','setHome','Flat1','IconSParam5','targetEvaRate','addLoadListener','buttonAssistKey2','rgIWV','FEIfU','targetBackOpacity','_addShadow','paramValueByName','_statusParamsWindow','ListBgType','maxLvGaugeColor2','DummyBgType','WIN_OEM_FJ_ROYA','_targetOffsetY','process_VisuMZ_CoreEngine_RegExp','NEAREST','mLFTu','isBottomHelpMode','save','HelpRect','Bitmap_drawTextOutline','goldWindowRect','removeChild','_stored_tpGaugeColor2','COLON','SParamVocab8','AkBZV','paramFlatJS','equips','checkCacheKey','setTargetAnchor','uiAreaHeight','OXnAg','_data','getColor','_listWindow','abs','boxWidth','getColorDataFromPluginParameters','iWFev','_inputWindow','BasicParameterFormula','_movementDuration','xDKXS','ApvrE','openness','initDigitGrouping','areButtonsHidden','SwitchActorText','WFOlN','EXECUTE','ksAfc','Ctlop','dMrcP','fadeSpeed','buttonAssistKey5','%1%2','flush','paramRate1','home','moveRelativeToResolutionChange','tQyYb','string','_stored_tpGaugeColor1','Scene_Status_create','gaugeRate','_screenY','sparamPlus2','lDTLs','_stored_maxLvGaugeColor1','TGR','Wszzf','UYNjd','eIQTO','onPress','PA1','CallHandlerJS','CLOSE_PAREN','Fcxmx','createCommandWindow','JZnVb','background','drawGauge','isExpGaugeDrawn','valueOutlineWidth','performEscape','ShowJS','helpAreaTop','xQWIm','skillId','ConvertNumberToString','cursorPagedown','enableDigitGrouping','setupCoreEngine','EVAL','resetTextColor','WIN_OEM_PA3','includes','ColorMPGauge2','text','_storedStack','drawGameSubtitle','volume','Version','xScrollLinkedOffset','pagedown','loadTitle1','setSideView','INCIRC','playTestF6','(\x5cd+)>','updatePlayTestF7','FINAL','VBmeJ','INQUAD','F7key','backOpacity','uVlyu','INOUTCIRC','Scene_Name_create','MAXHP','INSERT','isSideButtonLayout','CommandRect','gqmOm','bitmapHeight','getLevel','makeEncounterCount','openingSpeed','hideButtonFromView','wbIrO','isSideView','eopmB','paramchangeTextColor','PLAY','font-smooth','BattleManager_processEscape','qelXw','Subtitle','mhp','makeFontBigger','_stored_maxLvGaugeColor2','Control\x20Variables\x20Script\x20Error','IAYjq','SParamVocab0','_pageupButton','_targetAnchor','cursorPageup','drawParamName','buttonAssistText%1','onKeyDownKeysF6F7','option','HIT','drawGoldItemStyle','Color','drawNewParam','Param','blKvh','PvTgl','displayX','XParamVocab4','Game_Actor_levelUp','terminate','AutoStretch','ShopMenu','buttonAssistText5','SCALE_MODES','CrisisRate','Game_Map_setup','encounterStepsMinimum','gSiAq','ColSpacing','INOUTQUART','ColorMaxLvGauge2','Scene_Boot_loadSystemImages','status','AoAAO','drawBackgroundRect','transform','_buttonType','mainAreaTop','_effectsContainer','HANJA','loadSystemImages','TILDE','optionsWindowRect','InputRect','mainAreaTopSideButtonLayout','_stored_pendingColor','PHA','tab','KgZYt','down','CLEAR','ModernControls','SnapshotOpacity','members','targetY','isNextScene','isInputting','blendFunc','WIN_ICO_CLEAR','PERCENT','refresh','IconParam4','Game_Interpreter_command122','pUmns','playCursorSound','updateCoreEasing','IconParam5','expRate','OPEN_BRACKET','_repositioned','HRG','Script\x20Call\x20Error','createFauxAnimation','setMainFontSize','FontSize','isWindowMaskingEnabled','OUTBOUNCE','MAXMP','END','resize','scale','_duration','NUMPAD5','MnCcb','repositionCancelButtonSideButtonLayout','ActorHPColor','Enable','aXfIx','drawActorClass','fGLIe','EwPkr','Game_Picture_calcEasing','ParamMax','CNT','clearZoom','gaugeLineHeight','NUMPAD2','IconXParam9','buttonAssistText3','Sprite_Gauge_gaugeRate','battlebacks1','MDR','createBackground','NUMPAD3','Untitled','useDigitGroupingEx','canUse','startAnimation','BackOpacity','mev','maxBattleMembers','gold','centerSprite','startMove','buttonAssistOffset2','XVfUI','Layer','Symbol','XParamVocab1','ADD','REC','pixelated','apply','Settings','pageup','center','setGuard','inbounce','targetScaleX','ezjIA','xJYWr','glipB','buttonAssistWindowSideRect','outlineColor','CTRL','Scene_MenuBase_createBackground','log','XParamVocab7','tpGaugeColor1','Scene_MenuBase_createCancelButton','index','itemWindowRect','xparamPlus2','processCursorMoveModernControls','MIeqE','xsxJR','zUeVe','PGUP','_dummyWindow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','DigitGroupingStandardText','KEEP','Game_Temp_initialize','SlotBgType','_goldWindow','SystemSetTimeProgress','KeyItemProtect','sv_enemies','isOptionValid','NUMPAD0','buttonAssistOffset%1','Window_Base_update','addCommand','processSoundTimings','_statusEquipWindow','Graphics_defaultStretchMode','charAt','retrieveFauxAnimation','statusWindowRect','stencilOp','CategoryBgType','ASTERISK','PGDN','ZHYBI','RightMenus','AntiZoomPictures','updateMain','Game_Event_isCollidedWithEvents','pictureButtons','Scene_Map_createMenuButton','setClickHandler','forceStencil','setupValueFont','ZKFcF','_stored_ctGaugeColor2','DZMKK','_digitGrouping','numberWindowRect','isBusy','value','AMPERSAND','_internalTextures','Game_Picture_x','SParamVocab9','filter','gJxdg','enable','PfdIu','titleCommandWindow','MRG','FDR','determineSideButtonLayoutValid','F6key','cYHKB','createEnemies','processCursorHomeEndTrigger','ZNfJd','systemColor','constructor','iconWidth','expGaugeColor1','INEXPO','currentClass','seZGp','_anchor','subjectHitRate','GroupDigits','checkSmartEventCollision','Total','paramBaseAboveLevel99','getInputButtonString','targetSpritePosition','lCsNL','tileWidth','_offsetY','QxLXp','INOUTCUBIC','cursorRight','createTitleButtons','setWindowPadding','F11','WIN_ICO_HELP','createPageButtons','SceneManager_onKeyDown','WIN_OEM_PA2','gKRtm','NewGameCommonEvent','pllTM','deathColor','PictureEasingType','mainFontSize','Linear','onButtonImageLoad','IadYK','LoadMenu','isRightInputMode','setHandler','oQGBq','FpfOu','DrawItemBackgroundJS','0.00','drawAllParams','subject','updateFauxAnimations','TRG','contentsOpacity','BuyRect','_clickHandler','adjustSprite','printError','sbelV','LUK','processCursorMove','isPhysical','_menuButton','F15','SParamVocab5','initMembers','Gvfst','wholeDuration','stypeId','xparamRate2','bitmapWidth','SParameterFormula','isHandled','setActorHome','kQhgM','replace','ColorPowerUp','maxItems','mpGaugeColor1','fgnaZ','startNormalGame','OutlineColor','XParamVocab8','MqXzE','TCR','paramFlatBonus','iHpAf','isItemStyle','Game_Action_itemHit','sparamRateJS','statusParamsWindowRect','Conditional\x20Branch\x20Script\x20Error','Rate2','Game_Action_itemEva','xparamFlat1','_movementWholeDuration','IconXParam3','registerCommand','OUTQUART','setFrame','kBzaM','CWOKf','outbounce','Spriteset_Battle_createEnemies','dimColor2','terms','setEasingType','setCoreEngineUpdateWindowBg','Game_Actor_paramBase','clone','FUNC','itypeId','hit','Game_Actor_changeClass','lAEqZ','clearStencil','makeCoreEngineCommandList','getButtonAssistLocation','bitmap','hpGaugeColor1','Graphics_centerElement','hide','_destroyInternalTextures','framebuffer','Bitmap_drawText','command355','btDpm','eokqs','wuGYC','zwVqV','gainGold','SQfKH','EZpzN','_pressed','_muteSound','forceOutOfPlaytest','CRSEL','remove','createFauxAnimationQueue','uLkaC','CommandList','button','fillRect','_pictureContainer','animationShouldMirror','layoutSettings','Tilemap_addShadow','_screenX','INQUINT','return\x200','name','warVD','setAttack','xparamRate','isMVAnimation','ConvertParams','Jjlgn','Game_BattlerBase_initMembers','Scene_Skill_create','Game_Party_consumeItem','SaveMenu','RepositionEnemies','xEciv','eventsXyNt','IzFms','sellWindowRect','Flat','GoldRect','MRF','itemBackColor1','buttonAssistSwitch','fontSize','system','_editWindow','_optionsWindow','dyXCN','AccuracyBoost','xparamFlatBonus','innerWidth','sIXBU','Scene_Map_updateMainMultiply','DIVIDE','ColorExpGauge1','ivJYl','createButtonAssistWindow','animationNextDelay','MenuBg','nickname','updateClose','OpenSpeed','BjpLy','getCustomBackgroundSettings','WIN_OEM_RESET','SellBgType','drawActorLevel','_fauxAnimationSprites','DELETE','MDF','_cancelButton','TextJS','smoothSelect','command232','worldTransform','cos','successRate','profileWindowRect','_spriteset','DummyRect','bgsVolume','_actorWindow','moveCancelButtonSideButtonLayout','_commandWindow','_scene','ColorCrisis','DisplayedParams','advanced','enableDigitGroupingEx','WIN_ICO_00','damageColor','BottomButtons','MPKqg','maxLvGaugeColor1','isMagical','URL','IconXParam6','retreat','STENCIL_TEST','ALT','F21','_categoryWindow','SLEEP','reservePlayTestNewGameCommonEvent','WrNMX','IconXParam1','isEnemy','MultiKeyFmt','XParamVocab3','ONE','_hideButtons','dSHLk','drawIcon','NIbko','MAT','SideButtons','rFUqQ','GMhxb','length','bind','setEnemyAction','DTrYJ','title','drawCurrencyValue','drawGameTitle','EditBgType','WIN_OEM_FJ_LOYA','hpGaugeColor2','buttonAssistText2','ENTER','IconSet','IconXParam5','#%1','encounterStep','wNzmN','DEF','editWindowRect','_createInternalTextures','SystemSetFontSize','QUESTION_MARK','SEMICOLON','sv_actors','IconXParam0','PTSRz','ItemRect','updateBackOpacity','processTimingData','rightArrowWidth','_stored_hpGaugeColor2','IconSParam2','_CoreEngineSettings','CONTEXT_MENU','OS_KEY','Sprite_Animation_processSoundTimings','GvawN','useDigitGrouping','ColorDeath','BottomHelp','BgFilename1','goto','itemEva','ColorGaugeBack','buttonAssistKey1','command111','onKeyDown','learnings','displayY','KANA','VOLUME_MUTE','sin','NUMPAD7','AhRvA','INSINE','textColor','text%1','buttonAssistOk','OUTSINE','IconSParam7','ColorTPGauge1','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','paramWidth','Padding','getBackgroundOpacity','_colorCache','RegExp','pow','F14','meVolume','wjsWj','sparamRate2','translucentOpacity','focus','bgmVolume','StatusEquipBgType','STRUCT','ParamArrow','paramMax','JuwIx','InputBgType','ApplyEasing','platform','drawText','CONVERT','CRI','clear','_numberWindow','_profileWindow','ShowDevTools','yMXDo','F10','EnableJS','GoldMax','popScene','IconParam2','Title','Rate','helpAreaTopSideButtonLayout','itemHitImprovedAccuracy','isSmartEventCollisionOn','AGI','Ddybe','JSON','buttonAssistOffset1','NewGameBoot','isItem','updateOrigin','initVisuMZCoreEngine','targets','FadeSpeed','GHJWd','GoldChange','randomInt','drawIconBySize','BuyBgType','makeFontSmaller','XParamVocab5','Scene_Boot_onDatabaseLoaded','([\x5c+\x5c-]\x5cd+)>','optTimeProgress','SParamVocab1','blt','helpAreaHeight','maxLevel','IconParam0','categoryWindowRect','win32','updateMainMultiply','_defaultStretchMode','F20','FLhAE','BsPiZ','processFauxAnimationRequests','width','isOpen','SParamVocab3','SideView','sparamFlat2','makeInputButtonString','iconHeight','process_VisuMZ_CoreEngine_Class_Notetags','WIN_OEM_COPY','command231','CAPSLOCK','onMouseEnter','updateOpen','_stored_mpGaugeColor1','GoldOverlap','ColorManager_loadWindowskin','isBeingTouched','drawSegment','imageSmoothingEnabled','_backSprite2','hDgNp','MEV','_mp','targetObjects','inBattle','targetOpacity','EVA','vEbSG','helpAreaBottom','updatePictureAntiZoom','xAeMo','isMaxLevel','min','_changingClass','xparamPlus','RBygy','SkillTypeRect','mpCostColor','_context','LineHeight','eamKH','calcEasing','COMMA','openURL','ItemBgType','ALWAYS','EISU','NumberRect','StatusEquipRect','pendingColor','stencilFunc','sparamRate','ColorTPCost','ButtonAssist','tpCostColor','_isPlaytest','_statusWindow','WIN_OEM_BACKTAB','CommandWidth','itemPadding','Qognz','SellRect','CLOSE_CURLY_BRACKET','expGaugeColor2','keyMapper','reduce','JuaZA','currentLevelExp','loadBitmap','IkPgf','_animation','SceneManager_isGameActive','OpenConsole','xparamPlusJS','XParamVocab6','updateMove','targetX','buttonAssistKey3','setBackgroundType','sqrt','jyTuW','ExtJS','FontSmoothing','Sprite_Gauge_currentValue','_hideTileShadows','traitObjects','OnLoadJS','initButtonHidden','levelUp','XParamVocab0','paramName','Sprite_Actor_setActorHome','setSize','moveMenuButtonSideButtonLayout','_digitGroupingEx','PERIOD','_dimmerSprite','pagedownShowButton','buttonAssistCancel','updateOpacity','xparamRate1','Window_Gold_refresh','createCancelButton','setBackgroundOpacity','Graphics','render','isHovered','NUMPAD6','ShowButtons','lineHeight','LdWnC','sLaFO','ColorHPGauge1','StatusRect','IconParam1','_coreEasing','buttonY','paramFlat','paramRateJS','removeFauxAnimation','NameMenu','fzfJF','number','ColorCTGauge2','createWindowLayer','GREATER_THAN','INBACK','seVolume','pictureId','gaugeBackColor','buttonAreaHeight','SParamVocab7','noaeS','INOUTELASTIC','VOLUME_UP','WIN_OEM_WSCTRL','picture','PKbRo','Scene_Title_drawGameTitle','getInputMultiButtonStrings','PYAPE','PositionJS','usableSkills','mainAreaBottom','round','StatusParamsRect','touchUI','escape','paramPlusJS','paramX','DamageColor','EQUAL','sparamRate1','Rate1','animationId','setSkill','makeDocumentTitle','call','ActorBgType','enemy','adjustBoxSize','setTimeProgress','isMaskingEnabled','F18','isBottomButtonMode','_closing','Game_Picture_initBasic','hGFgG','dnGTZ','isMenuButtonAssistEnabled','nw.gui','OptionsBgType','open','Location','sparam','Scene_Boot_startNormalGame','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','anchor','_buyWindow','Spriteset_Base_destroy','padding','_mapNameWindow','EXCLAMATION','targetContentsOpacity','isFullDocumentTitle','Game_Picture_y','setupNewGame','Plus','initialLevel','isEnabled','INOUTSINE','style','xparam','opacity','Lysyj','subtitle','Scene_Options_create','repositionEnemiesByResolution','GoldBgType','clamp','helpWindowRect','processTouchModernControls','onClick','normalColor','match','EnableMasking','WIN_OEM_JUMP','HELP','movePageButtonSideButtonLayout','SceneManager_initialize','_pagedownButton','buttonAssistWindowRect','_hp','maxCols','RIGHT','gradientFillRect','ItemStyle','OptionsMenu','Enemy','CEV','NEDhs','WIN_OEM_ATTN','NuMSy','UHXkg','prototype','BACKSPACE','optSideView','IconSParam4','command122','drawItem','Basic','TdcLK','OUTBACK','xiZbR','SlotRect','NUM','INCUBIC','kGaHm','Wposs','BoxMargin','type','SCROLL_LOCK','isTriggered','_stored_powerUpColor','NoTileShadows','GoldIcon','mute','blockWidth','setMute','titles1','LEFT','PIPE','IconParam3','_stored_crisisColor','statusEquipWindowRect','xmLdW','loadSystem','lsvDI','ActorMPColor','EXR','isActor','isTimeProgress','YwpkC','scaleMode','Window_Selectable_processTouch','LevelUpFullHp','consumeItem','map','F24','up2','qrJPb','WIN_OEM_ENLW','OkText','initCoreEasing','_stored_normalColor','loadWindowskin','ForceNoPlayTest','cancel','TAB','drawActorExpGauge','loadGameImagesCoreEngine','WindowLayer_render','process_VisuMZ_CoreEngine_Actor_Notetags','left','_isButtonHidden','Window_Selectable_processCursorMove','initBasic','ColorPowerDown','ProfileRect','CleKy','ATK','cursorUp','DECIMAL','INOUTBOUNCE','update','isAlive','CategoryRect','Spriteset_Base_update','_stored_mpCostColor','WIN_OEM_CLEAR','Window_Selectable_cursorDown','Flat2','buttonAssistKey%1','dummyWindowRect','commandWindowRect','UIfFP','itemHit','_windowLayer','asin','initCoreEngine','addWindow','smallParamFontSize','drawGameVersion','titles2','SystemSetWindowPadding','_stored_deathColor','ParamChange','HbhNw','crisisColor','ItemHeight','INQUART','JStrf','batch','listWindowRect','isClickEnabled','updateDocumentTitle','Window_Selectable_drawBackgroundRect','ezIet','ViEPj','DOUBLE_QUOTE','uaqHD','areTileShadowsHidden','actorWindowRect','paramBase','SystemSetSideView','shift','_stored_gaugeBackColor','visible','DOLLAR','_playTestFastMode','EquipMenu','F13','isPlaying','_itemWindow','_stored_hpGaugeColor1','right','INOUTQUAD','_sellWindow','toString','xUITi','updateKeyText','INBOUNCE','INOUTQUINT','startAutoNewGame','MHyPb','xdg-open','TextCodeNicknames','bcHvK','SkillTypeBgType','showFauxAnimations','HYVFQ','tileHeight','Gold','isNwjs','fMbri','drawRightArrow','floor','setMoveEasingType','EditRect','createChildSprite','DataManager_setupNewGame','paramY','makeTargetSprites'];(function(_0x58b82f,_0x18fd5d){const _0x36b771=function(_0x101209){while(--_0x101209){_0x58b82f['push'](_0x58b82f['shift']());}};_0x36b771(++_0x18fd5d);}(_0x18fd,0x1d9));const _0x36b7=function(_0x58b82f,_0x18fd5d){_0x58b82f=_0x58b82f-0x0;let _0x36b771=_0x18fd[_0x58b82f];return _0x36b771;};var label=_0x36b7('0x4d1'),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3fb704){return _0x3fb704[_0x36b7('0x36')]&&_0x3fb704['description'][_0x36b7('0x592')]('['+label+']');})[0x0];VisuMZ[label][_0x36b7('0x91')]=VisuMZ[label][_0x36b7('0x91')]||{},VisuMZ[_0x36b7('0x17b')]=function(_0x2a7a56,_0x22e09d){for(const _0x1e39cb in _0x22e09d){if(_0x1e39cb[_0x36b7('0x328')](/(.*):(.*)/i)){if(_0x36b7('0x34a')===_0x36b7('0x34a')){const _0x16f9e2=String(RegExp['$1']),_0x3264cf=String(RegExp['$2'])[_0x36b7('0x3fb')]()[_0x36b7('0x48d')]();let _0x55e17c,_0x22ab70,_0x35064a;switch(_0x3264cf){case _0x36b7('0x347'):_0x55e17c=_0x22e09d[_0x1e39cb]!==''?Number(_0x22e09d[_0x1e39cb]):0x0;break;case'ARRAYNUM':_0x22ab70=_0x22e09d[_0x1e39cb]!==''?JSON['parse'](_0x22e09d[_0x1e39cb]):[],_0x55e17c=_0x22ab70['map'](_0x5b9907=>Number(_0x5b9907));break;case _0x36b7('0x58f'):_0x55e17c=_0x22e09d[_0x1e39cb]!==''?eval(_0x22e09d[_0x1e39cb]):null;break;case _0x36b7('0x4b2'):_0x22ab70=_0x22e09d[_0x1e39cb]!==''?JSON[_0x36b7('0x51e')](_0x22e09d[_0x1e39cb]):[],_0x55e17c=_0x22ab70[_0x36b7('0x367')](_0x139667=>eval(_0x139667));break;case _0x36b7('0x23d'):_0x55e17c=_0x22e09d[_0x1e39cb]!==''?JSON[_0x36b7('0x51e')](_0x22e09d[_0x1e39cb]):'';break;case _0x36b7('0x458'):_0x22ab70=_0x22e09d[_0x1e39cb]!==''?JSON[_0x36b7('0x51e')](_0x22e09d[_0x1e39cb]):[],_0x55e17c=_0x22ab70[_0x36b7('0x367')](_0x56a211=>JSON[_0x36b7('0x51e')](_0x56a211));break;case _0x36b7('0x14e'):_0x55e17c=_0x22e09d[_0x1e39cb]!==''?new Function(JSON[_0x36b7('0x51e')](_0x22e09d[_0x1e39cb])):new Function(_0x36b7('0x175'));break;case _0x36b7('0x442'):_0x22ab70=_0x22e09d[_0x1e39cb]!==''?JSON[_0x36b7('0x51e')](_0x22e09d[_0x1e39cb]):[],_0x55e17c=_0x22ab70[_0x36b7('0x367')](_0x1f33aa=>new Function(JSON[_0x36b7('0x51e')](_0x1f33aa)));break;case'STR':_0x55e17c=_0x22e09d[_0x1e39cb]!==''?String(_0x22e09d[_0x1e39cb]):'';break;case _0x36b7('0x404'):_0x22ab70=_0x22e09d[_0x1e39cb]!==''?JSON[_0x36b7('0x51e')](_0x22e09d[_0x1e39cb]):[],_0x55e17c=_0x22ab70[_0x36b7('0x367')](_0x52d2ad=>String(_0x52d2ad));break;case _0x36b7('0x222'):_0x35064a=_0x22e09d[_0x1e39cb]!==''?JSON['parse'](_0x22e09d[_0x1e39cb]):{},_0x2a7a56[_0x16f9e2]={},VisuMZ[_0x36b7('0x17b')](_0x2a7a56[_0x16f9e2],_0x35064a);continue;case _0x36b7('0x3e5'):_0x22ab70=_0x22e09d[_0x1e39cb]!==''?JSON[_0x36b7('0x51e')](_0x22e09d[_0x1e39cb]):[],_0x55e17c=_0x22ab70[_0x36b7('0x367')](_0x2c83a2=>VisuMZ[_0x36b7('0x17b')]({},JSON[_0x36b7('0x51e')](_0x2c83a2)));break;default:continue;}_0x2a7a56[_0x16f9e2]=_0x55e17c;}else{function _0x18799d(){this['makeDocumentTitle']();}}}}return _0x2a7a56;},(_0x39ea58=>{const _0x5b8264=_0x39ea58[_0x36b7('0x176')];for(const _0x1dd8b1 of dependencies){if(!Imported[_0x1dd8b1]){alert(_0x36b7('0x30c')[_0x36b7('0x4b0')](_0x5b8264,_0x1dd8b1)),SceneManager[_0x36b7('0x428')]();break;}}const _0x39872a=_0x39ea58[_0x36b7('0x4f8')];if(_0x39872a[_0x36b7('0x328')](/\[Version[ ](.*?)\]/i)){if('noaeS'===_0x36b7('0x2e0')){const _0x335c00=Number(RegExp['$1']);if(_0x335c00!==VisuMZ[label][_0x36b7('0x4a7')]){if(_0x36b7('0x345')===_0x36b7('0x581')){function _0x433974(){_0x45357e=_0x47b8bb['max'](_0x2d9eaf,_0x19701d);}}else alert(_0x36b7('0xab')[_0x36b7('0x4b0')](_0x5b8264,_0x335c00)),SceneManager['exit']();}}else{function _0x9135c7(){var _0x1c5a26=_0x426706(_0x4dbbaf['$1']);try{_0x34927d+=_0x18f326(_0x1c5a26);}catch(_0x2654fa){if(_0x176ee4[_0x36b7('0x41e')]())_0x36e147[_0x36b7('0x9e')](_0x2654fa);}}}}if(_0x39872a[_0x36b7('0x328')](/\[Tier[ ](\d+)\]/i)){const _0x5d7552=Number(RegExp['$1']);if(_0x5d7552<tier){if(_0x36b7('0x1fa')!==_0x36b7('0xd9'))alert(_0x36b7('0x213')[_0x36b7('0x4b0')](_0x5b8264,_0x5d7552,tier)),SceneManager[_0x36b7('0x428')]();else{function _0x146d58(){return _0x372ba9[_0x36b7('0x4d1')][_0x36b7('0x91')]['Color'][_0x36b7('0x35e')][_0x36b7('0x2f9')](this,_0x40bb9b);}}}else tier=Math[_0x36b7('0x476')](_0x5d7552,tier);}VisuMZ[_0x36b7('0x17b')](VisuMZ[label][_0x36b7('0x91')],_0x39ea58[_0x36b7('0x3db')]);})(pluginData),PluginManager[_0x36b7('0x141')](pluginData[_0x36b7('0x176')],_0x36b7('0x46f'),_0x369343=>{VisuMZ[_0x36b7('0x17b')](_0x369343,_0x369343);const _0x44d150=_0x369343[_0x36b7('0x1bf')];VisuMZ[_0x36b7('0x287')](_0x44d150);}),PluginManager[_0x36b7('0x141')](pluginData[_0x36b7('0x176')],_0x36b7('0x246'),_0x554617=>{VisuMZ[_0x36b7('0x17b')](_0x554617,_0x554617);const _0x188054=_0x554617[_0x36b7('0xd3')]||0x0;$gameParty[_0x36b7('0x162')](_0x188054);}),PluginManager[_0x36b7('0x141')](pluginData[_0x36b7('0x176')],_0x36b7('0x105'),_0x4135f9=>{VisuMZ[_0x36b7('0x17b')](_0x4135f9,_0x4135f9);const _0x2d23e8=_0x4135f9[_0x36b7('0x2dc')]||0x1,_0x53c802=_0x4135f9['easingType']||'Linear',_0x57b82f=$gameScreen['picture'](_0x2d23e8);if(_0x57b82f){if('xZOxB'===_0x36b7('0x56e')){function _0x57f50f(){return this[_0x36b7('0x52')]();}}else _0x57b82f[_0x36b7('0x14a')](_0x53c802);}}),PluginManager[_0x36b7('0x141')](pluginData[_0x36b7('0x176')],_0x36b7('0x1ea'),_0x58d598=>{VisuMZ['ConvertParams'](_0x58d598,_0x58d598);const _0x35d763=_0x58d598[_0x36b7('0x1e')]||0x1;$gameSystem[_0x36b7('0x5f')](_0x35d763);}),PluginManager[_0x36b7('0x141')](pluginData[_0x36b7('0x176')],_0x36b7('0x3aa'),_0x212a7e=>{if($gameParty[_0x36b7('0x274')]())return;VisuMZ[_0x36b7('0x17b')](_0x212a7e,_0x212a7e);const _0x379677=_0x212a7e[_0x36b7('0x1e')];if(_0x379677[_0x36b7('0x328')](/Front/i))$gameSystem[_0x36b7('0x59c')](![]);else{if(_0x379677[_0x36b7('0x328')](/Side/i)){if(_0x36b7('0x562')!=='pVcUd')$gameSystem[_0x36b7('0x59c')](!![]);else{function _0x51c596(){this[_0x36b7('0x4aa')][_0x36b7('0x2aa')](_0x3ea443['layoutSettings'][_0x36b7('0x48b')]);}}}else $gameSystem[_0x36b7('0x59c')](!$gameSystem['isSideView']());}}),PluginManager[_0x36b7('0x141')](pluginData[_0x36b7('0x176')],_0x36b7('0xb1'),_0x346158=>{if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x346158,_0x346158);const _0x303b3d=_0x346158[_0x36b7('0x1e')];if(_0x303b3d[_0x36b7('0x328')](/Default/i))$gameSystem[_0x36b7('0x2fd')](![]);else{if(_0x303b3d[_0x36b7('0x328')](/Time/i)){if('dpMFF'!=='TSTMN')$gameSystem[_0x36b7('0x2fd')](!![]);else{function _0x4d5954(){if(this[_0x36b7('0x1f6')]===_0x260f0f)this[_0x36b7('0x391')]();if(this[_0x36b7('0x1f6')]['SideView']===_0x3782bb)this['initCoreEngine']();this[_0x36b7('0x1f6')]['SideView']=_0xf4e86e;}}}else $gameSystem[_0x36b7('0x2fd')](!$gameSystem[_0x36b7('0x361')]());}}),PluginManager[_0x36b7('0x141')](pluginData['name'],_0x36b7('0x396'),_0x456c9b=>{VisuMZ[_0x36b7('0x17b')](_0x456c9b,_0x456c9b);const _0x2d4234=_0x456c9b[_0x36b7('0x1e')]||0x1;$gameSystem[_0x36b7('0xfb')](_0x2d4234);}),VisuMZ[_0x36b7('0x4d1')]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x49c')],Scene_Boot[_0x36b7('0x33c')]['onDatabaseLoaded']=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x24c')][_0x36b7('0x2f9')](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x36b7('0x432')](),this[_0x36b7('0x52b')]();},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')]={},Scene_Boot[_0x36b7('0x33c')]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0xe54e5f=['MAXHP',_0x36b7('0x63'),_0x36b7('0x37e'),'DEF',_0x36b7('0x1d2'),_0x36b7('0x1a5'),'AGI',_0x36b7('0x11b')],_0x48d242=['HIT',_0x36b7('0x276'),_0x36b7('0x22b'),_0x36b7('0x337'),_0x36b7('0x271'),_0x36b7('0x188'),_0x36b7('0x73'),'HRG',_0x36b7('0xdd'),_0x36b7('0x114')],_0x14beb8=[_0x36b7('0x577'),_0x36b7('0x3e6'),_0x36b7('0x8e'),_0x36b7('0x44'),_0x36b7('0x3f9'),_0x36b7('0x134'),_0x36b7('0x41d'),_0x36b7('0x7b'),_0x36b7('0xde'),_0x36b7('0x35f')],_0x301b89=[_0xe54e5f,_0x48d242,_0x14beb8],_0x33c1d5=[_0x36b7('0x317'),'Plus1',_0x36b7('0x481'),'Max',_0x36b7('0x237'),_0x36b7('0x2f5'),_0x36b7('0x13c'),_0x36b7('0x186'),_0x36b7('0x52f'),_0x36b7('0x389')];for(const _0x20bb63 of _0x301b89){if(_0x36b7('0xcf')===_0x36b7('0xcf')){let _0x1d6596='';if(_0x20bb63===_0xe54e5f)_0x1d6596=_0x36b7('0x44a');if(_0x20bb63===_0x48d242)_0x1d6596=_0x36b7('0x31c');if(_0x20bb63===_0x14beb8)_0x1d6596=_0x36b7('0x30a');for(type of _0x33c1d5){if(_0x36b7('0x145')!==_0x36b7('0x145')){function _0x3337c3(){_0x59cefd[_0x36b7('0x17b')](_0x1346d2,_0x4c3004);const _0x4e3c05=_0x34ad69[_0x36b7('0x1e')]||0x1;_0x36effc[_0x36b7('0xfb')](_0x4e3c05);}}else{let _0x458c3e=_0x36b7('0x569')[_0x36b7('0x4b0')](_0x1d6596,type);VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x458c3e]=[],VisuMZ['CoreEngine']['RegExp'][_0x458c3e+'JS']=[];let _0x4c24b7=_0x36b7('0x3e2');if([_0x36b7('0x317'),_0x36b7('0x186')][_0x36b7('0x592')](type)){if(_0x36b7('0x2d5')!==_0x36b7('0x2d5')){function _0x491d54(){_0x231047+=_0x36b7('0x59f');}}else _0x4c24b7+=_0x36b7('0x24d');}else{if([_0x36b7('0x527'),'Flat1'][_0x36b7('0x592')](type)){if('uVlyu'===_0x36b7('0x5a6'))_0x4c24b7+='([\x5c+\x5c-]\x5cd+)([%％])>';else{function _0x170f8b(){_0x492bf3[_0x36b7('0x59c')](![]);}}}else{if([_0x36b7('0x481'),_0x36b7('0x389')]['includes'](type))_0x4c24b7+=_0x36b7('0x3f4');else{if(type===_0x36b7('0x412'))_0x4c24b7+=_0x36b7('0x59f');else{if(type===_0x36b7('0x2f5'))_0x4c24b7+='(\x5cd+)([%％])>';else type===_0x36b7('0x13c')&&(_0x4c24b7+=_0x36b7('0x472'));}}}}for(const _0x45a60a of _0x20bb63){if(_0x36b7('0x193')===_0x36b7('0x193')){const _0x589484=_0x4c24b7[_0x36b7('0x4b0')](_0x45a60a,type[_0x36b7('0x3fb')]());VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x458c3e]['push'](new RegExp(_0x589484,'i'));const _0x227609='<JS\x20%1\x20%2:[\x20](.*)>'[_0x36b7('0x4b0')](_0x45a60a,type['toUpperCase']());VisuMZ[_0x36b7('0x4d1')]['RegExp'][_0x458c3e+'JS'][_0x36b7('0x423')](new RegExp(_0x227609,'i'));}else{function _0xd4771e(){const _0x145bc1=_0x39e031[_0x36b7('0xea')]()[_0x36b7('0x176')][_0x36b7('0x12b')](/\\I\[(\d+)\]/gi,'');this[_0x36b7('0x229')](_0x145bc1,_0x2db8cd,_0x2a95e4,_0x1a5565);}}}}}}else{function _0x11c100(){return this[_0x36b7('0x542')]()?this[_0x36b7('0x2eb')]():0x0;}}}},Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x432')]=function(){this[_0x36b7('0x376')](),this[_0x36b7('0x263')](),this[_0x36b7('0x4ae')]();},Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x376')]=function(){for(const _0x49d207 of $dataActors){if(!_0x49d207)continue;const _0x562b0c=_0x49d207[_0x36b7('0x52a')];if(_0x562b0c[_0x36b7('0x328')](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x36b7('0x4fa')!==_0x36b7('0x534')){_0x49d207['maxLevel']=Number(RegExp['$1']);if(_0x49d207[_0x36b7('0x252')]===0x0)_0x49d207['maxLevel']=Number[_0x36b7('0x4d9')];}else{function _0x5b8cf0(){this[_0x36b7('0x4e0')]=![];}}}_0x562b0c[_0x36b7('0x328')](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x49d207[_0x36b7('0x318')]=Math['min'](Number(RegExp['$1']),_0x49d207['maxLevel']));}},Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x263')]=function(){for(const _0x2a9bf1 of $dataActors){if(!_0x2a9bf1)continue;const _0x770e6c=_0x2a9bf1['note'];if(_0x2a9bf1[_0x36b7('0x205')]){if(_0x36b7('0x1c8')!==_0x36b7('0x566'))for(const _0xd0ee06 of _0x2a9bf1[_0x36b7('0x205')]){_0xd0ee06[_0x36b7('0x52a')][_0x36b7('0x328')](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0xd0ee06[_0x36b7('0x4c0')]=Math[_0x36b7('0x476')](Number(RegExp['$1']),0x1));}else{function _0x45283f(){var _0x13aa5b=_0x5d63bb(_0x5a0578['$1']);_0x3dbee9+=_0x13aa5b;}}}}},Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x4ae')]=function(){for(const _0x386f3f of $dataActors){if(!_0x386f3f)continue;_0x386f3f[_0x36b7('0x4c0')]=0x1;const _0x4ddd5c=_0x386f3f['note'];if(_0x4ddd5c['match'](/<LEVEL:[ ](\d+)>/i))_0x386f3f[_0x36b7('0x4c0')]=Number(RegExp['$1']);if(_0x4ddd5c['match'](/<MAXHP:[ ](\d+)>/i))_0x386f3f['params'][0x0]=Number(RegExp['$1']);if(_0x4ddd5c[_0x36b7('0x328')](/<MAXMP:[ ](\d+)>/i))_0x386f3f[_0x36b7('0x3fe')][0x1]=Number(RegExp['$1']);if(_0x4ddd5c['match'](/<ATK:[ ](\d+)>/i))_0x386f3f[_0x36b7('0x3fe')][0x2]=Number(RegExp['$1']);if(_0x4ddd5c[_0x36b7('0x328')](/<DEF:[ ](\d+)>/i))_0x386f3f[_0x36b7('0x3fe')][0x3]=Number(RegExp['$1']);if(_0x4ddd5c[_0x36b7('0x328')](/<MAT:[ ](\d+)>/i))_0x386f3f[_0x36b7('0x3fe')][0x4]=Number(RegExp['$1']);if(_0x4ddd5c[_0x36b7('0x328')](/<MDF:[ ](\d+)>/i))_0x386f3f[_0x36b7('0x3fe')][0x5]=Number(RegExp['$1']);if(_0x4ddd5c['match'](/<AGI:[ ](\d+)>/i))_0x386f3f[_0x36b7('0x3fe')][0x6]=Number(RegExp['$1']);if(_0x4ddd5c[_0x36b7('0x328')](/<LUK:[ ](\d+)>/i))_0x386f3f['params'][0x7]=Number(RegExp['$1']);if(_0x4ddd5c[_0x36b7('0x328')](/<EXP:[ ](\d+)>/i))_0x386f3f[_0x36b7('0x4f6')]=Number(RegExp['$1']);if(_0x4ddd5c[_0x36b7('0x328')](/<GOLD:[ ](\d+)>/i))_0x386f3f[_0x36b7('0x85')]=Number(RegExp['$1']);}},Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x52b')]=function(){if(VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x523')][_0x36b7('0x2a4')]){if(_0x36b7('0x15f')!==_0x36b7('0x10'))VisuMZ[_0x36b7('0x22f')](!![]);else{function _0x2372f8(){let _0x1a5a40=_0x5886c5[_0x36b7('0x555')](_0x3c7580)['toString']();this[_0x36b7('0x1fb')]()&&(_0x1a5a40=_0x52fb25[_0x36b7('0xee')](_0x1a5a40));const _0x146703=this[_0x36b7('0x18b')](),_0xc4f44a=_0x4eb345['floor'](_0x146703*0.75);for(let _0x389c45=0x0;_0x389c45<_0x1a5a40[_0x36b7('0x1d6')];_0x389c45++){const _0x4c2afb=this['createChildSprite'](_0xc4f44a,_0x146703);_0x4c2afb[_0x36b7('0x156')]['drawText'](_0x1a5a40[_0x389c45],0x0,0x0,_0xc4f44a,_0x146703,'center'),_0x4c2afb['x']=(_0x389c45-(_0x1a5a40['length']-0x1)/0x2)*_0xc4f44a,_0x4c2afb['dy']=-_0x389c45;}}}}VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0x49')]&&(Input[_0x36b7('0x29c')][0x23]=_0x36b7('0x4b9'),Input['keyMapper'][0x24]='home');},VisuMZ[_0x36b7('0x4d1')]['Graphics_defaultStretchMode']=Graphics[_0x36b7('0x257')],Graphics['_defaultStretchMode']=function(){switch(VisuMZ['CoreEngine']['Settings'][_0x36b7('0x523')]['AutoStretch']){case _0x36b7('0x402'):return!![];case _0x36b7('0x3e3'):return![];default:return VisuMZ['CoreEngine'][_0x36b7('0xbb')][_0x36b7('0x2f9')](this);}},VisuMZ['CoreEngine'][_0x36b7('0x462')]=Graphics[_0x36b7('0x119')],Graphics['printError']=function(_0x5dfa33,_0x4556d7,_0x80c43e=null){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x462')][_0x36b7('0x2f9')](this,_0x5dfa33,_0x4556d7,_0x80c43e),VisuMZ[_0x36b7('0x22f')](![]);},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x158')]=Graphics[_0x36b7('0x46b')],Graphics[_0x36b7('0x46b')]=function(_0x38201f){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x158')][_0x36b7('0x2f9')](this,_0x38201f),this['_centerElementCoreEngine'](_0x38201f);},Graphics[_0x36b7('0x44f')]=function(_0x487ff2){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0x2ae')]&&(_0x487ff2[_0x36b7('0x31b')][_0x36b7('0xe')]=_0x36b7('0x4a2'));if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['QoL'][_0x36b7('0x4ba')]){if(_0x36b7('0x399')===_0x36b7('0x225')){function _0x3c3540(){_0xdd169f[_0x36b7('0x27d')]=!![],_0x31f556[_0x36b7('0x4d1')][_0x36b7('0x151')][_0x36b7('0x2f9')](this,_0x3f2ab4,_0x29687c),_0x2d97c5['_changingClass']=_0x4a6dc3;}}else _0x487ff2['style'][_0x36b7('0x3de')]=_0x36b7('0x8f');}},VisuMZ['CoreEngine'][_0x36b7('0x15c')]=Bitmap[_0x36b7('0x33c')][_0x36b7('0x229')],Bitmap['prototype']['drawText']=function(_0x54ad82,_0x26e10e,_0x14b61e,_0x333e88,_0x1c9287,_0x2a887b){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x15c')]['call'](this,_0x54ad82,_0x26e10e,_0x14b61e,_0x333e88,_0x1c9287,_0x2a887b);},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x545')]=Bitmap['prototype']['_drawTextOutline'],Bitmap[_0x36b7('0x33c')][_0x36b7('0x507')]=function(_0x51755c,_0x4f0902,_0x287d53,_0x47786b){if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0x421')])this['_drawTextShadow'](_0x51755c,_0x4f0902,_0x287d53,_0x47786b);else{if(_0x36b7('0x177')===_0x36b7('0x101')){function _0x4ff6e8(){_0x162c79+=_0x36b7('0x3f4');}}else VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x545')][_0x36b7('0x2f9')](this,_0x51755c,_0x4f0902,_0x287d53,_0x47786b);}},Bitmap[_0x36b7('0x33c')]['_drawTextShadow']=function(_0x29800e,_0x55e0f9,_0x54d28c,_0x2b1f8d){const _0xf813b2=this['context'];_0xf813b2['fillStyle']=this[_0x36b7('0x9b')],_0xf813b2['fillText'](_0x29800e,_0x55e0f9+0x2,_0x54d28c+0x2,_0x2b1f8d);},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x172')]=Tilemap['prototype'][_0x36b7('0x537')],Tilemap['prototype'][_0x36b7('0x537')]=function(_0x27fd2c,_0x3218fd,_0x57387e,_0x9b3232){if($gameMap&&$gameMap[_0x36b7('0x3a7')]())return;VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x172')]['call'](this,_0x27fd2c,_0x3218fd,_0x57387e,_0x9b3232);},Tilemap[_0x36b7('0x469')]['prototype'][_0x36b7('0x1e9')]=function(){this[_0x36b7('0x15a')]();for(let _0x4bec45=0x0;_0x4bec45<Tilemap[_0x36b7('0x8a')][_0x36b7('0x4a8')];_0x4bec45++){const _0x228f8c=new PIXI[(_0x36b7('0x4e8'))]();_0x228f8c[_0x36b7('0x2b8')](0x800,0x800);if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['QoL'][_0x36b7('0x4ba')]){if('LipIn'===_0x36b7('0x19e')){function _0x55d825(){_0x58d630[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0x370')]&&(this[_0x36b7('0x293')]=![]);}}else _0x228f8c[_0x36b7('0x363')]=PIXI[_0x36b7('0x2d')][_0x36b7('0x540')];}this[_0x36b7('0xd5')][_0x36b7('0x423')](_0x228f8c);}},WindowLayer['prototype'][_0x36b7('0x2fe')]=function(){return SceneManager&&SceneManager[_0x36b7('0x1b4')]?SceneManager['_scene'][_0x36b7('0x61')]():!![];},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x375')]=WindowLayer[_0x36b7('0x33c')][_0x36b7('0x2c5')],WindowLayer[_0x36b7('0x33c')][_0x36b7('0x2c5')]=function render(_0x15d4c3){if(this[_0x36b7('0x2fe')]()){if('zbuPu'!==_0x36b7('0x230'))VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x375')][_0x36b7('0x2f9')](this,_0x15d4c3);else{function _0x52f74f(){return _0x1c035d[_0x36b7('0x171')][_0x36b7('0x187')][_0x36b7('0x2f9')](this);}}}else this[_0x36b7('0x3d3')](_0x15d4c3);},WindowLayer[_0x36b7('0x33c')]['renderNoMask']=function render(_0x300788){if(!this[_0x36b7('0x3ad')])return;const _0x56bab0=new PIXI[(_0x36b7('0x2c4'))](),_0x891a70=_0x300788['gl'],_0x19eae9=this[_0x36b7('0x43a')][_0x36b7('0x14d')]();_0x300788[_0x36b7('0x15b')][_0x36b7('0xcb')](),_0x56bab0[_0x36b7('0x39')]=this[_0x36b7('0x39')],_0x300788[_0x36b7('0x39e')][_0x36b7('0x56a')](),_0x891a70[_0x36b7('0xda')](_0x891a70[_0x36b7('0x1c2')]);while(_0x19eae9[_0x36b7('0x1d6')]>0x0){const _0x1418b8=_0x19eae9[_0x36b7('0x3ab')]();if(_0x1418b8[_0x36b7('0x3d1')]&&_0x1418b8[_0x36b7('0x3ad')]&&_0x1418b8[_0x36b7('0x55e')]>0x0){if(_0x36b7('0x184')===_0x36b7('0x338')){function _0x43be22(){this[_0x36b7('0x294')][_0x36b7('0x2aa')](_0x5d4987[_0x36b7('0x171')][_0x36b7('0x3eb')]);}}else _0x891a70[_0x36b7('0x28e')](_0x891a70[_0x36b7('0x2f3')],0x0,~0x0),_0x891a70['stencilOp'](_0x891a70['KEEP'],_0x891a70[_0x36b7('0xad')],_0x891a70[_0x36b7('0xad')]),_0x1418b8['render'](_0x300788),_0x300788['batch']['flush'](),_0x56bab0[_0x36b7('0x22c')](),_0x891a70[_0x36b7('0x28e')](_0x891a70[_0x36b7('0x289')],0x1,~0x0),_0x891a70[_0x36b7('0xbf')](_0x891a70[_0x36b7('0x445')],_0x891a70[_0x36b7('0x445')],_0x891a70['REPLACE']),_0x891a70[_0x36b7('0x4f')](_0x891a70['ZERO'],_0x891a70[_0x36b7('0x1cd')]),_0x56bab0['render'](_0x300788),_0x300788[_0x36b7('0x39e')][_0x36b7('0x56a')](),_0x891a70['blendFunc'](_0x891a70[_0x36b7('0x1cd')],_0x891a70[_0x36b7('0x43b')]);}}_0x891a70[_0x36b7('0x439')](_0x891a70[_0x36b7('0x1c2')]),_0x891a70[_0x36b7('0x22c')](_0x891a70[_0x36b7('0x4c7')]),_0x891a70[_0x36b7('0x153')](0x0),_0x300788[_0x36b7('0x39e')][_0x36b7('0x56a')]();for(const _0x220afb of this[_0x36b7('0x43a')]){if(_0x36b7('0x490')===_0x36b7('0x508')){function _0xb73c7f(){this[_0x36b7('0x11e')]['x']=_0x565dd7[_0x36b7('0x556')]+0x4;}}else!_0x220afb[_0x36b7('0x3d1')]&&_0x220afb[_0x36b7('0x3ad')]&&_0x220afb[_0x36b7('0x2c5')](_0x300788);}_0x300788[_0x36b7('0x39e')][_0x36b7('0x56a')]();},DataManager[_0x36b7('0x471')]=function(_0x1ca603){return this[_0x36b7('0x240')](_0x1ca603)&&_0x1ca603[_0x36b7('0x14f')]===0x2;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x3ce')]=DataManager['setupNewGame'],DataManager[_0x36b7('0x316')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x3ce')][_0x36b7('0x2f9')](this),this[_0x36b7('0x1c7')]();},DataManager[_0x36b7('0x1c7')]=function(){if($gameTemp[_0x36b7('0x41e')]()){if(_0x36b7('0x541')!==_0x36b7('0x541')){function _0x59dd2f(){_0x220d06[_0x36b7('0x423')](_0x4aef65);}}else{const _0x5cfe3d=VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0x102')];if(_0x5cfe3d>0x0)$gameTemp[_0x36b7('0x43d')](_0x5cfe3d);}}},TextManager['stringKeyMap']=['','','',_0x36b7('0x46e'),'','',_0x36b7('0x32b'),'',_0x36b7('0x33d'),_0x36b7('0x372'),'','',_0x36b7('0x48'),_0x36b7('0x1e1'),_0x36b7('0x475'),'',_0x36b7('0x4d7'),_0x36b7('0x9c'),_0x36b7('0x1c3'),'PAUSE',_0x36b7('0x266'),_0x36b7('0x207'),_0x36b7('0x28a'),'JUNJA',_0x36b7('0x5a1'),_0x36b7('0x3d'),'','ESC',_0x36b7('0x22a'),_0x36b7('0x4ef'),_0x36b7('0x4a4'),_0x36b7('0x4af'),_0x36b7('0x3e7'),_0x36b7('0xa9'),_0x36b7('0xc2'),_0x36b7('0x64'),'HOME',_0x36b7('0x356'),'UP',_0x36b7('0x332'),_0x36b7('0x50a'),'SELECT',_0x36b7('0x411'),_0x36b7('0x563'),'PRINTSCREEN',_0x36b7('0x0'),_0x36b7('0x1a4'),'','0','1','2','3','4','5','6','7','8','9',_0x36b7('0x549'),_0x36b7('0x1ec'),_0x36b7('0x3fd'),_0x36b7('0x410'),_0x36b7('0x2d9'),_0x36b7('0x1eb'),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x36b7('0x1f8'),'',_0x36b7('0x1f7'),'',_0x36b7('0x1c6'),_0x36b7('0xb5'),_0x36b7('0x425'),_0x36b7('0x76'),_0x36b7('0x7d'),'NUMPAD4',_0x36b7('0x68'),_0x36b7('0x2c7'),_0x36b7('0x20a'),_0x36b7('0x409'),'NUMPAD9','MULTIPLY',_0x36b7('0x8d'),'SEPARATOR','SUBTRACT',_0x36b7('0x380'),_0x36b7('0x195'),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x36b7('0x231'),_0x36b7('0xfc'),'F12',_0x36b7('0x3b1'),_0x36b7('0x21a'),_0x36b7('0x11f'),'F16','F17',_0x36b7('0x2ff'),_0x36b7('0x516'),_0x36b7('0x258'),_0x36b7('0x1c4'),'F22','F23',_0x36b7('0x368'),'','','','','','','','',_0x36b7('0x405'),_0x36b7('0x34d'),'WIN_OEM_FJ_JISHO',_0x36b7('0x4ed'),'WIN_OEM_FJ_TOUROKU',_0x36b7('0x1de'),_0x36b7('0x53d'),'','','','','','','','','',_0x36b7('0x4d8'),_0x36b7('0x312'),_0x36b7('0x3a5'),'HASH',_0x36b7('0x3ae'),_0x36b7('0x51'),_0x36b7('0xd4'),'UNDERSCORE','OPEN_PAREN',_0x36b7('0x57e'),_0x36b7('0xc1'),'PLUS',_0x36b7('0x357'),_0x36b7('0x3f5'),_0x36b7('0x455'),_0x36b7('0x29a'),_0x36b7('0x3f'),'','','','',_0x36b7('0x208'),'VOLUME_DOWN',_0x36b7('0x2e2'),'','',_0x36b7('0x1ec'),_0x36b7('0x410'),_0x36b7('0x286'),'MINUS',_0x36b7('0x2bb'),_0x36b7('0x420'),_0x36b7('0x436'),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x36b7('0x5a'),_0x36b7('0x502'),_0x36b7('0x3f8'),_0x36b7('0x4c4'),'','META',_0x36b7('0x477'),'',_0x36b7('0xfd'),_0x36b7('0x1b9'),'',_0x36b7('0x50'),'','',_0x36b7('0x1a0'),_0x36b7('0x32a'),'WIN_OEM_PA1',_0x36b7('0x100'),_0x36b7('0x591'),_0x36b7('0x2e3'),_0x36b7('0x4bc'),_0x36b7('0x339'),_0x36b7('0x441'),_0x36b7('0x264'),_0x36b7('0x4ad'),_0x36b7('0x36b'),_0x36b7('0x295'),'ATTN',_0x36b7('0x168'),_0x36b7('0x4ff'),_0x36b7('0x41f'),_0x36b7('0xd'),'ZOOM','',_0x36b7('0x57c'),_0x36b7('0x387'),''],TextManager[_0x36b7('0x20f')]=VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x291')][_0x36b7('0x36c')],TextManager[_0x36b7('0x2be')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x291')][_0x36b7('0x518')],TextManager[_0x36b7('0x18a')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x291')][_0x36b7('0x561')],VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x4a3')]=TextManager[_0x36b7('0x44a')],TextManager['param']=function(_0x1ed57b){if(typeof _0x1ed57b===_0x36b7('0x2d6'))return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x4a3')]['call'](this,_0x1ed57b);else{if(_0x36b7('0x349')===_0x36b7('0x466')){function _0x12edd2(){return _0x3b6058[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0x4f5')];}}else return this[_0x36b7('0x2b6')](_0x1ed57b);}},TextManager['paramName']=function(_0xf7416){_0xf7416=String(_0xf7416||'')[_0x36b7('0x3fb')]();const _0x418141=VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x23')];if(_0xf7416==='MAXHP')return $dataSystem['terms']['params'][0x0];if(_0xf7416===_0x36b7('0x63'))return $dataSystem['terms'][_0x36b7('0x3fe')][0x1];if(_0xf7416===_0x36b7('0x37e'))return $dataSystem[_0x36b7('0x149')][_0x36b7('0x3fe')][0x2];if(_0xf7416===_0x36b7('0x1e7'))return $dataSystem[_0x36b7('0x149')][_0x36b7('0x3fe')][0x3];if(_0xf7416===_0x36b7('0x1d2'))return $dataSystem[_0x36b7('0x149')]['params'][0x4];if(_0xf7416===_0x36b7('0x1a5'))return $dataSystem['terms']['params'][0x5];if(_0xf7416===_0x36b7('0x23b'))return $dataSystem['terms'][_0x36b7('0x3fe')][0x6];if(_0xf7416===_0x36b7('0x11b'))return $dataSystem[_0x36b7('0x149')][_0x36b7('0x3fe')][0x7];if(_0xf7416==='HIT')return _0x418141[_0x36b7('0x2b5')];if(_0xf7416===_0x36b7('0x276'))return _0x418141[_0x36b7('0x8c')];if(_0xf7416===_0x36b7('0x22b'))return _0x418141['XParamVocab2'];if(_0xf7416===_0x36b7('0x337'))return _0x418141[_0x36b7('0x1cc')];if(_0xf7416===_0x36b7('0x271'))return _0x418141[_0x36b7('0x27')];if(_0xf7416===_0x36b7('0x188'))return _0x418141[_0x36b7('0x24b')];if(_0xf7416===_0x36b7('0x73'))return _0x418141[_0x36b7('0x2a6')];if(_0xf7416===_0x36b7('0x5c'))return _0x418141[_0x36b7('0x9f')];if(_0xf7416===_0x36b7('0xdd'))return _0x418141[_0x36b7('0x132')];if(_0xf7416==='TRG')return _0x418141['XParamVocab9'];if(_0xf7416===_0x36b7('0x577'))return _0x418141[_0x36b7('0x17')];if(_0xf7416===_0x36b7('0x3e6'))return _0x418141[_0x36b7('0x24f')];if(_0xf7416===_0x36b7('0x8e'))return _0x418141[_0x36b7('0x4a1')];if(_0xf7416==='PHA')return _0x418141[_0x36b7('0x25e')];if(_0xf7416===_0x36b7('0x3f9'))return _0x418141['SParamVocab4'];if(_0xf7416===_0x36b7('0x134'))return _0x418141[_0x36b7('0x120')];if(_0xf7416===_0x36b7('0x41d'))return _0x418141[_0x36b7('0x4b4')];if(_0xf7416===_0x36b7('0x7b'))return _0x418141[_0x36b7('0x2df')];if(_0xf7416==='FDR')return _0x418141[_0x36b7('0x54a')];if(_0xf7416===_0x36b7('0x35f'))return _0x418141[_0x36b7('0xd7')];return'';},TextManager[_0x36b7('0xf2')]=function(_0x2f911a){if(_0x2f911a===_0x36b7('0x371'))_0x2f911a=_0x36b7('0x2ef');let _0x3e8c38=[];for(let _0x393346 in Input[_0x36b7('0x29c')]){_0x393346=Number(_0x393346);if(_0x393346>=0x60&&_0x393346<=0x69)continue;if([0x12,0x20][_0x36b7('0x592')](_0x393346))continue;if(_0x2f911a===Input['keyMapper'][_0x393346]){if(_0x36b7('0x298')===_0x36b7('0x144')){function _0x54cd8d(){this[_0x36b7('0x1b3')][_0x36b7('0x2aa')](_0x3bb11a[_0x36b7('0x171')][_0x36b7('0x468')]);}}else _0x3e8c38[_0x36b7('0x423')](_0x393346);}}for(let _0x31f559=0x0;_0x31f559<_0x3e8c38[_0x36b7('0x1d6')];_0x31f559++){if(_0x36b7('0x97')!==_0x36b7('0x97')){function _0x5837b7(){return _0x1cede1[_0x36b7('0x171')][_0x36b7('0x346')]['call'](this);}}else _0x3e8c38[_0x31f559]=TextManager[_0x36b7('0x506')][_0x3e8c38[_0x31f559]];}return this[_0x36b7('0x261')](_0x3e8c38);},TextManager[_0x36b7('0x261')]=function(_0x82a415){const _0x4db82a=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x291')],_0x3fa8c9=_0x4db82a[_0x36b7('0x4b8')],_0x1d69ae=_0x82a415['pop'](),_0x2317e5='Key%1'[_0x36b7('0x4b0')](_0x1d69ae);return _0x4db82a[_0x2317e5]?_0x4db82a[_0x2317e5]:_0x3fa8c9['format'](_0x1d69ae);},TextManager[_0x36b7('0x2e7')]=function(_0x1a4367,_0x5d3b97){const _0x3de711=VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x291')],_0x6dd2da=_0x3de711[_0x36b7('0x1cb')],_0x291f5b=this[_0x36b7('0xf2')](_0x1a4367),_0x5c6614=this[_0x36b7('0xf2')](_0x5d3b97);return _0x6dd2da[_0x36b7('0x4b0')](_0x291f5b,_0x5c6614);},VisuMZ['CoreEngine'][_0x36b7('0x26b')]=ColorManager['loadWindowskin'],ColorManager[_0x36b7('0x36f')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x26b')][_0x36b7('0x2f9')](this),this['_colorCache']=this[_0x36b7('0x217')]||{};},ColorManager[_0x36b7('0x557')]=function(_0x208037,_0x24919f){_0x24919f=String(_0x24919f),this[_0x36b7('0x217')]=this['_colorCache']||{};if(_0x24919f[_0x36b7('0x328')](/#(.*)/i)){if(_0x36b7('0x4cf')===_0x36b7('0x4cf'))this[_0x36b7('0x217')][_0x208037]=_0x36b7('0x1e4')[_0x36b7('0x4b0')](String(RegExp['$1']));else{function _0xcce1a5(){if(_0x5982cf['isPlaytest']())_0x1dd6df[_0x36b7('0x9e')](_0x133de3);}}}else this[_0x36b7('0x217')][_0x208037]=this[_0x36b7('0x20d')](Number(_0x24919f));return this['_colorCache'][_0x208037];},ColorManager[_0x36b7('0x553')]=function(_0x3c73f3){if(_0x3c73f3[_0x36b7('0x328')](/#(.*)/i))return _0x36b7('0x1e4')[_0x36b7('0x4b0')](String(RegExp['$1']));else{if(_0x36b7('0x1d1')!==_0x36b7('0x55'))return this['textColor'](Number(_0x3c73f3));else{function _0x25af3c(){return _0x2a03ce[_0x36b7('0x33c')]['itemHeight'][_0x36b7('0x2f9')](this)+_0x1b5af2[_0x36b7('0x4d1')][_0x36b7('0x91')]['Window'][_0x36b7('0x39b')];;}}}},ColorManager[_0x36b7('0x454')]=function(){this[_0x36b7('0x217')]={};},ColorManager[_0x36b7('0x327')]=function(){const _0x4b58d6=_0x36b7('0x36e');this[_0x36b7('0x217')]=this['_colorCache']||{};if(this[_0x36b7('0x217')][_0x4b58d6])return this[_0x36b7('0x217')][_0x4b58d6];const _0x5967f9=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x49a')];return this['getColorDataFromPluginParameters'](_0x4b58d6,_0x5967f9);},ColorManager[_0x36b7('0xe5')]=function(){const _0x268c49=_0x36b7('0x4b3');this['_colorCache']=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x268c49])return this[_0x36b7('0x217')][_0x268c49];const _0x525a80=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x515')];return this[_0x36b7('0x557')](_0x268c49,_0x525a80);},ColorManager[_0x36b7('0x39a')]=function(){const _0x1589dc=_0x36b7('0x359');this[_0x36b7('0x217')]=this['_colorCache']||{};if(this[_0x36b7('0x217')][_0x1589dc])return this[_0x36b7('0x217')][_0x1589dc];const _0x40d2e0=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x1b5')];return this[_0x36b7('0x557')](_0x1589dc,_0x40d2e0);},ColorManager[_0x36b7('0x104')]=function(){const _0x2ddf9a=_0x36b7('0x397');this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this['_colorCache'][_0x2ddf9a])return this['_colorCache'][_0x2ddf9a];const _0x43494=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x1fc')];return this['getColorDataFromPluginParameters'](_0x2ddf9a,_0x43494);},ColorManager['gaugeBackColor']=function(){const _0x9e4f40='_stored_gaugeBackColor';this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x9e4f40])return this[_0x36b7('0x217')][_0x9e4f40];const _0x5d85e7=VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x21')][_0x36b7('0x201')];return this['getColorDataFromPluginParameters'](_0x9e4f40,_0x5d85e7);},ColorManager[_0x36b7('0x157')]=function(){const _0x320023=_0x36b7('0x3b4');this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x320023])return this['_colorCache'][_0x320023];const _0x18acee=VisuMZ['CoreEngine'][_0x36b7('0x91')]['Color'][_0x36b7('0x2cc')];return this[_0x36b7('0x557')](_0x320023,_0x18acee);},ColorManager[_0x36b7('0x1df')]=function(){const _0x2beab6=_0x36b7('0x1f4');this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x2beab6])return this[_0x36b7('0x217')][_0x2beab6];const _0x4e5f8a=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x40c')];return this[_0x36b7('0x557')](_0x2beab6,_0x4e5f8a);},ColorManager[_0x36b7('0x12e')]=function(){const _0x4c1e4c=_0x36b7('0x269');this['_colorCache']=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x4c1e4c])return this[_0x36b7('0x217')][_0x4c1e4c];const _0x203cd9=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')]['ColorMPGauge1'];return this[_0x36b7('0x557')](_0x4c1e4c,_0x203cd9);},ColorManager['mpGaugeColor2']=function(){const _0x1c5b75=_0x36b7('0x434');this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x1c5b75])return this[_0x36b7('0x217')][_0x1c5b75];const _0x38b0eb=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x593')];return this[_0x36b7('0x557')](_0x1c5b75,_0x38b0eb);},ColorManager[_0x36b7('0x281')]=function(){const _0xa74e42=_0x36b7('0x386');this['_colorCache']=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0xa74e42])return this['_colorCache'][_0xa74e42];const _0x1beb8d=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x4a9')];return this[_0x36b7('0x557')](_0xa74e42,_0x1beb8d);},ColorManager['powerUpColor']=function(){const _0x4c8a24=_0x36b7('0x34f');this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x4c8a24])return this[_0x36b7('0x217')][_0x4c8a24];const _0x5301c5=VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x12c')];return this[_0x36b7('0x557')](_0x4c8a24,_0x5301c5);},ColorManager['powerDownColor']=function(){const _0x5e9805='_stored_powerDownColor';this['_colorCache']=this[_0x36b7('0x217')]||{};if(this['_colorCache'][_0x5e9805])return this[_0x36b7('0x217')][_0x5e9805];const _0x4ada48=VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x37b')];return this[_0x36b7('0x557')](_0x5e9805,_0x4ada48);},ColorManager['ctGaugeColor1']=function(){const _0x5a873d='_stored_ctGaugeColor1';this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x5a873d])return this[_0x36b7('0x217')][_0x5a873d];const _0xef2378=VisuMZ['CoreEngine'][_0x36b7('0x91')]['Color']['ColorCTGauge1'];return this[_0x36b7('0x557')](_0x5a873d,_0xef2378);},ColorManager['ctGaugeColor2']=function(){const _0x1a5d5c=_0x36b7('0xce');this['_colorCache']=this['_colorCache']||{};if(this[_0x36b7('0x217')][_0x1a5d5c])return this[_0x36b7('0x217')][_0x1a5d5c];const _0x2b359c=VisuMZ['CoreEngine'][_0x36b7('0x91')]['Color'][_0x36b7('0x2d7')];return this[_0x36b7('0x557')](_0x1a5d5c,_0x2b359c);},ColorManager[_0x36b7('0xa0')]=function(){const _0x487701=_0x36b7('0x570');this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x487701])return this['_colorCache'][_0x487701];const _0xb468d4=VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x21')][_0x36b7('0x212')];return this[_0x36b7('0x557')](_0x487701,_0xb468d4);},ColorManager[_0x36b7('0x4c8')]=function(){const _0x355349=_0x36b7('0x548');this[_0x36b7('0x217')]=this['_colorCache']||{};if(this[_0x36b7('0x217')][_0x355349])return this[_0x36b7('0x217')][_0x355349];const _0x410487=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')]['ColorTPGauge2'];return this[_0x36b7('0x557')](_0x355349,_0x410487);},ColorManager[_0x36b7('0x292')]=function(){const _0x581ee3='_stored_tpCostColor';this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x581ee3])return this[_0x36b7('0x217')][_0x581ee3];const _0x31d8eb=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x290')];return this[_0x36b7('0x557')](_0x581ee3,_0x31d8eb);},ColorManager[_0x36b7('0x28d')]=function(){const _0x10069e=_0x36b7('0x43');this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x10069e])return this[_0x36b7('0x217')][_0x10069e];const _0x4fbb6f=VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x290')];return this[_0x36b7('0x557')](_0x10069e,_0x4fbb6f);},ColorManager['expGaugeColor1']=function(){const _0x3bd2bd=_0x36b7('0x45e');this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x3bd2bd])return this['_colorCache'][_0x3bd2bd];const _0x44be77=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['Color'][_0x36b7('0x196')];return this['getColorDataFromPluginParameters'](_0x3bd2bd,_0x44be77);},ColorManager['expGaugeColor2']=function(){const _0x5ebf76=_0x36b7('0x522');this['_colorCache']=this['_colorCache']||{};if(this[_0x36b7('0x217')][_0x5ebf76])return this['_colorCache'][_0x5ebf76];const _0x275f91=VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x21')]['ColorExpGauge2'];return this[_0x36b7('0x557')](_0x5ebf76,_0x275f91);},ColorManager[_0x36b7('0x1bd')]=function(){const _0x3c131e=_0x36b7('0x576');this['_colorCache']=this['_colorCache']||{};if(this[_0x36b7('0x217')][_0x3c131e])return this[_0x36b7('0x217')][_0x3c131e];const _0x2728b4=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x4d5')];return this[_0x36b7('0x557')](_0x3c131e,_0x2728b4);},ColorManager[_0x36b7('0x53b')]=function(){const _0x1ba045=_0x36b7('0x14');this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this['_colorCache'][_0x1ba045])return this['_colorCache'][_0x1ba045];const _0xef80d8=VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x21')][_0x36b7('0x34')];return this[_0x36b7('0x557')](_0x1ba045,_0xef80d8);},ColorManager[_0x36b7('0x491')]=function(_0x5ec43d){return VisuMZ['CoreEngine']['Settings'][_0x36b7('0x21')][_0x36b7('0x6b')][_0x36b7('0x2f9')](this,_0x5ec43d);},ColorManager['mpColor']=function(_0x11340c){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x35e')][_0x36b7('0x2f9')](this,_0x11340c);},ColorManager['tpColor']=function(_0x1ba2f3){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')]['ActorTPColor'][_0x36b7('0x2f9')](this,_0x1ba2f3);},ColorManager[_0x36b7('0xc')]=function(_0x41e1f0){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['Color'][_0x36b7('0x398')][_0x36b7('0x2f9')](this,_0x41e1f0);},ColorManager[_0x36b7('0x1ba')]=function(_0x230b2b){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x2f2')]['call'](this,_0x230b2b);},ColorManager['outlineColor']=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x131')];},ColorManager['dimColor1']=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['Color']['DimColor1'];},ColorManager[_0x36b7('0x148')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x46d')];},ColorManager[_0x36b7('0x189')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x450')];},ColorManager['itemBackColor2']=function(){return VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x4e9')];},SceneManager[_0x36b7('0x595')]=[],VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x32d')]=SceneManager[_0x36b7('0x4d2')],SceneManager[_0x36b7('0x4d2')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x32d')]['call'](this),this[_0x36b7('0x242')]();},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0xff')]=SceneManager[_0x36b7('0x204')],SceneManager[_0x36b7('0x204')]=function(_0x594f19){if($gameTemp)this[_0x36b7('0x1d')](_0x594f19);VisuMZ[_0x36b7('0x4d1')]['SceneManager_onKeyDown'][_0x36b7('0x2f9')](this,_0x594f19);},SceneManager[_0x36b7('0x1d')]=function(_0x3fbde4){if(!_0x3fbde4['ctrlKey']&&!_0x3fbde4['altKey'])switch(_0x3fbde4[_0x36b7('0x47a')]){case 0x75:this[_0x36b7('0x59e')]();break;case 0x76:this['playTestF7']();break;}},SceneManager[_0x36b7('0x59e')]=function(){if($gameTemp[_0x36b7('0x41e')]()&&VisuMZ[_0x36b7('0x4d1')]['Settings']['QoL'][_0x36b7('0xe0')]){if(ConfigManager[_0x36b7('0x2db')]!==0x0){if(_0x36b7('0x25')!==_0x36b7('0x25')){function _0x475e3f(){this[_0x36b7('0x49d')](_0x389c41),this[_0x36b7('0x86')](_0x3cdce4);}}else ConfigManager['bgmVolume']=0x0,ConfigManager[_0x36b7('0x1b0')]=0x0,ConfigManager[_0x36b7('0x21b')]=0x0,ConfigManager[_0x36b7('0x2db')]=0x0;}else ConfigManager['bgmVolume']=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x36b7('0x21b')]=0x64,ConfigManager[_0x36b7('0x2db')]=0x64;ConfigManager[_0x36b7('0x543')]();if(this[_0x36b7('0x1b4')][_0x36b7('0xe6')]===Scene_Options){if(this[_0x36b7('0x1b4')][_0x36b7('0x18e')])this['_scene'][_0x36b7('0x18e')][_0x36b7('0x52')]();if(this[_0x36b7('0x1b4')][_0x36b7('0x554')])this[_0x36b7('0x1b4')][_0x36b7('0x554')][_0x36b7('0x52')]();}}},SceneManager[_0x36b7('0x4be')]=function(){if($gameTemp[_0x36b7('0x41e')]()&&VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['QoL'][_0x36b7('0x5a4')]){if(_0x36b7('0x6f')!==_0x36b7('0x69'))$gameTemp[_0x36b7('0x3af')]=!$gameTemp[_0x36b7('0x3af')];else{function _0x3a19cb(){const _0xba7a2d=_0x36b7('0x3ac');this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this['_colorCache'][_0xba7a2d])return this[_0x36b7('0x217')][_0xba7a2d];const _0x15e949=_0x538386[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x201')];return this[_0x36b7('0x557')](_0xba7a2d,_0x15e949);}}}},SceneManager[_0x36b7('0x242')]=function(){this[_0x36b7('0x3f1')]=![],this[_0x36b7('0x1ce')]=!VisuMZ[_0x36b7('0x4d1')]['Settings']['UI'][_0x36b7('0x2c8')];},SceneManager[_0x36b7('0x503')]=function(_0x138f1a){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0x1d3')]&&(this[_0x36b7('0x3f1')]=_0x138f1a);},SceneManager[_0x36b7('0x1')]=function(){return this[_0x36b7('0x3f1')];},SceneManager['areButtonsHidden']=function(){return this[_0x36b7('0x1ce')];},SceneManager['areButtonsOutsideMainUI']=function(){return this[_0x36b7('0x560')]()||this[_0x36b7('0x1')]();},VisuMZ['CoreEngine'][_0x36b7('0x2a3')]=SceneManager[_0x36b7('0x488')],SceneManager[_0x36b7('0x488')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0x430')]?VisuMZ[_0x36b7('0x4d1')]['SceneManager_isGameActive'][_0x36b7('0x2f9')](this):!![];},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0xf')]=BattleManager[_0x36b7('0x3d9')],BattleManager[_0x36b7('0x3d9')]=function(){if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')]['EscapeAlways']){if(_0x36b7('0x55c')!==_0x36b7('0x55c')){function _0x3067b4(){return this['refresh']();}}else this[_0x36b7('0x3e8')]();}else return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0xf')][_0x36b7('0x2f9')](this);},BattleManager[_0x36b7('0x3e8')]=function(){return $gameParty[_0x36b7('0x586')](),SoundManager[_0x36b7('0x4ee')](),this['onEscapeSuccess'](),!![];},VisuMZ['CoreEngine'][_0x36b7('0xae')]=Game_Temp['prototype'][_0x36b7('0x4d2')],Game_Temp[_0x36b7('0x33c')][_0x36b7('0x4d2')]=function(){VisuMZ['CoreEngine']['Game_Temp_initialize'][_0x36b7('0x2f9')](this),this[_0x36b7('0x167')](),this[_0x36b7('0x16a')]();},Game_Temp[_0x36b7('0x33c')][_0x36b7('0x167')]=function(){if(VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x523')][_0x36b7('0x370')]){if(_0x36b7('0xe4')!==_0x36b7('0xe4')){function _0x55edbd(){for(const _0x296a41 of _0x38dbd6[_0x36b7('0xc8')]){const _0x3e8eea=new _0x213213(_0x296a41);this[_0x36b7('0x501')](_0x3e8eea);}}}else this[_0x36b7('0x293')]=![];}},Game_Temp['prototype']['createFauxAnimationQueue']=function(){this[_0x36b7('0x3e4')]=[];},Game_Temp['prototype']['requestFauxAnimation']=function(_0x387b05,_0x5120ac,_0x3e3c29,_0x5bed6c){if(!this[_0x36b7('0x3c3')]())return;_0x3e3c29=_0x3e3c29||![],_0x5bed6c=_0x5bed6c||![];if($dataAnimations[_0x5120ac]){const _0x5d8d1f={'targets':_0x387b05,'animationId':_0x5120ac,'mirror':_0x3e3c29,'mute':_0x5bed6c};this[_0x36b7('0x3e4')][_0x36b7('0x423')](_0x5d8d1f);for(const _0x34d7ab of _0x387b05){if(_0x36b7('0x4cb')===_0x36b7('0x4cb'))_0x34d7ab[_0x36b7('0x81')]&&_0x34d7ab[_0x36b7('0x81')]();else{function _0x4613a6(){if(_0x29344d[_0x36b7('0x41e')]())_0x2e46ff[_0x36b7('0x9e')](_0x2d21af);}}}}},Game_Temp[_0x36b7('0x33c')][_0x36b7('0x3c3')]=function(){return!![];},Game_Temp[_0x36b7('0x33c')][_0x36b7('0xbd')]=function(){return this[_0x36b7('0x3e4')][_0x36b7('0x3ab')]();},VisuMZ['CoreEngine'][_0x36b7('0x41a')]=Game_System[_0x36b7('0x33c')][_0x36b7('0x4d2')],Game_System[_0x36b7('0x33c')][_0x36b7('0x4d2')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x41a')]['call'](this),this[_0x36b7('0x391')]();},Game_System[_0x36b7('0x33c')][_0x36b7('0x391')]=function(){this[_0x36b7('0x1f6')]={'SideView':$dataSystem[_0x36b7('0x33e')],'TimeProgress':$dataSystem[_0x36b7('0x24e')],'FontSize':$dataSystem['advanced'][_0x36b7('0x18b')],'Padding':0xc};},Game_System[_0x36b7('0x33c')][_0x36b7('0xa')]=function(){if(this[_0x36b7('0x1f6')]===undefined)this[_0x36b7('0x391')]();if(this[_0x36b7('0x1f6')][_0x36b7('0x25f')]===undefined)this['initCoreEngine']();return this['_CoreEngineSettings'][_0x36b7('0x25f')];},Game_System[_0x36b7('0x33c')][_0x36b7('0x59c')]=function(_0x4c117e){if(this[_0x36b7('0x1f6')]===undefined)this['initCoreEngine']();if(this[_0x36b7('0x1f6')]['SideView']===undefined)this[_0x36b7('0x391')]();this['_CoreEngineSettings'][_0x36b7('0x25f')]=_0x4c117e;},Game_System[_0x36b7('0x33c')][_0x36b7('0x361')]=function(){if(this[_0x36b7('0x1f6')]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x36b7('0x456')]===undefined)this[_0x36b7('0x391')]();return this[_0x36b7('0x1f6')]['TimeProgress'];},Game_System[_0x36b7('0x33c')][_0x36b7('0x2fd')]=function(_0x3d86e3){if(this[_0x36b7('0x1f6')]===undefined)this['initCoreEngine']();if(this[_0x36b7('0x1f6')][_0x36b7('0x456')]===undefined)this[_0x36b7('0x391')]();this[_0x36b7('0x1f6')][_0x36b7('0x456')]=_0x3d86e3;},Game_System[_0x36b7('0x33c')]['mainFontSize']=function(){if(this[_0x36b7('0x1f6')]===undefined)this[_0x36b7('0x391')]();if(this[_0x36b7('0x1f6')][_0x36b7('0x60')]===undefined)this[_0x36b7('0x391')]();return this[_0x36b7('0x1f6')][_0x36b7('0x60')];},Game_System[_0x36b7('0x33c')][_0x36b7('0x5f')]=function(_0x3e79b5){if(this[_0x36b7('0x1f6')]===undefined)this[_0x36b7('0x391')]();if(this[_0x36b7('0x1f6')][_0x36b7('0x456')]===undefined)this[_0x36b7('0x391')]();this[_0x36b7('0x1f6')][_0x36b7('0x60')]=_0x3e79b5;},Game_System[_0x36b7('0x33c')][_0x36b7('0x4d0')]=function(){if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x36b7('0x215')]===undefined)this[_0x36b7('0x391')]();return this[_0x36b7('0x1f6')][_0x36b7('0x215')];},Game_System[_0x36b7('0x33c')][_0x36b7('0xfb')]=function(_0x5cb544){if(this['_CoreEngineSettings']===undefined)this[_0x36b7('0x391')]();if(this[_0x36b7('0x1f6')]['TimeProgress']===undefined)this['initCoreEngine']();this[_0x36b7('0x1f6')][_0x36b7('0x215')]=_0x5cb544;},Game_Picture[_0x36b7('0x33c')]['isMapScrollLinked']=function(){if($gameParty[_0x36b7('0x274')]())return![];return this[_0x36b7('0x176')]()&&this[_0x36b7('0x176')]()[_0x36b7('0xbc')](0x0)==='!';},VisuMZ['CoreEngine'][_0x36b7('0xd6')]=Game_Picture[_0x36b7('0x33c')]['x'],Game_Picture['prototype']['x']=function(){return this[_0x36b7('0x4cc')]()?this['xScrollLinkedOffset']():VisuMZ[_0x36b7('0x4d1')][_0x36b7('0xd6')][_0x36b7('0x2f9')](this);},Game_Picture[_0x36b7('0x33c')][_0x36b7('0x599')]=function(){const _0x38f457=$gameMap[_0x36b7('0x26')]()*$gameMap[_0x36b7('0xf5')]();return this['_x']-_0x38f457;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x315')]=Game_Picture[_0x36b7('0x33c')]['y'],Game_Picture[_0x36b7('0x33c')]['y']=function(){if(this[_0x36b7('0x4cc')]()){if('folTh'!==_0x36b7('0x3d8')){function _0x5463c9(){_0x1dc8af[_0x36b7('0x2fd')](!![]);}}else return this['yScrollLinkedOffset']();}else return VisuMZ['CoreEngine']['Game_Picture_y'][_0x36b7('0x2f9')](this);},Game_Picture[_0x36b7('0x33c')][_0x36b7('0x4e5')]=function(){const _0x4c3550=$gameMap[_0x36b7('0x206')]()*$gameMap[_0x36b7('0x3c5')]();return this['_y']-_0x4c3550;},Game_Picture[_0x36b7('0x33c')][_0x36b7('0x14a')]=function(_0x8a2bc2){this[_0x36b7('0x479')]=_0x8a2bc2;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x71')]=Game_Picture[_0x36b7('0x33c')]['calcEasing'],Game_Picture[_0x36b7('0x33c')][_0x36b7('0x285')]=function(_0x666b86){this[_0x36b7('0x479')]=this[_0x36b7('0x479')]||0x0;if([0x0,0x1,0x2,0x3]['includes'](this[_0x36b7('0x479')])){if(_0x36b7('0xcd')!==_0x36b7('0xcd')){function _0x42afa6(){this['_commandWindow'][_0x36b7('0x2aa')](_0x1bd263[_0x36b7('0x171')][_0x36b7('0x468')]);}}else return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x71')][_0x36b7('0x2f9')](this,_0x666b86);}else return VisuMZ[_0x36b7('0x227')](_0x666b86,this[_0x36b7('0x479')]);},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x138')]=Game_Action[_0x36b7('0x33c')]['itemHit'],Game_Action[_0x36b7('0x33c')][_0x36b7('0x38e')]=function(_0x466c26){return VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x523')][_0x36b7('0x460')]?this['itemHitImprovedAccuracy'](_0x466c26):VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x138')][_0x36b7('0x2f9')](this,_0x466c26);},Game_Action[_0x36b7('0x33c')][_0x36b7('0x239')]=function(_0x111f79){const _0x5a8645=this['itemSuccessRate'](_0x111f79),_0x359458=this[_0x36b7('0xed')](_0x111f79),_0x1284d8=this[_0x36b7('0x531')](_0x111f79);return _0x5a8645*(_0x359458-_0x1284d8);},VisuMZ['CoreEngine'][_0x36b7('0x13d')]=Game_Action['prototype'][_0x36b7('0x200')],Game_Action[_0x36b7('0x33c')][_0x36b7('0x200')]=function(_0x7a8446){return VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x523')]['ImprovedAccuracySystem']?0x0:VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x13d')][_0x36b7('0x2f9')](this,_0x7a8446);},Game_Action[_0x36b7('0x33c')]['itemSuccessRate']=function(_0x360723){return this['item']()[_0x36b7('0x1ac')]*0.01;},Game_Action[_0x36b7('0x33c')][_0x36b7('0xed')]=function(_0x27515e){if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0x190')]&&this[_0x36b7('0x240')]())return 0x1;if(this[_0x36b7('0x11d')]())return VisuMZ['CoreEngine'][_0x36b7('0x91')]['QoL']['AccuracyBoost']&&this[_0x36b7('0x112')]()['isActor']()?this[_0x36b7('0x112')]()[_0x36b7('0x150')]+0.05:this[_0x36b7('0x112')]()['hit'];else{if(_0x36b7('0x486')!==_0x36b7('0x1bc'))return 0x1;else{function _0x3a3352(){this['drawTextEx'](_0x54900b[_0x36b7('0x19b')](),_0x4889a6,_0x452aad,_0xa11ad3);}}}},Game_Action['prototype'][_0x36b7('0x531')]=function(_0x57f310){if(this[_0x36b7('0x112')]()[_0x36b7('0x360')]()===_0x57f310['isActor']())return 0x0;if(this[_0x36b7('0x11d')]()){if('eIQTO'===_0x36b7('0x57a')){if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')]['AccuracyBoost']&&_0x57f310[_0x36b7('0x1ca')]())return _0x57f310[_0x36b7('0x51f')]-0.05;else{if(_0x36b7('0x4fc')!=='neRCB'){function _0x303ebe(){if(_0x5b8a08[_0x36b7('0x4f9')]!==this[_0x36b7('0x4f9')]())return![];return _0x4c919a[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x3c6')]['ItemStyle'];}}else return _0x57f310[_0x36b7('0x51f')];}}else{function _0x54b152(){if(_0xf1e4e1[_0x36b7('0x31f')]==='')return![];if(_0x36aed5[_0x36b7('0x31f')]==='Subtitle')return![];if(_0x233685[_0x36b7('0x4a7')]==='')return![];if(_0x5b763b['version']===_0x36b7('0x110'))return![];return!![];}}}else return this[_0x36b7('0x1be')]()?_0x57f310[_0x36b7('0x83')]:0x0;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x17d')]=Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x121')],Game_BattlerBase[_0x36b7('0x33c')]['initMembers']=function(){this['_cache']={},VisuMZ[_0x36b7('0x4d1')]['Game_BattlerBase_initMembers']['call'](this);},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x463')]=Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x52')],Game_BattlerBase[_0x36b7('0x33c')]['refresh']=function(){this['_cache']={},VisuMZ[_0x36b7('0x4d1')]['Game_BattlerBase_refresh']['call'](this);},Game_BattlerBase[_0x36b7('0x33c')]['checkCacheKey']=function(_0x8909e0){return this[_0x36b7('0x4f7')]=this[_0x36b7('0x4f7')]||{},this[_0x36b7('0x4f7')][_0x8909e0]!==undefined;},Game_BattlerBase['prototype'][_0x36b7('0x51a')]=function(_0x5622e1){const _0x417a25=(_0x20e1f0,_0x526070)=>{if(!_0x526070)return _0x20e1f0;if(_0x526070[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x51a')][_0x5622e1])){var _0x1f2d0e=Number(RegExp['$1']);_0x20e1f0+=_0x1f2d0e;}if(_0x526070[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x2f0')][_0x5622e1])){var _0x2799e7=String(RegExp['$1']);try{_0x20e1f0+=eval(_0x2799e7);}catch(_0x31f28b){if('VAorU'!==_0x36b7('0x259')){if($gameTemp['isPlaytest']())console[_0x36b7('0x9e')](_0x31f28b);}else{function _0x3f9e5c(){this[_0x36b7('0xfa')]();const _0x182210=_0x13e0c4[_0x36b7('0xdc')][_0x36b7('0x582')],_0x8312fc=this[_0x36b7('0x38c')]();this[_0x36b7('0x1b3')]=new _0x42db10(_0x8312fc),this[_0x36b7('0x1b3')][_0x36b7('0x2aa')](_0x182210),this[_0x36b7('0x392')](this[_0x36b7('0x1b3')]);}}}}return _0x20e1f0;};return this[_0x36b7('0x2b1')]()['reduce'](_0x417a25,this['_paramPlus'][_0x5622e1]);},Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x224')]=function(_0x580975){var _0x39804b=_0x36b7('0x342')+(this[_0x36b7('0x360')]()?_0x36b7('0x415'):_0x36b7('0x336'))+_0x36b7('0x72')+_0x580975;if(this[_0x36b7('0x54e')](_0x39804b))return this[_0x36b7('0x4f7')][_0x39804b];this[_0x36b7('0x4f7')][_0x39804b]=eval(VisuMZ['CoreEngine']['Settings'][_0x36b7('0x23')][_0x39804b]);const _0x357fad=(_0x310f10,_0x265e11)=>{if(!_0x265e11)return _0x310f10;if(_0x265e11[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x224')][_0x580975])){var _0x161623=Number(RegExp['$1']);if(_0x161623===0x0)_0x161623=Number[_0x36b7('0x4d9')];_0x310f10=Math[_0x36b7('0x476')](_0x310f10,_0x161623);}if(_0x265e11['note'][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')]['RegExp'][_0x36b7('0x3fc')][_0x580975])){if(_0x36b7('0x16b')!=='uLkaC'){function _0x8c2bcc(){_0x478761[_0x36b7('0x252')]=_0x29bf63(_0x320050['$1']);if(_0x29b9e1[_0x36b7('0x252')]===0x0)_0x26c79[_0x36b7('0x252')]=_0x27bf57['MAX_SAFE_INTEGER'];}}else{var _0x402db8=String(RegExp['$1']);try{if(_0x36b7('0x4b1')!==_0x36b7('0x182'))_0x310f10=Math[_0x36b7('0x476')](_0x310f10,Number(eval(_0x402db8)));else{function _0xc9245b(){!this[_0x36b7('0x5b')]&&(this[_0x36b7('0x573')]+=_0x4d0940[_0x36b7('0x2ec')]((_0x25e67e[_0x36b7('0x4d6')]-0x270)/0x2),this[_0x36b7('0x573')]-=_0x48166d[_0x36b7('0x3ca')]((_0x4df497['height']-_0x5a596c['boxHeight'])/0x2),_0x477251[_0x36b7('0xa')]()?this[_0x36b7('0x173')]-=_0x2e0d8f[_0x36b7('0x3ca')]((_0x51f81c[_0x36b7('0x25c')]-_0x4d096b[_0x36b7('0x556')])/0x2):this[_0x36b7('0x173')]+=_0x2e2620[_0x36b7('0x2ec')]((_0x1cc866[_0x36b7('0x556')]-0x330)/0x2)),this[_0x36b7('0x5b')]=!![];}}}catch(_0x3de589){if(_0x36b7('0x44b')===_0x36b7('0x44b')){if($gameTemp[_0x36b7('0x41e')]())console[_0x36b7('0x9e')](_0x3de589);}else{function _0x58ad80(){const _0x18d5af=_0x466786[_0x36b7('0x58a')];if(_0x18d5af===0x1&&this[_0x36b7('0x112')]()[_0x36b7('0x3d5')]()!==0x1)this[_0x36b7('0x178')]();else _0x18d5af===0x2&&this[_0x36b7('0x112')]()[_0x36b7('0x427')]()!==0x2?this['setGuard']():this['setSkill'](_0x18d5af);}}}}}return _0x310f10;};if(this[_0x36b7('0x4f7')][_0x39804b]===0x0)this[_0x36b7('0x4f7')][_0x39804b]=Number[_0x36b7('0x4d9')];return this['_cache'][_0x39804b]=this[_0x36b7('0x2b1')]()[_0x36b7('0x29d')](_0x357fad,this[_0x36b7('0x4f7')][_0x39804b]),this[_0x36b7('0x4f7')][_0x39804b];},Game_BattlerBase[_0x36b7('0x33c')]['paramRate']=function(_0x46329e){const _0x5a91aa=this['traitsPi'](Game_BattlerBase[_0x36b7('0x403')],_0x46329e),_0x3e8e01=(_0x5094cd,_0xc9868d)=>{if(!_0xc9868d)return _0x5094cd;if(_0xc9868d[_0x36b7('0x52a')]['match'](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x56b')][_0x46329e])){if(_0x36b7('0x413')===_0x36b7('0x413')){var _0x898fe2=Number(RegExp['$1'])/0x64;_0x5094cd*=_0x898fe2;}else{function _0x74fb13(){_0x56b964[_0x36b7('0x41e')]()&&(_0x2fb205[_0x36b7('0x9e')](_0x36b7('0x5d')),_0x137e21[_0x36b7('0x9e')](_0x293b2e));}}}if(_0xc9868d[_0x36b7('0x52a')]['match'](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')]['paramRate2'][_0x46329e])){if(_0x36b7('0x4fe')===_0x36b7('0x4fe')){var _0x898fe2=Number(RegExp['$1']);_0x5094cd*=_0x898fe2;}else{function _0x1fa844(){for(const _0x239e5e of _0x1eb5c4[_0x36b7('0x492')]){if(_0x239e5e[_0x36b7('0x587')]['call'](this)){const _0x34f018=_0x239e5e[_0x36b7('0x8b')];let _0x4c8cf8=_0x239e5e[_0x36b7('0x44e')];if(['',_0x36b7('0x7e')][_0x36b7('0x592')](_0x4c8cf8))_0x4c8cf8=_0x239e5e[_0x36b7('0x1a7')][_0x36b7('0x2f9')](this);const _0x29936f=_0x239e5e[_0x36b7('0x232')]['call'](this),_0x579284=_0x239e5e[_0x36b7('0x2ad')][_0x36b7('0x2f9')](this);this[_0x36b7('0xb8')](_0x4c8cf8,_0x34f018,_0x29936f,_0x579284),this[_0x36b7('0x10c')](_0x34f018,_0x239e5e[_0x36b7('0x57d')][_0x36b7('0x1d7')](this,_0x579284));}}}}}if(_0xc9868d[_0x36b7('0x52a')]['match'](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x2d2')][_0x46329e])){var _0x54cfff=String(RegExp['$1']);try{_0x5094cd*=eval(_0x54cfff);}catch(_0x51449b){if($gameTemp[_0x36b7('0x41e')]())console[_0x36b7('0x9e')](_0x51449b);}}return _0x5094cd;};return this['traitObjects']()[_0x36b7('0x29d')](_0x3e8e01,_0x5a91aa);},Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x135')]=function(_0xf1e651){const _0x438b81=(_0x45db99,_0x2b9e5d)=>{if(!_0x2b9e5d)return _0x45db99;if(_0x2b9e5d[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ['CoreEngine'][_0x36b7('0x218')][_0x36b7('0x2d1')][_0xf1e651])){var _0x4f4837=Number(RegExp['$1']);_0x45db99+=_0x4f4837;}if(_0x2b9e5d[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x54c')][_0xf1e651])){var _0x529747=String(RegExp['$1']);try{_0x45db99+=eval(_0x529747);}catch(_0x55d130){if($gameTemp[_0x36b7('0x41e')]())console[_0x36b7('0x9e')](_0x55d130);}}return _0x45db99;};return this[_0x36b7('0x2b1')]()[_0x36b7('0x29d')](_0x438b81,0x0);},Game_BattlerBase['prototype'][_0x36b7('0x44a')]=function(_0x5d72b8){let _0x354acc=_0x36b7('0x44a')+_0x5d72b8+'Total';if(this[_0x36b7('0x54e')](_0x354acc))return this[_0x36b7('0x4f7')][_0x354acc];return this[_0x36b7('0x4f7')][_0x354acc]=Math[_0x36b7('0x2ec')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x23')][_0x36b7('0x55a')][_0x36b7('0x2f9')](this,_0x5d72b8)),this['_cache'][_0x354acc];},Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x27e')]=function(_0x1ba48a){const _0x4d15ea=(_0x3febfb,_0x36bb81)=>{if(_0x36b7('0x17c')!==_0x36b7('0x2ac')){if(!_0x36bb81)return _0x3febfb;if(_0x36bb81[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ['CoreEngine'][_0x36b7('0x218')][_0x36b7('0x48f')][_0x1ba48a])){var _0x162199=Number(RegExp['$1'])/0x64;_0x3febfb+=_0x162199;}if(_0x36bb81[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0xa4')][_0x1ba48a])){if(_0x36b7('0x54b')!==_0x36b7('0x38d')){var _0x162199=Number(RegExp['$1']);_0x3febfb+=_0x162199;}else{function _0x11d827(){return _0x410c2e[_0x36b7('0x4d1')][_0x36b7('0x91')]['ButtonAssist'][_0x36b7('0x6c')];}}}if(_0x36bb81[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')]['RegExp'][_0x36b7('0x2a5')][_0x1ba48a])){var _0x5151e8=String(RegExp['$1']);try{if(_0x36b7('0x133')==='MqXzE')_0x3febfb+=eval(_0x5151e8);else{function _0x30da2d(){return _0x36b7('0x16d');}}}catch(_0xc0efe3){if($gameTemp[_0x36b7('0x41e')]())console[_0x36b7('0x9e')](_0xc0efe3);}}return _0x3febfb;}else{function _0x59326f(){var _0x13ab38=_0x3ca04c(_0x24dcec['$1']);_0xff2b03*=_0x13ab38;}}};return this['traitObjects']()[_0x36b7('0x29d')](_0x4d15ea,0x0);},Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x179')]=function(_0xcc9ff5){const _0x4d7f7f=(_0x12e6bb,_0x3bba7c)=>{if(!_0x3bba7c)return _0x12e6bb;if(_0x3bba7c[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x2c0')][_0xcc9ff5])){var _0x5737cb=Number(RegExp['$1'])/0x64;_0x12e6bb*=_0x5737cb;}if(_0x3bba7c[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ['CoreEngine'][_0x36b7('0x218')][_0x36b7('0x125')][_0xcc9ff5])){var _0x5737cb=Number(RegExp['$1']);_0x12e6bb*=_0x5737cb;}if(_0x3bba7c[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x41b')][_0xcc9ff5])){var _0x283c50=String(RegExp['$1']);try{_0x12e6bb*=eval(_0x283c50);}catch(_0x32edd7){if($gameTemp[_0x36b7('0x41e')]())console[_0x36b7('0x9e')](_0x32edd7);}}return _0x12e6bb;};return this['traitObjects']()[_0x36b7('0x29d')](_0x4d7f7f,0x1);},Game_BattlerBase['prototype'][_0x36b7('0x191')]=function(_0x44b61c){const _0x4a31b3=(_0x34aeef,_0x488376)=>{if(_0x36b7('0x452')!==_0x36b7('0x484')){if(!_0x488376)return _0x34aeef;if(_0x488376[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x13e')][_0x44b61c])){if(_0x36b7('0x35d')!==_0x36b7('0x35d')){function _0x4b42a3(){this[_0x36b7('0x294')][_0x36b7('0x2aa')](_0x45c8c3['layoutSettings'][_0x36b7('0x3eb')]);}}else{var _0x321f5e=Number(RegExp['$1'])/0x64;_0x34aeef+=_0x321f5e;}}if(_0x488376[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ['CoreEngine'][_0x36b7('0x218')]['xparamFlat2'][_0x44b61c])){var _0x321f5e=Number(RegExp['$1']);_0x34aeef+=_0x321f5e;}if(_0x488376[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')]['RegExp'][_0x36b7('0x449')][_0x44b61c])){var _0x5c8793=String(RegExp['$1']);try{_0x34aeef+=eval(_0x5c8793);}catch(_0x7a32a4){if(_0x36b7('0x414')!==_0x36b7('0x414')){function _0x31718c(){this[_0x36b7('0x229')](_0x428a3f,_0x403f84,_0x31de5e,_0x4517e0,_0x36b7('0x3b5'));}}else{if($gameTemp['isPlaytest']())console[_0x36b7('0x9e')](_0x7a32a4);}}}return _0x34aeef;}else{function _0x407b06(){if(this[_0x36b7('0x1fb')]())_0x3a791d=_0x132efc['GroupDigits'](_0x465e14);_0x242bdc[_0x36b7('0x4d1')][_0x36b7('0x457')][_0x36b7('0x2f9')](this,_0x1248dd,_0xc0f9f1,_0x562c3b,_0x3b9610,_0x43ca10);}}};return this['traitObjects']()[_0x36b7('0x29d')](_0x4a31b3,0x0);},Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x31c')]=function(_0x4d4e69){let _0x285f91='xparam'+_0x4d4e69+_0x36b7('0xf0');if(this[_0x36b7('0x54e')](_0x285f91))return this[_0x36b7('0x4f7')][_0x285f91];return this[_0x36b7('0x4f7')][_0x285f91]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x23')][_0x36b7('0x45a')]['call'](this,_0x4d4e69),this[_0x36b7('0x4f7')][_0x285f91];},Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x493')]=function(_0x2156c0){const _0x238a35=(_0x17a680,_0x5d018b)=>{if(!_0x5d018b)return _0x17a680;if(_0x5d018b['note'][_0x36b7('0x328')](VisuMZ['CoreEngine']['RegExp'][_0x36b7('0x416')][_0x2156c0])){var _0x7270ff=Number(RegExp['$1'])/0x64;_0x17a680+=_0x7270ff;}if(_0x5d018b[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x574')][_0x2156c0])){if('LmVYb'===_0x36b7('0xa6')){function _0x1d0fb6(){return _0x21a4c6[_0x36b7('0x51f')];}}else{var _0x7270ff=Number(RegExp['$1']);_0x17a680+=_0x7270ff;}}if(_0x5d018b[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x3ef')][_0x2156c0])){var _0x3f2a07=String(RegExp['$1']);try{_0x17a680+=eval(_0x3f2a07);}catch(_0x56aba2){if(_0x36b7('0x408')!==_0x36b7('0x1d4')){if($gameTemp[_0x36b7('0x41e')]())console[_0x36b7('0x9e')](_0x56aba2);}else{function _0xb85f18(){_0x48e189[_0x36b7('0x4d1')]['Game_System_initialize'][_0x36b7('0x2f9')](this),this[_0x36b7('0x391')]();}}}}return _0x17a680;};return this[_0x36b7('0x2b1')]()[_0x36b7('0x29d')](_0x238a35,0x0);},Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x28f')]=function(_0x58cb62){const _0x18f930=(_0x1e6404,_0x381a5e)=>{if(!_0x381a5e)return _0x1e6404;if(_0x381a5e[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x2f4')][_0x58cb62])){var _0x38c050=Number(RegExp['$1'])/0x64;_0x1e6404*=_0x38c050;}if(_0x381a5e['note'][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')]['RegExp'][_0x36b7('0x21d')][_0x58cb62])){var _0x38c050=Number(RegExp['$1']);_0x1e6404*=_0x38c050;}if(_0x381a5e['note'][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x139')][_0x58cb62])){var _0x2874ee=String(RegExp['$1']);try{_0x1e6404*=eval(_0x2874ee);}catch(_0x28659b){if($gameTemp[_0x36b7('0x41e')]())console[_0x36b7('0x9e')](_0x28659b);}}return _0x1e6404;};return this[_0x36b7('0x2b1')]()[_0x36b7('0x29d')](_0x18f930,0x1);},Game_BattlerBase['prototype']['sparamFlatBonus']=function(_0x522b81){const _0x429399=(_0x4a4bcc,_0x34d1b1)=>{if(_0x36b7('0x3b9')!==_0x36b7('0x3b9')){function _0x2cbee3(){const _0x40b9db=_0x36b7('0x397');this[_0x36b7('0x217')]=this[_0x36b7('0x217')]||{};if(this[_0x36b7('0x217')][_0x40b9db])return this['_colorCache'][_0x40b9db];const _0x1b5aa7=_0x529cd6['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x1fc')];return this['getColorDataFromPluginParameters'](_0x40b9db,_0x1b5aa7);}}else{if(!_0x34d1b1)return _0x4a4bcc;if(_0x34d1b1[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')]['RegExp']['sparamFlat1'][_0x522b81])){if('afxlg'!=='zWEwV'){var _0x5ce65f=Number(RegExp['$1'])/0x64;_0x4a4bcc+=_0x5ce65f;}else{function _0x300f1d(){for(const _0xd4c60c of _0x26b710['learnings']){_0xd4c60c[_0x36b7('0x52a')][_0x36b7('0x328')](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0xd4c60c[_0x36b7('0x4c0')]=_0x369439[_0x36b7('0x476')](_0x1b8442(_0x4852a6['$1']),0x1));}}}}if(_0x34d1b1[_0x36b7('0x52a')]['match'](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')][_0x36b7('0x260')][_0x522b81])){var _0x5ce65f=Number(RegExp['$1']);_0x4a4bcc+=_0x5ce65f;}if(_0x34d1b1[_0x36b7('0x52a')][_0x36b7('0x328')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x218')]['sparamFlatJS'][_0x522b81])){if(_0x36b7('0x509')!==_0x36b7('0x509')){function _0x345c98(){this[_0x36b7('0x1a8')](_0x241691[_0x36b7('0x476')](this[_0x36b7('0xa2')](),this[_0x36b7('0x12d')]()-0x1));}}else{var _0x422a5e=String(RegExp['$1']);try{_0x4a4bcc+=eval(_0x422a5e);}catch(_0x130ab2){if($gameTemp[_0x36b7('0x41e')]())console[_0x36b7('0x9e')](_0x130ab2);}}}return _0x4a4bcc;}};return this[_0x36b7('0x2b1')]()[_0x36b7('0x29d')](_0x429399,0x0);},Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x30a')]=function(_0x57cb2d){let _0x51fe6c='sparam'+_0x57cb2d+'Total';if(this['checkCacheKey'](_0x51fe6c))return this[_0x36b7('0x4f7')][_0x51fe6c];return this[_0x36b7('0x4f7')][_0x51fe6c]=VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x23')][_0x36b7('0x127')]['call'](this,_0x57cb2d),this[_0x36b7('0x4f7')][_0x51fe6c];},Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x538')]=function(_0x4b84ba,_0x550fb1){if(typeof paramId===_0x36b7('0x2d6'))return this[_0x36b7('0x44a')](_0x4b84ba);_0x4b84ba=String(_0x4b84ba||'')[_0x36b7('0x3fb')]();if(_0x4b84ba===_0x36b7('0x5a9'))return this[_0x36b7('0x44a')](0x0);if(_0x4b84ba===_0x36b7('0x63'))return this[_0x36b7('0x44a')](0x1);if(_0x4b84ba===_0x36b7('0x37e'))return this[_0x36b7('0x44a')](0x2);if(_0x4b84ba===_0x36b7('0x1e7'))return this[_0x36b7('0x44a')](0x3);if(_0x4b84ba===_0x36b7('0x1d2'))return this[_0x36b7('0x44a')](0x4);if(_0x4b84ba==='MDF')return this[_0x36b7('0x44a')](0x5);if(_0x4b84ba===_0x36b7('0x23b'))return this[_0x36b7('0x44a')](0x6);if(_0x4b84ba===_0x36b7('0x11b'))return this[_0x36b7('0x44a')](0x7);if(_0x4b84ba===_0x36b7('0x1f'))return _0x550fb1?String(Math[_0x36b7('0x2ec')](this['xparam'](0x0)*0x64))+'%':this[_0x36b7('0x31c')](0x0);if(_0x4b84ba===_0x36b7('0x276'))return _0x550fb1?String(Math[_0x36b7('0x2ec')](this[_0x36b7('0x31c')](0x1)*0x64))+'%':this[_0x36b7('0x31c')](0x1);if(_0x4b84ba===_0x36b7('0x22b'))return _0x550fb1?String(Math['round'](this['xparam'](0x2)*0x64))+'%':this[_0x36b7('0x31c')](0x2);if(_0x4b84ba===_0x36b7('0x337'))return _0x550fb1?String(Math[_0x36b7('0x2ec')](this[_0x36b7('0x31c')](0x3)*0x64))+'%':this[_0x36b7('0x31c')](0x3);if(_0x4b84ba===_0x36b7('0x271'))return _0x550fb1?String(Math[_0x36b7('0x2ec')](this[_0x36b7('0x31c')](0x4)*0x64))+'%':this[_0x36b7('0x31c')](0x4);if(_0x4b84ba===_0x36b7('0x188'))return _0x550fb1?String(Math['round'](this[_0x36b7('0x31c')](0x5)*0x64))+'%':this[_0x36b7('0x31c')](0x5);if(_0x4b84ba===_0x36b7('0x73'))return _0x550fb1?String(Math[_0x36b7('0x2ec')](this[_0x36b7('0x31c')](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x4b84ba===_0x36b7('0x5c'))return _0x550fb1?String(Math[_0x36b7('0x2ec')](this['xparam'](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x4b84ba==='MRG')return _0x550fb1?String(Math[_0x36b7('0x2ec')](this[_0x36b7('0x31c')](0x8)*0x64))+'%':this[_0x36b7('0x31c')](0x8);if(_0x4b84ba===_0x36b7('0x114'))return _0x550fb1?String(Math[_0x36b7('0x2ec')](this[_0x36b7('0x31c')](0x9)*0x64))+'%':this[_0x36b7('0x31c')](0x9);if(_0x4b84ba==='TGR')return _0x550fb1?String(Math[_0x36b7('0x2ec')](this[_0x36b7('0x30a')](0x0)*0x64))+'%':this[_0x36b7('0x30a')](0x0);if(_0x4b84ba===_0x36b7('0x3e6'))return _0x550fb1?String(Math[_0x36b7('0x2ec')](this[_0x36b7('0x30a')](0x1)*0x64))+'%':this[_0x36b7('0x30a')](0x1);if(_0x4b84ba==='REC')return _0x550fb1?String(Math[_0x36b7('0x2ec')](this[_0x36b7('0x30a')](0x2)*0x64))+'%':this[_0x36b7('0x30a')](0x2);if(_0x4b84ba===_0x36b7('0x44'))return _0x550fb1?String(Math['round'](this[_0x36b7('0x30a')](0x3)*0x64))+'%':this[_0x36b7('0x30a')](0x3);if(_0x4b84ba===_0x36b7('0x3f9'))return _0x550fb1?String(Math[_0x36b7('0x2ec')](this['sparam'](0x4)*0x64))+'%':this[_0x36b7('0x30a')](0x4);if(_0x4b84ba==='TCR')return _0x550fb1?String(Math['round'](this[_0x36b7('0x30a')](0x5)*0x64))+'%':this[_0x36b7('0x30a')](0x5);if(_0x4b84ba===_0x36b7('0x41d'))return _0x550fb1?String(Math[_0x36b7('0x2ec')](this['sparam'](0x6)*0x64))+'%':this[_0x36b7('0x30a')](0x6);if(_0x4b84ba===_0x36b7('0x7b'))return _0x550fb1?String(Math[_0x36b7('0x2ec')](this[_0x36b7('0x30a')](0x7)*0x64))+'%':this[_0x36b7('0x30a')](0x7);if(_0x4b84ba===_0x36b7('0xde'))return _0x550fb1?String(Math['round'](this['sparam'](0x8)*0x64))+'%':this[_0x36b7('0x30a')](0x8);if(_0x4b84ba===_0x36b7('0x35f'))return _0x550fb1?String(Math['round'](this[_0x36b7('0x30a')](0x9)*0x64))+'%':this[_0x36b7('0x30a')](0x9);return'';},Game_BattlerBase[_0x36b7('0x33c')][_0x36b7('0x4bb')]=function(){return this[_0x36b7('0x383')]()&&this[_0x36b7('0x330')]<this[_0x36b7('0x12')]*VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x23')][_0x36b7('0x2e')];},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x14c')]=Game_Actor[_0x36b7('0x33c')][_0x36b7('0x3a9')],Game_Actor['prototype'][_0x36b7('0x3a9')]=function(_0x13a2be){if(this[_0x36b7('0x4c0')]>0x63)return this[_0x36b7('0xf1')](_0x13a2be);return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x14c')]['call'](this,_0x13a2be);},Game_Actor['prototype'][_0x36b7('0xf1')]=function(_0x17b986){const _0x1a59cc=this['currentClass']()[_0x36b7('0x3fe')][_0x17b986][0x63],_0x26611d=this[_0x36b7('0xea')]()[_0x36b7('0x3fe')][_0x17b986][0x62];return _0x1a59cc+(_0x1a59cc-_0x26611d)*(this['level']-0x63);},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x151')]=Game_Actor[_0x36b7('0x33c')][_0x36b7('0x3dd')],Game_Actor[_0x36b7('0x33c')][_0x36b7('0x3dd')]=function(_0x30c6b4,_0x46a31e){$gameTemp[_0x36b7('0x27d')]=!![],VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x151')][_0x36b7('0x2f9')](this,_0x30c6b4,_0x46a31e),$gameTemp[_0x36b7('0x27d')]=undefined;},VisuMZ['CoreEngine'][_0x36b7('0x28')]=Game_Actor['prototype']['levelUp'],Game_Actor['prototype'][_0x36b7('0x2b4')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x28')][_0x36b7('0x2f9')](this);if(!$gameTemp['_changingClass'])this['levelUpRecovery']();},Game_Actor[_0x36b7('0x33c')][_0x36b7('0x4ec')]=function(){this[_0x36b7('0x4f7')]={};if(VisuMZ['CoreEngine']['Settings'][_0x36b7('0x523')][_0x36b7('0x365')])this[_0x36b7('0x330')]=this['mhp'];if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['QoL'][_0x36b7('0x4da')])this[_0x36b7('0x272')]=this['mmp'];},Game_Actor[_0x36b7('0x33c')][_0x36b7('0x59')]=function(){if(this[_0x36b7('0x27b')]())return 0x1;const _0x460df2=this['nextLevelExp']()-this[_0x36b7('0x29f')](),_0x274e4a=this['currentExp']()-this[_0x36b7('0x29f')]();return(_0x274e4a/_0x460df2)[_0x36b7('0x323')](0x0,0x1);},Game_Actor[_0x36b7('0x33c')]['traitObjects']=function(){const _0xb959b8=Game_Battler[_0x36b7('0x33c')][_0x36b7('0x2b1')][_0x36b7('0x2f9')](this);for(const _0x75db3e of this[_0x36b7('0x54d')]()){_0x75db3e&&_0xb959b8['push'](_0x75db3e);}return _0xb959b8[_0x36b7('0x423')](this['currentClass'](),this[_0x36b7('0x500')]()),_0xb959b8;},Object['defineProperty'](Game_Enemy[_0x36b7('0x33c')],_0x36b7('0x4c0'),{'get':function(){return this[_0x36b7('0x5')]();},'configurable':!![]}),Game_Enemy[_0x36b7('0x33c')][_0x36b7('0x5')]=function(){return this[_0x36b7('0x2fb')]()[_0x36b7('0x4c0')];},Game_Enemy[_0x36b7('0x33c')][_0x36b7('0x56d')]=function(){if(!this[_0x36b7('0x5b')]){this[_0x36b7('0x573')]+=Math[_0x36b7('0x2ec')]((Graphics[_0x36b7('0x4d6')]-0x270)/0x2),this[_0x36b7('0x573')]-=Math[_0x36b7('0x3ca')]((Graphics[_0x36b7('0x4d6')]-Graphics[_0x36b7('0x4ea')])/0x2);if($gameSystem[_0x36b7('0xa')]()){if(_0x36b7('0x2ca')==='LdWnC')this[_0x36b7('0x173')]-=Math[_0x36b7('0x3ca')]((Graphics[_0x36b7('0x25c')]-Graphics[_0x36b7('0x556')])/0x2);else{function _0x15ff3a(){if(_0x3a6894)this['onKeyDownKeysF6F7'](_0x556933);_0x54dc20[_0x36b7('0x4d1')][_0x36b7('0xff')][_0x36b7('0x2f9')](this,_0x196904);}}}else this[_0x36b7('0x173')]+=Math[_0x36b7('0x2ec')]((Graphics[_0x36b7('0x556')]-0x330)/0x2);}this[_0x36b7('0x5b')]=!![];},Game_Party[_0x36b7('0x33c')]['maxGold']=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x3c6')][_0x36b7('0x233')];},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x17f')]=Game_Party['prototype'][_0x36b7('0x366')],Game_Party[_0x36b7('0x33c')][_0x36b7('0x366')]=function(_0x2747be){if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0xb2')]&&DataManager[_0x36b7('0x471')](_0x2747be))return;VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x17f')][_0x36b7('0x2f9')](this,_0x2747be);},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x2f')]=Game_Map[_0x36b7('0x33c')][_0x36b7('0x4e3')],Game_Map[_0x36b7('0x33c')][_0x36b7('0x4e3')]=function(_0x26563e){VisuMZ['CoreEngine'][_0x36b7('0x2f')][_0x36b7('0x2f9')](this,_0x26563e),this[_0x36b7('0x58e')](_0x26563e);},Game_Map[_0x36b7('0x33c')][_0x36b7('0x58e')]=function(){this[_0x36b7('0x2b0')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['QoL'][_0x36b7('0x350')]||![];if($dataMap&&$dataMap['note']){if(_0x36b7('0x103')!==_0x36b7('0x103')){function _0x5436e7(){for(const _0x54d84b of this[_0x36b7('0x1a3')]){!_0x54d84b[_0x36b7('0x3b2')]()&&this['removeFauxAnimation'](_0x54d84b);}this[_0x36b7('0x25b')]();}}else{if($dataMap[_0x36b7('0x52a')][_0x36b7('0x328')](/<SHOW TILE SHADOWS>/i))this[_0x36b7('0x2b0')]=![];if($dataMap['note'][_0x36b7('0x328')](/<HIDE TILE SHADOWS>/i))this[_0x36b7('0x2b0')]=!![];}}},Game_Map[_0x36b7('0x33c')]['areTileShadowsHidden']=function(){if(this[_0x36b7('0x2b0')]===undefined)this[_0x36b7('0x58e')]();return this[_0x36b7('0x2b0')];},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x525')]=Game_Character[_0x36b7('0x33c')]['processMoveCommand'],Game_Character[_0x36b7('0x33c')][_0x36b7('0x497')]=function(_0x43e990){try{if(_0x36b7('0x164')!==_0x36b7('0x551'))VisuMZ['CoreEngine'][_0x36b7('0x525')][_0x36b7('0x2f9')](this,_0x43e990);else{function _0x54f5e8(){_0x398cb0+=_0x21ac69(_0x2f7894);}}}catch(_0x39bb13){if($gameTemp[_0x36b7('0x41e')]())console[_0x36b7('0x9e')](_0x39bb13);}},Game_Player[_0x36b7('0x33c')][_0x36b7('0x6')]=function(){const _0x10ea17=$gameMap[_0x36b7('0x1e5')]();this[_0x36b7('0x3df')]=Math['randomInt'](_0x10ea17)+Math[_0x36b7('0x247')](_0x10ea17)+this[_0x36b7('0x30')]();},Game_Player[_0x36b7('0x33c')][_0x36b7('0x30')]=function(){if($dataMap&&$dataMap[_0x36b7('0x52a')]&&$dataMap[_0x36b7('0x52a')][_0x36b7('0x328')](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if(_0x36b7('0x4c9')==='NHvTJ')return Number(RegExp['$1']);else{function _0x234864(){return _0x564895;}}}else{if(_0x36b7('0x4cd')==='HDGPM')return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0x467')];else{function _0x1af5b4(){return _0x5f5097[_0x36b7('0x4d1')][_0x36b7('0x71')][_0x36b7('0x2f9')](this,_0x47b8d5);}}}},VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents']=Game_Event[_0x36b7('0x33c')][_0x36b7('0x510')],Game_Event[_0x36b7('0x33c')][_0x36b7('0x510')]=function(_0x495908,_0x3fb0db){return this[_0x36b7('0x23a')]()?this[_0x36b7('0xef')](_0x495908,_0x3fb0db):VisuMZ[_0x36b7('0x4d1')][_0x36b7('0xc7')][_0x36b7('0x2f9')](this,_0x495908,_0x3fb0db);},Game_Event[_0x36b7('0x33c')][_0x36b7('0x23a')]=function(){return VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x523')]['SmartEventCollisionPriority'];},Game_Event[_0x36b7('0x33c')][_0x36b7('0xef')]=function(_0x5ce1d6,_0x2ea9ba){if(!this[_0x36b7('0x4dc')]())return![];else{const _0x4526e2=$gameMap[_0x36b7('0x183')](_0x5ce1d6,_0x2ea9ba)[_0x36b7('0xd8')](_0x30a62f=>_0x30a62f[_0x36b7('0x4dc')]());return _0x4526e2[_0x36b7('0x1d6')]>0x0;}},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x433')]=Game_Interpreter[_0x36b7('0x33c')]['command111'],Game_Interpreter[_0x36b7('0x33c')][_0x36b7('0x203')]=function(_0x13202c){try{VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x433')][_0x36b7('0x2f9')](this,_0x13202c);}catch(_0x3b3462){if(_0x36b7('0x362')===_0x36b7('0x362')){if($gameTemp[_0x36b7('0x41e')]()){if(_0x36b7('0x3a6')!==_0x36b7('0x50e'))console[_0x36b7('0x9e')](_0x36b7('0x13b')),console[_0x36b7('0x9e')](_0x3b3462);else{function _0x4a11e5(){return _0x3e3d0b['eva']-0.05;}}}this[_0x36b7('0x4de')]();}else{function _0x300df1(){let _0x201e9b=_0x36b7('0x44a')+_0x44c8a3+_0x36b7('0xf0');if(this[_0x36b7('0x54e')](_0x201e9b))return this[_0x36b7('0x4f7')][_0x201e9b];return this[_0x36b7('0x4f7')][_0x201e9b]=_0x38ff80[_0x36b7('0x2ec')](_0x34fd37[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x23')][_0x36b7('0x55a')][_0x36b7('0x2f9')](this,_0x25fa9f)),this[_0x36b7('0x4f7')][_0x201e9b];}}}return!![];},VisuMZ[_0x36b7('0x4d1')]['Game_Interpreter_command122']=Game_Interpreter['prototype'][_0x36b7('0x340')],Game_Interpreter['prototype'][_0x36b7('0x340')]=function(_0x2ec506){try{VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x54')][_0x36b7('0x2f9')](this,_0x2ec506);}catch(_0x361917){if($gameTemp[_0x36b7('0x41e')]()){if(_0x36b7('0x1d9')===_0x36b7('0x1d9'))console[_0x36b7('0x9e')](_0x36b7('0x15')),console[_0x36b7('0x9e')](_0x361917);else{function _0x3daaf2(){_0x153d11['seVolume']!==0x0?(_0x3df9d2[_0x36b7('0x220')]=0x0,_0xdb31bc[_0x36b7('0x1b0')]=0x0,_0x3765ef[_0x36b7('0x21b')]=0x0,_0x2bfbe7[_0x36b7('0x2db')]=0x0):(_0x6733b3[_0x36b7('0x220')]=0x64,_0x5e1399[_0x36b7('0x1b0')]=0x64,_0x51d80d[_0x36b7('0x21b')]=0x64,_0x282ebd['seVolume']=0x64);_0x2ff88d[_0x36b7('0x543')]();if(this[_0x36b7('0x1b4')][_0x36b7('0xe6')]===_0x47d911){if(this['_scene'][_0x36b7('0x18e')])this[_0x36b7('0x1b4')]['_optionsWindow'][_0x36b7('0x52')]();if(this[_0x36b7('0x1b4')][_0x36b7('0x554')])this[_0x36b7('0x1b4')][_0x36b7('0x554')][_0x36b7('0x52')]();}}}}}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command355']=Game_Interpreter['prototype'][_0x36b7('0x15d')],Game_Interpreter[_0x36b7('0x33c')][_0x36b7('0x15d')]=function(){try{VisuMZ['CoreEngine'][_0x36b7('0x473')][_0x36b7('0x2f9')](this);}catch(_0x5d99fe){if(_0x36b7('0x55d')!==_0x36b7('0x55d')){function _0x4fd272(){for(const _0x508587 of this[_0x36b7('0x1a3')]){this[_0x36b7('0x2d3')](_0x508587);}}}else{if($gameTemp[_0x36b7('0x41e')]()){if(_0x36b7('0x558')===_0x36b7('0x25a')){function _0x44a1c7(){return this[_0x36b7('0x112')]()[_0x36b7('0x150')];}}else console[_0x36b7('0x9e')](_0x36b7('0x5d')),console[_0x36b7('0x9e')](_0x5d99fe);}}}return!![];},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x567')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0x244')];},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x542')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0x1fd')];},Scene_Base[_0x36b7('0x33c')]['isBottomButtonMode']=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0x1bb')];},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x10b')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0xc4')];},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x438')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0x296')];},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x2de')]=function(){return VisuMZ['CoreEngine'][_0x36b7('0x91')]['UI']['ButtonHeight'];},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x61')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x464')][_0x36b7('0x329')];},VisuMZ[_0x36b7('0x4d1')]['Scene_Base_createWindowLayer']=Scene_Base[_0x36b7('0x33c')][_0x36b7('0x2d8')],Scene_Base[_0x36b7('0x33c')]['createWindowLayer']=function(){VisuMZ['CoreEngine']['Scene_Base_createWindowLayer']['call'](this),this[_0x36b7('0x198')]();},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x198')]=function(){},Scene_Base['prototype'][_0x36b7('0x202')]=function(){return TextManager[_0x36b7('0x2e7')](_0x36b7('0x92'),'pagedown');},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x533')]=function(){return TextManager[_0x36b7('0xf2')](_0x36b7('0x45'));},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x2a9')]=function(){return TextManager['getInputButtonString'](_0x36b7('0x3ab'));},Scene_Base[_0x36b7('0x33c')]['buttonAssistKey4']=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x568')]=function(){return TextManager[_0x36b7('0xf2')](_0x36b7('0x371'));},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x4d3')]=function(){return this[_0x36b7('0x18')]&&this[_0x36b7('0x18')]['visible']?TextManager['buttonAssistSwitch']:'';},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x1e0')]=function(){return'';},Scene_Base['prototype'][_0x36b7('0x78')]=function(){return'';},Scene_Base[_0x36b7('0x33c')]['buttonAssistText4']=function(){return TextManager[_0x36b7('0x20f')];},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x2c')]=function(){return TextManager[_0x36b7('0x2be')];},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x23e')]=function(){return 0x0;},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x88')]=function(){return 0x0;},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x4bd')]=function(){return 0x0;},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x431')]=function(){return 0x0;},Scene_Base[_0x36b7('0x33c')][_0x36b7('0x42b')]=function(){return 0x0;},VisuMZ['CoreEngine']['Scene_Boot_loadSystemImages']=Scene_Boot[_0x36b7('0x33c')]['loadSystemImages'],Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x3e')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x35')][_0x36b7('0x2f9')](this),this[_0x36b7('0x374')]();},Scene_Boot[_0x36b7('0x33c')]['loadGameImagesCoreEngine']=function(){const _0x248a7a=[_0x36b7('0x4f0'),_0x36b7('0x7a'),'battlebacks2',_0x36b7('0x465'),_0x36b7('0x512'),_0x36b7('0x42f'),'parallaxes',_0x36b7('0x489'),_0x36b7('0x1ed'),_0x36b7('0xb3'),_0x36b7('0x18c'),_0x36b7('0x4c1'),_0x36b7('0x355'),_0x36b7('0x395')];for(const _0x2b41d4 of _0x248a7a){const _0xe7fcc3=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['ImgLoad'][_0x2b41d4],_0x2c2479=_0x36b7('0x422')[_0x36b7('0x4b0')](_0x2b41d4);for(const _0xf9f65a of _0xe7fcc3){ImageManager[_0x36b7('0x2a0')](_0x2c2479,_0xf9f65a);}}},VisuMZ[_0x36b7('0x4d1')]['Scene_Boot_startNormalGame']=Scene_Boot['prototype'][_0x36b7('0x130')],Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x130')]=function(){if(Utils[_0x36b7('0xb4')]('test')&&VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0x23f')])this[_0x36b7('0x3bd')]();else{if(_0x36b7('0x277')!==_0x36b7('0x424'))VisuMZ['CoreEngine'][_0x36b7('0x30b')]['call'](this);else{function _0x57b023(){this['_digitGrouping']=_0x4c85da['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x523')]['DigitGroupingStandardText'],this[_0x36b7('0x2ba')]=_0x2d6d49[_0x36b7('0x4d1')][_0x36b7('0x91')]['QoL'][_0x36b7('0x526')];}}}},Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x3bd')]=function(){DataManager[_0x36b7('0x316')](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x2fc')]=function(){const _0x4b9234=$dataSystem[_0x36b7('0x1b7')]['uiAreaWidth'],_0x55aa26=$dataSystem[_0x36b7('0x1b7')][_0x36b7('0x550')],_0x620013=VisuMZ['CoreEngine'][_0x36b7('0x91')]['UI']['BoxMargin'];Graphics['boxWidth']=_0x4b9234-_0x620013*0x2,Graphics['boxHeight']=_0x55aa26-_0x620013*0x2,this[_0x36b7('0xdf')]();},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x4f1')]=Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x3a1')],Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x3a1')]=function(){this[_0x36b7('0x314')]()?this['makeDocumentTitle']():VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x4f1')][_0x36b7('0x2f9')](this);},Scene_Boot['prototype']['isFullDocumentTitle']=function(){if(Scene_Title[_0x36b7('0x31f')]==='')return![];if(Scene_Title['subtitle']===_0x36b7('0x11'))return![];if(Scene_Title[_0x36b7('0x4a7')]==='')return![];if(Scene_Title[_0x36b7('0x4a7')]===_0x36b7('0x110'))return![];return!![];},Scene_Boot[_0x36b7('0x33c')][_0x36b7('0x2f8')]=function(){const _0x3e098a=$dataSystem[_0x36b7('0x49e')],_0x484fc7=Scene_Title['subtitle']||'',_0x44459b=Scene_Title[_0x36b7('0x4a7')]||'',_0x180346=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x236')]['DocumentTitleFmt'],_0x24b16f=_0x180346[_0x36b7('0x4b0')](_0x3e098a,_0x484fc7,_0x44459b);document[_0x36b7('0x1da')]=_0x24b16f;},Scene_Boot['prototype']['determineSideButtonLayoutValid']=function(){if(VisuMZ['CoreEngine'][_0x36b7('0x91')]['UI'][_0x36b7('0x1d3')]){const _0x38b880=Graphics[_0x36b7('0x25c')]-Graphics['boxWidth']-VisuMZ[_0x36b7('0x4d1')]['Settings']['UI']['BoxMargin']*0x2,_0x498bc2=Sprite_Button[_0x36b7('0x33c')]['blockWidth'][_0x36b7('0x2f9')](this)*0x4;if(_0x38b880>=_0x498bc2)SceneManager[_0x36b7('0x503')](!![]);}},Scene_Title['subtitle']=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x236')][_0x36b7('0x11')],Scene_Title[_0x36b7('0x4a7')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x236')][_0x36b7('0x598')],Scene_Title[_0x36b7('0xc8')]=VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x4ce')]['Title'][_0x36b7('0x52d')],VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x2e6')]=Scene_Title['prototype'][_0x36b7('0x1dc')],Scene_Title['prototype'][_0x36b7('0x1dc')]=function(){VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x4ce')][_0x36b7('0x236')][_0x36b7('0x1dc')]['call'](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x36b7('0x31f')]!=='Subtitle')this[_0x36b7('0x596')]();if(Scene_Title['version']!==''&&Scene_Title[_0x36b7('0x4a7')]!==_0x36b7('0x110'))this['drawGameVersion']();},Scene_Title[_0x36b7('0x33c')]['drawGameSubtitle']=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['MenuLayout'][_0x36b7('0x236')][_0x36b7('0x596')][_0x36b7('0x2f9')](this);},Scene_Title[_0x36b7('0x33c')][_0x36b7('0x394')]=function(){VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x4ce')][_0x36b7('0x236')][_0x36b7('0x394')][_0x36b7('0x2f9')](this);},Scene_Title[_0x36b7('0x33c')][_0x36b7('0x580')]=function(){this['createTitleButtons']();const _0x3e131c=$dataSystem[_0x36b7('0xdc')][_0x36b7('0x582')],_0x9c5787=this[_0x36b7('0x38c')]();this['_commandWindow']=new Window_TitleCommand(_0x9c5787),this[_0x36b7('0x1b3')][_0x36b7('0x2aa')](_0x3e131c),this[_0x36b7('0x392')](this['_commandWindow']);},Scene_Title[_0x36b7('0x33c')][_0x36b7('0x38c')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['MenuLayout'][_0x36b7('0x236')][_0x36b7('0x2')]['call'](this);},Scene_Title['prototype'][_0x36b7('0xfa')]=function(){for(const _0x3182f0 of Scene_Title[_0x36b7('0xc8')]){const _0xd86065=new Sprite_TitlePictureButton(_0x3182f0);this[_0x36b7('0x501')](_0xd86065);}},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x194')]=Scene_Map[_0x36b7('0x33c')][_0x36b7('0x256')],Scene_Map['prototype'][_0x36b7('0x256')]=function(){VisuMZ['CoreEngine'][_0x36b7('0x194')][_0x36b7('0x2f9')](this);if($gameTemp[_0x36b7('0x3af')]&&!$gameMessage[_0x36b7('0xd2')]())this[_0x36b7('0xc6')]();},Scene_Map[_0x36b7('0x33c')][_0x36b7('0x29')]=function(){Scene_Message[_0x36b7('0x33c')][_0x36b7('0x29')][_0x36b7('0x2f9')](this),!SceneManager[_0x36b7('0x4d')](Scene_Battle)&&(this[_0x36b7('0x1ae')][_0x36b7('0x382')](),this[_0x36b7('0x311')][_0x36b7('0x159')](),this[_0x36b7('0x38f')]['visible']=![],SceneManager['snapForBackground']()),$gameScreen[_0x36b7('0x74')]();},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0xc9')]=Scene_Map[_0x36b7('0x33c')][_0x36b7('0x4eb')],Scene_Map[_0x36b7('0x33c')][_0x36b7('0x4eb')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0xc9')]['call'](this),SceneManager[_0x36b7('0x1')]()&&this[_0x36b7('0x2b9')]();},Scene_Map[_0x36b7('0x33c')][_0x36b7('0x2b9')]=function(){this[_0x36b7('0x11e')]['x']=Graphics[_0x36b7('0x556')]+0x4;},VisuMZ[_0x36b7('0x4d1')]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x36b7('0x33c')]['helpAreaTop'],Scene_MenuBase['prototype'][_0x36b7('0x588')]=function(){let _0x2d4a9d=0x0;if(SceneManager['areButtonsOutsideMainUI']())_0x2d4a9d=this[_0x36b7('0x238')]();else{if(_0x36b7('0x89')!=='XVfUI'){function _0x4266d2(){this[_0x36b7('0x2ba')]=_0x3cb7f4;}}else _0x2d4a9d=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x447')]['call'](this);}return this[_0x36b7('0x305')]()&&this[_0x36b7('0x155')]()===_0x36b7('0x47e')&&(_0x2d4a9d+=Window_ButtonAssist['prototype'][_0x36b7('0x2c9')]()),_0x2d4a9d;},Scene_MenuBase['prototype'][_0x36b7('0x238')]=function(){if(this[_0x36b7('0x542')]()){if(_0x36b7('0x504')===_0x36b7('0x99')){function _0x2b3004(){return _0x568b5d[_0x36b7('0x106')]()-0x8;}}else return this[_0x36b7('0x2eb')]();}else return 0x0;},VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x3b')],Scene_MenuBase['prototype']['mainAreaTop']=function(){if(SceneManager[_0x36b7('0x514')]())return this[_0x36b7('0x42')]();else{if(_0x36b7('0x1e6')==='CjcCw'){function _0x57707f(){this[_0x36b7('0x6a')]();}}else return VisuMZ['CoreEngine'][_0x36b7('0x496')][_0x36b7('0x2f9')](this);}},Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x42')]=function(){return!this[_0x36b7('0x542')]()?this[_0x36b7('0x278')]():0x0;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x448')]=Scene_MenuBase[_0x36b7('0x33c')]['mainAreaHeight'],Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x49f')]=function(){let _0x439345=0x0;if(SceneManager['areButtonsOutsideMainUI']())_0x439345=this['mainAreaHeightSideButtonLayout']();else{if(_0x36b7('0x3c1')!==_0x36b7('0x3c1')){function _0x38b733(){_0xbedef1['CoreEngine'][_0x36b7('0x3ea')][_0x36b7('0x2f9')](this),_0x8d7c15['isSideButtonLayout']()&&this[_0x36b7('0x32c')]();}}else _0x439345=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x448')][_0x36b7('0x2f9')](this);}if(this['isMenuButtonAssistEnabled']()&&this[_0x36b7('0x155')]()!==_0x36b7('0x16d')){if(_0x36b7('0x4f3')===_0x36b7('0x4f3'))_0x439345-=Window_ButtonAssist[_0x36b7('0x33c')][_0x36b7('0x2c9')]();else{function _0xe01616(){const _0x29f43a=this[_0x36b7('0xea')]()['params'][_0x509dc0][0x63],_0x1ec4ae=this[_0x36b7('0xea')]()[_0x36b7('0x3fe')][_0x2c0464][0x62];return _0x29f43a+(_0x29f43a-_0x1ec4ae)*(this['level']-0x63);}}}return _0x439345;},Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x426')]=function(){return Graphics[_0x36b7('0x4ea')]-this[_0x36b7('0x251')]();},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x9d')]=Scene_MenuBase['prototype'][_0x36b7('0x7c')],Scene_MenuBase[_0x36b7('0x33c')]['createBackground']=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x9d')][_0x36b7('0x2f9')](this),this[_0x36b7('0x2c3')](this['getBackgroundOpacity']()),this[_0x36b7('0x42d')]();},Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x216')]=function(){const _0x4390ac=String(this[_0x36b7('0xe6')][_0x36b7('0x176')]),_0x301821=this[_0x36b7('0x19f')](_0x4390ac);if(_0x301821){if(_0x36b7('0x21c')===_0x36b7('0x21c'))return _0x301821[_0x36b7('0x4a')];else{function _0x24e81c(){return this[_0x36b7('0x18')]&&this['_pageupButton'][_0x36b7('0x3ad')]?_0x1ae010['buttonAssistSwitch']:'';}}}else{if(_0x36b7('0x3e9')!==_0x36b7('0x579'))return 0xc0;else{function _0x51ad17(){return _0xae45bb[_0x36b7('0x171')]['StatusRect'][_0x36b7('0x2f9')](this);}}}},Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x42d')]=function(){const _0x4f207d=String(this['constructor'][_0x36b7('0x176')]),_0x5a2ff2=this[_0x36b7('0x19f')](_0x4f207d);if(_0x5a2ff2&&(_0x5a2ff2[_0x36b7('0x1fe')]!==''||_0x5a2ff2[_0x36b7('0x4dd')]!=='')){if('uJFAH'!==_0x36b7('0x495'))this[_0x36b7('0x3ee')]=new Sprite(ImageManager[_0x36b7('0x59b')](_0x5a2ff2[_0x36b7('0x1fe')])),this[_0x36b7('0x26f')]=new Sprite(ImageManager['loadTitle2'](_0x5a2ff2[_0x36b7('0x4dd')])),this[_0x36b7('0x501')](this['_backSprite1']),this[_0x36b7('0x501')](this[_0x36b7('0x26f')]),this[_0x36b7('0x3ee')]['bitmap']['addLoadListener'](this[_0x36b7('0x118')][_0x36b7('0x1d7')](this,this[_0x36b7('0x3ee')])),this[_0x36b7('0x26f')][_0x36b7('0x156')]['addLoadListener'](this[_0x36b7('0x118')][_0x36b7('0x1d7')](this,this['_backSprite2']));else{function _0x3a9521(){var _0x1f1bb1=_0x1e4d95(_0x40e911['$1']);_0x52fe82+=_0x1f1bb1;}}}},Scene_MenuBase[_0x36b7('0x33c')]['getCustomBackgroundSettings']=function(_0x448150){return VisuMZ['CoreEngine']['Settings'][_0x36b7('0x19a')][_0x448150]||VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x19a')]['Scene_Unlisted'];},Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x118')]=function(_0x10b742){this[_0x36b7('0x49d')](_0x10b742),this[_0x36b7('0x86')](_0x10b742);},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0xa1')]=Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x2c2')],Scene_MenuBase[_0x36b7('0x33c')]['createCancelButton']=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0xa1')][_0x36b7('0x2f9')](this),SceneManager[_0x36b7('0x1')]()&&this[_0x36b7('0x1b2')]();},Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x1b2')]=function(){this[_0x36b7('0x1a6')]['x']=Graphics[_0x36b7('0x556')]+0x4;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x3ea')]=Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0xfe')],Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0xfe')]=function(){VisuMZ['CoreEngine'][_0x36b7('0x3ea')][_0x36b7('0x2f9')](this),SceneManager[_0x36b7('0x1')]()&&this[_0x36b7('0x32c')]();},Scene_MenuBase[_0x36b7('0x33c')]['movePageButtonSideButtonLayout']=function(){this['_pageupButton']['x']=-0x1*(this[_0x36b7('0x18')][_0x36b7('0x25c')]+this[_0x36b7('0x32e')][_0x36b7('0x25c')]+0x8),this[_0x36b7('0x32e')]['x']=-0x1*(this[_0x36b7('0x32e')]['width']+0x4);},Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x305')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x291')][_0x36b7('0x6c')];},Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x155')]=function(){return SceneManager[_0x36b7('0x1')]()||SceneManager[_0x36b7('0x560')]()?VisuMZ['CoreEngine'][_0x36b7('0x91')]['ButtonAssist'][_0x36b7('0x309')]:_0x36b7('0x16d');},Scene_MenuBase[_0x36b7('0x33c')]['createButtonAssistWindow']=function(){if(!this[_0x36b7('0x305')]())return;const _0x32687b=this[_0x36b7('0x32f')]();this[_0x36b7('0x4df')]=new Window_ButtonAssist(_0x32687b),this[_0x36b7('0x392')](this[_0x36b7('0x4df')]);},Scene_MenuBase['prototype'][_0x36b7('0x32f')]=function(){return this[_0x36b7('0x155')]()===_0x36b7('0x16d')?this[_0x36b7('0x520')]():this[_0x36b7('0x9a')]();},Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x520')]=function(){const _0x2e4d5f=ConfigManager[_0x36b7('0x2ee')]?(Sprite_Button[_0x36b7('0x33c')][_0x36b7('0x353')]()+0x6)*0x2:0x0,_0x362379=this[_0x36b7('0x2d0')](),_0x236cee=Graphics['boxWidth']-_0x2e4d5f*0x2,_0x412a23=this['buttonAreaHeight']();return new Rectangle(_0x2e4d5f,_0x362379,_0x236cee,_0x412a23);},Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x9a')]=function(){const _0xcef5b1=Graphics[_0x36b7('0x556')],_0xf8757a=Window_ButtonAssist[_0x36b7('0x33c')][_0x36b7('0x2c9')](),_0x3c737f=0x0;let _0x13d7a6=0x0;return this[_0x36b7('0x155')]()===_0x36b7('0x47e')?_0x13d7a6=0x0:_0x13d7a6=Graphics[_0x36b7('0x4ea')]-_0xf8757a,new Rectangle(_0x3c737f,_0x13d7a6,_0xcef5b1,_0xf8757a);},Scene_Menu[_0x36b7('0x171')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')]['MainMenu'],VisuMZ['CoreEngine'][_0x36b7('0x429')]=Scene_Menu[_0x36b7('0x33c')][_0x36b7('0x4e7')],Scene_Menu[_0x36b7('0x33c')][_0x36b7('0x4e7')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x429')][_0x36b7('0x2f9')](this),this[_0x36b7('0x14b')]();},Scene_Menu[_0x36b7('0x33c')][_0x36b7('0x14b')]=function(){if(this[_0x36b7('0x1b3')]){if('NDjvW'==='PqpWV'){function _0x47656(){const _0x320a7d='_stored_hpGaugeColor1';this[_0x36b7('0x217')]=this['_colorCache']||{};if(this[_0x36b7('0x217')][_0x320a7d])return this[_0x36b7('0x217')][_0x320a7d];const _0x2df359=_0x368c4d[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x21')][_0x36b7('0x2cc')];return this['getColorDataFromPluginParameters'](_0x320a7d,_0x2df359);}}else this[_0x36b7('0x1b3')][_0x36b7('0x2aa')](Scene_Menu['layoutSettings'][_0x36b7('0x468')]);}this[_0x36b7('0xb0')]&&this[_0x36b7('0xb0')][_0x36b7('0x2aa')](Scene_Menu[_0x36b7('0x171')][_0x36b7('0x322')]);if(this[_0x36b7('0x294')]){if(_0x36b7('0x3a3')===_0x36b7('0x3a3'))this[_0x36b7('0x294')][_0x36b7('0x2aa')](Scene_Menu[_0x36b7('0x171')][_0x36b7('0x3eb')]);else{function _0x279961(){_0x5c8745['prototype'][_0x36b7('0x382')][_0x36b7('0x2f9')](this),this[_0x36b7('0x3ba')]();}}}},Scene_Menu['prototype'][_0x36b7('0x38c')]=function(){return Scene_Menu[_0x36b7('0x171')][_0x36b7('0x2')][_0x36b7('0x2f9')](this);},Scene_Menu[_0x36b7('0x33c')][_0x36b7('0x546')]=function(){return Scene_Menu[_0x36b7('0x171')][_0x36b7('0x187')]['call'](this);},Scene_Menu[_0x36b7('0x33c')]['statusWindowRect']=function(){return Scene_Menu[_0x36b7('0x171')][_0x36b7('0x2cd')][_0x36b7('0x2f9')](this);},Scene_Item[_0x36b7('0x171')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x45c')],VisuMZ[_0x36b7('0x4d1')]['Scene_Item_create']=Scene_Item[_0x36b7('0x33c')][_0x36b7('0x4e7')],Scene_Item[_0x36b7('0x33c')][_0x36b7('0x4e7')]=function(){VisuMZ[_0x36b7('0x4d1')]['Scene_Item_create'][_0x36b7('0x2f9')](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x36b7('0x33c')]['setCoreEngineUpdateWindowBg']=function(){if(this[_0x36b7('0x4aa')]){if(_0x36b7('0x57f')==='Fcxmx')this[_0x36b7('0x4aa')]['setBackgroundType'](Scene_Item[_0x36b7('0x171')][_0x36b7('0x48b')]);else{function _0x59a635(){return _0x1bc09e&&_0x23bc62[_0x36b7('0x1b4')]?_0x5262d3['_scene'][_0x36b7('0x61')]():!![];}}}this[_0x36b7('0x1c5')]&&this[_0x36b7('0x1c5')][_0x36b7('0x2aa')](Scene_Item[_0x36b7('0x171')][_0x36b7('0xc0')]),this[_0x36b7('0x3b3')]&&this[_0x36b7('0x3b3')]['setBackgroundType'](Scene_Item['layoutSettings'][_0x36b7('0x288')]),this[_0x36b7('0x1b1')]&&this[_0x36b7('0x1b1')]['setBackgroundType'](Scene_Item[_0x36b7('0x171')][_0x36b7('0x2fa')]);},Scene_Item[_0x36b7('0x33c')][_0x36b7('0x324')]=function(){return Scene_Item[_0x36b7('0x171')][_0x36b7('0x544')]['call'](this);},Scene_Item['prototype'][_0x36b7('0x254')]=function(){return Scene_Item['layoutSettings']['CategoryRect']['call'](this);},Scene_Item['prototype'][_0x36b7('0xa3')]=function(){return Scene_Item[_0x36b7('0x171')][_0x36b7('0x1f0')][_0x36b7('0x2f9')](this);},Scene_Item[_0x36b7('0x33c')][_0x36b7('0x3a8')]=function(){return Scene_Item[_0x36b7('0x171')][_0x36b7('0x499')][_0x36b7('0x2f9')](this);},Scene_Skill[_0x36b7('0x171')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x3dc')],VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x17e')]=Scene_Skill[_0x36b7('0x33c')]['create'],Scene_Skill[_0x36b7('0x33c')][_0x36b7('0x4e7')]=function(){VisuMZ[_0x36b7('0x4d1')]['Scene_Skill_create'][_0x36b7('0x2f9')](this),this[_0x36b7('0x14b')]();},Scene_Skill[_0x36b7('0x33c')][_0x36b7('0x14b')]=function(){this['_helpWindow']&&this[_0x36b7('0x4aa')][_0x36b7('0x2aa')](Scene_Skill[_0x36b7('0x171')][_0x36b7('0x48b')]);this['_skillTypeWindow']&&this[_0x36b7('0x49b')]['setBackgroundType'](Scene_Skill[_0x36b7('0x171')][_0x36b7('0x3c2')]);this['_statusWindow']&&this[_0x36b7('0x294')][_0x36b7('0x2aa')](Scene_Skill[_0x36b7('0x171')][_0x36b7('0x3eb')]);this[_0x36b7('0x3b3')]&&this[_0x36b7('0x3b3')][_0x36b7('0x2aa')](Scene_Skill[_0x36b7('0x171')][_0x36b7('0x288')]);if(this[_0x36b7('0x1b1')]){if(_0x36b7('0x31')!=='askkl')this[_0x36b7('0x1b1')][_0x36b7('0x2aa')](Scene_Skill[_0x36b7('0x171')][_0x36b7('0x2fa')]);else{function _0x40258f(){this['_cache']={},_0x3c94da[_0x36b7('0x4d1')]['Game_BattlerBase_refresh'][_0x36b7('0x2f9')](this);}}}},Scene_Skill[_0x36b7('0x33c')][_0x36b7('0x324')]=function(){return Scene_Skill[_0x36b7('0x171')]['HelpRect'][_0x36b7('0x2f9')](this);},Scene_Skill['prototype'][_0x36b7('0x435')]=function(){return Scene_Skill[_0x36b7('0x171')][_0x36b7('0x280')][_0x36b7('0x2f9')](this);},Scene_Skill[_0x36b7('0x33c')]['statusWindowRect']=function(){return Scene_Skill[_0x36b7('0x171')][_0x36b7('0x2cd')][_0x36b7('0x2f9')](this);},Scene_Skill[_0x36b7('0x33c')]['itemWindowRect']=function(){return Scene_Skill[_0x36b7('0x171')][_0x36b7('0x1f0')][_0x36b7('0x2f9')](this);},Scene_Skill[_0x36b7('0x33c')]['actorWindowRect']=function(){return Scene_Skill[_0x36b7('0x171')][_0x36b7('0x499')][_0x36b7('0x2f9')](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x3b0')],VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x46a')]=Scene_Equip[_0x36b7('0x33c')][_0x36b7('0x4e7')],Scene_Equip[_0x36b7('0x33c')]['create']=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x46a')][_0x36b7('0x2f9')](this),this[_0x36b7('0x14b')]();},Scene_Equip[_0x36b7('0x33c')][_0x36b7('0x14b')]=function(){this['_helpWindow']&&this['_helpWindow'][_0x36b7('0x2aa')](Scene_Equip[_0x36b7('0x171')][_0x36b7('0x48b')]);if(this['_statusWindow']){if('hXZUy'!==_0x36b7('0x4a5'))this[_0x36b7('0x294')][_0x36b7('0x2aa')](Scene_Equip[_0x36b7('0x171')][_0x36b7('0x3eb')]);else{function _0xb1d54(){const _0x51e99f=_0x50ca3a[_0x36b7('0x4ca')](_0x29e781);_0x3c075b?(this[_0x36b7('0x248')](_0x51e99f,_0x440508,_0x11b0be,this[_0x36b7('0x75')]()),_0x4de97f-=this['gaugeLineHeight']()+0x2,_0x265493+=this[_0x36b7('0x75')]()+0x2):(this['drawIcon'](_0x51e99f,_0x3fd93c+0x2,_0x478181+0x2),_0x31e25e-=_0x4be11f[_0x36b7('0xe7')]+0x4,_0x48b5a1+=_0x13b940[_0x36b7('0xe7')]+0x4);}}}this[_0x36b7('0x1b3')]&&this['_commandWindow'][_0x36b7('0x2aa')](Scene_Equip[_0x36b7('0x171')][_0x36b7('0x468')]),this['_slotWindow']&&this[_0x36b7('0x459')][_0x36b7('0x2aa')](Scene_Equip[_0x36b7('0x171')][_0x36b7('0xaf')]),this['_itemWindow']&&this[_0x36b7('0x3b3')][_0x36b7('0x2aa')](Scene_Equip['layoutSettings'][_0x36b7('0x288')]);},Scene_Equip[_0x36b7('0x33c')][_0x36b7('0x324')]=function(){return Scene_Equip[_0x36b7('0x171')][_0x36b7('0x544')][_0x36b7('0x2f9')](this);},Scene_Equip['prototype']['statusWindowRect']=function(){return Scene_Equip[_0x36b7('0x171')][_0x36b7('0x2cd')][_0x36b7('0x2f9')](this);},Scene_Equip[_0x36b7('0x33c')][_0x36b7('0x38c')]=function(){return Scene_Equip[_0x36b7('0x171')][_0x36b7('0x2')]['call'](this);},Scene_Equip[_0x36b7('0x33c')]['slotWindowRect']=function(){return Scene_Equip[_0x36b7('0x171')][_0x36b7('0x346')][_0x36b7('0x2f9')](this);},Scene_Equip[_0x36b7('0x33c')]['itemWindowRect']=function(){return Scene_Equip[_0x36b7('0x171')][_0x36b7('0x1f0')][_0x36b7('0x2f9')](this);},Scene_Status[_0x36b7('0x171')]=VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x443')],VisuMZ['CoreEngine'][_0x36b7('0x571')]=Scene_Status[_0x36b7('0x33c')]['create'],Scene_Status['prototype'][_0x36b7('0x4e7')]=function(){VisuMZ[_0x36b7('0x4d1')]['Scene_Status_create'][_0x36b7('0x2f9')](this),this[_0x36b7('0x14b')]();},Scene_Status[_0x36b7('0x33c')][_0x36b7('0x14b')]=function(){if(this[_0x36b7('0x22e')]){if(_0x36b7('0xc3')!==_0x36b7('0x6d'))this[_0x36b7('0x22e')][_0x36b7('0x2aa')](Scene_Status[_0x36b7('0x171')]['ProfileBgType']);else{function _0x16ea0d(){let _0x5f5b4e='xparam'+_0x325395+_0x36b7('0xf0');if(this['checkCacheKey'](_0x5f5b4e))return this[_0x36b7('0x4f7')][_0x5f5b4e];return this[_0x36b7('0x4f7')][_0x5f5b4e]=_0x1f8c37[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x23')][_0x36b7('0x45a')]['call'](this,_0x5b332b),this[_0x36b7('0x4f7')][_0x5f5b4e];}}}if(this[_0x36b7('0x294')]){if(_0x36b7('0x12a')!==_0x36b7('0x12a')){function _0x5314e9(){this[_0x36b7('0x1a')]();}}else this[_0x36b7('0x294')]['setBackgroundType'](Scene_Status['layoutSettings'][_0x36b7('0x3eb')]);}if(this['_statusParamsWindow']){if(_0x36b7('0x304')===_0x36b7('0x304'))this[_0x36b7('0x539')][_0x36b7('0x2aa')](Scene_Status['layoutSettings'][_0x36b7('0x513')]);else{function _0x206734(){_0x202698[_0x36b7('0x2a0')](_0x154644,_0x1f31af);}}}if(this[_0x36b7('0xba')]){if(_0x36b7('0x36a')!==_0x36b7('0x37'))this[_0x36b7('0xba')][_0x36b7('0x2aa')](Scene_Status[_0x36b7('0x171')][_0x36b7('0x221')]);else{function _0x257149(){!this[_0x36b7('0x478')]&&_0x36f6dd[_0x36b7('0x2c6')]()&&(this['_hovered']=!![],this[_0x36b7('0x267')]()),_0x443ddc[_0x36b7('0x34e')]()&&(this[_0x36b7('0x165')]=!![],this[_0x36b7('0x57b')]());}}}},Scene_Status[_0x36b7('0x33c')][_0x36b7('0x1ad')]=function(){return Scene_Status[_0x36b7('0x171')][_0x36b7('0x37c')][_0x36b7('0x2f9')](this);},Scene_Status['prototype'][_0x36b7('0xbe')]=function(){return Scene_Status[_0x36b7('0x171')][_0x36b7('0x2cd')][_0x36b7('0x2f9')](this);},Scene_Status['prototype'][_0x36b7('0x13a')]=function(){return Scene_Status[_0x36b7('0x171')][_0x36b7('0x2ed')][_0x36b7('0x2f9')](this);},Scene_Status[_0x36b7('0x33c')][_0x36b7('0x35a')]=function(){return Scene_Status[_0x36b7('0x171')][_0x36b7('0x28c')][_0x36b7('0x2f9')](this);},Scene_Options[_0x36b7('0x171')]=VisuMZ['CoreEngine'][_0x36b7('0x91')]['MenuLayout'][_0x36b7('0x335')],VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x320')]=Scene_Options[_0x36b7('0x33c')][_0x36b7('0x4e7')],Scene_Options[_0x36b7('0x33c')]['create']=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x320')][_0x36b7('0x2f9')](this),this[_0x36b7('0x14b')]();},Scene_Options[_0x36b7('0x33c')][_0x36b7('0x14b')]=function(){this[_0x36b7('0x18e')]&&this[_0x36b7('0x18e')][_0x36b7('0x2aa')](Scene_Options[_0x36b7('0x171')][_0x36b7('0x307')]);},Scene_Options[_0x36b7('0x33c')][_0x36b7('0x40')]=function(){return Scene_Options[_0x36b7('0x171')]['OptionsRect'][_0x36b7('0x2f9')](this);},Scene_Save['layoutSettings']=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x180')],Scene_Save[_0x36b7('0x33c')][_0x36b7('0x4e7')]=function(){Scene_File[_0x36b7('0x33c')][_0x36b7('0x4e7')][_0x36b7('0x2f9')](this),this[_0x36b7('0x14b')]();},Scene_Save[_0x36b7('0x33c')][_0x36b7('0x14b')]=function(){if(this[_0x36b7('0x4aa')]){if(_0x36b7('0x27f')!=='rujHM')this[_0x36b7('0x4aa')][_0x36b7('0x2aa')](Scene_Save[_0x36b7('0x171')][_0x36b7('0x48b')]);else{function _0x443589(){return _0x4f690a[_0x36b7('0x1b4')][_0x36b7('0x61')]();}}}this[_0x36b7('0x554')]&&this[_0x36b7('0x554')][_0x36b7('0x2aa')](Scene_Save['layoutSettings'][_0x36b7('0x53a')]);},Scene_Save[_0x36b7('0x33c')][_0x36b7('0x324')]=function(){return Scene_Save[_0x36b7('0x171')][_0x36b7('0x544')][_0x36b7('0x2f9')](this);},Scene_Save[_0x36b7('0x33c')]['listWindowRect']=function(){return Scene_Save['layoutSettings'][_0x36b7('0x461')][_0x36b7('0x2f9')](this);},Scene_Load[_0x36b7('0x171')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x10a')],Scene_Load[_0x36b7('0x33c')][_0x36b7('0x4e7')]=function(){Scene_File[_0x36b7('0x33c')][_0x36b7('0x4e7')][_0x36b7('0x2f9')](this),this[_0x36b7('0x14b')]();},Scene_Load[_0x36b7('0x33c')]['setCoreEngineUpdateWindowBg']=function(){if(this[_0x36b7('0x4aa')]){if(_0x36b7('0x18f')===_0x36b7('0x18f'))this['_helpWindow'][_0x36b7('0x2aa')](Scene_Load[_0x36b7('0x171')]['HelpBgType']);else{function _0x2a4de4(){const _0x10d201=_0x17c88c[_0x36b7('0x1b4')];for(let _0x2d1b72=0x1;_0x2d1b72<=0x5;_0x2d1b72++){if(this[_0x36b7('0x552')][_0x36b7('0x4e2')[_0x36b7('0x4b0')](_0x2d1b72)]!==_0x10d201[_0x36b7('0x38a')[_0x36b7('0x4b0')](_0x2d1b72)]())return this[_0x36b7('0x52')]();if(this['_data'][_0x36b7('0x20e')['format'](_0x2d1b72)]!==_0x10d201[_0x36b7('0x1c')[_0x36b7('0x4b0')](_0x2d1b72)]())return this[_0x36b7('0x52')]();}}}}this[_0x36b7('0x554')]&&this['_listWindow'][_0x36b7('0x2aa')](Scene_Load[_0x36b7('0x171')][_0x36b7('0x53a')]);},Scene_Load[_0x36b7('0x33c')][_0x36b7('0x324')]=function(){return Scene_Load[_0x36b7('0x171')][_0x36b7('0x544')][_0x36b7('0x2f9')](this);},Scene_Load[_0x36b7('0x33c')][_0x36b7('0x39f')]=function(){return Scene_Load['layoutSettings'][_0x36b7('0x461')][_0x36b7('0x2f9')](this);},Scene_GameEnd[_0x36b7('0x171')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x4fd')],VisuMZ[_0x36b7('0x4d1')]['Scene_GameEnd_createBackground']=Scene_GameEnd[_0x36b7('0x33c')]['createBackground'],Scene_GameEnd[_0x36b7('0x33c')][_0x36b7('0x7c')]=function(){Scene_MenuBase[_0x36b7('0x33c')][_0x36b7('0x7c')][_0x36b7('0x2f9')](this);},Scene_GameEnd[_0x36b7('0x33c')][_0x36b7('0x580')]=function(){const _0x20e3d1=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x20e3d1),this[_0x36b7('0x1b3')][_0x36b7('0x10c')](_0x36b7('0x371'),this[_0x36b7('0x234')]['bind'](this)),this[_0x36b7('0x392')](this[_0x36b7('0x1b3')]),this[_0x36b7('0x1b3')][_0x36b7('0x2aa')](Scene_GameEnd[_0x36b7('0x171')][_0x36b7('0x468')]);},Scene_GameEnd[_0x36b7('0x33c')]['commandWindowRect']=function(){return Scene_GameEnd[_0x36b7('0x171')]['CommandRect']['call'](this);},Scene_Shop[_0x36b7('0x171')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x2b')],VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x524')]=Scene_Shop[_0x36b7('0x33c')][_0x36b7('0x4e7')],Scene_Shop[_0x36b7('0x33c')][_0x36b7('0x4e7')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x524')][_0x36b7('0x2f9')](this),this[_0x36b7('0x14b')]();},Scene_Shop[_0x36b7('0x33c')][_0x36b7('0x14b')]=function(){if(this[_0x36b7('0x4aa')]){if(_0x36b7('0x11a')!==_0x36b7('0x11a')){function _0x1274ab(){const _0x13128d=this[_0x36b7('0xa2')]();_0x55aad1[_0x36b7('0x34e')](_0x36b7('0x56c'))&&this[_0x36b7('0x1a8')](_0x490aed[_0x36b7('0x27c')](this[_0x36b7('0xa2')](),0x0)),_0x26ddd7['isTriggered'](_0x36b7('0x4b9'))&&this[_0x36b7('0x1a8')](_0x20095c[_0x36b7('0x476')](this[_0x36b7('0xa2')](),this['maxItems']()-0x1)),this[_0x36b7('0xa2')]()!==_0x13128d&&this[_0x36b7('0x56')]();}}else this[_0x36b7('0x4aa')][_0x36b7('0x2aa')](Scene_Shop[_0x36b7('0x171')][_0x36b7('0x48b')]);}this[_0x36b7('0xb0')]&&this['_goldWindow']['setBackgroundType'](Scene_Shop[_0x36b7('0x171')][_0x36b7('0x322')]);this[_0x36b7('0x1b3')]&&this['_commandWindow'][_0x36b7('0x2aa')](Scene_Shop[_0x36b7('0x171')]['CommandBgType']);if(this['_dummyWindow']){if('CBvzh'===_0x36b7('0x50d'))this[_0x36b7('0xaa')][_0x36b7('0x2aa')](Scene_Shop['layoutSettings'][_0x36b7('0x53c')]);else{function _0x1cfec0(){_0x184ae6+=_0x36b7('0x24d');}}}this[_0x36b7('0x22d')]&&this[_0x36b7('0x22d')][_0x36b7('0x2aa')](Scene_Shop['layoutSettings']['NumberBgType']);this[_0x36b7('0x294')]&&this[_0x36b7('0x294')][_0x36b7('0x2aa')](Scene_Shop[_0x36b7('0x171')][_0x36b7('0x3eb')]);if(this[_0x36b7('0x30e')]){if(_0x36b7('0x39d')!==_0x36b7('0x27a'))this[_0x36b7('0x30e')][_0x36b7('0x2aa')](Scene_Shop[_0x36b7('0x171')][_0x36b7('0x249')]);else{function _0x5f0b9b(){if(_0x5d981e[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0x1d3')]){const _0x977b9f=_0x34308b[_0x36b7('0x25c')]-_0x39f719['boxWidth']-_0x3d5fb9[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0x34b')]*0x2,_0x14f852=_0x3ef91e[_0x36b7('0x33c')][_0x36b7('0x353')][_0x36b7('0x2f9')](this)*0x4;if(_0x977b9f>=_0x14f852)_0x574a76[_0x36b7('0x503')](!![]);}}}}if(this[_0x36b7('0x1c5')]){if(_0x36b7('0x29e')!==_0x36b7('0x29e')){function _0x23674a(){_0x28d20d[_0x36b7('0x33c')][_0x36b7('0x382')][_0x36b7('0x2f9')](this),this[_0x36b7('0x2bf')](),this['processTouch']();}}else this['_categoryWindow']['setBackgroundType'](Scene_Shop[_0x36b7('0x171')][_0x36b7('0xc0')]);}this[_0x36b7('0x3b7')]&&this[_0x36b7('0x3b7')]['setBackgroundType'](Scene_Shop[_0x36b7('0x171')][_0x36b7('0x1a1')]);},Scene_Shop[_0x36b7('0x33c')][_0x36b7('0x324')]=function(){return Scene_Shop[_0x36b7('0x171')][_0x36b7('0x544')][_0x36b7('0x2f9')](this);},Scene_Shop['prototype'][_0x36b7('0x546')]=function(){return Scene_Shop[_0x36b7('0x171')][_0x36b7('0x187')][_0x36b7('0x2f9')](this);},Scene_Shop['prototype'][_0x36b7('0x38c')]=function(){return Scene_Shop[_0x36b7('0x171')][_0x36b7('0x2')][_0x36b7('0x2f9')](this);},Scene_Shop['prototype'][_0x36b7('0x38b')]=function(){return Scene_Shop[_0x36b7('0x171')][_0x36b7('0x1af')][_0x36b7('0x2f9')](this);},Scene_Shop['prototype'][_0x36b7('0xd1')]=function(){return Scene_Shop['layoutSettings'][_0x36b7('0x28b')][_0x36b7('0x2f9')](this);},Scene_Shop['prototype'][_0x36b7('0xbe')]=function(){return Scene_Shop[_0x36b7('0x171')][_0x36b7('0x2cd')][_0x36b7('0x2f9')](this);},Scene_Shop[_0x36b7('0x33c')]['buyWindowRect']=function(){return Scene_Shop[_0x36b7('0x171')][_0x36b7('0x116')][_0x36b7('0x2f9')](this);},Scene_Shop[_0x36b7('0x33c')][_0x36b7('0x254')]=function(){return Scene_Shop[_0x36b7('0x171')][_0x36b7('0x384')][_0x36b7('0x2f9')](this);},Scene_Shop[_0x36b7('0x33c')][_0x36b7('0x185')]=function(){return Scene_Shop[_0x36b7('0x171')][_0x36b7('0x299')][_0x36b7('0x2f9')](this);},Scene_Name['layoutSettings']=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['MenuLayout'][_0x36b7('0x2d4')],VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x5a8')]=Scene_Name[_0x36b7('0x33c')][_0x36b7('0x4e7')],Scene_Name[_0x36b7('0x33c')][_0x36b7('0x4e7')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x5a8')][_0x36b7('0x2f9')](this),this[_0x36b7('0x14b')]();},Scene_Name[_0x36b7('0x33c')][_0x36b7('0x14b')]=function(){if(this[_0x36b7('0x18d')]){if(_0x36b7('0x511')!==_0x36b7('0x511')){function _0x32cae0(){const _0x3e8f97=_0xf08730[_0x36b7('0x19b')]()[_0x36b7('0x12b')](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x13c577[_0x36b7('0x19b')](),_0x2f05f5,_0x5542b9,_0x12808);}}else this[_0x36b7('0x18d')][_0x36b7('0x2aa')](Scene_Name[_0x36b7('0x171')][_0x36b7('0x1dd')]);}if(this[_0x36b7('0x559')]){if('ViEPj'===_0x36b7('0x3a4'))this[_0x36b7('0x559')]['setBackgroundType'](Scene_Name[_0x36b7('0x171')][_0x36b7('0x226')]);else{function _0x174e8e(){this[_0x36b7('0x4c6')](),_0x1c9eec[_0x36b7('0x4d1')][_0x36b7('0x30f')][_0x36b7('0x2f9')](this,_0x3ca605);}}}},Scene_Name[_0x36b7('0x33c')][_0x36b7('0x251')]=function(){return 0x0;},Scene_Name[_0x36b7('0x33c')][_0x36b7('0x1e8')]=function(){return Scene_Name[_0x36b7('0x171')][_0x36b7('0x3cc')][_0x36b7('0x2f9')](this);},Scene_Name['prototype']['inputWindowRect']=function(){return Scene_Name['layoutSettings'][_0x36b7('0x41')][_0x36b7('0x2f9')](this);},VisuMZ['CoreEngine']['Scene_Battle_update']=Scene_Battle[_0x36b7('0x33c')][_0x36b7('0x382')],Scene_Battle['prototype'][_0x36b7('0x382')]=function(){VisuMZ[_0x36b7('0x4d1')]['Scene_Battle_update'][_0x36b7('0x2f9')](this);if($gameTemp[_0x36b7('0x3af')])this[_0x36b7('0x5a0')]();},Scene_Battle[_0x36b7('0x33c')][_0x36b7('0x5a0')]=function(){!BattleManager[_0x36b7('0x4e')]()&&!this[_0x36b7('0x519')]&&!$gameMessage[_0x36b7('0xd2')]()&&(this[_0x36b7('0x519')]=!![],this[_0x36b7('0x382')](),this[_0x36b7('0x519')]=![]);},VisuMZ[_0x36b7('0x4d1')]['Scene_Battle_createCancelButton']=Scene_Battle['prototype'][_0x36b7('0x2c2')],Scene_Battle[_0x36b7('0x33c')][_0x36b7('0x2c2')]=function(){VisuMZ[_0x36b7('0x4d1')]['Scene_Battle_createCancelButton'][_0x36b7('0x2f9')](this),SceneManager[_0x36b7('0x1')]()&&this[_0x36b7('0x6a')]();},Scene_Battle[_0x36b7('0x33c')][_0x36b7('0x6a')]=function(){this[_0x36b7('0x1a6')]['x']=Graphics[_0x36b7('0x556')]+0x4,this[_0x36b7('0x300')]()?this['_cancelButton']['y']=Graphics[_0x36b7('0x4ea')]-this['buttonAreaHeight']():this[_0x36b7('0x1a6')]['y']=0x0;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x3d7')]=Sprite_Button[_0x36b7('0x33c')]['initialize'],Sprite_Button[_0x36b7('0x33c')][_0x36b7('0x4d2')]=function(_0x297eb1){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x3d7')][_0x36b7('0x2f9')](this,_0x297eb1),this[_0x36b7('0x2b3')]();},Sprite_Button['prototype'][_0x36b7('0x2b3')]=function(){const _0x3cd64a=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'];this[_0x36b7('0x378')]=![];switch(this[_0x36b7('0x3a')]){case _0x36b7('0x371'):this['_isButtonHidden']=!_0x3cd64a['cancelShowButton'];break;case'pageup':case _0x36b7('0x59a'):this['_isButtonHidden']=!_0x3cd64a[_0x36b7('0x2bd')];break;case _0x36b7('0x47'):case'up':case _0x36b7('0x3ed'):case _0x36b7('0x369'):case'ok':this[_0x36b7('0x378')]=!_0x3cd64a['numberShowButton'];break;case'menu':this[_0x36b7('0x378')]=!_0x3cd64a['menuShowButton'];break;}},VisuMZ[_0x36b7('0x4d1')]['Sprite_Button_updateOpacity']=Sprite_Button[_0x36b7('0x33c')][_0x36b7('0x2bf')],Sprite_Button[_0x36b7('0x33c')]['updateOpacity']=function(){SceneManager[_0x36b7('0x560')]()||this[_0x36b7('0x378')]?this[_0x36b7('0x8')]():VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x505')][_0x36b7('0x2f9')](this);},Sprite_Button['prototype'][_0x36b7('0x8')]=function(){this[_0x36b7('0x3ad')]=![],this[_0x36b7('0x31d')]=0x0,this['x']=Graphics[_0x36b7('0x25c')]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x418')]=Sprite_Battler[_0x36b7('0x33c')][_0x36b7('0x87')],Sprite_Battler[_0x36b7('0x33c')][_0x36b7('0x87')]=function(_0x209e72,_0x1e5a70,_0xd6b899){(this[_0x36b7('0x451')]!==_0x209e72||this[_0x36b7('0x53e')]!==_0x1e5a70)&&(this[_0x36b7('0x3cb')](_0x36b7('0x107')),this[_0x36b7('0x13f')]=_0xd6b899),VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x418')][_0x36b7('0x2f9')](this,_0x209e72,_0x1e5a70,_0xd6b899);},Sprite_Battler[_0x36b7('0x33c')][_0x36b7('0x3cb')]=function(_0x18c2df){this[_0x36b7('0x4a6')]=_0x18c2df;},Sprite_Battler[_0x36b7('0x33c')][_0x36b7('0x2a7')]=function(){if(this[_0x36b7('0x55b')]<=0x0)return;const _0x43c329=this[_0x36b7('0x55b')],_0x582f90=this['_movementWholeDuration'],_0x453ef5=this[_0x36b7('0x4a6')];this['_offsetX']=this[_0x36b7('0x3da')](this[_0x36b7('0x4e6')],this[_0x36b7('0x451')],_0x43c329,_0x582f90,_0x453ef5),this[_0x36b7('0xf6')]=this[_0x36b7('0x3da')](this['_offsetY'],this[_0x36b7('0x53e')],_0x43c329,_0x582f90,_0x453ef5),this[_0x36b7('0x55b')]--;if(this['_movementDuration']<=0x0)this[_0x36b7('0x483')]();},Sprite_Battler['prototype'][_0x36b7('0x3da')]=function(_0x13a4a1,_0x2fb0a8,_0x3935e2,_0x1e9b21,_0xf19ee9){const _0x8dac10=VisuMZ[_0x36b7('0x227')]((_0x1e9b21-_0x3935e2)/_0x1e9b21,_0xf19ee9||'Linear'),_0x539f68=VisuMZ[_0x36b7('0x227')]((_0x1e9b21-_0x3935e2+0x1)/_0x1e9b21,_0xf19ee9||_0x36b7('0x107')),_0x4cd261=(_0x13a4a1-_0x2fb0a8*_0x8dac10)/(0x1-_0x8dac10);return _0x4cd261+(_0x2fb0a8-_0x4cd261)*_0x539f68;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x2b7')]=Sprite_Actor[_0x36b7('0x33c')]['setActorHome'],Sprite_Actor[_0x36b7('0x33c')][_0x36b7('0x129')]=function(_0x2a91ff){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI']['RepositionActors']?this[_0x36b7('0x48e')](_0x2a91ff):VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x2b7')]['call'](this,_0x2a91ff);},Sprite_Actor[_0x36b7('0x33c')]['setActorHomeRepositioned']=function(_0x5decdd){let _0x31cb31=Math[_0x36b7('0x2ec')](Graphics[_0x36b7('0x25c')]/0x2+0xc0);_0x31cb31-=Math[_0x36b7('0x3ca')]((Graphics['width']-Graphics[_0x36b7('0x556')])/0x2),_0x31cb31+=_0x5decdd*0x20;let _0x280388=Graphics[_0x36b7('0x4d6')]-0xc8-$gameParty[_0x36b7('0x84')]()*0x30;_0x280388-=Math[_0x36b7('0x3ca')]((Graphics[_0x36b7('0x4d6')]-Graphics[_0x36b7('0x4ea')])/0x2),_0x280388+=_0x5decdd*0x30,this[_0x36b7('0x52e')](_0x31cb31,_0x280388);},Sprite_Actor[_0x36b7('0x33c')][_0x36b7('0x1c1')]=function(){this[_0x36b7('0x87')](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x36b7('0x354')]=function(_0xf625d7){this[_0x36b7('0x166')]=_0xf625d7;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x1f9')]=Sprite_Animation[_0x36b7('0x33c')][_0x36b7('0xb9')],Sprite_Animation[_0x36b7('0x33c')]['processSoundTimings']=function(){if(this[_0x36b7('0x166')])return;VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x1f9')][_0x36b7('0x2f9')](this);},Sprite_Animation[_0x36b7('0x33c')][_0x36b7('0xf3')]=function(_0x27ddd5){const _0x2f3609=this[_0x36b7('0x2a2')]['name'];let _0x46a322=0x0,_0x3332da=-_0x27ddd5[_0x36b7('0x4d6')]/0x2;;if(_0x2f3609[_0x36b7('0x328')](/<(?:HEAD|HEADER|TOP)>/i))_0x3332da=-_0x27ddd5['height'];if(_0x2f3609[_0x36b7('0x328')](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x3332da=0x0;if(_0x2f3609[_0x36b7('0x328')](/<(?:LEFT)>/i))_0x46a322=-_0x27ddd5[_0x36b7('0x25c')]/0x2;if(_0x2f3609['match'](/<(?:RIGHT)>/i))_0x3332da=_0x27ddd5[_0x36b7('0x25c')]/0x2;if(_0x2f3609[_0x36b7('0x328')](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x46a322=Number(RegExp['$1'])*_0x27ddd5['width'];_0x2f3609[_0x36b7('0x328')](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x3332da=(0x1-Number(RegExp['$1']))*-_0x27ddd5[_0x36b7('0x4d6')]);if(_0x2f3609[_0x36b7('0x328')](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)){if(_0x36b7('0x46')!==_0x36b7('0x109'))_0x46a322=Number(RegExp['$1'])*_0x27ddd5['width'],_0x3332da=(0x1-Number(RegExp['$2']))*-_0x27ddd5['height'];else{function _0x399970(){return _0x25e5c9[_0x36b7('0x171')]['BuyRect'][_0x36b7('0x2f9')](this);}}}if(_0x2f3609[_0x36b7('0x328')](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x46a322+=Number(RegExp['$1']);if(_0x2f3609[_0x36b7('0x328')](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x3332da+=Number(RegExp['$1']);if(_0x2f3609[_0x36b7('0x328')](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x36b7('0xeb')===_0x36b7('0xeb'))_0x46a322+=Number(RegExp['$1']),_0x3332da+=Number(RegExp['$2']);else{function _0x4ebb6b(){this[_0x36b7('0x56')]();}}}const _0x2f29aa=new Point(_0x46a322,_0x3332da);return _0x27ddd5['updateTransform'](),_0x27ddd5[_0x36b7('0x1aa')][_0x36b7('0x90')](_0x2f29aa);},Sprite_AnimationMV['prototype'][_0x36b7('0x354')]=function(_0x1f8a00){this[_0x36b7('0x166')]=_0x1f8a00;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x4e4')]=Sprite_AnimationMV[_0x36b7('0x33c')][_0x36b7('0x1f2')],Sprite_AnimationMV[_0x36b7('0x33c')]['processTimingData']=function(_0x24bbb9){this[_0x36b7('0x166')]&&(_0x24bbb9=JsonEx[_0x36b7('0x487')](_0x24bbb9),_0x24bbb9['se'][_0x36b7('0x597')]=0x0),VisuMZ['CoreEngine'][_0x36b7('0x4e4')]['call'](this,_0x24bbb9);},Sprite_Damage[_0x36b7('0x33c')]['createDigits']=function(_0x79d980){let _0x1f7adf=Math[_0x36b7('0x555')](_0x79d980)[_0x36b7('0x3b8')]();this[_0x36b7('0x1fb')]()&&(_0x1f7adf=VisuMZ[_0x36b7('0xee')](_0x1f7adf));const _0x1bde5d=this[_0x36b7('0x18b')](),_0x3bf19b=Math[_0x36b7('0x3ca')](_0x1bde5d*0.75);for(let _0x37a2a4=0x0;_0x37a2a4<_0x1f7adf['length'];_0x37a2a4++){if(_0x36b7('0x37d')===_0x36b7('0x37d')){const _0x404cf9=this[_0x36b7('0x3cd')](_0x3bf19b,_0x1bde5d);_0x404cf9['bitmap'][_0x36b7('0x229')](_0x1f7adf[_0x37a2a4],0x0,0x0,_0x3bf19b,_0x1bde5d,'center'),_0x404cf9['x']=(_0x37a2a4-(_0x1f7adf[_0x36b7('0x1d6')]-0x1)/0x2)*_0x3bf19b,_0x404cf9['dy']=-_0x37a2a4;}else{function _0x226813(){const _0x3847cf=this['_dimmerSprite'][_0x36b7('0x156')],_0x4f59ff=this[_0x36b7('0x25c')],_0x4ecf2c=this[_0x36b7('0x4d6')],_0x11dcd4=this['padding'],_0x1ffa5f=_0x14aec1[_0x36b7('0x43e')](),_0x181166=_0x39160b[_0x36b7('0x148')]();_0x3847cf[_0x36b7('0x65')](_0x4f59ff,_0x4ecf2c),_0x3847cf[_0x36b7('0x333')](0x0,0x0,_0x4f59ff,_0x11dcd4,_0x181166,_0x1ffa5f,!![]),_0x3847cf[_0x36b7('0x16e')](0x0,_0x11dcd4,_0x4f59ff,_0x4ecf2c-_0x11dcd4*0x2,_0x1ffa5f),_0x3847cf[_0x36b7('0x333')](0x0,_0x4ecf2c-_0x11dcd4,_0x4f59ff,_0x11dcd4,_0x1ffa5f,_0x181166,!![]),this[_0x36b7('0x2bc')][_0x36b7('0x143')](0x0,0x0,_0x4f59ff,_0x4ecf2c);}}}},Sprite_Damage['prototype']['useDigitGrouping']=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['QoL'][_0x36b7('0x4f5')];},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x79')]=Sprite_Gauge[_0x36b7('0x33c')][_0x36b7('0x572')],Sprite_Gauge[_0x36b7('0x33c')][_0x36b7('0x572')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x79')][_0x36b7('0x2f9')](this)[_0x36b7('0x323')](0x0,0x1);},VisuMZ['CoreEngine'][_0x36b7('0x2af')]=Sprite_Gauge['prototype'][_0x36b7('0x482')],Sprite_Gauge[_0x36b7('0x33c')][_0x36b7('0x482')]=function(){let _0x873e01=VisuMZ['CoreEngine'][_0x36b7('0x2af')][_0x36b7('0x2f9')](this);return _0x873e01;},Sprite_Gauge['prototype'][_0x36b7('0x529')]=function(){let _0x4ba126=this[_0x36b7('0x482')]();this['useDigitGrouping']()&&(_0x4ba126=VisuMZ[_0x36b7('0xee')](_0x4ba126));const _0x4ed71e=this[_0x36b7('0x126')]()-0x1,_0x207eb9=this[_0x36b7('0x4')]();this[_0x36b7('0xcc')](),this[_0x36b7('0x156')][_0x36b7('0x229')](_0x4ba126,0x0,0x0,_0x4ed71e,_0x207eb9,_0x36b7('0x3b5'));},Sprite_Gauge[_0x36b7('0x33c')][_0x36b7('0x585')]=function(){return 0x3;},Sprite_Gauge[_0x36b7('0x33c')][_0x36b7('0x1fb')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')]['DigitGroupingGaugeSprites'];};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x36b7('0x33c')]=Object[_0x36b7('0x4e7')](Sprite_Clickable[_0x36b7('0x33c')]),Sprite_TitlePictureButton[_0x36b7('0x33c')][_0x36b7('0xe6')]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x36b7('0x33c')][_0x36b7('0x4d2')]=function(_0x358679){Sprite_Clickable[_0x36b7('0x33c')][_0x36b7('0x4d2')][_0x36b7('0x2f9')](this),this[_0x36b7('0x552')]=_0x358679,this[_0x36b7('0x117')]=null,this[_0x36b7('0x4e3')]();},Sprite_TitlePictureButton[_0x36b7('0x33c')][_0x36b7('0x4e3')]=function(){this['x']=Graphics[_0x36b7('0x25c')],this['y']=Graphics[_0x36b7('0x4d6')],this[_0x36b7('0x3ad')]=![],this[_0x36b7('0x44d')]();},Sprite_TitlePictureButton[_0x36b7('0x33c')]['setupButtonImage']=function(){this[_0x36b7('0x156')]=ImageManager['loadPicture'](this['_data']['PictureFilename']),this[_0x36b7('0x156')][_0x36b7('0x532')](this[_0x36b7('0x108')][_0x36b7('0x1d7')](this));},Sprite_TitlePictureButton[_0x36b7('0x33c')][_0x36b7('0x108')]=function(){this[_0x36b7('0x552')][_0x36b7('0x2b2')][_0x36b7('0x2f9')](this),this[_0x36b7('0x552')][_0x36b7('0x2e9')]['call'](this),this[_0x36b7('0xca')](this[_0x36b7('0x552')][_0x36b7('0x57d')][_0x36b7('0x1d7')](this));},Sprite_TitlePictureButton[_0x36b7('0x33c')][_0x36b7('0x382')]=function(){Sprite_Clickable[_0x36b7('0x33c')][_0x36b7('0x382')][_0x36b7('0x2f9')](this),this['updateOpacity'](),this[_0x36b7('0x4b7')]();},Sprite_TitlePictureButton[_0x36b7('0x33c')][_0x36b7('0x567')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x4ce')][_0x36b7('0x236')][_0x36b7('0x40e')];},Sprite_TitlePictureButton[_0x36b7('0x33c')][_0x36b7('0x2bf')]=function(){if(this[_0x36b7('0x165')])this[_0x36b7('0x31d')]=0xff;else{if(_0x36b7('0x51d')!==_0x36b7('0x51d')){function _0x178594(){return 0x0;}}else this[_0x36b7('0x31d')]+=this[_0x36b7('0x3ad')]?this['fadeSpeed']():-0x1*this[_0x36b7('0x567')](),this[_0x36b7('0x31d')]=Math['min'](0xc0,this[_0x36b7('0x31d')]);}},Sprite_TitlePictureButton[_0x36b7('0x33c')][_0x36b7('0xca')]=function(_0x2709f6){this[_0x36b7('0x117')]=_0x2709f6;},Sprite_TitlePictureButton[_0x36b7('0x33c')][_0x36b7('0x326')]=function(){this[_0x36b7('0x117')]&&this['_clickHandler']();},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x3e1')]=Spriteset_Base['prototype']['initialize'],Spriteset_Base['prototype'][_0x36b7('0x4d2')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x3e1')][_0x36b7('0x2f9')](this),this[_0x36b7('0x1a3')]=[];},VisuMZ['CoreEngine'][_0x36b7('0x30f')]=Spriteset_Base[_0x36b7('0x33c')][_0x36b7('0x47c')],Spriteset_Base[_0x36b7('0x33c')][_0x36b7('0x47c')]=function(_0x48e4c7){this[_0x36b7('0x4c6')](),VisuMZ['CoreEngine'][_0x36b7('0x30f')][_0x36b7('0x2f9')](this,_0x48e4c7);},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x385')]=Spriteset_Base[_0x36b7('0x33c')][_0x36b7('0x382')],Spriteset_Base[_0x36b7('0x33c')][_0x36b7('0x382')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x385')][_0x36b7('0x2f9')](this),this['updatePictureAntiZoom'](),this[_0x36b7('0x113')]();},Spriteset_Base[_0x36b7('0x33c')][_0x36b7('0x279')]=function(){if(!VisuMZ['CoreEngine']['Settings'][_0x36b7('0x523')][_0x36b7('0xc5')])return;if(this[_0x36b7('0x66')]['x']!==0x0){if(_0x36b7('0x535')!==_0x36b7('0x343'))this[_0x36b7('0x16f')][_0x36b7('0x66')]['x']=0x1/this[_0x36b7('0x66')]['x'],this[_0x36b7('0x16f')]['x']=-(this['x']/this[_0x36b7('0x66')]['x']);else{function _0x584262(){this[_0x36b7('0xb0')][_0x36b7('0x2aa')](_0x5f0996[_0x36b7('0x171')][_0x36b7('0x322')]);}}}if(this[_0x36b7('0x66')]['y']!==0x0){if(_0x36b7('0x33a')!==_0x36b7('0x33a')){function _0x4cdee3(){this[_0x36b7('0x30e')][_0x36b7('0x2aa')](_0x1058d9['layoutSettings'][_0x36b7('0x249')]);}}else this[_0x36b7('0x16f')][_0x36b7('0x66')]['y']=0x1/this[_0x36b7('0x66')]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x36b7('0x66')]['y']);}},Spriteset_Base[_0x36b7('0x33c')][_0x36b7('0x113')]=function(){for(const _0x185436 of this[_0x36b7('0x1a3')]){if(_0x36b7('0x2cb')===_0x36b7('0x2cb')){if(!_0x185436['isPlaying']()){if(_0x36b7('0xa8')===_0x36b7('0xdb')){function _0x3c9fec(){_0xe3d4d0[_0x36b7('0x316')](),_0x12a695[_0x36b7('0x1ff')](_0x1dc811);}}else this['removeFauxAnimation'](_0x185436);}}else{function _0x117659(){return _0x1da336[_0x36b7('0x171')][_0x36b7('0x544')][_0x36b7('0x2f9')](this);}}}this[_0x36b7('0x25b')]();},Spriteset_Base[_0x36b7('0x33c')][_0x36b7('0x25b')]=function(){for(;;){const _0x47196b=$gameTemp[_0x36b7('0xbd')]();if(_0x47196b){if(_0x36b7('0x23c')!==_0x36b7('0x23c')){function _0x2ba578(){let _0xca8639=this[_0x36b7('0xa2')]();const _0x35d7ff=this['maxItems'](),_0xd1d569=this['maxCols']();if(this[_0x36b7('0x437')]()&&(_0xca8639<_0x35d7ff||_0x2a7ba0&&_0xd1d569===0x1)){_0xca8639+=_0xd1d569;if(_0xca8639>=_0x35d7ff)_0xca8639=_0x35d7ff-0x1;this[_0x36b7('0x1a8')](_0xca8639);}}}else this[_0x36b7('0x5e')](_0x47196b);}else{if(_0x36b7('0x98')===_0x36b7('0x197')){function _0x1443f4(){this[_0x36b7('0xd0')]=_0x457e8f;}}else break;}}},Spriteset_Base[_0x36b7('0x33c')][_0x36b7('0x5e')]=function(_0x191b21){const _0x76167b=$dataAnimations[_0x191b21[_0x36b7('0x2f6')]],_0x50beb6=_0x191b21[_0x36b7('0x243')],_0x4612c5=_0x191b21['mirror'],_0x519c63=_0x191b21[_0x36b7('0x352')];let _0x24fe4f=this[_0x36b7('0x4bf')]();const _0x38bf8a=this[_0x36b7('0x199')]();if(this[_0x36b7('0x42e')](_0x76167b))for(const _0x2e748e of _0x50beb6){this[_0x36b7('0x50f')]([_0x2e748e],_0x76167b,_0x4612c5,_0x24fe4f,_0x519c63),_0x24fe4f+=_0x38bf8a;}else this[_0x36b7('0x50f')](_0x50beb6,_0x76167b,_0x4612c5,_0x24fe4f);},Spriteset_Base[_0x36b7('0x33c')][_0x36b7('0x50f')]=function(_0x147520,_0x3ca7d7,_0xfcd8d7,_0x2be5bd,_0x5a0636){const _0x105669=this[_0x36b7('0x17a')](_0x3ca7d7),_0x38344e=new(_0x105669?Sprite_AnimationMV:Sprite_Animation)(),_0x544524=this[_0x36b7('0x3d0')](_0x147520);if(this[_0x36b7('0x170')](_0x147520[0x0])){if(_0x36b7('0x4f4')!==_0x36b7('0x40b'))_0xfcd8d7=!_0xfcd8d7;else{function _0xe6b6b6(){this[_0x36b7('0x217')]={};}}}_0x38344e[_0x36b7('0x273')]=_0x147520,_0x38344e[_0x36b7('0x4e3')](_0x544524,_0x3ca7d7,_0xfcd8d7,_0x2be5bd),_0x38344e['setMute'](_0x5a0636),this[_0x36b7('0x3c')][_0x36b7('0x501')](_0x38344e),this[_0x36b7('0x1a3')][_0x36b7('0x423')](_0x38344e);},Spriteset_Base[_0x36b7('0x33c')][_0x36b7('0x2d3')]=function(_0x29fc95){this[_0x36b7('0x1a3')][_0x36b7('0x169')](_0x29fc95),this['_effectsContainer'][_0x36b7('0x547')](_0x29fc95);for(const _0x4c38f4 of _0x29fc95['targetObjects']){if(_0x4c38f4[_0x36b7('0x498')]){if(_0x36b7('0x419')===_0x36b7('0x419'))_0x4c38f4[_0x36b7('0x498')]();else{function _0x3b4830(){this['_anchor']=_0x3e71fb,this['_targetAnchor']=_0x4d054a[_0x36b7('0x487')](this[_0x36b7('0xec')]);}}}}_0x29fc95[_0x36b7('0x47c')]();},Spriteset_Base['prototype'][_0x36b7('0x4c6')]=function(){for(const _0x39fb8e of this[_0x36b7('0x1a3')]){this[_0x36b7('0x2d3')](_0x39fb8e);}},Spriteset_Base['prototype']['isFauxAnimationPlaying']=function(){return this[_0x36b7('0x1a3')][_0x36b7('0x1d6')]>0x0;},VisuMZ['CoreEngine'][_0x36b7('0x147')]=Spriteset_Battle[_0x36b7('0x33c')][_0x36b7('0xe2')],Spriteset_Battle[_0x36b7('0x33c')][_0x36b7('0xe2')]=function(){if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0x181')]){if(_0x36b7('0x10e')===_0x36b7('0x10e'))this[_0x36b7('0x321')]();else{function _0x20102e(){this[_0x36b7('0x1d0')](_0x224564,_0x3769f0+0x2,_0x8fa865+0x2),_0xdad0c1-=_0x1e43dc[_0x36b7('0xe7')]+0x4,_0x2966d7+=_0xc044f0[_0x36b7('0xe7')]+0x4;}}}VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x147')][_0x36b7('0x2f9')](this);},Spriteset_Battle[_0x36b7('0x33c')][_0x36b7('0x321')]=function(){for(member of $gameTroop[_0x36b7('0x4b')]()){member[_0x36b7('0x56d')]();}},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x3e0')]=Window_Base[_0x36b7('0x33c')][_0x36b7('0x4d2')],Window_Base[_0x36b7('0x33c')]['initialize']=function(_0x460769){this[_0x36b7('0x55f')](),VisuMZ[_0x36b7('0x4d1')]['Window_Base_initialize'][_0x36b7('0x2f9')](this,_0x460769),this[_0x36b7('0x36d')]();},Window_Base['prototype'][_0x36b7('0x55f')]=function(){this[_0x36b7('0xd0')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0xac')],this[_0x36b7('0x2ba')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['QoL'][_0x36b7('0x526')];},Window_Base[_0x36b7('0x33c')][_0x36b7('0x2c9')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x464')][_0x36b7('0x283')];},Window_Base[_0x36b7('0x33c')][_0x36b7('0x297')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x464')][_0x36b7('0x42a')];},Window_Base[_0x36b7('0x33c')][_0x36b7('0x1f1')]=function(){this['backOpacity']=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x464')][_0x36b7('0x82')];},Window_Base[_0x36b7('0x33c')][_0x36b7('0x21e')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x464')]['TranslucentOpacity'];},Window_Base[_0x36b7('0x33c')][_0x36b7('0x7')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x464')][_0x36b7('0x19d')];},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0xb7')]=Window_Base[_0x36b7('0x33c')][_0x36b7('0x382')],Window_Base[_0x36b7('0x33c')][_0x36b7('0x382')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0xb7')]['call'](this),this[_0x36b7('0x57')]();},Window_Base['prototype'][_0x36b7('0x268')]=function(){this[_0x36b7('0x4e0')]&&(this['openness']+=this[_0x36b7('0x7')](),this[_0x36b7('0x25d')]()&&(this[_0x36b7('0x4e0')]=![]));},Window_Base[_0x36b7('0x33c')][_0x36b7('0x19c')]=function(){this[_0x36b7('0x301')]&&(this['openness']-=this[_0x36b7('0x7')](),this[_0x36b7('0x3d6')]()&&(this['_closing']=![]));},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x457')]=Window_Base[_0x36b7('0x33c')]['drawText'],Window_Base[_0x36b7('0x33c')][_0x36b7('0x229')]=function(_0x33e09d,_0x5a6c37,_0x46ced0,_0x2c3687,_0x4606ee){if(this[_0x36b7('0x1fb')]())_0x33e09d=VisuMZ[_0x36b7('0xee')](_0x33e09d);VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x457')][_0x36b7('0x2f9')](this,_0x33e09d,_0x5a6c37,_0x46ced0,_0x2c3687,_0x4606ee);},Window_Base[_0x36b7('0x33c')][_0x36b7('0x1fb')]=function(){return this['_digitGrouping'];},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x406')]=Window_Base[_0x36b7('0x33c')]['createTextState'],Window_Base[_0x36b7('0x33c')]['createTextState']=function(_0x4aebf1,_0x3f0f6d,_0x2dfadc,_0x4ab825){var _0x45d9f5=VisuMZ[_0x36b7('0x4d1')]['Window_Base_createTextState'][_0x36b7('0x2f9')](this,_0x4aebf1,_0x3f0f6d,_0x2dfadc,_0x4ab825);if(this['useDigitGroupingEx']())_0x45d9f5[_0x36b7('0x594')]=VisuMZ[_0x36b7('0xee')](_0x45d9f5[_0x36b7('0x594')]);return _0x45d9f5;},Window_Base[_0x36b7('0x33c')][_0x36b7('0x7f')]=function(){return this[_0x36b7('0x2ba')];},Window_Base['prototype'][_0x36b7('0x58d')]=function(_0x34af2c){this[_0x36b7('0xd0')]=_0x34af2c;},Window_Base[_0x36b7('0x33c')][_0x36b7('0x1b8')]=function(_0x23ff72){this['_digitGroupingEx']=_0x23ff72;},Window_Base[_0x36b7('0x33c')][_0x36b7('0x36d')]=function(){this[_0x36b7('0x2cf')]={'duration':0x0,'wholeDuration':0x0,'type':_0x36b7('0x3fa'),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x36b7('0x66')]['x'],'targetScaleY':this[_0x36b7('0x66')]['y'],'targetOpacity':this[_0x36b7('0x31d')],'targetBackOpacity':this[_0x36b7('0x5a5')],'targetContentsOpacity':this[_0x36b7('0x115')]};},Window_Base[_0x36b7('0x33c')][_0x36b7('0x57')]=function(){if(!this[_0x36b7('0x2cf')])return;if(this[_0x36b7('0x2cf')][_0x36b7('0x3d4')]<=0x0)return;this['x']=this[_0x36b7('0x47d')](this['x'],this[_0x36b7('0x2cf')][_0x36b7('0x2a8')]),this['y']=this[_0x36b7('0x47d')](this['y'],this[_0x36b7('0x2cf')][_0x36b7('0x4c')]),this[_0x36b7('0x66')]['x']=this[_0x36b7('0x47d')](this['scale']['x'],this[_0x36b7('0x2cf')][_0x36b7('0x96')]),this[_0x36b7('0x66')]['y']=this[_0x36b7('0x47d')](this[_0x36b7('0x66')]['y'],this[_0x36b7('0x2cf')][_0x36b7('0x4a0')]),this[_0x36b7('0x31d')]=this[_0x36b7('0x47d')](this[_0x36b7('0x31d')],this[_0x36b7('0x2cf')][_0x36b7('0x275')]),this[_0x36b7('0x5a5')]=this[_0x36b7('0x47d')](this[_0x36b7('0x5a5')],this[_0x36b7('0x2cf')][_0x36b7('0x536')]),this['contentsOpacity']=this[_0x36b7('0x47d')](this[_0x36b7('0x115')],this[_0x36b7('0x2cf')][_0x36b7('0x313')]),this[_0x36b7('0x2cf')]['duration']--;},Window_Base[_0x36b7('0x33c')][_0x36b7('0x47d')]=function(_0x3ad49e,_0x35dfbd){if(!this[_0x36b7('0x2cf')])return _0x35dfbd;const _0x16b1e4=this[_0x36b7('0x2cf')][_0x36b7('0x3d4')],_0x3bb276=this[_0x36b7('0x2cf')][_0x36b7('0x123')],_0x61a2e6=this[_0x36b7('0x3d2')]((_0x3bb276-_0x16b1e4)/_0x3bb276),_0x5355ab=this[_0x36b7('0x3d2')]((_0x3bb276-_0x16b1e4+0x1)/_0x3bb276),_0x5a1d77=(_0x3ad49e-_0x35dfbd*_0x61a2e6)/(0x1-_0x61a2e6);return _0x5a1d77+(_0x35dfbd-_0x5a1d77)*_0x5355ab;},Window_Base[_0x36b7('0x33c')][_0x36b7('0x3d2')]=function(_0x25aaa7){if(!this[_0x36b7('0x2cf')])return _0x25aaa7;return VisuMZ[_0x36b7('0x227')](_0x25aaa7,this[_0x36b7('0x2cf')][_0x36b7('0x34c')]||_0x36b7('0x3fa'));},Window_Base[_0x36b7('0x33c')][_0x36b7('0x480')]=function(_0x465fb0,_0x3fca5e){if(!this[_0x36b7('0x2cf')])return;this['x']=this[_0x36b7('0x2cf')][_0x36b7('0x2a8')],this['y']=this[_0x36b7('0x2cf')][_0x36b7('0x4c')],this[_0x36b7('0x66')]['x']=this[_0x36b7('0x2cf')][_0x36b7('0x96')],this['scale']['y']=this[_0x36b7('0x2cf')][_0x36b7('0x4a0')],this[_0x36b7('0x31d')]=this[_0x36b7('0x2cf')][_0x36b7('0x275')],this[_0x36b7('0x5a5')]=this[_0x36b7('0x2cf')][_0x36b7('0x536')],this[_0x36b7('0x115')]=this['_coreEasing'][_0x36b7('0x313')],this[_0x36b7('0x3ec')](_0x465fb0,_0x3fca5e,this['x'],this['y'],this[_0x36b7('0x66')]['x'],this[_0x36b7('0x66')]['y'],this['opacity'],this[_0x36b7('0x5a5')],this[_0x36b7('0x115')]);},Window_Base[_0x36b7('0x33c')][_0x36b7('0x3ec')]=function(_0x1f6607,_0xaae1ff,_0x1f20dd,_0x50b715,_0x4794ed,_0x464086,_0x3ba7b7,_0x5c31a2,_0x38f230){this[_0x36b7('0x2cf')]={'duration':_0x1f6607,'wholeDuration':_0x1f6607,'type':_0xaae1ff,'targetX':_0x1f20dd,'targetY':_0x50b715,'targetScaleX':_0x4794ed,'targetScaleY':_0x464086,'targetOpacity':_0x3ba7b7,'targetBackOpacity':_0x5c31a2,'targetContentsOpacity':_0x38f230};},Window_Base[_0x36b7('0x33c')][_0x36b7('0x1db')]=function(_0x1a124b,_0x34ddc3,_0x476088,_0x4ba116,_0x4e71a2){this['resetFontSettings'](),this[_0x36b7('0x51c')][_0x36b7('0x18b')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['Gold']['GoldFontSize'];const _0x19451c=VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x3c6')][_0x36b7('0x351')];if(_0x19451c>0x0&&_0x34ddc3===TextManager[_0x36b7('0x4f9')]){if(_0x36b7('0x16')!=='IAYjq'){function _0x2d539b(){_0x4a0a06['endAnimation']&&_0x31da6c[_0x36b7('0x498')]();}}else{const _0x49be14=_0x4ba116+(this[_0x36b7('0x2c9')]()-ImageManager[_0x36b7('0x262')])/0x2;this[_0x36b7('0x1d0')](_0x19451c,_0x476088+(_0x4e71a2-ImageManager[_0x36b7('0xe7')]),_0x49be14),_0x4e71a2-=ImageManager[_0x36b7('0xe7')]+0x4;}}else{if('SQfKH'===_0x36b7('0x163'))this[_0x36b7('0x485')](ColorManager[_0x36b7('0xe5')]()),this[_0x36b7('0x229')](_0x34ddc3,_0x476088,_0x4ba116,_0x4e71a2,_0x36b7('0x3b5')),_0x4e71a2-=this[_0x36b7('0x45b')](_0x34ddc3)+0x6;else{function _0x466901(){return _0x2a5994(_0x22e27b['$1']);}}}this[_0x36b7('0x590')]();const _0x43852c=this[_0x36b7('0x45b')](this[_0x36b7('0xd0')]?VisuMZ['GroupDigits'](_0x1a124b):_0x1a124b);_0x43852c>_0x4e71a2?this['drawText'](VisuMZ['CoreEngine'][_0x36b7('0x91')][_0x36b7('0x3c6')][_0x36b7('0x26a')],_0x476088,_0x4ba116,_0x4e71a2,_0x36b7('0x3b5')):this[_0x36b7('0x229')](_0x1a124b,_0x476088,_0x4ba116,_0x4e71a2,_0x36b7('0x3b5')),this['resetFontSettings']();},Window_Base[_0x36b7('0x33c')][_0x36b7('0x248')]=function(_0x3aee5a,_0x1b6160,_0x2e1a23,_0x3db9c6,_0x563618){const _0x4d9149=ImageManager['loadSystem'](_0x36b7('0x1e2')),_0x3b71db=ImageManager[_0x36b7('0xe7')],_0x233031=ImageManager[_0x36b7('0x262')],_0x46b24b=_0x3aee5a%0x10*_0x3b71db,_0x487f91=Math[_0x36b7('0x3ca')](_0x3aee5a/0x10)*_0x233031,_0x10ce1b=_0x3db9c6,_0x95e30a=_0x3db9c6;this[_0x36b7('0x51c')][_0x36b7('0x282')][_0x36b7('0x26e')]=_0x563618,this['contents'][_0x36b7('0x250')](_0x4d9149,_0x46b24b,_0x487f91,_0x3b71db,_0x233031,_0x1b6160,_0x2e1a23,_0x10ce1b,_0x95e30a),this['contents'][_0x36b7('0x282')][_0x36b7('0x26e')]=!![];},Window_Base[_0x36b7('0x33c')][_0x36b7('0x583')]=function(_0x577461,_0x1dbd84,_0x2a2ef7,_0x13044f,_0x561a41,_0xf4f9fc){const _0x298f7f=Math[_0x36b7('0x3ca')]((_0x2a2ef7-0x2)*_0x13044f),_0x48264b=Sprite_Gauge[_0x36b7('0x33c')]['gaugeHeight'][_0x36b7('0x2f9')](this),_0x3bab0c=_0x1dbd84+this[_0x36b7('0x2c9')]()-_0x48264b-0x2;this[_0x36b7('0x51c')][_0x36b7('0x16e')](_0x577461,_0x3bab0c,_0x2a2ef7,_0x48264b,ColorManager[_0x36b7('0x2dd')]()),this[_0x36b7('0x51c')][_0x36b7('0x333')](_0x577461+0x1,_0x3bab0c+0x1,_0x298f7f,_0x48264b-0x2,_0x561a41,_0xf4f9fc);},Window_Selectable[_0x36b7('0x33c')][_0x36b7('0x407')]=function(_0x1102cd){let _0x331107=this['index']();const _0x4e88ae=this['maxItems'](),_0x4704d1=this[_0x36b7('0x331')]();if(this[_0x36b7('0x437')]()&&(_0x331107<_0x4e88ae||_0x1102cd&&_0x4704d1===0x1)){_0x331107+=_0x4704d1;if(_0x331107>=_0x4e88ae)_0x331107=_0x4e88ae-0x1;this[_0x36b7('0x1a8')](_0x331107);}},Window_Selectable[_0x36b7('0x33c')][_0x36b7('0x437')]=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0x49')];},VisuMZ['CoreEngine'][_0x36b7('0x379')]=Window_Selectable[_0x36b7('0x33c')][_0x36b7('0x11c')],Window_Selectable['prototype']['processCursorMove']=function(){if(this[_0x36b7('0x437')]()){if(_0x36b7('0x20b')===_0x36b7('0x270')){function _0x3df967(){this[_0x36b7('0x165')]=![],this[_0x36b7('0x326')]();}}else this[_0x36b7('0xa5')](),this[_0x36b7('0xe3')]();}else VisuMZ[_0x36b7('0x4d1')]['Window_Selectable_processCursorMove'][_0x36b7('0x2f9')](this);},Window_Selectable[_0x36b7('0x33c')][_0x36b7('0xa5')]=function(){if(this[_0x36b7('0x42c')]()){const _0x2dc1c0=this[_0x36b7('0xa2')]();if(Input[_0x36b7('0x3f0')](_0x36b7('0x47'))){if(_0x36b7('0x10d')!==_0x36b7('0x31e'))Input[_0x36b7('0x4fb')](_0x36b7('0x3ab'))?this[_0x36b7('0x58c')]():this[_0x36b7('0x407')](Input[_0x36b7('0x34e')](_0x36b7('0x47')));else{function _0x3cb8c0(){const _0x63c71a=_0x3c54a9[0x2],_0x2daaee=_0x403913[_0x36b7('0x4d1')][_0x36b7('0x528')][_0x36b7('0x2f9')](this,_0x216fe3),_0x10343c=_0x1ba30c[_0x36b7('0x2e4')](_0x5658b0[0x0]);if(_0x10343c)_0x10343c[_0x36b7('0x45f')]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x63c71a]);return _0x2daaee;}}}Input[_0x36b7('0x3f0')]('up')&&(Input[_0x36b7('0x4fb')](_0x36b7('0x3ab'))?this[_0x36b7('0x1a')]():this[_0x36b7('0x37f')](Input[_0x36b7('0x34e')]('up')));if(Input[_0x36b7('0x3f0')](_0x36b7('0x3b5'))){if(_0x36b7('0x40f')===_0x36b7('0x40f'))this[_0x36b7('0xf9')](Input['isTriggered'](_0x36b7('0x3b5')));else{function _0x2c0b19(){return this[_0x36b7('0x9a')]();}}}Input[_0x36b7('0x3f0')](_0x36b7('0x377'))&&this['cursorLeft'](Input['isTriggered'](_0x36b7('0x377')));if(!this[_0x36b7('0x128')]('pagedown')&&Input['isRepeated']('pagedown')){if(_0x36b7('0x284')!==_0x36b7('0x4f2'))this[_0x36b7('0x58c')]();else{function _0x43fed5(){const _0x2633f4=_0x23a70e[_0x36b7('0x33c')]['traitObjects'][_0x36b7('0x2f9')](this);for(const _0x3452bd of this[_0x36b7('0x54d')]()){_0x3452bd&&_0x2633f4['push'](_0x3452bd);}return _0x2633f4[_0x36b7('0x423')](this[_0x36b7('0xea')](),this['actor']()),_0x2633f4;}}}if(!this[_0x36b7('0x128')](_0x36b7('0x92'))&&Input[_0x36b7('0x3f0')](_0x36b7('0x92'))){if('eoFAl'!==_0x36b7('0x474')){function _0x54aa76(){return _0x433c8a[_0x36b7('0x171')][_0x36b7('0x280')][_0x36b7('0x2f9')](this);}}else this[_0x36b7('0x1a')]();}if(this[_0x36b7('0xa2')]()!==_0x2dc1c0){if(_0x36b7('0x2e5')===_0x36b7('0x12f')){function _0x18e684(){return _0x28f89f[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0xc4')];}}else this[_0x36b7('0x56')]();}}},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x388')]=Window_Selectable[_0x36b7('0x33c')][_0x36b7('0x407')],Window_Selectable[_0x36b7('0x33c')][_0x36b7('0x407')]=function(_0x35d113){if(this[_0x36b7('0x437')]()&&_0x35d113&&this['maxCols']()===0x1&&this[_0x36b7('0xa2')]()===this['maxItems']()-0x1){if(_0x36b7('0x33b')===_0x36b7('0x33b'))this['smoothSelect'](0x0);else{function _0x321382(){return _0x71c3f8[_0x36b7('0x4ea')]-this[_0x36b7('0x251')]();}}}else VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x388')][_0x36b7('0x2f9')](this,_0x35d113);},Window_Selectable[_0x36b7('0x33c')][_0x36b7('0xe3')]=function(){if(this[_0x36b7('0x42c')]()){const _0x8388da=this[_0x36b7('0xa2')]();Input[_0x36b7('0x34e')](_0x36b7('0x56c'))&&this[_0x36b7('0x1a8')](Math['min'](this[_0x36b7('0xa2')](),0x0));if(Input[_0x36b7('0x34e')](_0x36b7('0x4b9'))){if('hlRzw'!=='vKnIp')this[_0x36b7('0x1a8')](Math[_0x36b7('0x476')](this['index'](),this[_0x36b7('0x12d')]()-0x1));else{function _0x4e7cce(){_0x393d08=this['helpAreaTopSideButtonLayout']();}}}if(this[_0x36b7('0xa2')]()!==_0x8388da){if('jTGDd'===_0x36b7('0x1ef')){function _0x2305be(){_0x154ffc[_0x36b7('0x4d1')][_0x36b7('0x364')][_0x36b7('0x2f9')](this);}}else this[_0x36b7('0x56')]();}}},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x364')]=Window_Selectable[_0x36b7('0x33c')][_0x36b7('0x4b7')],Window_Selectable[_0x36b7('0x33c')][_0x36b7('0x4b7')]=function(){this[_0x36b7('0x437')]()?this['processTouchModernControls']():VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x364')][_0x36b7('0x2f9')](this);},Window_Selectable[_0x36b7('0x33c')][_0x36b7('0x325')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x364')][_0x36b7('0x2f9')](this);},Window_Selectable[_0x36b7('0x33c')]['colSpacing']=function(){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x464')][_0x36b7('0x32')];},Window_Selectable[_0x36b7('0x33c')]['rowSpacing']=function(){return VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x464')]['RowSpacing'];},Window_Selectable['prototype']['itemHeight']=function(){return Window_Scrollable[_0x36b7('0x33c')][_0x36b7('0x48c')]['call'](this)+VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x464')][_0x36b7('0x39b')];;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x3a2')]=Window_Selectable['prototype'][_0x36b7('0x38')],Window_Selectable[_0x36b7('0x33c')][_0x36b7('0x38')]=function(_0x4d3814){const _0x216fee=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x464')];if(_0x216fee['ShowItemBackground']===![])return;if(_0x216fee[_0x36b7('0x10f')]){if(_0x36b7('0x24')===_0x36b7('0x24'))_0x216fee[_0x36b7('0x10f')][_0x36b7('0x2f9')](this,_0x4d3814);else{function _0x44a0e8(){var _0x516660=_0x40d433(_0x36d176['$1']);try{_0x31c56f+=_0x558754(_0x516660);}catch(_0x3d6aa3){if(_0x502dfd[_0x36b7('0x41e')]())_0x135224[_0x36b7('0x9e')](_0x3d6aa3);}}}}else{if(_0x36b7('0x575')!==_0x36b7('0xf7'))VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x3a2')][_0x36b7('0x2f9')](this,_0x4d3814);else{function _0x3c4a6c(){return _0x47865a['ApplyEasing'](_0x32dfc8,this[_0x36b7('0x479')]);}}}},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x2c1')]=Window_Gold[_0x36b7('0x33c')][_0x36b7('0x52')],Window_Gold[_0x36b7('0x33c')][_0x36b7('0x52')]=function(){if(this[_0x36b7('0x137')]()){if(_0x36b7('0x3c4')!=='HYVFQ'){function _0x23b6c1(){var _0x134400=_0x4626bf(_0x46b6b3['$1']);_0x5cf9c0+=_0x134400;}}else this[_0x36b7('0x20')]();}else VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x2c1')][_0x36b7('0x2f9')](this);},Window_Gold['prototype'][_0x36b7('0x137')]=function(){if(TextManager[_0x36b7('0x4f9')]!==this['currencyUnit']())return![];return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x3c6')][_0x36b7('0x334')];},Window_Gold[_0x36b7('0x33c')]['drawGoldItemStyle']=function(){this[_0x36b7('0x4b5')](),this['contents']['clear'](),this[_0x36b7('0x51c')][_0x36b7('0x18b')]=VisuMZ[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x3c6')][_0x36b7('0x3f2')];const _0x573aad=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['Gold']['GoldIcon'],_0x2d227c=this['itemLineRect'](0x0);if(_0x573aad>0x0){const _0x39f54a=_0x2d227c['y']+(this[_0x36b7('0x2c9')]()-ImageManager[_0x36b7('0x262')])/0x2;this[_0x36b7('0x1d0')](_0x573aad,_0x2d227c['x'],_0x39f54a);const _0x10df6f=ImageManager[_0x36b7('0xe7')]+0x4;_0x2d227c['x']+=_0x10df6f,_0x2d227c[_0x36b7('0x25c')]-=_0x10df6f;}this[_0x36b7('0x485')](ColorManager[_0x36b7('0xe5')]()),this['drawText'](this['currencyUnit'](),_0x2d227c['x'],_0x2d227c['y'],_0x2d227c[_0x36b7('0x25c')],_0x36b7('0x377'));const _0x4b1edc=this[_0x36b7('0x45b')](this['currencyUnit']())+0x6;;_0x2d227c['x']+=_0x4b1edc,_0x2d227c['width']-=_0x4b1edc,this[_0x36b7('0x590')]();const _0x4c619e=this[_0x36b7('0xd3')](),_0x3900a3=this[_0x36b7('0x45b')](this['_digitGrouping']?VisuMZ[_0x36b7('0xee')](this['value']()):this[_0x36b7('0xd3')]());if(_0x3900a3>_0x2d227c[_0x36b7('0x25c')])this[_0x36b7('0x229')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x3c6')]['GoldOverlap'],_0x2d227c['x'],_0x2d227c['y'],_0x2d227c[_0x36b7('0x25c')],'right');else{if(_0x36b7('0x303')!==_0x36b7('0x136'))this[_0x36b7('0x229')](this[_0x36b7('0xd3')](),_0x2d227c['x'],_0x2d227c['y'],_0x2d227c[_0x36b7('0x25c')],_0x36b7('0x3b5'));else{function _0x1b1377(){_0x328589[_0x36b7('0x4d1')][_0x36b7('0x24c')][_0x36b7('0x2f9')](this),this[_0x36b7('0x53f')](),this[_0x36b7('0x432')](),this[_0x36b7('0x52b')]();}}}this[_0x36b7('0x4b5')]();},Window_StatusBase['prototype'][_0x36b7('0x470')]=function(_0x3785ef,_0x386e72,_0xa6557,_0x6b11fc,_0x4bb181){_0x6b11fc=String(_0x6b11fc||'')[_0x36b7('0x3fb')]();if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x23')][_0x36b7('0x50b')]){if(_0x36b7('0x2e8')===_0x36b7('0x245')){function _0x37f268(){return _0x446fb9[_0x36b7('0x171')][_0x36b7('0x499')][_0x36b7('0x2f9')](this);}}else{const _0x4ff541=VisuMZ[_0x36b7('0x4ca')](_0x6b11fc);if(_0x4bb181)this[_0x36b7('0x248')](_0x4ff541,_0x3785ef,_0x386e72,this[_0x36b7('0x75')]()),_0xa6557-=this['gaugeLineHeight']()+0x2,_0x3785ef+=this['gaugeLineHeight']()+0x2;else{if('dSHLk'===_0x36b7('0x1cf'))this[_0x36b7('0x1d0')](_0x4ff541,_0x3785ef+0x2,_0x386e72+0x2),_0xa6557-=ImageManager['iconWidth']+0x4,_0x3785ef+=ImageManager[_0x36b7('0xe7')]+0x4;else{function _0x348320(){_0x9718f4[_0x36b7('0x423')](_0x10209e);}}}}}const _0x1003d1=TextManager[_0x36b7('0x44a')](_0x6b11fc);this['resetFontSettings'](),this[_0x36b7('0x485')](ColorManager[_0x36b7('0xe5')]()),_0x4bb181?(this[_0x36b7('0x51c')]['fontSize']=this[_0x36b7('0x393')](),this[_0x36b7('0x51c')][_0x36b7('0x229')](_0x1003d1,_0x3785ef,_0x386e72,_0xa6557,this[_0x36b7('0x75')](),'left')):this[_0x36b7('0x229')](_0x1003d1,_0x3785ef,_0x386e72,_0xa6557),this['resetFontSettings']();},Window_StatusBase[_0x36b7('0x33c')][_0x36b7('0x393')]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x36b7('0x33c')][_0x36b7('0x6e')]=function(_0x12a5cd,_0x139ca4,_0x16b0cf,_0x596741){_0x596741=_0x596741||0xa8,this[_0x36b7('0x590')]();if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI']['TextCodeClassNames'])this[_0x36b7('0x52c')](_0x12a5cd[_0x36b7('0xea')]()['name'],_0x139ca4,_0x16b0cf,_0x596741);else{const _0x10f22c=_0x12a5cd[_0x36b7('0xea')]()[_0x36b7('0x176')][_0x36b7('0x12b')](/\\I\[(\d+)\]/gi,'');this[_0x36b7('0x229')](_0x10f22c,_0x139ca4,_0x16b0cf,_0x596741);}},Window_StatusBase[_0x36b7('0x33c')][_0x36b7('0x45d')]=function(_0x54b252,_0x577e90,_0x4d4027,_0x361358){_0x361358=_0x361358||0x10e,this[_0x36b7('0x590')]();if(VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0x3c0')])this[_0x36b7('0x52c')](_0x54b252[_0x36b7('0x19b')](),_0x577e90,_0x4d4027,_0x361358);else{const _0x47f28a=_0x54b252[_0x36b7('0x19b')]()[_0x36b7('0x12b')](/\\I\[(\d+)\]/gi,'');this[_0x36b7('0x229')](_0x54b252[_0x36b7('0x19b')](),_0x577e90,_0x4d4027,_0x361358);}},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x440')]=Window_StatusBase[_0x36b7('0x33c')][_0x36b7('0x1a2')],Window_StatusBase[_0x36b7('0x33c')][_0x36b7('0x1a2')]=function(_0x1713c2,_0x2c3870,_0x54fb15){if(this[_0x36b7('0x584')]())this[_0x36b7('0x373')](_0x1713c2,_0x2c3870,_0x54fb15);VisuMZ[_0x36b7('0x4d1')]['Window_StatusBase_drawActorLevel']['call'](this,_0x1713c2,_0x2c3870,_0x54fb15);},Window_StatusBase[_0x36b7('0x33c')][_0x36b7('0x584')]=function(){return VisuMZ[_0x36b7('0x4d1')]['Settings']['UI'][_0x36b7('0x453')];},Window_StatusBase[_0x36b7('0x33c')]['drawActorExpGauge']=function(_0x2a0649,_0x1328b4,_0xd4f4b0){if(!_0x2a0649)return;if(!_0x2a0649[_0x36b7('0x360')]())return;const _0x427e2f=0x80,_0x591689=_0x2a0649[_0x36b7('0x59')]();let _0x5477c9=ColorManager[_0x36b7('0xe8')](),_0x119e44=ColorManager[_0x36b7('0x29b')]();_0x591689>=0x1&&(_0x5477c9=ColorManager['maxLvGaugeColor1'](),_0x119e44=ColorManager[_0x36b7('0x53b')]()),this[_0x36b7('0x583')](_0x1328b4,_0xd4f4b0,_0x427e2f,_0x591689,_0x5477c9,_0x119e44);},Window_EquipStatus[_0x36b7('0x33c')][_0x36b7('0x111')]=function(){let _0x4ac9ce=0x0;for(const _0x2d763a of VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x23')][_0x36b7('0x1b6')]){const _0x170286=this['itemPadding'](),_0x393d59=this[_0x36b7('0x3cf')](_0x4ac9ce);this[_0x36b7('0x341')](_0x170286,_0x393d59,_0x2d763a),_0x4ac9ce++;}},Window_EquipStatus[_0x36b7('0x33c')][_0x36b7('0x1b')]=function(_0x3f4a71,_0x5d2193,_0x4f5dc9){const _0x293769=this[_0x36b7('0x2f1')]()-this['itemPadding']()*0x2;this[_0x36b7('0x470')](_0x3f4a71,_0x5d2193,_0x293769,_0x4f5dc9,![]);},Window_EquipStatus[_0x36b7('0x33c')]['drawCurrentParam']=function(_0xfc8e9c,_0x1caa48,_0x27a1d9){const _0x1d4788=this[_0x36b7('0x214')]();this[_0x36b7('0x590')](),this['drawText'](this[_0x36b7('0x401')]['paramValueByName'](_0x27a1d9,!![]),_0xfc8e9c,_0x1caa48,_0x1d4788,'right');},Window_EquipStatus[_0x36b7('0x33c')][_0x36b7('0x3c9')]=function(_0xa98093,_0x21895d){const _0x10571f=this[_0x36b7('0x1f3')]();this[_0x36b7('0x485')](ColorManager['systemColor']());const _0x588036=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['UI'][_0x36b7('0x223')];this[_0x36b7('0x229')](_0x588036,_0xa98093,_0x21895d,_0x10571f,_0x36b7('0x93'));},Window_EquipStatus[_0x36b7('0x33c')][_0x36b7('0x22')]=function(_0x9f2bc,_0x37af66,_0x5420af){const _0x47af13=this[_0x36b7('0x214')](),_0x49a5d0=this['_tempActor']['paramValueByName'](_0x5420af),_0x12e061=_0x49a5d0-this['_actor'][_0x36b7('0x538')](_0x5420af);this['changeTextColor'](ColorManager[_0x36b7('0xc')](_0x12e061)),this[_0x36b7('0x229')](VisuMZ[_0x36b7('0x58b')](_0x49a5d0,0x0),_0x9f2bc,_0x37af66,_0x47af13,'right');},Window_StatusParams['prototype'][_0x36b7('0x12d')]=function(){return VisuMZ['CoreEngine']['Settings'][_0x36b7('0x23')]['DisplayedParams'][_0x36b7('0x1d6')];},Window_StatusParams['prototype'][_0x36b7('0x341')]=function(_0x26657d){const _0x3558e4=this['itemLineRect'](_0x26657d),_0x4529ae=VisuMZ['CoreEngine']['Settings'][_0x36b7('0x23')][_0x36b7('0x1b6')][_0x26657d],_0x39f221=TextManager['param'](_0x4529ae),_0xe50457=this[_0x36b7('0x401')][_0x36b7('0x538')](_0x4529ae,!![]);this[_0x36b7('0x470')](_0x3558e4['x'],_0x3558e4['y'],0xa0,_0x4529ae,![]),this[_0x36b7('0x590')](),this['drawText'](_0xe50457,_0x3558e4['x']+0xa0,_0x3558e4['y'],0x3c,_0x36b7('0x3b5'));},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x4b6')]=Window_ShopSell[_0x36b7('0x33c')][_0x36b7('0x319')],Window_ShopSell[_0x36b7('0x33c')]['isEnabled']=function(_0x5a8242){return VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x523')][_0x36b7('0xb2')]&&DataManager['isKeyItem'](_0x5a8242)?![]:VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x4b6')][_0x36b7('0x2f9')](this,_0x5a8242);},Window_NumberInput['prototype'][_0x36b7('0x437')]=function(){return![];},Window_TitleCommand[_0x36b7('0x492')]=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')]['MenuLayout'][_0x36b7('0x236')][_0x36b7('0x16c')],Window_TitleCommand[_0x36b7('0x33c')][_0x36b7('0x400')]=function(){this[_0x36b7('0x154')]();},Window_TitleCommand[_0x36b7('0x33c')][_0x36b7('0x154')]=function(){for(const _0x5e3a83 of Window_TitleCommand[_0x36b7('0x492')]){if(_0x5e3a83[_0x36b7('0x587')]['call'](this)){const _0x28c90c=_0x5e3a83[_0x36b7('0x8b')];let _0x5cb39f=_0x5e3a83[_0x36b7('0x44e')];if(['',_0x36b7('0x7e')]['includes'](_0x5cb39f))_0x5cb39f=_0x5e3a83[_0x36b7('0x1a7')][_0x36b7('0x2f9')](this);const _0xbf93bb=_0x5e3a83[_0x36b7('0x232')]['call'](this),_0x248160=_0x5e3a83[_0x36b7('0x2ad')]['call'](this);this[_0x36b7('0xb8')](_0x5cb39f,_0x28c90c,_0xbf93bb,_0x248160),this[_0x36b7('0x10c')](_0x28c90c,_0x5e3a83[_0x36b7('0x57d')][_0x36b7('0x1d7')](this,_0x248160));}}},Window_GameEnd[_0x36b7('0x492')]=VisuMZ['CoreEngine']['Settings'][_0x36b7('0x4ce')]['GameEnd'][_0x36b7('0x16c')],Window_GameEnd[_0x36b7('0x33c')][_0x36b7('0x400')]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x36b7('0x33c')][_0x36b7('0x154')]=function(){for(const _0x12010a of Window_GameEnd[_0x36b7('0x492')]){if(_0x12010a[_0x36b7('0x587')][_0x36b7('0x2f9')](this)){const _0x4f2e8b=_0x12010a[_0x36b7('0x8b')];let _0x18ddd9=_0x12010a['TextStr'];if(['',_0x36b7('0x7e')][_0x36b7('0x592')](_0x18ddd9))_0x18ddd9=_0x12010a[_0x36b7('0x1a7')][_0x36b7('0x2f9')](this);const _0x1c6d2a=_0x12010a[_0x36b7('0x232')][_0x36b7('0x2f9')](this),_0xc83f2c=_0x12010a['ExtJS'][_0x36b7('0x2f9')](this);this[_0x36b7('0xb8')](_0x18ddd9,_0x4f2e8b,_0x1c6d2a,_0xc83f2c),this[_0x36b7('0x10c')](_0x4f2e8b,_0x12010a[_0x36b7('0x57d')][_0x36b7('0x1d7')](this,_0xc83f2c));}}};function Window_ButtonAssist(){this[_0x36b7('0x4d2')](...arguments);}Window_ButtonAssist[_0x36b7('0x33c')]=Object[_0x36b7('0x4e7')](Window_Base[_0x36b7('0x33c')]),Window_ButtonAssist[_0x36b7('0x33c')][_0x36b7('0xe6')]=Window_ButtonAssist,Window_ButtonAssist[_0x36b7('0x33c')][_0x36b7('0x4d2')]=function(_0x32da38){this[_0x36b7('0x552')]={},Window_Base[_0x36b7('0x33c')][_0x36b7('0x4d2')][_0x36b7('0x2f9')](this,_0x32da38),this[_0x36b7('0x2aa')](VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x291')][_0x36b7('0x417')]||0x0),this[_0x36b7('0x52')]();},Window_ButtonAssist[_0x36b7('0x33c')][_0x36b7('0x13')]=function(){if(this[_0x36b7('0x51c')][_0x36b7('0x18b')]<=0x60){if(_0x36b7('0x589')==='xQWIm')this[_0x36b7('0x51c')][_0x36b7('0x18b')]+=0x6;else{function _0x5cfdcc(){const _0x4bf4bb={'targets':_0x2dcb2f,'animationId':_0x1b99a3,'mirror':_0x2f574e,'mute':_0x18cb92};this['_fauxAnimationQueue']['push'](_0x4bf4bb);for(const _0x2c84f1 of _0x345dfe){_0x2c84f1[_0x36b7('0x81')]&&_0x2c84f1[_0x36b7('0x81')]();}}}}},Window_ButtonAssist[_0x36b7('0x33c')][_0x36b7('0x24a')]=function(){this[_0x36b7('0x51c')][_0x36b7('0x18b')]>=0x18&&(this[_0x36b7('0x51c')][_0x36b7('0x18b')]-=0x6);},Window_ButtonAssist[_0x36b7('0x33c')]['update']=function(){Window_Base[_0x36b7('0x33c')][_0x36b7('0x382')][_0x36b7('0x2f9')](this),this[_0x36b7('0x3ba')]();},Window_ButtonAssist[_0x36b7('0x33c')]['updatePadding']=function(){this[_0x36b7('0x310')]=SceneManager[_0x36b7('0x1b4')][_0x36b7('0x155')]()!==_0x36b7('0x16d')?0x0:0x8;},Window_ButtonAssist[_0x36b7('0x33c')][_0x36b7('0x3ba')]=function(){const _0x1f81b0=SceneManager[_0x36b7('0x1b4')];for(let _0x5710b3=0x1;_0x5710b3<=0x5;_0x5710b3++){if(this[_0x36b7('0x552')][_0x36b7('0x4e2')['format'](_0x5710b3)]!==_0x1f81b0[_0x36b7('0x38a')[_0x36b7('0x4b0')](_0x5710b3)]()){if('GMhxb'!==_0x36b7('0x1d5')){function _0x44c1(){switch(_0x17ff11[_0x36b7('0x4d1')]['Settings'][_0x36b7('0x523')][_0x36b7('0x2a')]){case _0x36b7('0x402'):return!![];case'normal':return![];default:return _0x1e18ea[_0x36b7('0x4d1')][_0x36b7('0xbb')][_0x36b7('0x2f9')](this);}}}else return this[_0x36b7('0x52')]();}if(this[_0x36b7('0x552')][_0x36b7('0x20e')[_0x36b7('0x4b0')](_0x5710b3)]!==_0x1f81b0[_0x36b7('0x1c')[_0x36b7('0x4b0')](_0x5710b3)]()){if(_0x36b7('0x521')!=='oxIzo'){function _0x1a56e8(){if(this[_0x36b7('0x55b')]<=0x0)return;const _0xe13f88=this[_0x36b7('0x55b')],_0x3da98c=this[_0x36b7('0x13f')],_0xd29178=this[_0x36b7('0x4a6')];this[_0x36b7('0x4e6')]=this['applyEasing'](this[_0x36b7('0x4e6')],this[_0x36b7('0x451')],_0xe13f88,_0x3da98c,_0xd29178),this[_0x36b7('0xf6')]=this[_0x36b7('0x3da')](this[_0x36b7('0xf6')],this[_0x36b7('0x53e')],_0xe13f88,_0x3da98c,_0xd29178),this[_0x36b7('0x55b')]--;if(this[_0x36b7('0x55b')]<=0x0)this[_0x36b7('0x483')]();}}else return this[_0x36b7('0x52')]();}}},Window_ButtonAssist['prototype'][_0x36b7('0x52')]=function(){this[_0x36b7('0x51c')][_0x36b7('0x22c')]();for(let _0xb2b681=0x1;_0xb2b681<=0x5;_0xb2b681++){if(_0x36b7('0x152')==='lAEqZ')this[_0x36b7('0x26d')](_0xb2b681);else{function _0x4c9c79(){if(this['_CoreEngineSettings']===_0x2bbd6f)this['initCoreEngine']();if(this[_0x36b7('0x1f6')]['FontSize']===_0x13e8f8)this[_0x36b7('0x391')]();return this[_0x36b7('0x1f6')][_0x36b7('0x60')];}}}},Window_ButtonAssist[_0x36b7('0x33c')][_0x36b7('0x26d')]=function(_0x452b1d){const _0x28b2d5=this[_0x36b7('0x192')]/0x5,_0x3d9850=SceneManager['_scene'],_0xe478d6=_0x3d9850[_0x36b7('0x38a')[_0x36b7('0x4b0')](_0x452b1d)](),_0x1410f3=_0x3d9850[_0x36b7('0x1c')[_0x36b7('0x4b0')](_0x452b1d)]();this[_0x36b7('0x552')][_0x36b7('0x4e2')[_0x36b7('0x4b0')](_0x452b1d)]=_0xe478d6,this[_0x36b7('0x552')]['text%1'[_0x36b7('0x4b0')](_0x452b1d)]=_0x1410f3;if(_0xe478d6==='')return;if(_0x1410f3==='')return;const _0x49f84f=_0x3d9850[_0x36b7('0xb6')[_0x36b7('0x4b0')](_0x452b1d)](),_0xf75e8c=this[_0x36b7('0x297')](),_0x35c1d1=_0x28b2d5*(_0x452b1d-0x1)+_0xf75e8c+_0x49f84f,_0x27cb2e=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x291')][_0x36b7('0x50c')];this['drawTextEx'](_0x27cb2e[_0x36b7('0x4b0')](_0xe478d6,_0x1410f3),_0x35c1d1,0x0,_0x28b2d5-_0xf75e8c*0x2);},VisuMZ[_0x36b7('0x22f')]=function(_0x45b676){if(Utils[_0x36b7('0xb4')](_0x36b7('0x4c3'))){var _0x213db2=require(_0x36b7('0x306'))[_0x36b7('0x464')][_0x36b7('0x41c')]();SceneManager[_0x36b7('0x46c')]();if(_0x45b676)setTimeout(_0x213db2[_0x36b7('0x21f')][_0x36b7('0x1d7')](_0x213db2),0x190);}},VisuMZ[_0x36b7('0x227')]=function(_0x50db3b,_0x50fc8b){_0x50fc8b=_0x50fc8b[_0x36b7('0x3fb')]();var _0x1d2a84=1.70158,_0x39923a=0.7;switch(_0x50fc8b){case _0x36b7('0x3fa'):return _0x50db3b;case _0x36b7('0x20c'):return-0x1*Math[_0x36b7('0x1ab')](_0x50db3b*(Math['PI']/0x2))+0x1;case _0x36b7('0x210'):return Math[_0x36b7('0x209')](_0x50db3b*(Math['PI']/0x2));case _0x36b7('0x31a'):return-0.5*(Math[_0x36b7('0x1ab')](Math['PI']*_0x50db3b)-0x1);case _0x36b7('0x5a3'):return _0x50db3b*_0x50db3b;case'OUTQUAD':return _0x50db3b*(0x2-_0x50db3b);case _0x36b7('0x3b6'):return _0x50db3b<0.5?0x2*_0x50db3b*_0x50db3b:-0x1+(0x4-0x2*_0x50db3b)*_0x50db3b;case _0x36b7('0x348'):return _0x50db3b*_0x50db3b*_0x50db3b;case _0x36b7('0x444'):var _0x34007c=_0x50db3b-0x1;return _0x34007c*_0x34007c*_0x34007c+0x1;case _0x36b7('0xf8'):return _0x50db3b<0.5?0x4*_0x50db3b*_0x50db3b*_0x50db3b:(_0x50db3b-0x1)*(0x2*_0x50db3b-0x2)*(0x2*_0x50db3b-0x2)+0x1;case _0x36b7('0x39c'):return _0x50db3b*_0x50db3b*_0x50db3b*_0x50db3b;case _0x36b7('0x142'):var _0x34007c=_0x50db3b-0x1;return 0x1-_0x34007c*_0x34007c*_0x34007c*_0x34007c;case _0x36b7('0x33'):var _0x34007c=_0x50db3b-0x1;return _0x50db3b<0.5?0x8*_0x50db3b*_0x50db3b*_0x50db3b*_0x50db3b:0x1-0x8*_0x34007c*_0x34007c*_0x34007c*_0x34007c;case _0x36b7('0x174'):return _0x50db3b*_0x50db3b*_0x50db3b*_0x50db3b*_0x50db3b;case _0x36b7('0x3f6'):var _0x34007c=_0x50db3b-0x1;return 0x1+_0x34007c*_0x34007c*_0x34007c*_0x34007c*_0x34007c;case _0x36b7('0x3bc'):var _0x34007c=_0x50db3b-0x1;return _0x50db3b<0.5?0x10*_0x50db3b*_0x50db3b*_0x50db3b*_0x50db3b*_0x50db3b:0x1+0x10*_0x34007c*_0x34007c*_0x34007c*_0x34007c*_0x34007c;case _0x36b7('0xe9'):if(_0x50db3b===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x50db3b-0x1));case _0x36b7('0x3f7'):if(_0x50db3b===0x1)return 0x1;return-Math[_0x36b7('0x219')](0x2,-0xa*_0x50db3b)+0x1;case'INOUTEXPO':if(_0x50db3b===0x0||_0x50db3b===0x1)return _0x50db3b;var _0x4da936=_0x50db3b*0x2,_0x519991=_0x4da936-0x1;if(_0x4da936<0x1)return 0.5*Math[_0x36b7('0x219')](0x2,0xa*_0x519991);return 0.5*(-Math['pow'](0x2,-0xa*_0x519991)+0x2);case _0x36b7('0x59d'):var _0x4da936=_0x50db3b/0x1;return-0x1*(Math[_0x36b7('0x2ab')](0x1-_0x4da936*_0x50db3b)-0x1);case _0x36b7('0x4ab'):var _0x34007c=_0x50db3b-0x1;return Math[_0x36b7('0x2ab')](0x1-_0x34007c*_0x34007c);case _0x36b7('0x5a7'):var _0x4da936=_0x50db3b*0x2,_0x519991=_0x4da936-0x2;if(_0x4da936<0x1){if('DZBUI'===_0x36b7('0x4ac'))return-0.5*(Math[_0x36b7('0x2ab')](0x1-_0x4da936*_0x4da936)-0x1);else{function _0x68cbf5(){this[_0x36b7('0xf9')](_0x30761f[_0x36b7('0x34e')](_0x36b7('0x3b5')));}}}return 0.5*(Math['sqrt'](0x1-_0x519991*_0x519991)+0x1);case _0x36b7('0x2da'):return _0x50db3b*_0x50db3b*((_0x1d2a84+0x1)*_0x50db3b-_0x1d2a84);case _0x36b7('0x344'):var _0x4da936=_0x50db3b/0x1-0x1;return _0x4da936*_0x4da936*((_0x1d2a84+0x1)*_0x4da936+_0x1d2a84)+0x1;break;case _0x36b7('0x4d4'):var _0x4da936=_0x50db3b*0x2,_0x43025a=_0x4da936-0x2,_0x3e5234=_0x1d2a84*1.525;if(_0x4da936<0x1){if(_0x36b7('0xf4')===_0x36b7('0x5a2')){function _0x4f3376(){this['_helpWindow'][_0x36b7('0x2aa')](_0x17986a[_0x36b7('0x171')][_0x36b7('0x48b')]);}}else return 0.5*_0x4da936*_0x4da936*((_0x3e5234+0x1)*_0x4da936-_0x3e5234);}return 0.5*(_0x43025a*_0x43025a*((_0x3e5234+0x1)*_0x43025a+_0x3e5234)+0x2);case'INELASTIC':if(_0x50db3b===0x0||_0x50db3b===0x1)return _0x50db3b;var _0x4da936=_0x50db3b/0x1,_0x519991=_0x4da936-0x1,_0x131bc0=0x1-_0x39923a,_0x3e5234=_0x131bc0/(0x2*Math['PI'])*Math[_0x36b7('0x390')](0x1);return-(Math[_0x36b7('0x219')](0x2,0xa*_0x519991)*Math[_0x36b7('0x209')]((_0x519991-_0x3e5234)*(0x2*Math['PI'])/_0x131bc0));case'OUTELASTIC':var _0x131bc0=0x1-_0x39923a,_0x4da936=_0x50db3b*0x2;if(_0x50db3b===0x0||_0x50db3b===0x1){if(_0x36b7('0x122')!==_0x36b7('0x122')){function _0x4014bc(){this[_0x36b7('0x1b2')]();}}else return _0x50db3b;}var _0x3e5234=_0x131bc0/(0x2*Math['PI'])*Math[_0x36b7('0x390')](0x1);return Math['pow'](0x2,-0xa*_0x4da936)*Math[_0x36b7('0x209')]((_0x4da936-_0x3e5234)*(0x2*Math['PI'])/_0x131bc0)+0x1;case _0x36b7('0x2e1'):var _0x131bc0=0x1-_0x39923a;if(_0x50db3b===0x0||_0x50db3b===0x1)return _0x50db3b;var _0x4da936=_0x50db3b*0x2,_0x519991=_0x4da936-0x1,_0x3e5234=_0x131bc0/(0x2*Math['PI'])*Math[_0x36b7('0x390')](0x1);if(_0x4da936<0x1)return-0.5*(Math[_0x36b7('0x219')](0x2,0xa*_0x519991)*Math[_0x36b7('0x209')]((_0x519991-_0x3e5234)*(0x2*Math['PI'])/_0x131bc0));return Math[_0x36b7('0x219')](0x2,-0xa*_0x519991)*Math[_0x36b7('0x209')]((_0x519991-_0x3e5234)*(0x2*Math['PI'])/_0x131bc0)*0.5+0x1;case _0x36b7('0x62'):var _0x4da936=_0x50db3b/0x1;if(_0x4da936<0x1/2.75)return 7.5625*_0x4da936*_0x4da936;else{if(_0x4da936<0x2/2.75){var _0x43025a=_0x4da936-1.5/2.75;return 7.5625*_0x43025a*_0x43025a+0.75;}else{if(_0x4da936<2.5/2.75){var _0x43025a=_0x4da936-2.25/2.75;return 7.5625*_0x43025a*_0x43025a+0.9375;}else{if(_0x36b7('0xa7')===_0x36b7('0x9')){function _0x276400(){var _0x925059=_0x51838a(_0x11e9fe['$1']);_0x361e94+=_0x925059;}}else{var _0x43025a=_0x4da936-2.625/2.75;return 7.5625*_0x43025a*_0x43025a+0.984375;}}}}case _0x36b7('0x3bb'):var _0x3d3d96=0x1-VisuMZ[_0x36b7('0x227')](0x1-_0x50db3b,_0x36b7('0x146'));return _0x3d3d96;case _0x36b7('0x381'):if(_0x50db3b<0.5)var _0x3d3d96=VisuMZ[_0x36b7('0x227')](_0x50db3b*0x2,_0x36b7('0x95'))*0.5;else{if(_0x36b7('0x578')==='Wszzf')var _0x3d3d96=VisuMZ[_0x36b7('0x227')](_0x50db3b*0x2-0x1,_0x36b7('0x146'))*0.5+0.5;else{function _0x32f140(){return 0x0;}}}return _0x3d3d96;default:return _0x50db3b;}},VisuMZ['GetParamIcon']=function(_0x20ddc9){_0x20ddc9=String(_0x20ddc9)['toUpperCase']();const _0x343217=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x91')][_0x36b7('0x23')];if(_0x20ddc9===_0x36b7('0x5a9'))return _0x343217[_0x36b7('0x253')];if(_0x20ddc9===_0x36b7('0x63'))return _0x343217[_0x36b7('0x2ce')];if(_0x20ddc9===_0x36b7('0x37e'))return _0x343217[_0x36b7('0x235')];if(_0x20ddc9===_0x36b7('0x1e7'))return _0x343217[_0x36b7('0x358')];if(_0x20ddc9===_0x36b7('0x1d2'))return _0x343217[_0x36b7('0x53')];if(_0x20ddc9===_0x36b7('0x1a5'))return _0x343217[_0x36b7('0x58')];if(_0x20ddc9===_0x36b7('0x23b'))return _0x343217[_0x36b7('0x3ff')];if(_0x20ddc9==='LUK')return _0x343217['IconParam7'];if(_0x20ddc9===_0x36b7('0x1f'))return _0x343217[_0x36b7('0x1ee')];if(_0x20ddc9===_0x36b7('0x276'))return _0x343217[_0x36b7('0x1c9')];if(_0x20ddc9===_0x36b7('0x22b'))return _0x343217['IconXParam2'];if(_0x20ddc9===_0x36b7('0x337'))return _0x343217[_0x36b7('0x140')];if(_0x20ddc9===_0x36b7('0x271'))return _0x343217[_0x36b7('0x44c')];if(_0x20ddc9===_0x36b7('0x188'))return _0x343217[_0x36b7('0x1e3')];if(_0x20ddc9==='CNT')return _0x343217[_0x36b7('0x1c0')];if(_0x20ddc9===_0x36b7('0x5c'))return _0x343217['IconXParam7'];if(_0x20ddc9==='MRG')return _0x343217['IconXParam8'];if(_0x20ddc9===_0x36b7('0x114'))return _0x343217[_0x36b7('0x77')];if(_0x20ddc9==='TGR')return _0x343217['IconSParam0'];if(_0x20ddc9==='GRD')return _0x343217[_0x36b7('0x43c')];if(_0x20ddc9==='REC')return _0x343217[_0x36b7('0x1f5')];if(_0x20ddc9===_0x36b7('0x44'))return _0x343217['IconSParam3'];if(_0x20ddc9===_0x36b7('0x3f9'))return _0x343217[_0x36b7('0x33f')];if(_0x20ddc9===_0x36b7('0x134'))return _0x343217[_0x36b7('0x530')];if(_0x20ddc9===_0x36b7('0x41d'))return _0x343217['IconSParam6'];if(_0x20ddc9===_0x36b7('0x7b'))return _0x343217[_0x36b7('0x211')];if(_0x20ddc9===_0x36b7('0xde'))return _0x343217[_0x36b7('0x40d')];if(_0x20ddc9===_0x36b7('0x35f'))return _0x343217['IconSParam9'];return 0x0;},VisuMZ[_0x36b7('0x58b')]=function(_0x428bd2,_0x3d5ddf){if(_0x428bd2%0x1===0x0)return _0x428bd2;return _0x3d5ddf=_0x3d5ddf||0x0,String((_0x428bd2*0x64)[_0x36b7('0x47f')](_0x3d5ddf))+'%';},VisuMZ['GroupDigits']=function(_0x1882ee){return _0x1882ee=String(_0x1882ee),!!_0x1882ee&&typeof _0x1882ee===_0x36b7('0x56f')&&(_0x1882ee=_0x1882ee[_0x36b7('0x12b')](/(\d+\.?\d*)/g,(_0x28f52f,_0x29c9da)=>{let _0x3aec18=_0x29c9da;if(_0x3aec18[0x0]==='0')return _0x3aec18;if(_0x3aec18[_0x3aec18[_0x36b7('0x1d6')]-0x1]==='.')return Number(_0x3aec18)[_0x36b7('0x48a')]()+'.';else{if(_0x3aec18[_0x3aec18[_0x36b7('0x1d6')]-0x1]===','){if('Ctlop'!==_0x36b7('0x565')){function _0x2e8fc4(){return this[_0x36b7('0x1ce')];}}else return Number(_0x3aec18)[_0x36b7('0x48a')]()+',';}else{if('gctws'==='ccdkY'){function _0x53d214(){_0x45e2e4[_0x36b7('0x4d1')][_0x36b7('0x545')]['call'](this,_0x2af890,_0x50f71e,_0x15d5e6,_0x17b1d1);}}else return Number(_0x3aec18)['toLocaleString']();}}})),_0x1882ee;},VisuMZ[_0x36b7('0x287')]=function(_0x5a2234){SoundManager[_0x36b7('0x4db')]();if(!Utils[_0x36b7('0x3c7')]()){const _0x3080a9=window['open'](_0x5a2234,_0x36b7('0x4c5'));}else{const _0x77ee6b=process[_0x36b7('0x228')]=='darwin'?_0x36b7('0x308'):process[_0x36b7('0x228')]==_0x36b7('0x255')?_0x36b7('0x4e1'):_0x36b7('0x3bf');require('child_process')[_0x36b7('0x446')](_0x77ee6b+'\x20'+_0x5a2234);}},Sprite_Clickable[_0x36b7('0x33c')][_0x36b7('0x4b7')]=function(){if(this[_0x36b7('0x3a0')]()){if('eMOee'===_0x36b7('0x3c8')){function _0x2a5161(){const _0x1fd75f=_0x18db8e[_0x36b7('0x556')],_0x43f193=_0x37b660[_0x36b7('0x33c')][_0x36b7('0x2c9')](),_0x3af1e9=0x0;let _0x5712cb=0x0;return this['getButtonAssistLocation']()==='top'?_0x5712cb=0x0:_0x5712cb=_0x5468fa[_0x36b7('0x4ea')]-_0x43f193,new _0x5e2d91(_0x3af1e9,_0x5712cb,_0x1fd75f,_0x43f193);}}else{if(this[_0x36b7('0x26c')]()){!this[_0x36b7('0x478')]&&TouchInput['isHovered']()&&(this[_0x36b7('0x478')]=!![],this[_0x36b7('0x267')]());if(TouchInput['isTriggered']()){if(_0x36b7('0xe1')===_0x36b7('0xe1'))this[_0x36b7('0x165')]=!![],this[_0x36b7('0x57b')]();else{function _0x915040(){_0x2f1e0f[_0x36b7('0x220')]=0x0,_0x1473f3[_0x36b7('0x1b0')]=0x0,_0x37b395[_0x36b7('0x21b')]=0x0,_0x41c894[_0x36b7('0x2db')]=0x0;}}}}else{if(_0x36b7('0x3')===_0x36b7('0x161')){function _0x60422(){if(this[_0x36b7('0x4c0')]>0x63)return this[_0x36b7('0xf1')](_0x5d7400);return _0x41ceb7[_0x36b7('0x4d1')][_0x36b7('0x14c')][_0x36b7('0x2f9')](this,_0x455f1b);}}else{if(this[_0x36b7('0x478')]){if(_0x36b7('0x2a1')!==_0x36b7('0x35b'))this['onMouseExit']();else{function _0x1fc529(){_0x5e2637[_0x36b7('0x3af')]=!_0x43feca[_0x36b7('0x3af')];}}}this[_0x36b7('0x165')]=![],this[_0x36b7('0x478')]=![];}}this[_0x36b7('0x165')]&&TouchInput[_0x36b7('0x517')]()&&(this[_0x36b7('0x165')]=![],this[_0x36b7('0x326')]());}}else this[_0x36b7('0x165')]=![],this[_0x36b7('0x478')]=![];},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x528')]=Game_Interpreter['prototype'][_0x36b7('0x265')],Game_Interpreter[_0x36b7('0x33c')][_0x36b7('0x265')]=function(_0x1cb86c){const _0x136f09=_0x1cb86c[0x2],_0x30743f=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x528')]['call'](this,_0x1cb86c),_0x14514a=$gameScreen[_0x36b7('0x2e4')](_0x1cb86c[0x0]);if(_0x14514a)_0x14514a[_0x36b7('0x45f')]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x136f09]);return _0x30743f;},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x43f')]=Game_Interpreter[_0x36b7('0x33c')][_0x36b7('0x1a9')],Game_Interpreter[_0x36b7('0x33c')]['command232']=function(_0xa5b6ff){const _0x4e73c8=_0xa5b6ff[0x2],_0x573604=VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x43f')][_0x36b7('0x2f9')](this,_0xa5b6ff),_0x5b0fc5=$gameScreen[_0x36b7('0x2e4')](_0xa5b6ff[0x0]);if(_0x5b0fc5)_0x5b0fc5[_0x36b7('0x54f')]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4e73c8]);return _0x573604;},Game_Picture[_0x36b7('0x33c')][_0x36b7('0x30d')]=function(){return this[_0x36b7('0xec')];},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x302')]=Game_Picture[_0x36b7('0x33c')][_0x36b7('0x37a')],Game_Picture[_0x36b7('0x33c')][_0x36b7('0x37a')]=function(){VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x302')][_0x36b7('0x2f9')](this),this[_0x36b7('0xec')]={'x':0x0,'y':0x0};},VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x494')]=Game_Picture['prototype'][_0x36b7('0x2a7')],Game_Picture[_0x36b7('0x33c')][_0x36b7('0x2a7')]=function(){this[_0x36b7('0x51b')](),VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x494')][_0x36b7('0x2f9')](this);},Game_Picture['prototype'][_0x36b7('0x51b')]=function(){if(this[_0x36b7('0x67')]>0x0){if(_0x36b7('0x15e')===_0x36b7('0x160')){function _0x5397b5(){return this[_0x36b7('0x278')]();}}else this[_0x36b7('0xec')]['x']=this['applyEasing'](this[_0x36b7('0xec')]['x'],this[_0x36b7('0x19')]['x']),this['_anchor']['y']=this[_0x36b7('0x3da')](this[_0x36b7('0xec')]['y'],this['_targetAnchor']['y']);}},Game_Picture[_0x36b7('0x33c')][_0x36b7('0x45f')]=function(_0x2246a1){this[_0x36b7('0xec')]=_0x2246a1,this[_0x36b7('0x19')]=JsonEx[_0x36b7('0x487')](this['_anchor']);},Game_Picture[_0x36b7('0x33c')][_0x36b7('0x54f')]=function(_0x105ae0){this[_0x36b7('0x19')]=_0x105ae0;},VisuMZ[_0x36b7('0x4d1')]['Sprite_Picture_updateOrigin']=Sprite_Picture[_0x36b7('0x33c')]['updateOrigin'],Sprite_Picture[_0x36b7('0x33c')][_0x36b7('0x241')]=function(){const _0x4a1b6f=this[_0x36b7('0x2e4')]();if(!_0x4a1b6f[_0x36b7('0x30d')]()){if(_0x36b7('0xb')==='eopmB')VisuMZ[_0x36b7('0x4d1')][_0x36b7('0x40a')][_0x36b7('0x2f9')](this);else{function _0x258eae(){_0x4f263d+=_0x2dd108;if(_0x4e118f>=_0x1391a8)_0x27b3a2=_0x450d73-0x1;this[_0x36b7('0x1a8')](_0x50e26c);}}}else this[_0x36b7('0x30d')]['x']=_0x4a1b6f[_0x36b7('0x30d')]()['x'],this[_0x36b7('0x30d')]['y']=_0x4a1b6f[_0x36b7('0x30d')]()['y'];},Game_Action[_0x36b7('0x33c')][_0x36b7('0x1d8')]=function(_0x33335a){if(_0x33335a){const _0x3ad4cb=_0x33335a[_0x36b7('0x58a')];if(_0x3ad4cb===0x1&&this['subject']()[_0x36b7('0x3d5')]()!==0x1)this[_0x36b7('0x178')]();else _0x3ad4cb===0x2&&this[_0x36b7('0x112')]()[_0x36b7('0x427')]()!==0x2?this[_0x36b7('0x94')]():this[_0x36b7('0x2f7')](_0x3ad4cb);}else{if(_0x36b7('0x70')!==_0x36b7('0x70')){function _0x3b1d25(){const _0x139a66=_0x529620[_0x36b7('0x35c')](_0x36b7('0x1e2')),_0x5e84aa=_0x14669e[_0x36b7('0xe7')],_0x3731c3=_0x118453[_0x36b7('0x262')],_0x2625bd=_0x287361%0x10*_0x5e84aa,_0x53e517=_0x20465c[_0x36b7('0x3ca')](_0x7d9f5f/0x10)*_0x3731c3,_0x3663fb=_0x29f76f,_0x3f3d07=_0x1d099c;this[_0x36b7('0x51c')]['_context'][_0x36b7('0x26e')]=_0x55dc6b,this[_0x36b7('0x51c')][_0x36b7('0x250')](_0x139a66,_0x2625bd,_0x53e517,_0x5e84aa,_0x3731c3,_0x1fecdf,_0x10d13a,_0x3663fb,_0x3f3d07),this['contents'][_0x36b7('0x282')][_0x36b7('0x26e')]=!![];}}else this['clear']();}},Game_Actor[_0x36b7('0x33c')][_0x36b7('0x2ea')]=function(){return this[_0x36b7('0x47b')]()[_0x36b7('0xd8')](_0x54e742=>this[_0x36b7('0x80')](_0x54e742)&&this[_0x36b7('0x4c2')]()[_0x36b7('0x592')](_0x54e742[_0x36b7('0x124')]));},Window_Base[_0x36b7('0x33c')][_0x36b7('0x3f3')]=function(){if(this[_0x36b7('0x2bc')]){if(_0x36b7('0x564')===_0x36b7('0x3be')){function _0x12e649(){_0x1ccb36['CoreEngine'][_0x36b7('0x2b7')][_0x36b7('0x2f9')](this,_0x2da26f);}}else{const _0x4632aa=this['_dimmerSprite'][_0x36b7('0x156')],_0x3aa0f5=this[_0x36b7('0x25c')],_0x18deda=this[_0x36b7('0x4d6')],_0x57987e=this[_0x36b7('0x310')],_0x249e84=ColorManager[_0x36b7('0x43e')](),_0x27880a=ColorManager[_0x36b7('0x148')]();_0x4632aa[_0x36b7('0x65')](_0x3aa0f5,_0x18deda),_0x4632aa[_0x36b7('0x333')](0x0,0x0,_0x3aa0f5,_0x57987e,_0x27880a,_0x249e84,!![]),_0x4632aa[_0x36b7('0x16e')](0x0,_0x57987e,_0x3aa0f5,_0x18deda-_0x57987e*0x2,_0x249e84),_0x4632aa[_0x36b7('0x333')](0x0,_0x18deda-_0x57987e,_0x3aa0f5,_0x57987e,_0x249e84,_0x27880a,!![]),this[_0x36b7('0x2bc')][_0x36b7('0x143')](0x0,0x0,_0x3aa0f5,_0x18deda);}}};