//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.00] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
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
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate Turn>
 *
 * <JS Post-Regenerate Turn>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Reset
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Shift X:
 *   - Sets how much to shift the sprites by horizontally.
 * 
 *   Shift Y:
 *   - Sets how much to shift the sprites by vertically.
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Common Events
 * 
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 *
 * ---
 *
 * Select Window
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
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
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Clear
 * @text ZOOM: Reset
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
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
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:num":"-%1","hpHealingFmt:num":"+%1","mpDamageFmt:num":"-%1 %2","mpHealingFmt:num":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to damage calculations.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionSpeed:num":"12","Shadow:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
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
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * @default -28
 *
 * @param hpDamageFmt:num
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:num
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:num
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:num
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
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
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * @default 1.0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent SelectWindow
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
//=============================================================================

const _0x3c2f=['activate','battlerSprites','addCommand','updateEffectContainers','Game_Battler_regenerateAll','ActSeq_Camera_WaitForCamera','stypeId','_stateSprite','cJyjo','PostEndTurnJS','hwmsu','vnRTV','_weaponImageId','isDisplayEmergedEnemies','commandSymbol','gainMp','_floatEasing','DJbfU','_flashDuration','ARRAYSTR','VrVgd','adjustWeaponSpriteOffset','STRUCT','autoBattleStyle','waitCount','ActSeq_Camera_Offset','battleStartEventMarked','missile','addText','createWeather','applyVariance','FlashColor','setBattlerBattleCore','createChildSprite','pNlGT','itemEffectAddAttackState','Game_Action_evalDamageFormula','singleSkill','gradientFillRect','uiMenuStyle','VisuMZ_0_CoreEngine','getStypeIdWithName','ArPenRate','DTB','_commonEventQueue','svBattlerAnchorX','BattleCore','cdlHC','dragonbonesData','iuXDo','format','DtKLL','isForAll','performSubstitute','WaitForOpacity','autoBattleUseSkills','EscapeSuccess','ActSeq_Mechanics_AddState','isForFriendBattleCore','SbKqo','qQsrN','createAllWindows','battleJump','name','process_VisuMZ_BattleCore_BaseTroops','windowPadding','Game_Battler_startTpbTurn','BattleVictoryJS','VisuMZ_3_ActSeqCamera','ActSeq_Movement_Float','Scene_Battle_selectPreviousCommand','onBattleStartBattleCore','CmdTextAutoBattle','getNextSubjectFromPool','ActionAnimation','ActSeq_Movement_Jump','CIPfh','dead\x20actors','processPostBattleCommonEvents','Yleze','createTargetsJS','HelpAutoBattle','setLastPluginCommandInterpreter','repeatTargets','autoBattleWindowRect','lineHeight','battler','AntXu','changeInputWindow','Window_BattleLog_update','min','loadSvActor','Sprite_Actor_setActorHome','makeBattleCommand','canUse','damageOffsetX','log','_regionBattleback1','text\x20target','ICxnT','_motionType','Item-%1-%2','Sprite_Enemy_updateStateSprite','show','evalDamageFormulaBattleCore','createCommandNameWindow','clearMotion','Sprite_Enemy_setBattler','iconIndex','SkillItemStandardCols','CastMagical','_logWindow','noAZs','endAction','pushBaseLine','nFlYs','isFriendly','TMuZy','ActSeq_Mechanics_ArmorPenetration','ermQI','bTznb','Game_Battler_onTurnEnd','map','GuardFormulaJS','waitForAnimation','zWmvj','setHome','CZLDy','drawIcon','AutoBattleCancel','allBattleMembers','addChildAt','Game_Action_isForOpponent','ActSeq_Mechanics_Collapse','DuOhH','shszf','addDamageSprite','addedStateObjects','regionId','EasingType','setHelpWindow','FrontViewSelect','boxWidth','drawItemStatus','trim','drawSingleSkillCost','updatePhase','frontviewSpriteY','ApplyImmortal','FsJpr','preemptive','timeScale','Game_Action_itemHit','processBattleCoreJS','movement','Window_Options_statusText','drawLineText','createBorderStylePortraitSprite','isTriggered','initMembers','debuffAdd','updateEventMain','battleZoom','isDamagePopupRequested','PreDamageAsTargetJS','createKeyJS','VisuMZ_2_PartySystem','dead','CaFFr','sVWaP','_battlerName','nameY','EQLTU','hardDamageCap','wHSXE','flashColor','GroupDigits','NewPopupBottom','autoMeleeMultiTargetActionSet','popupDamage','aPRrR','showHelpWindow','helpWindowRectBorderStyle','Pre','_floatDuration','battleback2Name','IconSet','PreDamageJS','AlphaFilter','zoomDuration','zKGEx','command119','basicGaugesY','ActSeq_Movement_HomeReset','CriticalHitMultiplier','opponentsUnit','hpDamage','DEF','EscapeFail','terminate','_callSceneOptions','qBmMH','commandNameWindowCenter','isDying','isBuffAffected','playEnemyDamage','Sprite_Battler_setBattler','rqSth','statusTextAutoBattleStyle','lZUzr','Game_Map_battleback1Name','battleStatusWindowAnimationContainer','setupHpGaugeSprite','AsTarget','Class-%1-%2','BattleStartEvent','isQueueOptionsMenu','border','Game_Map_battleback2Name','IDPhn','ARRAYSTRUCT','DGeyT','callUpdateHelp','_jumpWholeDuration','displayFailure','SvBattlerMass-%1-%2','Mfrzo','splice','performEvasion','Window_SkillList_maxCols','ActSeq_BattleLog_AddText','PopupShiftX','AutoBattleRect','updateBorderStyle','lJoSS','Victory','dying','Scene_Battle_createPartyCommandWindow','ShowAddedState','_enemy','NUM','_skillIDs','isBattleSys','createSeparateDamagePopups','_actorSprites','jump','Window_BattleLog_performEvasion','allowRandomSpeed','FKZyF','CriticalDmgFlat','Targets','WaitForEffect','JS\x20%1REGENERATE','_battlerContainer','startOpacity','PortraitScaleBorderStyle','gruPg','_battleCoreNoElement','SvBattlerSolo-%1-%2','itemWindowRect','Scene_Battle_createHelpWindow','useItem','placeStateIcon','NBcli','CommandAddOptions','_damagePopup','ActSeq_Mechanics_ActionEffect','svBattlerAnchorY','HOFHj','ZSspk','pop','MAT','scope','Scale','clearDamagePopup','Crpdm','MP_Rate','ActSeq_BattleLog_WaitForBattleLog','getDefeatedEnemies','Pevwp','isAutoBattle','AttackAnimation','CriticalHitFlat','statusWindowRectXPStyle','_escapeRatio','forceAction','ByGLs','return\x200','createCancelButton','performCounter','enemyId','bottom','setImmortal','PostApplyAsTargetJS','+%1','Window_BattleLog_performRecovery','Window_BattleLog_performCollapse','animationNextDelay','fontSize','sZqth','AS\x20TARGET','setupWeaponAnimation','isForOne','OCzLZ','CommandVisible','isAnyoneMoving','drawItemImageListStyle','Matms','battleCommandIcon','findTargetSprite','worldTransform','getBattlePortrait','ActionSequence','updateForceAction','updateInterpreter','Scene_ItemBase_applyItem','command283','ShowAddedDebuff','qBnST','StyleON','result','setBattleCameraOffset','remove','onRegeneratePlayStateAnimation','%1EndBattleJS','_weather','ActSeq_Animation_ShowAnimation','KEcuh','skillWindowRect','Linear','isActiveTpb','createHelpWindow','Window_BattleLog_displayEvasion','svAnchorX','BattleDefeatJS','yGbHg','updateHelp','_floatWholeDuration','startTpbTurn','PreEndTurnJS','getItemDamageAmountLabelOriginal','UiBzg','windowAreaHeight','isConfused','oUpzA','evalDamageFormula','Esxkd','States','ActSeq_Mechanics_WaitForEffect','dead\x20opponents','damage','isAtbCastingState','process_VisuMZ_BattleCore_jsFunctions','_battleCoreForcedElements','updateShadowPosition','autoBattle','commandNameWindowDrawBackground','_targetIndex','onDatabaseLoaded','command357','left','maxCommands','ActSeq_Animation_ChangeBattlePortrait','_jumpDuration','partyCommandWindowRectXPStyle','_battleCoreBattleStartEvent','gqcAk','displayMiss','acYRy','canMove','refreshActorPortrait','getInputButtonString','Window_BattleLog_performSubstitute','canAttack','actor%1-portrait','commandNameWindowDrawText','battleSys','UzKbw','CRMIM','makeEscapeRatio','QoL','stepForward','Scene_Battle_start','CriticalDmgRate','Game_BattlerBase_refresh','oUTvq','PreEndBattleJS','faceWidth','hgFbv','QwxME','Window_BattleLog_clear','_baseY','TargetLocation','innerWidth','ShowHpDmg','AllowRandomSpeed','Scene_Battle_onEnemyOk','match','SkillsStatesCore','_action','%1StartActionJS','_stypeIDs','parameters','STjid','wOXMq','actorId','filterArea','onMoveEnd','luZyS','setSvBattlerSprite','aliveMembers','setupBattleback','QPIdE','top','Scene_Battle_partyCommandWindowRect','addOptionsCommand','FUNC','forceSelect','updateBitmap','isAnyoneFloating','Enemy','SideviewSelect','setHandler','drawText','jzcIE','endBattle','gNdqI','DamageFlat','createInnerPortrait','nPnlD','addShowHpGaugeCommand','Text','mohFg','front\x20center','processDefeat','Style','ext','isEscapeCommandEnabled','AutoMeleeSolo','turn','autoMeleeSingleTargetActionSet','ShowWeapon','updateShadow','_createClientArea','_appeared','PopupDuration','whYdx','JtWzT','makeDeepCopy','ActSeq_Camera_Clamp','Targets1','eLGEQ','JS\x20BATTLE\x20DEFEAT','mpDamage','_updateFilterArea','_borderPortraitTargetX','isBorderStylePortraitShown','IRWRC','changeBattlebacks','displayAction','buffRemove','itemEffectAddNormalState','options','VnvSw','drawTextEx','Game_Action_isForFriend','JS\x20%1APPLY\x20%2','_actionBattlers','selectNextActor','_spriteset','updateStyleOpacity','setActorHome','Scene_Battle_windowAreaHeight','skillTypes','_back1Sprite','PostStartBattleJS','reserveCommonEvent','BattleManager_startInput','applyImmortal','setBattlePortrait','MeleeDistance','FaceDirection','Scene_Battle_startEnemySelection','ycJFT','_enemyIDs','autoBattleAtStart','_stateIconSprite','AGI','ActSeq_Movement_MoveToTarget','refreshCursor','NmCFQ','<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>','DdoAP','isBattleFlipped','battleCommands','updateBossCollapse','ActSeq_Target_CurrentIndex','isNextSceneBattleTransitionable','uiyVQ','Game_Map_setupBattleback','BattleManager_updatePhase','_animationCount','BattleManager_processVictory','initBattleGauges','ActSeq_Mechanics_Multipliers','hide','Elements','guard','iSGdw','FlashDuration','ActSeq_BattleLog_UI','fahkG','BUytm','filters','commandOptions','lineRect','displayRemovedStates','DamageDisplay','CastAnimation','FaceAway','XPActorCommandLines','AutoBattleMsg','Game_BattlerBase_addNewState','displayEvasion','_enemyId','LrJOd','svShadow','ShowRemovedState','FBKfz','isHidden','ActionEffect','Scene_Battle_onActorCancel','updateBorderSprite','okButtonText','Jocrt','bind','eoYqf','ActSeq_BattleLog_Clear','contents','active','ZYurj','removeChild','_createCursorSprite','XEfzs','isForRandom','hasSkill','hasBeenDefeatedBefore','cameraDuration','alive\x20battlers\x20not\x20user','battleCommandName','ArPenFlat','Scene_Battle_logWindowRect','QtRwo','cFksc','isFrameVisible','isAnimationShownOnBattlePortrait','setup','%1Event','evaded','ForceRandom','removedBuffs','\x5cI[%1]%2','eraseState','clearWeaponAnimation','dyXEg','snapForBackground','ActSeq_Set_WholeActionSet','vwixc','nYKVd','ygwax','alive\x20opponents\x20not\x20target','QKRpD','ShowPopup','NVgyL','evade','EscapeSuccessJS','Sprite_Battler_startMove','measureTextWidth','criticalDmgRate','canEscape','waitForNewLine','_damages','currentSymbol','compareBattlerSprites','DhTGq','svBattlerName','MAXHP','getTraitSetKeys','actionSplicePoint','zpEmc','Name','rdogz','BattleManager_endAction','_cursorArea','Game_Interpreter_terminate','CalcActionSpeedJS','hjsAI','bitmapHeight','split','CommandAddAutoBattle','FocusY','_list','OverallFormulaJS','ActSeq_Mechanics_DeathBreak','performRecovery','XHIGF','prepareCustomActionSequence','vVLnL','skills','helpAreaHeight','jDAVm','callOptions','iconText','CriticalColor','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_lastPluginCommandInterpreter','makeData','PreApplyAsUserJS','Window_BattleLog_performActionEnd','startFloat','mpDamageFmt','refreshMotion','drawItemStyleIcon','EmergeText','FlinchDistanceX','Game_Action_makeTargets','PostStartTurnJS','_battleCoreAddedElements','boxHeight','canAttackBattleCore','NameFontSize','SVEMQ','isPlaytest','Width','getLastPluginCommandInterpreter','dimColor1','BattleLogRectJS','maxTp','CastCertain','Targets2','_homeY','Game_Battler_performActionEnd','battleEffect','move','YJJMu','Filename','placeTimeGauge','setupTextPopup','VisuMZ_1_ElementStatusCore','_motion','hasSvBattler','actionBattleCoreJS','TymRB','isGuardWaiting','ShowCounter','ODPWV','Scene_Battle_helpWindowRect','isAutoBattleCommandEnabled','onOpacityEnd','initElementStatusCore','cameraOffsetDuration','performCastAnimation','Enemy-%1-%2','WaitForJump','IlbGl','performJump','oVPwn','Game_BattlerBase_eraseState','statusText','parse','UNcIu','canAddSkillCommand','addAutoBattleCommand','weaponTypes','_jumpMaxHeight','default','DamageStyleList','_updateClientArea','Sprite_Enemy_updateBossCollapse','maxBattleMembers','OffsetY','HomePosJS','_dimmerSprite','_flinched','processVictory','vYgWI','drawItemImage','ActSeq_Animation_WaitForAnimation','replace','missed','slice','_cursorSprite','Buffs','getSkillIdWithName','inputtingAction','performAction','loadBattleback2','tjZZC','visualHpGauge','isVisualHpGaugeDisplayed','hftMD','substitute','sortDamageSprites','drawItem','swapEnemyIDs','isPreviousSceneBattleTransitionable','BattleManager_onEncounter','YmvVu','vuqwG','actorCommandAutoBattle','Sprite_Battler_initMembers','forceMotion','ssOYE','KAIPk','RfGen','message1','<CENTER>%1','KrMLr','Sprite_Actor_moveToStartPosition','_battleField','clamp','setMoveEasingType','_regionBattleback2','Window_BattleLog_displayCritical','Game_Interpreter_updateWaitMode','visible','message2','right','OffsetX','ORyRc','_battler','destroyDamageSprite','SyKZy','wDsUs','Scene_Battle_updateBattleProcess','isChanting','repeats','Window_BattleStatus_initialize','_motionCount','ActSeq_Mechanics_RemoveState','alive\x20battlers','mhp','PreApplyAsTargetJS','NrdWc','commandEscape','addLoadListener','getItemDamageAmountLabelBattleCore','FDKJN','jumpBattler','battleOpacity','anCRv','resizeWindowBorderStyle','_updateCursorArea','exit','_autoBattleWindow','bJZQx','currentExt','addBattleCoreAutoBattleStartupCommand','makeTargetsBattleCore','OjEBk','Spriteset_Battle_update','description','onEnemyOk','updateStateSpriteBattleCore','setupCriticalEffect','AdjustRect','battleCorePreBattleCommonEvent','addState','BattleLog','#ffffff','iconWidth','startMove','SvMotionIdleSolo-%1-%2','jtUXB','drawBackgroundRect','spell','_iconIndex','all\x20targets','repositionEnemiesByResolution','waitForMovement','isTickBased','ARRAYFUNC','itemHeight','HitFlat','WtypeId','mpaSz','CmdIconOptions','onActorCancel','updateCollapse','NqVWw','PostStartActionJS','callNextMethod','javdp','Window_BattleLog_performDamage','EFFTy','BtXls','pjpBl','code','ZaEpE','NmCjz','drawItemStatusListStyle','Game_Battler_onBattleStart','statusWindowRect','attackMotions','lmbft','attackAnimationId1','textSizeEx','isAutoBattleCommandAdded','shift','Game_Interpreter_command283','extraPositionX','DAtqR','fight','actions','CmdIconAutoBattle','RalUD','displayCounter','battlelog','isSpriteVisible','_wtypeIDs','kCImd','PostDamage%1JS','isAnyoneChangingOpacity','updateShadowBattleCore','maxItems','setBattleCameraTargets','_windowLayer','createActors','Game_Temp_requestAnimation','ActSeq_Animation_CastAnimation','battleCamera','iterateBattler','ARRAYJSON','Sprite_Enemy_createStateIconSprite','makeTargetSelectionMoreVisible','isSkipPartyCommandWindow','isCommandEnabled','placeActorName','kEQCD','addGeneralOptions','waitForOpacity','updateMotionCount','ynZVZ','_cancelButton','FlinchDistanceY','Scene_Battle_stop','popBaseLine','auto','BattleManager_processDefeat','OsqXg','AutoBattleBgType','bgType','Scene_Options_maxCommands','IconStypeNorm','_multipliers','toString','Window_PartyCommand_initialize','iconHeight','PostDamageAsTargetJS','getEnemyIdWithName','lmpAO','Niapj','Window_ActorCommand_initialize','Window_BattleLog_performCounter','drawItemStatusXPStyle','onEscapeFailure','getItemDamageAmountTextOriginal','dead\x20friends','OjhCM','nwruY','commandStyleCheck','createActorCommandWindowBattleCore','DamageType%1','PostApply%1JS','PostApplyAsUserJS','Window_BattleLog_displayFailure','tFtLv','ActSeq_Movement_MoveBy','animationId','HIwgo','ArRedRate','battleback1Name','uAacC','logActionList','ActSeq_Zoom_Clear','setupIconTextPopup','piKMR','showNormalAnimation','UWWqx','isFloating','displayType','targetActionSet','_shadowSprite','Window_ItemList_maxCols','DistanceY','playEnemyAttack','_updateCursorFilterArea','zjlZo','onBattleStart','PreStartActionJS','VFcuM','ActSeq_Zoom_WaitForZoom','needsSelection','sgkqo','GYlLw','rqsJm','forceWeaponAnimation','_waitMode','PostRegenerateJS','_surprise','isSceneChanging','weapons','Settings','ActSeq_BattleLog_PopBaseLine','isUndecided','fGURE','useDigitGrouping','setBackgroundType','icon','Window_BattleLog_displayMpDamage','collapse','AwqiX','animation','floatBattler','displayBuffs','isForRandomBattleCore','processAnimationRequests','Mirror','ShowEnemyGauge','ResetFocus','traitSet','ActSeq_Movement_WaitForJump','ShowReflect','changeAtbCastTime','addDebuff','uiInputPosition','CriticalHitRateJS','Game_BattlerBase_canGuard','createStateSprite','displayReflectionPlayBack','Duration','RegExp','startWeaponAnimation','wqFmn','isSceneBattle','Setting','UFRze','DsKDf','isTurnBased','canGuard','dRxNY','addImmortal','onEscapeSuccess','WeOig','AllowCollapse','applySoftDamageCap','TXSSY','Skill-%1-%2','_duration','_actions','PostApplyJS','requestMotionRefresh','numTargets','includes','TextColor','_floatHeight','#%1','PPcPf','_actorCommandWindow','XKfVD','Destination','StepDuration','setHelpWindowItem','TimeScale','_text','loadBattleback1','EjbcE','MotionType','resize','addItemCommand','_weaponSprite','nHyBE','push','createBattleFieldBattleCore','MDF','DefaultDamageStyle','members','setupDamagePopup','Sprite_Actor_updateShadow','Window_BattleLog_popBaseLine','ActSeq_Element_AddElements','_lines','deadMembers','_isBattlerFlipped','cNEPK','ActSeq_Camera_FocusTarget','_animationSprites','usePremadeActionSequence','autoSelect','Scene_Battle_createCancelButton','SfFoQ','setupActionSet','front\x20base','ShowTpDmg','Hgadg','StepDistanceY','Game_Action_itemEffectAddNormalState','isEnemy','AsUser','parent','Gkyhg','performActionMotions','registerDefeatedEnemy','Turns','processRefresh','PreStartTurnJS','CmdTextAlign','ActionSkillMsg2','initVisibility','_enemyWindow','dead\x20enemies','isSkillItemWindowsMiddle','BARE\x20HANDS','ActSeq_Zoom_Scale','makeActionListAutoAttack','startInput','applyHardDamageCap','Direction','_baseX','AutoBattle','updateFloat','getDamageStyle','trueRandomTarget','Window_BattleLog_performAction','isForOpponent','endAnimation','CmdIconItem','GUARD','createEffectActionSet','STR','makeActionList','TP_Rate','_colorType','MP_Flat','_preBattleCommonEvent','addSkillCommands','_cache','ABiNi','_methods','hNqLN','isDead','ShowFailure','isShownOnBattlePortrait','Game_BattlerBase_isStateResist','_totalValue','Window_BattleStatus_drawItemImage','addCustomCommands','eQhgZ','BattleCmdList','rFnsl','setupBattleCoreData','getWtypeIdWithName','ReflectAnimation','_subject','VeaAG','dAhKJ','performMagicEvasion','actorCommandSingleSkill','swing','_targetOpacity','_target','ActSeq_Movement_FaceTarget','AnchorY','ymWJM','startAction','RTaOP','isOptionsCommandEnabled','getAttackWeaponAnimationId','_reflectionTarget','Mechanics','nCpOf','height','displayStartMessages','_targetFloatHeight','yqusJ','motionSpeed','isTpb','_autoBattle','ActSeq_DB_DragonbonesMotionAni','setFrame','mmp','_opacityWholeDuration','sort','AnchorX','width','Game_BattlerBase_initMembers','IFknh','updateFlip','addNewState','isPhysical','hpHealingFmt','%1EndTurnJS','animationWait','indexOf','MotionSpeed','makeDamageValue','escape','BattleLayout','performMoveToTargets','changePaintOpacity','HP_Flat','performReflection','Sprite_Battler_updateMain','damageStyle','VisuMZ_2_DragonbonesUnion','CalcEscapeRaiseJS','initialize','dead\x20battlers','BattleManager_startAction','MrQOB','createHpGaugeSprite','attack','BMkjL','ZQTfJ','CriticalDuration','critical','_enemyNameContainer','TPB','SkipPartyCmd','applyArmorModifiers','allowCollapse','%1RegenerateJS','clear','animationBaseDelay','retreat','removeAnimationFromContainer','portrait','updateAction','Wknrl','isPartyCommandWindowDisabled','ShowFacesListStyle','addChild','displayItemMessage','battleLayoutStyle','yCWwz','isCustomBattleScope','ActSeq_Movement_WaitForMovement','stepBack','battleFloat','_enemies','statusWindowRectDefaultStyle','alive\x20opponents','moveBattlerToPoint','MotionIdle','command236','ITEM','guardSkillId','wGhsL','yJFlm','processBorderActor','_animation','pDjkY','performActionStart','ConfigManager_applyData','enemyNames','ActSeq_Mechanics_Immortal','svAnchorY','changeAtbChargeTime','constructor','ESCAPE','value','BattleManager_startBattle','victory','FVXPp','wKodD','addBattleCoreAutoBattleStyleCommand','DisplayAction','displayCritical','updateActors','scale','applyGuard','updateHpGaugePosition','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','createString','redraw','ActionStart','anchorX','resetFontSettings','opacity','alive\x20friends\x20not\x20target','iRjTI','some','getMenuImage','addGuardCommand','createLowerLayer','OZweP','children','mSxkC','_allTargets','lupLS','getConfigValue','drain','_damageContainer','createContents','drawGauge','performMoveToPoint','magicReflection','ActSeq_Element_NullElements','JS\x20%1END\x20TURN','messageSpeed','Sprite_Enemy_loadBitmap','addFightCommand','createAnimationSprite','cHGyC','ConfigManager_makeData','IconStypeMagic','startJump','_checkOn','VisuMZ_1_SkillsStatesCore','battleCoreResumeLaunchBattle','isMagicSkill','hraGn','tYpeq','ATK','setBattler','update','updateStateSprite','ShowCurrentState','fNtZA','PreApplyJS','oagQU','process_VisuMZ_BattleCore_Notetags','ActSeq_Movement_BattleStep','join','hitFlat','floor','changeWeather','Scene_Battle_startActorSelection','currentClass','_mainSprite','Window_ActorCommand_setup','Scene_Battle_onActorOk','createDigits','canUseItemCommand','performDamage','_offsetX','Scene_Battle_createAllWindows','Window_BattleLog_performMiss','Window_BattleLog_displayTpDamage','isCustomActionSequence','_battleLayoutStyle','updateFrame','resizeWindowXPStyle','Game_BattlerBase_canAttack','requestMotion','Interrupt','softDamageCapRate','_interpreter','Game_Interpreter_PluginCommand','arPenFlat','invokeAction','getHardDamageCap','clearResult','xJOag','ActSeq_Camera_FocusPoint','finishActionSet','setupBattleCore','HitRate','StyleName','AutoBattleOK','removeImmortal','JS\x20%1DAMAGE\x20%2','HelpItem','shouldPopupDamage','playCancel','ActSeq_Target_RandTarget','isSideView','PartyCmd','applyDamageCaps','prototype','uOQZU','%1StartBattleJS','_executedValue','ShowActorGauge','nuaeY','Game_Action_isForRandom','onJumpEnd','updateWaitMode','DefaultSoftCap','startPartyCommandSelection','XrxaM','AXPDJ','ShowAddedBuff','isStateResist','isForFriend','maxCols','jvSfP','mMKtM','itemTextAlign','addPartyCommand','addSingleSkillCommands','updateOpacity','Scene_Map_launchBattle','updateStatusWindowPosition','isSideButtonLayout','QvJbn','selectPreviousCommand','backColor','ActSeq_Motion_WaitMotionFrame','createJS','calcWindowHeight','placeGauge','vhRNa','WaitForZoom','Damage','JiMil','ItVub','removeBuff','prev\x20target','DefaultSoftScaler','ActSeq_Movement_FaceDirection','_requestRefresh','cevaN','faceRect','shadow','weaponImageId','xFCXE','requestDragonbonesAnimation','process_VisuMZ_BattleCore_DamageStyles','FocusX','_additionalSprites','isChangingOpacity','yqZsH','isFightCommandEnabled','applyEasing','ActSeq_Animation_ActionAnimation','repositionCancelButtonBorderStyle','walk','addAttackCommand','hpAffected','emerge','%1EndActionJS','dxVnr','_effectsContainer','_opacityDuration','arRedRate','currentAction','applyItem','Immortal','isActing','buZgv','getItemDamageAmountTextBattleCore','isRightInputMode','wait','getAttackMotion','isTPB','_partyCommandWindow','wholeActionSet','open','uIPgy','commandName','updateMain','GPCfd','JcbGn','changeBattlerOpacity','WnyOi','process_VisuMZ_BattleCore_Action_Notetags','_hpGaugeSprite','Window_BattleLog_performActionStart','isBusy','isActor','OffsetAdjust','Game_Battler_performActionStart','XPActorDefaultHeight','playReflection','isOpponent','-%1','wiOyY','moveBattlerDistance','onEnemyCancel','PerformAction','attackAnimationId2','BattleManager_endBattle','JS\x20%1START\x20BATTLE','abnormal','_enemySprites','alive\x20enemies','getBattlePortraitFilename','ActSeq_Set_TargetActionSet','Window_BattleLog_refresh','skillId','autoBattleStart','_battlePortrait','ltvLE','PreRegenerateJS','LfrEy','alive\x20battlers\x20not\x20target','ipuGz','isAtbChargingState','yMjXl','canInput','WaitForMovement','updateWeather','_skillWindow','Skills','TnRTU','isNextScene','BattleManager_onEscapeSuccess','ActSeq_Movement_Opacity','Game_Action_needsSelection','skillItemWindowRectMiddle','drawItemImagePortraitStyle','HelpSkillType','gLTQl','isDeathStateAffected','_active','updateBattleProcess','Pnktc','updatePadding','fPadT','JS\x20%1END\x20BATTLE','performCollapse','Game_Action_clear','MJAuL','partyCommandWindowRectBorderStyle','Bwcla','actionEffect','CmdStyle','_homeX','DefaultHardCap','Weapon-%1-%2','addedBuffs','Opacity','hitRate','battleMove','ActSeq_Movement_FacePoint','Index','ActorCmd','BattleManager_initMembers','onFloatEnd','recoverAll','Window_BattleLog_popupDamage','list','_actor','clearElementChanges','vvkmN','VRFIu','isBypassDamageCap','VRgnv','updateBattlebackBitmap','needsSelectionBattleCore','updateVisibility','updateCancel','displayTpDamage','HelpFight','filter','Game_Enemy_setup','Mxkrd','PreEndActionJS','BattleEndEvent','KkCaq','apply','svBattlerData','_baseLineStack','ARRAYNUM','PZnrT','_visualHpGauge_JustDied','isMagical','startDamagePopup','alive\x20friends','moveToStartPosition','_forcedBattlers','ceil','weatherType','rAEBq','WaitForNewLine','Qkoqd','CastPhysical','startActorSelection','onEncounterBattleCore','EscapeFailureJS','ActSeq_BattleLog_WaitForNewLine','processRandomizedData','_scene','stop','addedDebuffs','stepFlinch','CounterPlayback','jHJSR','createStateIconSprite','pow','chant','PtnRL','svBattlerShadowVisible','call','displayAddedStates','close','QsClw','_item','ActSeq_Set_FinishAction','applyBattleCoreJS','isImmortal','nBZPK','clearRect','AnimationID','isMoving','setWaitMode','commandAutoBattle','PARTY','damageRate','MxdqR','Height','makeHpDamageText','isItem','ARRAYEVAL','+%1\x20MP','process_VisuMZ_BattleCore_CreateRegExp','PSwXo','regenerateAllBattleCore','gjLvL','ActSeq_Mechanics_AtbGauge','FAhUS','center','createPartyCommandWindowBattleCore','ConvertActionSequenceTarget','SkillItemBorderCols','drawItemImageXPStyle','SgNlI','TP_Flat','_flashColor','PostEndBattleJS','JS\x20ESCAPE\x20SUCCESS','itemRect','focus','displayReflection','STYPES','HP_Rate','DistanceX','performMiss','damageOffsetY','isDTB','DGkOM','zBvCe','Sprite_Battler_updatePosition','isCancelled','atbInterrupt','Spriteset_Battle_createLowerLayer','displayMpDamage','createMiss','waitForEffect','ATTACK','ActionSkillMsg1','isBattlerFlipped','round','type','removeAnimation','_opacityEasing','onEncounter','gainHp','State-%1-%2','createBattleField','ReflectPlayback','PreDamageAsUserJS','reduce','Game_Action_apply','showAnimation','Actor-%1-%2','canBattlerMove','DigitGroupingDamageSprites','destroy','onTurnEnd','waitForFloat','PopupShiftY','_createDamageContainer','TCWXK','skill','Window_BattleEnemy_show','MAXMP','selectNextCommand','eVPkb','CmdIconFight','ActSeq_Camera_Reset','initBattleCore','XPSpriteYLocation','_defeatedEnemies','pages','action','ActSeq_Set_SetupAction','criticalHitFlat','actorCommandEscape','helpWindowRect','anchor','attackSkillId','aPUzF','Sprite_Actor_createStateSprite','Scene_Battle_selectNextCommand','JS\x20%1END\x20ACTION','MdsCf','removeDamageSprite','magicSkills','performFlinch','process_VisuMZ_BattleCore_TraitObject_Notetags','randomInt','placeBasicGauges','optDisplayTp','RequiresDefeat','Armor-%1-%2','isEffecting','addBuff','startAttackWeaponAnimation','ShowMissEvasion','validTargets','setCursorRect','ActSeq_Animation_AttackAnimation','GEpqh','FlinchDuration','lYSmD','tHXAY','qkFuY','PfJXp','_offsetY','jXjQh','DamageStyles','WaitCount','setBattleCameraPoint','softDamageCap','AddOption','PRE-','hODDB','LNuRJ','_armorPenetration','isMeleeSingleTargetAction','JOtWW','_borderPortraitSprite','RsJsC','note','centerFrontViewSprite','_jumpHeight','_emptyBitmap','makeCommandList','gDbaE','logWindowRect','extraHeight','isFastForward','battleMembers','-%1\x20MP','updateCommandNameWindow','_tpbNeedsPartyCommand','DQANM','updatePositionBattleCore','battleAnimation','innerHeight','initBattlePortrait','registerCommand','VkPtS','Debuffs','ActSeq_Target_PrevTarget','fittingHeight','isCertainHit','buffAdd','UewLS','processForcedAction','index','PkRbZ','BMRYf','applyData','Window_BattleLog_displayCurrentState','Actor','isBattleTest','_back2Sprite','_preemptive','ActSeq_BattleLog_DisplayAction','traitObjects','Game_Actor_makeActionList','addAnimationSpriteToContainer','toLowerCase','anchorY','gdBln','_createCursorArea','isBattleCoreTargetScope','displayActionResults','StepDistanceX','cameraClamp','DamageRate','isAttack','invokeMagicReflection','createEnemies','Window_BattleLog_pushBaseLine','Sprite_Enemy_updateCollapse','custom','_svBattlerSprite','drawSkillCost','bQLze','skillItemWindowRectBorderStyle','itemLineRect','deathStateId','startTurn','HofEW','speed','actor','PostEndActionJS','isLearnedSkill','ClearBattleLog','WaitCount1','alive\x20friends\x20not\x20user','isAnyoneJumping','current\x20target','DNTAz','rEsEa','addSingleSkillCommand','nnQmx','performAttack','_borderPortraitDuration','WaitForCamera','startMotion','Game_Battler_performDamage','toUpperCase','arRedFlat','ResetOffset','Shadow','LUK','updateTargetPosition','Game_Action_itemEffectAddAttackState','cancelButtonText','CheckSkillCommandShowSwitches','sbWnN','isAlive','StyleOFF','isFlipped','random','loop','ChargeRate','showPortraits','startBattle','setupMotion','ActSeq_DB_DragonbonesTimeScale','flashDuration','maxLines','_waitCount','turnCount','CoreEngine','setBattlerFacePoint','_enemyID','isJumping','CreateActionSequenceTargets','loadSystem','refreshDimmerBitmap','origin','Sprite_StateIcon_updateFrame','addSkillTypeCommand','unshift','helpAreaBottom','Scene_Battle_terminate','displayCurrentState','wJOkX','AeXED','isDebuffAffected','start','_animationContainer','extraPositionY','blt','targetObjects','padding','PostDamageJS','regenerateAll','_itemWindow','text','_statusWindow','Game_Enemy_transform','MANUAL','Game_System_initialize','addEscapeCommand','dqaLI','max','sleep','partyCommandWindowRect','_immortal','eRZMt','damageFlat','PreStartBattleJS','startEnemySelection','drawItemStyleIconText','_attackAnimationId','puVUa','updateJump','isSkill','WaitCount2','RepositionEnemies','JS\x20ESCAPE\x20FAILURE','tsHaW','isInputting','makeTargetSprites','commandStyle','ShowRemovedBuff','ActSeq_Motion_MotionType','ShowPortraitsBorderStyle','criticalDmgFlat','ShowSubstitute','ActSeq_Movement_WaitForFloat','create','ActionItemMsg','battleDisplayText','alive\x20actors','qnfeL','item','UNTITLED','Sprite_Actor_update','ozGLX','isOptionsCommandAdded','nsSTy','HpGauge','addAutoBattleCommands','aBxAF','isBattleMember','createActorCommandWindow','effect','kawHb','ConvertParams','power','makeAutoBattleActions','clearBattleCoreData','jMgeQ','counterAttack','Mhsox','_svBattlerData','dSrZO','_motionSpeed','hymNv','Post','executeDamage','abs','_phase','criticalHitRate','isGuard','battleCameraData','PreApply%1JS','ActSeq_Element_Clear','stateMotionIndex','length','PaYGP','createDamageSprite','EnableSoftCap','Scene_Battle_itemWindowRect','Ubfaa','performActionEnd','_commandNameWindow','_pattern','CwAkj','xlcTO','refresh','statusWindowRectBorderStyle','updateCustomActionSequence','ElementStatusCore','cancelTargetSelectionVisibility','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateBattlerContainer','SceneManager_isSceneChanging','textColor','setBattleZoom','createHelpWindowBattleCore','Spriteset_Battle_updateActors','damageContainer','loadBitmap','initMembersBattleCore','Scene_Battle_updateStatusWindowPosition','dprUv','RYhwP','reverse','Scene_Battle_startPartyCommandSelection','prepareBorderActor','wfAZP','MotionFrameWait','loadPicture','CmdIconEscape','isAnimationPlaying','ddZeR','Window_Options_addGeneralOptions','PrjMU','ntmfJ','Game_Actor_setup','isForOpponentBattleCore','updatePosition','VisuMZ_1_MainMenuCore','Scene_Battle_createActorCommandWindow','Window_BattleLog_performReflection','friendsUnit','ActSeq_Mechanics_RemoveBuffDebuff','addChildToBack','WaitForAnimation','eiLXM','Window_BattleLog_performMagicEvasion','fawaz','onSelectAction','okTargetSelectionVisibility','Window_BattleLog_displayMiss','YrXEg','NcLSG','motionIdle','JumpToLabel','SvWeaponMass-%1-%2','getColor','mbxmN','createAutoBattleWindow','setSkill','EVAL','isItemCommandEnabled','PBKOR','ArRedFlat','subject','cancel','canGuardBattleCore','Prefd','ShowPortraits','setBattlerFlip','JS\x20BATTLE\x20VICTORY','LwKaO','_createEffectsContainer','Sprite_Actor_setBattler','thrust','OKoHU','pNfEF','randomTargets','setText','Defeat','enemy','HNJaX','requestAnimation','contentsOpacity','ActSeq_Mechanics_TextPopup','transform','ActSeq_Motion_PerformAction','bitmap','collapseType','Scene_Battle_onEnemyCancel','Sprite_Enemy_initVisibility','zhfKv','TextAlign','concat','BackColor','wtypeId','getNextDamagePopup','makeTargets','_helpWindow','NpufO','_padding','CriticalHitRate','nZJCe','yGlUi'];(function(_0x415c5b,_0x3c2f95){const _0x482b12=function(_0x1aeb61){while(--_0x1aeb61){_0x415c5b['push'](_0x415c5b['shift']());}};_0x482b12(++_0x3c2f95);}(_0x3c2f,0x176));const _0x482b=function(_0x415c5b,_0x3c2f95){_0x415c5b=_0x415c5b-0x0;let _0x482b12=_0x3c2f[_0x415c5b];return _0x482b12;};var label=_0x482b('0x654'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x482b('0x439')](function(_0x2c0bb9){return _0x2c0bb9['status']&&_0x2c0bb9[_0x482b('0x183')][_0x482b('0x24d')]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x482b('0x21a')]||{},VisuMZ[_0x482b('0x5a3')]=function(_0x4ebdf2,_0x12cab4){for(const _0x575b30 in _0x12cab4){if('ZtVPQ'==='ZtVPQ'){if(_0x575b30[_0x482b('0x17')](/(.*):(.*)/i)){const _0x5525b1=String(RegExp['$1']),_0x489568=String(RegExp['$2'])[_0x482b('0x53e')]()[_0x482b('0x6b6')]();let _0xaa7757,_0x2811b8,_0x4a2205;switch(_0x489568){case _0x482b('0x716'):_0xaa7757=_0x12cab4[_0x575b30]!==''?Number(_0x12cab4[_0x575b30]):0x0;break;case _0x482b('0x442'):_0x2811b8=_0x12cab4[_0x575b30]!==''?JSON[_0x482b('0x127')](_0x12cab4[_0x575b30]):[],_0xaa7757=_0x2811b8[_0x482b('0x6a0')](_0x21a6a9=>Number(_0x21a6a9));break;case _0x482b('0x5fa'):_0xaa7757=_0x12cab4[_0x575b30]!==''?eval(_0x12cab4[_0x575b30]):null;break;case _0x482b('0x474'):_0x2811b8=_0x12cab4[_0x575b30]!==''?JSON[_0x482b('0x127')](_0x12cab4[_0x575b30]):[],_0xaa7757=_0x2811b8[_0x482b('0x6a0')](_0x1202f2=>eval(_0x1202f2));break;case'JSON':_0xaa7757=_0x12cab4[_0x575b30]!==''?JSON[_0x482b('0x127')](_0x12cab4[_0x575b30]):'';break;case _0x482b('0x1ca'):_0x2811b8=_0x12cab4[_0x575b30]!==''?JSON[_0x482b('0x127')](_0x12cab4[_0x575b30]):[],_0xaa7757=_0x2811b8['map'](_0x22bfec=>JSON[_0x482b('0x127')](_0x22bfec));break;case _0x482b('0x2a'):_0xaa7757=_0x12cab4[_0x575b30]!==''?new Function(JSON['parse'](_0x12cab4[_0x575b30])):new Function(_0x482b('0x745'));break;case _0x482b('0x197'):_0x2811b8=_0x12cab4[_0x575b30]!==''?JSON[_0x482b('0x127')](_0x12cab4[_0x575b30]):[],_0xaa7757=_0x2811b8[_0x482b('0x6a0')](_0x564e63=>new Function(JSON[_0x482b('0x127')](_0x564e63)));break;case _0x482b('0x299'):_0xaa7757=_0x12cab4[_0x575b30]!==''?String(_0x12cab4[_0x575b30]):'';break;case _0x482b('0x639'):_0x2811b8=_0x12cab4[_0x575b30]!==''?JSON['parse'](_0x12cab4[_0x575b30]):[],_0xaa7757=_0x2811b8[_0x482b('0x6a0')](_0x59d053=>String(_0x59d053));break;case _0x482b('0x63c'):_0x4a2205=_0x12cab4[_0x575b30]!==''?JSON['parse'](_0x12cab4[_0x575b30]):{},_0x4ebdf2[_0x5525b1]={},VisuMZ[_0x482b('0x5a3')](_0x4ebdf2[_0x5525b1],_0x4a2205);continue;case _0x482b('0x702'):_0x2811b8=_0x12cab4[_0x575b30]!==''?JSON[_0x482b('0x127')](_0x12cab4[_0x575b30]):[],_0xaa7757=_0x2811b8[_0x482b('0x6a0')](_0xf29e3f=>VisuMZ[_0x482b('0x5a3')]({},JSON[_0x482b('0x127')](_0xf29e3f)));break;default:continue;}_0x4ebdf2[_0x5525b1]=_0xaa7757;}}else{function _0x32bd65(){_0x3db202['bitmap']=_0x13c9e3[_0x482b('0x5da')](_0x13f9c9);}}}return _0x4ebdf2;},(_0x55eb0a=>{const _0x57e7bd=_0x55eb0a['name'];for(const _0x3fb439 of dependencies){if(!Imported[_0x3fb439]){if('tFtLv'!==_0x482b('0x1f6')){function _0x4f34db(){if(_0x432c2d['uiMenuStyle']&&_0x4cda70[_0x482b('0x231')]!==_0xde15e2)return _0x2e6295['uiInputPosition'];else{if(this[_0x482b('0x301')]()===_0x482b('0x6ff'))return![];else{return _0x59ce32[_0x482b('0x389')]['isRightInputMode'][_0x482b('0x460')](this);;}}}}else{alert(_0x482b('0x328')[_0x482b('0x658')](_0x57e7bd,_0x3fb439)),SceneManager['exit']();break;}}}const _0x32fa65=_0x55eb0a[_0x482b('0x183')];if(_0x32fa65[_0x482b('0x17')](/\[Version[ ](.*?)\]/i)){if('shszf'===_0x482b('0x6ad')){const _0x13086f=Number(RegExp['$1']);_0x13086f!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x482b('0x658')](_0x57e7bd,_0x13086f)),SceneManager[_0x482b('0x17b')]());}else{function _0x233b85(){this[_0x482b('0x65d')]=![];}}}if(_0x32fa65[_0x482b('0x17')](/\[Tier[ ](\d+)\]/i)){if(_0x482b('0x211')==='ysMAO'){function _0x5aa324(){return this[_0x482b('0x40c')]();}}else{const _0x3c2107=Number(RegExp['$1']);if(_0x3c2107<tier){if('FsJpr'!==_0x482b('0x6bb')){function _0x99fd60(){for(const _0x51bbac of this[_0x482b('0x264')]()){if(_0x51bbac)_0x51bbac[_0x482b('0x6bf')](_0x41a890);}}}else alert(_0x482b('0x5c8')['format'](_0x57e7bd,_0x3c2107,tier)),SceneManager[_0x482b('0x17b')]();}else tier=Math[_0x482b('0x577')](_0x3c2107,tier);}}VisuMZ[_0x482b('0x5a3')](VisuMZ[label][_0x482b('0x21a')],_0x55eb0a[_0x482b('0x1c')]);})(pluginData),VisuMZ[_0x482b('0x55a')]=function(_0x276cea){let _0x376975=[];for(const _0x5ab31d of _0x276cea){if(_0x482b('0x587')===_0x482b('0x587'))_0x376975=_0x376975[_0x482b('0x61b')](VisuMZ[_0x482b('0x47e')](_0x5ab31d));else{function _0xc59021(){this[_0x482b('0x53c')](_0x482b('0x3c3'));}}}return _0x376975['filter'](_0x3fa202=>_0x3fa202);},VisuMZ[_0x482b('0x47e')]=function(_0x4299d6){const _0x4db3c8=BattleManager[_0x482b('0x6a8')](),_0x161e33=BattleManager[_0x482b('0x2b1')],_0x1d9556=BattleManager[_0x482b('0x2b8')],_0x5f1a5b=BattleManager[_0x482b('0x338')]?BattleManager[_0x482b('0x338')][_0x482b('0x13c')](0x0):_0x4db3c8;_0x4299d6=_0x4299d6['toLowerCase']()[_0x482b('0x6b6')]();if(_0x4299d6==='user')return[_0x161e33];else{if(_0x4299d6===_0x482b('0x534'))return[_0x1d9556];else{if(_0x4299d6===_0x482b('0x3b0')){if(_0x1d9556){const _0x4d303b=_0x5f1a5b['indexOf'](_0x1d9556);return _0x4d303b>=0x0?[_0x5f1a5b[_0x4d303b-0x1]||_0x1d9556]:[_0x1d9556];}}else{if(_0x4299d6===_0x482b('0x688')){if(_0x1d9556){const _0x29ae5c=_0x5f1a5b[_0x482b('0x2d9')](_0x1d9556);return _0x29ae5c>=0x0?[_0x5f1a5b[_0x29ae5c+0x1]||_0x1d9556]:[_0x1d9556];}}else{if(_0x4299d6===_0x482b('0x193')){if(_0x482b('0x3c8')==='dxVnr')return _0x5f1a5b;else{function _0x3e3769(){return _0x4b9136[_0x482b('0x67c')]()[_0x482b('0x28e')]===_0x56cb01[_0x482b('0x67c')]()[_0x482b('0x28e')]?_0x374884[_0x482b('0x67c')]()[_0x482b('0x11')]-_0x1dcc83[_0x482b('0x67c')]()['_baseY']:_0x23803f[_0x482b('0x67c')]()[_0x482b('0x28e')]-_0x190334[_0x482b('0x67c')]()['_baseX'];}}}else{if(_0x4299d6===_0x482b('0x487')){if('AFuuh'!=='AFuuh'){function _0x13f9b7(){return this[_0x482b('0x527')]();}}else return[_0x161e33][_0x482b('0x61b')](_0x5f1a5b);}else{if(_0x4299d6==='not\x20focus')return _0x4db3c8[_0x482b('0x439')](_0x2f719c=>_0x2f719c!==_0x161e33&&!_0x5f1a5b[_0x482b('0x24d')](_0x2f719c));}}}}}}if(_0x161e33){if(_0x4299d6===_0x482b('0x447'))return _0x161e33['friendsUnit']()[_0x482b('0x24')]();else{if(_0x4299d6===_0x482b('0x532'))return _0x161e33['friendsUnit']()[_0x482b('0x24')]()[_0x482b('0x439')](_0x195642=>_0x195642!==_0x161e33);else{if(_0x4299d6===_0x482b('0x32f'))return _0x161e33[_0x482b('0x5e7')]()['aliveMembers']()[_0x482b('0x439')](_0x48e85a=>_0x48e85a!==_0x1d9556);else{if(_0x4299d6===_0x482b('0x1ed')){if(_0x482b('0x661')==='wQdHV'){function _0x3e73ea(){this[_0x482b('0x4eb')]['x']=0x0,this[_0x482b('0x51')]=_0x2c05eb['ceil'](_0x49c759['width']/0x2);}}else return _0x161e33[_0x482b('0x5e7')]()[_0x482b('0x26a')]();}else{if(_0x4299d6[_0x482b('0x17')](/FRIEND INDEX (\d+)/i)){const _0x3e710c=Number(RegExp['$1']);return[_0x161e33[_0x482b('0x5e7')]()[_0x482b('0x264')]()[_0x3e710c]];}}}}}if(_0x4299d6===_0x482b('0x309'))return _0x161e33['opponentsUnit']()[_0x482b('0x24')]();else{if(_0x4299d6===_0x482b('0xc4'))return _0x161e33[_0x482b('0x6e9')]()[_0x482b('0x24')]()[_0x482b('0x439')](_0x15712d=>_0x15712d!==_0x1d9556);else{if(_0x4299d6===_0x482b('0x783'))return _0x161e33[_0x482b('0x6e9')]()[_0x482b('0x26a')]();else{if(_0x4299d6[_0x482b('0x17')](/OPPONENT INDEX (\d+)/i)){const _0x5d3433=Number(RegExp['$1']);return[_0x161e33[_0x482b('0x6e9')]()[_0x482b('0x264')]()[_0x5d3433]];}}}}}if(_0x4299d6===_0x482b('0x594')){if(_0x482b('0x759')!==_0x482b('0x759')){function _0x340cd1(){const _0x4c5237=_0x4bdc7b[_0x482b('0x34c')]?_0x30b9fe[_0x482b('0x18')]['Settings'][_0x482b('0x406')]:_0x19d829[_0x482b('0x654')]['Settings']['ActorCmd'],_0x1083e4=_0xd5a7a6[_0x482b('0x4c9')][_0x482b('0x24d')](_0x248a7e),_0x305d7a=_0x1083e4?_0x4c5237[_0x482b('0x349')]:_0x4c5237[_0x482b('0x1df')];_0x455cd9=_0x482b('0xbb')[_0x482b('0x658')](_0x305d7a,_0x5cf47a);}}else return $gameParty[_0x482b('0x24')]();}else{if(_0x4299d6==='alive\x20actors\x20not\x20user')return $gameParty[_0x482b('0x24')]()['filter'](_0x5d92a8=>_0x5d92a8!==_0x161e33);else{if(_0x4299d6==='alive\x20actors\x20not\x20target')return $gameParty[_0x482b('0x24')]()[_0x482b('0x439')](_0x33ce59=>_0x33ce59!==_0x1d9556);else{if(_0x4299d6===_0x482b('0x673'))return $gameParty[_0x482b('0x26a')]();else{if(_0x4299d6[_0x482b('0x17')](/ACTOR INDEX (\d+)/i)){const _0x2940f1=Number(RegExp['$1']);return[$gameParty[_0x482b('0x264')]()[_0x2940f1]];}else{if(_0x4299d6['match'](/ACTOR ID (\d+)/i)){const _0x41d6e9=Number(RegExp['$1']);return[$gameActors[_0x482b('0x52d')](_0x41d6e9)];}}}}}}if(_0x4299d6===_0x482b('0x3f4'))return $gameTroop[_0x482b('0x24')]();else{if(_0x4299d6==='alive\x20enemies\x20not\x20user')return $gameTroop['aliveMembers']()['filter'](_0x3b4ddc=>_0x3b4ddc!==_0x161e33);else{if(_0x4299d6==='alive\x20enemies\x20not\x20target'){if(_0x482b('0x339')===_0x482b('0x339'))return $gameTroop[_0x482b('0x24')]()[_0x482b('0x439')](_0x418c23=>_0x418c23!==_0x1d9556);else{function _0x3dcf41(){return _0x3e8576['note'][_0x482b('0x17')](/<COMMAND TEXT: (.*)>/i)?_0x9090f1(_0x2e402d['$1']):_0x18b2e3[_0x482b('0x665')];}}}else{if(_0x4299d6===_0x482b('0x286'))return $gameTroop[_0x482b('0x26a')]();else{if(_0x4299d6[_0x482b('0x17')](/ENEMY INDEX (\d+)/i)){const _0x597cbc=Number(RegExp['$1']);return[$gameTroop[_0x482b('0x264')]()[_0x597cbc]];}else{if(_0x4299d6[_0x482b('0x17')](/ENEMY ID (\d+)/i)){if(_0x482b('0x764')===_0x482b('0x1a2')){function _0x139d7e(){_0x194c52=_0x1c4693;}}else{const _0x3c10b6=Number(RegExp['$1']);return $gameTroop[_0x482b('0x24')]()['filter'](_0x2702e1=>_0x2702e1[_0x482b('0x748')]()===_0x3c10b6);}}}}}}}if(_0x4299d6===_0x482b('0x16e')){if(_0x482b('0x38e')!==_0x482b('0x143'))return _0x4db3c8[_0x482b('0x439')](_0x47b23c=>_0x47b23c[_0x482b('0x548')]());else{function _0x3d2199(){_0x1b12e2[_0x482b('0x11f')](_0x4b995e),this['callNextMethod']();}}}else{if(_0x4299d6===_0x482b('0xae')){if(_0x482b('0x3ff')!==_0x482b('0x3ff')){function _0x456d70(){this[_0x482b('0x5a')](_0x47812f,_0x29f860['x']+_0x21bcbb[_0x482b('0x2d0')]-_0xe2d76d,_0x296bbe['y'],_0x27f303);}}else return _0x4db3c8[_0x482b('0x439')](_0x38217d=>_0x38217d[_0x482b('0x548')]()&&_0x38217d!==_0x161e33);}else{if(_0x4299d6===_0x482b('0x3fe'))return _0x4db3c8[_0x482b('0x439')](_0x187e1d=>_0x187e1d[_0x482b('0x548')]()&&_0x187e1d!==_0x1d9556);else{if(_0x4299d6===_0x482b('0x2e7'))return _0x4db3c8[_0x482b('0x439')](_0x16041a=>_0x16041a[_0x482b('0x2a4')]());}}}return[];},PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x4bd'),_0x19ec61=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ['ConvertParams'](_0x19ec61,_0x19ec61);const _0x45373b=$gameTemp['getLastPluginCommandInterpreter'](),_0x15dcc7=BattleManager[_0x482b('0x19')],_0x39bdb0=BattleManager['_subject'],_0x58d9b3=BattleManager[_0x482b('0x338')][_0x482b('0x13c')](0x0),_0x459b0a=BattleManager['_logWindow'];if(!_0x45373b||!_0x15dcc7||!_0x39bdb0)return;if(!_0x15dcc7['item']())return;if(_0x19ec61[_0x482b('0x322')])_0x459b0a[_0x482b('0x55')](_0x39bdb0,_0x15dcc7[_0x482b('0x596')]());if(_0x19ec61[_0x482b('0x6ba')])_0x459b0a[_0x482b('0x260')]('applyImmortal',_0x39bdb0,_0x58d9b3,!![]);if(_0x19ec61[_0x482b('0x32b')])_0x459b0a['push'](_0x482b('0x314'),_0x39bdb0,_0x15dcc7);if(_0x19ec61[_0x482b('0x403')])_0x459b0a[_0x482b('0x260')]('waitForMovement');if(_0x19ec61[_0x482b('0x90')])_0x459b0a[_0x482b('0x260')](_0x482b('0x11f'),_0x39bdb0,_0x15dcc7);if(_0x19ec61[_0x482b('0x5ea')])_0x459b0a['push'](_0x482b('0x6a2'));_0x45373b['setWaitMode'](_0x482b('0x1bb'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0xc0'),_0x173e31=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ['ConvertParams'](_0x173e31,_0x173e31);const _0x35c7e4=$gameTemp[_0x482b('0x104')](),_0x2cae02=BattleManager['_action'],_0x53317c=BattleManager[_0x482b('0x2b1')],_0x291904=BattleManager['_allTargets']['slice'](0x0),_0x2ce2c9=BattleManager[_0x482b('0x695')];if(!_0x35c7e4||!_0x2cae02||!_0x53317c)return;if(!_0x2cae02['item']())return;if(_0x173e31['PerformAction'])_0x2ce2c9['push'](_0x482b('0x141'),_0x53317c,_0x2cae02);if(_0x173e31[_0x482b('0x4e1')]>0x0)_0x2ce2c9[_0x482b('0x260')](_0x482b('0x63e'),_0x173e31[_0x482b('0x4e1')]);if(_0x173e31[_0x482b('0x670')])_0x2ce2c9['push'](_0x482b('0x4a7'),_0x53317c,_0x291904,_0x2cae02[_0x482b('0x596')]()[_0x482b('0x1f8')]);if(_0x173e31['WaitForAnimation'])_0x2ce2c9[_0x482b('0x260')](_0x482b('0x6a2'));for(const _0x2c652b of _0x291904){if(!_0x2c652b)continue;if(_0x173e31[_0x482b('0x9c')])_0x2ce2c9['push'](_0x482b('0x41c'),_0x53317c,_0x2c652b);}if(_0x173e31[_0x482b('0x6ba')])_0x2ce2c9['push']('applyImmortal',_0x53317c,_0x291904,![]);_0x35c7e4[_0x482b('0x46c')](_0x482b('0x1bb'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x3f6'),_0x313935=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x313935,_0x313935);const _0x1a1fc3=$gameTemp[_0x482b('0x104')](),_0x20588e=BattleManager['_action'],_0x176ebd=BattleManager[_0x482b('0x2b1')],_0xa1d1e0=BattleManager[_0x482b('0x338')][_0x482b('0x13c')](0x0),_0x2f9a96=BattleManager['_logWindow'];if(!_0x1a1fc3||!_0x20588e||!_0x176ebd)return;if(!_0x20588e[_0x482b('0x596')]())return;for(const _0x45857f of _0xa1d1e0){if(_0x482b('0x119')===_0x482b('0x119')){if(!_0x45857f)continue;if(_0x313935[_0x482b('0x3ee')])_0x2f9a96[_0x482b('0x260')](_0x482b('0x141'),_0x176ebd,_0x20588e);if(_0x313935[_0x482b('0x531')]>0x0)_0x2f9a96[_0x482b('0x260')](_0x482b('0x63e'),_0x313935['WaitCount1']);if(_0x313935['ActionAnimation'])_0x2f9a96[_0x482b('0x260')](_0x482b('0x4a7'),_0x176ebd,[_0x45857f],_0x20588e[_0x482b('0x596')]()[_0x482b('0x1f8')]);if(_0x313935[_0x482b('0x584')]>0x0)_0x2f9a96['push']('waitCount',_0x313935[_0x482b('0x584')]);if(_0x313935['ActionEffect'])_0x2f9a96['push'](_0x482b('0x41c'),_0x176ebd,_0x45857f);}else{function _0x1aab48(){if(!_0x3aa51f[_0x482b('0x23a')]())return;if(!_0x236ff1[_0x482b('0x66a')])return;_0x282d5a[_0x482b('0x5a3')](_0x18f9f6,_0x247e5f);const _0x5ee735=_0x1d3cd1[_0x482b('0x104')](),_0x41775a=_0xa44e02[_0x482b('0x3ab')];if(!_0x5ee735)return;_0x390fce[_0x482b('0x5cc')](0x1,_0x1556a9[_0x482b('0x236')],_0x53eaa5['EasingType']);if(_0x41775a)_0x5ee735[_0x482b('0x46c')](_0x482b('0x6c8'));}}}if(_0x313935['ApplyImmortal'])_0x2f9a96[_0x482b('0x260')]('applyImmortal',_0x176ebd,_0xa1d1e0,![]);_0x1a1fc3[_0x482b('0x46c')](_0x482b('0x1bb'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x465'),_0xb70014=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ['ConvertParams'](_0xb70014,_0xb70014);const _0x33b214=$gameTemp[_0x482b('0x104')](),_0x4ab08e=BattleManager['_action'],_0x7fb6f4=BattleManager[_0x482b('0x2b1')],_0x46d09d=BattleManager['_allTargets'][_0x482b('0x13c')](0x0),_0x3760c5=BattleManager[_0x482b('0x695')];if(!_0x33b214||!_0x4ab08e||!_0x7fb6f4)return;if(!_0x4ab08e['item']())return;if(_0xb70014[_0x482b('0x44d')])_0x3760c5[_0x482b('0x260')](_0x482b('0xce'));if(_0xb70014[_0x482b('0x721')])_0x3760c5['push'](_0x482b('0x497'));if(_0xb70014[_0x482b('0x530')])_0x3760c5['push'](_0x482b('0x2f6'));if(_0xb70014['ActionEnd'])_0x3760c5[_0x482b('0x260')]('performActionEnd',_0x7fb6f4);if(_0xb70014[_0x482b('0x403')])_0x3760c5[_0x482b('0x260')]('waitForMovement');_0x33b214[_0x482b('0x46c')](_0x482b('0x1bb'));}),PluginManager['registerCommand'](pluginData['name'],_0x482b('0x3c1'),_0x420bdb=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x420bdb,_0x420bdb);const _0x34ef5b=$gameTemp[_0x482b('0x104')](),_0x19d847=BattleManager[_0x482b('0x19')],_0x2d19f7=BattleManager[_0x482b('0x2b1')],_0x5bde98=VisuMZ[_0x482b('0x55a')](_0x420bdb[_0x482b('0x720')]),_0x5dc463=_0x420bdb['Mirror'],_0xf06692=BattleManager[_0x482b('0x695')];if(!_0x34ef5b||!_0x19d847||!_0x2d19f7)return;if(!_0x19d847[_0x482b('0x596')]())return;let _0xd6abcb=_0x19d847['item']()[_0x482b('0x1f8')];if(_0xd6abcb<0x0)_0xd6abcb=_0x2d19f7[_0x482b('0x1af')]();$gameTemp[_0x482b('0x610')](_0x5bde98,_0xd6abcb,_0x5dc463),_0x420bdb['WaitForAnimation']&&_0x34ef5b[_0x482b('0x46c')](_0x482b('0x4fc'));}),PluginManager['registerCommand'](pluginData[_0x482b('0x665')],_0x482b('0x4d7'),_0x1e6efd=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x1e6efd,_0x1e6efd);const _0x23318d=$gameTemp[_0x482b('0x104')](),_0x2f4307=BattleManager[_0x482b('0x2b1')],_0x1f594b=VisuMZ[_0x482b('0x55a')](_0x1e6efd[_0x482b('0x720')]),_0x512263=_0x1e6efd[_0x482b('0x229')],_0x1a3171=BattleManager[_0x482b('0x695')];if(!_0x23318d||!_0x2f4307)return;const _0x1b636d=_0x2f4307['attackAnimationId1']();$gameTemp[_0x482b('0x610')](_0x1f594b,_0x1b636d,_0x512263),_0x1e6efd[_0x482b('0x5ea')]&&_0x23318d[_0x482b('0x46c')](_0x482b('0x4fc'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x1c7'),_0x500329=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x500329,_0x500329);const _0x3f04b6=$gameTemp[_0x482b('0x104')](),_0xfffe7e=BattleManager[_0x482b('0x19')],_0x2a59b2=_0x500329[_0x482b('0x229')],_0x4aac8b=VisuMZ[_0x482b('0x55a')](_0x500329[_0x482b('0x720')]);if(!_0x3f04b6||!_0xfffe7e)return;if(!_0xfffe7e[_0x482b('0x596')]())return;for(const _0x16a168 of _0x4aac8b){if(_0x482b('0x2ad')===_0x482b('0x9a')){function _0x564b52(){this[_0x482b('0x56f')][_0x482b('0x68d')]();}}else{if(!_0x16a168)continue;_0x16a168[_0x482b('0x11f')](_0xfffe7e,_0x2a59b2);}}if(_0x500329[_0x482b('0x5ea')])_0x3f04b6[_0x482b('0x46c')](_0x482b('0x4fc'));}),PluginManager[_0x482b('0x4ff')](pluginData['name'],_0x482b('0x790'),_0x444c0d=>{VisuMZ[_0x482b('0x5a3')](_0x444c0d,_0x444c0d);const _0x5c668a=$gameTemp['getLastPluginCommandInterpreter'](),_0x498d84=VisuMZ[_0x482b('0x55a')](_0x444c0d[_0x482b('0x720')]),_0x29e4fe=_0x444c0d[_0x482b('0x10f')];if(!_0x29e4fe)return;for(const _0x30a030 of _0x498d84){if(!_0x30a030)continue;if(!_0x30a030[_0x482b('0x3e4')]())continue;_0x30a030[_0x482b('0x69')](_0x29e4fe);}}),PluginManager['registerCommand'](pluginData[_0x482b('0x665')],_0x482b('0x76c'),_0xca79e7=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ['ConvertParams'](_0xca79e7,_0xca79e7);const _0x5e76aa=$gameTemp[_0x482b('0x104')](),_0x2f26c1=VisuMZ['CreateActionSequenceTargets'](_0xca79e7[_0x482b('0x720')]),_0x5a8caf=_0xca79e7[_0x482b('0x46a')],_0x2945f6=_0xca79e7[_0x482b('0x229')];if(!_0x5e76aa)return;$gameTemp['requestAnimation'](_0x2f26c1,_0x5a8caf,_0x2945f6);if(_0xca79e7[_0x482b('0x5ea')])_0x5e76aa[_0x482b('0x46c')](_0x482b('0x4fc'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x139'),_0x50c5f2=>{if(!SceneManager['isSceneBattle']())return;const _0x2be594=$gameTemp[_0x482b('0x104')]();if(!_0x2be594)return;_0x2be594['setWaitMode'](_0x482b('0x4fc'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x70c'),_0x214c4e=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x214c4e,_0x214c4e);const _0x1ec8d4=BattleManager[_0x482b('0x695')];_0x1ec8d4[_0x482b('0x642')](_0x214c4e[_0x482b('0x39')]);}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0xa3'),_0x42fcb9=>{if(!SceneManager['isSceneBattle']())return;const _0x2a891e=BattleManager[_0x482b('0x695')];_0x2a891e[_0x482b('0x2f6')]();}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x511'),_0x19f8ad=>{if(!SceneManager[_0x482b('0x23a')]())return;const _0x3cceef=$gameTemp[_0x482b('0x104')](),_0x404e41=BattleManager[_0x482b('0x19')],_0x4593eb=BattleManager[_0x482b('0x2b1')],_0x3c36e5=BattleManager[_0x482b('0x695')];if(!_0x3cceef||!_0x404e41||!_0x4593eb)return;if(!_0x404e41[_0x482b('0x596')]())return;_0x3c36e5[_0x482b('0x55')](_0x4593eb,_0x404e41[_0x482b('0x596')]()),_0x3cceef[_0x482b('0x46c')](_0x482b('0x1bb'));}),PluginManager['registerCommand'](pluginData['name'],_0x482b('0x21b'),_0x2067c3=>{if(!SceneManager[_0x482b('0x23a')]())return;const _0x2aeea9=BattleManager[_0x482b('0x695')];_0x2aeea9[_0x482b('0x1d8')]();}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],'ActSeq_BattleLog_PushBaseLine',_0x55c803=>{if(!SceneManager['isSceneBattle']())return;const _0x3c737a=BattleManager[_0x482b('0x695')];_0x3c737a[_0x482b('0x698')]();}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],'ActSeq_BattleLog_Refresh',_0x214ce1=>{if(!SceneManager[_0x482b('0x23a')]())return;const _0x38ef72=BattleManager[_0x482b('0x695')];_0x38ef72[_0x482b('0x5c3')]();}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x88'),_0x486579=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x482b('0x5a3')](_0x486579,_0x486579),SceneManager[_0x482b('0x455')]['setVisibleUI'](_0x486579['ShowHide']);}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x73b'),_0x28d5f1=>{if(!SceneManager[_0x482b('0x23a')]())return;const _0xae553=$gameTemp[_0x482b('0x104')]();_0xae553[_0x482b('0x46c')](_0x482b('0x1bb'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x453'),_0x1aede9=>{if(!SceneManager[_0x482b('0x23a')]())return;const _0x2fb77e=$gameTemp[_0x482b('0x104')](),_0x4c6e12=BattleManager[_0x482b('0x695')];_0x4c6e12[_0x482b('0xce')](),_0x2fb77e[_0x482b('0x46c')](_0x482b('0x1bb'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x4b'),_0x111aa3=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ['ConvertParams'](_0x111aa3,_0x111aa3);const _0x4c1d0a=$gameScreen[_0x482b('0x5b4')]();_0x4c1d0a[_0x482b('0x51c')]=_0x111aa3[_0x482b('0x23b')];}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x37a'),_0x853ce3=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported[_0x482b('0x66a')])return;VisuMZ['ConvertParams'](_0x853ce3,_0x853ce3);const _0xc53656=$gameTemp[_0x482b('0x104')](),_0x4f7f8b=_0x853ce3[_0x482b('0x53b')];$gameScreen[_0x482b('0x4e2')](_0x853ce3[_0x482b('0x3bb')],_0x853ce3[_0x482b('0xe2')],_0x853ce3[_0x482b('0x236')],_0x853ce3[_0x482b('0x6b1')]);if(_0x4f7f8b)_0xc53656[_0x482b('0x46c')](_0x482b('0x1c8'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x26d'),_0x4501fa=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported[_0x482b('0x66a')])return;VisuMZ[_0x482b('0x5a3')](_0x4501fa,_0x4501fa);const _0x31bd94=$gameTemp[_0x482b('0x104')](),_0x4d583e=VisuMZ[_0x482b('0x55a')](_0x4501fa[_0x482b('0x720')]),_0x3c5065=_0x4501fa[_0x482b('0x53b')];$gameScreen[_0x482b('0x1c3')](_0x4d583e,_0x4501fa[_0x482b('0x236')],_0x4501fa['EasingType']);if(_0x3c5065)_0x31bd94[_0x482b('0x46c')](_0x482b('0x1c8'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x63f'),_0x568aea=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported[_0x482b('0x66a')])return;VisuMZ['ConvertParams'](_0x568aea,_0x568aea);const _0x3d6c7b=$gameTemp[_0x482b('0x104')](),_0x17dda9=_0x568aea[_0x482b('0x53b')];$gameScreen[_0x482b('0x767')](_0x568aea[_0x482b('0x162')],_0x568aea[_0x482b('0x132')],_0x568aea[_0x482b('0x236')],_0x568aea[_0x482b('0x6b1')]);if(_0x17dda9)_0x3d6c7b[_0x482b('0x46c')](_0x482b('0x1c8'));}),PluginManager['registerCommand'](pluginData['name'],_0x482b('0x4b7'),_0x57395c=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ['ConvertParams'](_0x57395c,_0x57395c);const _0x4324c2=$gameTemp[_0x482b('0x104')](),_0x35b7b8=_0x57395c[_0x482b('0x22b')],_0x58c574=_0x57395c[_0x482b('0x540')],_0x5af36b=_0x57395c[_0x482b('0x53b')];if(_0x35b7b8){if(_0x482b('0xc7')!==_0x482b('0xc7')){function _0x42d12a(){if(!_0x2840d9[_0x482b('0x386')]())return;const _0x44e59b=this[_0x482b('0x67c')]();if(!_0x44e59b)return;_0x44e59b[_0x482b('0xf5')](_0x3ec9eb,_0x2d18d6,_0x48b045);}}else{const _0x1008ad=Math[_0x482b('0x49b')](Graphics['width']/0x2),_0x2492a1=Math[_0x482b('0x49b')](Graphics[_0x482b('0x2c3')]/0x2);$gameScreen[_0x482b('0x4e2')](_0x1008ad,_0x2492a1,_0x57395c[_0x482b('0x236')],_0x57395c[_0x482b('0x6b1')]);}}if(_0x58c574){if(_0x482b('0xa0')===_0x482b('0xa0'))$gameScreen[_0x482b('0x767')](0x0,0x0,_0x57395c[_0x482b('0x236')],_0x57395c['EasingType']);else{function _0x132a58(){_0x54807c[_0x482b('0x766')]()[_0x482b('0x6ea')]>0x0&&!_0x1bb76c[_0x482b('0x766')]()[_0x482b('0x33b')]&&this[_0x482b('0x260')](_0x482b('0x366'),_0x483d28),_0x30fbe4[_0x482b('0x766')]()[_0x482b('0x6ea')]<0x0&&this['push'](_0x482b('0xe6'),_0x298fe5),_0x261f31[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x14')]&&this['push']('addText',this[_0x482b('0x472')](_0x162bd2));}}}if(_0x5af36b)_0x4324c2[_0x482b('0x46c')](_0x482b('0x1c8'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x62b'),_0x48243b=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported[_0x482b('0x66a')])return;const _0x3c3f15=$gameTemp[_0x482b('0x104')]();if(!_0x3c3f15)return;_0x3c3f15[_0x482b('0x46c')]('battleCamera');}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x2ca'),_0x3c98c1=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported[_0x482b('0x2e4')])return;VisuMZ[_0x482b('0x5a3')](_0x3c98c1,_0x3c98c1);const _0x244d7e=VisuMZ[_0x482b('0x55a')](_0x3c98c1[_0x482b('0x720')]),_0xd8629c=_0x3c98c1['MotionAni'][_0x482b('0x515')]()[_0x482b('0x6b6')]();for(const _0x27406b of _0x244d7e){if(_0x482b('0x6f7')==='HRrME'){function _0x2f9749(){this[_0x482b('0xb5')](_0xc007d4)?this[_0x482b('0x6f9')]()[_0x482b('0x2ff')](_0x421e02):this[_0x482b('0x568')][_0x482b('0x2ff')](_0x35a103),this['_animationSprites'][_0x482b('0x260')](_0x5c9a73);}}else{if(!_0x27406b)continue;_0x27406b[_0x482b('0x3b9')](_0xd8629c);}}}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x551'),_0xb8da08=>{if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x482b('0x2e4')])return;VisuMZ[_0x482b('0x5a3')](_0xb8da08,_0xb8da08);const _0x29b2c8=VisuMZ[_0x482b('0x55a')](_0xb8da08[_0x482b('0x720')]),_0x37cf3d=_0xb8da08[_0x482b('0x257')];for(const _0x3d33c6 of _0x29b2c8){if(_0x482b('0x253')!==_0x482b('0x253')){function _0x20d9e5(){if(!_0x569682[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2dd')][_0x482b('0x602')])return![];if(_0x5ecc3d[_0x482b('0x75d')]())return!![];return _0x5a23f0[_0x482b('0x5e4')]&&_0xdcd045[_0x482b('0x332')]();}}else{if(!_0x3d33c6)continue;_0x3d33c6[_0x482b('0x656')]()[_0x482b('0x6bd')]=_0x37cf3d;}}}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x268'),_0x4d4cc3=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported[_0x482b('0x112')])return;VisuMZ[_0x482b('0x5a3')](_0x4d4cc3,_0x4d4cc3);const _0x7a5242=BattleManager[_0x482b('0x19')],_0x4c5947=_0x4d4cc3[_0x482b('0x84')];if(!_0x7a5242)return;_0x7a5242['_battleCoreAddedElements']=_0x4c5947;}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x5b6'),_0x3f56d1=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported[_0x482b('0x112')])return;const _0x2e01e3=BattleManager[_0x482b('0x19')];if(!_0x2e01e3)return;_0x2e01e3[_0x482b('0x42e')]();}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],'ActSeq_Element_ForceElements',_0x374e5a=>{if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x482b('0x112')])return;VisuMZ['ConvertParams'](_0x374e5a,_0x374e5a);const _0x355b9c=BattleManager[_0x482b('0x19')],_0x30a621=_0x374e5a[_0x482b('0x84')];if(!_0x355b9c)return;_0x355b9c[_0x482b('0x787')]=_0x30a621;}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x341'),_0x5bff36=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported[_0x482b('0x112')])return;const _0x59078b=BattleManager[_0x482b('0x19')];if(!_0x59078b)return;_0x59078b[_0x482b('0x727')]=!![];}),PluginManager['registerCommand'](pluginData[_0x482b('0x665')],_0x482b('0x730'),_0x50b15e=>{if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x50b15e,_0x50b15e);const _0x647873=$gameTemp[_0x482b('0x104')](),_0x5bd5a1=BattleManager['_action'],_0x459a31=BattleManager[_0x482b('0x2b1')],_0x330ac8=BattleManager[_0x482b('0x695')];if(!_0x647873||!_0x5bd5a1||!_0x459a31)return;if(!_0x5bd5a1[_0x482b('0x596')]())return;const _0x4eaf85=VisuMZ[_0x482b('0x55a')](_0x50b15e[_0x482b('0x720')]);for(const _0x5c8e05 of _0x4eaf85){if(!_0x5c8e05)continue;_0x330ac8[_0x482b('0x260')](_0x482b('0x41c'),_0x459a31,_0x5c8e05);}_0x647873[_0x482b('0x46c')](_0x482b('0x1bb'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],'ActSeq_Mechanics_AddBuffDebuff',_0x169d2c=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x482b('0x5a3')](_0x169d2c,_0x169d2c);const _0x152fd4=[_0x482b('0xd4'),_0x482b('0x4b3'),_0x482b('0x351'),_0x482b('0x6eb'),_0x482b('0x735'),_0x482b('0x262'),_0x482b('0x71'),_0x482b('0x542')],_0x53362b=_0x169d2c[_0x482b('0x13e')],_0x31345c=_0x169d2c[_0x482b('0x501')],_0x3dcf02=_0x169d2c[_0x482b('0x27f')],_0x170f52=VisuMZ[_0x482b('0x55a')](_0x169d2c['Targets']);for(const _0xab18e7 of _0x170f52){if('uAacC'!==_0x482b('0x1fc')){function _0x36cc75(){_0x1737b4[_0x482b('0x654')]['JS'][_0x416dd3][_0x482b('0x460')](this,this,this,_0x154f37,0x0);}}else{if(!_0xab18e7)continue;for(const _0x4c16dd of _0x53362b){if('aNhsF'===_0x482b('0x672')){function _0x329736(){_0x40527b[_0x482b('0x389')][_0x482b('0x141')][_0x482b('0x460')](this,_0x4b7b20);if(this[_0x482b('0x114')]())this['performActionMotions'](_0x405261);}}else{const _0x18dc70=_0x152fd4[_0x482b('0x2d9')](_0x4c16dd[_0x482b('0x53e')]()[_0x482b('0x6b6')]());if(_0x18dc70>=0x0&&_0x18dc70<=0x7){if(_0x482b('0x313')!==_0x482b('0x313')){function _0x1395b5(){this['_visualHpGauge_JustDied']=!this[_0x482b('0xac')](),_0x1e0c13['registerDefeatedEnemy'](this[_0x482b('0x748')]());}}else _0xab18e7[_0x482b('0x4d2')](_0x18dc70,_0x3dcf02);}}}for(const _0x4b0112 of _0x31345c){const _0x2a3c1c=_0x152fd4[_0x482b('0x2d9')](_0x4b0112[_0x482b('0x53e')]()[_0x482b('0x6b6')]());if(_0x2a3c1c>=0x0&&_0x2a3c1c<=0x7){if(_0x482b('0x5dd')===_0x482b('0x5dd'))_0xab18e7[_0x482b('0x230')](_0x2a3c1c,_0x3dcf02);else{function _0xf92676(){return _0x28845b(_0x3602b9['$1']);}}}}}}}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x65f'),_0x5a0cf6=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ['ConvertParams'](_0x5a0cf6,_0x5a0cf6);const _0x47d5e2=_0x5a0cf6['States'],_0x49387e=VisuMZ[_0x482b('0x55a')](_0x5a0cf6[_0x482b('0x720')]);for(const _0x5e6350 of _0x49387e){if(_0x482b('0x1d4')!=='vLjdP'){if(!_0x5e6350)continue;for(const _0x44c43d of _0x47d5e2){if(_0x482b('0x60a')===_0x482b('0x796')){function _0x50d1d1(){return _0x49ac57[_0x482b('0x455')][_0x482b('0x301')]()===_0x482b('0x6ff')?_0x25caab[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2dd')][_0x482b('0x47f')]:_0x5ff763[_0x482b('0x654')]['Settings'][_0x482b('0x2dd')][_0x482b('0x693')];}}else _0x5e6350[_0x482b('0x189')](_0x44c43d);}}else{function _0xe33010(){_0x19ad03['prototype'][_0x482b('0x50')]['call'](this),this['_updateCursorFilterArea']();}}}}),PluginManager[_0x482b('0x4ff')](pluginData['name'],_0x482b('0x69c'),_0xd13bb2=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ['ConvertParams'](_0xd13bb2,_0xd13bb2);const _0xced364=BattleManager[_0x482b('0x19')],_0x1a9d5e={'arPenRate':_0xd13bb2[_0x482b('0x650')],'arPenFlat':_0xd13bb2[_0x482b('0xb0')],'arRedRate':_0xd13bb2[_0x482b('0x1fa')],'arRedFlat':_0xd13bb2[_0x482b('0x5fd')]};_0xced364[_0x482b('0x4e8')]=_0x1a9d5e;}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x47a'),_0x405a16=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x405a16,_0x405a16);const _0x5e594b=VisuMZ[_0x482b('0x55a')](_0x405a16[_0x482b('0x720')]),_0x5820c7=_0x405a16[_0x482b('0x54d')],_0x11f0fe=_0x405a16[_0x482b('0x54d')],_0x5bfb14=_0x405a16[_0x482b('0x371')];for(const _0x2dfb77 of _0x5e594b){if('tcltc'!==_0x482b('0x4da')){if(!_0x2dfb77)continue;if(_0x2dfb77[_0x482b('0x400')]()){if(_0x482b('0x3df')===_0x482b('0x5fc')){function _0x1b3794(){_0x272cfa[_0x482b('0x238')](0x0);}}else _0x2dfb77[_0x482b('0x319')](_0x5820c7);}else{if(_0x2dfb77[_0x482b('0x785')]()){_0x2dfb77[_0x482b('0x22f')](_0x5820c7);if(_0x5bfb14)_0x2dfb77[_0x482b('0x493')]();}}}else{function _0x984cf(){if(!_0x357424[_0x482b('0x23a')]())return;if(!this[_0x482b('0x67c')]())return;if(_0x4d0c6d[_0x482b('0x5b8')]<=0x0)return;_0x43ca76=_0xf52821||{},_0x4669a3[_0x482b('0x5cb')]=_0x4bff68['textColor']||_0x482b('0x18b'),_0x20272a['flashColor']=_0x5e7931[_0x482b('0x6d5')]||[0x0,0x0,0x0,0x0],_0x8da804[_0x482b('0x552')]=_0xddc90[_0x482b('0x552')]||0x0,this[_0x482b('0x67c')]()[_0x482b('0x111')](_0x26ed87,_0x347874);}}}}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x6ab'),_0x27afdc=>{if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x27afdc,_0x27afdc);const _0x5db322=$gameTemp[_0x482b('0x104')](),_0x38ac8b=BattleManager[_0x482b('0x19')],_0x5a9ef6=BattleManager[_0x482b('0x2b1')];if(!_0x5db322||!_0x38ac8b||!_0x5a9ef6)return;if(!_0x38ac8b[_0x482b('0x596')]())return;const _0x4f9abf=VisuMZ[_0x482b('0x55a')](_0x27afdc[_0x482b('0x720')]);for(const _0x360a7d of _0x4f9abf){if(!_0x360a7d)continue;_0x27afdc['ForceDeath']&&(_0x360a7d[_0x482b('0x380')](),_0x360a7d[_0x482b('0x189')](_0x360a7d[_0x482b('0x529')]()));if(_0x360a7d[_0x482b('0x410')]())_0x360a7d[_0x482b('0x417')]();}_0x5db322[_0x482b('0x46c')](_0x482b('0x10c'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],'ActSeq_Mechanics_DamagePopup',_0x25b0bf=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ['ConvertParams'](_0x25b0bf,_0x25b0bf);const _0x94dc75=VisuMZ[_0x482b('0x55a')](_0x25b0bf[_0x482b('0x720')]);for(const _0x2ee001 of _0x94dc75){if(_0x482b('0x1a4')===_0x482b('0x1a4')){if(!_0x2ee001)continue;if(_0x2ee001[_0x482b('0x383')]())_0x2ee001[_0x482b('0x446')]();}else{function _0x3c61cc(){_0x395bc3-=_0x58bb3a[_0x1c7f2a];if(_0x478227<=0x0)return _0x25dd66;}}}}),PluginManager['registerCommand'](pluginData[_0x482b('0x665')],_0x482b('0xe5'),_0x19e78e=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x19e78e,_0x19e78e);const _0x10beaf=$gameTemp[_0x482b('0x104')](),_0x4220bf=BattleManager['_subject'],_0x4e2255=_0x19e78e[_0x482b('0x5f4')];if(!_0x10beaf)return;if(!_0x4220bf)return;_0x4220bf&&_0x4220bf[_0x482b('0x2a4')]()&&_0x4e2255[_0x482b('0x53e')]()[_0x482b('0x6b6')]()!=='UNTITLED'&&_0x10beaf['command119']([_0x4e2255]);}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],'ActSeq_Mechanics_HpMpTp',_0x209561=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x209561,_0x209561);const _0x2fc375=VisuMZ[_0x482b('0x55a')](_0x209561[_0x482b('0x720')]),_0x1b8586=_0x209561[_0x482b('0x48a')],_0x58795e=_0x209561[_0x482b('0x2e0')],_0x109ab7=_0x209561[_0x482b('0x73a')],_0x5b9f1c=_0x209561[_0x482b('0x29d')],_0x364e55=_0x209561[_0x482b('0x29b')],_0x2c6e5c=_0x209561[_0x482b('0x482')],_0x18ef27=_0x209561[_0x482b('0xc6')];for(const _0x3ecb01 of _0x2fc375){if(!_0x3ecb01)continue;const _0x3b2c71=Math[_0x482b('0x49b')](_0x1b8586*_0x3ecb01[_0x482b('0x16f')]+_0x58795e),_0x366eeb=Math[_0x482b('0x49b')](_0x109ab7*_0x3ecb01[_0x482b('0x2cc')]+_0x5b9f1c),_0x268305=Math[_0x482b('0x49b')](_0x364e55*_0x3ecb01[_0x482b('0x107')]()+_0x2c6e5c);if(_0x3b2c71!==0x0)_0x3ecb01[_0x482b('0x4a0')](_0x3b2c71);if(_0x366eeb!==0x0)_0x3ecb01[_0x482b('0x635')](_0x366eeb);if(_0x268305!==0x0)_0x3ecb01['gainTp'](_0x268305);if(_0x18ef27)_0x3ecb01[_0x482b('0x446')]();}}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x317'),_0x2c5549=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x2c5549,_0x2c5549);const _0x9494f1=VisuMZ[_0x482b('0x55a')](_0x2c5549[_0x482b('0x720')]);for(const _0x443a59 of _0x9494f1){if(_0x482b('0x4df')!=='CAktb'){if(!_0x443a59)continue;_0x443a59[_0x482b('0x74a')](_0x2c5549[_0x482b('0x3ce')]);}else{function _0x504bed(){this[_0x482b('0x70')]['y']=-this[_0x482b('0x615')][_0x482b('0x2c3')]-this[_0x482b('0x70')][_0x482b('0x2c3')],this[_0x482b('0x70')][_0x482b('0x325')]['x']=0x1/(this[_0x482b('0x325')]['x']||0.001),this[_0x482b('0x70')][_0x482b('0x325')]['y']=0x1/(this[_0x482b('0x325')]['y']||0.001),this[_0x482b('0x114')]()&&(this[_0x482b('0x524')][_0x482b('0x62d')][_0x482b('0x325')]['x']=-0x1/(this[_0x482b('0x325')]['x']||0.001),this['_svBattlerSprite']['_stateSprite'][_0x482b('0x325')]['y']=0x1/(this['scale']['y']||0.001));}}}}),PluginManager['registerCommand'](pluginData['name'],_0x482b('0x82'),_0x4a6305=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ['ConvertParams'](_0x4a6305,_0x4a6305);const _0x3a7c9b=BattleManager['_action'],_0x520f37={'criticalHitRate':_0x4a6305[_0x482b('0x623')],'criticalHitFlat':_0x4a6305[_0x482b('0x740')],'criticalDmgRate':_0x4a6305[_0x482b('0x9')],'criticalDmgFlat':_0x4a6305[_0x482b('0x71f')],'damageRate':_0x4a6305[_0x482b('0x51d')],'damageFlat':_0x4a6305[_0x482b('0x35')],'hitRate':_0x4a6305[_0x482b('0x37d')],'hitFlat':_0x4a6305[_0x482b('0x199')]};_0x3a7c9b[_0x482b('0x1e0')]=_0x520f37;}),PluginManager['registerCommand'](pluginData[_0x482b('0x665')],_0x482b('0x5e8'),_0x145ffa=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x482b('0x5a3')](_0x145ffa,_0x145ffa);const _0x308547=[_0x482b('0xd4'),'MAXMP',_0x482b('0x351'),_0x482b('0x6eb'),_0x482b('0x735'),_0x482b('0x262'),_0x482b('0x71'),_0x482b('0x542')],_0x1c0060=_0x145ffa[_0x482b('0x13e')],_0x563eaa=_0x145ffa[_0x482b('0x501')],_0x1caea5=VisuMZ['CreateActionSequenceTargets'](_0x145ffa['Targets']);for(const _0x3b3848 of _0x1caea5){if(!_0x3b3848)continue;for(const _0x50ec0f of _0x1c0060){if(_0x482b('0x506')!==_0x482b('0x506')){function _0x4c7e94(){this[_0x482b('0x206')][_0x482b('0x2cb')](0x0,0x0,0x0,0x0);}}else{const _0x3b0fee=_0x308547['indexOf'](_0x50ec0f[_0x482b('0x53e')]()['trim']());_0x3b0fee>=0x0&&_0x3b0fee<=0x7&&_0x3b3848['isBuffAffected'](_0x3b0fee)&&_0x3b3848[_0x482b('0x3af')](_0x3b0fee);}}for(const _0x256de0 of _0x563eaa){const _0x2b65af=_0x308547[_0x482b('0x2d9')](_0x256de0[_0x482b('0x53e')]()[_0x482b('0x6b6')]());if(_0x2b65af>=0x0&&_0x2b65af<=0x7&&_0x3b3848[_0x482b('0x566')](_0x2b65af)){if(_0x482b('0x3b4')!==_0x482b('0x3b4')){function _0x5610f3(){_0x44ed33[_0x482b('0x654')][_0x482b('0x10')][_0x482b('0x460')](this),this[_0x482b('0x1a1')]();}}else _0x3b3848[_0x482b('0x3af')](_0x2b65af);}}}}),PluginManager['registerCommand'](pluginData[_0x482b('0x665')],_0x482b('0x16d'),_0x3dbd06=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ['ConvertParams'](_0x3dbd06,_0x3dbd06);const _0x2ce392=_0x3dbd06[_0x482b('0x781')],_0x2ce754=VisuMZ[_0x482b('0x55a')](_0x3dbd06[_0x482b('0x720')]);for(const _0x4d7f6b of _0x2ce754){if(_0x482b('0x20b')!==_0x482b('0x5ab')){if(!_0x4d7f6b)continue;for(const _0x186e87 of _0x2ce392){_0x4d7f6b['removeState'](_0x186e87);}}else{function _0x235cae(){if(!_0x4c096c[_0x482b('0x23a')]())return;if(!_0x3d4576[_0x482b('0x112')])return;_0x52b40a[_0x482b('0x5a3')](_0x18ad47,_0x2d3894);const _0x3ee83e=_0x59746f[_0x482b('0x19')],_0x471730=_0x161a8a[_0x482b('0x84')];if(!_0x3ee83e)return;_0x3ee83e[_0x482b('0xfd')]=_0x471730;}}}}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x612'),_0x513ee3=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ['ConvertParams'](_0x513ee3,_0x513ee3);const _0x42ba2d=VisuMZ[_0x482b('0x55a')](_0x513ee3[_0x482b('0x720')]),_0x282acf=_0x513ee3['Text'],_0x3285ab={'textColor':ColorManager[_0x482b('0x5f6')](_0x513ee3[_0x482b('0x24e')]),'flashColor':_0x513ee3[_0x482b('0x645')],'flashDuration':_0x513ee3[_0x482b('0x87')]};for(const _0x150a4d of _0x42ba2d){if(!_0x150a4d)continue;_0x150a4d[_0x482b('0x111')](_0x282acf,_0x3285ab);}}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x782'),_0x5c6e6d=>{if(!SceneManager[_0x482b('0x23a')]())return;const _0x1080f8=$gameTemp[_0x482b('0x104')]();if(!_0x1080f8)return;_0x1080f8[_0x482b('0x46c')](_0x482b('0x10c'));}),PluginManager[_0x482b('0x4ff')](pluginData['name'],_0x482b('0x58c'),_0x228817=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x228817,_0x228817);const _0x4926dd=VisuMZ[_0x482b('0x55a')](_0x228817[_0x482b('0x720')]),_0x1842bc=_0x228817[_0x482b('0x25b')][_0x482b('0x515')]()[_0x482b('0x6b6')](),_0x382aae=_0x228817[_0x482b('0x43')];for(const _0x2c6e6b of _0x4926dd){if(!_0x2c6e6b)continue;if(_0x1842bc===_0x482b('0x2eb')){if(_0x482b('0xf')===_0x482b('0xf'))_0x2c6e6b[_0x482b('0x539')]();else{function _0x485533(){return _0x1e4f79[_0x482b('0x654')]['Window_SkillList_maxCols']['call'](this);}}}else{if(_0x482b('0x5a2')!==_0x482b('0x5a2')){function _0x15d56(){_0x324657=_0x161427[_0x482b('0x61b')](_0x1bbf65[_0x482b('0x47e')](_0x5d45b4));}}else _0x2c6e6b[_0x482b('0x370')](_0x1842bc);}if(['attack',_0x482b('0x608'),'swing',_0x482b('0x641')][_0x482b('0x24d')](_0x1842bc)){if(_0x482b('0x780')!==_0x482b('0x780')){function _0xa60e13(){this[_0x482b('0x57f')](_0x364e8b);}}else _0x2c6e6b[_0x482b('0x4d3')]();}else _0x2c6e6b['startWeaponAnimation'](0x0);}}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x614'),_0x2d5378=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x2d5378,_0x2d5378);const _0x45671e=BattleManager[_0x482b('0x19')];if(!_0x45671e)return;if(!_0x45671e[_0x482b('0x596')]())return;const _0x76ce24=VisuMZ[_0x482b('0x55a')](_0x2d5378[_0x482b('0x720')]);for(const _0x5a773a of _0x76ce24){if(!_0x5a773a)continue;_0x5a773a[_0x482b('0x141')](_0x45671e);}}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],'ActSeq_Motion_RefreshMotion',_0x30c48f=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x30c48f,_0x30c48f);const _0x42ad74=VisuMZ['CreateActionSequenceTargets'](_0x30c48f['Targets']);for(const _0x3a784b of _0x42ad74){if(_0x482b('0x358')===_0x482b('0x358')){if(!_0x3a784b)continue;_0x3a784b['requestMotionRefresh']();}else{function _0x3ebcc8(){this[_0x482b('0x36e')](_0x550687);}}}}),PluginManager[_0x482b('0x4ff')](pluginData['name'],_0x482b('0x3a6'),_0x16916a=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x16916a,_0x16916a);const _0x574ff5=$gameTemp['getLastPluginCommandInterpreter'](),_0x974749=_0x16916a[_0x482b('0x5d9')]*Sprite_Battler[_0x482b('0x5ac')];_0x574ff5[_0x482b('0x3d3')](_0x974749);}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x35a'),_0x439c2c=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x439c2c,_0x439c2c);const _0xf80b4e=$gameTemp[_0x482b('0x104')](),_0x467508=BattleManager[_0x482b('0x19')];if(!_0xf80b4e||!_0x467508)return;if(!_0x467508['item']())return;const _0x3e9f0f=VisuMZ[_0x482b('0x55a')](_0x439c2c[_0x482b('0x720')]);for(const _0x576d82 of _0x3e9f0f){if(!_0x576d82)continue;_0x576d82[_0x482b('0x314')](_0x467508);}if(_0x439c2c[_0x482b('0x403')])_0xf80b4e[_0x482b('0x46c')](_0x482b('0x424'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x3b2'),_0x12e98d=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!$gameSystem[_0x482b('0x386')]())return;VisuMZ[_0x482b('0x5a3')](_0x12e98d,_0x12e98d);const _0x30baca=VisuMZ[_0x482b('0x55a')](_0x12e98d[_0x482b('0x720')]);let _0x49418=_0x12e98d[_0x482b('0x28d')][_0x482b('0x17')](/back/i);for(const _0x3f1c6a of _0x30baca){if(!_0x3f1c6a)continue;if(_0x12e98d['Direction'][_0x482b('0x17')](/rand/i))_0x49418=Math[_0x482b('0x4cc')](0x2);_0x3f1c6a[_0x482b('0x603')](!!_0x49418);}}),PluginManager['registerCommand'](pluginData[_0x482b('0x665')],_0x482b('0x425'),_0x3c3a19=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!$gameSystem['isSideView']())return;VisuMZ['ConvertParams'](_0x3c3a19,_0x3c3a19);const _0x4edd71=VisuMZ[_0x482b('0x55a')](_0x3c3a19[_0x482b('0x720')]);let _0x4bb1af=_0x3c3a19['Point'];const _0x517648=_0x3c3a19[_0x482b('0x91')];for(const _0x4cc109 of _0x4edd71){if(!_0x4cc109)continue;let _0x2013c6=_0x4cc109[_0x482b('0x67c')]()[_0x482b('0x28e')],_0xd40a16=_0x4cc109[_0x482b('0x67c')]()[_0x482b('0x11')];if(_0x4bb1af['match'](/home/i))_0x2013c6=_0x4cc109[_0x482b('0x67c')]()['_homeX'],_0xd40a16=_0x4cc109[_0x482b('0x67c')]()[_0x482b('0x10a')];else{if(_0x4bb1af[_0x482b('0x17')](/center/i))_0x2013c6=Graphics[_0x482b('0x6b4')]/0x2,_0xd40a16=Graphics[_0x482b('0xfe')]/0x2;else{if(_0x4bb1af[_0x482b('0x17')](/point (\d+), (\d+)/i)){if(_0x482b('0x696')===_0x482b('0x4c7')){function _0xeab2cc(){return _0x1d4e96[_0x482b('0x654')]['Settings']['AutoBattle']['AutoBattleOK'];}}else _0x2013c6=Number(RegExp['$1']),_0xd40a16=Number(RegExp['$2']);}}}_0x4cc109[_0x482b('0x557')](Math[_0x482b('0x49b')](_0x2013c6),Math[_0x482b('0x49b')](_0xd40a16),!!_0x517648);}}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x2b9'),_0x72efa=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!$gameSystem[_0x482b('0x386')]())return;VisuMZ[_0x482b('0x5a3')](_0x72efa,_0x72efa);const _0xf23b7e=VisuMZ[_0x482b('0x55a')](_0x72efa[_0x482b('0x4c')]),_0x37584b=VisuMZ[_0x482b('0x55a')](_0x72efa['Targets2']),_0x2acbb4=_0x37584b[_0x482b('0x6a0')](_0x4a55d3=>_0x4a55d3&&_0x4a55d3[_0x482b('0x67c')]()?_0x4a55d3[_0x482b('0x67c')]()[_0x482b('0x28e')]:0x0)/(_0x37584b[_0x482b('0x5b8')]||0x1),_0x4fffd8=_0x37584b[_0x482b('0x6a0')](_0x254247=>_0x254247&&_0x254247[_0x482b('0x67c')]()?_0x254247['battler']()[_0x482b('0x11')]:0x0)/(_0x37584b[_0x482b('0x5b8')]||0x1),_0x17560e=_0x72efa[_0x482b('0x91')];for(const _0x1e1a7f of _0xf23b7e){if('gLTQl'!==_0x482b('0x40f')){function _0x421fd2(){_0xaa2c48['battler']()['stepForward']();}}else{if(!_0x1e1a7f)continue;_0x1e1a7f[_0x482b('0x557')](Math[_0x482b('0x49b')](_0x2acbb4),Math[_0x482b('0x49b')](_0x4fffd8),!!_0x17560e);}}}),PluginManager['registerCommand'](pluginData[_0x482b('0x665')],_0x482b('0x66b'),_0xddcda0=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0xddcda0,_0xddcda0);const _0x40f9a4=$gameTemp['getLastPluginCommandInterpreter'](),_0x3628c7=VisuMZ[_0x482b('0x55a')](_0xddcda0[_0x482b('0x720')]),_0x421b7a=_0xddcda0[_0x482b('0x471')],_0xd259a4=_0xddcda0[_0x482b('0x236')],_0x10688d=_0xddcda0[_0x482b('0x6b1')],_0x3fc12d=_0xddcda0['WaitForFloat'];if(!_0x40f9a4)return;for(const _0x200f92 of _0x3628c7){if(!_0x200f92)continue;_0x200f92[_0x482b('0x225')](_0x421b7a,_0xd259a4,_0x10688d);}if(_0x3fc12d)_0x40f9a4[_0x482b('0x46c')](_0x482b('0x306'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x6e7'),_0x4754ff=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x4754ff,_0x4754ff);const _0x2bd807=$gameTemp[_0x482b('0x104')]();if(!_0x2bd807)return;const _0x4007dd=VisuMZ[_0x482b('0x55a')](_0x4754ff[_0x482b('0x720')]);for(const _0x360168 of _0x4007dd){if(!_0x360168)continue;_0x360168[_0x482b('0x5be')]();}if(_0x4754ff[_0x482b('0x403')])_0x2bd807[_0x482b('0x46c')](_0x482b('0x424'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x671'),_0x28cbbb=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x28cbbb,_0x28cbbb);const _0x1befb6=$gameTemp[_0x482b('0x104')](),_0x2e1c96=VisuMZ[_0x482b('0x55a')](_0x28cbbb[_0x482b('0x720')]),_0x3eb973=_0x28cbbb[_0x482b('0x471')],_0x2eadd0=_0x28cbbb[_0x482b('0x236')],_0x82959e=_0x28cbbb[_0x482b('0x121')];if(!_0x1befb6)return;for(const _0x9466ae of _0x2e1c96){if(_0x482b('0x335')!==_0x482b('0x48')){if(!_0x9466ae)continue;_0x9466ae[_0x482b('0x176')](_0x3eb973,_0x2eadd0);}else{function _0x2bf726(){if(this[_0x482b('0x6de')]<=0x0)return;const _0x1ce08e=this['_floatDuration'],_0x5e4e7f=this[_0x482b('0x777')],_0x582c0a=this[_0x482b('0x636')];_0x411165[_0x482b('0x64e')]?this[_0x482b('0x24f')]=this[_0x482b('0x3c0')](this[_0x482b('0x24f')],this['_targetFloatHeight'],_0x1ce08e,_0x5e4e7f,_0x582c0a):this['_floatHeight']=(this[_0x482b('0x24f')]*(_0x1ce08e-0x1)+this[_0x482b('0x2c5')])/_0x1ce08e;this[_0x482b('0x6de')]--;if(this[_0x482b('0x6de')]<=0x0)this[_0x482b('0x429')]();}}}if(_0x82959e)_0x1befb6['setWaitMode'](_0x482b('0x664'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x1f7'),_0x2b370a=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!$gameSystem[_0x482b('0x386')]())return;VisuMZ[_0x482b('0x5a3')](_0x2b370a,_0x2b370a);const _0x3c4536=$gameTemp[_0x482b('0x104')](),_0x74c0f0=VisuMZ[_0x482b('0x55a')](_0x2b370a[_0x482b('0x720')]),_0x231833=_0x2b370a['DistanceAdjust'],_0x45e002=_0x2b370a[_0x482b('0x48b')],_0x49edcf=_0x2b370a[_0x482b('0x208')],_0x4c3c1e=_0x2b370a[_0x482b('0x236')],_0x4f490c=_0x2b370a[_0x482b('0x6b')],_0x41bed3=_0x2b370a[_0x482b('0x6b1')],_0x2e4677=_0x2b370a[_0x482b('0x25b')],_0x29879b=_0x2b370a['WaitForMovement'];if(!_0x3c4536)return;for(const _0xd890bc of _0x74c0f0){if(!_0xd890bc)continue;let _0x5cddca=_0x45e002,_0x23a0df=_0x49edcf;if(_0x231833[_0x482b('0x17')](/horz/i))_0x5cddca*=_0xd890bc[_0x482b('0x3e4')]()?-0x1:0x1;if(_0x231833[_0x482b('0x17')](/vert/i))_0x23a0df*=_0xd890bc[_0x482b('0x3e4')]()?-0x1:0x1;_0xd890bc[_0x482b('0x3ec')](_0x5cddca,_0x23a0df,_0x4c3c1e,_0x4f490c,_0x41bed3),_0xd890bc[_0x482b('0x370')](_0x2e4677);}if(_0x29879b)_0x3c4536[_0x482b('0x46c')]('battleMove');}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],'ActSeq_Movement_MoveToPoint',_0x10bba6=>{if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x482b('0x386')]())return;VisuMZ[_0x482b('0x5a3')](_0x10bba6,_0x10bba6);const _0x1f481e=$gameTemp[_0x482b('0x104')](),_0x319beb=VisuMZ[_0x482b('0x55a')](_0x10bba6[_0x482b('0x720')]),_0x3570d6=_0x10bba6[_0x482b('0x254')],_0x259bda=_0x10bba6[_0x482b('0x3e5')],_0x524ba9=_0x10bba6['OffsetX'],_0x351e29=_0x10bba6[_0x482b('0x132')],_0x28c4ea=_0x10bba6['Duration'],_0x2472fe=_0x10bba6[_0x482b('0x6b')],_0x218b75=_0x10bba6[_0x482b('0x6b1')],_0x13d922=_0x10bba6[_0x482b('0x25b')],_0x5960ab=_0x10bba6[_0x482b('0x403')];if(!_0x1f481e)return;for(const _0x27a4ac of _0x319beb){if(!_0x27a4ac)continue;let _0x1fd643=_0x27a4ac[_0x482b('0x67c')]()[_0x482b('0x28e')],_0x27aa5a=_0x27a4ac[_0x482b('0x67c')]()[_0x482b('0x11')];if(_0x3570d6[_0x482b('0x17')](/home/i)){if(_0x482b('0x1e')===_0x482b('0x1e'))_0x1fd643=_0x27a4ac['battler']()[_0x482b('0x41e')],_0x27aa5a=_0x27a4ac['battler']()[_0x482b('0x10a')];else{function _0x34dbb6(){const _0x448910=_0xf0bfce[_0x482b('0x127')]('['+_0x41be91['$1'][_0x482b('0x17')](/\d+/g)+']');for(const _0x12e86e of _0x448910){if(!_0x2dc7c3[_0x482b('0x31c')](_0x12e86e))return![];}return!![];}}}else{if(_0x3570d6[_0x482b('0x17')](/center/i)){if(_0x482b('0x6a5')!==_0x482b('0x6a5')){function _0x5262a7(){if(!_0x261fca['isSceneBattle']())return;if(!_0x595187[_0x482b('0x66a')])return;const _0x4d33a6=_0xfc4b90[_0x482b('0x104')]();if(!_0x4d33a6)return;_0x4d33a6[_0x482b('0x46c')](_0x482b('0x6c8'));}}else _0x1fd643=Graphics[_0x482b('0x6b4')]/0x2,_0x27aa5a=Graphics[_0x482b('0xfe')]/0x2;}else{if(_0x3570d6[_0x482b('0x17')](/point (\d+), (\d+)/i)){if('ymWJM'===_0x482b('0x2bb'))_0x1fd643=Number(RegExp['$1']),_0x27aa5a=Number(RegExp['$2']);else{function _0x8cc220(){_0x4af028=_0x262ae1[_0x482b('0x6d6')](_0x325330);}}}}}if(_0x259bda[_0x482b('0x17')](/horz/i))_0x1fd643+=_0x27a4ac[_0x482b('0x3e4')]()?-_0x524ba9:_0x524ba9;if(_0x259bda[_0x482b('0x17')](/vert/i))_0x27aa5a+=_0x27a4ac[_0x482b('0x3e4')]()?-_0x351e29:_0x351e29;_0x27a4ac[_0x482b('0x30a')](_0x1fd643,_0x27aa5a,_0x28c4ea,_0x2472fe,_0x218b75,-0x1),_0x27a4ac[_0x482b('0x370')](_0x13d922);}if(_0x5960ab)_0x1f481e[_0x482b('0x46c')](_0x482b('0x424'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x72'),_0x3198c4=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!$gameSystem[_0x482b('0x386')]())return;VisuMZ[_0x482b('0x5a3')](_0x3198c4,_0x3198c4);const _0xca7d23=$gameTemp[_0x482b('0x104')](),_0x9921f2=VisuMZ[_0x482b('0x55a')](_0x3198c4[_0x482b('0x4c')]),_0x479f00=VisuMZ[_0x482b('0x55a')](_0x3198c4[_0x482b('0x109')]),_0x48544d=_0x3198c4[_0x482b('0x12')];let _0x5cfcf1=_0x3198c4[_0x482b('0x6a')];const _0x38306a=_0x3198c4[_0x482b('0x3e5')],_0x45a71c=_0x3198c4[_0x482b('0x162')],_0x3e3226=_0x3198c4[_0x482b('0x132')],_0x10869d=_0x3198c4['Duration'],_0x71879a=_0x3198c4[_0x482b('0x6b')],_0x5d2d76=_0x3198c4['EasingType'],_0x4ed6de=_0x3198c4[_0x482b('0x25b')],_0x399897=_0x3198c4[_0x482b('0x403')],_0x4d645e=Math['min'](..._0x479f00[_0x482b('0x6a0')](_0x36c592=>_0x36c592[_0x482b('0x67c')]()[_0x482b('0x28e')]-_0x36c592[_0x482b('0x67c')]()[_0x482b('0x2d0')]/0x2)),_0x3a2505=Math[_0x482b('0x577')](..._0x479f00[_0x482b('0x6a0')](_0x3e2774=>_0x3e2774[_0x482b('0x67c')]()[_0x482b('0x28e')]+_0x3e2774[_0x482b('0x67c')]()[_0x482b('0x2d0')]/0x2)),_0x27c7bc=Math[_0x482b('0x680')](..._0x479f00[_0x482b('0x6a0')](_0x2cc46e=>_0x2cc46e[_0x482b('0x67c')]()[_0x482b('0x11')]-_0x2cc46e[_0x482b('0x67c')]()[_0x482b('0x2c3')])),_0x4375bd=Math['max'](..._0x479f00[_0x482b('0x6a0')](_0x283afe=>_0x283afe[_0x482b('0x67c')]()[_0x482b('0x11')])),_0x391bee=_0x479f00[_0x482b('0x439')](_0x50ade1=>_0x50ade1[_0x482b('0x3e4')]())[_0x482b('0x5b8')],_0x1fc701=_0x479f00[_0x482b('0x439')](_0x34c2d4=>_0x34c2d4[_0x482b('0x279')]())[_0x482b('0x5b8')];let _0x5a4ab0=0x0,_0x2bfb65=0x0;if(_0x48544d[_0x482b('0x17')](/front/i))_0x5a4ab0=_0x391bee>=_0x1fc701?_0x4d645e:_0x3a2505;else{if(_0x48544d[_0x482b('0x17')](/middle/i))_0x5a4ab0=(_0x4d645e+_0x3a2505)/0x2,_0x5cfcf1=-0x1;else{if(_0x48544d[_0x482b('0x17')](/back/i)){if(_0x482b('0x14d')!=='YmvVu'){function _0x185c6e(){_0x261de8[_0x482b('0x389')][_0x482b('0x567')][_0x482b('0x460')](this);}}else _0x5a4ab0=_0x391bee>=_0x1fc701?_0x3a2505:_0x4d645e;}}}if(_0x48544d[_0x482b('0x17')](/head/i))_0x2bfb65=_0x27c7bc;else{if(_0x48544d[_0x482b('0x17')](/center/i))_0x2bfb65=(_0x27c7bc+_0x4375bd)/0x2;else _0x48544d[_0x482b('0x17')](/base/i)&&(_0x2bfb65=_0x4375bd);}if(!_0xca7d23)return;for(const _0x33ff1f of _0x9921f2){if(_0x482b('0x350')!=='tYpeq'){function _0x52f7c5(){_0x30ca37[_0x482b('0x3af')](_0x23c17f);}}else{if(!_0x33ff1f)continue;let _0x4c164e=_0x5a4ab0,_0x5d0130=_0x2bfb65;if(_0x38306a['match'](/horz/i))_0x4c164e+=_0x33ff1f[_0x482b('0x3e4')]()?-_0x45a71c:_0x45a71c;if(_0x38306a[_0x482b('0x17')](/vert/i))_0x5d0130+=_0x33ff1f[_0x482b('0x3e4')]()?-_0x3e3226:_0x3e3226;_0x33ff1f[_0x482b('0x30a')](_0x4c164e,_0x5d0130,_0x10869d,_0x71879a,_0x5d2d76,_0x5cfcf1),_0x33ff1f[_0x482b('0x370')](_0x4ed6de);}}if(_0x399897)_0xca7d23[_0x482b('0x46c')](_0x482b('0x424'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x40a'),_0x2e7159=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x2e7159,_0x2e7159);const _0x189436=$gameTemp[_0x482b('0x104')](),_0x21a0e2=VisuMZ[_0x482b('0x55a')](_0x2e7159[_0x482b('0x720')]),_0x42157e=_0x2e7159[_0x482b('0x422')],_0x3cc972=_0x2e7159[_0x482b('0x236')],_0xb196cd=_0x2e7159[_0x482b('0x6b1')],_0x4affbc=_0x2e7159[_0x482b('0x65c')];if(!_0x189436)return;for(const _0x2facc6 of _0x21a0e2){if(!_0x2facc6)continue;_0x2facc6[_0x482b('0x3de')](_0x42157e,_0x3cc972,_0xb196cd);}if(_0x4affbc)_0x189436[_0x482b('0x46c')](_0x482b('0x177'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x590'),_0x4711ee=>{if(!SceneManager[_0x482b('0x23a')]())return;const _0x4d96d5=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x4d96d5)return;_0x4d96d5[_0x482b('0x46c')]('battleFloat');}),PluginManager[_0x482b('0x4ff')](pluginData['name'],_0x482b('0x22d'),_0x328acf=>{if(!SceneManager[_0x482b('0x23a')]())return;const _0x4432d4=$gameTemp[_0x482b('0x104')]();if(!_0x4432d4)return;_0x4432d4[_0x482b('0x46c')](_0x482b('0x664'));}),PluginManager['registerCommand'](pluginData[_0x482b('0x665')],_0x482b('0x304'),_0x23d19e=>{if(!SceneManager[_0x482b('0x23a')]())return;const _0x1e349f=$gameTemp[_0x482b('0x104')]();if(!_0x1e349f)return;_0x1e349f[_0x482b('0x46c')](_0x482b('0x424'));}),PluginManager[_0x482b('0x4ff')](pluginData['name'],'ActSeq_Movement_WaitForOpacity',_0x24c39e=>{if(!SceneManager[_0x482b('0x23a')]())return;const _0x5de937=$gameTemp[_0x482b('0x104')]();if(!_0x5de937)return;_0x5de937[_0x482b('0x46c')](_0x482b('0x177'));}),PluginManager[_0x482b('0x4ff')](pluginData['name'],_0x482b('0x7a'),_0xbdcd8e=>{if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0xbdcd8e,_0xbdcd8e);const _0x448064=$gameTemp[_0x482b('0x104')](),_0x38f722=_0xbdcd8e[_0x482b('0x426')],_0x549027=_0xbdcd8e[_0x482b('0x5f4')];if(!_0x448064)return;BattleManager[_0x482b('0x78b')]=_0x38f722,BattleManager[_0x482b('0x2b8')]=BattleManager[_0x482b('0x338')][BattleManager[_0x482b('0x78b')]]||null,BattleManager[_0x482b('0x2b8')]&&_0x549027[_0x482b('0x53e')]()[_0x482b('0x6b6')]()!==_0x482b('0x597')&&_0x448064[_0x482b('0x6e5')]([_0x549027]);}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],'ActSeq_Target_NextTarget',_0x556687=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x556687,_0x556687);const _0x539de1=$gameTemp[_0x482b('0x104')](),_0x36fcc3=_0x556687[_0x482b('0x5f4')];if(!_0x539de1)return;BattleManager[_0x482b('0x78b')]++,BattleManager[_0x482b('0x2b8')]=BattleManager[_0x482b('0x338')][BattleManager['_targetIndex']]||null,BattleManager[_0x482b('0x2b8')]&&_0x36fcc3[_0x482b('0x53e')]()[_0x482b('0x6b6')]()!==_0x482b('0x597')&&_0x539de1['command119']([_0x36fcc3]);}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x502'),_0x4ab2d0=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x4ab2d0,_0x4ab2d0);const _0x22fdce=$gameTemp[_0x482b('0x104')](),_0x2f85ed=_0x4ab2d0['JumpToLabel'];if(!_0x22fdce)return;BattleManager[_0x482b('0x78b')]--,BattleManager[_0x482b('0x2b8')]=BattleManager['_allTargets'][BattleManager[_0x482b('0x78b')]]||null,BattleManager[_0x482b('0x2b8')]&&_0x2f85ed[_0x482b('0x53e')]()[_0x482b('0x6b6')]()!==_0x482b('0x597')&&_0x22fdce['command119']([_0x2f85ed]);}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x385'),_0x2f138c=>{if(!SceneManager[_0x482b('0x23a')]())return;VisuMZ[_0x482b('0x5a3')](_0x2f138c,_0x2f138c);const _0xfca431=$gameTemp[_0x482b('0x104')](),_0x1fa32c=_0x2f138c[_0x482b('0xb9')],_0x5c0f64=_0x2f138c[_0x482b('0x5f4')];if(!_0xfca431)return;const _0x286ed0=BattleManager[_0x482b('0x78b')];for(;;){BattleManager[_0x482b('0x78b')]=Math['randomInt'](BattleManager['_allTargets'][_0x482b('0x5b8')]);if(!_0x1fa32c)break;if(BattleManager[_0x482b('0x78b')]!==_0x286ed0)break;if(BattleManager['_allTargets'][_0x482b('0x5b8')]<=0x1){if(_0x482b('0x733')!==_0x482b('0x733')){function _0x39396f(){_0x19c5e2['prototype'][_0x482b('0x747')][_0x482b('0x460')](this),this[_0x482b('0x539')]();}}else{BattleManager[_0x482b('0x78b')]=0x0;break;}}}BattleManager[_0x482b('0x2b8')]=BattleManager[_0x482b('0x338')][BattleManager['_targetIndex']]||null;if(BattleManager[_0x482b('0x2b8')]&&_0x5c0f64['toUpperCase']()[_0x482b('0x6b6')]()!==_0x482b('0x597')){if(_0x482b('0x2c2')!==_0x482b('0x2c2')){function _0x3057d9(){const _0x163997=_0x3c88a9(_0x279bd7['$1']);return[_0x262f36['friendsUnit']()[_0x482b('0x264')]()[_0x163997]];}}else _0xfca431['command119']([_0x5c0f64]);}}),PluginManager['registerCommand'](pluginData['name'],_0x482b('0x1fe'),_0x2d299c=>{if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x482b('0x66a')])return;VisuMZ[_0x482b('0x5a3')](_0x2d299c,_0x2d299c);const _0x548bfc=$gameTemp[_0x482b('0x104')](),_0x572fda=_0x2d299c[_0x482b('0x3ab')];if(!_0x548bfc)return;$gameScreen[_0x482b('0x5cc')](0x1,_0x2d299c[_0x482b('0x236')],_0x2d299c[_0x482b('0x6b1')]);if(_0x572fda)_0x548bfc[_0x482b('0x46c')](_0x482b('0x6c8'));}),PluginManager[_0x482b('0x4ff')](pluginData[_0x482b('0x665')],_0x482b('0x289'),_0x38b9d5=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported[_0x482b('0x66a')])return;VisuMZ[_0x482b('0x5a3')](_0x38b9d5,_0x38b9d5);const _0x246aad=$gameTemp[_0x482b('0x104')](),_0x4da8c0=_0x38b9d5[_0x482b('0x3ab')];if(!_0x246aad)return;$gameScreen[_0x482b('0x5cc')](_0x38b9d5[_0x482b('0x737')],_0x38b9d5[_0x482b('0x236')],_0x38b9d5[_0x482b('0x6b1')]);if(_0x4da8c0)_0x246aad[_0x482b('0x46c')](_0x482b('0x6c8'));}),PluginManager[_0x482b('0x4ff')](pluginData['name'],_0x482b('0x20f'),_0x1f91d7=>{if(!SceneManager[_0x482b('0x23a')]())return;if(!Imported[_0x482b('0x66a')])return;const _0x491e21=$gameTemp[_0x482b('0x104')]();if(!_0x491e21)return;_0x491e21[_0x482b('0x46c')](_0x482b('0x6c8'));}),VisuMZ[_0x482b('0x654')]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x482b('0x389')][_0x482b('0x78c')],Scene_Boot['prototype'][_0x482b('0x78c')]=function(){VisuMZ['BattleCore']['Scene_Boot_onDatabaseLoaded'][_0x482b('0x460')](this),this[_0x482b('0x359')]();},Scene_Boot[_0x482b('0x389')][_0x482b('0x359')]=function(){this[_0x482b('0x3ba')](),this[_0x482b('0x476')](),this[_0x482b('0x3e0')](),this[_0x482b('0x4cb')](),this[_0x482b('0x666')](),this[_0x482b('0x786')]();},VisuMZ['DamageStyles']={},Scene_Boot[_0x482b('0x389')][_0x482b('0x3ba')]=function(){for(const _0x3d5fec of VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x3ac')][_0x482b('0x12e')]){if(!_0x3d5fec)continue;const _0x379762=_0x3d5fec['Name'][_0x482b('0x53e')]()[_0x482b('0x6b6')]();VisuMZ['DamageStyles'][_0x379762]=_0x3d5fec;}},VisuMZ[_0x482b('0x654')][_0x482b('0x237')]={},Scene_Boot[_0x482b('0x389')][_0x482b('0x476')]=function(){const _0x4760a6=VisuMZ[_0x482b('0x654')][_0x482b('0x237')],_0x1020f1=_0x482b('0x75'),_0x382ec1=[[_0x482b('0x6dd'),_0x482b('0x4e5')],[_0x482b('0x5ae'),'POST-']],_0x9bba3c=[['%1Apply%2JS',_0x482b('0x5c')],['%1Damage%2JS',_0x482b('0x381')]],_0x5027bc=[['',''],['AsUser','AS\x20USER'],[_0x482b('0x6fb'),_0x482b('0x752')]];for(const _0x4ebbcf of _0x9bba3c){for(const _0x386218 of _0x5027bc){if('fDrFa'==='ptChe'){function _0x40df71(){if(this[_0x482b('0x114')]()){const _0x5048a6=this['_enemy'][_0x482b('0x440')]();this[_0x482b('0x615')]=new _0x2962ba(_0x5048a6[_0x482b('0x2d0')],_0x5048a6[_0x482b('0x2c3')]);}else _0x1449e['BattleCore'][_0x482b('0x344')][_0x482b('0x460')](this,_0x341de1);}}else for(const _0x378b81 of _0x382ec1){if(_0x482b('0x775')!==_0x482b('0x4fa')){const _0xf7ec13=_0x4ebbcf[0x0]['format'](_0x378b81[0x0],_0x386218[0x0]),_0x43b138=_0x4ebbcf[0x1][_0x482b('0x658')](_0x378b81[0x1],_0x386218[0x1])[_0x482b('0x6b6')](),_0x3b889a=new RegExp(_0x1020f1[_0x482b('0x658')](_0x43b138),'i');_0x4760a6[_0xf7ec13]=_0x3b889a;}else{function _0x409dd0(){const _0xea65b5=_0x39c583[_0x482b('0x4a')](_0x532e47);_0xea65b5[_0x482b('0x3c5')]=![],_0xea65b5['mpDamage']=0x0,this[_0x482b('0x72f')][_0x482b('0x260')](_0xea65b5);}}}}}const _0x1a8c1e=[[_0x482b('0x1a'),'JS\x20%1START\x20ACTION'],[_0x482b('0x3c7'),_0x482b('0x4c6')]];for(const _0x19603b of _0x1a8c1e){for(const _0x1dab21 of _0x382ec1){const _0x5aecbf=_0x19603b[0x0]['format'](_0x1dab21[0x0]),_0x53e28f=_0x19603b[0x1][_0x482b('0x658')](_0x1dab21[0x1]),_0xccba88=new RegExp(_0x1020f1[_0x482b('0x658')](_0x53e28f),'i');_0x4760a6[_0x5aecbf]=_0xccba88;}}const _0x36cc16=[[_0x482b('0x38b'),_0x482b('0x3f1')],[_0x482b('0x76a'),_0x482b('0x416')],[_0x482b('0x669'),_0x482b('0x604')],['BattleDefeatJS',_0x482b('0x4e')],[_0x482b('0xc9'),_0x482b('0x485')],[_0x482b('0x452'),_0x482b('0x586')],['%1StartTurnJS','JS\x20%1START\x20TURN'],[_0x482b('0x2d7'),_0x482b('0x342')],[_0x482b('0x2f5'),_0x482b('0x722')]];for(const _0x5c5125 of _0x36cc16){if(_0x482b('0x662')!==_0x482b('0x662')){function _0x2f74a5(){this['_baseX']=0x0,this[_0x482b('0x11')]=0x0,this[_0x482b('0x24f')]=0x0,this[_0x482b('0x2c5')]=0x0,this[_0x482b('0x6de')]=0x0,this['_floatWholeDuration']=0x0,this[_0x482b('0x636')]=_0x482b('0x76f'),this[_0x482b('0x4ef')]=0x0,this[_0x482b('0x12c')]=0x0,this[_0x482b('0x791')]=0x0,this[_0x482b('0x705')]=0x0,this['_targetOpacity']=0xff,this['_opacityDuration']=0x0,this[_0x482b('0x2cd')]=0x0,this[_0x482b('0x49e')]=_0x482b('0x76f');}}else for(const _0x5ebe23 of _0x382ec1){if(_0x482b('0x5a9')==='woKOW'){function _0x589336(){return this[_0x482b('0x72f')][_0x482b('0x734')]();}}else{const _0x43a135=_0x5c5125[0x0][_0x482b('0x658')](_0x5ebe23[0x0]),_0x81fa55=_0x5c5125[0x1][_0x482b('0x658')](_0x5ebe23[0x1]),_0x50a119=new RegExp(_0x1020f1['format'](_0x81fa55),'i');_0x4760a6[_0x43a135]=_0x50a119;}}}},Scene_Boot[_0x482b('0x389')][_0x482b('0x3e0')]=function(){const _0x2d7650=$dataSkills[_0x482b('0x61b')]($dataItems),_0x195263=[_0x482b('0x357'),_0x482b('0x24a'),_0x482b('0x6e1'),_0x482b('0x56d'),_0x482b('0x20d'),_0x482b('0x1a0'),_0x482b('0x43c'),_0x482b('0x52e')];for(const _0x55e556 of _0x2d7650){if(!_0x55e556)continue;for(const _0x7fbf06 of _0x195263){VisuMZ[_0x482b('0x654')][_0x482b('0x3a7')](_0x55e556,_0x7fbf06);}const _0x82c303=_0x55e556['note'];if(_0x82c303[_0x482b('0x17')](/<ALWAYS CRITICAL/i)){if(_0x482b('0x45e')!==_0x482b('0x535'))_0x55e556['damage'][_0x482b('0x2ef')]=!![];else{function _0x27abd2(){this[_0x482b('0x695')][_0x482b('0x260')](_0x482b('0x642'),_0x18cad3[_0x482b('0x6bc')][_0x482b('0x658')](_0x317588[_0x482b('0x665')]())),this[_0x482b('0x695')]['push'](_0x482b('0x3d3'));}}}_0x82c303[_0x482b('0x17')](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)&&(_0x55e556[_0x482b('0x16a')]=Math[_0x482b('0x577')](0x1,Number(RegExp['$1']))),_0x82c303[_0x482b('0x17')](/<TARGET:[ ](.*)>/i)&&(_0x55e556[_0x482b('0x736')]=String(RegExp['$1'])[_0x482b('0x53e')]()[_0x482b('0x6b6')]());}},Scene_Boot['prototype'][_0x482b('0x4cb')]=function(){const _0x5168bc=$dataActors[_0x482b('0x61b')]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates),_0x43fd1e=[_0x482b('0xf3'),_0x482b('0x1f4'),_0x482b('0x4a4'),'PostDamageAsUserJS',_0x482b('0x170'),_0x482b('0x74b'),_0x482b('0x6ca'),_0x482b('0x1e4'),_0x482b('0x20d'),_0x482b('0x1a0'),_0x482b('0x43c'),_0x482b('0x52e'),_0x482b('0x57d'),'PostStartBattleJS',_0x482b('0xc'),_0x482b('0x484'),_0x482b('0x669'),_0x482b('0x774'),'EscapeSuccessJS',_0x482b('0x452'),_0x482b('0x281'),'PostStartTurnJS',_0x482b('0x779'),'PostEndTurnJS','PreRegenerateJS',_0x482b('0x216')];for(const _0x8955b8 of _0x5168bc){if(!_0x8955b8)continue;for(const _0x1d8e66 of _0x43fd1e){VisuMZ[_0x482b('0x654')][_0x482b('0x3a7')](_0x8955b8,_0x1d8e66);}const _0x4efd56=_0x8955b8[_0x482b('0x4ed')];}},VisuMZ[_0x482b('0x654')]['JS']={},VisuMZ[_0x482b('0x654')][_0x482b('0x3a7')]=function(_0x122106,_0x6e7c91){const _0x37002f=_0x122106[_0x482b('0x4ed')];if(_0x37002f[_0x482b('0x17')](VisuMZ['BattleCore']['RegExp'][_0x6e7c91])){const _0x16de79=String(RegExp['$1']),_0x21e46b=_0x482b('0xf0')[_0x482b('0x658')](_0x16de79),_0x5a8900=VisuMZ['BattleCore'][_0x482b('0x6cb')](_0x122106,_0x6e7c91);VisuMZ[_0x482b('0x654')]['JS'][_0x5a8900]=new Function(_0x21e46b);}},VisuMZ[_0x482b('0x654')]['createKeyJS']=function(_0x69e7f6,_0x4328d6){let _0x53f816='';if($dataActors['includes'](_0x69e7f6))_0x53f816=_0x482b('0x4a8')['format'](_0x69e7f6['id'],_0x4328d6);if($dataClasses[_0x482b('0x24d')](_0x69e7f6))_0x53f816=_0x482b('0x6fc')[_0x482b('0x658')](_0x69e7f6['id'],_0x4328d6);if($dataSkills[_0x482b('0x24d')](_0x69e7f6))_0x53f816=_0x482b('0x247')[_0x482b('0x658')](_0x69e7f6['id'],_0x4328d6);if($dataItems['includes'](_0x69e7f6))_0x53f816=_0x482b('0x68b')['format'](_0x69e7f6['id'],_0x4328d6);if($dataWeapons[_0x482b('0x24d')](_0x69e7f6))_0x53f816=_0x482b('0x420')[_0x482b('0x658')](_0x69e7f6['id'],_0x4328d6);if($dataArmors[_0x482b('0x24d')](_0x69e7f6))_0x53f816=_0x482b('0x4d0')['format'](_0x69e7f6['id'],_0x4328d6);if($dataEnemies['includes'](_0x69e7f6))_0x53f816=_0x482b('0x120')[_0x482b('0x658')](_0x69e7f6['id'],_0x4328d6);if($dataStates[_0x482b('0x24d')](_0x69e7f6))_0x53f816=_0x482b('0x4a1')[_0x482b('0x658')](_0x69e7f6['id'],_0x4328d6);return _0x53f816;},Scene_Boot[_0x482b('0x389')]['process_VisuMZ_BattleCore_BaseTroops']=function(){const _0x5f1b68=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2c1')]['BaseTroopIDs'],_0x4ffc8e=[];for(const _0x175767 of _0x5f1b68){if('TmhxL'!=='iptED'){const _0x37180b=$dataTroops[_0x175767];if(_0x37180b)_0x4ffc8e['push'](JsonEx['makeDeepCopy'](_0x37180b));}else{function _0xb8b2cb(){_0x1c4596[_0x482b('0x7b')]()?_0x5be2a7[_0x482b('0x389')][_0x482b('0x6ed')][_0x482b('0x460')](this):_0x1fca91[_0x482b('0x654')][_0x482b('0x562')][_0x482b('0x460')](this);}}}for(const _0x36c437 of $dataTroops){if(_0x482b('0x4dc')!==_0x482b('0x2a3')){if(!_0x36c437)continue;for(const _0x39b1d2 of _0x4ffc8e){if(_0x39b1d2['id']===_0x36c437['id'])continue;_0x36c437[_0x482b('0x4bb')]=_0x36c437[_0x482b('0x4bb')]['concat'](_0x39b1d2[_0x482b('0x4bb')]);}}else{function _0x23008e(){this[_0x482b('0x28e')]=this['x'],this[_0x482b('0x11')]=this['y'],this[_0x482b('0x290')](),this[_0x482b('0x582')](),this['x']+=this[_0x482b('0x1b4')](),this['y']+=this[_0x482b('0x569')](),this['x']=_0x19756e[_0x482b('0x49b')](this['x']),this['y']=_0x5389c5[_0x482b('0x49b')](this['y']);}}}},Scene_Boot[_0x482b('0x389')][_0x482b('0x786')]=function(){const _0x55a919=$dataSkills['concat']($dataItems);for(const _0x108e50 of _0x55a919){if(_0x482b('0x2b3')!==_0x482b('0x2b3')){function _0x3ac8ff(){_0x2f9e17['BattleCore']['Sprite_Enemy_setBattler'][_0x482b('0x460')](this,_0x27cf82),this[_0x482b('0x23')](_0xa2faa9);}}else{if(!_0x108e50)continue;const _0x36cf7e=_0x108e50[_0x482b('0x4ed')];if(_0x108e50[_0x482b('0x4ed')][_0x482b('0x17')](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x42322a=String(RegExp['$1']),_0x1d3361=VisuMZ[_0x482b('0x654')][_0x482b('0x6cb')](_0x108e50,_0x482b('0x720'));VisuMZ[_0x482b('0x654')][_0x482b('0x676')](_0x42322a,_0x1d3361);}if(_0x108e50[_0x482b('0x4ed')]['match'](/<JS COMMAND VISIBLE>\s*([\s\S]*)\s*<\/JS COMMAND VISIBLE>/i)){if(_0x482b('0x166')!=='OfSYM'){const _0x18ca63=String(RegExp['$1']),_0x10b03c=VisuMZ[_0x482b('0x654')][_0x482b('0x6cb')](_0x108e50,_0x482b('0x756'));}else{function _0x217f63(){return _0x21888d['BattleCore']['Settings']['ActorCmd'][_0x482b('0x282')];}}}}}},VisuMZ[_0x482b('0x654')][_0x482b('0x676')]=function(_0x52c8f1,_0x67e9be){const _0x535f46='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20'[_0x482b('0x658')](_0x52c8f1);VisuMZ[_0x482b('0x654')]['JS'][_0x67e9be]=new Function(_0x535f46);},TextManager[_0x482b('0x789')]=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x387')][_0x482b('0x66e')],TextManager[_0x482b('0x3f9')]=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x28f')]['StartName'],TextManager[_0x482b('0x63d')]=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['AutoBattle'][_0x482b('0x37e')],TextManager[_0x482b('0x144')]=VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x59c')][_0x482b('0xd8')],ColorManager['getColor']=function(_0x4db95c){if(_0x4db95c[_0x482b('0x17')](/#(.*)/i))return _0x482b('0x250')[_0x482b('0x658')](String(RegExp['$1']));else{if(_0x482b('0x302')===_0x482b('0x302'))return this[_0x482b('0x5cb')](Number(_0x4db95c));else{function _0x34ee6a(){return _0x396cc9[_0x482b('0x5e7')]()[_0x482b('0x26a')]();}}}},DataManager[_0x482b('0x291')]=function(_0x5d864){if(_0x5d864['note'][_0x482b('0x17')](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x4aa955=String(RegExp['$1'])[_0x482b('0x53e')]()[_0x482b('0x6b6')]();if(_0x4aa955===_0x482b('0x573'))return _0x482b('0x573');if(VisuMZ[_0x482b('0x4e0')][_0x4aa955])return _0x4aa955;}const _0x6b4f8=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')][_0x482b('0x263')][_0x482b('0x53e')]()[_0x482b('0x6b6')]();if(VisuMZ['DamageStyles'][_0x6b4f8])return _0x6b4f8;return _0x482b('0x573');},DataManager[_0x482b('0x64f')]=function(_0x5d35c2){_0x5d35c2=_0x5d35c2[_0x482b('0x53e')]()[_0x482b('0x6b6')](),this[_0x482b('0x1b')]=this['_stypeIDs']||{};if(this[_0x482b('0x1b')][_0x5d35c2])return this[_0x482b('0x1b')][_0x5d35c2];for(let _0x127db7=0x1;_0x127db7<0x64;_0x127db7++){if(!$dataSystem[_0x482b('0x63')][_0x127db7])continue;let _0x25aa72=$dataSystem[_0x482b('0x63')][_0x127db7][_0x482b('0x53e')]()[_0x482b('0x6b6')]();_0x25aa72=_0x25aa72['replace'](/\x1I\[(\d+)\]/gi,''),_0x25aa72=_0x25aa72[_0x482b('0x13a')](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x25aa72]=_0x127db7;}return this['_stypeIDs'][_0x5d35c2]||0x0;},DataManager[_0x482b('0x13f')]=function(_0x8a8036){_0x8a8036=_0x8a8036[_0x482b('0x53e')]()['trim'](),this[_0x482b('0x717')]=this['_skillIDs']||{};if(this['_skillIDs'][_0x8a8036])return this['_skillIDs'][_0x8a8036];for(const _0x4d6136 of $dataSkills){if(!_0x4d6136)continue;this[_0x482b('0x717')][_0x4d6136[_0x482b('0x665')][_0x482b('0x53e')]()[_0x482b('0x6b6')]()]=_0x4d6136['id'];}return this[_0x482b('0x717')][_0x8a8036]||0x0;},DataManager[_0x482b('0x1e5')]=function(_0x3cefc5){_0x3cefc5=_0x3cefc5[_0x482b('0x53e')]()[_0x482b('0x6b6')](),this[_0x482b('0x6e')]=this[_0x482b('0x6e')]||{};if(this['_enemyIDs'][_0x3cefc5])return this[_0x482b('0x6e')][_0x3cefc5];for(const _0x1cb110 of $dataEnemies){if(!_0x1cb110)continue;this[_0x482b('0x6e')][_0x1cb110[_0x482b('0x665')][_0x482b('0x53e')]()[_0x482b('0x6b6')]()]=_0x1cb110['id'];}return this[_0x482b('0x6e')][_0x3cefc5]||0x0;},DataManager[_0x482b('0x2af')]=function(_0x575d74){_0x575d74=_0x575d74[_0x482b('0x53e')]()[_0x482b('0x6b6')](),this['_wtypeIDs']=this[_0x482b('0x1bd')]||{};if(this[_0x482b('0x1bd')][_0x575d74])return this[_0x482b('0x1bd')][_0x575d74];for(let _0x32f36f=0x1;_0x32f36f<0x64;_0x32f36f++){if(!$dataSystem[_0x482b('0x12b')][_0x32f36f])continue;let _0x33d3e3=$dataSystem[_0x482b('0x12b')][_0x32f36f][_0x482b('0x53e')]()[_0x482b('0x6b6')]();_0x33d3e3=_0x33d3e3[_0x482b('0x13a')](/\x1I\[(\d+)\]/gi,''),_0x33d3e3=_0x33d3e3[_0x482b('0x13a')](/\\I\[(\d+)\]/gi,''),this['_wtypeIDs'][_0x33d3e3]=_0x32f36f;}return this[_0x482b('0x1bd')][_0x482b('0x288')]=0x0,this[_0x482b('0x1bd')][_0x575d74]||0x0;},DataManager[_0x482b('0x593')]=function(_0x439717){const _0x141548=_0x482b('0xbb');let _0x531f52=_0x439717[_0x482b('0x692')],_0x14dd09=_0x439717[_0x482b('0x665')];const _0x503c98=_0x439717['note'];return _0x503c98[_0x482b('0x17')](/<DISPLAY ICON: (\d+)>/i)&&(_0x531f52=Number(RegExp['$1'])),_0x503c98[_0x482b('0x17')](/<DISPLAY TEXT: (.*)>/i)&&(_0x14dd09=String(RegExp['$1'])),_0x141548[_0x482b('0x658')](_0x531f52,_0x14dd09);},DataManager[_0x482b('0xaf')]=function(_0x436f38){return _0x436f38[_0x482b('0x4ed')][_0x482b('0x17')](/<COMMAND TEXT: (.*)>/i)?String(RegExp['$1']):_0x436f38[_0x482b('0x665')];},DataManager['battleCommandIcon']=function(_0x49d07b){return _0x49d07b[_0x482b('0x4ed')][_0x482b('0x17')](/<COMMAND ICON: (\d+)>/i)?Number(RegExp['$1']):_0x49d07b[_0x482b('0x692')];},DataManager[_0x482b('0x14a')]=function(_0xea96cc){const _0x29cd53=$dataEnemies[_0xea96cc];if(_0x29cd53){if(_0x482b('0x6d4')===_0x482b('0x2ab')){function _0x2dc49a(){if(!_0x3592be)return;if(!this[_0x482b('0x129')](_0x1dd159))return;const _0x11db61=this[_0x482b('0x58a')](),_0x5b495c=_0x393675[_0x482b('0xaf')](_0x4f1121),_0x2042a2=_0x2cac23[_0x482b('0x75a')](_0x4f81af),_0x3a8711=_0x11db61===_0x482b('0x570')?_0x5b495c:_0x482b('0xbb')['format'](_0x2042a2,_0x5b495c),_0x1c58db=this['_actor']['canUse'](_0x1eb01e);this[_0x482b('0x628')](_0x3a8711,_0x482b('0x64b'),_0x1c58db,_0x37e285['id']);}}else{if(_0x29cd53[_0x482b('0x4ed')][_0x482b('0x17')](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x38d90a=String(RegExp['$1'])[_0x482b('0xe0')](/[\r\n]+/)['remove'](''),_0x20093a=this[_0x482b('0x454')](_0x38d90a);_0xea96cc=this[_0x482b('0x1e5')](_0x20093a)||_0xea96cc,_0xea96cc=DataManager[_0x482b('0x14a')](_0xea96cc);}}}return _0xea96cc;},DataManager[_0x482b('0x454')]=function(_0x5d3ee6){let _0x15cdac=0x0;const _0x282894={};for(const _0x2c7783 of _0x5d3ee6){if(_0x482b('0x213')===_0x482b('0x213')){if(_0x2c7783[_0x482b('0x17')](/(.*):[ ](\d+)/i)){if(_0x482b('0x39a')===_0x482b('0x39a')){const _0x14328f=String(RegExp['$1'])[_0x482b('0x6b6')](),_0x3ace9c=Number(RegExp['$2']);_0x282894[_0x14328f]=_0x3ace9c,_0x15cdac+=_0x3ace9c;}else{function _0x5a224a(){return _0x4b1e2b['filter'](_0xff9a84=>_0xff9a84['isDead']());}}}else{if(_0x2c7783[_0x482b('0x17')](/(.*):[ ](\d+\.?\d+)/i)){const _0x53faff=String(RegExp['$1'])[_0x482b('0x6b6')](),_0x2ee71c=Number(RegExp['$2']);_0x282894[_0x53faff]=_0x2ee71c,_0x15cdac+=_0x2ee71c;}else _0x2c7783!==''&&(_0x282894[_0x2c7783]=0x1,_0x15cdac++);}}else{function _0x1c45ae(){this[_0x482b('0x252')][_0x482b('0x6b2')](this[_0x482b('0x620')]),this['_partyCommandWindow'][_0x482b('0x6b2')](this['_helpWindow']);}}}if(_0x15cdac<=0x0)return'';let _0x35074e=Math[_0x482b('0x54b')]()*_0x15cdac;for(const _0x5504f8 in _0x282894){if('afVeu'!==_0x482b('0x276')){_0x35074e-=_0x282894[_0x5504f8];if(_0x35074e<=0x0)return _0x5504f8;}else{function _0xf76b26(){return _0x875241[_0x482b('0x665')];}}}return'';},ConfigManager[_0x482b('0x6f')]=![],ConfigManager[_0x482b('0x65d')]=![],ConfigManager[_0x482b('0x144')]=!![],VisuMZ[_0x482b('0x654')][_0x482b('0x348')]=ConfigManager[_0x482b('0xf2')],ConfigManager[_0x482b('0xf2')]=function(){const _0x477927=VisuMZ[_0x482b('0x654')][_0x482b('0x348')][_0x482b('0x460')](this);return _0x477927[_0x482b('0x6f')]=this[_0x482b('0x6f')],_0x477927[_0x482b('0x65d')]=this[_0x482b('0x65d')],_0x477927[_0x482b('0x144')]=this[_0x482b('0x144')],_0x477927;},VisuMZ[_0x482b('0x654')][_0x482b('0x315')]=ConfigManager['applyData'],ConfigManager[_0x482b('0x50b')]=function(_0x183b43){VisuMZ[_0x482b('0x654')][_0x482b('0x315')][_0x482b('0x460')](this,_0x183b43);'autoBattleAtStart'in _0x183b43?this[_0x482b('0x6f')]=_0x183b43[_0x482b('0x6f')]:this[_0x482b('0x6f')]=![];_0x482b('0x65d')in _0x183b43?this[_0x482b('0x65d')]=_0x183b43[_0x482b('0x65d')]:this['autoBattleUseSkills']=![];if(_0x482b('0x144')in _0x183b43)this[_0x482b('0x144')]=_0x183b43[_0x482b('0x144')];else{if(_0x482b('0xd7')===_0x482b('0xd7'))this[_0x482b('0x144')]=!![];else{function _0x145d07(){if(this[_0x482b('0x164')]&&this[_0x482b('0x164')][_0x482b('0x2a4')]())return![];if(this[_0x482b('0x164')]&&!this[_0x482b('0x164')]['canBattlerMove']())return![];return _0x4b67cb[_0x482b('0x386')]();}}}},VisuMZ[_0x482b('0x654')][_0x482b('0x428')]=BattleManager[_0x482b('0x6c5')],BattleManager[_0x482b('0x6c5')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x428')][_0x482b('0x460')](this),this[_0x482b('0x449')]=[];},BattleManager[_0x482b('0x2')]=function(){if(BattleManager[_0x482b('0x2c8')]())return _0x482b('0x2f1');return _0x482b('0x651');},BattleManager[_0x482b('0x718')]=function(_0x3a7931){return _0x3a7931=_0x3a7931[_0x482b('0x53e')]()[_0x482b('0x6b6')](),this[_0x482b('0x2')]()===_0x3a7931;},BattleManager[_0x482b('0x3d5')]=function(){return this[_0x482b('0x718')](_0x482b('0x2f1'));},BattleManager[_0x482b('0x48e')]=function(){return this[_0x482b('0x718')]('DTB');},BattleManager[_0x482b('0x23e')]=function(){return this[_0x482b('0x48e')]();},BattleManager[_0x482b('0x196')]=function(){return!this[_0x482b('0x23e')]();},BattleManager[_0x482b('0x6bf')]=function(_0x40b044){$gameParty[_0x482b('0x6bf')](_0x40b044),$gameTroop[_0x482b('0x6bf')](_0x40b044);},VisuMZ[_0x482b('0x654')][_0x482b('0x31d')]=BattleManager[_0x482b('0x54f')],BattleManager[_0x482b('0x54f')]=function(){this['_autoBattle']=ConfigManager[_0x482b('0x6f')],this[_0x482b('0x6bf')](_0x482b('0x57d')),VisuMZ['BattleCore'][_0x482b('0x31d')]['call'](this),this[_0x482b('0x6bf')](_0x482b('0x65'));},BattleManager[_0x482b('0x674')]=function(_0x4cb88c){const _0x31fa5c=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['Mechanics'];_0x31fa5c[_0x482b('0x43d')]&&$gameTemp[_0x482b('0x66')](_0x31fa5c[_0x482b('0x43d')]);const _0x19fdf4=_0x482b('0xb7')[_0x482b('0x658')](_0x4cb88c);if(_0x31fa5c[_0x19fdf4]){if(_0x482b('0x34f')!=='AwxJA')$gameTemp['reserveCommonEvent'](_0x31fa5c[_0x19fdf4]);else{function _0x4c149f(){if(_0x3d8ec3[_0x482b('0x23a')]()&&_0x59b95a[_0x482b('0x555')]()<=0x0)return;this[_0x482b('0x6bf')](_0x482b('0x3fc')),_0x1addf4[_0x482b('0x654')][_0x482b('0x62a')]['call'](this),this[_0x482b('0x478')](),this['processBattleCoreJS'](_0x482b('0x216'));}}}},VisuMZ[_0x482b('0x654')][_0x482b('0x80')]=BattleManager[_0x482b('0x136')],BattleManager[_0x482b('0x136')]=function(){this[_0x482b('0x6bf')](_0x482b('0x669')),VisuMZ[_0x482b('0x654')][_0x482b('0x80')]['call'](this),this['processPostBattleCommonEvents'](_0x482b('0x711'));},VisuMZ[_0x482b('0x654')][_0x482b('0x1da')]=BattleManager[_0x482b('0x3c')],BattleManager['processDefeat']=function(){this[_0x482b('0x6bf')](_0x482b('0x774')),VisuMZ[_0x482b('0x654')][_0x482b('0x1da')][_0x482b('0x460')](this),this[_0x482b('0x674')](_0x482b('0x60d'));},VisuMZ[_0x482b('0x654')][_0x482b('0x3f0')]=BattleManager[_0x482b('0x33')],BattleManager[_0x482b('0x33')]=function(_0x42f4a4){this[_0x482b('0x2c9')]=![],this[_0x482b('0x6bf')](_0x482b('0xc')),VisuMZ['BattleCore'][_0x482b('0x3f0')][_0x482b('0x460')](this,_0x42f4a4),this[_0x482b('0x6bf')](_0x482b('0x484'));},VisuMZ[_0x482b('0x654')]['BattleManager_startTurn']=BattleManager[_0x482b('0x52a')],BattleManager[_0x482b('0x52a')]=function(){if(this[_0x482b('0x23e')]())this[_0x482b('0x6bf')](_0x482b('0x281'));VisuMZ[_0x482b('0x654')]['BattleManager_startTurn'][_0x482b('0x460')](this);if(this[_0x482b('0x23e')]())this[_0x482b('0x6bf')](_0x482b('0xfc'));},VisuMZ[_0x482b('0x654')][_0x482b('0x2e8')]=BattleManager[_0x482b('0x2bc')],BattleManager[_0x482b('0x2bc')]=function(){const _0x556d17=this[_0x482b('0x2b1')][_0x482b('0x3cc')]();if(_0x556d17)_0x556d17[_0x482b('0x115')](_0x482b('0x20d'));VisuMZ[_0x482b('0x654')][_0x482b('0x2e8')][_0x482b('0x460')](this);if(_0x556d17)_0x556d17[_0x482b('0x115')](_0x482b('0x1a0'));},VisuMZ[_0x482b('0x654')][_0x482b('0xda')]=BattleManager[_0x482b('0x697')],BattleManager[_0x482b('0x697')]=function(){const _0x2e8ba2=this[_0x482b('0x19')];if(_0x2e8ba2)_0x2e8ba2[_0x482b('0x115')](_0x482b('0x43c'));VisuMZ['BattleCore'][_0x482b('0xda')][_0x482b('0x460')](this);if(_0x2e8ba2)_0x2e8ba2['actionBattleCoreJS'](_0x482b('0x52e'));},BattleManager[_0x482b('0x2fb')]=function(){!this['_logWindow'][_0x482b('0x3e3')]()&&this[_0x482b('0x697')]();},BattleManager[_0x482b('0x5')]=function(){this[_0x482b('0x742')]=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2c1')]['CalcEscapeRatioJS'][_0x482b('0x460')](this);},VisuMZ[_0x482b('0x654')][_0x482b('0x409')]=BattleManager[_0x482b('0x242')],BattleManager[_0x482b('0x242')]=function(){this[_0x482b('0x6bf')]('EscapeSuccessJS'),VisuMZ[_0x482b('0x654')][_0x482b('0x409')][_0x482b('0x460')](this),this[_0x482b('0x674')](_0x482b('0x65e'));},VisuMZ[_0x482b('0x654')]['BattleManager_onEscapeFailure']=BattleManager[_0x482b('0x1eb')],BattleManager['onEscapeFailure']=function(){this[_0x482b('0x6bf')](_0x482b('0x452'));const _0x271cd5=this[_0x482b('0x742')];VisuMZ[_0x482b('0x654')]['BattleManager_onEscapeFailure']['call'](this),this[_0x482b('0x742')]=_0x271cd5+VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x2c1')][_0x482b('0x2e5')]['call'](this),this[_0x482b('0x674')](_0x482b('0x6ec'));},BattleManager[_0x482b('0x2c4')]=function(){let _0x190dec=![];if(this[_0x482b('0x633')]()){if(_0x482b('0x631')==='LGlaO'){function _0x2d008f(){if(!_0x3a70e6[_0x482b('0x23a')]())return;_0xb10b61[_0x482b('0x5a3')](_0x2db69d,_0xdfd14f);const _0x420185=_0x16e472[_0x482b('0x104')](),_0x3142e5=_0x2e7651[_0x482b('0x5f4')];if(!_0x420185)return;_0x9ab96f[_0x482b('0x78b')]++,_0x3bbfd2[_0x482b('0x2b8')]=_0x46a1a4[_0x482b('0x338')][_0x55bf81['_targetIndex']]||null,_0x12a34c[_0x482b('0x2b8')]&&_0x3142e5[_0x482b('0x53e')]()['trim']()!==_0x482b('0x597')&&_0x420185['command119']([_0x3142e5]);}}else for(const _0x33a95e of $gameTroop[_0x482b('0x316')]()){this[_0x482b('0x695')]['push'](_0x482b('0x642'),TextManager[_0x482b('0x3c6')][_0x482b('0x658')](_0x33a95e)),this[_0x482b('0x695')][_0x482b('0x260')](_0x482b('0x3d3')),_0x190dec=!![];}}if(this[_0x482b('0x510')]){if(_0x482b('0x175')!==_0x482b('0x30f'))this['_logWindow']['push'](_0x482b('0x642'),TextManager[_0x482b('0x6bc')]['format']($gameParty[_0x482b('0x665')]())),this[_0x482b('0x695')][_0x482b('0x260')](_0x482b('0x3d3'));else{function _0x46c8c3(){_0x5e224b[_0x482b('0x654')][_0x482b('0x79a')][_0x482b('0x460')](this,_0x559506,_0x5f34fe),this[_0x482b('0x1a1')]();}}}else{if(this[_0x482b('0x217')]){if(_0x482b('0x659')!==_0x482b('0x659')){function _0x20c358(){_0x2d052c[_0x482b('0x654')][_0x482b('0x125')][_0x482b('0x460')](this,_0x469197),this[_0x482b('0x279')]()&&_0x537cac===this[_0x482b('0x529')]()&&this[_0x482b('0x548')]()&&(this[_0x482b('0x444')]=![]);}}else this[_0x482b('0x695')][_0x482b('0x260')](_0x482b('0x642'),TextManager['surprise'][_0x482b('0x658')]($gameParty[_0x482b('0x665')]())),this['_logWindow'][_0x482b('0x260')]('wait');}}_0x190dec&&(this[_0x482b('0x695')][_0x482b('0x260')](_0x482b('0x3d3')),this[_0x482b('0x695')][_0x482b('0x260')]('clear')),this[_0x482b('0x2c8')]()&&this[_0x482b('0x1cd')]()&&(this[_0x482b('0x4f9')]=![]);},BattleManager[_0x482b('0x633')]=function(){if(BattleManager[_0x482b('0x2c9')])return![];return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2e')][_0x482b('0xf9')];},VisuMZ['BattleCore']['BattleManager_startInput']=BattleManager[_0x482b('0x28b')],BattleManager[_0x482b('0x28b')]=function(){VisuMZ[_0x482b('0x654')]['BattleManager_startInput'][_0x482b('0x460')](this);if(this[_0x482b('0x48e')]()&&this[_0x482b('0x1cd')]()&&!this[_0x482b('0x217')]&&$gameParty[_0x482b('0x402')]()){if('HFNmi'===_0x482b('0xec')){function _0xd3d5b1(){if(!this['_battler'][_0x482b('0x1bc')]())return;const _0x20c569=_0xf05e55[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')],_0x290be8=new _0x260ac0();_0x290be8[_0x482b('0x248')]=_0x20c569[_0x482b('0x47')],this[_0x482b('0x148')](_0x290be8),_0x290be8[_0x482b('0x1ff')](_0x1babb4,_0x236429,_0xd74559),this[_0x482b('0x6ae')](_0x290be8);}}else this[_0x482b('0x4b4')]();}},BattleManager[_0x482b('0x1cd')]=function(){return VisuMZ[_0x482b('0x654')]['Settings']['PartyCmd'][_0x482b('0x2f2')];},BattleManager[_0x482b('0x51f')]=function(_0x1e1308,_0x85f43c){this[_0x482b('0x19')][_0x482b('0x2c0')]=_0x85f43c,this[_0x482b('0x695')]['displayReflection'](_0x85f43c),this[_0x482b('0x695')][_0x482b('0x235')](_0x1e1308,this[_0x482b('0x19')]),this['_action'][_0x482b('0x43f')](_0x1e1308),this[_0x482b('0x695')][_0x482b('0x51a')](_0x1e1308,_0x1e1308);},VisuMZ['BattleCore'][_0x482b('0x7e')]=BattleManager['updatePhase'],BattleManager[_0x482b('0x6b8')]=function(_0x1797e2){if(this['_phase']===_0x482b('0x523'))this[_0x482b('0x5c5')]();else this[_0x482b('0x5b1')]===_0x482b('0x743')?this[_0x482b('0x75f')]():VisuMZ[_0x482b('0x654')][_0x482b('0x7e')]['call'](this,_0x1797e2);},BattleManager[_0x482b('0xe8')]=function(){this[_0x482b('0x338')]=this['_targets']['slice'](0x0),this[_0x482b('0x78b')]=0x0,this['_target']=this[_0x482b('0x338')][0x0]||null,this[_0x482b('0x5b1')]=_0x482b('0x523');},BattleManager[_0x482b('0x5c5')]=function(){if(!this[_0x482b('0x6c7')]()&&!this[_0x482b('0x695')]['isBusy']()){if(_0x482b('0xb')===_0x482b('0x5b9')){function _0x1ea2a0(){this[_0x482b('0x1d5')]['y']=this[_0x482b('0x620')]['y']+this[_0x482b('0x620')][_0x482b('0x2c3')],this[_0x482b('0x3d2')]()?this['_cancelButton']['x']=-this['_cancelButton'][_0x482b('0x2d0')]-0x4:this['_cancelButton']['x']=_0x17b6fc[_0x482b('0x2d0')]-(_0x44c8a2[_0x482b('0x2d0')]-_0x1b16da[_0x482b('0x6b4')])/0x2-this[_0x482b('0x1d5')][_0x482b('0x2d0')]-0x4;}}else this[_0x482b('0x5b1')]=_0x482b('0x4bc');}},BattleManager[_0x482b('0x743')]=function(_0x5c3941){this[_0x482b('0x5d')]['remove'](_0x5c3941);const _0x1b0b48=JsonEx['makeDeepCopy'](_0x5c3941[_0x482b('0x3cc')]());this[_0x482b('0x449')][_0x482b('0x260')]([_0x5c3941,_0x1b0b48]);},BattleManager[_0x482b('0x507')]=function(){},BattleManager['updateStart']=function(){if(this[_0x482b('0x2c8')]()){if(_0x482b('0x2e9')!==_0x482b('0x2e9')){function _0x4f8333(){const _0x321c16=_0x5b5873[_0x482b('0x4cc')](0x2)===0x0?this[_0x482b('0x6e9')]():this[_0x482b('0x5e7')]();_0x3289f3[_0x482b('0x260')](_0x321c16[_0x482b('0x292')]());}}else this['_phase']=_0x482b('0x41');}else this[_0x482b('0x449')][_0x482b('0x5b8')]>0x0?this[_0x482b('0x5b1')]=_0x482b('0x41'):this[_0x482b('0x28b')]();},BattleManager['getNextSubject']=function(){for(;;){const _0x37f02e=this[_0x482b('0x66f')]();if(!_0x37f02e)return null;if(_0x37f02e[_0x482b('0x59f')]()&&_0x37f02e[_0x482b('0x548')]())return _0x37f02e;}},BattleManager[_0x482b('0x66f')]=function(){if(this['_forcedBattlers'][_0x482b('0x5b8')]>0x0){if(_0x482b('0x124')===_0x482b('0x477')){function _0x23bb2b(){if(!this[_0x482b('0x42d')])return;const _0x48a769=this[_0x482b('0x42d')][_0x482b('0x78')]();for(const _0x375ad2 of _0x48a769){this['makeBattleCommand'](_0x375ad2['toUpperCase']()['trim']());}}}else{const _0x41787c=this[_0x482b('0x449')][_0x482b('0x1b2')](),_0x97698a=_0x41787c[0x0];return _0x97698a['_actions']=_0x97698a[_0x482b('0x249')]||[],_0x97698a[_0x482b('0x249')][0x0]=_0x41787c[0x1],_0x97698a;}}else{if('xKcqO'===_0x482b('0x3d9')){function _0x1a7b60(){this['processBattleCoreJS'](_0x482b('0x779')),_0x34819a[_0x482b('0x654')][_0x482b('0x69f')][_0x482b('0x460')](this),this['processBattleCoreJS'](_0x482b('0x62f'));}}else return this[_0x482b('0x5d')][_0x482b('0x1b2')]();}},Game_Interpreter[_0x482b('0x389')]['command339']=function(_0x55640e){return this[_0x482b('0x1c9')](_0x55640e[0x0],_0x55640e[0x1],_0x35b0fc=>{if(!_0x35b0fc[_0x482b('0x410')]()){if(_0x482b('0x52b')!==_0x482b('0x52b')){function _0x2ffc61(){this[_0x482b('0x6fe')]()?(this[_0x482b('0x6ee')]=!![],this[_0x482b('0x695')][_0x482b('0x260')](_0x482b('0x642'),_0x1b1087[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x387')]['ActiveTpbOptionsMessage'])):this[_0x482b('0xed')]();}}else _0x35b0fc[_0x482b('0x743')](_0x55640e[0x2],_0x55640e[0x3]),BattleManager[_0x482b('0x743')](_0x35b0fc);}}),!![];},SceneManager[_0x482b('0x23a')]=function(){return this[_0x482b('0x455')]&&this[_0x482b('0x455')][_0x482b('0x31a')]===Scene_Battle;},SceneManager[_0x482b('0x77')]=function(){return Spriteset_Battle[_0x482b('0x389')][_0x482b('0x54a')]();},SceneManager[_0x482b('0x14b')]=function(){if(SceneManager['isPreviousScene'](Scene_Options))return!![];return![];},SceneManager['isNextSceneBattleTransitionable']=function(){if(SceneManager[_0x482b('0x408')](Scene_Options))return!![];return![];},VisuMZ[_0x482b('0x654')][_0x482b('0x1c6')]=Game_Temp[_0x482b('0x389')]['requestAnimation'],Game_Temp['prototype'][_0x482b('0x610')]=function(_0x5b04b4,_0x20c10c,_0x4f1e7e){_0x5b04b4=_0x5b04b4[_0x482b('0x439')]((_0x396161,_0x23f30e,_0x30e034)=>_0x30e034['indexOf'](_0x396161)===_0x23f30e),SceneManager[_0x482b('0x23a')]()&&SceneManager[_0x482b('0x77')]()&&(_0x4f1e7e=!_0x4f1e7e),VisuMZ[_0x482b('0x654')]['Game_Temp_requestAnimation'][_0x482b('0x460')](this,_0x5b04b4,_0x20c10c,_0x4f1e7e),SceneManager[_0x482b('0x23a')]()&&BattleManager[_0x482b('0x5f')][_0x482b('0x228')]();},Game_Temp[_0x482b('0x389')]['setLastPluginCommandInterpreter']=function(_0x5f18bc){this[_0x482b('0xf1')]=_0x5f18bc;},Game_Temp[_0x482b('0x389')][_0x482b('0x104')]=function(){return this[_0x482b('0xf1')];},VisuMZ[_0x482b('0x654')][_0x482b('0x574')]=Game_System[_0x482b('0x389')][_0x482b('0x2e6')],Game_System[_0x482b('0x389')]['initialize']=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x574')][_0x482b('0x460')](this),this[_0x482b('0x4b8')]();},Game_System[_0x482b('0x389')][_0x482b('0x4b8')]=function(){this[_0x482b('0x4ba')]=this[_0x482b('0x4ba')]||[];},Game_System[_0x482b('0x389')][_0x482b('0x73c')]=function(){if(this[_0x482b('0x4ba')]===undefined)this[_0x482b('0x81')]();return this['_defeatedEnemies'];},Game_System['prototype'][_0x482b('0x27e')]=function(_0xd6477b){if(this[_0x482b('0x4ba')]===undefined)this[_0x482b('0x81')]();if(!_0xd6477b)return;if(this[_0x482b('0x4ba')][_0x482b('0x24d')](_0xd6477b))return;this[_0x482b('0x4ba')][_0x482b('0x260')](_0xd6477b),this[_0x482b('0x4ba')][_0x482b('0x2ce')]((_0x1827f8,_0x20a678)=>_0x1827f8-_0x20a678);},VisuMZ[_0x482b('0x654')][_0x482b('0x94')]=Game_BattlerBase[_0x482b('0x389')][_0x482b('0x2d4')],Game_BattlerBase['prototype'][_0x482b('0x2d4')]=function(_0x29229e){const _0x4faff7=this['isAlive']();VisuMZ[_0x482b('0x654')]['Game_BattlerBase_addNewState'][_0x482b('0x460')](this,_0x29229e),this[_0x482b('0x279')]()&&_0x4faff7&&this[_0x482b('0x2a4')]()&&(this[_0x482b('0x444')]=!this[_0x482b('0xac')](),$gameSystem[_0x482b('0x27e')](this[_0x482b('0x748')]()));},Game_Enemy['prototype'][_0x482b('0xac')]=function(){return $gameSystem[_0x482b('0x73c')]()[_0x482b('0x24d')](this[_0x482b('0x96')]);},VisuMZ[_0x482b('0x654')][_0x482b('0x125')]=Game_BattlerBase['prototype'][_0x482b('0xbc')],Game_BattlerBase[_0x482b('0x389')][_0x482b('0xbc')]=function(_0x18058c){VisuMZ[_0x482b('0x654')][_0x482b('0x125')][_0x482b('0x460')](this,_0x18058c),this[_0x482b('0x279')]()&&_0x18058c===this[_0x482b('0x529')]()&&this[_0x482b('0x548')]()&&(this[_0x482b('0x444')]=![]);},VisuMZ[_0x482b('0x654')][_0x482b('0x418')]=Game_Action['prototype'][_0x482b('0x2f6')],Game_Action[_0x482b('0x389')][_0x482b('0x2f6')]=function(){VisuMZ[_0x482b('0x654')]['Game_Action_clear'][_0x482b('0x460')](this),this['_armorPenetration']={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0x482b('0x1e0')]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0};},Game_Action['prototype'][_0x482b('0x2db')]=function(_0x293f70,_0x2eeb5e){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')]['OverallFormulaJS'][_0x482b('0x460')](this,_0x293f70,_0x2eeb5e);},Game_Action[_0x482b('0x389')][_0x482b('0x644')]=function(_0x30a15c,_0x4b3134){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['Damage']['VarianceFormulaJS'][_0x482b('0x460')](this,_0x30a15c,_0x4b3134);},Game_Action[_0x482b('0x389')][_0x482b('0x326')]=function(_0x2b9dfa,_0x3b5839){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')][_0x482b('0x6a1')]['call'](this,_0x2b9dfa,_0x3b5839);},VisuMZ[_0x482b('0x654')]['Game_Action_itemHit']=Game_Action[_0x482b('0x389')]['itemHit'],Game_Action[_0x482b('0x389')]['itemHit']=function(_0x52cedd){const _0x4110af=this[_0x482b('0x596')]()[_0x482b('0x4ed')];if(_0x4110af[_0x482b('0x17')](/<ALWAYS HIT>/i)){if(_0x482b('0x21d')==='FkLRN'){function _0x4767f8(){return 0x1;}}else return 0x1;}else{if(_0x4110af[_0x482b('0x17')](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if(_0x482b('0x2bd')!=='aGEKK')return Number(RegExp['$1'])/0x64;else{function _0x22416f(){this[_0x482b('0x370')](_0x482b('0x191'));}}}else{let _0x1a75ab=VisuMZ[_0x482b('0x654')]['Game_Action_itemHit'][_0x482b('0x460')](this,_0x52cedd);return _0x1a75ab=this[_0x482b('0x1e0')][_0x482b('0x423')]*_0x1a75ab+this[_0x482b('0x1e0')][_0x482b('0x35c')],_0x1a75ab;}}},Game_Action['prototype']['itemCri']=function(_0x324bed){if(!this[_0x482b('0x596')]()[_0x482b('0x784')]['critical'])return 0x0;let _0x5ee410=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')][_0x482b('0x232')]['call'](this,_0x324bed);return _0x5ee410=this[_0x482b('0x1e0')][_0x482b('0x5b2')]*_0x5ee410+this['_multipliers'][_0x482b('0x4be')],_0x5ee410;},Game_Action[_0x482b('0x389')]['applyCritical']=function(_0x4f8da9){return _0x4f8da9=VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x3ac')][_0x482b('0x6e8')]['call'](this,_0x4f8da9),_0x4f8da9=this[_0x482b('0x1e0')][_0x482b('0xcc')]*_0x4f8da9+this['_multipliers'][_0x482b('0x58e')],_0x4f8da9;},VisuMZ[_0x482b('0x654')][_0x482b('0x64a')]=Game_Action[_0x482b('0x389')][_0x482b('0x77f')],Game_Action['prototype']['evalDamageFormula']=function(_0x51920d){const _0x11e7ad=DataManager[_0x482b('0x291')](this[_0x482b('0x596')]());if(_0x11e7ad===_0x482b('0x573')){if(_0x482b('0x59b')!=='xHqdj')return VisuMZ[_0x482b('0x654')][_0x482b('0x64a')][_0x482b('0x460')](this,_0x51920d);else{function _0x398b35(){this[_0x482b('0x53c')](_0x482b('0x578'));}}}else{if(_0x482b('0x379')===_0x482b('0x708')){function _0x48d1a1(){this[_0x482b('0x53c')](_0x482b('0x3c3'));}}else return this[_0x482b('0x68e')](_0x51920d);}},Game_Action[_0x482b('0x389')][_0x482b('0x2e3')]=function(){if(this[_0x482b('0x596')]()[_0x482b('0x4ed')]['match'](/<DAMAGE STYLE:[ ](.*)>/i)){if('zaEif'!==_0x482b('0x212')){const _0x1fbb87=String(RegExp['$1'])[_0x482b('0x53e')]()[_0x482b('0x6b6')]();return _0x1fbb87;}else{function _0x421b4f(){const _0x56d5df=_0x4c656b[_0x482b('0x2d9')](_0x30d39b['toUpperCase']()[_0x482b('0x6b6')]());_0x56d5df>=0x0&&_0x56d5df<=0x7&&_0x4791bc[_0x482b('0x6f2')](_0x56d5df)&&_0x283491['removeBuff'](_0x56d5df);}}}return _0x482b('0x573');},Game_Action['prototype']['evalDamageFormulaBattleCore']=function(_0x22de44){const _0x402def=DataManager[_0x482b('0x291')](this[_0x482b('0x596')]()),_0x826861=VisuMZ[_0x482b('0x4e0')][_0x402def];try{return _0x826861['Formula'][_0x482b('0x460')](this,_0x22de44);}catch(_0x2c38c6){if($gameTemp[_0x482b('0x102')]())console[_0x482b('0x686')](_0x2c38c6);return VisuMZ[_0x482b('0x654')][_0x482b('0x64a')][_0x482b('0x460')](this);}},Game_Action[_0x482b('0x389')][_0x482b('0x2f3')]=function(_0x369648,_0x2ac241){if(this['isCertainHit']())return _0x2ac241;const _0x3654d0=this[_0x482b('0x5fe')](),_0x3693bb=_0x369648;let _0x240cb0=[],_0x3347bf=[];_0x240cb0['push'](this[_0x482b('0x4e8')][_0x482b('0x375')],this[_0x482b('0x4e8')][_0x482b('0x53f')]),_0x3347bf[_0x482b('0x260')](this[_0x482b('0x4e8')]['arPenRate'],this['_armorPenetration'][_0x482b('0x3cb')]);const _0x4b125b=this[_0x482b('0x2d5')]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x46ebb2=this[_0x482b('0x2d5')]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x48e15a=this[_0x482b('0x2d5')]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x4a1bb0=this[_0x482b('0x2d5')]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;_0x240cb0=_0x240cb0[_0x482b('0x61b')](_0x3693bb['traitObjects']()['map'](_0x5cf188=>_0x5cf188&&_0x5cf188[_0x482b('0x4ed')][_0x482b('0x17')](_0x4b125b)?Number(RegExp['$1']):0x0)),_0x3347bf=_0x3347bf[_0x482b('0x61b')](_0x3693bb['traitObjects']()[_0x482b('0x6a0')](_0x4afaa5=>_0x4afaa5&&_0x4afaa5[_0x482b('0x4ed')][_0x482b('0x17')](_0x46ebb2)?Number(RegExp['$1'])/0x64:0x0)),_0x240cb0=_0x240cb0[_0x482b('0x61b')](_0x3654d0[_0x482b('0x512')]()[_0x482b('0x6a0')](_0x45a388=>_0x45a388&&_0x45a388[_0x482b('0x4ed')][_0x482b('0x17')](_0x48e15a)?Number(RegExp['$1']):0x0)),_0x3347bf=_0x3347bf[_0x482b('0x61b')](_0x3654d0[_0x482b('0x512')]()['map'](_0x3eb27c=>_0x3eb27c&&_0x3eb27c['note'][_0x482b('0x17')](_0x4a1bb0)?Number(RegExp['$1'])/0x64:0x0));this['item']()[_0x482b('0x4ed')]['match'](_0x48e15a)&&_0x240cb0[_0x482b('0x260')](Number(RegExp['$1']));this[_0x482b('0x596')]()['note']['match'](_0x4a1bb0)&&_0x3347bf['push'](Number(RegExp['$1']));_0x2ac241=_0x240cb0[_0x482b('0x4a5')]((_0x278ce8,_0x3dbba6)=>_0x278ce8-_0x3dbba6,_0x2ac241);if(_0x2ac241>0x0){if('vuqwG'!==_0x482b('0x14e')){function _0x5eaa3a(){_0x4dc99a[_0x482b('0x389')][_0x482b('0x12f')][_0x482b('0x460')](this),this[_0x482b('0x17a')]();}}else _0x2ac241=_0x3347bf[_0x482b('0x4a5')]((_0x37b3a1,_0x5cde28)=>_0x37b3a1*(0x1-_0x5cde28),_0x2ac241);}return _0x2ac241;},VisuMZ['BattleCore']['Game_Action_executeDamage']=Game_Action['prototype'][_0x482b('0x5af')],Game_Action[_0x482b('0x389')][_0x482b('0x5af')]=function(_0x411033,_0x465032){_0x465032=_0x465032*this[_0x482b('0x1e0')][_0x482b('0x46f')],_0x465032+=this[_0x482b('0x1e0')][_0x482b('0x57c')]*(_0x465032>=0x0?0x1:-0x1),_0x465032=this[_0x482b('0x466')]('PreDamage%1JS',_0x411033,_0x465032,![]),_0x465032=this[_0x482b('0x388')](_0x465032),_0x465032=Math['round'](_0x465032),this[_0x482b('0x38c')]=_0x465032,this[_0x482b('0x2a8')]=this[_0x482b('0x2a8')]||0x0,this[_0x482b('0x2a8')]+=_0x465032,VisuMZ[_0x482b('0x654')]['Game_Action_executeDamage'][_0x482b('0x460')](this,_0x411033,_0x465032),this[_0x482b('0x466')](_0x482b('0x1bf'),_0x411033,_0x465032,!![]);},Game_Action[_0x482b('0x389')]['applyDamageCaps']=function(_0x3b286c){if(this[_0x482b('0x431')]())return _0x3b286c;return _0x3b286c=this[_0x482b('0x245')](_0x3b286c),_0x3b286c=this[_0x482b('0x28c')](_0x3b286c),_0x3b286c;},Game_Action[_0x482b('0x389')][_0x482b('0x431')]=function(){const _0x15cc5b=/<BYPASS DAMAGE CAP>/i;if(this[_0x482b('0x596')]()['note'][_0x482b('0x17')](_0x15cc5b))return!![];if(this[_0x482b('0x5fe')]()['traitObjects']()[_0x482b('0x331')](_0x239d5b=>_0x239d5b&&_0x239d5b[_0x482b('0x4ed')][_0x482b('0x17')](_0x15cc5b)))return!![];return!VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x3ac')]['EnableDamageCap'];},Game_Action[_0x482b('0x389')][_0x482b('0x245')]=function(_0x18c4f9){if(!VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')][_0x482b('0x5bb')])return _0x18c4f9;const _0x4709c3=/<BYPASS SOFT DAMAGE CAP>/i;if(this[_0x482b('0x596')]()[_0x482b('0x4ed')][_0x482b('0x17')](_0x4709c3))return!![];if(this[_0x482b('0x5fe')]()[_0x482b('0x512')]()[_0x482b('0x331')](_0x29567a=>_0x29567a&&_0x29567a[_0x482b('0x4ed')]['match'](_0x4709c3)))return!![];const _0xd5d3f2=_0x18c4f9<0x0?-0x1:0x1;_0x18c4f9=Math[_0x482b('0x5b0')](_0x18c4f9);let _0x55fdbb=this['subject']()[_0x482b('0x372')]();this[_0x482b('0x596')]()['note'][_0x482b('0x17')](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0x55fdbb+=Number(RegExp['$1'])/0x64);_0x55fdbb=_0x55fdbb[_0x482b('0x15a')](0.01,0x1);const _0x42f3b0=this[_0x482b('0x377')](),_0x1bb43f=_0x55fdbb*_0x42f3b0;if(_0x18c4f9>_0x1bb43f&&_0x42f3b0>_0x1bb43f){if(_0x482b('0x67d')!==_0x482b('0x67d')){function _0x1c7758(){if(!_0x22ee7b[_0x482b('0x23a')]())return;const _0x5d3b0a=_0x64eb0f[_0x482b('0x104')](),_0x37d332=_0x31c89d[_0x482b('0x19')],_0x4a1951=_0x297b23[_0x482b('0x2b1')],_0x3c71b8=_0x42a015[_0x482b('0x695')];if(!_0x5d3b0a||!_0x37d332||!_0x4a1951)return;if(!_0x37d332[_0x482b('0x596')]())return;_0x3c71b8[_0x482b('0x55')](_0x4a1951,_0x37d332[_0x482b('0x596')]()),_0x5d3b0a['setWaitMode'](_0x482b('0x1bb'));}}else{_0x18c4f9-=_0x1bb43f;const _0x19195b=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')][_0x482b('0x3b1')],_0x1f359c=Math[_0x482b('0x577')](0x1-_0x18c4f9/((_0x42f3b0-_0x1bb43f)*_0x19195b+_0x18c4f9),0.01);_0x18c4f9*=_0x1f359c,_0x18c4f9+=_0x1bb43f;}}return _0x18c4f9*_0xd5d3f2;},Game_Action['prototype'][_0x482b('0x377')]=function(){return this[_0x482b('0x596')]()['note'][_0x482b('0x17')](/<DAMAGE CAP:[ ](\d+)>/i)?Number(RegExp['$1']):this['subject']()[_0x482b('0x6d3')]();},Game_Action['prototype'][_0x482b('0x28c')]=function(_0x59d9f3){let _0x34bc86=this[_0x482b('0x377')]();return _0x59d9f3[_0x482b('0x15a')](-_0x34bc86,_0x34bc86);},VisuMZ[_0x482b('0x654')][_0x482b('0x4a6')]=Game_Action[_0x482b('0x389')][_0x482b('0x43f')],Game_Action[_0x482b('0x389')][_0x482b('0x43f')]=function(_0x235967){this[_0x482b('0x466')](_0x482b('0x5b5'),_0x235967,0x0,!![]),VisuMZ[_0x482b('0x654')][_0x482b('0x4a6')][_0x482b('0x460')](this,_0x235967),this['applyBattleCoreJS'](_0x482b('0x1f3'),_0x235967,this[_0x482b('0x38c')]||0x0,!![]);},Game_Action[_0x482b('0x389')][_0x482b('0x466')]=function(_0x37663c,_0x5c295d,_0x56e901,_0x308767){_0x56e901=_0x56e901||0x0;const _0x125992=_0x56e901,_0x3d00ed=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2c1')],_0x12bf6e=_0x37663c['format']('');if(_0x3d00ed[_0x12bf6e]){_0x56e901=_0x3d00ed[_0x12bf6e][_0x482b('0x460')](this,_0x56e901,_0x5c295d);if(_0x308767)_0x56e901=_0x125992;}let _0xdc189f=VisuMZ['BattleCore'][_0x482b('0x6cb')](this[_0x482b('0x596')](),_0x37663c['format'](''));if(VisuMZ['BattleCore']['JS'][_0xdc189f]){_0x56e901=VisuMZ[_0x482b('0x654')]['JS'][_0xdc189f][_0x482b('0x460')](this,this[_0x482b('0x5fe')](),_0x5c295d,this[_0x482b('0x596')](),_0x56e901);if(_0x308767)_0x56e901=_0x125992;}for(const _0x143db2 of this[_0x482b('0x5fe')]()[_0x482b('0x512')]()){if('SSODM'===_0x482b('0xc5')){function _0x4308fe(){if(_0x23a25f['value'](_0x380bd3))return!![];}}else{if(!_0x143db2)continue;_0xdc189f=VisuMZ[_0x482b('0x654')][_0x482b('0x6cb')](_0x143db2,_0x37663c[_0x482b('0x658')](_0x482b('0x27a')));if(VisuMZ[_0x482b('0x654')]['JS'][_0xdc189f]){if(_0x482b('0x1ae')!==_0x482b('0x1ae')){function _0x1e334f(){this[_0x482b('0x354')](),this['updateStyleOpacity']();}}else{_0x56e901=VisuMZ[_0x482b('0x654')]['JS'][_0xdc189f][_0x482b('0x460')](this,this[_0x482b('0x5fe')](),_0x5c295d,_0x143db2,_0x56e901);if(_0x308767)_0x56e901=_0x125992;}}}}for(const _0x2dc06c of _0x5c295d[_0x482b('0x512')]()){if(!_0x2dc06c)continue;_0xdc189f=VisuMZ[_0x482b('0x654')][_0x482b('0x6cb')](_0x2dc06c,_0x37663c['format'](_0x482b('0x6fb')));if(VisuMZ[_0x482b('0x654')]['JS'][_0xdc189f]){_0x56e901=VisuMZ[_0x482b('0x654')]['JS'][_0xdc189f][_0x482b('0x460')](this,this['subject'](),_0x5c295d,_0x2dc06c,_0x56e901);if(_0x308767)_0x56e901=_0x125992;}}return _0x56e901;},Game_Action[_0x482b('0x389')][_0x482b('0x115')]=function(_0x5243af){const _0x3956e8=this[_0x482b('0x2a8')]||0x0,_0x15c80a=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2c1')],_0x25b496=_0x5243af[_0x482b('0x658')]('');if(_0x15c80a[_0x25b496]){if(_0x482b('0x1e6')===_0x482b('0x1e6'))_0x15c80a[_0x25b496]['call'](this,_0x3956e8);else{function _0x416d0c(){_0x1bdd34=_0xefb230[_0x482b('0x654')]['JS'][_0x54f7ab][_0x482b('0x460')](this,this['subject'](),_0x1419d7,this[_0x482b('0x596')](),_0x1a42f9);if(_0x44505c)_0x2b79a2=_0x1c2739;}}}let _0xa02a7e=VisuMZ['BattleCore'][_0x482b('0x6cb')](this[_0x482b('0x596')](),_0x5243af);VisuMZ['BattleCore']['JS'][_0xa02a7e]&&VisuMZ[_0x482b('0x654')]['JS'][_0xa02a7e]['call'](this,this[_0x482b('0x5fe')](),this['subject'](),this['item'](),_0x3956e8);for(const _0x2f3a32 of this[_0x482b('0x5fe')]()[_0x482b('0x512')]()){if(!_0x2f3a32)continue;_0xa02a7e=VisuMZ[_0x482b('0x654')]['createKeyJS'](_0x2f3a32,_0x5243af),VisuMZ['BattleCore']['JS'][_0xa02a7e]&&VisuMZ[_0x482b('0x654')]['JS'][_0xa02a7e][_0x482b('0x460')](this,this[_0x482b('0x5fe')](),this[_0x482b('0x5fe')](),_0x2f3a32,_0x3956e8);}},Game_Action[_0x482b('0x389')][_0x482b('0x52c')]=function(){return VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x2c1')][_0x482b('0xdd')]['call'](this);},Game_Action[_0x482b('0x389')][_0x482b('0x71d')]=function(){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2c1')][_0x482b('0x15')];},Game_Action[_0x482b('0x389')][_0x482b('0x303')]=function(){return this[_0x482b('0x596')]()[_0x482b('0x4ed')][_0x482b('0x17')](/<JS TARGETS>/i);},Game_Action[_0x482b('0x389')][_0x482b('0x519')]=function(){if(!this['_forcing']&&this['subject']()['isConfused']())return![];if(this[_0x482b('0x303')]())return!![];return typeof this['item']()['scope']==='string';},VisuMZ[_0x482b('0x654')][_0x482b('0x6aa')]=Game_Action[_0x482b('0x389')][_0x482b('0x294')],Game_Action['prototype'][_0x482b('0x294')]=function(){if(this[_0x482b('0x519')]()&&!this[_0x482b('0x303')]()){if(_0x482b('0x751')===_0x482b('0xc1')){function _0x7fd5ea(){if(!_0xec9dfc[_0x482b('0x386')]())return;_0x4a293b['BattleCore'][_0x482b('0x2a9')]['call'](this,_0x1b2d4e);}}else return this[_0x482b('0x5e2')]();}else{if(_0x482b('0x25a')!==_0x482b('0x5c1'))return VisuMZ[_0x482b('0x654')][_0x482b('0x6aa')][_0x482b('0x460')](this);else{function _0x110f2f(){_0x22ccb7[_0x482b('0x654')][_0x482b('0x4b2')][_0x482b('0x460')](this),this['y']=_0x25598e[_0x482b('0x2c3')]*0xa;}}}},Game_Action[_0x482b('0x389')][_0x482b('0x5e2')]=function(){const _0x22beaa=this['item']()[_0x482b('0x736')];return _0x22beaa[_0x482b('0x17')](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ[_0x482b('0x654')][_0x482b('0x5b')]=Game_Action[_0x482b('0x389')][_0x482b('0x398')],Game_Action[_0x482b('0x389')][_0x482b('0x398')]=function(){return this['isBattleCoreTargetScope']()&&!this[_0x482b('0x303')]()?this[_0x482b('0x660')]():VisuMZ[_0x482b('0x654')][_0x482b('0x5b')][_0x482b('0x460')](this);},Game_Action['prototype'][_0x482b('0x660')]=function(){const _0x10d26a=this[_0x482b('0x596')]()[_0x482b('0x736')];return _0x10d26a['match'](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ[_0x482b('0x654')][_0x482b('0x38f')]=Game_Action[_0x482b('0x389')][_0x482b('0xaa')],Game_Action[_0x482b('0x389')][_0x482b('0xaa')]=function(){if(this[_0x482b('0x519')]()&&!this[_0x482b('0x303')]())return this[_0x482b('0x227')]();else{if(_0x482b('0x4e7')!==_0x482b('0x4e7')){function _0x1e2e11(){_0x2afd9f[_0x482b('0x389')]['resetFontSettings']['call'](this),this[_0x482b('0xa4')]['fontSize']=_0x46e966[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2e')]['NameFontSize'];}}else return VisuMZ[_0x482b('0x654')][_0x482b('0x38f')][_0x482b('0x460')](this);}},Game_Action[_0x482b('0x389')][_0x482b('0x227')]=function(){const _0x4436c6=this[_0x482b('0x596')]()[_0x482b('0x736')];return _0x4436c6[_0x482b('0x17')](/(?:RAND|RANDOM)/i);},VisuMZ[_0x482b('0x654')]['Game_Action_needsSelection']=Game_Action[_0x482b('0x389')][_0x482b('0x210')],Game_Action['prototype']['needsSelection']=function(){if(this[_0x482b('0x519')]()&&!this['isCustomBattleScope']())return this[_0x482b('0x434')]();else{if(_0x482b('0x479')!==_0x482b('0x479')){function _0xd8d4df(){const _0x289f03=_0x1682a3(_0x3e05b5['$1'])[_0x482b('0x53e')]()[_0x482b('0x6b6')]();if(_0x289f03===_0x482b('0x573'))return'MANUAL';if(_0x30ff57['DamageStyles'][_0x289f03])return _0x289f03;}}else return VisuMZ['BattleCore'][_0x482b('0x40b')][_0x482b('0x460')](this);}},Game_Action[_0x482b('0x389')]['needsSelectionBattleCore']=function(){const _0x5c6d74=this[_0x482b('0x596')]()[_0x482b('0x736')];if(_0x5c6d74[_0x482b('0x17')](/RANDOM/i))return![];return VisuMZ[_0x482b('0x654')][_0x482b('0x40b')][_0x482b('0x460')](this);},VisuMZ[_0x482b('0x654')]['Game_Action_makeTargets']=Game_Action['prototype'][_0x482b('0x61f')],Game_Action[_0x482b('0x389')]['makeTargets']=function(){if(this[_0x482b('0x519')]())return this[_0x482b('0x180')]();else{if(_0x482b('0x624')!==_0x482b('0x624')){function _0x5c585f(){const _0x4a13bb=_0x2e12af[_0x482b('0x2d9')](_0x4569d1[_0x482b('0x53e')]()[_0x482b('0x6b6')]());_0x4a13bb>=0x0&&_0x4a13bb<=0x7&&_0x4685aa[_0x482b('0x230')](_0x4a13bb,_0x152df4);}}else return VisuMZ[_0x482b('0x654')][_0x482b('0xfb')][_0x482b('0x460')](this);}},Game_Action['prototype']['makeTargetsBattleCore']=function(){let _0x12567c=[];const _0x14a1ed=String(this[_0x482b('0x596')]()[_0x482b('0x736')]),_0x3c3114=VisuMZ[_0x482b('0x654')][_0x482b('0x6cb')](this[_0x482b('0x596')](),_0x482b('0x720'));if(VisuMZ['BattleCore']['JS'][_0x3c3114]){if('JtWzT'===_0x482b('0x49')){const _0x410fe2=VisuMZ[_0x482b('0x654')][_0x482b('0x6cb')](this[_0x482b('0x596')](),_0x482b('0x720'));return _0x12567c=VisuMZ[_0x482b('0x654')]['JS'][_0x410fe2]['call'](this,this[_0x482b('0x5fe')](),_0x12567c),this['repeatTargets'](_0x12567c);}else{function _0x3b33d2(){_0x47fc11[_0x482b('0x654')][_0x482b('0x363')][_0x482b('0x460')](this),this[_0x482b('0x5ef')]();}}}if(_0x14a1ed[_0x482b('0x17')](/(\d+) RANDOM ANY/i)){if(_0x482b('0x137')===_0x482b('0xa9')){function _0x287912(){if(!_0x2b199c[_0x482b('0x23a')]())return;_0x4b15ca['ConvertParams'](_0x19d820,_0x55df5b);const _0x479e7f=_0x161a6b[_0x482b('0x104')](),_0x202958=_0xce345f[_0x482b('0x55a')](_0x4deca6[_0x482b('0x720')]),_0x2a5f0d=_0x1e6677[_0x482b('0x46a')],_0x2000c8=_0x213a64[_0x482b('0x229')];if(!_0x479e7f)return;_0x54cfb9['requestAnimation'](_0x202958,_0x2a5f0d,_0x2000c8);if(_0xb4f5e9[_0x482b('0x5ea')])_0x479e7f[_0x482b('0x46c')](_0x482b('0x4fc'));}}else{let _0x4e4e5f=Number(RegExp['$1']);while(_0x4e4e5f--){if(_0x482b('0x621')!==_0x482b('0x76d')){const _0x1ff6a4=Math[_0x482b('0x4cc')](0x2)===0x0?this[_0x482b('0x6e9')]():this[_0x482b('0x5e7')]();_0x12567c[_0x482b('0x260')](_0x1ff6a4['trueRandomTarget']());}else{function _0x7b8f02(){const _0x336062=_0xc44a45[_0x482b('0x654')]['Settings'][_0x482b('0x2e')];this[_0x482b('0x580')]=_0x336062[_0x482b('0x73f')],this[_0x482b('0x5aa')]={};}}}return this[_0x482b('0x679')](_0x12567c);}}if(_0x14a1ed[_0x482b('0x17')](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x42d8de=Number(RegExp['$1']);while(_0x42d8de--){_0x12567c[_0x482b('0x260')](this[_0x482b('0x6e9')]()[_0x482b('0x292')]());}return this[_0x482b('0x679')](_0x12567c);}if(_0x14a1ed[_0x482b('0x17')](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){let _0x4c60d4=Number(RegExp['$1']);while(_0x4c60d4--){if(_0x482b('0x6d')!==_0x482b('0x726'))_0x12567c[_0x482b('0x260')](this[_0x482b('0x5e7')]()[_0x482b('0x292')]());else{function _0x111210(){if(!_0x559107[_0x482b('0x23a')]())return;_0x15c0b2['ConvertParams'](_0x5ef5ce,_0x57b1e9);const _0x4eea9a=_0x1ba4de[_0x482b('0x104')](),_0x16465d=_0x229c86[_0x482b('0x5d9')]*_0x20067c[_0x482b('0x5ac')];_0x4eea9a[_0x482b('0x3d3')](_0x16465d);}}}return this[_0x482b('0x679')](_0x12567c);}if(_0x14a1ed[_0x482b('0x17')](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x12567c[_0x482b('0x260')](...this[_0x482b('0x5e7')]()['aliveMembers']()[_0x482b('0x439')](_0x593ea3=>_0x593ea3!==this[_0x482b('0x5fe')]())),this['repeatTargets'](_0x12567c);return VisuMZ[_0x482b('0x654')][_0x482b('0xfb')][_0x482b('0x460')](this);},Game_Action[_0x482b('0x389')][_0x482b('0x60b')]=function(_0x363f85){const _0x56397a=[];for(let _0x360e7f=0x0;_0x360e7f<this[_0x482b('0x24c')]();_0x360e7f++){_0x56397a[_0x482b('0x260')](_0x363f85[_0x482b('0x292')]());}return _0x56397a;},VisuMZ['BattleCore'][_0x482b('0x544')]=Game_Action[_0x482b('0x389')]['itemEffectAddAttackState'],Game_Action[_0x482b('0x389')][_0x482b('0x649')]=function(_0x2354a6,_0x5ea963){const _0x4a7c1d=_0x2354a6['isImmortal']();_0x2354a6[_0x482b('0x74a')](![]),VisuMZ[_0x482b('0x654')][_0x482b('0x544')]['call'](this,_0x2354a6,_0x5ea963),_0x2354a6[_0x482b('0x74a')](_0x4a7c1d);},VisuMZ[_0x482b('0x654')][_0x482b('0x278')]=Game_Action['prototype'][_0x482b('0x57')],Game_Action[_0x482b('0x389')][_0x482b('0x57')]=function(_0x27a79b,_0x140495){const _0x5b5ab7=_0x27a79b[_0x482b('0x467')]();_0x27a79b[_0x482b('0x74a')](![]),VisuMZ[_0x482b('0x654')][_0x482b('0x278')]['call'](this,_0x27a79b,_0x140495),_0x27a79b[_0x482b('0x74a')](_0x5b5ab7);},VisuMZ['BattleCore'][_0x482b('0x2d1')]=Game_BattlerBase[_0x482b('0x389')][_0x482b('0x6c5')],Game_BattlerBase[_0x482b('0x389')][_0x482b('0x6c5')]=function(){VisuMZ['BattleCore'][_0x482b('0x2d1')][_0x482b('0x460')](this),this[_0x482b('0x5d1')]();},Game_BattlerBase['prototype'][_0x482b('0x5d1')]=function(){this[_0x482b('0x57a')]=![];},VisuMZ['BattleCore'][_0x482b('0xa')]=Game_BattlerBase[_0x482b('0x389')]['refresh'],Game_BattlerBase[_0x482b('0x389')][_0x482b('0x5c3')]=function(){this[_0x482b('0x2a0')]={},VisuMZ[_0x482b('0x654')]['Game_BattlerBase_refresh'][_0x482b('0x460')](this);},Game_BattlerBase['prototype'][_0x482b('0x6d3')]=function(){if(this['_cache']['hardDamageCap']!==undefined)return this[_0x482b('0x2a0')][_0x482b('0x6d3')];const _0x15aff6=/<DAMAGE CAP:[ ](\d+)>/i,_0x449e81=this[_0x482b('0x512')]()[_0x482b('0x6a0')](_0x5ea060=>_0x5ea060&&_0x5ea060[_0x482b('0x4ed')][_0x482b('0x17')](_0x15aff6)?Number(RegExp['$1']):0x0);let _0x49e13d=_0x449e81[_0x482b('0x5b8')]>0x0?Math['max'](..._0x449e81):0x0;if(_0x49e13d<=0x0)_0x49e13d=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['Damage'][_0x482b('0x41f')];return this['_cache']['hardDamageCap']=_0x49e13d,this[_0x482b('0x2a0')][_0x482b('0x6d3')];},Game_BattlerBase['prototype']['softDamageCapRate']=function(){if(this['_cache']['softDamageCap']!==undefined)return this[_0x482b('0x2a0')][_0x482b('0x4e3')];let _0x39ee64=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['Damage'][_0x482b('0x392')];const _0x403df8=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x5124d4=this[_0x482b('0x512')]()[_0x482b('0x6a0')](_0x295416=>_0x295416&&_0x295416[_0x482b('0x4ed')][_0x482b('0x17')](_0x403df8)?Number(RegExp['$1'])/0x64:0x0);return _0x39ee64=_0x5124d4['reduce']((_0xcd7c7b,_0x1dd9b2)=>_0xcd7c7b+_0x1dd9b2,_0x39ee64),this[_0x482b('0x2a0')][_0x482b('0x4e3')]=_0x39ee64,this[_0x482b('0x2a0')][_0x482b('0x4e3')][_0x482b('0x15a')](0.01,0x1);},Game_BattlerBase['prototype'][_0x482b('0x67c')]=function(){if(!SceneManager[_0x482b('0x23a')]())return null;if(!SceneManager[_0x482b('0x455')][_0x482b('0x5f')])return null;return SceneManager['_scene'][_0x482b('0x5f')]['findTargetSprite'](this);},Game_BattlerBase[_0x482b('0x389')]['svBattlerAnchorX']=function(){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['Actor'][_0x482b('0x2cf')];},Game_BattlerBase[_0x482b('0x389')]['svBattlerAnchorY']=function(){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x50d')][_0x482b('0x2ba')];},Game_BattlerBase[_0x482b('0x389')][_0x482b('0x45f')]=function(){return VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x50d')][_0x482b('0x541')];},VisuMZ['BattleCore'][_0x482b('0x2a7')]=Game_BattlerBase[_0x482b('0x389')][_0x482b('0x397')],Game_BattlerBase[_0x482b('0x389')][_0x482b('0x397')]=function(_0x5785c1){if(_0x5785c1===this['deathStateId']()&&this[_0x482b('0x467')]())return!![];return VisuMZ[_0x482b('0x654')]['Game_BattlerBase_isStateResist'][_0x482b('0x460')](this,_0x5785c1);},Game_BattlerBase[_0x482b('0x389')][_0x482b('0x467')]=function(){return this[_0x482b('0x57a')];},Game_BattlerBase[_0x482b('0x389')][_0x482b('0x74a')]=function(_0x50fdef){if(_0x50fdef){if(_0x482b('0x1ee')!==_0x482b('0x6e4'))this[_0x482b('0x241')]();else{function _0x3ba86a(){if(_0x3d944e['_autoBattle']&&!_0x576048[_0x482b('0x65d')])return this['makeActionListAutoAttack']();else{return _0x3504f2[_0x482b('0x654')]['Game_Actor_makeActionList'][_0x482b('0x460')](this);;}}}}else this[_0x482b('0x380')]();},Game_BattlerBase[_0x482b('0x389')][_0x482b('0x241')]=function(){this[_0x482b('0x57a')]=!![];},Game_BattlerBase[_0x482b('0x389')][_0x482b('0x380')]=function(){const _0x37bc16=this[_0x482b('0x548')]();this['_immortal']=![],this['refresh']();if(this[_0x482b('0x2a4')]()&&_0x37bc16)this['performCollapse']();},VisuMZ[_0x482b('0x654')][_0x482b('0x36f')]=Game_BattlerBase[_0x482b('0x389')][_0x482b('0x79b')],Game_BattlerBase['prototype']['canAttack']=function(){if(!this[_0x482b('0xff')]())return![];return VisuMZ[_0x482b('0x654')]['Game_BattlerBase_canAttack'][_0x482b('0x460')](this);},Game_BattlerBase[_0x482b('0x389')][_0x482b('0xff')]=function(){for(const _0x3295f3 of this[_0x482b('0x512')]()){if('umdjq'===_0x482b('0x463')){function _0x26b71b(){_0x13a021[_0x482b('0x654')]['JS'][_0x550779][_0x482b('0x460')](this,this[_0x482b('0x5fe')](),this[_0x482b('0x5fe')](),this[_0x482b('0x596')](),_0x5e9ea0);}}else{if(!_0x3295f3)continue;if(_0x3295f3[_0x482b('0x4ed')][_0x482b('0x17')](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}}return!![];},VisuMZ[_0x482b('0x654')][_0x482b('0x233')]=Game_BattlerBase[_0x482b('0x389')]['canGuard'],Game_BattlerBase[_0x482b('0x389')]['canGuard']=function(){if(!this[_0x482b('0x600')]())return![];return VisuMZ[_0x482b('0x654')]['Game_BattlerBase_canGuard']['call'](this);},Game_BattlerBase[_0x482b('0x389')][_0x482b('0x600')]=function(){for(const _0x313969 of this[_0x482b('0x512')]()){if(_0x482b('0xd2')==='jvdlk'){function _0x297e22(){_0x22496a[_0x482b('0x654')][_0x482b('0x53d')][_0x482b('0x460')](this),this[_0x482b('0x4ca')]();}}else{if(!_0x313969)continue;if(_0x313969['note']['match'](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}}return!![];},Game_BattlerBase[_0x482b('0x389')][_0x482b('0x365')]=function(){for(const _0x4ce046 of this[_0x482b('0x512')]()){if(!_0x4ce046)continue;if(_0x4ce046[_0x482b('0x4ed')][_0x482b('0x17')](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ[_0x482b('0x654')][_0x482b('0x62a')]=Game_Battler['prototype'][_0x482b('0x56e')],Game_Battler[_0x482b('0x389')][_0x482b('0x56e')]=function(){if(SceneManager[_0x482b('0x23a')]()&&$gameTroop[_0x482b('0x555')]()<=0x0)return;this[_0x482b('0x6bf')](_0x482b('0x3fc')),VisuMZ[_0x482b('0x654')]['Game_Battler_regenerateAll'][_0x482b('0x460')](this),this[_0x482b('0x478')](),this[_0x482b('0x6bf')](_0x482b('0x216'));},Game_Battler[_0x482b('0x389')][_0x482b('0x478')]=function(){if(SceneManager[_0x482b('0x23a')]())for(const _0x31e60e of this[_0x482b('0x512')]()){if(!_0x31e60e)continue;this[_0x482b('0x769')](_0x31e60e);}},Game_Battler[_0x482b('0x389')]['onRegeneratePlayStateAnimation']=function(_0x3c125a){if(!Imported[_0x482b('0x64e')])return;if(!SceneManager[_0x482b('0x23a')]())return;if(this[_0x482b('0x2a4')]())return;if(this[_0x482b('0x9b')]())return;if(_0x3c125a[_0x482b('0x4ed')][_0x482b('0x17')](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){const _0x23957a=Number(RegExp['$1']);$gameTemp['requestFauxAnimation']([this],_0x23957a,![],![]);}},VisuMZ[_0x482b('0x654')][_0x482b('0x668')]=Game_Battler[_0x482b('0x389')][_0x482b('0x778')],Game_Battler[_0x482b('0x389')][_0x482b('0x778')]=function(){this[_0x482b('0x6bf')](_0x482b('0x281')),VisuMZ[_0x482b('0x654')][_0x482b('0x668')][_0x482b('0x460')](this),this[_0x482b('0x6bf')](_0x482b('0xfc'));},VisuMZ[_0x482b('0x654')]['Game_Battler_onTurnEnd']=Game_Battler[_0x482b('0x389')][_0x482b('0x4ac')],Game_Battler[_0x482b('0x389')][_0x482b('0x4ac')]=function(){this[_0x482b('0x6bf')](_0x482b('0x779')),VisuMZ[_0x482b('0x654')][_0x482b('0x69f')][_0x482b('0x460')](this),this[_0x482b('0x6bf')](_0x482b('0x62f'));},Game_Battler[_0x482b('0x389')][_0x482b('0x6bf')]=function(_0xdfd404){const _0x5a1dfd=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2c1')];if(_0x5a1dfd[_0xdfd404])_0x5a1dfd[_0xdfd404][_0x482b('0x460')](this);for(const _0x58d5a9 of this[_0x482b('0x512')]()){if(_0x482b('0x272')===_0x482b('0x272')){if(!_0x58d5a9)continue;key=VisuMZ[_0x482b('0x654')][_0x482b('0x6cb')](_0x58d5a9,_0xdfd404);if(VisuMZ[_0x482b('0x654')]['JS'][key]){if(_0x482b('0x2ed')===_0x482b('0x2ed'))VisuMZ[_0x482b('0x654')]['JS'][key][_0x482b('0x460')](this,this,this,_0x58d5a9,0x0);else{function _0x2a4000(){_0x11f1e5['BattleCore']['BattleManager_initMembers'][_0x482b('0x460')](this),this['_forcedBattlers']=[];}}}}else{function _0x6c66a7(){this[_0x482b('0x62d')][_0x482b('0x325')]['x']=0x1/(this[_0x482b('0x325')]['x']||0.001),this[_0x482b('0x62d')]['scale']['y']=0x1/(this[_0x482b('0x325')]['y']||0.001);}}}},Game_Battler[_0x482b('0x389')][_0x482b('0x738')]=function(){this[_0x482b('0x72f')]=[];},Game_Battler[_0x482b('0x389')][_0x482b('0x6c9')]=function(){if(!this[_0x482b('0x72f')])this[_0x482b('0x738')]();return this['_damagePopup'][_0x482b('0x5b8')]>0x0;},Game_Battler[_0x482b('0x389')][_0x482b('0x446')]=function(){if(!SceneManager[_0x482b('0x23a')]())return;if(!this[_0x482b('0x72f')])this['clearDamagePopup']();this['createSeparateDamagePopups']();const _0x567c2b=this[_0x482b('0x67c')]();if(_0x567c2b)_0x567c2b[_0x482b('0x265')]();},Game_Battler[_0x482b('0x389')][_0x482b('0x719')]=function(){const _0x5bb9d6=this['result']();if(_0x5bb9d6[_0x482b('0x13b')]||_0x5bb9d6[_0x482b('0xb8')]){const _0x153289=JsonEx[_0x482b('0x4a')](_0x5bb9d6);_0x153289[_0x482b('0x3c5')]=![],_0x153289[_0x482b('0x4f')]=0x0,this[_0x482b('0x72f')]['push'](_0x153289);}if(_0x5bb9d6[_0x482b('0x3c5')]){if(_0x482b('0x744')!=='gUlGQ'){const _0x261b1a=JsonEx['makeDeepCopy'](_0x5bb9d6);_0x261b1a[_0x482b('0x13b')]=![],_0x261b1a[_0x482b('0xb8')]=![],_0x261b1a[_0x482b('0x4f')]=0x0,this['_damagePopup'][_0x482b('0x260')](_0x261b1a);}else{function _0x13ec26(){const _0x35e2ba=this['_cursorArea'][_0x482b('0x75c')][_0x482b('0x43f')](new _0x30f758(0x0,0x0)),_0x29e3b3=this[_0x482b('0xdb')][_0x482b('0x20')];_0x29e3b3['x']=_0x35e2ba['x']+this[_0x482b('0x55d')]['x'],_0x29e3b3['y']=_0x35e2ba['y']+this[_0x482b('0x55d')]['y'],_0x29e3b3[_0x482b('0x2d0')]=this[_0x482b('0x13')],_0x29e3b3['height']=this[_0x482b('0x4fd')];}}}if(_0x5bb9d6['mpDamage']!==0x0){const _0x26b0e0=JsonEx[_0x482b('0x4a')](_0x5bb9d6);_0x26b0e0['missed']=![],_0x26b0e0[_0x482b('0xb8')]=![],_0x26b0e0[_0x482b('0x3c5')]=![],this[_0x482b('0x72f')][_0x482b('0x260')](_0x26b0e0);}},Game_Battler[_0x482b('0x389')][_0x482b('0x61e')]=function(){if(!this[_0x482b('0x72f')])this[_0x482b('0x738')]();return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')]['NewPopupBottom']?this[_0x482b('0x72f')][_0x482b('0x1b2')]():this[_0x482b('0x72f')][_0x482b('0x734')]();},Game_Battler[_0x482b('0x389')][_0x482b('0x111')]=function(_0x5886d5,_0x27c36d){if(!SceneManager[_0x482b('0x23a')]())return;if(!this[_0x482b('0x67c')]())return;if(_0x5886d5[_0x482b('0x5b8')]<=0x0)return;_0x27c36d=_0x27c36d||{},_0x27c36d[_0x482b('0x5cb')]=_0x27c36d[_0x482b('0x5cb')]||_0x482b('0x18b'),_0x27c36d['flashColor']=_0x27c36d['flashColor']||[0x0,0x0,0x0,0x0],_0x27c36d[_0x482b('0x552')]=_0x27c36d[_0x482b('0x552')]||0x0,this[_0x482b('0x67c')]()[_0x482b('0x111')](_0x5886d5,_0x27c36d);},Game_Battler[_0x482b('0x389')][_0x482b('0x1ff')]=function(_0x3bdd40,_0x47b48b,_0x48af3f){if(!SceneManager[_0x482b('0x23a')]())return;if(!this[_0x482b('0x67c')]())return;if(_0x47b48b[_0x482b('0x5b8')]<=0x0)return;_0x48af3f=_0x48af3f||{},_0x48af3f[_0x482b('0x5cb')]=_0x48af3f[_0x482b('0x5cb')]||_0x482b('0x18b'),_0x48af3f[_0x482b('0x6d5')]=_0x48af3f['flashColor']||[0x0,0x0,0x0,0x0],_0x48af3f['flashDuration']=_0x48af3f[_0x482b('0x552')]||0x0,this[_0x482b('0x67c')]()['setupIconTextPopup'](_0x3bdd40,_0x47b48b,_0x48af3f);},Game_Battler['prototype'][_0x482b('0x4a9')]=function(){return!![];},VisuMZ[_0x482b('0x654')][_0x482b('0x1ab')]=Game_Battler['prototype']['onBattleStart'],Game_Battler[_0x482b('0x389')][_0x482b('0x20c')]=function(_0xce7829){VisuMZ[_0x482b('0x654')][_0x482b('0x1ab')][_0x482b('0x460')](this,_0xce7829),this[_0x482b('0x66d')](_0xce7829);},Game_Battler['prototype'][_0x482b('0x66d')]=function(_0x24a853){this[_0x482b('0x603')](![]);},VisuMZ[_0x482b('0x654')]['Game_Battler_performActionStart']=Game_Battler['prototype'][_0x482b('0x314')],Game_Battler['prototype'][_0x482b('0x314')]=function(_0x107c33){VisuMZ[_0x482b('0x654')][_0x482b('0x3e6')]['call'](this,_0x107c33);if(!_0x107c33[_0x482b('0x5b3')]()){if('nBZPK'===_0x482b('0x468')){const _0x32258e=this[_0x482b('0x67c')]();if(_0x32258e)_0x32258e['stepForward']();}else{function _0x9327a2(){if(this[_0x482b('0x27b')])this['parent'][_0x482b('0x18d')](_0x326cb4,_0x3f5bad,_0x99d13a);}}}this[_0x482b('0x603')](![]);},VisuMZ[_0x482b('0x654')][_0x482b('0x10b')]=Game_Battler[_0x482b('0x389')][_0x482b('0x5be')],Game_Battler[_0x482b('0x389')]['performActionEnd']=function(){VisuMZ['BattleCore'][_0x482b('0x10b')][_0x482b('0x460')](this),this[_0x482b('0x135')]=![];const _0x250b81=this[_0x482b('0x67c')]();if(_0x250b81)_0x250b81[_0x482b('0x305')]();this[_0x482b('0x603')](![]),this[_0x482b('0x24b')]();},Game_Battler[_0x482b('0x389')]['performActionMotions']=function(_0x21d18c){if(_0x21d18c[_0x482b('0x51e')]())this[_0x482b('0x539')]();else{if(_0x21d18c[_0x482b('0x5b3')]())this[_0x482b('0x370')](_0x482b('0x85'));else{if(_0x21d18c[_0x482b('0x34e')]())this[_0x482b('0x370')]('spell');else{if(_0x21d18c[_0x482b('0x583')]()){if(_0x482b('0x1a5')===_0x482b('0x10e')){function _0x397ec7(){this[_0x482b('0x39e')]();}}else{if(_0x21d18c[_0x482b('0x596')]()['damage']['type']>0x0){if(_0x482b('0x71e')!==_0x482b('0x48f'))this[_0x482b('0x539')]();else{function _0x36b4a8(){return this[_0x482b('0x715')][_0x482b('0x2f4')]();}}}else this[_0x482b('0x370')](_0x482b('0x4b1'));}}else _0x21d18c[_0x482b('0x473')]()&&this[_0x482b('0x370')](_0x482b('0x596'));}}}},Game_Battler['prototype'][_0x482b('0x3d4')]=function(){return $dataSystem['attackMotions'][0x0];},Game_Battler['prototype'][_0x482b('0x2bf')]=function(){const _0x414e36=this[_0x482b('0x3d4')]();return _0x414e36?_0x414e36[_0x482b('0x3b7')]:0x0;},Game_Battler['prototype']['performSubstitute']=function(_0x546cd5){if(!$gameSystem['isSideView']())return;const _0x552ff4=this[_0x482b('0x67c')](),_0x2f870f=_0x546cd5[_0x482b('0x67c')]();if(!_0x552ff4||!_0x2f870f)return;const _0x626599=_0x2f870f[_0x482b('0x28e')],_0x696cde=_0x2f870f[_0x482b('0x11')];this[_0x482b('0x30a')](_0x626599,_0x696cde,0x0,![],_0x482b('0x76f'),-0x1),_0x552ff4[_0x482b('0x5e3')]();const _0xcb6eb9=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x75e')];let _0x5da36a=(_0x2f870f[_0x482b('0x2d0')]+_0x552ff4['width'])/0x2;_0x5da36a*=this[_0x482b('0x3e4')]()?0x1:-0x1;let _0x2a237d=_0xcb6eb9[_0x482b('0x277')]*(this['isActor']()?0x1:-0x1);_0x546cd5[_0x482b('0x3ec')](_0x5da36a,_0x2a237d,0x0,![],_0x482b('0x76f')),_0x2f870f[_0x482b('0x5e3')]();},Game_Battler[_0x482b('0x389')][_0x482b('0x370')]=function(_0x2107b9){if(SceneManager[_0x482b('0x23a')]()){if(_0x482b('0x413')!==_0x482b('0x413')){function _0x302e15(){_0x5563a9[_0x482b('0x389')][_0x482b('0x21')][_0x482b('0x460')](this);}}else{const _0x4414ad=this[_0x482b('0x67c')]();if(_0x4414ad)_0x4414ad['forceMotion'](_0x2107b9);}}},Game_Battler[_0x482b('0x389')][_0x482b('0x238')]=function(_0xbce08){if(SceneManager[_0x482b('0x23a')]()){const _0x34b1e5=this[_0x482b('0x67c')]();if(_0x34b1e5)_0x34b1e5[_0x482b('0x214')](_0xbce08);}},Game_Battler['prototype']['startAttackWeaponAnimation']=function(){if(SceneManager[_0x482b('0x23a')]()){const _0x199042=this['getAttackWeaponAnimationId']();this['startWeaponAnimation'](_0x199042);}},Game_Battler[_0x482b('0x389')][_0x482b('0x11f')]=function(_0x353308,_0x397262){if(!_0x353308)return;if(!_0x353308[_0x482b('0x596')]())return;if(_0x353308[_0x482b('0x51e')]())return;if(_0x353308[_0x482b('0x5b3')]())return;if(_0x353308[_0x482b('0x473')]())return;let _0x399af5=0x0;const _0x104d1e=VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x75e')],_0x2cb0f9=_0x353308[_0x482b('0x596')]()['note'];if(_0x2cb0f9['match'](/<CAST ANIMATION: (\d+)>/i))_0x399af5=Number(RegExp['$1']);else{if(_0x2cb0f9[_0x482b('0x17')](/<NO CAST ANIMATION>/i))return;else{if(_0x353308[_0x482b('0x504')]()){if(_0x482b('0x5d8')===_0x482b('0x5d8'))_0x399af5=_0x104d1e[_0x482b('0x108')];else{function _0x377967(){this[_0x482b('0x53c')](_0x482b('0x3c3'));}}}else{if(_0x353308[_0x482b('0x2d5')]())_0x399af5=_0x104d1e[_0x482b('0x44f')];else _0x353308[_0x482b('0x445')]()&&(_0x399af5=_0x104d1e[_0x482b('0x694')]);}}}_0x399af5>0x0&&$gameTemp[_0x482b('0x610')]([this],_0x399af5,!!_0x397262);},Game_Battler[_0x482b('0x389')][_0x482b('0x2e1')]=function(){SoundManager[_0x482b('0x3e8')]();let _0x2adaea=VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x75e')][_0x482b('0x2b0')];_0x2adaea>0x0&&$gameTemp[_0x482b('0x610')]([this],_0x2adaea);},VisuMZ[_0x482b('0x654')][_0x482b('0x53d')]=Game_Battler[_0x482b('0x389')][_0x482b('0x366')],Game_Battler[_0x482b('0x389')][_0x482b('0x366')]=function(){VisuMZ[_0x482b('0x654')]['Game_Battler_performDamage']['call'](this),this[_0x482b('0x4ca')]();},Game_Battler[_0x482b('0x389')][_0x482b('0x4ca')]=function(){if(!$gameSystem[_0x482b('0x386')]())return;if(this[_0x482b('0x135')])return;this[_0x482b('0x135')]=!![];const _0x44e6fe=this[_0x482b('0x67c')]();if(_0x44e6fe)_0x44e6fe[_0x482b('0x458')]();},Game_Battler[_0x482b('0x389')][_0x482b('0x24b')]=function(){if(this[_0x482b('0x2a4')]()&&this[_0x482b('0x68a')]!==_0x482b('0x6cd')){if(_0x482b('0x443')===_0x482b('0x443'))this[_0x482b('0x370')](_0x482b('0x6cd'));else{function _0x489235(){this['createDamageSprite']();}}}if(this[_0x482b('0x2a4')]()&&this[_0x482b('0x68a')]===_0x482b('0x6cd'))return;if(this[_0x482b('0x68a')]===_0x482b('0x31e'))return;if(this[_0x482b('0x68a')]===_0x482b('0x2dc')&&!BattleManager[_0x482b('0x588')]())return;if(this[_0x482b('0x68a')]===_0x482b('0x85')&&!BattleManager[_0x482b('0x588')]())return;this[_0x482b('0x690')](),this[_0x482b('0x67c')]()&&BattleManager['isInputting']()&&this[_0x482b('0x67c')]()[_0x482b('0xf7')]();},Game_Battler[_0x482b('0x389')]['isBattlerFlipped']=function(){return this[_0x482b('0x26b')];},Game_Battler[_0x482b('0x389')][_0x482b('0x603')]=function(_0x373dba){if(!$gameSystem[_0x482b('0x386')]())return;this[_0x482b('0x26b')]=_0x373dba;const _0x5c553b=this[_0x482b('0x67c')]();if(_0x5c553b)_0x5c553b[_0x482b('0x2d3')]();},Game_Battler[_0x482b('0x389')][_0x482b('0x557')]=function(_0x3c43e0,_0x3ce797,_0x411102){if(!$gameSystem[_0x482b('0x386')]())return;const _0x1d177f=this[_0x482b('0x67c')]();if(!_0x1d177f)return;if(_0x3c43e0===_0x1d177f[_0x482b('0x28e')])return;let _0xcf5e97=![];if(this[_0x482b('0x3e4')]()){if(_0x482b('0x6ce')===_0x482b('0x356')){function _0x1ec3fe(){_0x376be4[_0x482b('0x654')][_0x482b('0xdc')][_0x482b('0x460')](this),this[_0x482b('0x29e')]&&(this[_0x482b('0x29e')]=_0x7f5ff7,_0x470d87[_0x482b('0x455')][_0x482b('0x34d')]());}}else{if(_0x3c43e0>_0x1d177f[_0x482b('0x28e')])_0xcf5e97=!![];if(_0x3c43e0<_0x1d177f[_0x482b('0x28e')])_0xcf5e97=![];}}else{if(this[_0x482b('0x279')]()){if(_0x3c43e0>_0x1d177f[_0x482b('0x28e')])_0xcf5e97=![];if(_0x3c43e0<_0x1d177f[_0x482b('0x28e')])_0xcf5e97=!![];}}this[_0x482b('0x603')](_0x411102?!_0xcf5e97:_0xcf5e97),_0x1d177f[_0x482b('0x2d3')]();},Game_Battler[_0x482b('0x389')][_0x482b('0x3ec')]=function(_0x1d6b64,_0x6ea211,_0x486098,_0x1504aa,_0x4da138){if(!$gameSystem[_0x482b('0x386')]())return;const _0x555221=this[_0x482b('0x67c')]();if(!_0x555221)return;if(_0x1504aa)this[_0x482b('0x557')](_0x1d6b64,_0x6ea211,![]);_0x1d6b64+=_0x555221[_0x482b('0x28e')]-_0x555221[_0x482b('0x41e')],_0x6ea211+=_0x555221[_0x482b('0x11')]-_0x555221[_0x482b('0x10a')],_0x555221[_0x482b('0x18d')](_0x1d6b64,_0x6ea211,_0x486098);if(Imported[_0x482b('0x64e')])_0x555221[_0x482b('0x15b')](_0x4da138||'Linear');},Game_Battler[_0x482b('0x389')][_0x482b('0x30a')]=function(_0x4e4e14,_0x4af8d2,_0x564810,_0x2bb8e9,_0x4b309e,_0x40b8c4){if(!$gameSystem[_0x482b('0x386')]())return;const _0x5cee59=this[_0x482b('0x67c')]();if(!_0x5cee59)return;if(_0x40b8c4>=0x0){if(_0x5cee59[_0x482b('0x28e')]>_0x4e4e14)_0x4e4e14+=_0x5cee59['width']/0x2+_0x40b8c4;if(_0x5cee59[_0x482b('0x28e')]<_0x4e4e14)_0x4e4e14-=_0x5cee59[_0x482b('0x2d0')]/0x2+_0x40b8c4;}if(_0x2bb8e9)this[_0x482b('0x557')](_0x4e4e14,_0x4af8d2,![]);_0x4e4e14-=_0x5cee59[_0x482b('0x41e')],_0x4af8d2-=_0x5cee59[_0x482b('0x10a')],_0x5cee59[_0x482b('0x18d')](_0x4e4e14,_0x4af8d2,_0x564810);if(Imported['VisuMZ_0_CoreEngine'])_0x5cee59[_0x482b('0x15b')](_0x4b309e||_0x482b('0x76f'));},Game_Battler[_0x482b('0x389')]['floatBattler']=function(_0x1e31e3,_0x4f62a9,_0x4c0986){if(!$gameSystem[_0x482b('0x386')]())return;const _0x38f961=this[_0x482b('0x67c')]();if(!_0x38f961)return;_0x38f961[_0x482b('0xf5')](_0x1e31e3,_0x4f62a9,_0x4c0986);},Game_Battler[_0x482b('0x389')][_0x482b('0x176')]=function(_0x5c2725,_0x2a8632){if(!$gameSystem[_0x482b('0x386')]())return;const _0x2cda25=this[_0x482b('0x67c')]();if(!_0x2cda25)return;_0x2cda25[_0x482b('0x34a')](_0x5c2725,_0x2a8632);},Game_Battler['prototype'][_0x482b('0x3de')]=function(_0x4a4ae1,_0x3b5c0,_0x20436e){if(!$gameSystem['isSideView']())return;const _0x19c3f5=this[_0x482b('0x67c')]();if(!_0x19c3f5)return;_0x19c3f5[_0x482b('0x724')](_0x4a4ae1,_0x3b5c0,_0x20436e);},Game_Battler[_0x482b('0x389')][_0x482b('0x69a')]=function(_0x5c86f7){if(!_0x5c86f7)return![];return _0x5c86f7['friendsUnit']()===this[_0x482b('0x5e7')]();},Game_Battler[_0x482b('0x389')][_0x482b('0x3e9')]=function(_0x131932){if(!_0x131932)return![];return _0x131932[_0x482b('0x6e9')]()===this[_0x482b('0x5e7')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x5e1')]=Game_Actor[_0x482b('0x389')][_0x482b('0xb6')],Game_Actor[_0x482b('0x389')][_0x482b('0xb6')]=function(_0x552b90){VisuMZ[_0x482b('0x654')][_0x482b('0x5e1')][_0x482b('0x460')](this,_0x552b90),this['initBattlePortrait']();},Game_Actor[_0x482b('0x389')][_0x482b('0x4fe')]=function(){this[_0x482b('0x3fa')]='',this[_0x482b('0x52d')]()&&this[_0x482b('0x52d')]()['note']['match'](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x482b('0x3fa')]=String(RegExp['$1']));},Game_Actor[_0x482b('0x389')][_0x482b('0x3f5')]=function(){if(this[_0x482b('0x75d')]()!=='')return this[_0x482b('0x75d')]();else{if(Imported[_0x482b('0x5e4')]&&this[_0x482b('0x332')]()!=='')return this[_0x482b('0x332')]();}return'';},Game_Actor[_0x482b('0x389')][_0x482b('0x75d')]=function(){if(this['_battlePortrait']===undefined)this[_0x482b('0x4fe')]();return this[_0x482b('0x3fa')];},Game_Actor[_0x482b('0x389')][_0x482b('0x69')]=function(_0x45c0e0){if(this[_0x482b('0x3fa')]===undefined)this['initBattlePortrait']();this[_0x482b('0x3fa')]=_0x45c0e0;if(SceneManager[_0x482b('0x23a')]()&&$gameParty[_0x482b('0x4f6')]()[_0x482b('0x24d')](this)){const _0x2195c1=SceneManager['_scene'][_0x482b('0x571')];if(_0x2195c1)_0x2195c1[_0x482b('0x798')](this);}},Game_Actor['prototype'][_0x482b('0x1bc')]=function(){return!![];},Game_Actor[_0x482b('0x389')][_0x482b('0x73e')]=function(){if(!this[_0x482b('0x77d')]()&&BattleManager[_0x482b('0x2c9')])return!![];return Game_Battler[_0x482b('0x389')][_0x482b('0x73e')][_0x482b('0x460')](this);},VisuMZ[_0x482b('0x654')][_0x482b('0x513')]=Game_Actor[_0x482b('0x389')][_0x482b('0x29a')],Game_Actor[_0x482b('0x389')]['makeActionList']=function(){if(BattleManager[_0x482b('0x2c9')]&&!ConfigManager[_0x482b('0x65d')])return this['makeActionListAutoAttack']();else{return VisuMZ['BattleCore'][_0x482b('0x513')][_0x482b('0x460')](this);;}},Game_Actor['prototype'][_0x482b('0x28a')]=function(){const _0x1b73cc=[],_0x4ae6a9=new Game_Action(this);return _0x4ae6a9['setAttack'](),_0x1b73cc[_0x482b('0x260')](_0x4ae6a9),_0x1b73cc;},Game_Actor['prototype'][_0x482b('0x78')]=function(){if(this[_0x482b('0x360')]()[_0x482b('0x4ed')][_0x482b('0x17')](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)){if(_0x482b('0x73d')===_0x482b('0x73d'))return String(RegExp['$1'])[_0x482b('0xe0')](/[\r\n]+/);else{function _0x2dc5a0(){this['refreshMotion']();}}}else return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x427')][_0x482b('0x2ac')];},Game_Actor[_0x482b('0x389')][_0x482b('0x653')]=function(){if(this['_cache'][_0x482b('0x773')]!==undefined)return this[_0x482b('0x2a0')][_0x482b('0x773')];if(this[_0x482b('0x52d')]()[_0x482b('0x4ed')][_0x482b('0x17')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)){if(_0x482b('0x703')!==_0x482b('0x69b'))this[_0x482b('0x2a0')][_0x482b('0x773')]=eval(RegExp['$1']),this[_0x482b('0x2a0')][_0x482b('0x318')]=eval(RegExp['$2']);else{function _0x2ef5f4(){const _0x44494e=this[_0x482b('0x301')]();if(_0x501f34&&['xp',_0x482b('0x2fa')][_0x482b('0x24d')](_0x44494e))this[_0x482b('0x36e')](_0xf44d45);else _0x3bdec9&&[_0x482b('0x6ff')]['includes'](_0x44494e)&&(this[_0x482b('0x179')](_0xa7555d),this[_0x482b('0x6db')]());_0x52ea3d[_0x482b('0x654')][_0x482b('0x362')][_0x482b('0x460')](this,_0x2dcc63),_0x46a918&&_0xa79d0a[_0x482b('0x67c')]()[_0x482b('0x7')]();}}}else this[_0x482b('0x2a0')][_0x482b('0x773')]=Game_Battler[_0x482b('0x389')][_0x482b('0x653')][_0x482b('0x460')](this);return this[_0x482b('0x2a0')][_0x482b('0x773')];},Game_Actor[_0x482b('0x389')][_0x482b('0x731')]=function(){if(this['_cache'][_0x482b('0x318')]!==undefined)return this[_0x482b('0x2a0')][_0x482b('0x318')];if(this['actor']()['note'][_0x482b('0x17')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i))this['_cache'][_0x482b('0x773')]=eval(RegExp['$1']),this[_0x482b('0x2a0')][_0x482b('0x318')]=eval(RegExp['$2']);else{if(_0x482b('0x3ad')===_0x482b('0x3ad'))this[_0x482b('0x2a0')][_0x482b('0x318')]=Game_Battler[_0x482b('0x389')][_0x482b('0x731')]['call'](this);else{function _0x187c0d(){if(this[_0x482b('0x2a0')][_0x482b('0x4e3')]!==_0x80921b)return this[_0x482b('0x2a0')][_0x482b('0x4e3')];let _0x2fac8e=_0x31b94c[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')][_0x482b('0x392')];const _0x32ace8=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x368651=this[_0x482b('0x512')]()[_0x482b('0x6a0')](_0x121790=>_0x121790&&_0x121790[_0x482b('0x4ed')][_0x482b('0x17')](_0x32ace8)?_0x536998(_0xe33a82['$1'])/0x64:0x0);return _0x2fac8e=_0x368651['reduce']((_0x148e50,_0x8e2b20)=>_0x148e50+_0x8e2b20,_0x2fac8e),this[_0x482b('0x2a0')]['softDamageCap']=_0x2fac8e,this[_0x482b('0x2a0')][_0x482b('0x4e3')][_0x482b('0x15a')](0.01,0x1);}}}return this[_0x482b('0x2a0')][_0x482b('0x318')];},Game_Actor[_0x482b('0x389')][_0x482b('0x45f')]=function(){if(this[_0x482b('0x2a0')]['svShadow']!==undefined)return this[_0x482b('0x2a0')][_0x482b('0x98')];if(this[_0x482b('0x52d')]()[_0x482b('0x4ed')]['match'](/<SIDEVIEW SHOW SHADOW>/i)){if('HYNkz'!==_0x482b('0x3d0'))this['_cache'][_0x482b('0x98')]=!![];else{function _0x32c0da(){this['requestMotion'](_0x482b('0x2b6'));}}}else{if(this[_0x482b('0x52d')]()[_0x482b('0x4ed')]['match'](/<SIDEVIEW HIDE SHADOW>/i)){if(_0x482b('0x419')!==_0x482b('0x419')){function _0x53595b(){_0x12797f[_0x482b('0x654')][_0x482b('0xca')][_0x482b('0x460')](this,_0x2cd204,_0x38326c,_0x279c9c);}}else this['_cache']['svShadow']=![];}else{if(_0x482b('0x47b')!=='OYnQn')this[_0x482b('0x2a0')][_0x482b('0x98')]=Game_Battler[_0x482b('0x389')][_0x482b('0x45f')][_0x482b('0x460')](this);else{function _0x28fcdf(){_0x2f06aa[_0x482b('0x260')](this['friendsUnit']()[_0x482b('0x292')]());}}}}return this[_0x482b('0x2a0')]['svShadow'];},Game_Actor[_0x482b('0x389')][_0x482b('0x141')]=function(_0xe374c4){Game_Battler[_0x482b('0x389')]['performAction']['call'](this,_0xe374c4),this[_0x482b('0x27d')](_0xe374c4);},Game_Actor[_0x482b('0x389')][_0x482b('0x3d4')]=function(){const _0x30e21d=this[_0x482b('0x219')](),_0x4a2750=_0x30e21d[0x0]?_0x30e21d[0x0][_0x482b('0x61d')]:0x0;return $dataSystem[_0x482b('0x1ad')][_0x4a2750];},VisuMZ[_0x482b('0x654')][_0x482b('0x43a')]=Game_Enemy[_0x482b('0x389')][_0x482b('0xb6')],Game_Enemy[_0x482b('0x389')]['setup']=function(_0x3af26e,_0x1b0fd3,_0x220600){_0x3af26e=DataManager[_0x482b('0x14a')](_0x3af26e),VisuMZ[_0x482b('0x654')][_0x482b('0x43a')][_0x482b('0x460')](this,_0x3af26e,_0x1b0fd3,_0x220600),Imported[_0x482b('0x112')]&&this[_0x482b('0x11d')](),this['clearBattleCoreData'](),this[_0x482b('0x2ae')](),Imported[_0x482b('0x112')]&&this[_0x482b('0x42a')]();},Game_Enemy['prototype'][_0x482b('0x5a6')]=function(){const _0x47cf11=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2e')];this[_0x482b('0x580')]=_0x47cf11[_0x482b('0x73f')],this['_svBattlerData']={};},Game_Enemy[_0x482b('0x389')][_0x482b('0x2ae')]=function(){const _0x3cd4f4=VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x2e')],_0x516e42=this[_0x482b('0x60e')]()[_0x482b('0x4ed')];this[_0x482b('0x5aa')]={'name':'','wtypeId':_0x3cd4f4[_0x482b('0x19a')],'collapse':_0x3cd4f4[_0x482b('0x244')],'motionIdle':_0x3cd4f4[_0x482b('0x30b')],'width':_0x3cd4f4[_0x482b('0x103')]||0x40,'height':_0x3cd4f4[_0x482b('0x471')]||0x40,'anchorX':_0x3cd4f4[_0x482b('0x2cf')]||0x0,'anchorY':_0x3cd4f4['AnchorY']||0x0,'shadow':_0x3cd4f4[_0x482b('0x541')]};if(_0x516e42[_0x482b('0x17')](/<ATTACK ANIMATION:[ ](\d+)>/i)){if(_0x482b('0x153')!==_0x482b('0x17d'))this[_0x482b('0x580')]=Number(RegExp['$1']);else{function _0x3e7b55(){this[_0x482b('0x2a0')]['svShadow']=!![];}}}const _0x296755=this[_0x482b('0x5aa')];if(_0x516e42[_0x482b('0x17')](/<SIDEVIEW BATTLER: (.*)>/i)){if(_0x482b('0x200')!==_0x482b('0x200')){function _0x2e4db2(){this[_0x482b('0x260')](_0x482b('0x2e1'),_0x3b1ea3);if(!_0x9972f['BattleCore'][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x22e')])return;this[_0x482b('0x260')](_0x482b('0x642'),_0x524e9e[_0x482b('0x340')]['format'](_0x5e790c[_0x482b('0x665')]()));}}else _0x296755[_0x482b('0x665')]=String(RegExp['$1']);}else{if(_0x516e42[_0x482b('0x17')](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x5df741=String(RegExp['$1'])[_0x482b('0xe0')](/[\r\n]+/)['remove']('');_0x296755[_0x482b('0x665')]=DataManager['processRandomizedData'](_0x5df741);}}if(_0x516e42[_0x482b('0x17')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)){if('RcRHf'==='NGrcu'){function _0x370247(){_0x4cf86d['BattleCore'][_0x482b('0x266')][_0x482b('0x460')](this),this[_0x482b('0x1c1')]();}}else _0x296755[_0x482b('0x32c')]=eval(RegExp['$1']),_0x296755[_0x482b('0x516')]=eval(RegExp['$2']);}if(_0x516e42[_0x482b('0x17')](/<SIDEVIEW COLLAPSE>/i))_0x296755[_0x482b('0x222')]=!![];else{if(_0x516e42[_0x482b('0x17')](/<SIDEVIEW NO COLLAPSE>/i)){if(_0x482b('0x37')===_0x482b('0x5d3')){function _0x1e085b(){const _0x4bc88a=_0x1a3337[_0x482b('0x6b0')](_0x721894['x'],_0x382047['y']);if(this[_0x482b('0x687')]&&this[_0x482b('0x687')][_0x4bc88a])return this[_0x482b('0x687')][_0x4bc88a];return _0x46c8ed[_0x482b('0x654')]['Game_Map_battleback1Name'][_0x482b('0x460')](this);}}else _0x296755[_0x482b('0x222')]=![];}}if(_0x516e42[_0x482b('0x17')](/<SIDEVIEW SHOW SHADOW>/i))_0x296755[_0x482b('0x3b6')]=!![];else _0x516e42[_0x482b('0x17')](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x296755[_0x482b('0x3b6')]=![]);if(_0x516e42[_0x482b('0x17')](/<SIDEVIEW IDLE MOTION: (.*)>/i)){if(_0x482b('0x57b')!=='eRZMt'){function _0x35c8f8(){const _0x24ace5=this[_0x482b('0x715')]['svBattlerData']();this[_0x482b('0x615')]=new _0x5ed3f3(_0x24ace5['width'],_0x24ace5['height']);}}else _0x296755[_0x482b('0x5f3')]=String(RegExp['$1'])[_0x482b('0x515')]()['trim']();}else{if(_0x516e42[_0x482b('0x17')](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){const _0x5245f6=String(RegExp['$1'])[_0x482b('0xe0')](/[\r\n]+/)[_0x482b('0x768')]('');_0x296755[_0x482b('0x5f3')]=DataManager['processRandomizedData'](_0x5245f6);}}if(_0x516e42[_0x482b('0x17')](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)){if(_0x482b('0x44e')!==_0x482b('0x3fd'))_0x296755[_0x482b('0x2d0')]=Number(RegExp['$1']),_0x296755[_0x482b('0x2c3')]=Number(RegExp['$2']);else{function _0x44a67d(){if(!this[_0x482b('0x59a')]())return;const _0x3826ba=this[_0x482b('0x58a')](),_0x213fad=_0x3a9cfd[_0x482b('0x654')]['Settings'][_0x482b('0x387')][_0x482b('0x19c')],_0x441454=_0x3826ba==='text'?_0x3c7580[_0x482b('0x58')]:_0x482b('0xbb')[_0x482b('0x658')](_0x213fad,_0x57858a['options']),_0x4fc7c6=this[_0x482b('0x2be')]();this[_0x482b('0x628')](_0x441454,_0x482b('0x58'),_0x4fc7c6);}}}if(_0x516e42[_0x482b('0x17')](/<SIDEVIEW WEAPON: (.*)>/i))_0x296755['wtypeId']=DataManager[_0x482b('0x2af')](RegExp['$1']);else{if(_0x516e42[_0x482b('0x17')](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){if('pNlGT'!==_0x482b('0x648')){function _0x25390a(){_0x542f14[_0x482b('0x654')][_0x482b('0x2e2')][_0x482b('0x460')](this),this['updateFlip'](),this['updateHpGaugePosition']();}}else{const _0x49083a=String(RegExp['$1'])[_0x482b('0xe0')](/[\r\n]+/)['remove'](''),_0x37f193=DataManager[_0x482b('0x454')](_0x49083a);_0x296755[_0x482b('0x61d')]=DataManager[_0x482b('0x2af')](_0x37f193);}}}if(Imported[_0x482b('0x112')]){const _0x17a334=this[_0x482b('0xd5')]();for(const _0x2c9434 of _0x17a334){const _0x3f4bd8=this[_0x482b('0x22c')](_0x2c9434)[_0x482b('0xd8')][_0x482b('0x53e')]()[_0x482b('0x6b6')](),_0x287805=_0x2c9434['toUpperCase']()[_0x482b('0x6b6')]();if(_0x516e42[_0x482b('0x17')](VisuMZ[_0x482b('0x5c6')][_0x482b('0x237')][_0x482b('0x728')[_0x482b('0x658')](_0x287805,_0x3f4bd8)])){if('TMDhI'===_0x482b('0x128')){function _0x142486(){this[_0x482b('0x1d5')]['x']=-this[_0x482b('0x1d5')][_0x482b('0x2d0')]-0x4;}}else _0x296755['name']=String(RegExp['$1']);}else{if(_0x516e42[_0x482b('0x17')](VisuMZ[_0x482b('0x5c6')][_0x482b('0x237')][_0x482b('0x707')[_0x482b('0x658')](_0x287805,_0x3f4bd8)])){const _0x4f739b=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x482b('0x768')]('');_0x296755[_0x482b('0x665')]=DataManager[_0x482b('0x454')](_0x4f739b);}}if(_0x516e42[_0x482b('0x17')](VisuMZ[_0x482b('0x5c6')]['RegExp']['SvWeaponSolo-%1-%2'[_0x482b('0x658')](_0x287805,_0x3f4bd8)]))_0x296755[_0x482b('0x61d')]=DataManager['getWtypeIdWithName'](RegExp['$1']);else{if(_0x516e42[_0x482b('0x17')](VisuMZ[_0x482b('0x5c6')]['RegExp'][_0x482b('0x5f5')[_0x482b('0x658')](_0x287805,_0x3f4bd8)])){if('LgAwF'==='UYSRa'){function _0x357e9d(){const _0x52505b=_0x43c186(_0x4ce9f0['$1'])[_0x482b('0xe0')](/[\r\n]+/)[_0x482b('0x768')]('');_0x2dd316[_0x482b('0x5f3')]=_0x4a195d[_0x482b('0x454')](_0x52505b);}}else{const _0x35dabe=String(RegExp['$1'])[_0x482b('0xe0')](/[\r\n]+/)[_0x482b('0x768')](''),_0x1a4fc8=DataManager[_0x482b('0x454')](_0x35dabe);_0x296755[_0x482b('0x61d')]=DataManager['getWtypeIdWithName'](_0x1a4fc8);}}}if(_0x516e42[_0x482b('0x17')](VisuMZ[_0x482b('0x5c6')]['RegExp'][_0x482b('0x18e')[_0x482b('0x658')](_0x287805,_0x3f4bd8)])){if(_0x482b('0x5f7')===_0x482b('0x5f7'))_0x296755['motionIdle']=String(RegExp['$1'])[_0x482b('0x515')]()[_0x482b('0x6b6')]();else{function _0xde898c(){return!this['isTurnBased']();}}}else{if(_0x516e42[_0x482b('0x17')](VisuMZ[_0x482b('0x5c6')][_0x482b('0x237')]['SvMotionIdleMass-%1-%2'[_0x482b('0x658')](_0x287805,_0x3f4bd8)])){if(_0x482b('0x5df')==='PrjMU'){const _0x2d7ce1=String(RegExp['$1'])[_0x482b('0xe0')](/[\r\n]+/)[_0x482b('0x768')]('');_0x296755[_0x482b('0x5f3')]=DataManager[_0x482b('0x454')](_0x2d7ce1);}else{function _0x135baa(){this[_0x482b('0x723')][_0x482b('0x336')][_0x482b('0x2ce')](this[_0x482b('0xd1')][_0x482b('0xa1')](this));const _0x37c1fe=_0xa7fc9e[_0x482b('0x2b1')];if(_0x37c1fe){if(_0x37c1fe[_0x482b('0x3e4')]()&&!_0x2932a2['isSideView']())return;const _0xcaeda4=_0x37c1fe[_0x482b('0x67c')]();if(_0xcaeda4&&_0x37c1fe['isActor']())this[_0x482b('0x723')][_0x482b('0x2ff')](_0xcaeda4);}}}}}}}},Game_Enemy['prototype']['attackAnimationId1']=function(){return this['_attackAnimationId']||0x0;},Game_Enemy[_0x482b('0x389')][_0x482b('0x3ef')]=function(){return 0x0;},Game_Enemy['prototype']['canBattlerMove']=function(){if(this['enemy']()['note'][_0x482b('0x17')](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler[_0x482b('0x389')][_0x482b('0x4a9')][_0x482b('0x460')](this);},Game_Enemy['prototype'][_0x482b('0xea')]=function(){const _0x456f21=[];for(const _0x2cea3d of this['enemy']()[_0x482b('0x1b7')]){const _0x248f3e=$dataSkills[_0x2cea3d[_0x482b('0x3f8')]];if(_0x248f3e&&!_0x456f21['includes'](_0x248f3e))_0x456f21['push'](_0x248f3e);}return _0x456f21;},Game_Enemy[_0x482b('0x389')][_0x482b('0x440')]=function(){if(this['_svBattlerData']!==undefined)return this[_0x482b('0x5aa')];return this[_0x482b('0x2ae')](),this[_0x482b('0x5aa')];},Game_Enemy[_0x482b('0x389')][_0x482b('0x114')]=function(){return this[_0x482b('0x440')]()[_0x482b('0x665')]!=='';},Game_Enemy[_0x482b('0x389')][_0x482b('0xd3')]=function(){return this[_0x482b('0x440')]()['name'];},Game_Enemy[_0x482b('0x389')][_0x482b('0x141')]=function(_0x15c82a){Game_Battler[_0x482b('0x389')]['performAction'][_0x482b('0x460')](this,_0x15c82a);if(this[_0x482b('0x114')]())this[_0x482b('0x27d')](_0x15c82a);},Game_Enemy[_0x482b('0x389')][_0x482b('0x539')]=function(){const _0x2bb2c0=this[_0x482b('0x440')]()[_0x482b('0x61d')]||0x0,_0x2f5ee5=$dataSystem['attackMotions'][_0x2bb2c0];if(_0x2f5ee5){if('PXRas'===_0x482b('0x3eb')){function _0x383247(){const _0x139666='\x5cI[%1]%2';let _0x2efda0=_0x4547a5[_0x482b('0x692')],_0x71a0ac=_0x4c33b8[_0x482b('0x665')];const _0x474f3a=_0x588a7d[_0x482b('0x4ed')];return _0x474f3a[_0x482b('0x17')](/<DISPLAY ICON: (\d+)>/i)&&(_0x2efda0=_0x1b9c6d(_0x554378['$1'])),_0x474f3a[_0x482b('0x17')](/<DISPLAY TEXT: (.*)>/i)&&(_0x71a0ac=_0x4cf057(_0x7aad29['$1'])),_0x139666['format'](_0x2efda0,_0x71a0ac);}}else{if(_0x2f5ee5['type']===0x0){if(_0x482b('0x1d0')===_0x482b('0x4c3')){function _0x1b9f2f(){_0x3f18ce=_0x482b('0x161');}}else this[_0x482b('0x370')](_0x482b('0x608'));}else{if(_0x2f5ee5['type']===0x1){if(_0x482b('0x5ed')===_0x482b('0x5ed'))this[_0x482b('0x370')](_0x482b('0x2b6'));else{function _0x316b14(){return _0x2f87f9[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x28f')][_0x482b('0x70e')]['call'](this);}}}else{if(_0x2f5ee5[_0x482b('0x49c')]===0x2){if(_0x482b('0x5f2')!=='NcLSG'){function _0x4ec4cc(){return 0x0;}}else this[_0x482b('0x370')]('missile');}}}this['startWeaponAnimation'](_0x2f5ee5[_0x482b('0x3b7')]);}}},Game_Enemy[_0x482b('0x389')][_0x482b('0x3d4')]=function(){const _0x38926c=this[_0x482b('0x440')]()[_0x482b('0x61d')]||0x0;return $dataSystem[_0x482b('0x1ad')][_0x38926c];},Game_Enemy[_0x482b('0x389')]['performDamage']=function(){Game_Battler[_0x482b('0x389')][_0x482b('0x366')][_0x482b('0x460')](this),this[_0x482b('0x1bc')]()&&this[_0x482b('0x114')]()&&this[_0x482b('0x370')](_0x482b('0x784')),SoundManager[_0x482b('0x6f3')]();},Game_Enemy[_0x482b('0x389')][_0x482b('0x70a')]=function(){Game_Battler['prototype'][_0x482b('0x70a')][_0x482b('0x460')](this),this[_0x482b('0x370')](_0x482b('0xc8'));},Game_Enemy['prototype'][_0x482b('0x2b4')]=function(){Game_Battler[_0x482b('0x389')][_0x482b('0x2b4')][_0x482b('0x460')](this),this[_0x482b('0x370')](_0x482b('0xc8'));},Game_Enemy['prototype'][_0x482b('0x747')]=function(){Game_Battler[_0x482b('0x389')][_0x482b('0x747')][_0x482b('0x460')](this),this[_0x482b('0x539')]();},Game_Enemy[_0x482b('0x389')][_0x482b('0x2f4')]=function(){if(this[_0x482b('0x114')]()){if(this[_0x482b('0x616')]()>=0x1)return!![];return this['svBattlerData']()['collapse'];}else{if('UhGDi'===_0x482b('0x59')){function _0x397cfd(){const _0x2befe2=this[_0x482b('0x596')]()[_0x482b('0x736')];return _0x2befe2[_0x482b('0x17')](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);}}else return!![];}},Game_Enemy[_0x482b('0x389')][_0x482b('0x653')]=function(){return this['svBattlerData']()['anchorX'];},Game_Enemy[_0x482b('0x389')]['svBattlerAnchorY']=function(){return this[_0x482b('0x440')]()[_0x482b('0x516')];},Game_Enemy[_0x482b('0x389')][_0x482b('0x45f')]=function(){return this[_0x482b('0x440')]()['shadow'];},VisuMZ[_0x482b('0x654')][_0x482b('0x572')]=Game_Enemy[_0x482b('0x389')][_0x482b('0x613')],Game_Enemy['prototype'][_0x482b('0x613')]=function(_0xe090ad){VisuMZ[_0x482b('0x654')][_0x482b('0x572')][_0x482b('0x460')](this,_0xe090ad),this['clearBattleCoreData'](),this['setupBattleCoreData']();const _0x116376=this[_0x482b('0x67c')]();if(_0x116376)_0x116376[_0x482b('0x352')](this);},Game_Unit[_0x482b('0x389')][_0x482b('0x6bf')]=function(_0x919dae){for(const _0x42e65a of this[_0x482b('0x264')]()){if(_0x42e65a)_0x42e65a[_0x482b('0x6bf')](_0x919dae);}},Game_Unit['prototype'][_0x482b('0x292')]=function(){const _0x295e78=this[_0x482b('0x24')]();return _0x295e78[Math[_0x482b('0x4cc')](_0x295e78[_0x482b('0x5b8')])];},VisuMZ[_0x482b('0x654')][_0x482b('0x7d')]=Game_Map[_0x482b('0x389')][_0x482b('0x25')],Game_Map['prototype'][_0x482b('0x25')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x7d')][_0x482b('0x460')](this),this['setupBattlebackBattleCore']();},Game_Map[_0x482b('0x389')]['setupBattlebackBattleCore']=function(){this[_0x482b('0x687')]={},this[_0x482b('0x15c')]={};if(!$dataMap)return;const _0xfa1102=$dataMap[_0x482b('0x4ed')];if(!_0xfa1102)return;const _0x2c0c3=_0xfa1102[_0x482b('0x17')](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x2c0c3){if(_0x482b('0x657')!==_0x482b('0x657')){function _0x3b9cb7(){_0x2100d7=(_0x32ff4d+_0x1e4e38)/0x2;}}else for(const _0x4b6a12 of _0x2c0c3){if(_0x482b('0xe9')===_0x482b('0x599')){function _0x5374f0(){this[_0x482b('0x32e')]=this[_0x482b('0x3c0')](this[_0x482b('0x32e')],this[_0x482b('0x2b7')],_0x6e0355,_0x5726c8,_0x2a4214);}}else{_0x4b6a12[_0x482b('0x17')](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x16736c=Number(RegExp['$1']),_0x3a97b2=Number(RegExp['$2']),_0x1808db=_0x3a97b2===0x1?this[_0x482b('0x687')]:this[_0x482b('0x15c')],_0x321926=String(RegExp['$3']);_0x1808db[_0x16736c]=_0x321926;}}}},VisuMZ[_0x482b('0x654')][_0x482b('0x6f8')]=Game_Map[_0x482b('0x389')][_0x482b('0x1fb')],Game_Map['prototype'][_0x482b('0x1fb')]=function(){const _0x5e72ad=$gamePlayer[_0x482b('0x6b0')]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x482b('0x687')]&&this[_0x482b('0x687')][_0x5e72ad])return this[_0x482b('0x687')][_0x5e72ad];return VisuMZ['BattleCore'][_0x482b('0x6f8')][_0x482b('0x460')](this);},VisuMZ['BattleCore'][_0x482b('0x700')]=Game_Map[_0x482b('0x389')][_0x482b('0x6df')],Game_Map[_0x482b('0x389')]['battleback2Name']=function(){const _0x170407=$gamePlayer[_0x482b('0x6b0')]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x482b('0x687')]&&this[_0x482b('0x15c')][_0x170407])return this[_0x482b('0x15c')][_0x170407];return VisuMZ[_0x482b('0x654')]['Game_Map_battleback2Name']['call'](this);},VisuMZ[_0x482b('0x654')][_0x482b('0x374')]=Game_Interpreter['prototype'][_0x482b('0x78d')],Game_Interpreter[_0x482b('0x389')][_0x482b('0x78d')]=function(_0xcb1c77){return $gameTemp[_0x482b('0x678')](this),VisuMZ[_0x482b('0x654')]['Game_Interpreter_PluginCommand'][_0x482b('0x460')](this,_0xcb1c77);},VisuMZ['BattleCore'][_0x482b('0x15e')]=Game_Interpreter['prototype']['updateWaitMode'],Game_Interpreter[_0x482b('0x389')][_0x482b('0x391')]=function(){if(SceneManager[_0x482b('0x23a')]()){if(_0x482b('0xc3')==='ygwax')switch(this[_0x482b('0x215')]){case _0x482b('0x4fc'):if(BattleManager['_spriteset'][_0x482b('0x5dc')]())return!![];this[_0x482b('0x215')]='';break;case _0x482b('0x1c8'):if(Imported[_0x482b('0x66a')]){if(_0x482b('0x536')!==_0x482b('0x32')){if($gameScreen[_0x482b('0x5b4')]()[_0x482b('0xad')]>0x0)return!![];if($gameScreen[_0x482b('0x5b4')]()[_0x482b('0x11e')]>0x0)return!![];this[_0x482b('0x215')]='';break;}else{function _0x238c41(){return _0xcb72f7[_0x482b('0x654')]['Game_Action_isForFriend'][_0x482b('0x460')](this);}}}case _0x482b('0x10c'):if(BattleManager[_0x482b('0x5f')][_0x482b('0x4d1')]())return!![];this[_0x482b('0x215')]='';break;case _0x482b('0x306'):if(BattleManager['_spriteset'][_0x482b('0x2d')]())return!![];this[_0x482b('0x215')]='';break;case _0x482b('0x664'):if(BattleManager[_0x482b('0x5f')][_0x482b('0x533')]())return!![];this[_0x482b('0x215')]='';break;case _0x482b('0x1bb'):if(BattleManager[_0x482b('0x695')]['isBusy']())return!![];this[_0x482b('0x215')]='';break;case _0x482b('0x424'):if(BattleManager[_0x482b('0x5f')][_0x482b('0x757')]())return!![];this[_0x482b('0x215')]='';break;case _0x482b('0x177'):if(BattleManager[_0x482b('0x5f')][_0x482b('0x1c0')]())return!![];this[_0x482b('0x215')]='';break;case _0x482b('0x6c8'):if(Imported[_0x482b('0x66a')]){if(_0x482b('0x3a')===_0x482b('0x146')){function _0x58e853(){let _0x515a34=_0x4ef69a[_0x482b('0x654')][_0x482b('0x1de')][_0x482b('0x460')](this);const _0x46abaf=_0x5662d5[_0x482b('0x654')][_0x482b('0x21a')];if(_0x46abaf[_0x482b('0x28f')][_0x482b('0x4e4')]&&_0x46abaf[_0x482b('0x28f')]['AdjustRect'])_0x515a34+=0x2;if(_0x46abaf[_0x482b('0x59c')][_0x482b('0x4e4')]&&_0x46abaf[_0x482b('0x59c')][_0x482b('0x187')])_0x515a34+=0x1;return _0x515a34;}}else{if($gameScreen[_0x482b('0x5b4')]()[_0x482b('0x6e3')]>0x0)return!![];this[_0x482b('0x215')]='';break;}}}else{function _0x5d915d(){return _0x1a6e71[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2dd')][_0x482b('0x47f')];}}}return VisuMZ[_0x482b('0x654')][_0x482b('0x15e')]['call'](this);},VisuMZ[_0x482b('0x654')]['Game_Interpreter_setup']=Game_Interpreter[_0x482b('0x389')][_0x482b('0xb6')],Game_Interpreter['prototype']['setup']=function(_0x3ac812,_0x468ee8){VisuMZ[_0x482b('0x654')]['Game_Interpreter_setup'][_0x482b('0x460')](this,_0x3ac812,_0x468ee8),this['_list']=JsonEx[_0x482b('0x4a')](this[_0x482b('0xe3')]),this[_0x482b('0x37c')]();},Game_Interpreter[_0x482b('0x389')][_0x482b('0x37c')]=function(){const _0x5d3a19=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2c1')];for(const _0xdc7fda of this[_0x482b('0xe3')]){if(!_0xdc7fda)continue;if(_0xdc7fda[_0x482b('0x1a7')]===0x12d&&!!_0x5d3a19[_0x482b('0x6fd')]){if('ALOQL'==='scKSZ'){function _0x2334b9(){_0x46b88c[_0x482b('0x654')][_0x482b('0x5ce')][_0x482b('0x460')](this),this['updateBattlerContainer']();}}else{if(_0xdc7fda[_0x482b('0x640')])continue;_0xdc7fda[_0x482b('0x640')]=!![];const _0xcf9976=this[_0x482b('0xe3')][_0x482b('0x2d9')](_0xdc7fda),_0x1fce32=_0x5d3a19[_0x482b('0x6fd')],_0x254196={'code':0x75,'index':_0xdc7fda[_0x482b('0x508')],'parameters':[_0x1fce32]};this['_list'][_0x482b('0x709')](_0xcf9976,0x0,_0x254196);}}}},VisuMZ[_0x482b('0x654')][_0x482b('0x14c')]=BattleManager[_0x482b('0x49f')],BattleManager[_0x482b('0x49f')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x14c')][_0x482b('0x460')](this),this[_0x482b('0x451')]();},BattleManager[_0x482b('0x451')]=function(){const _0x5359b5=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['Mechanics'];_0x5359b5[_0x482b('0x6fd')]&&(this[_0x482b('0x793')]=!![],$gameTemp['reserveCommonEvent'](_0x5359b5['BattleStartEvent']),$gameMap[_0x482b('0x760')](),$gameMap[_0x482b('0x373')][_0x482b('0x29e')]=!![]);},VisuMZ[_0x482b('0x654')][_0x482b('0x3a0')]=Scene_Map[_0x482b('0x389')]['launchBattle'],Scene_Map['prototype']['launchBattle']=function(){BattleManager[_0x482b('0x793')]?this[_0x482b('0x188')]():VisuMZ['BattleCore'][_0x482b('0x3a0')][_0x482b('0x460')](this);},Scene_Map['prototype'][_0x482b('0x188')]=function(){this[_0x482b('0x411')]=!![];},VisuMZ[_0x482b('0x654')]['SceneManager_isSceneChanging']=SceneManager['isSceneChanging'],SceneManager[_0x482b('0x218')]=function(){if(BattleManager[_0x482b('0x793')])return![];return VisuMZ[_0x482b('0x654')][_0x482b('0x5ca')][_0x482b('0x460')](this);},VisuMZ[_0x482b('0x654')][_0x482b('0xdc')]=Game_Interpreter[_0x482b('0x389')]['terminate'],Game_Interpreter['prototype'][_0x482b('0x6ed')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0xdc')][_0x482b('0x460')](this),this[_0x482b('0x29e')]&&(this[_0x482b('0x29e')]=undefined,SceneManager[_0x482b('0x455')][_0x482b('0x34d')]());},Scene_Map[_0x482b('0x389')][_0x482b('0x34d')]=function(){BattleManager['_battleCoreBattleStartEvent']=undefined,this['stop']();},VisuMZ[_0x482b('0x654')][_0x482b('0x761')]=Scene_ItemBase[_0x482b('0x389')][_0x482b('0x3cd')],Scene_ItemBase[_0x482b('0x389')][_0x482b('0x3cd')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x761')][_0x482b('0x460')](this);if(this[_0x482b('0x596')]()[_0x482b('0x4ed')][_0x482b('0x17')](/<CUSTOM ACTION SEQUENCE>/i)){if(_0x482b('0x6da')!=='aPRrR'){function _0x108f2d(){const _0x31244e=_0x262f11[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x50d')],_0x44bb79=this[_0x482b('0x164')]&&this[_0x482b('0x164')][_0x482b('0x3e4')]()?0x1:-0x1,_0x6da5aa=this[_0x482b('0x28e')]-this[_0x482b('0x41e')]+_0x44bb79*_0x31244e[_0x482b('0xfa')],_0x1345f7=this[_0x482b('0x11')]-this[_0x482b('0x10a')]+_0x44bb79*_0x31244e[_0x482b('0x1d6')],_0x30c7ab=_0x31244e[_0x482b('0x4d9')];this[_0x482b('0x18d')](_0x6da5aa,_0x1345f7,_0x30c7ab);}}else $gameTemp[_0x482b('0x652')]=[];}},VisuMZ[_0x482b('0x654')][_0x482b('0x1de')]=Scene_Options[_0x482b('0x389')][_0x482b('0x78f')],Scene_Options[_0x482b('0x389')]['maxCommands']=function(){let _0x5bf19a=VisuMZ[_0x482b('0x654')][_0x482b('0x1de')]['call'](this);const _0x178832=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')];if(_0x178832[_0x482b('0x28f')][_0x482b('0x4e4')]&&_0x178832[_0x482b('0x28f')][_0x482b('0x187')])_0x5bf19a+=0x2;if(_0x178832[_0x482b('0x59c')][_0x482b('0x4e4')]&&_0x178832[_0x482b('0x59c')][_0x482b('0x187')])_0x5bf19a+=0x1;return _0x5bf19a;},VisuMZ['BattleCore'][_0x482b('0x8')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x567')],Scene_Battle[_0x482b('0x389')][_0x482b('0x567')]=function(){if(SceneManager[_0x482b('0x14b')]()){if('DsGQg'!==_0x482b('0x4db'))Scene_Message[_0x482b('0x389')][_0x482b('0x567')]['call'](this);else{function _0xa75b19(){if(this[_0x482b('0x301')]()===_0x482b('0x6ff'))return this[_0x482b('0x527')]();else return this[_0x482b('0x287')]()?this[_0x482b('0x40c')]():_0x195059[_0x482b('0x654')][_0x482b('0x5bc')][_0x482b('0x460')](this);}}}else VisuMZ['BattleCore'][_0x482b('0x8')][_0x482b('0x460')](this);},VisuMZ[_0x482b('0x654')][_0x482b('0x1d7')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x456')],Scene_Battle['prototype']['stop']=function(){if(SceneManager['isNextSceneBattleTransitionable']()){if(_0x482b('0x202')===_0x482b('0x25f')){function _0x3fcc64(){this[_0x482b('0x164')][_0x482b('0x1bc')]()&&this[_0x482b('0x5ba')]();}}else Scene_Message[_0x482b('0x389')]['stop']['call'](this);}else VisuMZ[_0x482b('0x654')][_0x482b('0x1d7')]['call'](this);},VisuMZ['BattleCore']['Scene_Battle_terminate']=Scene_Battle[_0x482b('0x389')][_0x482b('0x6ed')],Scene_Battle[_0x482b('0x389')][_0x482b('0x6ed')]=function(){SceneManager['isNextSceneBattleTransitionable']()?Scene_Message[_0x482b('0x389')][_0x482b('0x6ed')][_0x482b('0x460')](this):VisuMZ[_0x482b('0x654')][_0x482b('0x562')][_0x482b('0x460')](this);},Scene_Battle[_0x482b('0x389')][_0x482b('0x3d2')]=function(){if(ConfigManager[_0x482b('0x64d')]&&ConfigManager[_0x482b('0x231')]!==undefined){if(_0x482b('0x2c6')!=='yqusJ'){function _0x6e7e91(){const _0x1e1824=_0x1df6c7[_0x482b('0x291')](this[_0x482b('0x464')]),_0x285998=_0x260914[_0x482b('0x4e0')][_0x1e1824];if(!_0x285998)return this['getItemDamageAmountLabelOriginal']();const _0x2f41aa=_0x482b('0x1f2')[_0x482b('0x658')](this[_0x482b('0x464')][_0x482b('0x784')][_0x482b('0x49c')]),_0x1f168b=[null,_0x545989['hp'],_0x1370f4['mp'],_0x26379f['hp'],_0x232c7a['mp'],_0x3aad94['hp'],_0x4ca68a['mp']][this[_0x482b('0x464')]['damage'][_0x482b('0x49c')]];return _0x285998[_0x2f41aa][_0x482b('0x658')](_0x1f168b);}}else return ConfigManager[_0x482b('0x231')];}else{if(this[_0x482b('0x301')]()===_0x482b('0x6ff')){if('xECBN'===_0x482b('0x581')){function _0xf5366d(){if(_0x2d9d97['match'](/(.*):[ ](\d+)/i)){const _0x242938=_0x57c8c2(_0x19ff60['$1'])[_0x482b('0x6b6')](),_0x51ca34=_0x19204e(_0x5ba04f['$2']);_0x3eef25[_0x242938]=_0x51ca34,_0x2967c0+=_0x51ca34;}else{if(_0x5b977c[_0x482b('0x17')](/(.*):[ ](\d+\.?\d+)/i)){const _0x1472e5=_0x3e086f(_0x8a445['$1'])[_0x482b('0x6b6')](),_0xc30801=_0x5421e1(_0x25dde2['$2']);_0x288660[_0x1472e5]=_0xc30801,_0x151967+=_0xc30801;}else _0x2b6d40!==''&&(_0x40d6ae[_0x9b8055]=0x1,_0x32722e++);}}}else return![];}else{if(_0x482b('0x689')!==_0x482b('0x69d')){return Scene_Message['prototype'][_0x482b('0x3d2')][_0x482b('0x460')](this);;}else{function _0x173b59(){const _0x32d1d8=this[_0x482b('0x164')]&&this['_battler']['isBattlerFlipped']();this[_0x482b('0x325')]['x']=(_0x32d1d8?-0x1:0x1)*_0x459c22[_0x482b('0x5b0')](this[_0x482b('0x325')]['x']);}}}}},VisuMZ['BattleCore'][_0x482b('0x368')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x663')],Scene_Battle[_0x482b('0x389')]['createAllWindows']=function(){this['createEnemyNameContainer'](),VisuMZ[_0x482b('0x654')][_0x482b('0x368')][_0x482b('0x460')](this),this[_0x482b('0x5f8')]();},VisuMZ['BattleCore'][_0x482b('0x271')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x746')],Scene_Battle[_0x482b('0x389')][_0x482b('0x746')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x271')][_0x482b('0x460')](this);if(this[_0x482b('0x301')]()===_0x482b('0x6ff')){if(_0x482b('0x18f')!==_0x482b('0x18f')){function _0x13274d(){this[_0x482b('0x206')]['setFrame'](0x0,0x0,0x0,0x0);}}else this[_0x482b('0x3c2')]();}},Scene_Battle['prototype']['setVisibleUI']=function(_0x306023){_0x306023?(this[_0x482b('0x1c4')]['x']=(Graphics[_0x482b('0x2d0')]-Graphics[_0x482b('0x6b4')])/0x2,this[_0x482b('0x1c4')]['y']=(Graphics[_0x482b('0x2c3')]-Graphics['boxHeight'])/0x2):(this['_windowLayer']['x']=Graphics[_0x482b('0x2d0')]*0xa,this[_0x482b('0x1c4')]['y']=Graphics[_0x482b('0x2c3')]*0xa);},VisuMZ[_0x482b('0x654')]['Scene_Battle_selectNextCommand']=Scene_Battle['prototype']['selectNextCommand'],Scene_Battle[_0x482b('0x389')][_0x482b('0x4b4')]=function(){const _0x1c7a3d=BattleManager[_0x482b('0x52d')]();if(_0x1c7a3d)_0x1c7a3d[_0x482b('0x67c')]()[_0x482b('0x305')]();VisuMZ[_0x482b('0x654')][_0x482b('0x4c5')][_0x482b('0x460')](this);},VisuMZ['BattleCore'][_0x482b('0x66c')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x3a4')],Scene_Battle[_0x482b('0x389')]['selectPreviousCommand']=function(){const _0x1a539d=BattleManager[_0x482b('0x52d')]();if(_0x1a539d)_0x1a539d['battler']()[_0x482b('0x305')]();VisuMZ[_0x482b('0x654')][_0x482b('0x66c')][_0x482b('0x460')](this);},VisuMZ[_0x482b('0x654')][_0x482b('0xb1')]=Scene_Battle[_0x482b('0x389')]['logWindowRect'],Scene_Battle['prototype'][_0x482b('0x4f3')]=function(){if(VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')]['BattleLogRectJS'])return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x106')][_0x482b('0x460')](this);return VisuMZ[_0x482b('0x654')][_0x482b('0xb1')][_0x482b('0x460')](this);},VisuMZ[_0x482b('0x654')][_0x482b('0x713')]=Scene_Battle[_0x482b('0x389')]['createPartyCommandWindow'],Scene_Battle[_0x482b('0x389')]['createPartyCommandWindow']=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x713')][_0x482b('0x460')](this),this[_0x482b('0x47d')]();},Scene_Battle[_0x482b('0x389')][_0x482b('0x47d')]=function(){const _0x39b42e=this[_0x482b('0x3d6')];_0x39b42e[_0x482b('0x30')](_0x482b('0x789'),this[_0x482b('0x46d')]['bind'](this)),_0x39b42e['setHandler'](_0x482b('0x58'),this[_0x482b('0x8c')][_0x482b('0xa1')](this));const _0x5165cd=this[_0x482b('0x301')]();switch(_0x5165cd){case'xp':case'portrait':return this['_partyCommandWindow']['setBackgroundType'](0x1);break;}},Scene_Battle[_0x482b('0x389')][_0x482b('0x46d')]=function(){BattleManager[_0x482b('0x2c9')]=!![],$gameParty['makeActions'](),this[_0x482b('0x4b4')]();},Scene_Battle[_0x482b('0x389')]['commandOptions']=function(){this[_0x482b('0x6fe')]()?(this['_callSceneOptions']=!![],this[_0x482b('0x695')][_0x482b('0x260')](_0x482b('0x642'),VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['PartyCmd']['ActiveTpbOptionsMessage'])):this[_0x482b('0xed')]();},Scene_Battle[_0x482b('0x389')][_0x482b('0x6fe')]=function(){return BattleManager[_0x482b('0x770')]();},Scene_Battle[_0x482b('0x389')][_0x482b('0xed')]=function(){this['_callSceneOptions']=![],this[_0x482b('0x5f')][_0x482b('0x353')](),this[_0x482b('0x1c4')][_0x482b('0x15f')]=![],SceneManager[_0x482b('0xbf')](),SceneManager['push'](Scene_Options);},VisuMZ[_0x482b('0x654')]['Scene_Battle_updateBattleProcess']=Scene_Battle['prototype'][_0x482b('0x412')],Scene_Battle[_0x482b('0x389')]['updateBattleProcess']=function(){VisuMZ['BattleCore'][_0x482b('0x168')]['call'](this);if(this[_0x482b('0x6ee')]&&!BattleManager['_subject'])this[_0x482b('0xed')]();},Scene_Battle[_0x482b('0x389')][_0x482b('0x5f8')]=function(){const _0x346925=this[_0x482b('0x67a')]();this[_0x482b('0x17c')]=new Window_AutoBattleCancel(_0x346925),this[_0x482b('0x17c')][_0x482b('0x83')](),this[_0x482b('0x2ff')](this[_0x482b('0x17c')]);},Scene_Battle[_0x482b('0x389')][_0x482b('0x67a')]=function(){return VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x28f')][_0x482b('0x70e')][_0x482b('0x460')](this);},Scene_Battle[_0x482b('0x389')][_0x482b('0x2fd')]=function(){return VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x387')]['DisablePartyCmd'];},VisuMZ['BattleCore'][_0x482b('0x5d6')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x393')],Scene_Battle['prototype'][_0x482b('0x393')]=function(){if(this[_0x482b('0x2fd')]())this[_0x482b('0x4b4')]();else{if('VrVgd'===_0x482b('0x63a'))VisuMZ[_0x482b('0x654')][_0x482b('0x5d6')][_0x482b('0x460')](this);else{function _0x39fde1(){if(!_0x1ac441)return![];if(!_0x4dc336[_0x482b('0x312')])return![];if(_0x1bc3c4[_0x482b('0x312')]['displayType']!==0x0)return![];if(!_0x3a0d2b[_0x482b('0x56b')][0x0])return![];if(!_0x105734[_0x482b('0x56b')][0x0][_0x482b('0x3e4')]())return![];if(_0x36c3d5[_0x482b('0x386')]())return![];if(!this[_0x482b('0x6f9')]())return![];return _0x4c8208[_0x482b('0x389')]['battleLayoutStyle']()===_0x482b('0x2fa');}}}},VisuMZ[_0x482b('0x654')][_0x482b('0x5e5')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x5a0')],Scene_Battle[_0x482b('0x389')][_0x482b('0x5a0')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x5e5')][_0x482b('0x460')](this),this[_0x482b('0x1f1')]();},Scene_Battle[_0x482b('0x389')][_0x482b('0x1f1')]=function(){const _0x940cfc=this[_0x482b('0x252')];_0x940cfc[_0x482b('0x30')]('escape',this[_0x482b('0x4bf')]['bind'](this)),_0x940cfc[_0x482b('0x30')](_0x482b('0x789'),this[_0x482b('0x14f')][_0x482b('0xa1')](this)),_0x940cfc[_0x482b('0x30')](_0x482b('0x64b'),this[_0x482b('0x2b5')][_0x482b('0xa1')](this));},Scene_Battle[_0x482b('0x389')][_0x482b('0x4bf')]=function(){this[_0x482b('0x172')]();},Scene_Battle[_0x482b('0x389')]['actorCommandAutoBattle']=function(){BattleManager[_0x482b('0x52d')]()[_0x482b('0x5a5')](),BattleManager['finishActorInput'](),BattleManager[_0x482b('0x5e')](),this[_0x482b('0x67e')]();},Scene_Battle[_0x482b('0x389')][_0x482b('0x2b5')]=function(){const _0x8b2ad8=BattleManager[_0x482b('0x140')]();_0x8b2ad8['setSkill'](this[_0x482b('0x252')][_0x482b('0x17e')]()),this[_0x482b('0x5ee')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x72a')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x771')],Scene_Battle[_0x482b('0x389')][_0x482b('0x771')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x72a')][_0x482b('0x460')](this),this[_0x482b('0x5cd')]();},Scene_Battle[_0x482b('0x389')][_0x482b('0x5cd')]=function(){this[_0x482b('0x252')][_0x482b('0x6b2')](this[_0x482b('0x620')]),this[_0x482b('0x3d6')][_0x482b('0x6b2')](this[_0x482b('0x620')]);},Scene_Battle[_0x482b('0x389')]['battleLayoutStyle']=function(){if(this[_0x482b('0x36c')])return this[_0x482b('0x36c')];return this[_0x482b('0x36c')]=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2dd')][_0x482b('0x3d')][_0x482b('0x515')]()[_0x482b('0x6b6')](),this[_0x482b('0x36c')];},VisuMZ[_0x482b('0x654')]['Scene_Battle_windowAreaHeight']=Scene_Battle['prototype']['windowAreaHeight'],Scene_Battle[_0x482b('0x389')][_0x482b('0x77c')]=function(){const _0x31dad7=this[_0x482b('0x301')]();switch(_0x31dad7){case _0x482b('0x42c'):return this[_0x482b('0x3a8')](Math[_0x482b('0x577')](0x1,$gameParty['maxBattleMembers']()),!![]);break;default:return VisuMZ[_0x482b('0x654')][_0x482b('0x62')][_0x482b('0x460')](this);break;}},VisuMZ[_0x482b('0x654')][_0x482b('0x11a')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x4c0')],Scene_Battle[_0x482b('0x389')][_0x482b('0x4c0')]=function(){const _0x17ed34=this[_0x482b('0x301')]();switch(_0x17ed34){case _0x482b('0x6ff'):return this[_0x482b('0x6dc')]();break;case'default':case _0x482b('0x42c'):case'xp':case _0x482b('0x2fa'):default:return VisuMZ['BattleCore'][_0x482b('0x11a')][_0x482b('0x460')](this);break;}},Scene_Battle[_0x482b('0x389')][_0x482b('0x1ac')]=function(){const _0x390f1d=this[_0x482b('0x301')]();switch(_0x390f1d){case'xp':case _0x482b('0x2fa'):return this['statusWindowRectXPStyle']();break;case _0x482b('0x6ff'):return this[_0x482b('0x5c4')]();break;case _0x482b('0x12d'):case _0x482b('0x42c'):default:return this[_0x482b('0x308')]();break;}},VisuMZ['BattleCore']['Scene_Battle_partyCommandWindowRect']=Scene_Battle[_0x482b('0x389')][_0x482b('0x579')],Scene_Battle[_0x482b('0x389')][_0x482b('0x579')]=function(){const _0x46fad8=this['battleLayoutStyle']();switch(_0x46fad8){case'xp':case _0x482b('0x2fa'):return this['partyCommandWindowRectXPStyle']();break;case _0x482b('0x6ff'):return this[_0x482b('0x41a')]();case _0x482b('0x12d'):case _0x482b('0x42c'):default:return VisuMZ[_0x482b('0x654')][_0x482b('0x28')][_0x482b('0x460')](this);break;}},VisuMZ['BattleCore'][_0x482b('0x5d2')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x3a1')],Scene_Battle[_0x482b('0x389')][_0x482b('0x3a1')]=function(){const _0x3d619e=this[_0x482b('0x301')]();switch(_0x3d619e){case'xp':case _0x482b('0x2fa'):case _0x482b('0x6ff'):break;case'default':case'list':default:VisuMZ['BattleCore']['Scene_Battle_updateStatusWindowPosition'][_0x482b('0x460')](this);break;}},VisuMZ[_0x482b('0x654')][_0x482b('0x35f')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x450')],Scene_Battle[_0x482b('0x389')][_0x482b('0x450')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x35f')][_0x482b('0x460')](this),this[_0x482b('0x1cc')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x6c')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x57e')],Scene_Battle[_0x482b('0x389')][_0x482b('0x57e')]=function(){VisuMZ[_0x482b('0x654')]['Scene_Battle_startEnemySelection'][_0x482b('0x460')](this),this[_0x482b('0x285')][_0x482b('0x270')](),this[_0x482b('0x1cc')]();},Scene_Battle[_0x482b('0x389')][_0x482b('0x1cc')]=function(){const _0x2ab564=this[_0x482b('0x301')]();if(['xp',_0x482b('0x2fa'),_0x482b('0x6ff')][_0x482b('0x24d')](_0x2ab564)){if('CRMIM'!==_0x482b('0x4')){function _0x357175(){return _0x2bc09f[_0x482b('0x4ed')]['match'](/<COMMAND ICON: (\d+)>/i)?_0xad77(_0x34fc5d['$1']):_0x41af56[_0x482b('0x692')];}}else this[_0x482b('0x252')][_0x482b('0x462')]();}(_0x2ab564===_0x482b('0x6ff')||this['isSkillItemWindowsMiddle']())&&(this[_0x482b('0x405')][_0x482b('0x462')](),this[_0x482b('0x56f')][_0x482b('0x462')]());},VisuMZ[_0x482b('0x654')][_0x482b('0x363')]=Scene_Battle['prototype']['onActorOk'],Scene_Battle['prototype']['onActorOk']=function(){VisuMZ['BattleCore'][_0x482b('0x363')][_0x482b('0x460')](this),this[_0x482b('0x5ef')]();},VisuMZ['BattleCore'][_0x482b('0x16')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x184')],Scene_Battle['prototype'][_0x482b('0x184')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x16')][_0x482b('0x460')](this),this[_0x482b('0x5ef')]();},Scene_Battle[_0x482b('0x389')][_0x482b('0x5ef')]=function(){const _0x11f2d=this[_0x482b('0x301')]();if(_0x11f2d===_0x482b('0x6ff')||this[_0x482b('0x287')]()){if('lUyUo'===_0x482b('0x89')){function _0x42c055(){_0x5215a1[_0x482b('0x539')]();}}else{this[_0x482b('0x405')][_0x482b('0x3d8')]();if(this[_0x482b('0x405')][_0x482b('0xa5')]){if('BUytm'===_0x482b('0x8a'))this[_0x482b('0x405')][_0x482b('0x68d')]();else{function _0x2c944a(){this['_lines'][_0x482b('0x260')](_0x25b744),this['refresh'](),this['callNextMethod']();}}}this[_0x482b('0x56f')][_0x482b('0x3d8')]();if(this[_0x482b('0x56f')][_0x482b('0xa5')]){if(_0x482b('0x4dd')===_0x482b('0x77b')){function _0x541b5b(){this[_0x482b('0x53c')]('dead');}}else this[_0x482b('0x56f')]['show']();}}}},VisuMZ[_0x482b('0x654')][_0x482b('0x9d')]=Scene_Battle[_0x482b('0x389')][_0x482b('0x19d')],Scene_Battle[_0x482b('0x389')][_0x482b('0x19d')]=function(){VisuMZ['BattleCore'][_0x482b('0x9d')]['call'](this),this[_0x482b('0x5c7')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x617')]=Scene_Battle['prototype'][_0x482b('0x3ed')],Scene_Battle[_0x482b('0x389')][_0x482b('0x3ed')]=function(){VisuMZ[_0x482b('0x654')]['Scene_Battle_onEnemyCancel'][_0x482b('0x460')](this),this['cancelTargetSelectionVisibility']();},Scene_Battle[_0x482b('0x389')][_0x482b('0x5c7')]=function(){const _0x386168=this[_0x482b('0x301')]();['xp',_0x482b('0x2fa'),_0x482b('0x6ff')][_0x482b('0x24d')](_0x386168)&&this[_0x482b('0x252')][_0x482b('0x3d8')](),this[_0x482b('0x5ef')]();},Scene_Battle[_0x482b('0x389')][_0x482b('0x308')]=function(){const _0x170475=Window_BattleStatus['prototype'][_0x482b('0x4f4')](),_0x3682a0=Graphics[_0x482b('0x6b4')]-0xc0,_0x5537b8=this[_0x482b('0x77c')]()+_0x170475,_0x5b2396=this[_0x482b('0x3d2')]()?0x0:Graphics['boxWidth']-_0x3682a0,_0x1d48b0=Graphics[_0x482b('0xfe')]-_0x5537b8+_0x170475;return new Rectangle(_0x5b2396,_0x1d48b0,_0x3682a0,_0x5537b8);},Scene_Battle['prototype'][_0x482b('0x741')]=function(){const _0x22257e=Window_BattleStatus[_0x482b('0x389')][_0x482b('0x4f4')](),_0x3cda4c=Graphics[_0x482b('0x6b4')],_0x5ce888=this[_0x482b('0x77c')]()+_0x22257e,_0x5acf51=0x0,_0x3fc022=Graphics[_0x482b('0xfe')]-_0x5ce888+_0x22257e;return new Rectangle(_0x5acf51,_0x3fc022,_0x3cda4c,_0x5ce888);},Scene_Battle[_0x482b('0x389')][_0x482b('0x792')]=function(){const _0x402207=Graphics[_0x482b('0x6b4')]/0x2,_0x2e80ad=this[_0x482b('0x3a8')](VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2dd')][_0x482b('0x92')],!![]),_0x5b809a=Math[_0x482b('0x49b')]((Graphics[_0x482b('0x6b4')]-_0x402207)/0x2),_0x18ff59=Graphics[_0x482b('0xfe')]-_0x2e80ad-this[_0x482b('0x741')]()[_0x482b('0x2c3')];return new Rectangle(_0x5b809a,_0x18ff59,_0x402207,_0x2e80ad);},Scene_Battle[_0x482b('0x389')][_0x482b('0x6dc')]=function(){const _0xd0cce9=Graphics[_0x482b('0x2d0')],_0x2f884a=Math['round']((Graphics[_0x482b('0x6b4')]-_0xd0cce9)/0x2),_0x156cab=this[_0x482b('0xeb')](),_0x349113=(Graphics[_0x482b('0x2c3')]-Graphics[_0x482b('0xfe')])/-0x2;return new Rectangle(_0x2f884a,_0x349113,_0xd0cce9,_0x156cab);},Scene_Battle[_0x482b('0x389')][_0x482b('0x5c4')]=function(){const _0x5a4250=Graphics[_0x482b('0x2d0')],_0x4429c1=Math[_0x482b('0x49b')]((Graphics[_0x482b('0x6b4')]-_0x5a4250)/0x2),_0x3dd43a=this['calcWindowHeight'](0x4,!![]),_0x3f4c89=Graphics[_0x482b('0xfe')]-_0x3dd43a+(Graphics[_0x482b('0x2c3')]-Graphics[_0x482b('0xfe')])/0x2;return new Rectangle(_0x4429c1,_0x3f4c89,_0x5a4250,_0x3dd43a);},Scene_Battle['prototype'][_0x482b('0x41a')]=function(){const _0x58e6dd=Math[_0x482b('0x35d')](Graphics[_0x482b('0x2d0')]/0x3),_0x1e7448=this[_0x482b('0x3d2')]()?(Graphics[_0x482b('0x2d0')]+Graphics[_0x482b('0x6b4')])/0x2-_0x58e6dd:(Graphics[_0x482b('0x2d0')]-Graphics['boxWidth'])/-0x2,_0xa389fc=this[_0x482b('0x6dc')](),_0x2ed4ba=_0xa389fc['y']+_0xa389fc[_0x482b('0x2c3')],_0x3160a6=this[_0x482b('0x5c4')](),_0x421a66=_0x3160a6['y']-_0x2ed4ba;return new Rectangle(_0x1e7448,_0x2ed4ba,_0x58e6dd,_0x421a66);},Scene_Battle[_0x482b('0x389')][_0x482b('0x527')]=function(){const _0x1fb75b=Math[_0x482b('0x44a')](Graphics[_0x482b('0x2d0')]/0x3),_0x78d306=Math[_0x482b('0x49b')]((Graphics[_0x482b('0x6b4')]-_0x1fb75b)/0x2),_0x43007e=this['partyCommandWindowRectBorderStyle'](),_0x141d53=_0x43007e['y'],_0x5b8910=_0x43007e[_0x482b('0x2c3')];return new Rectangle(_0x78d306,_0x141d53,_0x1fb75b,_0x5b8910);},Scene_Battle[_0x482b('0x389')][_0x482b('0x3c2')]=function(){this[_0x482b('0x1d5')]['y']=this[_0x482b('0x620')]['y']+this[_0x482b('0x620')]['height'];if(this[_0x482b('0x3d2')]()){if(_0x482b('0x171')===_0x482b('0x794')){function _0x2e46dc(){if(!_0x2ae83[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2dd')][_0x482b('0x2fe')])return;const _0x47a7ac=this['actor'](_0x1ff212),_0x11d6a4=this['itemRect'](_0x131873);_0x11d6a4[_0x482b('0x2d0')]=_0x17a45d[_0x482b('0xd')],_0x11d6a4[_0x482b('0x2c3')]-=0x2,this['drawActorFace'](_0x47a7ac,_0x11d6a4['x']+0x1,_0x11d6a4['y']+0x1,_0x11d6a4['width'],_0x11d6a4[_0x482b('0x2c3')]);}}else this[_0x482b('0x1d5')]['x']=-this[_0x482b('0x1d5')][_0x482b('0x2d0')]-0x4;}else this[_0x482b('0x1d5')]['x']=Graphics[_0x482b('0x2d0')]-(Graphics[_0x482b('0x2d0')]-Graphics[_0x482b('0x6b4')])/0x2-this[_0x482b('0x1d5')]['width']-0x4;},VisuMZ[_0x482b('0x654')]['Scene_Battle_skillWindowRect']=Scene_Battle[_0x482b('0x389')][_0x482b('0x76e')],Scene_Battle[_0x482b('0x389')][_0x482b('0x76e')]=function(){if(this['battleLayoutStyle']()===_0x482b('0x6ff'))return this[_0x482b('0x527')]();else return this[_0x482b('0x287')]()?this['skillItemWindowRectMiddle']():VisuMZ[_0x482b('0x654')]['Scene_Battle_skillWindowRect'][_0x482b('0x460')](this);},VisuMZ[_0x482b('0x654')][_0x482b('0x5bc')]=Scene_Battle['prototype'][_0x482b('0x729')],Scene_Battle['prototype'][_0x482b('0x729')]=function(){if(this[_0x482b('0x301')]()==='border')return this['skillItemWindowRectBorderStyle']();else{if(this[_0x482b('0x287')]()){if(_0x482b('0x42f')!==_0x482b('0x163'))return this['skillItemWindowRectMiddle']();else{function _0x1cdf83(){this[_0x482b('0x4ef')]=0x0;}}}else{if(_0x482b('0x4e6')==='hODDB')return VisuMZ[_0x482b('0x654')][_0x482b('0x5bc')][_0x482b('0x460')](this);else{function _0x74b93b(){if(!this[_0x482b('0x77d')]()&&_0x1113d6[_0x482b('0x2c9')])return!![];return _0x371677[_0x482b('0x389')][_0x482b('0x73e')][_0x482b('0x460')](this);}}}}},Scene_Battle[_0x482b('0x389')]['isSkillItemWindowsMiddle']=function(){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['BattleLayout']['SkillItemMiddleLayout'];},Scene_Battle[_0x482b('0x389')][_0x482b('0x40c')]=function(){const _0xe82ca9=Sprite_Button['prototype']['blockWidth']()*0x2+0x4;let _0xcfdcb5=Graphics['boxWidth']-_0xe82ca9;if(Imported[_0x482b('0x64e')]&&SceneManager[_0x482b('0x3a2')]()){if(_0x482b('0x347')===_0x482b('0x699')){function _0x11cf72(){_0x51624c[_0x482b('0x61d')]=_0x4ed05b[_0x482b('0x2af')](_0x45d657['$1']);}}else _0xcfdcb5+=_0xe82ca9;}const _0x4c3b46=this[_0x482b('0x561')](),_0x2bd109=Graphics['boxHeight']-_0x4c3b46-this['statusWindowRect']()[_0x482b('0x2c3')]+Window_BattleStatus[_0x482b('0x389')][_0x482b('0x4f4')](),_0x2964dd=0x0;return new Rectangle(_0x2964dd,_0x4c3b46,_0xcfdcb5,_0x2bd109);},Scene_Battle[_0x482b('0x389')]['createEnemyNameContainer']=function(){this[_0x482b('0x2f0')]=new Sprite(),this[_0x482b('0x2f0')]['x']=this['_windowLayer']['x'],this[_0x482b('0x2f0')]['y']=this[_0x482b('0x1c4')]['y'];const _0x54b685=this[_0x482b('0x336')][_0x482b('0x2d9')](this[_0x482b('0x1c4')]);this[_0x482b('0x6a9')](this['_enemyNameContainer'],_0x54b685);for(let _0x5a21b1=0x0;_0x5a21b1<0x8;_0x5a21b1++){if(_0x482b('0x60f')==='sOQeY'){function _0x4c27c7(){_0x1f36a5[_0x482b('0x654')][_0x482b('0x344')]['call'](this,_0x389752);}}else{const _0x7e5759=new Window_EnemyName(_0x5a21b1);this[_0x482b('0x2f0')][_0x482b('0x2ff')](_0x7e5759);}}},Sprite_Battler[_0x482b('0x5ac')]=VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x50d')][_0x482b('0x2da')],VisuMZ[_0x482b('0x654')]['Sprite_Battler_initMembers']=Sprite_Battler[_0x482b('0x389')][_0x482b('0x6c5')],Sprite_Battler[_0x482b('0x389')]['initMembers']=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x150')][_0x482b('0x460')](this),this['initMembersBattleCore']();},Sprite_Battler[_0x482b('0x389')][_0x482b('0x5d1')]=function(){this[_0x482b('0x28e')]=0x0,this[_0x482b('0x11')]=0x0,this[_0x482b('0x24f')]=0x0,this['_targetFloatHeight']=0x0,this[_0x482b('0x6de')]=0x0,this[_0x482b('0x777')]=0x0,this['_floatEasing']=_0x482b('0x76f'),this[_0x482b('0x4ef')]=0x0,this['_jumpMaxHeight']=0x0,this[_0x482b('0x791')]=0x0,this[_0x482b('0x705')]=0x0,this['_targetOpacity']=0xff,this['_opacityDuration']=0x0,this[_0x482b('0x2cd')]=0x0,this[_0x482b('0x49e')]='Linear';},Sprite_Battler[_0x482b('0x389')][_0x482b('0x5cf')]=function(){return SceneManager[_0x482b('0x23a')]()?SceneManager[_0x482b('0x455')]['_spriteset'][_0x482b('0x33c')]:this[_0x482b('0x27b')];},Sprite_Battler[_0x482b('0x389')][_0x482b('0x111')]=function(_0x3609a4,_0x4956e6){if(!this[_0x482b('0x164')]['isSpriteVisible']())return;const _0x1598b9=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')],_0x183e77=new Sprite_Damage();_0x183e77[_0x482b('0x248')]=_0x1598b9[_0x482b('0x47')],this[_0x482b('0x148')](_0x183e77),_0x183e77[_0x482b('0x111')](_0x3609a4,_0x4956e6),this[_0x482b('0x6ae')](_0x183e77);},Sprite_Battler[_0x482b('0x389')][_0x482b('0x1ff')]=function(_0x51b4fa,_0x11f89a,_0x9bc9b7){if(!this[_0x482b('0x164')][_0x482b('0x1bc')]())return;const _0x36bb0e=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')],_0x15db56=new Sprite_Damage();_0x15db56[_0x482b('0x248')]=_0x36bb0e[_0x482b('0x47')],this[_0x482b('0x148')](_0x15db56),_0x15db56['setupIconTextPopup'](_0x51b4fa,_0x11f89a,_0x9bc9b7),this[_0x482b('0x6ae')](_0x15db56);},Sprite_Battler[_0x482b('0x389')][_0x482b('0x265')]=function(){if(!this[_0x482b('0x164')]['isDamagePopupRequested']())return;while(this[_0x482b('0x164')][_0x482b('0x6c9')]()){if(_0x482b('0x246')===_0x482b('0x246'))this[_0x482b('0x164')]['isSpriteVisible']()&&this[_0x482b('0x5ba')]();else{function _0x4af5e6(){_0x9066f5?this['addImmortal']():this['removeImmortal']();}}}this[_0x482b('0x164')][_0x482b('0x738')](),this[_0x482b('0x164')][_0x482b('0x378')]();},Sprite_Battler[_0x482b('0x389')][_0x482b('0x5ba')]=function(){const _0x4db4bf=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['Damage'],_0x15178e=new Sprite_Damage();_0x15178e[_0x482b('0x248')]=_0x4db4bf['PopupDuration'],this['sortDamageSprites'](_0x15178e),_0x15178e[_0x482b('0xb6')](this['_battler']),this[_0x482b('0x6ae')](_0x15178e);},Sprite_Battler[_0x482b('0x389')][_0x482b('0x6ae')]=function(_0x1a7c66){this['_damages'][_0x482b('0x260')](_0x1a7c66);if(this[_0x482b('0x2a6')]()){if(_0x482b('0x1e7')===_0x482b('0x3dc')){function _0x3d2eb0(){const _0x152ae8=this[_0x482b('0x67a')]();this[_0x482b('0x17c')]=new _0x4e8ca5(_0x152ae8),this[_0x482b('0x17c')][_0x482b('0x83')](),this[_0x482b('0x2ff')](this[_0x482b('0x17c')]);}}else SceneManager[_0x482b('0x455')][_0x482b('0x571')][_0x482b('0x6ae')](_0x1a7c66,this[_0x482b('0x164')]);}else{if(_0x482b('0x43b')==='Mxkrd'){this[_0x482b('0x5cf')]()[_0x482b('0x2ff')](_0x1a7c66);if(SceneManager[_0x482b('0x77')]())_0x1a7c66[_0x482b('0x325')]['x']=-0x1;}else{function _0x11e1b0(){return!![];}}}},Sprite_Battler[_0x482b('0x389')][_0x482b('0x2a6')]=function(){return!$gameSystem[_0x482b('0x386')]()&&this[_0x482b('0x164')]&&this[_0x482b('0x164')]['isActor']()&&Window_BattleStatus[_0x482b('0x389')]['battleLayoutStyle']()==='portrait';},Sprite_Battler[_0x482b('0x389')][_0x482b('0x148')]=function(_0x437384){const _0xfd4832=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')],_0x42d351=SceneManager[_0x482b('0x77')]()?-0x1:0x1;let _0x3b7fa1=this['x'],_0x49751e=this['y'];const _0x4453d7=SceneManager[_0x482b('0x455')][_0x482b('0x571')];if(_0x4453d7&&this[_0x482b('0x27b')]===_0x4453d7){if(_0x482b('0x619')!==_0x482b('0x72d')){_0x3b7fa1+=_0x4453d7['x']-this[_0x482b('0x685')]();const _0x361bf4=_0x4453d7[_0x482b('0x67b')]()*0x3/0x4;_0x49751e=_0x4453d7['y']+_0x361bf4,_0x49751e=Math[_0x482b('0x680')](_0x49751e,_0x4453d7['y']+this['y']-this['height']+_0x361bf4);}else{function _0x12607c(){if(!_0x4fecef[_0x482b('0x31c')](_0x562112))return!![];}}}_0x437384['x']=Math[_0x482b('0x49b')](_0x3b7fa1+this['damageOffsetX']()*_0x42d351),_0x437384['y']=Math['round'](_0x49751e+this[_0x482b('0x48d')]());if(_0xfd4832[_0x482b('0x6d7')])for(const _0x1c0dc9 of this[_0x482b('0xcf')]){if(_0x482b('0x23c')!==_0x482b('0x26c'))_0x1c0dc9['x']+=_0xfd4832[_0x482b('0x70d')]*_0x42d351,_0x1c0dc9['y']+=_0xfd4832['PopupShiftY'];else{function _0x46801a(){this[_0x482b('0x2c9')]=![],this[_0x482b('0x6bf')](_0x482b('0xc')),_0x3ca0e5['BattleCore']['BattleManager_endBattle'][_0x482b('0x460')](this,_0x4f72eb),this[_0x482b('0x6bf')](_0x482b('0x484'));}}}else{const _0x5cb7b5=this[_0x482b('0xcf')][this[_0x482b('0xcf')][_0x482b('0x5b8')]-0x1];_0x5cb7b5&&(_0x437384['x']=_0x5cb7b5['x']+_0xfd4832[_0x482b('0x70d')]*_0x42d351,_0x437384['y']=_0x5cb7b5['y']+_0xfd4832[_0x482b('0x4ae')]);}},Sprite_Battler[_0x482b('0x389')][_0x482b('0x165')]=function(_0x1b2061){this[_0x482b('0x2a6')]()?SceneManager[_0x482b('0x455')]['_statusWindow'][_0x482b('0x4c8')](_0x1b2061):(this[_0x482b('0x5cf')]()[_0x482b('0xa7')](_0x1b2061),this['_damages'][_0x482b('0x768')](_0x1b2061),_0x1b2061[_0x482b('0x4ab')]());},VisuMZ[_0x482b('0x654')][_0x482b('0x2e2')]=Sprite_Battler[_0x482b('0x389')][_0x482b('0x3db')],Sprite_Battler[_0x482b('0x389')][_0x482b('0x3db')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x2e2')]['call'](this),this[_0x482b('0x2d3')](),this[_0x482b('0x327')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x491')]=Sprite_Battler['prototype'][_0x482b('0x5e3')],Sprite_Battler[_0x482b('0x389')][_0x482b('0x5e3')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x491')][_0x482b('0x460')](this),this[_0x482b('0x4fb')](),this['updateOpacity']();},Sprite_Battler[_0x482b('0x389')][_0x482b('0x4fb')]=function(){this[_0x482b('0x28e')]=this['x'],this['_baseY']=this['y'],this[_0x482b('0x290')](),this[_0x482b('0x582')](),this['x']+=this[_0x482b('0x1b4')](),this['y']+=this['extraPositionY'](),this['x']=Math[_0x482b('0x49b')](this['x']),this['y']=Math[_0x482b('0x49b')](this['y']);},Sprite_Battler[_0x482b('0x389')][_0x482b('0x1b4')]=function(){let _0x1d3029=0x0;return _0x1d3029;},Sprite_Battler[_0x482b('0x389')][_0x482b('0x569')]=function(){let _0x2fdc26=0x0;return _0x2fdc26-=this[_0x482b('0x24f')],_0x2fdc26-=this['_jumpHeight'],_0x2fdc26;},Sprite_Battler[_0x482b('0x389')][_0x482b('0x2d3')]=function(){const _0x228394=this[_0x482b('0x164')]&&this[_0x482b('0x164')][_0x482b('0x49a')]();this[_0x482b('0x325')]['x']=(_0x228394?-0x1:0x1)*Math[_0x482b('0x5b0')](this[_0x482b('0x325')]['x']);},Sprite_Battler[_0x482b('0x389')][_0x482b('0xf5')]=function(_0x4380c2,_0x49ceec,_0x42c2fb){if(!this[_0x482b('0x797')]())return;if(this['_targetFloatHeight']===_0x4380c2)return;this[_0x482b('0x2c5')]=_0x4380c2,this['_floatDuration']=_0x49ceec,this[_0x482b('0x777')]=_0x49ceec,this[_0x482b('0x636')]=_0x42c2fb||_0x482b('0x76f');if(_0x49ceec<=0x0)this[_0x482b('0x24f')]=_0x4380c2;},Sprite_Battler[_0x482b('0x389')][_0x482b('0x290')]=function(){if(this['_floatDuration']<=0x0)return;const _0x39c3d3=this[_0x482b('0x6de')],_0x54462b=this[_0x482b('0x777')],_0x1e9782=this[_0x482b('0x636')];if(Imported[_0x482b('0x64e')]){if(_0x482b('0x41b')===_0x482b('0x41b'))this[_0x482b('0x24f')]=this['applyEasing'](this[_0x482b('0x24f')],this[_0x482b('0x2c5')],_0x39c3d3,_0x54462b,_0x1e9782);else{function _0x184295(){const _0x4c9aa6=this[_0x482b('0x528')](_0x39c06d),_0x5b2851=this[_0x482b('0x3da')](_0x37aac8),_0x4c2f0b=this['textSizeEx'](_0x5b2851)[_0x482b('0x2d0')];this[_0x482b('0x2df')](this['isCommandEnabled'](_0xfdc450));const _0x57dbfc=this[_0x482b('0x39c')]();if(_0x57dbfc==='right')this[_0x482b('0x5a')](_0x5b2851,_0x4c9aa6['x']+_0x4c9aa6['width']-_0x4c2f0b,_0x4c9aa6['y'],_0x4c2f0b);else{if(_0x57dbfc==='center'){const _0x4804b7=_0x4c9aa6['x']+_0x5b00db[_0x482b('0x35d')]((_0x4c9aa6[_0x482b('0x2d0')]-_0x4c2f0b)/0x2);this[_0x482b('0x5a')](_0x5b2851,_0x4804b7,_0x4c9aa6['y'],_0x4c2f0b);}else this[_0x482b('0x5a')](_0x5b2851,_0x4c9aa6['x'],_0x4c9aa6['y'],_0x4c2f0b);}}}}else this[_0x482b('0x24f')]=(this[_0x482b('0x24f')]*(_0x39c3d3-0x1)+this[_0x482b('0x2c5')])/_0x39c3d3;this[_0x482b('0x6de')]--;if(this[_0x482b('0x6de')]<=0x0)this[_0x482b('0x429')]();},Sprite_Battler['prototype'][_0x482b('0x429')]=function(){this['_floatHeight']=this[_0x482b('0x2c5')];},Sprite_Battler['prototype'][_0x482b('0x203')]=function(){return this[_0x482b('0x6de')]>0x0;},Sprite_Battler['prototype'][_0x482b('0x34a')]=function(_0x110802,_0x3f3d6b){if(!this[_0x482b('0x797')]())return;if(_0x3f3d6b<=0x0)return;this[_0x482b('0x12c')]=_0x110802,this[_0x482b('0x791')]=_0x3f3d6b,this['_jumpWholeDuration']=_0x3f3d6b;},Sprite_Battler[_0x482b('0x389')][_0x482b('0x582')]=function(){if(this['_jumpDuration']<=0x0)return;const _0x5caea3=this[_0x482b('0x705')]-this[_0x482b('0x791')],_0x3d6424=this[_0x482b('0x705')]/0x2,_0x307b3a=this['_jumpMaxHeight'],_0x330a09=-_0x307b3a/Math[_0x482b('0x45c')](_0x3d6424,0x2);this[_0x482b('0x4ef')]=_0x330a09*Math['pow'](_0x5caea3-_0x3d6424,0x2)+_0x307b3a,this[_0x482b('0x791')]--;if(this[_0x482b('0x791')]<=0x0)return this[_0x482b('0x390')]();},Sprite_Battler[_0x482b('0x389')][_0x482b('0x390')]=function(){this[_0x482b('0x4ef')]=0x0;},Sprite_Battler['prototype'][_0x482b('0x559')]=function(){return this['_jumpDuration']>0x0;},Sprite_Battler[_0x482b('0x389')][_0x482b('0x724')]=function(_0x56ec24,_0x48abe3,_0x5532b4){if(this[_0x482b('0x2b7')]===_0x56ec24)return;this[_0x482b('0x2b7')]=_0x56ec24,this[_0x482b('0x3ca')]=_0x48abe3,this[_0x482b('0x2cd')]=_0x48abe3,this[_0x482b('0x49e')]=_0x5532b4||'Linear';if(_0x48abe3<=0x0)this['opacity']=_0x56ec24;},Sprite_Battler['prototype'][_0x482b('0x39f')]=function(){if(this[_0x482b('0x3ca')]<=0x0)return;const _0xaf94e=this[_0x482b('0x3ca')],_0x287854=this[_0x482b('0x2cd')],_0x134348=this[_0x482b('0x49e')];Imported['VisuMZ_0_CoreEngine']?this[_0x482b('0x32e')]=this[_0x482b('0x3c0')](this[_0x482b('0x32e')],this[_0x482b('0x2b7')],_0xaf94e,_0x287854,_0x134348):this[_0x482b('0x32e')]=(this[_0x482b('0x32e')]*(_0xaf94e-0x1)+this[_0x482b('0x2b7')])/_0xaf94e;this[_0x482b('0x3ca')]--;if(this[_0x482b('0x3ca')]<=0x0)this['onOpacityEnd']();},Sprite_Battler[_0x482b('0x389')][_0x482b('0x11c')]=function(){this[_0x482b('0x32e')]=this['_targetOpacity'];},Sprite_Battler['prototype'][_0x482b('0x3bd')]=function(){return this[_0x482b('0x3ca')]>0x0;},VisuMZ[_0x482b('0x654')]['Sprite_Actor_createStateSprite']=Sprite_Actor[_0x482b('0x389')][_0x482b('0x234')],Sprite_Actor[_0x482b('0x389')][_0x482b('0x234')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x4c4')][_0x482b('0x460')](this);if(VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x59c')][_0x482b('0x38d')]){if('HZqaY'!==_0x482b('0x432'))this[_0x482b('0x2ea')]();else{function _0x1a9717(){_0x55493c[_0x482b('0x654')][_0x482b('0x682')][_0x482b('0x460')](this,_0x429e09),_0x2d1127[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x50d')]['HomePosJS']&&_0x550bda[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x50d')][_0x482b('0x133')][_0x482b('0x460')](this,_0x543a73);}}}},VisuMZ['BattleCore']['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy[_0x482b('0x389')][_0x482b('0x45b')],Sprite_Enemy[_0x482b('0x389')][_0x482b('0x45b')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x59c')][_0x482b('0x22a')]&&this[_0x482b('0x2ea')](),VisuMZ['BattleCore'][_0x482b('0x1cb')][_0x482b('0x460')](this);},Sprite_Battler[_0x482b('0x389')][_0x482b('0x2ea')]=function(){if(!ConfigManager[_0x482b('0x144')])return;const _0x322446=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x59c')],_0x698ad3=new Sprite_HpGauge();_0x698ad3[_0x482b('0x4c1')]['x']=_0x322446['AnchorX'],_0x698ad3[_0x482b('0x4c1')]['y']=_0x322446[_0x482b('0x2ba')],_0x698ad3['scale']['x']=_0x698ad3[_0x482b('0x325')]['y']=_0x322446[_0x482b('0x737')],this[_0x482b('0x3e1')]=_0x698ad3,this['addChild'](this['_hpGaugeSprite']);},VisuMZ[_0x482b('0x654')][_0x482b('0x6f4')]=Sprite_Battler[_0x482b('0x389')]['setBattler'],Sprite_Battler[_0x482b('0x389')][_0x482b('0x352')]=function(_0x247f0b){VisuMZ[_0x482b('0x654')][_0x482b('0x6f4')][_0x482b('0x460')](this,_0x247f0b),this[_0x482b('0x6fa')](_0x247f0b);},Sprite_Battler[_0x482b('0x389')]['setupHpGaugeSprite']=function(_0xc48eca){if(!_0xc48eca)return;if(!this[_0x482b('0x3e1')])return;if(_0xc48eca[_0x482b('0x3e4')]()){}else{if(_0xc48eca[_0x482b('0x279')]()){if(_0x482b('0x97')!==_0x482b('0x97')){function _0x5cc114(){const _0x19fd10=_0x4d144c['prototype'][_0x482b('0x301')]();[_0x482b('0x12d'),_0x482b('0x42c'),_0x482b('0x2fa'),_0x482b('0x6ff')][_0x482b('0x24d')](_0x19fd10)&&(this['opacity']=0x0);}}else{if(this[_0x482b('0x31a')]===Sprite_SvEnemy&&!_0xc48eca['hasSvBattler']())return;}}}this['_hpGaugeSprite'][_0x482b('0xb6')](_0xc48eca,'hp');},Sprite_Battler[_0x482b('0x389')][_0x482b('0x327')]=function(){if(!this[_0x482b('0x164')])return;if(!this[_0x482b('0x3e1')])return;const _0x4c02d7=VisuMZ['BattleCore'][_0x482b('0x21a')]['HpGauge'],_0x2e09ac=this[_0x482b('0x3e1')];_0x2e09ac[_0x482b('0x15f')]=this[_0x482b('0x145')]();const _0x1ded9e=_0x4c02d7['OffsetX'],_0x380455=_0x4c02d7[_0x482b('0x132')];_0x2e09ac['x']=_0x1ded9e,_0x2e09ac['y']=-this[_0x482b('0x2c3')]+_0x380455;},Sprite_Battler[_0x482b('0x389')][_0x482b('0x145')]=function(){if(this['_battler'][_0x482b('0x3e4')]())return!![];const _0x211792=this['_battler']['enemy']()['note'];if(_0x211792[_0x482b('0x17')](/<SHOW HP GAUGE>/i))return!![];if(_0x211792[_0x482b('0x17')](/<HIDE HP GAUGE>/i))return![];const _0xeefd51=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x59c')];if(_0xeefd51[_0x482b('0x4cf')]){if(_0x482b('0x1a9')===_0x482b('0x1a9')){if(_0xeefd51['BTestBypass']&&BattleManager[_0x482b('0x50e')]())return!![];if(this[_0x482b('0x164')][_0x482b('0x444')])return![];return this['_battler'][_0x482b('0xac')]();}else{function _0x19c4f5(){_0x3d42ae('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x482b('0x658')](_0x1b1395,_0x2d4194,_0x5db712)),_0xa7e01f[_0x482b('0x17b')]();}}}return!![];},VisuMZ[_0x482b('0x654')][_0x482b('0xca')]=Sprite_Battler[_0x482b('0x389')][_0x482b('0x18d')],Sprite_Battler['prototype'][_0x482b('0x18d')]=function(_0x6e17a3,_0x2b245c,_0x13cd37){this['canMove']()&&VisuMZ[_0x482b('0x654')]['Sprite_Battler_startMove'][_0x482b('0x460')](this,_0x6e17a3,_0x2b245c,_0x13cd37);},Sprite_Battler['prototype'][_0x482b('0x797')]=function(){if(this[_0x482b('0x164')]&&this[_0x482b('0x164')][_0x482b('0x2a4')]())return![];if(this['_battler']&&!this[_0x482b('0x164')][_0x482b('0x4a9')]())return![];return $gameSystem[_0x482b('0x386')]();},Sprite_Battler[_0x482b('0x389')][_0x482b('0x7')]=function(){},Sprite_Battler[_0x482b('0x389')][_0x482b('0x305')]=function(){this[_0x482b('0x18d')](0x0,0x0,0xc);},Sprite_Battler[_0x482b('0x389')]['retreat']=function(){},Sprite_Battler['prototype'][_0x482b('0x458')]=function(){const _0x33bc6a=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x50d')],_0x40b86e=this[_0x482b('0x164')]&&this[_0x482b('0x164')][_0x482b('0x3e4')]()?0x1:-0x1,_0x3bb1de=this['_baseX']-this['_homeX']+_0x40b86e*_0x33bc6a[_0x482b('0xfa')],_0x1f230d=this[_0x482b('0x11')]-this[_0x482b('0x10a')]+_0x40b86e*_0x33bc6a[_0x482b('0x1d6')],_0xf98e90=_0x33bc6a[_0x482b('0x4d9')];this[_0x482b('0x18d')](_0x3bb1de,_0x1f230d,_0xf98e90);},VisuMZ[_0x482b('0x654')][_0x482b('0x158')]=Sprite_Actor[_0x482b('0x389')][_0x482b('0x448')],Sprite_Actor[_0x482b('0x389')][_0x482b('0x448')]=function(){if(SceneManager[_0x482b('0x14b')]())return;VisuMZ[_0x482b('0x654')][_0x482b('0x158')][_0x482b('0x460')](this);},VisuMZ[_0x482b('0x654')][_0x482b('0x682')]=Sprite_Actor[_0x482b('0x389')][_0x482b('0x61')],Sprite_Actor[_0x482b('0x389')][_0x482b('0x61')]=function(_0x2d9522){VisuMZ[_0x482b('0x654')][_0x482b('0x682')][_0x482b('0x460')](this,_0x2d9522),VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x50d')][_0x482b('0x133')]&&VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x50d')][_0x482b('0x133')][_0x482b('0x460')](this,_0x2d9522);},VisuMZ['BattleCore'][_0x482b('0x607')]=Sprite_Actor[_0x482b('0x389')][_0x482b('0x352')],Sprite_Actor[_0x482b('0x389')][_0x482b('0x352')]=function(_0x118499){VisuMZ[_0x482b('0x654')]['Sprite_Actor_setBattler'][_0x482b('0x460')](this,_0x118499),this[_0x482b('0x646')](_0x118499);},Sprite_Actor[_0x482b('0x389')][_0x482b('0x646')]=function(_0xb4fe87){if(!_0xb4fe87)return;if(!this[_0x482b('0x361')])return;this[_0x482b('0x361')][_0x482b('0x4c1')]['x']=this[_0x482b('0x42d')][_0x482b('0x653')](),this['_mainSprite']['anchor']['y']=this[_0x482b('0x42d')]['svBattlerAnchorY']();if(this[_0x482b('0x42d')][_0x482b('0x45f')]()){const _0x3fe880=this[_0x482b('0x206')][_0x482b('0x615')];this[_0x482b('0x206')][_0x482b('0x2cb')](0x0,0x0,_0x3fe880['width'],_0x3fe880[_0x482b('0x2c3')]);}else{if(_0x482b('0x732')===_0x482b('0x732'))this[_0x482b('0x206')][_0x482b('0x2cb')](0x0,0x0,0x0,0x0);else{function _0x20f637(){let _0xff8895=_0x2e5ce4['skillTypes'][_0x3af9e7];if(!_0xff8895)return;let _0x2a3b90=_0xff8895;const _0x45a5e9=this[_0x482b('0x58a')]();if(_0x45a5e9===_0x482b('0x570'))_0x2a3b90=_0x2a3b90['replace'](/\x1I\[(\d+)\]/gi,''),_0x2a3b90=_0x2a3b90[_0x482b('0x13a')](/\\I\[(\d+)\]/gi,'');else{if(!_0xff8895[_0x482b('0x17')](/\\I\[(\d+)\]/i)){const _0x271d60=_0x5a508b[_0x482b('0x34c')]?_0x3f3610['SkillsStatesCore'][_0x482b('0x21a')][_0x482b('0x406')]:_0x1d904e[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x427')],_0x1a0b30=_0x5ee054[_0x482b('0x4c9')][_0x482b('0x24d')](_0x267c24),_0x1e185d=_0x1a0b30?_0x271d60[_0x482b('0x349')]:_0x271d60['IconStypeNorm'];_0x2a3b90=_0x482b('0xbb')[_0x482b('0x658')](_0x1e185d,_0xff8895);}}this[_0x482b('0x628')](_0x2a3b90,_0x482b('0x4b1'),!![],_0x4ae8e5);}}}},VisuMZ[_0x482b('0x654')][_0x482b('0x598')]=Sprite_Actor[_0x482b('0x389')][_0x482b('0x353')],Sprite_Actor[_0x482b('0x389')][_0x482b('0x353')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x598')][_0x482b('0x460')](this);if(this[_0x482b('0x42d')]){if(_0x482b('0x2fc')===_0x482b('0x2fc'))this[_0x482b('0x354')](),this[_0x482b('0x60')]();else{function _0x18ce51(){if(this[_0x482b('0x75d')]()!=='')return this[_0x482b('0x75d')]();else{if(_0xf1855d['VisuMZ_1_MainMenuCore']&&this[_0x482b('0x332')]()!=='')return this[_0x482b('0x332')]();}return'';}}}},VisuMZ[_0x482b('0x654')][_0x482b('0x266')]=Sprite_Actor[_0x482b('0x389')][_0x482b('0x44')],Sprite_Actor[_0x482b('0x389')][_0x482b('0x44')]=function(){VisuMZ[_0x482b('0x654')]['Sprite_Actor_updateShadow'][_0x482b('0x460')](this),this[_0x482b('0x1c1')]();},Sprite_Actor['prototype']['updateShadowBattleCore']=function(){if(!this['_mainSprite'])return;this[_0x482b('0x788')]();if(this[_0x482b('0x42d')]&&this[_0x482b('0x42d')][_0x482b('0x45f')]()){const _0x18077d=this[_0x482b('0x206')][_0x482b('0x615')];this[_0x482b('0x206')][_0x482b('0x2cb')](0x0,0x0,_0x18077d[_0x482b('0x2d0')],_0x18077d[_0x482b('0x2c3')]);}else this[_0x482b('0x206')][_0x482b('0x2cb')](0x0,0x0,0x0,0x0);},Sprite_Actor[_0x482b('0x389')][_0x482b('0x788')]=function(){this[_0x482b('0x206')]['y']=-this[_0x482b('0x569')]()-0x2;},Sprite_Actor[_0x482b('0x389')][_0x482b('0x354')]=function(){this[_0x482b('0x62d')][_0x482b('0x325')]['x']=0x1/(this[_0x482b('0x325')]['x']||0.001),this[_0x482b('0x62d')][_0x482b('0x325')]['y']=0x1/(this[_0x482b('0x325')]['y']||0.001);},Sprite_Actor[_0x482b('0x389')]['updateStyleOpacity']=function(){if(!$gameSystem[_0x482b('0x386')]()&&this[_0x482b('0x31a')]===Sprite_Actor){if(_0x482b('0x470')===_0x482b('0x45a')){function _0x50975b(){let _0x3e11df=_0x112eca['BattleCore'][_0x482b('0x6be')][_0x482b('0x460')](this,_0x56bcbf);return _0x3e11df=this[_0x482b('0x1e0')][_0x482b('0x423')]*_0x3e11df+this[_0x482b('0x1e0')][_0x482b('0x35c')],_0x3e11df;}}else{const _0x1a26f4=Scene_Battle[_0x482b('0x389')]['battleLayoutStyle']();['default',_0x482b('0x42c'),_0x482b('0x2fa'),_0x482b('0x6ff')][_0x482b('0x24d')](_0x1a26f4)&&(this[_0x482b('0x32e')]=0x0);}}},Sprite_Actor[_0x482b('0x389')][_0x482b('0xf7')]=function(){const _0x2efbcb=this[_0x482b('0x42d')];if(_0x2efbcb){if(_0x482b('0x1db')===_0x482b('0x4ea')){function _0xb80d07(){if(!_0x5e9cd9)return![];return _0x1e96da[_0x482b('0x6e9')]()===this[_0x482b('0x5e7')]();}}else{const _0x49f0f3=_0x2efbcb[_0x482b('0x5b7')]();if(_0x2efbcb[_0x482b('0x588')]()||_0x2efbcb['isActing']())this['startMotion'](_0x482b('0x3c3'));else{if(_0x49f0f3===0x3){if(_0x482b('0x50a')==='BMRYf')this[_0x482b('0x53c')](_0x482b('0x6cd'));else{function _0x39c8e8(){const _0x1aea8e=_0x39b66[_0x154ec9];if(_0x1aea8e){if(_0x1aea8e['note'][_0x482b('0x17')](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x341dba=_0x3456e5(_0x506bc3['$1'])[_0x482b('0xe0')](/[\r\n]+/)[_0x482b('0x768')](''),_0x29254f=this['processRandomizedData'](_0x341dba);_0x1bb91b=this['getEnemyIdWithName'](_0x29254f)||_0x28ae2d,_0x3427f5=_0x2f51ca[_0x482b('0x14a')](_0x2ee962);}}return _0x512eac;}}}else{if(_0x49f0f3===0x2)this[_0x482b('0x53c')](_0x482b('0x578'));else{if(_0x2efbcb[_0x482b('0x169')]())this['startMotion'](_0x482b('0x45d'));else{if(_0x2efbcb[_0x482b('0x5b3')]()||_0x2efbcb[_0x482b('0x117')]()){if(_0x482b('0xbe')===_0x482b('0xbe'))this[_0x482b('0x53c')]('guard');else{function _0x2aa3c9(){_0x36505e['width']=_0x264f2b(_0x21620d['$1']),_0x9a35f5['height']=_0x51dc84(_0x59043c['$2']);}}}else{if(_0x49f0f3===0x1){if('kCFSe'===_0x482b('0x401')){function _0x1f776c(){if(this[_0x482b('0x5aa')]!==_0x11ed65)return this[_0x482b('0x5aa')];return this[_0x482b('0x2ae')](),this[_0x482b('0x5aa')];}}else this[_0x482b('0x53c')]('abnormal');}else{if(_0x2efbcb[_0x482b('0x6f1')]()){if(_0x482b('0x181')!==_0x482b('0x6a3'))this[_0x482b('0x53c')]('dying');else{function _0x465222(){_0x5eb655['bitmap']=_0x42c618;}}}else{if(_0x2efbcb[_0x482b('0x21c')]()){if(_0x482b('0x509')!==_0x482b('0x500'))this['startMotion'](_0x482b('0x3c3'));else{function _0x48ceae(){return this[_0x482b('0x660')]();}}}else _0x2efbcb['currentAction']()?this[_0x482b('0x53c')](_0x482b('0x3d3')):this[_0x482b('0x53c')](_0x482b('0x3c3'));}}}}}}}}}},Sprite_Actor['prototype'][_0x482b('0x21')]=function(){Sprite_Battler[_0x482b('0x389')][_0x482b('0x21')][_0x482b('0x460')](this);},Sprite_Actor[_0x482b('0x389')][_0x482b('0x2c7')]=function(){return Sprite_Battler['_motionSpeed'];},Sprite_Weapon[_0x482b('0x389')][_0x482b('0x2d8')]=function(){return Sprite_Battler['_motionSpeed'];},Sprite_Actor[_0x482b('0x389')][_0x482b('0x550')]=function(){},Sprite_Actor[_0x482b('0x389')][_0x482b('0x753')]=function(){},Sprite_Actor[_0x482b('0x389')][_0x482b('0x1d3')]=function(){if(this[_0x482b('0x113')]&&++this[_0x482b('0x16c')]>=this['motionSpeed']()){if(_0x482b('0x27c')===_0x482b('0x27c')){if(this[_0x482b('0x113')]['loop'])this[_0x482b('0x5c0')]=(this[_0x482b('0x5c0')]+0x1)%0x4;else this[_0x482b('0x5c0')]<0x2?this[_0x482b('0x5c0')]++:this[_0x482b('0xf7')]();this[_0x482b('0x16c')]=0x0;}else{function _0x125cd5(){const _0xfc939a=_0x18a4fc[_0x482b('0x1af')]();_0xfc939a<=0x0?_0x4ba4ce[_0x482b('0x209')]():this[_0x482b('0x201')](_0x44905f,_0xfc939a);}}}},Sprite_Actor[_0x482b('0x389')][_0x482b('0x151')]=function(_0x19ebb3){if(_0x19ebb3===_0x482b('0x31e'))this[_0x482b('0x34b')]=!![];const _0x15560d=Sprite_Actor['MOTIONS'][_0x19ebb3];this['_motion']=_0x15560d,this['_motionCount']=0x0,this[_0x482b('0x5c0')]=0x0;},Sprite_Actor[_0x482b('0x389')][_0x482b('0x214')]=function(_0x4dc932){this[_0x482b('0x63b')](),this['_weaponSprite']['setup'](_0x4dc932),this['_actor'][_0x482b('0xbd')]();},Sprite_Actor['prototype']['adjustWeaponSpriteOffset']=function(){let _0x5a7277=-0x10,_0x5a3510=0x0;const _0x1269a3=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x3a72d4=this[_0x482b('0x164')][_0x482b('0x512')]()[_0x482b('0x6a0')](_0x3bd58f=>_0x3bd58f&&_0x3bd58f[_0x482b('0x4ed')]['match'](_0x1269a3)?Number(RegExp['$1']):0x0),_0x4a61e7=this['_battler'][_0x482b('0x512')]()[_0x482b('0x6a0')](_0x4a7eb7=>_0x4a7eb7&&_0x4a7eb7[_0x482b('0x4ed')][_0x482b('0x17')](_0x1269a3)?Number(RegExp['$2']):0x0);_0x5a7277=_0x3a72d4[_0x482b('0x4a5')]((_0x48db56,_0x41ac7a)=>_0x48db56+_0x41ac7a,_0x5a7277),_0x5a3510=_0x4a61e7['reduce']((_0x5305a1,_0x54ea39)=>_0x5305a1+_0x54ea39,_0x5a3510),this[_0x482b('0x25e')]['x']=_0x5a7277,this[_0x482b('0x25e')]['y']=_0x5a3510,this[_0x482b('0x25e')][_0x482b('0x353')]();},Sprite_Weapon['prototype'][_0x482b('0xb6')]=function(_0x3b9a3e){this[_0x482b('0x632')]=_0x3b9a3e,this[_0x482b('0x7f')]=-0x1,this[_0x482b('0x5c0')]=0x0,this[_0x482b('0x5d0')](),this['updateFrame']();},Sprite_Actor[_0x482b('0x389')][_0x482b('0x543')]=function(){},Sprite_Actor[_0x482b('0x389')][_0x482b('0x7')]=function(){const _0x4b1ccc=VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x75e')],_0xac8c94=_0x4b1ccc[_0x482b('0x51b')],_0x40137b=_0x4b1ccc[_0x482b('0x277')],_0x58f1fc=_0x4b1ccc[_0x482b('0x255')];this[_0x482b('0x18d')](-_0xac8c94,-_0x40137b,_0x58f1fc);},VisuMZ['BattleCore'][_0x482b('0x618')]=Sprite_Enemy[_0x482b('0x389')][_0x482b('0x284')],Sprite_Enemy[_0x482b('0x389')][_0x482b('0x284')]=function(){if(this[_0x482b('0x2f4')]()){if(_0x482b('0x240')!=='FEKMD')VisuMZ[_0x482b('0x654')]['Sprite_Enemy_initVisibility'][_0x482b('0x460')](this);else{function _0x5c6fb7(){const _0x4fbfb8=_0x3aea3f[_0x482b('0x140')]();_0x4fbfb8[_0x482b('0x5f9')](this[_0x482b('0x252')]['currentExt']()),this[_0x482b('0x5ee')]();}}}else{if(_0x482b('0x243')!==_0x482b('0x394'))this[_0x482b('0x46')]=!![];else{function _0x124585(){for(const _0xfa5e6e of this['_damages']){_0xfa5e6e['x']+=_0x2edbed[_0x482b('0x70d')]*_0x532bb8,_0xfa5e6e['y']+=_0x170f65[_0x482b('0x4ae')];}}}}},VisuMZ[_0x482b('0x654')]['Sprite_Enemy_updateCollapse']=Sprite_Enemy[_0x482b('0x389')][_0x482b('0x19e')],Sprite_Enemy['prototype'][_0x482b('0x19e')]=function(){if(this['allowCollapse']())VisuMZ['BattleCore'][_0x482b('0x522')][_0x482b('0x460')](this);},VisuMZ['BattleCore'][_0x482b('0x130')]=Sprite_Enemy[_0x482b('0x389')][_0x482b('0x79')],Sprite_Enemy[_0x482b('0x389')][_0x482b('0x79')]=function(){if(this[_0x482b('0x2f4')]())VisuMZ['BattleCore']['Sprite_Enemy_updateBossCollapse'][_0x482b('0x460')](this);},Sprite_Enemy[_0x482b('0x389')][_0x482b('0x46b')]=function(){if(this[_0x482b('0x114')]())return this[_0x482b('0x524')]['isMoving']();else{if(_0x482b('0x74')!==_0x482b('0x74')){function _0x48063e(){if(!_0x4e0632[_0x482b('0x23a')]())return null;if(!_0x5314a8[_0x482b('0x455')]['_spriteset'])return null;return _0x49937a[_0x482b('0x455')][_0x482b('0x5f')][_0x482b('0x75b')](this);}}else return Sprite_Battler[_0x482b('0x389')][_0x482b('0x46b')][_0x482b('0x460')](this);}},VisuMZ[_0x482b('0x654')][_0x482b('0x68c')]=Sprite_Enemy[_0x482b('0x389')][_0x482b('0x354')],Sprite_Enemy['prototype'][_0x482b('0x354')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x68c')][_0x482b('0x460')](this),this[_0x482b('0x185')]();},Sprite_Enemy['prototype'][_0x482b('0x185')]=function(){this[_0x482b('0x70')]['y']=-this[_0x482b('0x615')][_0x482b('0x2c3')]-this[_0x482b('0x70')][_0x482b('0x2c3')],this[_0x482b('0x70')][_0x482b('0x325')]['x']=0x1/(this[_0x482b('0x325')]['x']||0.001),this[_0x482b('0x70')]['scale']['y']=0x1/(this[_0x482b('0x325')]['y']||0.001),this[_0x482b('0x114')]()&&(this[_0x482b('0x524')][_0x482b('0x62d')][_0x482b('0x325')]['x']=-0x1/(this[_0x482b('0x325')]['x']||0.001),this[_0x482b('0x524')]['_stateSprite'][_0x482b('0x325')]['y']=0x1/(this[_0x482b('0x325')]['y']||0.001));},VisuMZ[_0x482b('0x654')][_0x482b('0x691')]=Sprite_Enemy[_0x482b('0x389')][_0x482b('0x352')],Sprite_Enemy[_0x482b('0x389')]['setBattler']=function(_0xc73dbd){VisuMZ[_0x482b('0x654')][_0x482b('0x691')][_0x482b('0x460')](this,_0xc73dbd),this[_0x482b('0x23')](_0xc73dbd);},Sprite_Enemy['prototype']['setSvBattlerSprite']=function(_0x4485e4){!this[_0x482b('0x524')]&&(this[_0x482b('0x524')]=new Sprite_SvEnemy(_0x4485e4),this[_0x482b('0x2ff')](this[_0x482b('0x524')])),this[_0x482b('0x524')][_0x482b('0x352')](_0x4485e4);},Sprite_Enemy[_0x482b('0x389')][_0x482b('0x114')]=function(){return this[_0x482b('0x715')]&&this[_0x482b('0x715')][_0x482b('0x114')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x344')]=Sprite_Enemy[_0x482b('0x389')][_0x482b('0x5d0')],Sprite_Enemy['prototype'][_0x482b('0x5d0')]=function(_0x394bc5){if(this['hasSvBattler']()){const _0x2b4803=this[_0x482b('0x715')][_0x482b('0x440')]();this[_0x482b('0x615')]=new Bitmap(_0x2b4803[_0x482b('0x2d0')],_0x2b4803[_0x482b('0x2c3')]);}else VisuMZ[_0x482b('0x654')][_0x482b('0x344')][_0x482b('0x460')](this,_0x394bc5);},Sprite_Enemy[_0x482b('0x389')][_0x482b('0x2f4')]=function(){return this[_0x482b('0x114')]()?this['_enemy'][_0x482b('0x2f4')]():!![];},Sprite_Enemy[_0x482b('0x389')][_0x482b('0xf7')]=function(){if(this[_0x482b('0x114')]())this[_0x482b('0x524')][_0x482b('0xf7')]();},Sprite_Enemy['prototype'][_0x482b('0x151')]=function(_0xc2362f){if(this[_0x482b('0x114')]())this[_0x482b('0x524')]['forceMotion'](_0xc2362f);},Sprite_Enemy[_0x482b('0x389')]['forceWeaponAnimation']=function(_0x1edbe4){if(this[_0x482b('0x114')]())this[_0x482b('0x524')][_0x482b('0x214')](_0x1edbe4);},Sprite_Enemy[_0x482b('0x389')][_0x482b('0x7')]=function(){const _0x13a996=VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x75e')],_0x1e44b6=_0x13a996[_0x482b('0x51b')],_0x27b5cf=_0x13a996[_0x482b('0x277')],_0x18e055=_0x13a996[_0x482b('0x255')];this[_0x482b('0x18d')](_0x1e44b6,_0x27b5cf,_0x18e055);};function Sprite_SvEnemy(){this[_0x482b('0x2e6')](...arguments);}Sprite_SvEnemy[_0x482b('0x389')]=Object['create'](Sprite_Actor[_0x482b('0x389')]),Sprite_SvEnemy['prototype'][_0x482b('0x31a')]=Sprite_SvEnemy,Sprite_SvEnemy['prototype'][_0x482b('0x2e6')]=function(_0x59d632){Sprite_Actor[_0x482b('0x389')][_0x482b('0x2e6')][_0x482b('0x460')](this,_0x59d632),this[_0x482b('0x325')]['x']=-0x1,this[_0x482b('0x62d')][_0x482b('0x325')]['x']=-0x1;},Sprite_SvEnemy[_0x482b('0x389')][_0x482b('0x448')]=function(){},Sprite_SvEnemy[_0x482b('0x389')]['setActorHome']=function(_0x21d53e){},Sprite_SvEnemy[_0x482b('0x389')][_0x482b('0x44')]=function(){!this[_0x482b('0x42d')]['hasSvBattler']()?this['_shadowSprite'][_0x482b('0x15f')]=![]:Sprite_Actor['prototype'][_0x482b('0x44')][_0x482b('0x460')](this);},Sprite_SvEnemy[_0x482b('0x389')]['updateShadowPosition']=function(){if(this['parent'])this[_0x482b('0x206')]['y']=-this['parent'][_0x482b('0x569')]()-0x2;},Sprite_SvEnemy[_0x482b('0x389')][_0x482b('0x354')]=function(){this[_0x482b('0x62d')][_0x482b('0x15f')]=this['_actor']&&this[_0x482b('0x42d')][_0x482b('0x114')]();},Sprite_SvEnemy['prototype'][_0x482b('0x2c')]=function(){Sprite_Battler[_0x482b('0x389')][_0x482b('0x2c')][_0x482b('0x460')](this);const _0x5cc3e7=this['_actor'][_0x482b('0xd3')]();this[_0x482b('0x6d0')]!==_0x5cc3e7&&(this[_0x482b('0x6d0')]=_0x5cc3e7,this[_0x482b('0x361')][_0x482b('0x615')]=ImageManager[_0x482b('0x681')](_0x5cc3e7));},Sprite_SvEnemy[_0x482b('0x389')][_0x482b('0x2f8')]=function(){},Sprite_SvEnemy[_0x482b('0x389')]['startMove']=function(_0x547478,_0x3636c7,_0x106945){if(this[_0x482b('0x27b')])this[_0x482b('0x27b')]['startMove'](_0x547478,_0x3636c7,_0x106945);},Sprite_SvEnemy[_0x482b('0x389')]['refreshMotion']=function(){const _0x4b313e=this[_0x482b('0x42d')];if(_0x4b313e){const _0x53b225=_0x4b313e[_0x482b('0x5b7')]();if(_0x4b313e[_0x482b('0x588')]()||_0x4b313e[_0x482b('0x3cf')]()){if(_0x482b('0x20e')!==_0x482b('0x20e')){function _0x3d0550(){this['process_VisuMZ_BattleCore_DamageStyles'](),this[_0x482b('0x476')](),this[_0x482b('0x3e0')](),this[_0x482b('0x4cb')](),this[_0x482b('0x666')](),this[_0x482b('0x786')]();}}else this[_0x482b('0x53c')]('walk');}else{if(_0x53b225===0x3){if(_0x482b('0x152')==='HqnUe'){function _0x8019a8(){_0x567852['motionIdle']=_0x455e9b(_0xdd1956['$1'])[_0x482b('0x515')]()['trim']();}}else this['startMotion'](_0x482b('0x6cd'));}else{if(_0x53b225===0x2)this[_0x482b('0x53c')](_0x482b('0x578'));else{if(_0x4b313e[_0x482b('0x169')]()){if('Vvuam'!==_0x482b('0x517'))this[_0x482b('0x53c')](_0x482b('0x45d'));else{function _0x355ebd(){_0x35d4fd[_0x482b('0x66')](_0x54bae9[_0x23635b]);}}}else{if(_0x4b313e[_0x482b('0x5b3')]()||_0x4b313e[_0x482b('0x117')]()){if(_0x482b('0x3b8')===_0x482b('0x3b8'))this[_0x482b('0x53c')]('guard');else{function _0x4d679a(){return this[_0x482b('0xb4')]()?0x0:0xa;}}}else{if(_0x53b225===0x1)this['startMotion'](_0x482b('0x3f2'));else{if(_0x4b313e[_0x482b('0x6f1')]()){if(_0x482b('0x1be')===_0x482b('0x1be'))this['startMotion'](_0x482b('0x712'));else{function _0x32ada5(){this['commandEscape']();}}}else _0x4b313e[_0x482b('0x21c')]()?this['startMotion'](_0x482b('0x3c3')):this[_0x482b('0x53c')](_0x4b313e[_0x482b('0x440')]()[_0x482b('0x5f3')]||_0x482b('0x3c3'));}}}}}}}},Sprite_SvEnemy[_0x482b('0x389')]['inHomePosition']=function(){return this['parent']?this[_0x482b('0x27b')][_0x482b('0x367')]===0x0&&this['parent'][_0x482b('0x4de')]===0x0:!![];},Sprite_SvEnemy['prototype'][_0x482b('0x2d3')]=function(){},Sprite_Damage[_0x482b('0x389')]['setup']=function(_0xd6696a){const _0x42bc70=_0xd6696a[_0x482b('0x61e')]();if(_0x42bc70[_0x482b('0x13b')]||_0x42bc70[_0x482b('0xb8')]){if('Yleze'===_0x482b('0x675'))this[_0x482b('0x29c')]=0x0,this[_0x482b('0x496')]();else{function _0x1cc9f1(){if(_0x1c8c81['ActionSkillMsg1'])this['displayItemMessage'](_0x512d3c[_0x482b('0x155')],_0x5c8210,_0x427ed1);if(_0x5ca6f6[_0x482b('0x283')])this['displayItemMessage'](_0x5aafd7[_0x482b('0x160')],_0x2bb537,_0x2bb5ee);}}}else{if(_0x42bc70[_0x482b('0x3c5')]){if('xGIXB'==='xGIXB')this[_0x482b('0x29c')]=_0x42bc70[_0x482b('0x6ea')]>=0x0?0x0:0x1,this[_0x482b('0x364')](_0x42bc70[_0x482b('0x6ea')]);else{function _0x4a7627(){_0x35be1c[_0x482b('0x46c')](_0x482b('0x4fc'));}}}else _0xd6696a[_0x482b('0x548')]()&&_0x42bc70[_0x482b('0x4f')]!==0x0&&(this[_0x482b('0x29c')]=_0x42bc70[_0x482b('0x4f')]>=0x0?0x2:0x3,this[_0x482b('0x364')](_0x42bc70['mpDamage']));}_0x42bc70[_0x482b('0x2ef')]&&this['setupCriticalEffect']();},Sprite_Damage[_0x482b('0x389')][_0x482b('0x364')]=function(_0x4fd80c){let _0x2416bb=this[_0x482b('0x329')](_0x4fd80c);const _0x467a23=this[_0x482b('0x750')](),_0x238cce=Math[_0x482b('0x35d')](_0x467a23*0.75);for(let _0x553b74=0x0;_0x553b74<_0x2416bb[_0x482b('0x5b8')];_0x553b74++){const _0x5cdd4c=this[_0x482b('0x647')](_0x238cce,_0x467a23);_0x5cdd4c[_0x482b('0x615')][_0x482b('0x31')](_0x2416bb[_0x553b74],0x0,0x0,_0x238cce,_0x467a23,_0x482b('0x47c')),_0x5cdd4c['x']=(_0x553b74-(_0x2416bb[_0x482b('0x5b8')]-0x1)/0x2)*_0x238cce,_0x5cdd4c['dy']=-_0x553b74;}},Sprite_Damage[_0x482b('0x389')][_0x482b('0x329')]=function(_0x3037be){let _0x47639f=Math['abs'](_0x3037be)[_0x482b('0x1e1')]();this[_0x482b('0x21e')]()&&(_0x47639f=VisuMZ[_0x482b('0x6d6')](_0x47639f));const _0x5b4f3b=VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x3ac')];let _0xf2ac2e='',_0x46992b='';switch(this['_colorType']){case 0x0:_0xf2ac2e=_0x5b4f3b['hpDamageFmt']||_0x482b('0x3ea'),_0x46992b=TextManager['hp'];if(_0x3037be===0x0)_0xf2ac2e='%1';break;case 0x1:_0xf2ac2e=_0x5b4f3b[_0x482b('0x2d6')]||_0x482b('0x74c'),_0x46992b=TextManager['hp'];break;case 0x2:_0xf2ac2e=_0x5b4f3b[_0x482b('0xf6')]||_0x482b('0x4f7'),_0x46992b=TextManager['mp'];break;case 0x3:_0xf2ac2e=_0x5b4f3b['mpHealingFmt']||_0x482b('0x475'),_0x46992b=TextManager['mp'];break;}return _0xf2ac2e[_0x482b('0x658')](_0x47639f,_0x46992b)[_0x482b('0x6b6')]();},Sprite_Damage[_0x482b('0x389')][_0x482b('0x21e')]=function(){if(Imported[_0x482b('0x64e')])return VisuMZ[_0x482b('0x556')][_0x482b('0x21a')][_0x482b('0x6')][_0x482b('0x4aa')];else{if(_0x482b('0x23d')===_0x482b('0x239')){function _0x5c7435(){_0xc31971[_0x482b('0x389')][_0x482b('0x2b4')][_0x482b('0x460')](this),this['requestMotion'](_0x482b('0xc8'));}}else return![];}},Sprite_Damage['prototype'][_0x482b('0x186')]=function(){const _0x55527b=VisuMZ['BattleCore'][_0x482b('0x21a')]['Damage'];this[_0x482b('0x483')]=_0x55527b[_0x482b('0xef')][_0x482b('0x13c')](0x0),this['_flashDuration']=_0x55527b[_0x482b('0x2ee')];},Sprite_Damage['prototype'][_0x482b('0x111')]=function(_0x426c05,_0x5c461f){this['_flashColor']=_0x5c461f[_0x482b('0x6d5')]||[0x0,0x0,0x0,0x0],this['_flashColor']=JsonEx['makeDeepCopy'](this['_flashColor']),this[_0x482b('0x638')]=_0x5c461f[_0x482b('0x552')]||0x0;const _0x479d58=this[_0x482b('0x750')](),_0x40dda4=Math[_0x482b('0x35d')](_0x479d58*0xa),_0x286ecb=this[_0x482b('0x647')](_0x40dda4,_0x479d58);_0x286ecb[_0x482b('0x615')][_0x482b('0x5cb')]=ColorManager['getColor'](_0x5c461f[_0x482b('0x5cb')]),_0x286ecb['bitmap']['drawText'](_0x426c05,0x0,0x0,_0x40dda4,_0x479d58,_0x482b('0x47c')),_0x286ecb['dy']=0x0;},Sprite_Damage[_0x482b('0x389')][_0x482b('0x1ff')]=function(_0x164ccf,_0x17f79b,_0x18de91){const _0x483184=Math[_0x482b('0x577')](this['fontSize'](),ImageManager['iconHeight']),_0x2cdbda=Math['floor'](_0x483184*0xa),_0x7b3117=this[_0x482b('0x647')](_0x2cdbda,_0x483184),_0x338556=ImageManager[_0x482b('0x18c')]/0x2,_0x42013a=_0x7b3117[_0x482b('0x615')][_0x482b('0xcb')](_0x17f79b);_0x7b3117['bitmap']['textColor']=ColorManager[_0x482b('0x5f6')](_0x18de91[_0x482b('0x5cb')]),_0x7b3117[_0x482b('0x615')][_0x482b('0x31')](_0x17f79b,_0x338556,0x0,_0x2cdbda-_0x338556,_0x483184,_0x482b('0x47c'));const _0x17d81e=Math[_0x482b('0x49b')]((_0x483184-ImageManager['iconHeight'])/0x2),_0xe55fec=_0x2cdbda/0x2-ImageManager[_0x482b('0x18c')]-_0x42013a/0x2+_0x338556/0x2,_0x127038=ImageManager[_0x482b('0x55b')](_0x482b('0x6e0')),_0x2d7fdf=ImageManager[_0x482b('0x18c')],_0x49d8e0=ImageManager[_0x482b('0x1e3')],_0x1a2a4d=_0x164ccf%0x10*_0x2d7fdf,_0x25852d=Math[_0x482b('0x35d')](_0x164ccf/0x10)*_0x49d8e0;_0x7b3117[_0x482b('0x615')][_0x482b('0x56a')](_0x127038,_0x1a2a4d,_0x25852d,_0x2d7fdf,_0x49d8e0,_0xe55fec,_0x17d81e),this['_flashColor']=_0x18de91[_0x482b('0x6d5')]||[0x0,0x0,0x0,0x0],this['_flashColor']=JsonEx[_0x482b('0x4a')](this[_0x482b('0x483')]),this[_0x482b('0x638')]=_0x18de91['flashDuration']||0x0,_0x7b3117['dy']=0x0;},VisuMZ[_0x482b('0x654')]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x482b('0x389')]['updateFrame'],Sprite_StateIcon[_0x482b('0x389')][_0x482b('0x36d')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x55e')][_0x482b('0x460')](this),this[_0x482b('0x15f')]=this[_0x482b('0x192')]>0x0?!![]:![];};function Sprite_HpGauge(){this[_0x482b('0x2e6')](...arguments);}Sprite_HpGauge[_0x482b('0x389')]=Object[_0x482b('0x591')](Sprite_Gauge[_0x482b('0x389')]),Sprite_HpGauge['prototype'][_0x482b('0x31a')]=Sprite_HpGauge,Sprite_HpGauge[_0x482b('0x389')][_0x482b('0x2e6')]=function(){Sprite_Gauge[_0x482b('0x389')][_0x482b('0x2e6')][_0x482b('0x460')](this);},Sprite_HpGauge[_0x482b('0x389')]['gaugeX']=function(){return 0x0;},Sprite_HpGauge[_0x482b('0x389')][_0x482b('0x32a')]=function(){this['bitmap'][_0x482b('0x2f6')]();const _0x2dc172=this['currentValue']();if(!isNaN(_0x2dc172)){if(_0x482b('0x415')===_0x482b('0x415'))this[_0x482b('0x33e')]();else{function _0xfe3139(){_0x5c04e6['changeAtbCastTime'](_0x5619df);if(_0xfeea03)_0x32d680[_0x482b('0x493')]();}}}},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x54a')]=function(){if(!$gameSystem[_0x482b('0x386')]())return![];return![];},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x2f7')]=function(){return 0x0;},Spriteset_Battle['prototype'][_0x482b('0x74f')]=function(){return 0x0;},VisuMZ[_0x482b('0x654')][_0x482b('0x494')]=Spriteset_Battle[_0x482b('0x389')][_0x482b('0x334')],Spriteset_Battle[_0x482b('0x389')][_0x482b('0x334')]=function(){VisuMZ[_0x482b('0x654')]['Spriteset_Battle_createLowerLayer'][_0x482b('0x460')](this),this[_0x482b('0x643')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x182')]=Spriteset_Battle[_0x482b('0x389')]['update'],Spriteset_Battle[_0x482b('0x389')][_0x482b('0x353')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x182')][_0x482b('0x460')](this),this[_0x482b('0x404')]();},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x643')]=function(){this['_weather']=new Weather(),this[_0x482b('0x159')][_0x482b('0x2ff')](this[_0x482b('0x76b')]);},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x404')]=function(){this['_weather'][_0x482b('0x49c')]=$gameScreen[_0x482b('0x44b')](),this[_0x482b('0x76b')][_0x482b('0x5a4')]=$gameScreen['weatherPower']();},Game_Interpreter[_0x482b('0x389')][_0x482b('0x30c')]=function(_0x2b1215){$gameScreen[_0x482b('0x35e')](_0x2b1215[0x0],_0x2b1215[0x1],_0x2b1215[0x2]);if(_0x2b1215[0x3])this['wait'](_0x2b1215[0x2]);return!![];},VisuMZ[_0x482b('0x654')][_0x482b('0x1b3')]=Game_Interpreter[_0x482b('0x389')][_0x482b('0x762')],Game_Interpreter[_0x482b('0x389')][_0x482b('0x762')]=function(_0x32ae20){if(SceneManager[_0x482b('0x23a')]()){if(_0x482b('0x601')===_0x482b('0x601'))return SceneManager['_scene'][_0x482b('0x5f')][_0x482b('0x54')](_0x32ae20[0x0],_0x32ae20[0x1]),!![];else{function _0x101580(){_0x32c6ac[_0x482b('0x389')][_0x482b('0x414')]['call'](this);}}}else{if(_0x482b('0x53')===_0x482b('0x609')){function _0x4d00f5(){if(!_0x311a16['isSceneBattle']())return;if(!this[_0x482b('0x67c')]())return;if(_0x598062['length']<=0x0)return;_0x3e8480=_0x1111b4||{},_0x474c83[_0x482b('0x5cb')]=_0x2d6248['textColor']||'#ffffff',_0x28bcfb['flashColor']=_0x5390d0[_0x482b('0x6d5')]||[0x0,0x0,0x0,0x0],_0x267bd6[_0x482b('0x552')]=_0x372d73[_0x482b('0x552')]||0x0,this[_0x482b('0x67c')]()[_0x482b('0x1ff')](_0xf8807d,_0x4fc286,_0x3ffea6);}}else return VisuMZ['BattleCore'][_0x482b('0x1b3')]['call'](this,_0x32ae20);}},Spriteset_Battle[_0x482b('0x389')]['changeBattlebacks']=function(_0x11808f,_0x78661f){_0x11808f=_0x11808f||this[_0x482b('0x64')][_0x482b('0x1fb')](),_0x78661f=_0x78661f||this[_0x482b('0x50f')][_0x482b('0x6df')]();const _0x2390ba=ImageManager[_0x482b('0x259')](_0x11808f);_0x2390ba[_0x482b('0x173')](this[_0x482b('0x433')][_0x482b('0xa1')](this,this[_0x482b('0x64')],_0x2390ba));const _0x560fbd=ImageManager[_0x482b('0x142')](_0x78661f);_0x560fbd[_0x482b('0x173')](this['updateBattlebackBitmap'][_0x482b('0xa1')](this,this[_0x482b('0x50f')],_0x560fbd));},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x433')]=function(_0x518c28,_0x414fb7){_0x518c28[_0x482b('0x615')]=_0x414fb7;},VisuMZ[_0x482b('0x654')]['Spriteset_Battle_createBattleField']=Spriteset_Battle[_0x482b('0x389')]['createBattleField'],Spriteset_Battle[_0x482b('0x389')][_0x482b('0x4a2')]=function(){VisuMZ['BattleCore']['Spriteset_Battle_createBattleField'][_0x482b('0x460')](this),this[_0x482b('0x261')]();},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x261')]=function(){this[_0x482b('0x723')]=new Sprite(),this['_battleField'][_0x482b('0x2ff')](this['_battlerContainer']),this[_0x482b('0x568')]=new Sprite(),this[_0x482b('0x159')][_0x482b('0x2ff')](this[_0x482b('0x568')]),this['_damageContainer']=new Sprite(),this[_0x482b('0x33c')]['x']=this[_0x482b('0x159')]['x'],this[_0x482b('0x33c')]['y']=this[_0x482b('0x159')]['y'],this[_0x482b('0x2ff')](this[_0x482b('0x33c')]);if(!this['isFlipped']())return;this[_0x482b('0x723')][_0x482b('0x325')]['x']=-0x1,this[_0x482b('0x723')]['x']=this[_0x482b('0x159')][_0x482b('0x2d0')],this[_0x482b('0x568')][_0x482b('0x325')]['x']=-0x1,this[_0x482b('0x568')]['x']=this[_0x482b('0x159')]['width'],this[_0x482b('0x33c')]['scale']['x']=-0x1,this['_damageContainer']['x']=this[_0x482b('0x159')]['x']+this[_0x482b('0x159')][_0x482b('0x2d0')];},Spriteset_Battle['prototype'][_0x482b('0x520')]=function(){Imported[_0x482b('0x64e')]&&VisuMZ[_0x482b('0x556')][_0x482b('0x21a')]['UI'][_0x482b('0x585')]&&this[_0x482b('0x194')]();const _0x567e12=$gameTroop[_0x482b('0x264')](),_0x44d40d=[];for(const _0x1b188c of _0x567e12){_0x44d40d['push'](new Sprite_Enemy(_0x1b188c));}_0x44d40d[_0x482b('0x2ce')](this['compareEnemySprite'][_0x482b('0xa1')](this));for(const _0x3980b5 of _0x44d40d){if(_0x482b('0x5eb')!==_0x482b('0x5eb')){function _0x566542(){this[_0x482b('0x539')]();}}else this['_battlerContainer']['addChild'](_0x3980b5);}this[_0x482b('0x3f3')]=_0x44d40d;},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x1c5')]=function(){this[_0x482b('0x71a')]=[];for(let _0x4ddab6=0x0;_0x4ddab6<$gameParty[_0x482b('0x131')]();_0x4ddab6++){const _0x2acc08=new Sprite_Actor();_0x2acc08[_0x482b('0x352')]($gameParty[_0x482b('0x4f6')]()[_0x4ddab6]),this[_0x482b('0x71a')][_0x482b('0x260')](_0x2acc08),this[_0x482b('0x723')][_0x482b('0x2ff')](_0x2acc08);}},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x346')]=function(_0x281112,_0x31ada2,_0x1b910b,_0x116e59){const _0x568e33=this['isMVAnimation'](_0x31ada2),_0x1a85ba=new(_0x568e33?Sprite_AnimationMV:Sprite_Animation)(),_0x480b1b=this[_0x482b('0x589')](_0x281112);this['animationShouldMirror'](_0x281112[0x0])&&(_0x1b910b=!_0x1b910b),_0x1a85ba[_0x482b('0x56b')]=_0x281112,_0x1a85ba[_0x482b('0xb6')](_0x480b1b,_0x31ada2,_0x1b910b,_0x116e59),this[_0x482b('0x514')](_0x1a85ba);},Spriteset_Battle['prototype'][_0x482b('0x514')]=function(_0x307c9d){if(this[_0x482b('0xb5')](_0x307c9d))this[_0x482b('0x6f9')]()[_0x482b('0x2ff')](_0x307c9d);else{if(_0x482b('0x154')!==_0x482b('0x116'))this[_0x482b('0x568')][_0x482b('0x2ff')](_0x307c9d);else{function _0x1e26b9(){this[_0x482b('0x1c4')]['x']=_0x58a46[_0x482b('0x2d0')]*0xa,this[_0x482b('0x1c4')]['y']=_0xc10f44[_0x482b('0x2c3')]*0xa;}}}this[_0x482b('0x26e')][_0x482b('0x260')](_0x307c9d);},Spriteset_Battle[_0x482b('0x389')][_0x482b('0xb5')]=function(_0x4a0bcc){if(!_0x4a0bcc)return![];if(!_0x4a0bcc['_animation'])return![];if(_0x4a0bcc[_0x482b('0x312')][_0x482b('0x204')]!==0x0)return![];if(!_0x4a0bcc['targetObjects'][0x0])return![];if(!_0x4a0bcc[_0x482b('0x56b')][0x0][_0x482b('0x3e4')]())return![];if($gameSystem[_0x482b('0x386')]())return![];if(!this[_0x482b('0x6f9')]())return![];return Window_BattleStatus[_0x482b('0x389')][_0x482b('0x301')]()===_0x482b('0x2fa');},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x6f9')]=function(){if(!SceneManager[_0x482b('0x455')])return;if(!SceneManager[_0x482b('0x455')][_0x482b('0x571')])return;if(!SceneManager[_0x482b('0x455')][_0x482b('0x571')][_0x482b('0x3c9')])return;return SceneManager[_0x482b('0x455')][_0x482b('0x571')][_0x482b('0x3c9')];},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x49d')]=function(_0x24a26e){this[_0x482b('0x2f9')](_0x24a26e);for(const _0x19ed2a of _0x24a26e['targetObjects']){_0x19ed2a[_0x482b('0x295')]&&_0x19ed2a[_0x482b('0x295')]();}_0x24a26e[_0x482b('0x4ab')]();},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x2f9')]=function(_0x449e1e){this[_0x482b('0x26e')][_0x482b('0x768')](_0x449e1e),this[_0x482b('0xb5')](_0x449e1e)?this[_0x482b('0x6f9')]()['removeChild'](_0x449e1e):this[_0x482b('0x568')][_0x482b('0xa7')](_0x449e1e);},VisuMZ[_0x482b('0x654')]['Spriteset_Battle_updateActors']=Spriteset_Battle[_0x482b('0x389')][_0x482b('0x324')],Spriteset_Battle[_0x482b('0x389')][_0x482b('0x324')]=function(){VisuMZ[_0x482b('0x654')]['Spriteset_Battle_updateActors'][_0x482b('0x460')](this),this[_0x482b('0x5c9')]();},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x5c9')]=function(){this[_0x482b('0x723')]['children'][_0x482b('0x2ce')](this[_0x482b('0xd1')][_0x482b('0xa1')](this));const _0x405373=BattleManager[_0x482b('0x2b1')];if(_0x405373){if(_0x482b('0x320')===_0x482b('0x320')){if(_0x405373[_0x482b('0x3e4')]()&&!$gameSystem[_0x482b('0x386')]())return;const _0x247b49=_0x405373['battler']();if(_0x247b49&&_0x405373['isActor']())this[_0x482b('0x723')][_0x482b('0x2ff')](_0x247b49);}else{function _0x52b239(){const _0x562cf7=this[_0x482b('0x548')]();_0x20a1e8[_0x482b('0x654')]['Game_BattlerBase_addNewState']['call'](this,_0x5b65ff),this['isEnemy']()&&_0x562cf7&&this[_0x482b('0x2a4')]()&&(this[_0x482b('0x444')]=!this[_0x482b('0xac')](),_0x1dbbb0[_0x482b('0x27e')](this[_0x482b('0x748')]()));}}}},Spriteset_Battle[_0x482b('0x389')][_0x482b('0xd1')]=function(_0x333dbd,_0x1825ec){if(_0x333dbd['_baseY']!==_0x1825ec[_0x482b('0x11')]){if(_0x482b('0x6d2')!==_0x482b('0x6d2')){function _0xeb9337(){_0x5c8d76[_0x482b('0x30a')](_0x215161,_0x3b9633,_0x59b50f,_0x502620,_0x482cd4,-0x1),this[_0x482b('0x1a1')]();}}else return _0x333dbd[_0x482b('0x11')]-_0x1825ec[_0x482b('0x11')];}else return _0x1825ec['spriteId']-_0x333dbd['spriteId'];},Spriteset_Battle['prototype'][_0x482b('0x3e3')]=function(){return![];},Spriteset_Battle[_0x482b('0x389')]['isAnyoneFloating']=function(){return this[_0x482b('0x627')]()['some'](_0x46bd4f=>_0x46bd4f['isFloating']());},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x533')]=function(){return this[_0x482b('0x627')]()[_0x482b('0x331')](_0x447551=>_0x447551[_0x482b('0x559')]());},Spriteset_Battle[_0x482b('0x389')][_0x482b('0x1c0')]=function(){return this['battlerSprites']()['some'](_0xdd17e8=>_0xdd17e8[_0x482b('0x3bd')]());},VisuMZ['BattleCore'][_0x482b('0x207')]=Window_ItemList[_0x482b('0x389')][_0x482b('0x399')],Window_ItemList['prototype'][_0x482b('0x399')]=function(){if(SceneManager[_0x482b('0x23a')]()){if(SceneManager[_0x482b('0x455')][_0x482b('0x301')]()===_0x482b('0x6ff')){if(_0x482b('0x157')!==_0x482b('0x157')){function _0x24f267(){if(_0x2e5f11[_0x482b('0x408')](_0x36cbde))return!![];return![];}}else return VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x2dd')][_0x482b('0x47f')];}else return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2dd')][_0x482b('0x693')];}else return VisuMZ[_0x482b('0x654')][_0x482b('0x207')][_0x482b('0x460')](this);},VisuMZ[_0x482b('0x654')][_0x482b('0x70b')]=Window_SkillList['prototype']['maxCols'],Window_SkillList[_0x482b('0x389')][_0x482b('0x399')]=function(){if(SceneManager[_0x482b('0x23a')]())return SceneManager[_0x482b('0x455')][_0x482b('0x301')]()==='border'?VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x2dd')]['SkillItemBorderCols']:VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2dd')][_0x482b('0x693')];else{if(_0x482b('0x4b0')!=='TCWXK'){function _0x298cdc(){this[_0x482b('0x5b1')]=_0x482b('0x41');}}else return VisuMZ[_0x482b('0x654')][_0x482b('0x70b')][_0x482b('0x460')](this);}},VisuMZ[_0x482b('0x654')][_0x482b('0x5de')]=Window_Options[_0x482b('0x389')][_0x482b('0x1d1')],Window_Options['prototype'][_0x482b('0x1d1')]=function(){VisuMZ['BattleCore'][_0x482b('0x5de')][_0x482b('0x460')](this),this[_0x482b('0x59d')](),this[_0x482b('0x38')]();},Window_Options[_0x482b('0x389')][_0x482b('0x59d')]=function(){if(VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x28f')]['AddOption']){if(_0x482b('0x7c')!==_0x482b('0x251'))this[_0x482b('0x17f')](),this[_0x482b('0x321')]();else{function _0x12dc5d(){const _0x22918e=_0x17f69a[_0x482b('0x127')]('['+_0x5541f0['$1'][_0x482b('0x17')](/\d+/g)+']');for(const _0x58514d of _0x22918e){if(!_0x145d1b[_0x482b('0x31c')](_0x58514d))return!![];}return![];}}}},Window_Options[_0x482b('0x389')][_0x482b('0x38')]=function(){if(!VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x59c')]['AddHpGaugeOption'])return;const _0x3ca027=TextManager[_0x482b('0x144')],_0xe9c83f='visualHpGauge';this[_0x482b('0x628')](_0x3ca027,_0xe9c83f);},Window_Options[_0x482b('0x389')][_0x482b('0x17f')]=function(){const _0x4110e6=TextManager[_0x482b('0x3f9')],_0x3c3d7e=_0x482b('0x6f');this[_0x482b('0x628')](_0x4110e6,_0x3c3d7e);},Window_Options[_0x482b('0x389')][_0x482b('0x321')]=function(){const _0xdda87e=TextManager['autoBattleStyle'],_0x16fea0=_0x482b('0x65d');this['addCommand'](_0xdda87e,_0x16fea0);},VisuMZ[_0x482b('0x654')]['Window_Options_statusText']=Window_Options[_0x482b('0x389')]['statusText'],Window_Options[_0x482b('0x389')][_0x482b('0x126')]=function(_0x4debef){const _0x554434=this['commandSymbol'](_0x4debef);if(_0x554434==='autoBattleUseSkills'){if(_0x482b('0x595')!==_0x482b('0x595')){function _0x1282d3(){return this[_0x482b('0x718')](_0x482b('0x651'));}}else return this[_0x482b('0x6f6')]();}else return VisuMZ['BattleCore'][_0x482b('0x6c1')]['call'](this,_0x4debef);},Window_Options[_0x482b('0x389')][_0x482b('0x6f6')]=function(){const _0x2e7fd2=VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x28f')],_0x1bc908=this[_0x482b('0x33a')](_0x482b('0x65d'));return _0x1bc908?_0x2e7fd2[_0x482b('0x765')]:_0x2e7fd2[_0x482b('0x549')];},Window_ShopStatus[_0x482b('0x389')][_0x482b('0x174')]=function(){const _0x212469=DataManager[_0x482b('0x291')](this['_item']),_0x474b99=VisuMZ[_0x482b('0x4e0')][_0x212469];if(!_0x474b99)return this[_0x482b('0x77a')]();const _0x50ad2d=_0x482b('0x1f2')[_0x482b('0x658')](this[_0x482b('0x464')]['damage'][_0x482b('0x49c')]),_0x5b0825=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item'][_0x482b('0x784')][_0x482b('0x49c')]];return _0x474b99[_0x50ad2d][_0x482b('0x658')](_0x5b0825);},Window_ShopStatus[_0x482b('0x389')][_0x482b('0x3d1')]=function(){const _0x622d0b=DataManager[_0x482b('0x291')](this[_0x482b('0x464')]),_0x1a16a8=VisuMZ[_0x482b('0x4e0')][_0x622d0b];if(!_0x1a16a8)return this[_0x482b('0x1ec')]();return _0x1a16a8[_0x482b('0x8f')][_0x482b('0x460')](this);},VisuMZ[_0x482b('0x654')][_0x482b('0x1e2')]=Window_PartyCommand[_0x482b('0x389')][_0x482b('0x2e6')],Window_PartyCommand[_0x482b('0x389')][_0x482b('0x2e6')]=function(_0x36a349){VisuMZ[_0x482b('0x654')][_0x482b('0x1e2')][_0x482b('0x460')](this,_0x36a349),this[_0x482b('0x68f')](_0x36a349);},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x68f')]=function(_0x1a6ed7){const _0x3839ce=new Rectangle(0x0,0x0,_0x1a6ed7[_0x482b('0x2d0')],_0x1a6ed7[_0x482b('0x2c3')]);this[_0x482b('0x5bf')]=new Window_Base(_0x3839ce),this[_0x482b('0x5bf')][_0x482b('0x32e')]=0x0,this[_0x482b('0x2ff')](this[_0x482b('0x5bf')]),this[_0x482b('0x4f8')]();},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x704')]=function(){Window_Command[_0x482b('0x389')][_0x482b('0x704')]['call'](this);if(this[_0x482b('0x5bf')])this[_0x482b('0x4f8')]();},Window_PartyCommand[_0x482b('0x389')]['updateCommandNameWindow']=function(){const _0x3d418c=this[_0x482b('0x5bf')];_0x3d418c[_0x482b('0xa4')]['clear']();const _0x63ab10=this['commandStyleCheck'](this['index']());if(_0x63ab10===_0x482b('0x220')&&this['maxItems']()>0x0){const _0x1bed82=this[_0x482b('0x528')](this['index']());let _0x77e249=this[_0x482b('0x3da')](this['index']());_0x77e249=_0x77e249[_0x482b('0x13a')](/\\I\[(\d+)\]/gi,''),_0x3d418c[_0x482b('0x32d')](),this[_0x482b('0x78a')](_0x77e249,_0x1bed82),this[_0x482b('0x1')](_0x77e249,_0x1bed82),this[_0x482b('0x6f0')](_0x77e249,_0x1bed82);}},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x78a')]=function(_0x45e2b1,_0x4d28b8){},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x1')]=function(_0x4e9382,_0x2910fc){const _0x410ea9=this[_0x482b('0x5bf')];_0x410ea9[_0x482b('0x31')](_0x4e9382,0x0,_0x2910fc['y'],_0x410ea9[_0x482b('0x13')],'center');},Window_PartyCommand['prototype'][_0x482b('0x6f0')]=function(_0x15248b,_0x16454e){const _0x1840a3=this[_0x482b('0x5bf')],_0x1e8b3e=$gameSystem[_0x482b('0x667')](),_0x7d36cb=_0x16454e['x']+Math[_0x482b('0x35d')](_0x16454e[_0x482b('0x2d0')]/0x2)+_0x1e8b3e;_0x1840a3['x']=_0x1840a3[_0x482b('0x2d0')]/-0x2+_0x7d36cb,_0x1840a3['y']=Math[_0x482b('0x35d')](_0x16454e[_0x482b('0x2c3')]/0x2);},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x4f1')]=function(){this[_0x482b('0x345')](),this[_0x482b('0x12a')](),this[_0x482b('0x2aa')](),this[_0x482b('0x29')](),this[_0x482b('0x575')]();},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x345')]=function(){const _0x144820=this[_0x482b('0x58a')](),_0x551952=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['PartyCmd'][_0x482b('0x4b6')],_0x3c310a=_0x144820===_0x482b('0x570')?TextManager[_0x482b('0x1b6')]:_0x482b('0xbb')[_0x482b('0x658')](_0x551952,TextManager['fight']),_0x1c9ee4=this[_0x482b('0x3bf')]();this[_0x482b('0x628')](_0x3c310a,_0x482b('0x1b6'),_0x1c9ee4);},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x3bf')]=function(){return!![];},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x12a')]=function(){if(!this[_0x482b('0x1b1')]())return;const _0x5bb809=this[_0x482b('0x58a')](),_0x29cf04=VisuMZ[_0x482b('0x654')]['Settings']['PartyCmd'][_0x482b('0x1b8')],_0x5d1f7c=_0x5bb809==='text'?TextManager[_0x482b('0x789')]:_0x482b('0xbb')['format'](_0x29cf04,TextManager[_0x482b('0x789')]),_0x5727be=this['isAutoBattleCommandEnabled']();this[_0x482b('0x628')](_0x5d1f7c,_0x482b('0x789'),_0x5727be);},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x1b1')]=function(){return VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x387')][_0x482b('0xe1')];},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x11b')]=function(){return!![];},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x2aa')]=function(){},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x29')]=function(){if(!this[_0x482b('0x59a')]())return;const _0x1abcee=this[_0x482b('0x58a')](),_0x692cb1=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x387')][_0x482b('0x19c')],_0x3e0ae7=_0x1abcee===_0x482b('0x570')?TextManager['options']:_0x482b('0xbb')['format'](_0x692cb1,TextManager[_0x482b('0x58')]),_0xe68478=this[_0x482b('0x2be')]();this[_0x482b('0x628')](_0x3e0ae7,_0x482b('0x58'),_0xe68478);},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x59a')]=function(){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['PartyCmd'][_0x482b('0x72e')];},Window_PartyCommand[_0x482b('0x389')]['isOptionsCommandEnabled']=function(){return!![];},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x575')]=function(){const _0x55a9a9=this[_0x482b('0x58a')](),_0x3fd145=VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x387')][_0x482b('0x5db')],_0x1289d0=_0x55a9a9===_0x482b('0x570')?TextManager[_0x482b('0x2dc')]:_0x482b('0xbb')[_0x482b('0x658')](_0x3fd145,TextManager['escape']),_0x42f069=this[_0x482b('0x3f')]();this[_0x482b('0x628')](_0x1289d0,_0x482b('0x2dc'),_0x42f069);},Window_PartyCommand['prototype'][_0x482b('0x3f')]=function(){return BattleManager[_0x482b('0xcd')]();},Window_PartyCommand['prototype']['itemTextAlign']=function(){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x387')]['CmdTextAlign'];},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x149')]=function(_0x5f2942){const _0x193f34=this[_0x482b('0x1f0')](_0x5f2942);if(_0x193f34===_0x482b('0xee'))this[_0x482b('0x57f')](_0x5f2942);else{if(_0x193f34==='icon'){if(_0x482b('0x538')===_0x482b('0x538'))this[_0x482b('0xf8')](_0x5f2942);else{function _0x2a5569(){for(const _0x59c997 of _0x32a10d){const _0x4913c3=_0x2a2b45[0x0][_0x482b('0x658')](_0x59c997[0x0],_0x78a9db[0x0]),_0x1d55ea=_0x57ff9a[0x1][_0x482b('0x658')](_0x59c997[0x1],_0x5f0d3a[0x1])[_0x482b('0x6b6')](),_0x5189d2=new _0x42f057(_0x2f2123['format'](_0x1d55ea),'i');_0x2f919c[_0x4913c3]=_0x5189d2;}}}}else Window_Command[_0x482b('0x389')][_0x482b('0x149')][_0x482b('0x460')](this,_0x5f2942);}},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x58a')]=function(){return VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x387')][_0x482b('0x41d')];},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x1f0')]=function(_0x5552b4){if(_0x5552b4<0x0)return _0x482b('0x570');const _0x56c5c1=this['commandStyle']();if(_0x56c5c1!==_0x482b('0x1d9'))return _0x56c5c1;else{if(this[_0x482b('0x1c2')]()>0x0){if(_0x482b('0x34')===_0x482b('0x565')){function _0x2275e3(){if(!_0x17f0c0['isSideView']())return;const _0x117a1c=this[_0x482b('0x67c')]();if(!_0x117a1c)return;if(_0x46ff84)this[_0x482b('0x557')](_0x452e52,_0x27fde9,![]);_0x29faca+=_0x117a1c[_0x482b('0x28e')]-_0x117a1c[_0x482b('0x41e')],_0x61bd26+=_0x117a1c[_0x482b('0x11')]-_0x117a1c[_0x482b('0x10a')],_0x117a1c['startMove'](_0xf02f50,_0x2244ac,_0xc37040);if(_0x595185[_0x482b('0x64e')])_0x117a1c[_0x482b('0x15b')](_0x57b5be||_0x482b('0x76f'));}}else{const _0x1247f7=this[_0x482b('0x3da')](_0x5552b4);if(_0x1247f7[_0x482b('0x17')](/\\I\[(\d+)\]/i)){const _0xd7ebd7=this[_0x482b('0x528')](_0x5552b4),_0x1fab46=this[_0x482b('0x1b0')](_0x1247f7)[_0x482b('0x2d0')];if(_0x1fab46<=_0xd7ebd7[_0x482b('0x2d0')])return _0x482b('0xee');else{if(_0x482b('0xa2')!==_0x482b('0x310'))return _0x482b('0x220');else{function _0x4f30fd(){_0x1a6abd['BattleCore'][_0x482b('0x1e2')][_0x482b('0x460')](this,_0x15bd58),this[_0x482b('0x68f')](_0x2accc0);}}}}}}}return _0x482b('0x570');},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x57f')]=function(_0x45e102){const _0x78ba7b=this['itemLineRect'](_0x45e102),_0x4ead8a=this[_0x482b('0x3da')](_0x45e102),_0x1770cd=this[_0x482b('0x1b0')](_0x4ead8a)[_0x482b('0x2d0')];this[_0x482b('0x2df')](this['isCommandEnabled'](_0x45e102));const _0x39641=this[_0x482b('0x39c')]();if(_0x39641===_0x482b('0x161'))this[_0x482b('0x5a')](_0x4ead8a,_0x78ba7b['x']+_0x78ba7b[_0x482b('0x2d0')]-_0x1770cd,_0x78ba7b['y'],_0x1770cd);else{if(_0x39641==='center'){const _0x27159b=_0x78ba7b['x']+Math[_0x482b('0x35d')]((_0x78ba7b[_0x482b('0x2d0')]-_0x1770cd)/0x2);this['drawTextEx'](_0x4ead8a,_0x27159b,_0x78ba7b['y'],_0x1770cd);}else{if(_0x482b('0x167')===_0x482b('0x167'))this[_0x482b('0x5a')](_0x4ead8a,_0x78ba7b['x'],_0x78ba7b['y'],_0x1770cd);else{function _0x3bc34f(){if(this[_0x482b('0x27b')])this['_shadowSprite']['y']=-this[_0x482b('0x27b')][_0x482b('0x569')]()-0x2;}}}}},Window_PartyCommand[_0x482b('0x389')][_0x482b('0xf8')]=function(_0x1a00b4){this[_0x482b('0x3da')](_0x1a00b4)[_0x482b('0x17')](/\\I\[(\d+)\]/i);const _0x2e1e13=Number(RegExp['$1'])||0x0,_0x51c912=this[_0x482b('0x528')](_0x1a00b4),_0x22a5a6=_0x51c912['x']+Math[_0x482b('0x35d')]((_0x51c912[_0x482b('0x2d0')]-ImageManager[_0x482b('0x18c')])/0x2),_0x29be52=_0x51c912['y']+(_0x51c912[_0x482b('0x2c3')]-ImageManager[_0x482b('0x1e3')])/0x2;this[_0x482b('0x6a6')](_0x2e1e13,_0x22a5a6,_0x29be52);},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x83')]=function(){},Window_PartyCommand[_0x482b('0x389')][_0x482b('0x626')]=function(){Window_Command[_0x482b('0x389')][_0x482b('0x626')][_0x482b('0x460')](this);const _0x2010bd=this[_0x482b('0x301')]();if(_0x2010bd===_0x482b('0x6ff')){if(_0x482b('0x6f5')===_0x482b('0xde')){function _0x10d737(){return _0x2af322[_0x482b('0x26a')]();}}else this[_0x482b('0x6db')]();}},Window_PartyCommand[_0x482b('0x389')]['battleLayoutStyle']=function(){if(this[_0x482b('0x36c')])return this[_0x482b('0x36c')];return this[_0x482b('0x36c')]=SceneManager[_0x482b('0x455')]['battleLayoutStyle'](),this[_0x482b('0x36c')];},Window_PartyCommand['prototype'][_0x482b('0x776')]=function(){const _0x787a02=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x387')],_0x3c4ea8=this[_0x482b('0xd0')]();switch(_0x3c4ea8){case _0x482b('0x1b6'):this[_0x482b('0x620')][_0x482b('0x60c')](_0x787a02[_0x482b('0x438')]);break;case _0x482b('0x789'):this[_0x482b('0x620')][_0x482b('0x60c')](_0x787a02[_0x482b('0x677')]);break;case _0x482b('0x58'):this[_0x482b('0x620')][_0x482b('0x60c')](_0x787a02['HelpOptions']);break;case _0x482b('0x2dc'):this[_0x482b('0x620')][_0x482b('0x60c')](_0x787a02['HelpEscape']);break;default:this['_helpWindow'][_0x482b('0x60c')]('');break;}},VisuMZ[_0x482b('0x654')][_0x482b('0x1e8')]=Window_ActorCommand['prototype'][_0x482b('0x2e6')],Window_ActorCommand[_0x482b('0x389')][_0x482b('0x2e6')]=function(_0x564a5c){VisuMZ[_0x482b('0x654')][_0x482b('0x1e8')]['call'](this,_0x564a5c),this[_0x482b('0x68f')](_0x564a5c);},Window_ActorCommand[_0x482b('0x389')]['createCommandNameWindow']=function(_0x3bab66){const _0x4cc332=new Rectangle(0x0,0x0,_0x3bab66[_0x482b('0x2d0')],_0x3bab66[_0x482b('0x2c3')]);this[_0x482b('0x5bf')]=new Window_Base(_0x4cc332),this[_0x482b('0x5bf')][_0x482b('0x32e')]=0x0,this[_0x482b('0x2ff')](this[_0x482b('0x5bf')]),this[_0x482b('0x4f8')]();},Window_ActorCommand[_0x482b('0x389')]['callUpdateHelp']=function(){Window_Command[_0x482b('0x389')][_0x482b('0x704')][_0x482b('0x460')](this);if(this[_0x482b('0x5bf')])this[_0x482b('0x4f8')]();},Window_ActorCommand[_0x482b('0x389')]['updateCommandNameWindow']=function(){const _0x537555=this[_0x482b('0x5bf')];_0x537555[_0x482b('0xa4')][_0x482b('0x2f6')]();const _0x44ce8b=this[_0x482b('0x1f0')](this[_0x482b('0x508')]());if(_0x44ce8b===_0x482b('0x220')&&this[_0x482b('0x1c2')]()>0x0){const _0x629119=this['itemLineRect'](this[_0x482b('0x508')]());let _0x588011=this[_0x482b('0x3da')](this[_0x482b('0x508')]());_0x588011=_0x588011[_0x482b('0x13a')](/\\I\[(\d+)\]/gi,''),_0x537555[_0x482b('0x32d')](),this[_0x482b('0x78a')](_0x588011,_0x629119),this['commandNameWindowDrawText'](_0x588011,_0x629119),this[_0x482b('0x6f0')](_0x588011,_0x629119);}},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x78a')]=function(_0x27edd6,_0x191d2a){},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x1')]=function(_0x59c0b7,_0x122f05){const _0x362783=this[_0x482b('0x5bf')];_0x362783['drawText'](_0x59c0b7,0x0,_0x122f05['y'],_0x362783[_0x482b('0x13')],'center');},Window_ActorCommand[_0x482b('0x389')]['commandNameWindowCenter']=function(_0x2a7d36,_0x50f028){const _0xf44ca0=this[_0x482b('0x5bf')],_0xeda152=$gameSystem[_0x482b('0x667')](),_0x526042=_0x50f028['x']+Math[_0x482b('0x35d')](_0x50f028[_0x482b('0x2d0')]/0x2)+_0xeda152;_0xf44ca0['x']=_0xf44ca0['width']/-0x2+_0x526042,_0xf44ca0['y']=Math[_0x482b('0x35d')](_0x50f028['height']/0x2);},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x4f1')]=function(){if(!this[_0x482b('0x42d')])return;const _0x378f72=this[_0x482b('0x42d')][_0x482b('0x78')]();for(const _0x2018ef of _0x378f72){if(_0x482b('0x122')===_0x482b('0x101')){function _0x4e211f(){_0x4e9e54[_0x482b('0x654')][_0x482b('0x6f4')][_0x482b('0x460')](this,_0x469641),this['setupHpGaugeSprite'](_0x561ec9);}}else this[_0x482b('0x683')](_0x2018ef[_0x482b('0x53e')]()[_0x482b('0x6b6')]());}},Window_ActorCommand[_0x482b('0x389')]['makeBattleCommand']=function(_0x333bf5){_0x333bf5===_0x482b('0x498')&&this[_0x482b('0x3c4')]();if([_0x482b('0x489'),'SKILLS']['includes'](_0x333bf5)){if(_0x482b('0x19b')!==_0x482b('0x39b'))this[_0x482b('0x29f')]();else{function _0x3d3dc0(){return this[_0x482b('0x28a')]();}}}if(_0x333bf5===_0x482b('0x297')){if(_0x482b('0x26')===_0x482b('0x178')){function _0x13af5c(){if(this[_0x482b('0x36c')])return this[_0x482b('0x36c')];return this[_0x482b('0x36c')]=_0x55a9da[_0x482b('0x654')]['Settings'][_0x482b('0x2dd')][_0x482b('0x3d')][_0x482b('0x515')]()[_0x482b('0x6b6')](),this[_0x482b('0x36c')];}}else this[_0x482b('0x333')]();}_0x333bf5===_0x482b('0x30d')&&this[_0x482b('0x25d')]();if(_0x333bf5===_0x482b('0x31b')){if(_0x482b('0x4b5')!==_0x482b('0x6ef'))this[_0x482b('0x575')]();else{function _0x2207a5(){_0x480c1d+=_0x3c608d(_0xa5c95c['$1'])/0x64;}}}_0x333bf5==='AUTO\x20BATTLE'&&this[_0x482b('0x12a')]();if(_0x333bf5[_0x482b('0x17')](/STYPE: (\d+)/i)){if(_0x482b('0x6ac')!=='vgjlR'){const _0x149704=Number(RegExp['$1']);this[_0x482b('0x55f')](_0x149704);}else{function _0x566570(){if(this['_battlePortrait']===_0x5a9ee6)this[_0x482b('0x4fe')]();this[_0x482b('0x3fa')]=_0x4f339f;if(_0x103a07[_0x482b('0x23a')]()&&_0x3d4c11[_0x482b('0x4f6')]()[_0x482b('0x24d')](this)){const _0x16054a=_0x3d9b6b[_0x482b('0x455')][_0x482b('0x571')];if(_0x16054a)_0x16054a[_0x482b('0x798')](this);}}}}else{if(_0x333bf5['match'](/STYPE: (.*)/i)){const _0x4e6379=DataManager['getStypeIdWithName'](RegExp['$1']);this[_0x482b('0x55f')](_0x4e6379);}}_0x333bf5==='ALL\x20SKILLS'&&this['addSingleSkillCommands']();if(_0x333bf5['match'](/SKILL: (\d+)/i)){if(_0x482b('0x395')!==_0x482b('0x59e')){const _0x8b9d82=Number(RegExp['$1']);this[_0x482b('0x537')]($dataSkills[_0x8b9d82]);}else{function _0x336270(){this[_0x482b('0x5cf')]()[_0x482b('0x2ff')](_0x26c7b2);if(_0x48f3e3[_0x482b('0x77')]())_0xeba72b['scale']['x']=-0x1;}}}else{if(_0x333bf5[_0x482b('0x17')](/SKILL: (.*)/i)){const _0x240ac9=DataManager[_0x482b('0x13f')](RegExp['$1']);this[_0x482b('0x537')]($dataSkills[_0x240ac9]);}}_0x333bf5===_0x482b('0x46e')&&Imported[_0x482b('0x6cc')]&&this[_0x482b('0x39d')]();},Window_ActorCommand[_0x482b('0x389')]['addAttackCommand']=function(){const _0x4e0120=$dataSkills[this['_actor'][_0x482b('0x4c2')]()];if(!_0x4e0120)return;if(!this[_0x482b('0x129')](_0x4e0120))return;const _0x595817=this[_0x482b('0x58a')](),_0x517d41=DataManager[_0x482b('0xaf')](_0x4e0120),_0x50c394=DataManager[_0x482b('0x75a')](_0x4e0120),_0x2af832=_0x595817===_0x482b('0x570')?_0x517d41:_0x482b('0xbb')[_0x482b('0x658')](_0x50c394,_0x517d41);this[_0x482b('0x628')](_0x2af832,_0x482b('0x2eb'),this[_0x482b('0x42d')][_0x482b('0x79b')]());},Window_ActorCommand[_0x482b('0x389')]['addGuardCommand']=function(){const _0x3118b7=$dataSkills[this['_actor'][_0x482b('0x30e')]()];if(!_0x3118b7)return;if(!this[_0x482b('0x129')](_0x3118b7))return;const _0x56e4da=this['commandStyle'](),_0x2e0e73=DataManager[_0x482b('0xaf')](_0x3118b7),_0x424654=DataManager[_0x482b('0x75a')](_0x3118b7),_0x568030=_0x56e4da===_0x482b('0x570')?_0x2e0e73:'\x5cI[%1]%2'[_0x482b('0x658')](_0x424654,_0x2e0e73);this[_0x482b('0x628')](_0x568030,'guard',this['_actor'][_0x482b('0x23f')]());},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x25d')]=function(){const _0x5bff05=this[_0x482b('0x58a')](),_0x9daa11=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['ActorCmd'][_0x482b('0x296')],_0x47b623=_0x5bff05===_0x482b('0x570')?TextManager[_0x482b('0x596')]:_0x482b('0xbb')[_0x482b('0x658')](_0x9daa11,TextManager[_0x482b('0x596')]),_0xcad13c=this[_0x482b('0x5fb')]();this[_0x482b('0x628')](_0x47b623,_0x482b('0x596'),_0xcad13c);},Window_ActorCommand[_0x482b('0x389')]['isItemCommandEnabled']=function(){return this[_0x482b('0x42d')]&&this[_0x482b('0x42d')][_0x482b('0x365')]();},Window_ActorCommand['prototype'][_0x482b('0x29f')]=function(){const _0x194225=this[_0x482b('0x42d')][_0x482b('0x63')]();for(const _0x2e23dc of _0x194225){if(_0x482b('0x4d')===_0x482b('0x2d2')){function _0x5baa51(){_0x45d33b=_0x3c583d>=_0x1c7bdc?_0x38b767:_0x33ebad;}}else this[_0x482b('0x55f')](_0x2e23dc);}},Window_ActorCommand[_0x482b('0x389')]['addSkillTypeCommand']=function(_0x3f02ec){let _0xd58218=$dataSystem[_0x482b('0x63')][_0x3f02ec];if(!_0xd58218)return;let _0x4612b3=_0xd58218;const _0x37ced0=this[_0x482b('0x58a')]();if(_0x37ced0===_0x482b('0x570')){if(_0x482b('0x38a')==='uOQZU')_0x4612b3=_0x4612b3[_0x482b('0x13a')](/\x1I\[(\d+)\]/gi,''),_0x4612b3=_0x4612b3[_0x482b('0x13a')](/\\I\[(\d+)\]/gi,'');else{function _0x213106(){const _0xac853c=this[_0x482b('0x528')](_0x3f18ae),_0x38b4cb=this['commandName'](_0x3a7689),_0x3899ed=this[_0x482b('0x1b0')](_0x38b4cb)[_0x482b('0x2d0')];this['changePaintOpacity'](this[_0x482b('0x1ce')](_0x322356));const _0x1ec08c=this[_0x482b('0x39c')]();if(_0x1ec08c===_0x482b('0x161'))this[_0x482b('0x5a')](_0x38b4cb,_0xac853c['x']+_0xac853c[_0x482b('0x2d0')]-_0x3899ed,_0xac853c['y'],_0x3899ed);else{if(_0x1ec08c===_0x482b('0x47c')){const _0x2d9d80=_0xac853c['x']+_0x57f91c[_0x482b('0x35d')]((_0xac853c[_0x482b('0x2d0')]-_0x3899ed)/0x2);this[_0x482b('0x5a')](_0x38b4cb,_0x2d9d80,_0xac853c['y'],_0x3899ed);}else this[_0x482b('0x5a')](_0x38b4cb,_0xac853c['x'],_0xac853c['y'],_0x3899ed);}}}}else{if(!_0xd58218[_0x482b('0x17')](/\\I\[(\d+)\]/i)){const _0x285bbc=Imported[_0x482b('0x34c')]?VisuMZ['SkillsStatesCore'][_0x482b('0x21a')][_0x482b('0x406')]:VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x427')],_0x562610=$dataSystem['magicSkills']['includes'](_0x3f02ec),_0x179b78=_0x562610?_0x285bbc[_0x482b('0x349')]:_0x285bbc[_0x482b('0x1df')];_0x4612b3='\x5cI[%1]%2'[_0x482b('0x658')](_0x179b78,_0xd58218);}}this[_0x482b('0x628')](_0x4612b3,_0x482b('0x4b1'),!![],_0x3f02ec);},Window_ActorCommand[_0x482b('0x389')]['addSingleSkillCommands']=function(){const _0x3bbe1b=this[_0x482b('0x42d')][_0x482b('0x63')](),_0x4cff69=this[_0x482b('0x42d')]['skills']();for(const _0x5a33e6 of _0x4cff69){if(!_0x5a33e6)continue;if(Imported[_0x482b('0x34c')]){if('bQLze'===_0x482b('0x526')){const _0x2a40d9=_0x3bbe1b[_0x482b('0x439')](_0x2b98de=>DataManager['getSkillTypes'](_0x5a33e6)[_0x482b('0x24d')](_0x2b98de));if(_0x2a40d9[_0x482b('0x5b8')]<=0x0)continue;}else{function _0x2e11d4(){if(_0x14033d[_0x482b('0x23a')]()){const _0x3b814e=this[_0x482b('0x2bf')]();this[_0x482b('0x238')](_0x3b814e);}}}}else{if(!_0x3bbe1b[_0x482b('0x24d')](_0x5a33e6[_0x482b('0x62c')]))continue;}this[_0x482b('0x537')](_0x5a33e6);}},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x537')]=function(_0x4dd8a4){if(!_0x4dd8a4)return;if(!this[_0x482b('0x129')](_0x4dd8a4))return;const _0x4c8988=this['commandStyle'](),_0x2770be=DataManager[_0x482b('0xaf')](_0x4dd8a4),_0x52aa88=DataManager[_0x482b('0x75a')](_0x4dd8a4),_0x3331e0=_0x4c8988===_0x482b('0x570')?_0x2770be:_0x482b('0xbb')[_0x482b('0x658')](_0x52aa88,_0x2770be),_0x4f360b=this[_0x482b('0x42d')][_0x482b('0x684')](_0x4dd8a4);this[_0x482b('0x628')](_0x3331e0,_0x482b('0x64b'),_0x4f360b,_0x4dd8a4['id']);},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x129')]=function(_0x347c8e){const _0x2b6190=_0x347c8e[_0x482b('0x4ed')];if(_0x2b6190[_0x482b('0x17')](/<COMMAND REQUIRE LEARN>/i)){if(_0x482b('0x3fb')===_0x482b('0x76')){function _0x4510ad(){return _0x481762[_0x482b('0x799')]('ok');}}else{if(!this[_0x482b('0x42d')][_0x482b('0x52f')](_0x347c8e['id']))return![];}}if(_0x2b6190[_0x482b('0x17')](/<COMMAND REQUIRE ACCESS>/i)){if(!this[_0x482b('0x42d')][_0x482b('0xab')](_0x347c8e['id']))return![];}return VisuMZ[_0x482b('0x654')]['CheckSkillCommandShowSwitches'](_0x347c8e);},VisuMZ[_0x482b('0x654')][_0x482b('0x546')]=function(_0x31fdc9){const _0xd19387=_0x31fdc9['note'];if(_0xd19387[_0x482b('0x17')](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x482b('0x3dd')!=='OHyRE'){const _0x394e94=JSON[_0x482b('0x127')]('['+RegExp['$1'][_0x482b('0x17')](/\d+/g)+']');for(const _0x305337 of _0x394e94){if(!$gameSwitches[_0x482b('0x31c')](_0x305337))return![];}return!![];}else{function _0xce323b(){return _0x40c7d1[_0x482b('0x654')][_0x482b('0x21a')]['BattleLog'][_0x482b('0x61c')];}}}if(_0xd19387[_0x482b('0x17')](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d66a9=JSON[_0x482b('0x127')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x28bf39 of _0x4d66a9){if('nwruY'===_0x482b('0x1ef')){if(!$gameSwitches[_0x482b('0x31c')](_0x28bf39))return![];}else{function _0x332bcb(){if(!_0x5f282c[_0x482b('0x23a')]())return;_0x14ac77[_0x482b('0x5a3')](_0x4e9368,_0x237c8e);const _0x3c6f43=_0x5dba48[_0x482b('0x104')](),_0x4bddba=_0xd575ab['JumpToLabel'];if(!_0x3c6f43)return;_0x51396f[_0x482b('0x78b')]--,_0x1cad4c[_0x482b('0x2b8')]=_0x1f6f19[_0x482b('0x338')][_0x182757[_0x482b('0x78b')]]||null,_0xda5641[_0x482b('0x2b8')]&&_0x4bddba[_0x482b('0x53e')]()[_0x482b('0x6b6')]()!==_0x482b('0x597')&&_0x3c6f43[_0x482b('0x6e5')]([_0x4bddba]);}}}return!![];}if(_0xd19387[_0x482b('0x17')](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x36c0a8=JSON[_0x482b('0x127')]('['+RegExp['$1'][_0x482b('0x17')](/\d+/g)+']');for(const _0xc59330 of _0x36c0a8){if($gameSwitches[_0x482b('0x31c')](_0xc59330))return!![];}return![];}if(_0xd19387[_0x482b('0x17')](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x482b('0x481')!=='rdpFE'){const _0x22c06e=JSON[_0x482b('0x127')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2310da of _0x22c06e){if(!$gameSwitches['value'](_0x2310da))return!![];}return![];}else{function _0x35b1a8(){this['push'](_0x482b('0x123'),[_0x41d7cb],_0x359328,_0x365409),this[_0x482b('0x260')](_0x482b('0x2de'),_0x4dfe98,_0x24c93c,'front\x20base',_0x3f9aa0,!![],_0x482b('0x76f'),!![]),this[_0x482b('0x260')](_0x482b('0x370'),[_0x265773],_0x482b('0x3c3')),this[_0x482b('0x260')](_0x482b('0x195'));}}}if(_0xd19387[_0x482b('0x17')](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x482b('0x655')!==_0x482b('0x2a1')){const _0x1ba600=JSON[_0x482b('0x127')]('['+RegExp['$1'][_0x482b('0x17')](/\d+/g)+']');for(const _0x239fe5 of _0x1ba600){if(!$gameSwitches[_0x482b('0x31c')](_0x239fe5))return!![];}return![];}else{function _0x50ea9a(){if(this[_0x482b('0x301')]()!==_0x482b('0x2fa'))return;this[_0x482b('0x40d')](_0x380892[_0x482b('0x508')]());}}}if(_0xd19387[_0x482b('0x17')](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5c1930=JSON[_0x482b('0x127')]('['+RegExp['$1'][_0x482b('0x17')](/\d+/g)+']');for(const _0x3a425b of _0x5c1930){if($gameSwitches[_0x482b('0x31c')](_0x3a425b))return![];}return!![];}return!![];},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x575')]=function(){const _0x3da248=this[_0x482b('0x58a')](),_0x29c1cf=VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x387')][_0x482b('0x5db')],_0x938339=_0x3da248===_0x482b('0x570')?TextManager[_0x482b('0x2dc')]:'\x5cI[%1]%2'[_0x482b('0x658')](_0x29c1cf,TextManager[_0x482b('0x2dc')]),_0x5762e6=this['isEscapeCommandEnabled']();this['addCommand'](_0x938339,'escape',_0x5762e6);},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x3f')]=function(){return BattleManager['canEscape']();},Window_ActorCommand['prototype']['addAutoBattleCommand']=function(){const _0x2f318c=this[_0x482b('0x58a')](),_0x200f7d=VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x387')][_0x482b('0x1b8')],_0x20209e=_0x2f318c===_0x482b('0x570')?TextManager[_0x482b('0x789')]:_0x482b('0xbb')[_0x482b('0x658')](_0x200f7d,TextManager[_0x482b('0x789')]),_0x24cd97=this['isAutoBattleCommandEnabled']();this[_0x482b('0x628')](_0x20209e,_0x482b('0x789'),_0x24cd97);},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x11b')]=function(){return!![];},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x39c')]=function(){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['ActorCmd'][_0x482b('0x282')];},Window_ActorCommand[_0x482b('0x389')]['drawItem']=function(_0xda931d){const _0x57f90b=this[_0x482b('0x1f0')](_0xda931d);if(_0x57f90b===_0x482b('0xee'))this[_0x482b('0x57f')](_0xda931d);else _0x57f90b===_0x482b('0x220')?this[_0x482b('0xf8')](_0xda931d):Window_Command[_0x482b('0x389')][_0x482b('0x149')][_0x482b('0x460')](this,_0xda931d);this[_0x482b('0x6b7')](_0xda931d);},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x58a')]=function(){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x427')][_0x482b('0x41d')];},Window_ActorCommand[_0x482b('0x389')]['commandStyleCheck']=function(_0x491696){if(_0x491696<0x0)return'text';const _0x2c4d1b=this[_0x482b('0x58a')]();if(_0x2c4d1b!==_0x482b('0x1d9')){if(_0x482b('0x430')===_0x482b('0x605')){function _0xc7a315(){const _0x16cbaf=_0x4ac583[_0x303464[_0x482b('0x3f8')]];if(_0x16cbaf&&!_0x44b661['includes'](_0x16cbaf))_0x5528b7[_0x482b('0x260')](_0x16cbaf);}}else return _0x2c4d1b;}else{if(this[_0x482b('0x1c2')]()>0x0){const _0x3aebba=this[_0x482b('0x3da')](_0x491696);if(_0x3aebba['match'](/\\I\[(\d+)\]/i)){if(_0x482b('0xd9')!==_0x482b('0xd9')){function _0x4ae00b(){this[_0x482b('0x723')]=new _0xc4f313(),this['_battleField'][_0x482b('0x2ff')](this[_0x482b('0x723')]),this[_0x482b('0x568')]=new _0x11d6c(),this[_0x482b('0x159')][_0x482b('0x2ff')](this[_0x482b('0x568')]),this['_damageContainer']=new _0x1e2e9d(),this[_0x482b('0x33c')]['x']=this[_0x482b('0x159')]['x'],this['_damageContainer']['y']=this[_0x482b('0x159')]['y'],this[_0x482b('0x2ff')](this['_damageContainer']);if(!this[_0x482b('0x54a')]())return;this[_0x482b('0x723')][_0x482b('0x325')]['x']=-0x1,this[_0x482b('0x723')]['x']=this[_0x482b('0x159')]['width'],this[_0x482b('0x568')][_0x482b('0x325')]['x']=-0x1,this[_0x482b('0x568')]['x']=this[_0x482b('0x159')]['width'],this[_0x482b('0x33c')][_0x482b('0x325')]['x']=-0x1,this[_0x482b('0x33c')]['x']=this[_0x482b('0x159')]['x']+this[_0x482b('0x159')]['width'];}}else{const _0x1fa337=this[_0x482b('0x528')](_0x491696),_0x3f3738=this[_0x482b('0x1b0')](_0x3aebba)['width'];if(_0x3f3738<=_0x1fa337[_0x482b('0x2d0')]){if(_0x482b('0x5c2')!==_0x482b('0x3a3'))return _0x482b('0xee');else{function _0x4f2a5a(){return 0xa;}}}else return _0x482b('0x220');}}}}return _0x482b('0x570');},Window_ActorCommand['prototype'][_0x482b('0x57f')]=function(_0x3c488f){const _0x2adee0=this[_0x482b('0x528')](_0x3c488f),_0x20ef9c=this[_0x482b('0x3da')](_0x3c488f),_0x1d421d=this[_0x482b('0x1b0')](_0x20ef9c)[_0x482b('0x2d0')];this[_0x482b('0x2df')](this[_0x482b('0x1ce')](_0x3c488f));const _0x14eda1=this[_0x482b('0x39c')]();if(_0x14eda1===_0x482b('0x161')){if(_0x482b('0x19f')!==_0x482b('0x19f')){function _0x5d3680(){return this[_0x482b('0x332')]();}}else this[_0x482b('0x5a')](_0x20ef9c,_0x2adee0['x']+_0x2adee0['width']-_0x1d421d,_0x2adee0['y'],_0x1d421d);}else{if(_0x14eda1===_0x482b('0x47c')){if(_0x482b('0x5a7')===_0x482b('0x5a7')){const _0xe46e64=_0x2adee0['x']+Math[_0x482b('0x35d')]((_0x2adee0['width']-_0x1d421d)/0x2);this[_0x482b('0x5a')](_0x20ef9c,_0xe46e64,_0x2adee0['y'],_0x1d421d);}else{function _0x13f0d6(){_0x591a7d=_0x4654b8[_0x482b('0x108')];}}}else{if(_0x482b('0x31f')===_0x482b('0x31f'))this[_0x482b('0x5a')](_0x20ef9c,_0x2adee0['x'],_0x2adee0['y'],_0x1d421d);else{function _0x4a3f10(){const _0x4ac70d=_0x578cce(_0x51055e['$1']);this[_0x482b('0x537')](_0x482b02[_0x4ac70d]);}}}}},Window_ActorCommand[_0x482b('0x389')][_0x482b('0xf8')]=function(_0x3d353a){this[_0x482b('0x3da')](_0x3d353a)['match'](/\\I\[(\d+)\]/i);const _0x3b7cc3=Number(RegExp['$1'])||0x0,_0x786112=this[_0x482b('0x528')](_0x3d353a),_0x22c70c=_0x786112['x']+Math[_0x482b('0x35d')]((_0x786112['width']-ImageManager['iconWidth'])/0x2),_0x8be49a=_0x786112['y']+(_0x786112[_0x482b('0x2c3')]-ImageManager[_0x482b('0x1e3')])/0x2;this[_0x482b('0x6a6')](_0x3b7cc3,_0x22c70c,_0x8be49a);},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x6b7')]=function(_0x506550){const _0x8321f1=this[_0x482b('0x634')](_0x506550);if(![_0x482b('0x2eb'),_0x482b('0x85'),_0x482b('0x64b')][_0x482b('0x24d')](_0x8321f1))return;const _0x4342d3=this[_0x482b('0x528')](_0x506550);let _0x272be7=null;if(_0x8321f1===_0x482b('0x2eb')){if('HIwgo'===_0x482b('0x1f9'))_0x272be7=$dataSkills[this[_0x482b('0x42d')][_0x482b('0x4c2')]()];else{function _0x5c5966(){return _0x4eb310[_0x482b('0x389')][_0x482b('0x3d2')][_0x482b('0x460')](this);;}}}else{if(_0x8321f1===_0x482b('0x85'))_0x272be7=$dataSkills[this[_0x482b('0x42d')]['attackSkillId']()];else{if(_0x482b('0x755')!==_0x482b('0x755')){function _0x35308(){this['callNextMethod']();}}else _0x272be7=$dataSkills[this[_0x482b('0xe3')][_0x506550][_0x482b('0x3e')]];}}this[_0x482b('0x525')](this['_actor'],_0x272be7,_0x4342d3['x'],_0x4342d3['y'],_0x4342d3[_0x482b('0x2d0')]);},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x525')]=function(_0x7cbdaa,_0x4b2e67,_0x29ea7a,_0x1df301,_0x28732d){if(!_0x4b2e67)return;if(Imported['VisuMZ_1_SkillsStatesCore']){if(_0x482b('0x564')!==_0x482b('0x564')){function _0x51ca22(){return _0x4ed61a['BattleCore'][_0x482b('0x21a')][_0x482b('0x2dd')]['SkillItemStandardCols'];}}else Window_Command[_0x482b('0x389')][_0x482b('0x525')][_0x482b('0x460')](this,_0x7cbdaa,_0x4b2e67,_0x29ea7a,_0x1df301,_0x28732d);}else Window_SkillList[_0x482b('0x389')][_0x482b('0x525')][_0x482b('0x460')](this,_0x4b2e67,_0x29ea7a,_0x1df301,_0x28732d);},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x83')]=function(){},Window_ActorCommand['prototype'][_0x482b('0x626')]=function(){Window_Command['prototype'][_0x482b('0x626')]['call'](this);const _0x120fb2=this[_0x482b('0x301')]();_0x120fb2===_0x482b('0x6ff')&&this[_0x482b('0x6db')]();},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x301')]=function(){if(this[_0x482b('0x36c')])return this['_battleLayoutStyle'];return this[_0x482b('0x36c')]=SceneManager[_0x482b('0x455')][_0x482b('0x301')](),this[_0x482b('0x36c')];},VisuMZ[_0x482b('0x654')][_0x482b('0x362')]=Window_ActorCommand['prototype'][_0x482b('0xb6')],Window_ActorCommand[_0x482b('0x389')]['setup']=function(_0x52b383){const _0x29382b=this['battleLayoutStyle']();if(_0x52b383&&['xp','portrait'][_0x482b('0x24d')](_0x29382b)){if(_0x482b('0x739')!=='Crpdm'){function _0x5d48e7(){_0x22be3e[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x28f')]['AddOption']&&(this[_0x482b('0x17f')](),this[_0x482b('0x321')]());}}else this[_0x482b('0x36e')](_0x52b383);}else{if(_0x52b383&&[_0x482b('0x6ff')][_0x482b('0x24d')](_0x29382b)){if('HXolx'===_0x482b('0x490')){function _0x3f81cf(){const _0xdc89ac=_0x1abc6c(_0x85d7bf['$1']);return[_0x39978f[_0x482b('0x52d')](_0xdc89ac)];}}else this[_0x482b('0x179')](_0x52b383),this[_0x482b('0x6db')]();}}VisuMZ[_0x482b('0x654')][_0x482b('0x362')][_0x482b('0x460')](this,_0x52b383),_0x52b383&&_0x52b383[_0x482b('0x67c')]()[_0x482b('0x7')]();},Window_ActorCommand['prototype'][_0x482b('0x36e')]=function(_0x22c427){const _0x4bef1a=Math['round'](Graphics[_0x482b('0x6b4')]/0x3),_0x21530e=Math[_0x482b('0x49b')](Graphics[_0x482b('0x6b4')]/$gameParty[_0x482b('0x4f6')]()['length']),_0x210c16=Math[_0x482b('0x680')](_0x4bef1a,_0x21530e),_0x4036dc=this[_0x482b('0x503')](VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x2dd')]['XPActorCommandLines']),_0x56e849=_0x21530e*_0x22c427[_0x482b('0x508')]()+(_0x21530e-_0x210c16)/0x2,_0x13186e=SceneManager['_scene'][_0x482b('0x571')]['y']-_0x4036dc;this[_0x482b('0x10d')](_0x56e849,_0x13186e,_0x210c16,_0x4036dc),this[_0x482b('0x33d')](),this[_0x482b('0x21f')](0x1);},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x179')]=function(_0xbef94a){const _0x1e1505=SceneManager[_0x482b('0x455')][_0x482b('0x41a')]();this['move'](_0x1e1505['x'],_0x1e1505['y'],_0x1e1505[_0x482b('0x2d0')],_0x1e1505[_0x482b('0x2c3')]),this[_0x482b('0x33d')](),this[_0x482b('0x21f')](0x0);},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x55c')]=function(){if(this[_0x482b('0x134')]){const _0x1c7577=this[_0x482b('0x134')][_0x482b('0x615')],_0x4a1b69=this[_0x482b('0x2d0')]-0x8,_0x1ab7f4=this['height'],_0x35b14c=this[_0x482b('0x56c')],_0x2bfb97=ColorManager[_0x482b('0x105')](),_0x3ca66f=ColorManager['dimColor2']();this[_0x482b('0x134')]['x']=0x4,_0x1c7577[_0x482b('0x25c')](_0x4a1b69,_0x1ab7f4),_0x1c7577[_0x482b('0x64c')](0x0,0x0,_0x4a1b69,_0x35b14c,_0x3ca66f,_0x2bfb97,!![]),_0x1c7577['fillRect'](0x0,_0x35b14c,_0x4a1b69,_0x1ab7f4-_0x35b14c*0x2,_0x2bfb97),_0x1c7577[_0x482b('0x64c')](0x0,_0x1ab7f4-_0x35b14c,_0x4a1b69,_0x35b14c,_0x2bfb97,_0x3ca66f,!![]),this[_0x482b('0x134')][_0x482b('0x2cb')](0x0,0x0,_0x4a1b69,_0x1ab7f4);}},Window_ActorCommand[_0x482b('0x389')][_0x482b('0x776')]=function(){if(!this[_0x482b('0x42d')])return;const _0x27ffe2=VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x427')],_0x5cecf5=this[_0x482b('0xd0')]();switch(_0x5cecf5){case _0x482b('0x2eb'):this[_0x482b('0x256')]($dataSkills[this[_0x482b('0x42d')][_0x482b('0x4c2')]()]);break;case _0x482b('0x85'):this[_0x482b('0x256')]($dataSkills[this['_actor'][_0x482b('0x30e')]()]);break;case'skill':const _0x3d9403=_0x27ffe2[_0x482b('0x40e')],_0xf26c7f=_0x3d9403[_0x482b('0x658')]($dataSystem[_0x482b('0x63')][this['currentExt']()]);this[_0x482b('0x620')]['setText'](_0xf26c7f);break;case _0x482b('0x64b'):this[_0x482b('0x256')]($dataSkills[this[_0x482b('0x17e')]()]);break;case _0x482b('0x596'):this[_0x482b('0x620')][_0x482b('0x60c')](_0x27ffe2[_0x482b('0x382')]);break;case _0x482b('0x2dc'):this[_0x482b('0x620')][_0x482b('0x60c')](_0x27ffe2['HelpEscape']);break;case _0x482b('0x789'):this[_0x482b('0x620')][_0x482b('0x60c')](_0x27ffe2['HelpAutoBattle']);break;default:this['_helpWindow'][_0x482b('0x60c')]('');break;}},VisuMZ['BattleCore'][_0x482b('0x16b')]=Window_BattleStatus['prototype'][_0x482b('0x2e6')],Window_BattleStatus['prototype'][_0x482b('0x2e6')]=function(_0x372759){VisuMZ[_0x482b('0x654')][_0x482b('0x16b')][_0x482b('0x460')](this,_0x372759),this[_0x482b('0x4b8')]();},Window_BattleStatus[_0x482b('0x389')]['initBattleCore']=function(){this['frameVisible']=this['isFrameVisible']();},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x301')]=function(){if(this[_0x482b('0x36c')])return this['_battleLayoutStyle'];return this[_0x482b('0x36c')]=SceneManager[_0x482b('0x455')][_0x482b('0x301')](),this[_0x482b('0x36c')];},Window_BattleStatus[_0x482b('0x389')][_0x482b('0xb4')]=function(){const _0x37ee5b=this[_0x482b('0x301')]();switch(_0x37ee5b){case _0x482b('0x42c'):case _0x482b('0x6ff'):return!![];break;case _0x482b('0x12d'):case'xp':case _0x482b('0x2fa'):default:return![];break;}},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x4f4')]=function(){return this[_0x482b('0xb4')]()?0x0:0xa;},Window_BattleStatus['prototype'][_0x482b('0x399')]=function(){const _0x27ceda=this[_0x482b('0x301')]();switch(_0x27ceda){case _0x482b('0x42c'):return 0x1;break;case'xp':case _0x482b('0x2fa'):return $gameParty[_0x482b('0x4f6')]()[_0x482b('0x5b8')];break;case _0x482b('0x12d'):default:return $gameParty[_0x482b('0x131')]();break;}},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x198')]=function(){const _0xd45b05=this['battleLayoutStyle']();switch(_0xd45b05){case _0x482b('0x42c'):return Window_StatusBase[_0x482b('0x389')][_0x482b('0x198')][_0x482b('0x460')](this);break;case'default':case'xp':case _0x482b('0x2fa'):default:return this[_0x482b('0x4fd')];break;}},Window_BattleStatus[_0x482b('0x389')]['rowSpacing']=function(){const _0x4990ea=this[_0x482b('0x301')]();switch(_0x4990ea){case _0x482b('0x42c'):return Window_StatusBase[_0x482b('0x389')]['rowSpacing'][_0x482b('0x460')](this);break;case _0x482b('0x12d'):case'xp':case _0x482b('0x2fa'):default:return 0x0;break;}},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x414')]=function(){if(this['isFrameVisible']())Window_StatusBase[_0x482b('0x389')]['updatePadding'][_0x482b('0x460')](this);else{if(_0x482b('0x5d4')===_0x482b('0xe7')){function _0x537f8c(){return this[_0x482b('0x180')]();}}else this[_0x482b('0x56c')]=0x8;}},Window_BattleStatus['prototype'][_0x482b('0x353')]=function(){Window_StatusBase[_0x482b('0x389')][_0x482b('0x353')][_0x482b('0x460')](this),this['updateEffectContainers']();if(this['battleLayoutStyle']()===_0x482b('0x6ff'))this[_0x482b('0x70f')]();},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x68d')]=function(){Window_StatusBase[_0x482b('0x389')]['show']['call'](this);if(!$gameSystem['isSideView']())this[_0x482b('0x5c3')]();},Window_BattleStatus['prototype'][_0x482b('0x83')]=function(){if(this[_0x482b('0x31a')]===Window_BattleStatus)return;Window_StatusBase['prototype'][_0x482b('0x83')][_0x482b('0x460')](this);},Window_BattleStatus[_0x482b('0x389')]['drawBackgroundRect']=function(_0x122b6d){const _0x3ea330=this[_0x482b('0x301')]();switch(_0x3ea330){case'xp':case _0x482b('0x2fa'):break;case _0x482b('0x12d'):case _0x482b('0x42c'):default:return Window_StatusBase[_0x482b('0x389')][_0x482b('0x190')]['call'](this,_0x122b6d);break;}},VisuMZ['BattleCore'][_0x482b('0x2a9')]=Window_BattleStatus[_0x482b('0x389')][_0x482b('0x138')],Window_BattleStatus[_0x482b('0x389')][_0x482b('0x138')]=function(_0x168b32){const _0x1b30cf=this[_0x482b('0x301')]();switch(_0x1b30cf){case _0x482b('0x42c'):this[_0x482b('0x758')](_0x168b32);break;case'xp':this[_0x482b('0x480')](_0x168b32);break;case _0x482b('0x2fa'):this[_0x482b('0x40d')](_0x168b32);break;case _0x482b('0x12d'):case'border':default:VisuMZ[_0x482b('0x654')][_0x482b('0x2a9')]['call'](this,_0x168b32);break;}},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x6b5')]=function(_0x56ba74){const _0x11fd5d=this[_0x482b('0x301')]();if(!$gameSystem[_0x482b('0x386')]())this[_0x482b('0x4ee')](_0x56ba74);switch(_0x11fd5d){case'list':this['drawItemStatusListStyle'](_0x56ba74);break;case'xp':case'portrait':case'default':default:this[_0x482b('0x1ea')](_0x56ba74);break;}},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x73')]=function(){const _0x330afd=this[_0x482b('0x301')]();if(['xp'][_0x482b('0x24d')](_0x330afd)&&!$gameSystem[_0x482b('0x386')]()){this[_0x482b('0x4d6')](0x0,0x0,0x0,0x0);return;}Window_StatusBase[_0x482b('0x389')][_0x482b('0x73')][_0x482b('0x460')](this);},Window_BattleStatus['prototype'][_0x482b('0x4ee')]=function(_0xc8126b){const _0x50be86=this['actor'](_0xc8126b)['battler']();if(!_0x50be86)return;const _0x2531f9=this[_0x482b('0x301')](),_0x2c26a8=this[_0x482b('0x486')](_0xc8126b);let _0xc56a2e=Math['round'](_0x2c26a8['x']+_0x2c26a8[_0x482b('0x2d0')]/0x2);['list'][_0x482b('0x24d')](_0x2531f9)&&(_0xc56a2e=_0x2c26a8['width']/$gameParty[_0x482b('0x4f6')]()[_0x482b('0x5b8')],_0xc56a2e*=_0xc8126b,_0xc56a2e+=_0x2c26a8['width']/$gameParty[_0x482b('0x4f6')]()[_0x482b('0x5b8')]/0x2);let _0x33b435=Math[_0x482b('0x49b')](this[_0x482b('0x6b9')](_0xc8126b,_0x50be86,_0x2c26a8));_0x50be86[_0x482b('0x6a4')](_0xc56a2e,_0x33b435),this['addChildAt'](_0x50be86,0x1),_0x50be86[_0x482b('0x68d')]();},Window_BattleStatus['prototype']['frontviewSpriteY']=function(_0x3e67c0,_0x3f9d0d,_0x6d5ee1){const _0x590d7e=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['BattleLayout'],_0x1d36c3=this[_0x482b('0x301')]();if(_0x1d36c3==='xp'){if(_0x482b('0xa6')===_0x482b('0xa6')){const _0x50493e=_0x590d7e[_0x482b('0x4b9')];switch(_0x50493e[_0x482b('0x515')]()[_0x482b('0x6b6')]()){case _0x482b('0x749'):return _0x6d5ee1[_0x482b('0x2c3')]-_0x3f9d0d[_0x482b('0x206')][_0x482b('0x2c3')]/0x4;break;case _0x482b('0x47c'):const _0x7ba449=_0x590d7e[_0x482b('0x3e7')];return(_0x6d5ee1['height']+(_0x3f9d0d['height']||_0x7ba449))/0x2;break;case _0x482b('0x27'):return 0x0;case _0x482b('0x665'):default:return this['nameY'](_0x6d5ee1);break;}}else{function _0x2d6a10(){this[_0x482b('0x568')][_0x482b('0xa7')](_0x2b2eae);}}}else{if(_0x1d36c3===_0x482b('0x2fa')){}}return _0x3f9d0d[_0x482b('0x2c3')];},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x758')]=function(_0x4e3201){if(!VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x2dd')]['ShowFacesListStyle'])return;const _0x51a435=this[_0x482b('0x52d')](_0x4e3201),_0x423172=this[_0x482b('0x486')](_0x4e3201);_0x423172['width']=ImageManager[_0x482b('0xd')],_0x423172[_0x482b('0x2c3')]-=0x2,this['drawActorFace'](_0x51a435,_0x423172['x']+0x1,_0x423172['y']+0x1,_0x423172[_0x482b('0x2d0')],_0x423172['height']);},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x1aa')]=function(_0x5f5ac9){const _0x543d77=$dataSystem[_0x482b('0x4ce')]?0x4:0x3,_0x3ca49c=_0x543d77*0x80+(_0x543d77-0x1)*0x8+0x4,_0x2817c0=this['actor'](_0x5f5ac9),_0x5384f8=this[_0x482b('0x486')](_0x5f5ac9);let _0x3093f0=_0x5384f8['x']+this[_0x482b('0x56c')];VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x2dd')][_0x482b('0x2fe')]&&(_0x3093f0=_0x5384f8['x']+ImageManager[_0x482b('0xd')]+0x8);const _0x380f9a=Math[_0x482b('0x49b')](Math[_0x482b('0x680')](_0x5384f8['x']+_0x5384f8[_0x482b('0x2d0')]-_0x3ca49c,_0x3093f0)),_0x281274=Math[_0x482b('0x49b')](_0x5384f8['y']+(_0x5384f8[_0x482b('0x2c3')]-Sprite_Name[_0x482b('0x389')][_0x482b('0xdf')]())/0x2),_0x163cde=Math[_0x482b('0x49b')](_0x380f9a-ImageManager[_0x482b('0x18c')]/0x2-0x4),_0x2ba584=Math[_0x482b('0x49b')](_0x5384f8['y']+(_0x5384f8['height']-ImageManager[_0x482b('0x1e3')])/0x2+ImageManager[_0x482b('0x1e3')]/0x2);let _0x4dd956=_0x380f9a+0x88;const _0xd06011=_0x281274;this[_0x482b('0x110')](_0x2817c0,_0x380f9a-0x4,_0x281274),this[_0x482b('0x1cf')](_0x2817c0,_0x380f9a,_0x281274),this['placeStateIcon'](_0x2817c0,_0x163cde,_0x2ba584),this[_0x482b('0x3a9')](_0x2817c0,'hp',_0x4dd956+0x88*0x0,_0xd06011),this[_0x482b('0x3a9')](_0x2817c0,'mp',_0x4dd956+0x88*0x1,_0xd06011),$dataSystem[_0x482b('0x4ce')]&&this[_0x482b('0x3a9')](_0x2817c0,'tp',_0x4dd956+0x88*0x2,_0xd06011);},Window_BattleStatus[_0x482b('0x389')]['drawItemImageXPStyle']=function(_0x55a009){if(!$gameSystem[_0x482b('0x386')]())return;VisuMZ[_0x482b('0x654')][_0x482b('0x2a9')][_0x482b('0x460')](this,_0x55a009);},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x1ea')]=function(_0x4d9fdf){const _0x443c4a=this[_0x482b('0x52d')](_0x4d9fdf),_0xde9ffb=this[_0x482b('0x486')](_0x4d9fdf),_0x45ec03=Math[_0x482b('0x49b')](_0xde9ffb['x']+(_0xde9ffb[_0x482b('0x2d0')]-0x80)/0x2),_0x5af9b3=this[_0x482b('0x6d1')](_0xde9ffb);let _0x56416b=_0x45ec03-ImageManager[_0x482b('0x18c')]/0x2-0x4,_0x35c288=_0x5af9b3+ImageManager[_0x482b('0x1e3')]/0x2;_0x56416b-ImageManager[_0x482b('0x18c')]/0x2<_0xde9ffb['x']&&(_0x56416b=_0x45ec03+ImageManager[_0x482b('0x18c')]/0x2-0x4,_0x35c288=_0x5af9b3-ImageManager[_0x482b('0x1e3')]/0x2);const _0x1f72e9=_0x45ec03,_0x1c708b=this[_0x482b('0x6e6')](_0xde9ffb);this[_0x482b('0x110')](_0x443c4a,_0x45ec03,_0x5af9b3),this[_0x482b('0x1cf')](_0x443c4a,_0x45ec03,_0x5af9b3),this[_0x482b('0x72c')](_0x443c4a,_0x56416b,_0x35c288),this[_0x482b('0x4cd')](_0x443c4a,_0x1f72e9,_0x1c708b);},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x54e')]=function(_0x5cc126){if(!VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x2dd')][_0x482b('0x602')])return![];if(_0x5cc126[_0x482b('0x75d')]())return!![];return Imported[_0x482b('0x5e4')]&&_0x5cc126[_0x482b('0x332')]();},Window_BattleStatus['prototype'][_0x482b('0x40d')]=function(_0x4f22f2){const _0x2ced00=this[_0x482b('0x52d')](_0x4f22f2);if(this[_0x482b('0x54e')](_0x2ced00)){const _0x47d623=_0x482b('0x0')[_0x482b('0x658')](_0x2ced00[_0x482b('0x1f')]()),_0x19a18e=this[_0x482b('0x36')](_0x47d623,Sprite),_0x2d8967=_0x2ced00[_0x482b('0x3f5')]();_0x2d8967!==''?_0x19a18e[_0x482b('0x615')]=ImageManager['loadPicture'](_0x2d8967):_0x19a18e[_0x482b('0x615')]=ImageManager[_0x482b('0x4f0')];const _0xc8ed6b=this[_0x482b('0x486')](_0x4f22f2);_0x19a18e[_0x482b('0x4c1')]['x']=0.5,_0x19a18e[_0x482b('0x4c1')]['y']=0x1;const _0x5b19a5=Math[_0x482b('0x49b')](_0xc8ed6b['x']+_0xc8ed6b[_0x482b('0x2d0')]/0x2)+this['padding'],_0x5e757b=Math[_0x482b('0x49b')](this[_0x482b('0x2c3')]);_0x19a18e['move'](_0x5b19a5,_0x5e757b);const _0x51142f=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2dd')]['PortraitScale'];_0x19a18e[_0x482b('0x325')]['x']=_0x51142f,_0x19a18e[_0x482b('0x325')]['y']=_0x51142f,_0x19a18e[_0x482b('0x68d')]();}else{const _0x282049=this[_0x482b('0x3b5')](_0x4f22f2);this['drawActorFace'](_0x2ced00,_0x282049['x'],_0x282049['y'],_0x282049['width'],_0x282049[_0x482b('0x2c3')]);}},Window_BattleStatus[_0x482b('0x389')]['createInnerPortrait']=function(_0x55fd75,_0x418e05){const _0x210adc=this[_0x482b('0x3bc')];if(_0x210adc[_0x55fd75])return _0x210adc[_0x55fd75];else{if(_0x482b('0x223')!=='AwqiX'){function _0x1046d3(){this[_0x482b('0x56c')]=0x0;}}else{const _0x530c35=new _0x418e05();return _0x210adc[_0x55fd75]=_0x530c35,this[_0x482b('0x5e9')](_0x530c35),this[_0x482b('0x5e9')](this[_0x482b('0xdb')]),_0x530c35;}}},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x45')]=function(){this[_0x482b('0x518')](),this[_0x482b('0x606')](),Window_StatusBase[_0x482b('0x389')][_0x482b('0x45')][_0x482b('0x460')](this),this[_0x482b('0x4af')]();},Window_BattleStatus[_0x482b('0x389')]['_createCursorArea']=function(){this[_0x482b('0xdb')]=new Sprite(),this[_0x482b('0xdb')][_0x482b('0x8b')]=[new PIXI[(_0x482b('0x8b'))][(_0x482b('0x6e2'))]()],this[_0x482b('0xdb')][_0x482b('0x20')]=new Rectangle(),this[_0x482b('0xdb')]['move'](this[_0x482b('0x622')],this[_0x482b('0x622')]),this[_0x482b('0x2ff')](this[_0x482b('0xdb')]);},Window_BattleStatus[_0x482b('0x389')]['_createEffectsContainer']=function(){this[_0x482b('0x3c9')]=new Sprite(),this[_0x482b('0x2ff')](this[_0x482b('0x3c9')]);},Window_BattleStatus[_0x482b('0x389')]['_createDamageContainer']=function(){this[_0x482b('0x33c')]=new Sprite(),this[_0x482b('0x2ff')](this['_damageContainer']);},Window_BattleStatus[_0x482b('0x389')][_0x482b('0xa8')]=function(){this['_cursorSprite']=new Sprite();for(let _0x28462b=0x0;_0x28462b<0x9;_0x28462b++){this['_cursorSprite'][_0x482b('0x2ff')](new Sprite());}this[_0x482b('0xdb')][_0x482b('0x2ff')](this[_0x482b('0x13d')]);},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x12f')]=function(){Window_StatusBase[_0x482b('0x389')][_0x482b('0x12f')]['call'](this),this['_updateCursorArea']();},Window_BattleStatus[_0x482b('0x389')]['_updateCursorArea']=function(){const _0x252134=this[_0x482b('0x622')];this['_cursorArea']['move'](_0x252134,_0x252134),this[_0x482b('0xdb')]['x']=_0x252134-this[_0x482b('0x55d')]['x'],this[_0x482b('0xdb')]['y']=_0x252134-this[_0x482b('0x55d')]['y'];if(this['innerWidth']>0x0&&this[_0x482b('0x4fd')]>0x0){if(_0x482b('0xc2')===_0x482b('0xc2'))this['_cursorArea'][_0x482b('0x15f')]=this['isOpen']();else{function _0x1e7920(){const _0x310ffa=_0x3761f3[_0x482b('0x35d')](_0x216737[_0x482b('0x2d0')]/0x3),_0x336d92=this[_0x482b('0x3d2')]()?(_0x5310a5[_0x482b('0x2d0')]+_0x4c90be[_0x482b('0x6b4')])/0x2-_0x310ffa:(_0x383704['width']-_0x368d27[_0x482b('0x6b4')])/-0x2,_0xfce4ce=this[_0x482b('0x6dc')](),_0x16e5d1=_0xfce4ce['y']+_0xfce4ce[_0x482b('0x2c3')],_0x1e6f79=this[_0x482b('0x5c4')](),_0x80864d=_0x1e6f79['y']-_0x16e5d1;return new _0x89d025(_0x336d92,_0x16e5d1,_0x310ffa,_0x80864d);}}}else this[_0x482b('0xdb')][_0x482b('0x15f')]=![];},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x50')]=function(){Window_StatusBase[_0x482b('0x389')]['_updateFilterArea'][_0x482b('0x460')](this),this[_0x482b('0x20a')]();},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x20a')]=function(){const _0x5384a9=this[_0x482b('0xdb')][_0x482b('0x75c')]['apply'](new Point(0x0,0x0)),_0x5b3598=this[_0x482b('0xdb')]['filterArea'];_0x5b3598['x']=_0x5384a9['x']+this[_0x482b('0x55d')]['x'],_0x5b3598['y']=_0x5384a9['y']+this[_0x482b('0x55d')]['y'],_0x5b3598[_0x482b('0x2d0')]=this['innerWidth'],_0x5b3598['height']=this['innerHeight'];},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x798')]=function(_0x370d8f){if(this[_0x482b('0x301')]()!=='portrait')return;this[_0x482b('0x40d')](_0x370d8f[_0x482b('0x508')]());},Window_BattleStatus['prototype'][_0x482b('0x6ae')]=function(_0x373ae8,_0x1d4a4f){if(!this[_0x482b('0x33c')])return;if(!_0x373ae8)return;if(!_0x1d4a4f)return;const _0x5acc5b=this[_0x482b('0x486')](_0x1d4a4f[_0x482b('0x508')]());_0x5acc5b['x']+=_0x5acc5b['width']/0x2+this[_0x482b('0x56c')],_0x373ae8['x']=_0x5acc5b['x'],_0x373ae8['y']=_0x5acc5b['y'],this[_0x482b('0x33c')][_0x482b('0x2ff')](_0x373ae8);},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x4c8')]=function(_0x190586){if(!this['_damageContainer'])return;if(!_0x190586)return;this[_0x482b('0x33c')][_0x482b('0xa7')](_0x190586);},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x70f')]=function(){if(!this[_0x482b('0x52')]())return;if(!this['_borderPortraitSprite'])this[_0x482b('0x6c3')]();this[_0x482b('0x5d7')](),this[_0x482b('0x9e')]();},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x52')]=function(){if(this[_0x482b('0x31a')]!==Window_BattleStatus)return![];if(!SceneManager['isSceneBattle']())return![];return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['BattleLayout'][_0x482b('0x58d')];},Window_BattleStatus['prototype'][_0x482b('0x6c3')]=function(){this[_0x482b('0x4eb')]=new Sprite();const _0x25d037=SceneManager[_0x482b('0x455')],_0x43c551=_0x25d037[_0x482b('0x336')][_0x482b('0x2d9')](_0x25d037[_0x482b('0x1c4')]);_0x25d037['addChildAt'](this[_0x482b('0x4eb')],_0x43c551),this[_0x482b('0x4eb')][_0x482b('0x4c1')]['x']=0.5,this[_0x482b('0x4eb')][_0x482b('0x4c1')]['y']=0x1;const _0x506bf3=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2dd')][_0x482b('0x725')];this['_borderPortraitSprite'][_0x482b('0x325')]['x']=_0x506bf3,this[_0x482b('0x4eb')][_0x482b('0x325')]['y']=_0x506bf3,this[_0x482b('0x4eb')]['y']=this['y']+this['height'],this[_0x482b('0x53a')]=0x0;},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x5d7')]=function(){this[_0x482b('0x4eb')][_0x482b('0x15f')]=BattleManager[_0x482b('0x588')]();const _0x18f156=BattleManager[_0x482b('0x52d')]();if(_0x18f156===this[_0x482b('0x4eb')][_0x482b('0x52d')])return;this[_0x482b('0x4eb')]['actor']=_0x18f156||this[_0x482b('0x4eb')][_0x482b('0x52d')];if(!_0x18f156)return;else{if(_0x18f156[_0x482b('0x3f5')]()===''){if(_0x482b('0x2b2')!==_0x482b('0x330')){this[_0x482b('0x4eb')][_0x482b('0x615')]=ImageManager['_emptyBitmap'];return;}else{function _0x23343e(){_0x52c434[_0x482b('0x654')][_0x482b('0x761')][_0x482b('0x460')](this),this['item']()['note'][_0x482b('0x17')](/<CUSTOM ACTION SEQUENCE>/i)&&(_0xd415d1[_0x482b('0x652')]=[]);}}}else{const _0x3c8947=ImageManager[_0x482b('0x5da')](_0x18f156[_0x482b('0x3f5')]());_0x3c8947[_0x482b('0x173')](this[_0x482b('0x311')]['bind'](this,_0x3c8947));}}},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x311')]=function(_0x1bc17e){this[_0x482b('0x53a')]=0x14,this['_borderPortraitSprite'][_0x482b('0x615')]=_0x1bc17e;if(SceneManager['_scene']['isRightInputMode']())this['_borderPortraitSprite']['x']=0x0,this[_0x482b('0x51')]=Math[_0x482b('0x44a')](_0x1bc17e[_0x482b('0x2d0')]/0x2);else{if(_0x482b('0x3aa')==='vhRNa')this[_0x482b('0x4eb')]['x']=this[_0x482b('0x2d0')],this[_0x482b('0x51')]=this[_0x482b('0x2d0')]*0x3/0x4;else{function _0x202a21(){for(const _0x3aa5ec of _0x3a6a19){_0x3aa5ec['match'](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x80a7c7=_0x45d1e8(_0x119996['$1']),_0x259d8e=_0x44ce17(_0x39d9f5['$2']),_0x1607d7=_0x259d8e===0x1?this[_0x482b('0x687')]:this[_0x482b('0x15c')],_0x17f1f5=_0x7348c7(_0x59e7bb['$3']);_0x1607d7[_0x80a7c7]=_0x17f1f5;}}}}this['_borderPortraitSprite']['opacity']=0x0;},Window_BattleStatus[_0x482b('0x389')]['updateBorderSprite']=function(){if(this[_0x482b('0x53a')]>0x0){if(_0x482b('0x86')===_0x482b('0x576')){function _0x1d6fbc(){const _0x375029=this[_0x482b('0x1f0')](_0x4d3b2a);if(_0x375029===_0x482b('0xee'))this['drawItemStyleIconText'](_0x4404f1);else _0x375029===_0x482b('0x220')?this[_0x482b('0xf8')](_0x1b19a4):_0x33fc06[_0x482b('0x389')][_0x482b('0x149')][_0x482b('0x460')](this,_0x21a644);this[_0x482b('0x6b7')](_0x35fd6f);}}else{const _0xf59242=this['_borderPortraitDuration'],_0x137427=this[_0x482b('0x4eb')];_0x137427['x']=(_0x137427['x']*(_0xf59242-0x1)+this[_0x482b('0x51')])/_0xf59242,_0x137427['opacity']=(_0x137427[_0x482b('0x32e')]*(_0xf59242-0x1)+0xff)/_0xf59242,this[_0x482b('0x53a')]--;}}},Window_BattleStatus[_0x482b('0x389')][_0x482b('0x629')]=function(){return;if(this[_0x482b('0x3c9')]){if(_0x482b('0x337')!==_0x482b('0x630'))this[_0x482b('0x3c9')]['x']=this['x'],this[_0x482b('0x3c9')]['y']=this['y'];else{function _0x304edc(){this['startInput']();}}}this[_0x482b('0x33c')]&&(this[_0x482b('0x33c')]['x']=this['x'],this[_0x482b('0x33c')]['y']=this['y']);},Window_BattleEnemy['prototype'][_0x482b('0x399')]=function(){return this[_0x482b('0x1c2')]();},VisuMZ[_0x482b('0x654')]['Window_BattleEnemy_show']=Window_BattleEnemy[_0x482b('0x389')][_0x482b('0x68d')],Window_BattleEnemy['prototype'][_0x482b('0x68d')]=function(){VisuMZ[_0x482b('0x654')]['Window_BattleEnemy_show'][_0x482b('0x460')](this),this['y']=Graphics['height']*0xa;},Window_BattleEnemy['prototype'][_0x482b('0x4d5')]=function(){return $gameTroop[_0x482b('0x24')]()['slice'](0x0);},Window_BattleEnemy[_0x482b('0x389')][_0x482b('0x5c3')]=function(){this[_0x482b('0x307')]=this[_0x482b('0x4d5')](),this['sortEnemies'](),Window_Selectable[_0x482b('0x389')][_0x482b('0x5c3')][_0x482b('0x460')](this);},Window_BattleEnemy[_0x482b('0x389')]['sortEnemies']=function(){this[_0x482b('0x307')][_0x482b('0x2ce')]((_0x1f1492,_0x2604cb)=>{return _0x1f1492[_0x482b('0x67c')]()[_0x482b('0x28e')]===_0x2604cb[_0x482b('0x67c')]()[_0x482b('0x28e')]?_0x1f1492['battler']()['_baseY']-_0x2604cb[_0x482b('0x67c')]()['_baseY']:_0x1f1492[_0x482b('0x67c')]()[_0x482b('0x28e')]-_0x2604cb[_0x482b('0x67c')]()[_0x482b('0x28e')];}),SceneManager['isBattleFlipped']()&&this[_0x482b('0x307')][_0x482b('0x5d5')]();},Window_BattleEnemy[_0x482b('0x389')][_0x482b('0x270')]=function(){const _0x2f7fce=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2e')];let _0x19a382=![];if($gameSystem[_0x482b('0x386')]()){if(_0x482b('0x3ae')!==_0x482b('0x3'))_0x19a382=_0x2f7fce[_0x482b('0x2f')];else{function _0x4f79c1(){const _0x375cbf=_0x7e9102(_0x44bad4['$1'])[_0x482b('0xe0')](/[\r\n]+/)['remove']('');_0x485aca[_0x482b('0x665')]=_0x28ccab[_0x482b('0x454')](_0x375cbf);}}}else _0x19a382=_0x2f7fce[_0x482b('0x6b3')];this[_0x482b('0x2b')](_0x19a382?this[_0x482b('0x1c2')]()-0x1:0x0);};function Window_AutoBattleCancel(){this[_0x482b('0x2e6')](...arguments);}Window_AutoBattleCancel[_0x482b('0x389')]=Object['create'](Window_Base[_0x482b('0x389')]),Window_AutoBattleCancel[_0x482b('0x389')][_0x482b('0x31a')]=Window_AutoBattleCancel,Window_AutoBattleCancel[_0x482b('0x389')][_0x482b('0x2e6')]=function(_0x3d1c71){Window_Base[_0x482b('0x389')][_0x482b('0x2e6')][_0x482b('0x460')](this,_0x3d1c71),this[_0x482b('0x21f')](this[_0x482b('0x1dd')]()),this[_0x482b('0x5c3')]();},Window_AutoBattleCancel[_0x482b('0x389')][_0x482b('0x1dd')]=function(){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x28f')][_0x482b('0x1dc')];},Window_AutoBattleCancel[_0x482b('0x389')][_0x482b('0x5c3')]=function(){this[_0x482b('0xa4')][_0x482b('0x2f6')]();const _0x30fd0b=VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x28f')][_0x482b('0x93')],_0x3dec68=_0x30fd0b['format'](this[_0x482b('0x9f')](),this['cancelButtonText']()),_0x140688=this[_0x482b('0x1b0')](_0x3dec68)[_0x482b('0x2d0')],_0x5c76ce=Math['floor']((this[_0x482b('0x13')]-_0x140688)/0x2);this[_0x482b('0x5a')](_0x3dec68,_0x5c76ce,0x0,_0x140688);},Window_AutoBattleCancel[_0x482b('0x389')][_0x482b('0x9f')]=function(){return Imported[_0x482b('0x64e')]?TextManager[_0x482b('0x799')]('ok'):VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x28f')][_0x482b('0x37f')];},Window_AutoBattleCancel[_0x482b('0x389')][_0x482b('0x545')]=function(){if(Imported[_0x482b('0x64e')])return TextManager[_0x482b('0x799')](_0x482b('0x5ff'));else{if(_0x482b('0x1a8')==='mkwcv'){function _0x4126ae(){_0x3a704d[_0x482b('0x654')][_0x482b('0x267')][_0x482b('0x460')](this),this[_0x482b('0x5c3')](),this[_0x482b('0x1a1')]();}}else return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['AutoBattle'][_0x482b('0x6a7')];}},Window_AutoBattleCancel[_0x482b('0x389')][_0x482b('0x353')]=function(){Window_Base[_0x482b('0x389')]['update'][_0x482b('0x460')](this),this['updateVisibility'](),this['updateCancel']();},Window_AutoBattleCancel[_0x482b('0x389')][_0x482b('0x435')]=function(){this[_0x482b('0x15f')]=BattleManager[_0x482b('0x2c9')];},Window_AutoBattleCancel[_0x482b('0x389')][_0x482b('0x436')]=function(){if(!BattleManager['_autoBattle'])return;(Input['isTriggered']('ok')||Input[_0x482b('0x6c4')](_0x482b('0x5ff'))||TouchInput['isClicked']()||TouchInput[_0x482b('0x492')]())&&(SoundManager[_0x482b('0x384')](),BattleManager[_0x482b('0x2c9')]=![],Input[_0x482b('0x2f6')](),TouchInput[_0x482b('0x2f6')]());};function Window_EnemyName(){this[_0x482b('0x2e6')](...arguments);}Window_EnemyName[_0x482b('0x389')]=Object[_0x482b('0x591')](Window_Base[_0x482b('0x389')]),Window_EnemyName[_0x482b('0x389')][_0x482b('0x31a')]=Window_EnemyName,Window_EnemyName[_0x482b('0x389')][_0x482b('0x2e6')]=function(_0x182a4e){this[_0x482b('0x558')]=_0x182a4e,this[_0x482b('0x258')]='';const _0x17f816=new Rectangle(0x0,0x0,Graphics['boxWidth'],this[_0x482b('0x67b')]()*0x4);Window_Base[_0x482b('0x389')][_0x482b('0x2e6')][_0x482b('0x460')](this,_0x17f816),this[_0x482b('0x21f')](0x2),this[_0x482b('0x611')]=0x0;},Window_EnemyName['prototype'][_0x482b('0x414')]=function(){this['padding']=0x0;},Window_EnemyName['prototype'][_0x482b('0x60e')]=function(){return $gameTroop['members']()[this[_0x482b('0x558')]];},Window_EnemyName[_0x482b('0x389')][_0x482b('0x353')]=function(){Window_Base[_0x482b('0x389')][_0x482b('0x353')][_0x482b('0x460')](this);if(this[_0x482b('0x60e')]()&&this[_0x482b('0x60e')]()[_0x482b('0x665')]()!==this[_0x482b('0x258')])this[_0x482b('0x5c3')]();this[_0x482b('0x39f')](),this[_0x482b('0x5e3')]();},Window_EnemyName[_0x482b('0x389')]['updateOpacity']=function(){if(!this['enemy']()){if(this[_0x482b('0x611')]>0x0)this['contentsOpacity']-=0x10;}else{if(this[_0x482b('0x60e')]()[_0x482b('0x2a4')]()){if('rAEBq'!==_0x482b('0x44c')){function _0x3b15a8(){this[_0x482b('0x483')]=_0x581e2d[_0x482b('0x6d5')]||[0x0,0x0,0x0,0x0],this[_0x482b('0x483')]=_0x17aff1[_0x482b('0x4a')](this[_0x482b('0x483')]),this[_0x482b('0x638')]=_0x1fe108[_0x482b('0x552')]||0x0;const _0xc6f488=this[_0x482b('0x750')](),_0x1ff4b6=_0x212f2c['floor'](_0xc6f488*0xa),_0x29555a=this[_0x482b('0x647')](_0x1ff4b6,_0xc6f488);_0x29555a[_0x482b('0x615')]['textColor']=_0x5a1917[_0x482b('0x5f6')](_0x2d4ef2[_0x482b('0x5cb')]),_0x29555a[_0x482b('0x615')][_0x482b('0x31')](_0x3cccdb,0x0,0x0,_0x1ff4b6,_0xc6f488,'center'),_0x29555a['dy']=0x0;}}else{if(this[_0x482b('0x611')]>0x0)this[_0x482b('0x611')]-=0x10;}}else{if(SceneManager[_0x482b('0x455')][_0x482b('0x285')]&&SceneManager[_0x482b('0x455')][_0x482b('0x285')][_0x482b('0xa5')]&&SceneManager[_0x482b('0x455')][_0x482b('0x285')]['_enemies'][_0x482b('0x24d')](this[_0x482b('0x60e')]())){if(this[_0x482b('0x611')]<0xff)this[_0x482b('0x611')]+=0x10;}else{if(this[_0x482b('0x611')]>0x0){if(_0x482b('0x22')!=='luZyS'){function _0x4f9f98(){_0x7ea08d[_0x482b('0x654')][_0x482b('0x67')][_0x482b('0x460')](this),this[_0x482b('0x48e')]()&&this['isSkipPartyCommandWindow']()&&!this[_0x482b('0x217')]&&_0xfb14a6['canInput']()&&this[_0x482b('0x4b4')]();}}else this[_0x482b('0x611')]-=0x10;}}}}},Window_EnemyName[_0x482b('0x389')][_0x482b('0x5e3')]=function(){if(!this[_0x482b('0x60e')]())return;if(SceneManager[_0x482b('0x77')]())this['x']=Graphics['boxWidth']-this['enemy']()[_0x482b('0x67c')]()[_0x482b('0x28e')];else{if(_0x482b('0x1b5')!=='DAtqR'){function _0x1e2061(){const _0x50d8d1=this['commandSymbol'](_0x5d8f88);return _0x50d8d1===_0x482b('0x65d')?this[_0x482b('0x6f6')]():_0x38de79[_0x482b('0x654')][_0x482b('0x6c1')][_0x482b('0x460')](this,_0x518080);}}else this['x']=this[_0x482b('0x60e')]()[_0x482b('0x67c')]()[_0x482b('0x28e')];}this['x']-=Math[_0x482b('0x49b')](this[_0x482b('0x2d0')]/0x2),this['y']=this['enemy']()[_0x482b('0x67c')]()[_0x482b('0x11')]-Math[_0x482b('0x49b')](this[_0x482b('0x67b')]()*1.5);},Window_EnemyName[_0x482b('0x389')][_0x482b('0x32d')]=function(){Window_Base['prototype']['resetFontSettings'][_0x482b('0x460')](this),this[_0x482b('0xa4')][_0x482b('0x750')]=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x2e')][_0x482b('0x100')];},Window_EnemyName[_0x482b('0x389')][_0x482b('0x5c3')]=function(){this[_0x482b('0xa4')][_0x482b('0x2f6')]();if(!this[_0x482b('0x60e')]())return;this[_0x482b('0x258')]=this['enemy']()['name']();const _0x940f68=this[_0x482b('0x1b0')](this[_0x482b('0x258')])['width'],_0x2c965a=Math['round']((this[_0x482b('0x13')]-_0x940f68)/0x2);this['drawTextEx'](this[_0x482b('0x258')],_0x2c965a,0x0,_0x940f68+0x8);},Window_BattleLog[_0x482b('0x389')][_0x482b('0x553')]=function(){return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')]['MaxLines'];},Window_BattleLog['prototype'][_0x482b('0x343')]=function(){return VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x18a')]['MessageWait'];},Window_BattleLog[_0x482b('0x389')][_0x482b('0x3a5')]=function(){return VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x18a')][_0x482b('0x61c')];},Window_BattleLog['prototype'][_0x482b('0x4f5')]=function(){return![];},Window_BattleLog[_0x482b('0x389')][_0x482b('0x41c')]=function(_0x405342,_0x265916){this['unshift'](_0x482b('0xd6')),BattleManager[_0x482b('0x376')](_0x405342,_0x265916),this[_0x482b('0x1a1')]();},Window_BattleLog[_0x482b('0x389')][_0x482b('0xd6')]=function(){this[_0x482b('0x1a1')]();},Window_BattleLog[_0x482b('0x389')][_0x482b('0x260')]=function(_0x989e2a){const _0x22dbef=Array[_0x482b('0x389')][_0x482b('0x13c')][_0x482b('0x460')](arguments,0x1),_0x64a80a={'name':_0x989e2a,'params':_0x22dbef},_0x56ac3f=this[_0x482b('0x2a2')][_0x482b('0x6a0')](_0x195764=>_0x195764[_0x482b('0x665')])[_0x482b('0x2d9')](_0x482b('0xd6'));_0x56ac3f>=0x0?this[_0x482b('0x2a2')]['splice'](_0x56ac3f,0x0,_0x64a80a):this[_0x482b('0x2a2')][_0x482b('0x260')](_0x64a80a);},Window_BattleLog[_0x482b('0x389')][_0x482b('0x560')]=function(_0x2a92ee){const _0x41b435=Array[_0x482b('0x389')][_0x482b('0x13c')][_0x482b('0x460')](arguments,0x1);this[_0x482b('0x2a2')][_0x482b('0x560')]({'name':_0x2a92ee,'params':_0x41b435});},Window_BattleLog[_0x482b('0x389')][_0x482b('0x1fd')]=function(){if(!$gameTemp['isPlaytest']())return;console['log'](this['_methods'][_0x482b('0x6a0')](_0x5d5e56=>_0x5d5e56['name'])[_0x482b('0x35b')]('\x0a'));},VisuMZ['BattleCore'][_0x482b('0x3f7')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x5c3')],Window_BattleLog[_0x482b('0x389')]['refresh']=function(){this[_0x482b('0x3b3')]=!![];},VisuMZ[_0x482b('0x654')][_0x482b('0x67f')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x353')],Window_BattleLog['prototype'][_0x482b('0x353')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x67f')][_0x482b('0x460')](this);if(this[_0x482b('0x3b3')])this[_0x482b('0x280')]();},Window_BattleLog[_0x482b('0x389')]['processRefresh']=function(){this['_requestRefresh']=![],VisuMZ[_0x482b('0x654')][_0x482b('0x3f7')][_0x482b('0x460')](this);},Window_BattleLog['prototype'][_0x482b('0x6c2')]=function(_0x2c528f){let _0x21cb8e=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x61a')][_0x482b('0x515')]()[_0x482b('0x6b6')](),_0xd4eee2=this[_0x482b('0x269')][_0x2c528f];if(_0xd4eee2[_0x482b('0x17')](/<LEFT>/i))_0x21cb8e=_0x482b('0x78e');else{if(_0xd4eee2[_0x482b('0x17')](/<CENTER>/i))_0x21cb8e=_0x482b('0x47c');else{if(_0xd4eee2[_0x482b('0x17')](/<RIGHT>/i)){if(_0x482b('0x637')!==_0x482b('0x4f2'))_0x21cb8e='right';else{function _0x37b22d(){let _0x4fa465=_0x5c33f7(_0x1dad76['$1']);while(_0x4fa465--){const _0xd64a7e=_0x3cb8c9[_0x482b('0x4cc')](0x2)===0x0?this[_0x482b('0x6e9')]():this[_0x482b('0x5e7')]();_0x13c2a6['push'](_0xd64a7e[_0x482b('0x292')]());}return this[_0x482b('0x679')](_0x5bb9d2);}}}}}_0xd4eee2=_0xd4eee2[_0x482b('0x13a')](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0xd4eee2=_0xd4eee2[_0x482b('0x13a')](/\\I\[0\]/gi,'');const _0x1df0a=this[_0x482b('0x8d')](_0x2c528f);this[_0x482b('0xa4')][_0x482b('0x469')](_0x1df0a['x'],_0x1df0a['y'],_0x1df0a[_0x482b('0x2d0')],_0x1df0a[_0x482b('0x2c3')]);const _0x1c1854=this[_0x482b('0x1b0')](_0xd4eee2)[_0x482b('0x2d0')];let _0x3c3738=_0x1df0a['x'];if(_0x21cb8e===_0x482b('0x47c')){if(_0x482b('0x2ec')!=='yNFNL')_0x3c3738+=(_0x1df0a[_0x482b('0x2d0')]-_0x1c1854)/0x2;else{function _0x5db986(){this[_0x482b('0x405')]['open'](),this['_skillWindow'][_0x482b('0xa5')]&&this[_0x482b('0x405')][_0x482b('0x68d')](),this[_0x482b('0x56f')][_0x482b('0x3d8')](),this[_0x482b('0x56f')][_0x482b('0xa5')]&&this[_0x482b('0x56f')][_0x482b('0x68d')]();}}}else{if(_0x21cb8e===_0x482b('0x161')){if(_0x482b('0xb3')!==_0x482b('0xb3')){function _0x391285(){return this[_0x482b('0x114')]()?this['_enemy'][_0x482b('0x2f4')]():!![];}}else _0x3c3738+=_0x1df0a['width']-_0x1c1854;}}this[_0x482b('0x5a')](_0xd4eee2,_0x3c3738,_0x1df0a['y'],_0x1c1854+0x8);},Window_BattleLog[_0x482b('0x389')][_0x482b('0x642')]=function(_0x591b30){this['_lines']['push'](_0x591b30),this[_0x482b('0x5c3')](),this[_0x482b('0x1a1')]();},Window_BattleLog[_0x482b('0x389')][_0x482b('0x391')]=function(){let _0x617111=![];switch(this[_0x482b('0x215')]){case _0x482b('0x5a1'):_0x617111=this[_0x482b('0x5f')]['isEffecting']();break;case _0x482b('0x6c0'):_0x617111=this[_0x482b('0x5f')]['isAnyoneMoving']();break;case _0x482b('0x224'):_0x617111=this['_spriteset'][_0x482b('0x5dc')]();break;case'float':_0x617111=this[_0x482b('0x5f')][_0x482b('0x2d')]();break;case'jump':_0x617111=this['_spriteset'][_0x482b('0x533')]();break;case'opacity':_0x617111=this[_0x482b('0x5f')][_0x482b('0x1c0')]();break;}if(!_0x617111){if(_0x482b('0x1a6')===_0x482b('0x1a6'))this[_0x482b('0x215')]='';else{function _0x215b48(){this[_0x482b('0x53c')](_0x482b('0x3c3'));}}}return _0x617111;},Window_BattleLog['prototype'][_0x482b('0x6a2')]=function(){this[_0x482b('0x46c')](_0x482b('0x224'));},Window_BattleLog['prototype'][_0x482b('0x4ad')]=function(){this['setWaitMode']('float');},Window_BattleLog[_0x482b('0x389')]['waitForJump']=function(){this[_0x482b('0x46c')](_0x482b('0x71b'));},Window_BattleLog[_0x482b('0x389')][_0x482b('0x1d2')]=function(){this[_0x482b('0x46c')]('opacity');},Window_BattleLog[_0x482b('0x389')][_0x482b('0x52a')]=function(){const _0x167569=VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x18a')];if(!_0x167569['StartTurnShow'])return;this[_0x482b('0x260')]('addText',_0x167569['StartTurnMsg'][_0x482b('0x658')]($gameTroop[_0x482b('0x555')]())),this['push']('waitCount',_0x167569['StartTurnWait']),this[_0x482b('0x260')](_0x482b('0x2f6'));},Window_BattleLog['prototype'][_0x482b('0x2bc')]=function(_0x490d06,_0x28b4f2,_0x3e04a6){if(this['isCustomActionSequence'](_0x28b4f2))BattleManager[_0x482b('0xe8')]();else{if('nlUQo'!==_0x482b('0x62e'))this[_0x482b('0x26f')](_0x490d06,_0x28b4f2,_0x3e04a6);else{function _0x34b2e1(){return _0x26216d[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x3ac')][_0x482b('0xe4')][_0x482b('0x460')](this,_0x2fdb65,_0x106f1b);}}}},Window_BattleLog['prototype'][_0x482b('0x36b')]=function(_0x303376){if(!SceneManager['isSceneBattle']())return![];if(!_0x303376)return![];if(!_0x303376[_0x482b('0x596')]())return![];if(_0x303376[_0x482b('0x596')]()[_0x482b('0x4ed')][_0x482b('0x17')](/<CUSTOM ACTION SEQUENCE>/i))return!![];return![];},Window_BattleLog[_0x482b('0x389')][_0x482b('0x26f')]=function(_0x5c1a9e,_0x1b645d,_0x37c46a){const _0x8c9c22=_0x1b645d[_0x482b('0x596')]();this['setupActionSet'](_0x5c1a9e,_0x1b645d,_0x37c46a),this[_0x482b('0x298')](_0x5c1a9e,_0x1b645d,_0x37c46a),this[_0x482b('0x37b')](_0x5c1a9e,_0x1b645d,_0x37c46a);},Window_BattleLog[_0x482b('0x389')][_0x482b('0x55')]=function(_0xd261b9,_0x564d9f){const _0x1b3586=VisuMZ[_0x482b('0x654')]['Settings'][_0x482b('0x18a')];_0x1b3586['ActionCenteredName']&&this[_0x482b('0x260')]('addText',_0x482b('0x156')[_0x482b('0x658')](DataManager[_0x482b('0x593')](_0x564d9f)));if(DataManager[_0x482b('0x583')](_0x564d9f)){if(_0x1b3586[_0x482b('0x499')])this[_0x482b('0x300')](_0x564d9f[_0x482b('0x155')],_0xd261b9,_0x564d9f);if(_0x1b3586[_0x482b('0x283')])this['displayItemMessage'](_0x564d9f['message2'],_0xd261b9,_0x564d9f);}else{if(_0x1b3586[_0x482b('0x592')])this[_0x482b('0x300')](TextManager[_0x482b('0x72b')],_0xd261b9,_0x564d9f);}},Window_BattleLog['prototype'][_0x482b('0x273')]=function(_0x1ad0ad,_0x36428b,_0x93a3b5){const _0x55ef05=_0x36428b[_0x482b('0x596')]();this[_0x482b('0x55')](_0x1ad0ad,_0x55ef05),this[_0x482b('0x260')](_0x482b('0x68'),_0x1ad0ad,_0x93a3b5,!![]),this[_0x482b('0x260')]('performActionStart',_0x1ad0ad,_0x36428b),this[_0x482b('0x260')](_0x482b('0x195')),this[_0x482b('0x260')](_0x482b('0x11f'),_0x1ad0ad,_0x36428b),this[_0x482b('0x260')](_0x482b('0x6a2'));},Window_BattleLog[_0x482b('0x389')]['createEffectActionSet']=function(_0x40ae53,_0x647701,_0x49f894){if(this[_0x482b('0x4e9')](_0x647701)){if('BQVkW'!=='BQVkW'){function _0x28e567(){const _0x31f815=this[_0x482b('0x5bf')],_0x58386b=_0x529101[_0x482b('0x667')](),_0x1fb663=_0x1c18c9['x']+_0x2f6ab4['floor'](_0x417db[_0x482b('0x2d0')]/0x2)+_0x58386b;_0x31f815['x']=_0x31f815['width']/-0x2+_0x1fb663,_0x31f815['y']=_0x308284[_0x482b('0x35d')](_0x1a9524[_0x482b('0x2c3')]/0x2);}}else this[_0x482b('0x42')](_0x40ae53,_0x647701,_0x49f894);}else{if(this['isMeleeMultiTargetAction'](_0x647701)){if(_0x482b('0x4ec')!=='wkwro')this[_0x482b('0x6d8')](_0x40ae53,_0x647701,_0x49f894);else{function _0x2755a4(){const _0x137cac=new _0x362ad3(_0x1d0a85);this[_0x482b('0x2f0')]['addChild'](_0x137cac);}}}else{if(_0x647701[_0x482b('0xaa')]()){if(_0x482b('0x6cf')!=='hYWjR')this[_0x482b('0x205')](_0x40ae53,_0x647701,_0x49f894);else{function _0x6bb837(){const _0x3a512a=new _0x22a377(0x0,0x0,_0x3a7267[_0x482b('0x2d0')],_0x4103b9[_0x482b('0x2c3')]);this[_0x482b('0x5bf')]=new _0x3940a4(_0x3a512a),this[_0x482b('0x5bf')]['opacity']=0x0,this[_0x482b('0x2ff')](this['_commandNameWindow']),this[_0x482b('0x4f8')]();}}}else{if(_0x482b('0x43e')!==_0x482b('0x43e')){function _0x4272f3(){this['setCursorRect'](0x0,0x0,0x0,0x0);return;}}else this[_0x482b('0x3d7')](_0x40ae53,_0x647701,_0x49f894);}}}},Window_BattleLog[_0x482b('0x389')]['isMeleeSingleTargetAction']=function(_0x4a8dd8){if(!_0x4a8dd8[_0x482b('0x2d5')]())return![];if(!_0x4a8dd8[_0x482b('0x754')]())return![];if(!_0x4a8dd8[_0x482b('0x294')]())return![];return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x75e')][_0x482b('0x40')];},Window_BattleLog[_0x482b('0x389')][_0x482b('0x42')]=function(_0x51d777,_0x5dcf09,_0x4fb6ef){const _0xf0c86e=_0x51d777[_0x482b('0x3d4')]()[_0x482b('0x49c')]<0x2,_0x24884c=0x14,_0x3a43c6=0x30;_0xf0c86e&&(this[_0x482b('0x260')]('performJump',[_0x51d777],_0x3a43c6,_0x24884c),this['push'](_0x482b('0x2de'),_0x51d777,_0x4fb6ef,_0x482b('0x274'),_0x24884c,!![],'Linear',!![]),this[_0x482b('0x260')](_0x482b('0x370'),[_0x51d777],_0x482b('0x3c3')),this[_0x482b('0x260')](_0x482b('0x195')));if(_0x5dcf09[_0x482b('0x596')]()[_0x482b('0x1f8')]<0x0){if(_0x482b('0x1d')===_0x482b('0x1d'))this[_0x482b('0x205')](_0x51d777,_0x5dcf09,_0x4fb6ef);else{function _0x7f8b07(){if(_0x15aabe){const _0x2ad947=_0x3ab4cf['indexOf'](_0x2a9cd6);return _0x2ad947>=0x0?[_0x28ad99[_0x2ad947-0x1]||_0x1e3a21]:[_0x5dd947];}}}}else{if(_0x482b('0x625')!==_0x482b('0x69e'))this[_0x482b('0x3d7')](_0x51d777,_0x5dcf09,_0x4fb6ef);else{function _0x66326a(){this[_0x482b('0x6bf')]('PreStartTurnJS'),_0x32e5bf[_0x482b('0x654')][_0x482b('0x668')][_0x482b('0x460')](this),this['processBattleCoreJS'](_0x482b('0xfc'));}}}if(_0xf0c86e){if('ntmfJ'===_0x482b('0x5e0')){const _0x82c095=_0x51d777['battler']();this[_0x482b('0x260')](_0x482b('0x123'),[_0x51d777],_0x3a43c6,_0x24884c),this[_0x482b('0x260')](_0x482b('0x33f'),_0x51d777,_0x82c095[_0x482b('0x41e')],_0x82c095[_0x482b('0x10a')],_0x24884c,![],'Linear'),this[_0x482b('0x260')](_0x482b('0x370'),[_0x51d777],'evade'),this[_0x482b('0x260')](_0x482b('0x195')),this[_0x482b('0x260')](_0x482b('0x370'),[_0x51d777],_0x482b('0x3c3'));}else{function _0x47d5cb(){_0x25eaa0['anchorX']=_0x24c717(_0x173e1b['$1']),_0x3e7f0f[_0x482b('0x516')]=_0xf65544(_0x32365c['$2']);}}}},Window_BattleLog[_0x482b('0x389')]['isMeleeMultiTargetAction']=function(_0x42529a){if(!_0x42529a[_0x482b('0x2d5')]())return![];if(!_0x42529a[_0x482b('0x65a')]())return![];if(!_0x42529a[_0x482b('0x294')]())return![];return VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['ActionSequence']['AutoMeleeAoE'];},Window_BattleLog[_0x482b('0x389')][_0x482b('0x6d8')]=function(_0x2ddced,_0x5cb592,_0x3c1824){const _0x3886b4=_0x2ddced['getAttackMotion']()[_0x482b('0x49c')]<0x2,_0x43d56d=0x14,_0x446e0b=0x30;if(_0x3886b4){if(_0x482b('0xe')==='OwVtz'){function _0x2d3c69(){_0x13ff1e[_0x482b('0x652')]=[];}}else this[_0x482b('0x260')](_0x482b('0x123'),[_0x2ddced],_0x446e0b,_0x43d56d),this[_0x482b('0x260')](_0x482b('0x2de'),_0x2ddced,_0x3c1824,_0x482b('0x3b'),_0x43d56d,!![],'Linear',!![]),this[_0x482b('0x260')](_0x482b('0x370'),[_0x2ddced],_0x482b('0x3c3')),this[_0x482b('0x260')](_0x482b('0x195'));}this[_0x482b('0x3d7')](_0x2ddced,_0x5cb592,_0x3c1824);if(_0x3886b4){const _0x3400ec=_0x2ddced[_0x482b('0x67c')]();this[_0x482b('0x260')]('performJump',[_0x2ddced],_0x446e0b,_0x43d56d),this[_0x482b('0x260')]('performMoveToPoint',_0x2ddced,_0x3400ec[_0x482b('0x41e')],_0x3400ec[_0x482b('0x10a')],_0x43d56d,![],_0x482b('0x76f')),this[_0x482b('0x260')](_0x482b('0x370'),[_0x2ddced],_0x482b('0xc8')),this[_0x482b('0x260')](_0x482b('0x195')),this[_0x482b('0x260')](_0x482b('0x370'),[_0x2ddced],_0x482b('0x3c3'));}},Window_BattleLog['prototype'][_0x482b('0x205')]=function(_0x1518c4,_0x1b568a,_0x176e84){const _0x396723=_0x1b568a[_0x482b('0x596')]();for(const _0x51dd8a of _0x176e84){if('dlIaQ'==='MktMl'){function _0x1b1951(){if(this['_motion'][_0x482b('0x54c')])this['_pattern']=(this[_0x482b('0x5c0')]+0x1)%0x4;else this[_0x482b('0x5c0')]<0x2?this[_0x482b('0x5c0')]++:this[_0x482b('0xf7')]();this[_0x482b('0x16c')]=0x0;}}else{if(!_0x51dd8a)continue;this[_0x482b('0x260')](_0x482b('0x141'),_0x1518c4,_0x1b568a),this[_0x482b('0x260')](_0x482b('0x63e'),Sprite_Battler[_0x482b('0x5ac')]),this[_0x482b('0x260')](_0x482b('0x4a7'),_0x1518c4,[_0x51dd8a],_0x396723[_0x482b('0x1f8')]),this[_0x482b('0x260')](_0x482b('0x63e'),0x18),this[_0x482b('0x260')](_0x482b('0x41c'),_0x1518c4,_0x51dd8a);}}this[_0x482b('0x260')](_0x482b('0x68'),_0x1518c4,_0x176e84,![]);},Window_BattleLog['prototype'][_0x482b('0x3d7')]=function(_0x2b2775,_0x10f018,_0x56026e){const _0x416d97=_0x10f018[_0x482b('0x596')]();this[_0x482b('0x260')](_0x482b('0x141'),_0x2b2775,_0x10f018),this[_0x482b('0x260')](_0x482b('0x63e'),Sprite_Battler[_0x482b('0x5ac')]),this['push'](_0x482b('0x4a7'),_0x2b2775,_0x56026e['clone'](),_0x416d97[_0x482b('0x1f8')]),this['push'](_0x482b('0x6a2'));for(const _0x5548f1 of _0x56026e){if(!_0x5548f1)continue;this[_0x482b('0x260')]('actionEffect',_0x2b2775,_0x5548f1);}this['push'](_0x482b('0x68'),_0x2b2775,_0x56026e,![]);},Window_BattleLog[_0x482b('0x389')]['finishActionSet']=function(_0x449327,_0x216299,_0x5848fd){const _0x354199=_0x216299[_0x482b('0x596')]();this['push'](_0x482b('0xce')),this['push'](_0x482b('0x497')),this[_0x482b('0x260')](_0x482b('0x2f6')),this[_0x482b('0x260')](_0x482b('0x5be'),_0x449327),this[_0x482b('0x260')](_0x482b('0x195'));},Window_BattleLog['prototype'][_0x482b('0x697')]=function(_0x516a9a){},VisuMZ[_0x482b('0x654')][_0x482b('0x50c')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x563')],Window_BattleLog['prototype'][_0x482b('0x563')]=function(_0x27a1dd){if(!VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x355')])return;VisuMZ[_0x482b('0x654')][_0x482b('0x50c')]['call'](this,_0x27a1dd);},Window_BattleLog[_0x482b('0x389')][_0x482b('0x1ba')]=function(_0x572572){this[_0x482b('0x260')](_0x482b('0x747'),_0x572572);VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x75e')][_0x482b('0x459')]&&this[_0x482b('0x260')](_0x482b('0x4a7'),_0x572572,[BattleManager[_0x482b('0x2b1')]],-0x1);if(!VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['BattleLog'][_0x482b('0x118')])return;this[_0x482b('0x260')](_0x482b('0x642'),TextManager[_0x482b('0x5a8')][_0x482b('0x658')](_0x572572[_0x482b('0x665')]()));},Window_BattleLog[_0x482b('0x389')][_0x482b('0x488')]=function(_0xecab03){this[_0x482b('0x260')](_0x482b('0x2e1'),_0xecab03);if(!VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x22e')])return;this[_0x482b('0x260')](_0x482b('0x642'),TextManager[_0x482b('0x340')][_0x482b('0x658')](_0xecab03[_0x482b('0x665')]()));},Window_BattleLog[_0x482b('0x389')][_0x482b('0x235')]=function(_0x347f9a,_0x3c1a6d){if(VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x75e')][_0x482b('0x4a3')]){const _0x1bbd6c=_0x3c1a6d['item']();this[_0x482b('0x260')]('showAnimation',_0x347f9a,[_0x347f9a],_0x1bbd6c['animationId']);}},Window_BattleLog[_0x482b('0x389')]['displaySubstitute']=function(_0x55b0a7,_0x9077a3){this[_0x482b('0x260')](_0x482b('0x65b'),_0x55b0a7,_0x9077a3);if(!VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x58f')])return;const _0x1f728a=_0x55b0a7[_0x482b('0x665')](),_0x1108bb=TextManager[_0x482b('0x147')][_0x482b('0x658')](_0x1f728a,_0x9077a3[_0x482b('0x665')]());this['push'](_0x482b('0x642'),_0x1108bb);},VisuMZ[_0x482b('0x654')][_0x482b('0x1f5')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x706')],Window_BattleLog[_0x482b('0x389')]['displayFailure']=function(_0x8ec933){if(!VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x2a5')])return;VisuMZ[_0x482b('0x654')][_0x482b('0x1f5')][_0x482b('0x460')](this,_0x8ec933);},VisuMZ['BattleCore'][_0x482b('0x15d')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x323')],Window_BattleLog['prototype'][_0x482b('0x323')]=function(_0x300162){if(!VisuMZ['BattleCore'][_0x482b('0x21a')][_0x482b('0x18a')]['ShowCritical'])return;VisuMZ[_0x482b('0x654')][_0x482b('0x15d')]['call'](this,_0x300162);},VisuMZ['BattleCore'][_0x482b('0x5f0')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x795')],Window_BattleLog[_0x482b('0x389')][_0x482b('0x795')]=function(_0x3419ae){if(!VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x4d4')])return;VisuMZ[_0x482b('0x654')][_0x482b('0x5f0')][_0x482b('0x460')](this,_0x3419ae);},VisuMZ['BattleCore'][_0x482b('0x772')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x95')],Window_BattleLog['prototype']['displayEvasion']=function(_0xb6124e){if(!VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['BattleLog'][_0x482b('0x4d4')])return;VisuMZ[_0x482b('0x654')][_0x482b('0x772')][_0x482b('0x460')](this,_0xb6124e);},Window_BattleLog['prototype']['displayHpDamage']=function(_0x4b9bf4){if(_0x4b9bf4['result']()[_0x482b('0x3c5')]){_0x4b9bf4[_0x482b('0x766')]()[_0x482b('0x6ea')]>0x0&&!_0x4b9bf4[_0x482b('0x766')]()[_0x482b('0x33b')]&&this['push']('performDamage',_0x4b9bf4);_0x4b9bf4[_0x482b('0x766')]()['hpDamage']<0x0&&this[_0x482b('0x260')]('performRecovery',_0x4b9bf4);if(VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x14')]){if(_0x482b('0x4d8')===_0x482b('0x4d8'))this[_0x482b('0x260')](_0x482b('0x642'),this['makeHpDamageText'](_0x4b9bf4));else{function _0x2f2a74(){this[_0x482b('0x6f')]=![];}}}}},VisuMZ[_0x482b('0x654')][_0x482b('0x221')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x495')],Window_BattleLog['prototype'][_0x482b('0x495')]=function(_0x4beec0){if(!VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')]['ShowMpDmg'])return;VisuMZ[_0x482b('0x654')][_0x482b('0x221')][_0x482b('0x460')](this,_0x4beec0);},VisuMZ[_0x482b('0x654')][_0x482b('0x36a')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x437')],Window_BattleLog[_0x482b('0x389')][_0x482b('0x437')]=function(_0x5d8cd4){if(!VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x275')])return;VisuMZ[_0x482b('0x654')][_0x482b('0x36a')][_0x482b('0x460')](this,_0x5d8cd4);},Window_BattleLog['prototype'][_0x482b('0x461')]=function(_0x2ccb04){const _0x25c311=_0x2ccb04['result'](),_0xcb215e=_0x25c311[_0x482b('0x6af')]();for(const _0x21c678 of _0xcb215e){const _0x485b56=_0x2ccb04['isActor']()?_0x21c678[_0x482b('0x155')]:_0x21c678[_0x482b('0x160')];if(_0x485b56&&VisuMZ[_0x482b('0x654')][_0x482b('0x21a')]['BattleLog'][_0x482b('0x714')]){if(_0x482b('0x547')==='sbWnN')this[_0x482b('0x260')](_0x482b('0x1d8')),this[_0x482b('0x260')](_0x482b('0x698')),this[_0x482b('0x260')](_0x482b('0x642'),_0x485b56[_0x482b('0x658')](_0x2ccb04[_0x482b('0x665')]()));else{function _0x3d1a09(){if(this[_0x482b('0x2a0')][_0x482b('0x98')]!==_0x590a44)return this[_0x482b('0x2a0')][_0x482b('0x98')];if(this[_0x482b('0x52d')]()[_0x482b('0x4ed')][_0x482b('0x17')](/<SIDEVIEW SHOW SHADOW>/i))this[_0x482b('0x2a0')][_0x482b('0x98')]=!![];else this[_0x482b('0x52d')]()[_0x482b('0x4ed')][_0x482b('0x17')](/<SIDEVIEW HIDE SHADOW>/i)?this[_0x482b('0x2a0')][_0x482b('0x98')]=![]:this[_0x482b('0x2a0')][_0x482b('0x98')]=_0x2c6cf3[_0x482b('0x389')][_0x482b('0x45f')]['call'](this);return this['_cache']['svShadow'];}}}if(_0x21c678['id']===_0x2ccb04[_0x482b('0x529')]()){if(_0x482b('0x3be')!=='vIbAQ')this['push'](_0x482b('0x417'),_0x2ccb04);else{function _0x58bf1b(){if(_0xd136b8[_0x482b('0x49c')]===0x0)this[_0x482b('0x370')](_0x482b('0x608'));else{if(_0xc43fdf[_0x482b('0x49c')]===0x1)this[_0x482b('0x370')](_0x482b('0x2b6'));else _0xd1bc84[_0x482b('0x49c')]===0x2&&this['requestMotion'](_0x482b('0x641'));}this[_0x482b('0x238')](_0x5c7ce4[_0x482b('0x3b7')]);}}}}},VisuMZ[_0x482b('0x654')]['Window_BattleLog_displayRemovedStates']=Window_BattleLog[_0x482b('0x389')][_0x482b('0x8e')],Window_BattleLog[_0x482b('0x389')]['displayRemovedStates']=function(_0x17f86b){if(!VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')][_0x482b('0x99')])return;VisuMZ[_0x482b('0x654')]['Window_BattleLog_displayRemovedStates'][_0x482b('0x460')](this,_0x17f86b);},Window_BattleLog['prototype']['displayChangedBuffs']=function(_0x3056d5){const _0xabc049=VisuMZ[_0x482b('0x654')][_0x482b('0x21a')][_0x482b('0x18a')],_0x10bb9e=_0x3056d5[_0x482b('0x766')]();if(_0xabc049[_0x482b('0x396')])this[_0x482b('0x226')](_0x3056d5,_0x10bb9e[_0x482b('0x421')],TextManager[_0x482b('0x505')]);if(_0xabc049[_0x482b('0x763')])this[_0x482b('0x226')](_0x3056d5,_0x10bb9e[_0x482b('0x457')],TextManager[_0x482b('0x6c6')]);if(_0xabc049[_0x482b('0x58b')])this['displayBuffs'](_0x3056d5,_0x10bb9e[_0x482b('0xba')],TextManager[_0x482b('0x56')]);},VisuMZ[_0x482b('0x654')][_0x482b('0x10')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x2f6')],Window_BattleLog[_0x482b('0x389')][_0x482b('0x2f6')]=function(){VisuMZ[_0x482b('0x654')]['Window_BattleLog_clear'][_0x482b('0x460')](this),this[_0x482b('0x1a1')]();},VisuMZ['BattleCore'][_0x482b('0x521')]=Window_BattleLog[_0x482b('0x389')]['pushBaseLine'],Window_BattleLog[_0x482b('0x389')]['pushBaseLine']=function(){VisuMZ[_0x482b('0x654')]['Window_BattleLog_pushBaseLine'][_0x482b('0x460')](this),this[_0x482b('0x1a1')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x267')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x1d8')],Window_BattleLog[_0x482b('0x389')][_0x482b('0x1d8')]=function(){VisuMZ[_0x482b('0x654')][_0x482b('0x267')][_0x482b('0x460')](this),this[_0x482b('0x5c3')](),this[_0x482b('0x1a1')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x42b')]=Window_BattleLog['prototype'][_0x482b('0x6d9')],Window_BattleLog['prototype']['popupDamage']=function(_0x588ea0){VisuMZ[_0x482b('0x654')][_0x482b('0x42b')][_0x482b('0x460')](this,_0x588ea0),this[_0x482b('0x1a1')]();},Window_BattleLog[_0x482b('0x389')][_0x482b('0xce')]=function(){let _0x3fca0c=0x0;this[_0x482b('0x441')][_0x482b('0x5b8')]>0x0&&(_0x3fca0c=this[_0x482b('0x441')][this['_baseLineStack']['length']-0x1]),this[_0x482b('0x269')][_0x482b('0x5b8')]>_0x3fca0c?this[_0x482b('0x3d3')]():this[_0x482b('0x1a1')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x3e2')]=Window_BattleLog[_0x482b('0x389')]['performActionStart'],Window_BattleLog[_0x482b('0x389')]['performActionStart']=function(_0x631de1,_0x210c58){VisuMZ[_0x482b('0x654')][_0x482b('0x3e2')][_0x482b('0x460')](this,_0x631de1,_0x210c58),this['callNextMethod']();},VisuMZ['BattleCore']['Window_BattleLog_performAction']=Window_BattleLog[_0x482b('0x389')][_0x482b('0x141')],Window_BattleLog[_0x482b('0x389')][_0x482b('0x141')]=function(_0x504939,_0x1a5ed4){VisuMZ[_0x482b('0x654')][_0x482b('0x293')]['call'](this,_0x504939,_0x1a5ed4),this[_0x482b('0x1a1')]();},VisuMZ['BattleCore'][_0x482b('0xf4')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x5be')],Window_BattleLog[_0x482b('0x389')][_0x482b('0x5be')]=function(_0x26fcbd){for(const _0x1a6246 of BattleManager[_0x482b('0x6a8')]()){if('FGjxh'!==_0x482b('0x5f1')){if(!_0x1a6246)continue;if(_0x1a6246[_0x482b('0x2a4')]())continue;_0x1a6246[_0x482b('0x5be')]();}else{function _0x3538ac(){_0x387bb4[_0x482b('0x222')]=![];}}}this['callNextMethod']();},VisuMZ['BattleCore'][_0x482b('0x1a3')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x366')],Window_BattleLog[_0x482b('0x389')][_0x482b('0x366')]=function(_0x21e747){VisuMZ['BattleCore'][_0x482b('0x1a3')][_0x482b('0x460')](this,_0x21e747),this['callNextMethod']();},VisuMZ[_0x482b('0x654')][_0x482b('0x369')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x48c')],Window_BattleLog[_0x482b('0x389')][_0x482b('0x48c')]=function(_0x3d0c84){VisuMZ[_0x482b('0x654')]['Window_BattleLog_performMiss'][_0x482b('0x460')](this,_0x3d0c84),this[_0x482b('0x1a1')]();},VisuMZ['BattleCore'][_0x482b('0x74d')]=Window_BattleLog[_0x482b('0x389')]['performRecovery'],Window_BattleLog[_0x482b('0x389')][_0x482b('0xe6')]=function(_0x5ed566){VisuMZ[_0x482b('0x654')][_0x482b('0x74d')][_0x482b('0x460')](this,_0x5ed566),this['callNextMethod']();},VisuMZ[_0x482b('0x654')][_0x482b('0x71c')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x70a')],Window_BattleLog[_0x482b('0x389')][_0x482b('0x70a')]=function(_0x5224e4){VisuMZ['BattleCore']['Window_BattleLog_performEvasion']['call'](this,_0x5224e4),this[_0x482b('0x1a1')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x5ec')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x2b4')],Window_BattleLog[_0x482b('0x389')]['performMagicEvasion']=function(_0x306d6f){VisuMZ[_0x482b('0x654')][_0x482b('0x5ec')][_0x482b('0x460')](this,_0x306d6f),this[_0x482b('0x1a1')]();},VisuMZ[_0x482b('0x654')]['Window_BattleLog_performCounter']=Window_BattleLog[_0x482b('0x389')]['performCounter'],Window_BattleLog[_0x482b('0x389')][_0x482b('0x747')]=function(_0x562e6){VisuMZ[_0x482b('0x654')][_0x482b('0x1e9')]['call'](this,_0x562e6),this[_0x482b('0x1a1')]();},VisuMZ['BattleCore'][_0x482b('0x5e6')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x2e1')],Window_BattleLog[_0x482b('0x389')]['performReflection']=function(_0x21f11f){VisuMZ[_0x482b('0x654')][_0x482b('0x5e6')][_0x482b('0x460')](this,_0x21f11f),this[_0x482b('0x1a1')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x79a')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x65b')],Window_BattleLog[_0x482b('0x389')]['performSubstitute']=function(_0x7f874b,_0xa94904){VisuMZ[_0x482b('0x654')][_0x482b('0x79a')][_0x482b('0x460')](this,_0x7f874b,_0xa94904),this[_0x482b('0x1a1')]();},VisuMZ[_0x482b('0x654')][_0x482b('0x74e')]=Window_BattleLog[_0x482b('0x389')][_0x482b('0x417')],Window_BattleLog[_0x482b('0x389')]['performCollapse']=function(_0x85516a){VisuMZ[_0x482b('0x654')]['Window_BattleLog_performCollapse'][_0x482b('0x460')](this,_0x85516a),this['callNextMethod']();},Window_BattleLog[_0x482b('0x389')][_0x482b('0x11f')]=function(_0x3eea81,_0x5f3395){_0x3eea81[_0x482b('0x11f')](_0x5f3395),this[_0x482b('0x1a1')]();},Window_BattleLog[_0x482b('0x389')]['showEnemyAttackAnimation']=function(_0x28e2a5,_0xd1fc4){const _0x2b8e9a=_0x28e2a5[_0x482b('0x1af')]();if(_0x2b8e9a<=0x0)SoundManager[_0x482b('0x209')]();else{if('lcJov'===_0x482b('0x701')){function _0x214c69(){return this[_0x482b('0x440')]()[_0x482b('0x516')];}}else this['showNormalAnimation'](_0xd1fc4,_0x2b8e9a);}},Window_BattleLog['prototype'][_0x482b('0x68')]=function(_0x5818f1,_0x2f8246,_0x1b6437){const _0x3e72cc=[_0x5818f1]['concat'](_0x2f8246);for(const _0x1bc700 of _0x3e72cc){if(_0x482b('0x1b9')==='RalUD'){if(!_0x1bc700)continue;_0x1bc700[_0x482b('0x74a')](_0x1b6437);}else{function _0x3661a0(){this['updateForceAction']();}}}this[_0x482b('0x1a1')]();},Window_BattleLog[_0x482b('0x389')][_0x482b('0x63e')]=function(_0x58feca){this[_0x482b('0x554')]=_0x58feca;},Window_BattleLog[_0x482b('0x389')]['requestMotion']=function(_0x3173fe,_0x4f1227){for(const _0x3eadaf of _0x3173fe){if(!_0x3eadaf)continue;_0x3eadaf[_0x482b('0x370')](_0x4f1227);}this[_0x482b('0x1a1')]();},Window_BattleLog[_0x482b('0x389')][_0x482b('0x33f')]=function(_0x3fe478,_0x596659,_0x25de1f,_0x33b86f,_0x2da1ab,_0x2d723f){_0x3fe478[_0x482b('0x30a')](_0x596659,_0x25de1f,_0x33b86f,_0x2da1ab,_0x2d723f,-0x1),this[_0x482b('0x1a1')]();},Window_BattleLog[_0x482b('0x389')][_0x482b('0x2de')]=function(_0x29fe0f,_0x4110d2,_0xa9fff0,_0x28eaf2,_0xd8804,_0x4312c3,_0x48279e){const _0x415610=Math['min'](..._0x4110d2[_0x482b('0x6a0')](_0xf73b14=>_0xf73b14[_0x482b('0x67c')]()[_0x482b('0x28e')]-_0xf73b14['battler']()[_0x482b('0x2d0')]/0x2)),_0x40df92=Math[_0x482b('0x577')](..._0x4110d2[_0x482b('0x6a0')](_0x7effed=>_0x7effed['battler']()[_0x482b('0x28e')]+_0x7effed[_0x482b('0x67c')]()[_0x482b('0x2d0')]/0x2)),_0x58d20a=Math[_0x482b('0x680')](..._0x4110d2[_0x482b('0x6a0')](_0x223a84=>_0x223a84[_0x482b('0x67c')]()[_0x482b('0x11')]-_0x223a84[_0x482b('0x67c')]()[_0x482b('0x2c3')])),_0x43969f=Math['max'](..._0x4110d2[_0x482b('0x6a0')](_0x4a6f36=>_0x4a6f36[_0x482b('0x67c')]()[_0x482b('0x11')])),_0x4342b8=_0x4110d2['filter'](_0x1a91ab=>_0x1a91ab[_0x482b('0x3e4')]())[_0x482b('0x5b8')],_0x168db2=_0x4110d2['filter'](_0xfc4a74=>_0xfc4a74[_0x482b('0x279')]())[_0x482b('0x5b8')];let _0x54d8e1=0x0,_0x49d2cd=0x0;if(_0xa9fff0[_0x482b('0x17')](/front/i)){if(_0x482b('0x710')!==_0x482b('0x710')){function _0x2c4465(){const _0x32a0d6=this[_0x482b('0x3d4')]();return _0x32a0d6?_0x32a0d6['weaponImageId']:0x0;}}else _0x54d8e1=_0x4342b8>=_0x168db2?_0x415610:_0x40df92;}else{if(_0xa9fff0['match'](/middle/i)){if(_0x482b('0xb2')!==_0x482b('0x77e'))_0x54d8e1=(_0x415610+_0x40df92)/0x2,_0x48279e=-0x1;else{function _0x3f0382(){_0x2cda5f=(_0x3b5994+_0x3e3a20)/0x2,_0x8155bd=-0x1;}}}else{if(_0xa9fff0[_0x482b('0x17')](/back/i)){if(_0x482b('0x5bd')===_0x482b('0x5ad')){function _0x36dda8(){return _0x4d6a97[_0x482b('0x24')]()[_0x482b('0x439')](_0x24b78d=>_0x24b78d!==_0x29b9b0);}}else _0x54d8e1=_0x4342b8>=_0x168db2?_0x40df92:_0x415610;}}}if(_0xa9fff0['match'](/head/i))_0x49d2cd=_0x58d20a;else{if(_0xa9fff0[_0x482b('0x17')](/center/i)){if('BWNFA'!==_0x482b('0x407'))_0x49d2cd=(_0x58d20a+_0x43969f)/0x2;else{function _0x303faf(){const _0x5bc6b3=this[_0x482b('0x548')]();this[_0x482b('0x57a')]=![],this[_0x482b('0x5c3')]();if(this[_0x482b('0x2a4')]()&&_0x5bc6b3)this[_0x482b('0x417')]();}}}else _0xa9fff0[_0x482b('0x17')](/base/i)&&(_0x49d2cd=_0x43969f);}_0x29fe0f['moveBattlerToPoint'](_0x54d8e1,_0x49d2cd,_0x28eaf2,_0xd8804,_0x4312c3,_0x48279e),this[_0x482b('0x1a1')]();},Window_BattleLog[_0x482b('0x389')]['performJump']=function(_0x3d3d6a,_0x2fd989,_0x3d1057){for(const _0x1f6154 of _0x3d3d6a){if(!_0x1f6154)continue;_0x1f6154[_0x482b('0x176')](_0x2fd989,_0x3d1057);}this[_0x482b('0x1a1')]();};