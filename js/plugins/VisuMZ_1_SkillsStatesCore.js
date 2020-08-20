//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.00] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * - Assigning multiple Skill Types to Skills.
 * - Making custom Skill Cost Types (such as HP, Gold, and Items).
 * - Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * - Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * - Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * - Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * - Allowing states to be categorized and affected by categories, too.
 * - Displaying turn counts on states drawn in the window or on sprites.
 * - Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * - Create custom damage over time state calculations through notetags.
 * - Allow database objects to apply passive states to its user.
 * - Passive states can have conditions before they become active as well.
 * - Updated Skill Menu Scene layout to fit more modern appearances.
 * - Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * - Control over various aspects of the Skill Menu Scene.
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
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 *
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to affected actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
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
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
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
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - Use #rrggbb for a hex color.
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
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
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
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
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * Use #rrggbb for a hex color.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x2403=['%1\x20%2\x20%3','regenerateAll','KDQAi','getColor','filter','ihzKY','VjXmH','_animationIndex','checkShowHideJS','max','yrjYT','atUmb','maxItems','Window_SkillList_setActor','_currentActor','convertGaugeTypeSkillsStatesCore','statesByCategory','resetFontSettings','Game_Battler_regenerateAll','loadBitmap','height','DpaCf','fontBold','checkCacheKey','gainHp','DataOffsetY','<member-%1>','ZiFrv','isPlaytest','fontFace','CDYtz','mainAreaHeight','drawSkillCost','_stored_debuffColor','uzbCG','oqBJZ','meetsPassiveStateConditionSwitches','mpCost','checkShowHideNotetags','onAddBuffJS','stateId','XUXaR','qnGQA','iconIndex','fvemM','uiHelpPosition','isSkillCostShown','enemyId','RBMsT','drawActorStateData','onRegenerateCustomStateDamageOverTime','commandName','drawActorIcons','commandStyle','nRPuk','OKFdh','setStateData','onExpireBuff','recoverAll','VisuMZ_1_MainMenuCore','MfFnx','allIcons','slipTp','applyDebuffTurnManipulationEffects','onAddDebuffGlobalJS','clamp','exit','Game_BattlerBase_recoverAll','iconText','allowCreateShopStatusWindow','map','stateColor','TurnFontSize','wKtIA','removeStatesByCategory','process_VisuMZ_SkillsStatesCore_Skill_Cost','Sprite_Gauge_currentValue','active','getStateDisplay','Sprite_Gauge_setup','Scene_Skill_skillTypeWindowRect','canUse','updatedLayoutStyle','updateFrame','NzQmH','klKBQ','Window_SkillList_updateHelp','menuActor','Game_BattlerBase_resetStateCounts','onEraseStateJS','MAT','IsaGz','tisSL','TurnOffsetY','ARRAYFUNC','StackBuffMax','ShowTurns','CWVRe','passiveStates','FvKDx','Game_BattlerBase_buffIconIndex','process_VisuMZ_SkillsStatesCore_State_ApplyRemoveLeaveJS','BUyRN','addCommand','auto','checkShowHideSwitchNotetags','clearStateRetainType','toLowerCase','onRemoveState','BeZnf','Sprite_Gauge_redraw','ectMf','createItemWindow','Window_SkillList_maxCols','zLOpa','_stypeId','YqaBl','statePassiveConditionJS','anchor','jVYaO','setStateTurns','ShowData','regenerateAllSkillsStatesCore','clearStateDisplay','text','drawIcon','yaiUI','helpAreaHeight','drawItemStyleIconText','YyMSQ','isStateExpired','setupSkillsStatesCore','forgetSkill','Game_BattlerBase_eraseState','makeAdditionalSkillCostText','Game_Actor_learnSkill','stateHpSlipHealJS','round','DataOffsetX','getStateIdWithName','itemLineRect','process_VisuMZ_SkillsStatesCore_Skill_Notetags','add','decreaseBuff','drawItem','FUNC','Window_SkillStatus_refresh','isGroupDefeatStateAffected','IhxCT','isRightInputMode','LJQDb','slipMp','STRUCT','process_VisuMZ_SkillsStatesCore_State_SlipEffectJS','LAAkn','onAddDebuff','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20','setup','ttwhO','AGI','gkBLi','setItem','VfNvM','lPkhJ','_stored_buffColor','itemTextAlign','version','PjanS','zkCdi','slice','process_VisuMZ_SkillsStatesCore_Skill_JS','isBuffAffected','learnSkill','call','currentClass','onExpireStateJS','VisuMZ_0_CoreEngine','stateExpireJS','members','parameters','shopStatusWindowRectSkillsStatesCore','concat','currentMaxValueSkillsStatesCore','addPassiveStatesByPluginParameters','CalcJS','Scene_Skill_statusWindowRect','groupDefeat','_skills','onExpireState','SkillsStatesCore','EBytx','Scene_Skill_itemWindowRect','vigFb','process_VisuMZ_SkillsStatesCore_State_PassiveJS','TBEKb','DEF','paramValueByName','commandStyleCheck','removeBuff','skills','getStateReapplyRulings','EcjkK','bzmet','DataFontSize','helpWindowRectSkillsStatesCore','setStateOrigin','onExpireDebuffJS','_stateOrigin','getColorDataFromPluginParameters','createSkillCostText','drawItemStyleIcon','SkillMenuStatusRect','clearStatesWithStateRetain','buffLength','overwriteBuffTurns','YjTZm','_stateDisplay','TurnOffsetX','heal','QHNwV','uEsku','isMaxBuffAffected','GroupDigits','innerHeight','getStateOrigin','_costSettings','khQRT','_actor','addPassiveStatesTraitSets','debuffColor','process_VisuMZ_SkillsStatesCore_Notetags','removeState','checkSkillTypeMatch','drawExtendedSkillsStatesCoreStatus','slipHp','skillMpCost','nIvRl','SqLzq','onEraseDebuffJS','description','placeGauge','log','stateMaximumTurns','helpAreaTop','oZbrU','right','SsJlL','commandNameWindowCenter','RbIcq','WYEoF','ALL','Window_StatusBase_drawActorIcons','greater','isLearnedSkill','checkSkillConditionsNotetags','PlCIV','trim','Game_BattlerBase_skillTpCost','textSizeEx','inBattle','eVCtx','parse','isBuffExpired','Sprite_Gauge_currentMaxValue','placeExactGauge','shopStatusWindowRect','bitmap','isPassiveStateStackable','LUK','addStateTurns','ffUbu','Game_BattlerBase_increaseBuff','value','Game_BattlerBase_eraseBuff','actor','split','updateTurnDisplaySprite','commandNameWindowDrawText','tsMrT','zSIuL','ignore','Game_Actor_forgetSkill','commandNameWindowDrawBackground','damage','usableSkills','_stypeIDs','skillTypes','Window_SkillList_includes','_subject','addDebuff','redrawSkillsStatesCore','clearStateOrigin','currentValueSkillsStatesCore','getCurrentTroopUniqueID','ColorPositive','nWBqE','applyBuffTurnManipulationEffects','QoBok','stateMpSlipHealJS','PayJS','ARRAYJSON','MultiplierJS','format','gaugeLineHeight','auiGM','oNkkY','increaseBuff','onEraseStateCustomJS','_itemWindow','resetTextColor','clearStates','anzmm','Sprite_Gauge_gaugeRate','includesSkillsStatesCore','retrieveStateColor','skillEnableJS','setBuffTurns','LQaTF','setStatusWindow','_stateData','maxSlipDamage','Scene_Skill_createItemWindow','buttonAssistSwitch','onExpireBuffGlobalJS','PLdOT','eraseState','isPartyAllAffectedByGroupDefeatStates','makeCommandName','skill','onExpireStateCustomJS','user','_colorCache','uURVi','isAlive','itemWindowRectSkillsStatesCore','autoRemovalTiming','categories','number','none','states','JnCFe','getStypeIdWithName','BnqXh','windowPadding','usrgc','stateEraseJS','enemy','onAddStateGlobalJS','addPassiveStates','buff','isMaxDebuffAffected','_battler','Costs','IKDRg','lineHeight','_buffTurns','Game_Battler_addBuff','Game_Action_applyItemUserEffect','VJOrI','MaxTurns','skillVisibleJS','index','onAddStateMakeCustomSlipValues','ceil','Sprite_StateIcon_updateFrame','meetsSkillConditionsGlobalJS','vGGwQ','setDebuffTurns','meetsPassiveStateGlobalConditionJS','skillId','isDebuffAffected','hfgEH','ifSZv','setStateRetainType','icon','Game_Unit_isAllDead','QsNKc','createCommandNameWindow','ColorDebuff','passiveStateObjects','nJGbv','isAllDead','ARRAYSTRUCT','buffColor','indexOf','mainCommandWidth','gQAHj','success','SSpmW','ListWindowCols','push','<troop-%1>','JLyRs','BattleHiddenSkillTypes','ARRAYEVAL','_skillIDs','getCurrentStateActiveUser','_stateMaxTurns','ZZvzE','EnableLayout','aliveMembers','gradientFillRect','initialize','outlineColor','floor','YwAvW','status','MAXMP','mLlii','addBuff','currentDisplayedValue','item','changeOutlineColor','GaugeCurrentJS','BzgiS','TextJS','_skillTypeWindow','MAXHP','getSkillIdWithName','GapnD','EaFRy','skillTypeWindowRect','opacity','updateCommandNameWindow','priority','stateData','addBuffTurns','boxWidth','<actor-%1>','eraseBuff','drawFullGauge','stateTpSlipHealJS','MDF','isCommandEnabled','process_VisuMZ_SkillsStatesCore_State_Notetags','normalColor','currentValue','onEraseDebuff','calcWindowHeight','Settings','uiInputPosition','updateHelp','OUZhH','name','adjustItemWidthByShopStatus','rZhzO','shopStatusWidth','getSkillTypes','actions','CanPayJS','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','innerWidth','addDebuffTurns','onExpireBuffJS','uzWbP','Global','mainFontFace','EeIBh','ANY','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','checkSkillConditionsSwitchNotetags','piogk','ousQW','constructor','NEGATIVE','Param','ReapplyRules','_statusWindow','omuZn','note','rvTDS','meetsStateCondition','addPassiveStatesByNotetag','NUM','SkillConditionJS','fillRect','ZFxFq','DAlGi','toUpperCase','Scene_Skill_helpWindowRect','jVuoC','%1%','removeBuffsAuto','ATK','Game_Troop_setup','GaugeMaxJS','vyNMm','canClearState','jyQKQ','addWindow','YzblV','StackDebuffMax','death','ConvertParams','pBIPh','YLjNY','width','statusWindowRect','Game_BattlerBase_states','ShowShopStatus','statusWindowRectSkillsStatesCore','gaugeRate','canPaySkillCost','VkzbX','CmdTextAlign','Cygyz','YhliG','Window_StatusBase_placeGauge','ARRAYSTR','ColorNeutral','xdbMA','mainAreaTop','Window_SkillType_initialize','applyItemUserEffect','CmdStyle','onEraseDebuffGlobalJS','HiddenSkillTypes','GaugeDrawJS','makeCommandList','cYirj','DdGSq','helpWindowRect','meetsSkillConditionsEnableJS','MpRfV','onExpireDebuff','sDiGs','#%1','isUseModernControls','_buffs','checkShowHideBattleNotetags','_stateTurns','ANwiH','_stateRetainType','LayoutStyle','drawActorIconsAllTurnCounters','meetsPassiveStateConditionJS','state','Game_BattlerBase_initMembers','process_VisuMZ_SkillsStatesCore_State_Category','PassiveStates','fontSize','mainFontSize','uHyYF','GcPnz','SkillSceneAdjustSkillList','convertTargetToStateOriginKey','clear','stateTpSlipDamageJS','initMembersSkillsStatesCore','VnSIg','Name','clearStateData','meetsSkillConditions','NMWmc','hasState','xweUO','ColorBuff','lsxuV','skillTypeWindowRectSkillsStatesCore','_cache','makeSuccess','match','length','buffIconIndex','keys','VisuMZ_1_TraitsStatusCore','uRIGt','gainMp','checkShowHideSkillNotetags','swZLy','recover\x20all','Scene_Boot_onDatabaseLoaded','Game_Actor_skillTypes','onDatabaseLoaded','mzYXC','meetsPassiveStateConditions','TeQQi','IconStypeNorm','OrUHU','redraw','rpBlr','textColor','getStateData','callUpdateHelp','Xhcky','rgba(0,\x200,\x200,\x201)','DMhtg','replace','vzzcV','frameCount','onAddBuffGlobalJS','Game_BattlerBase_die','_turnDisplaySprite','Actor','tlGST','uiMenuStyle','States','onAddState','setStateDisplay','_scene','iconHeight','Skills','isBuffOrDebuffAffected','convertPassiveStates','KXNJv','onExpireDebuffGlobalJS','createAllSkillCostText','includes','GgcmY','Game_Battler_addState','gainSilentTp','isBottomHelpMode','onEraseStateGlobalJS','buttonAssistText1','stateMpSlipDamageJS','XYiKf','drawText','drawTextEx','Game_BattlerBase_decreaseBuff','RFFTm','PassiveConditionJS','die','reset','setActor','blpiv','addPassiveStatesFromOtherPlugins','stateHpSlipDamageJS','EhMrw','pGidM','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','wOYtK','contents','dNWsM','getStateRetainType','onAddStateCustomJS','onExpireStateGlobalJS','drawParamText','pvekl','resetStateCounts','_categoryWindow','debuffTurns','Sprite_Gauge_initMembers','center','Game_BattlerBase_clearStates','isStateAffected','lTJSz','xzaQx','equips','applyStateTurnManipulationEffects','_result','Game_BattlerBase_refresh','kfDUZ','prototype','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','InkXY','sort','Enemy','iconWidth','isActor','getCurrentStateOriginKey','_shopStatusWindow','_currentTroopUniqueID','<enemy-%1>','applyStateCategoryRemovalEffects','createShopStatusWindow','drawActorStateTurns','TYUiO','return\x200','drawActorBuffRates','isSkillUsableForAutoBattle','changeTextColor','statusWidth','buffTurns','refresh','tafae','actorId','IVCod','Buffs','cliJZ','colSpacing','createTurnDisplaySprite','_stateIDs','onEraseBuffGlobalJS','JpMwM','skillCostSeparator','Game_BattlerBase_overwriteBuffTurns','makeCurrentTroopUniqueID','stypeId','onAddBuff','untitled','kYnzr','drawActorBuffTurns','maxCols','useDigitGrouping','qyZiF','onEraseBuff','skillTpCost','iTBxV','stateAddJS','tpCost','_commandNameWindow','itemAt','stateTurns','onEraseBuffJS','VisuMZ_1_ItemsEquipsCore','getStateOriginByKey','Game_BattlerBase_meetsSkillConditions','initMembers','isUseSkillsStatesCoreUpdatedLayout'];(function(_0x1e4e1c,_0x240397){const _0x102118=function(_0x54e866){while(--_0x54e866){_0x1e4e1c['push'](_0x1e4e1c['shift']());}};_0x102118(++_0x240397);}(_0x2403,0xe3));const _0x1021=function(_0x1e4e1c,_0x240397){_0x1e4e1c=_0x1e4e1c-0x0;let _0x102118=_0x2403[_0x1e4e1c];return _0x102118;};var label=_0x1021('0x29f'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1021('0x1e6')](function(_0x516efa){return _0x516efa[_0x1021('0xb3')]&&_0x516efa[_0x1021('0xc')][_0x1021('0x17c')]('['+label+']');})[0x0];VisuMZ[label][_0x1021('0xd4')]=VisuMZ[label][_0x1021('0xd4')]||{},VisuMZ[_0x1021('0x10a')]=function(_0x3d05a7,_0x30996b){for(const _0x5d9667 in _0x30996b){if(_0x5d9667['match'](/(.*):(.*)/i)){const _0x193949=String(RegExp['$1']),_0x1e81f9=String(RegExp['$2'])['toUpperCase']()[_0x1021('0x1d')]();let _0x310a10,_0x1dae40,_0x8ba900;switch(_0x1e81f9){case _0x1021('0xf6'):_0x310a10=_0x30996b[_0x5d9667]!==''?Number(_0x30996b[_0x5d9667]):0x0;break;case'ARRAYNUM':_0x1dae40=_0x30996b[_0x5d9667]!==''?JSON[_0x1021('0x22')](_0x30996b[_0x5d9667]):[],_0x310a10=_0x1dae40['map'](_0x444a24=>Number(_0x444a24));break;case'EVAL':_0x310a10=_0x30996b[_0x5d9667]!==''?eval(_0x30996b[_0x5d9667]):null;break;case _0x1021('0xa7'):_0x1dae40=_0x30996b[_0x5d9667]!==''?JSON[_0x1021('0x22')](_0x30996b[_0x5d9667]):[],_0x310a10=_0x1dae40[_0x1021('0x228')](_0x1437c1=>eval(_0x1437c1));break;case'JSON':_0x310a10=_0x30996b[_0x5d9667]!==''?JSON[_0x1021('0x22')](_0x30996b[_0x5d9667]):'';break;case _0x1021('0x49'):_0x1dae40=_0x30996b[_0x5d9667]!==''?JSON[_0x1021('0x22')](_0x30996b[_0x5d9667]):[],_0x310a10=_0x1dae40['map'](_0x1acb06=>JSON[_0x1021('0x22')](_0x1acb06));break;case _0x1021('0x273'):_0x310a10=_0x30996b[_0x5d9667]!==''?new Function(JSON[_0x1021('0x22')](_0x30996b[_0x5d9667])):new Function(_0x1021('0x1b8'));break;case _0x1021('0x240'):_0x1dae40=_0x30996b[_0x5d9667]!==''?JSON[_0x1021('0x22')](_0x30996b[_0x5d9667]):[],_0x310a10=_0x1dae40[_0x1021('0x228')](_0x25cf66=>new Function(JSON[_0x1021('0x22')](_0x25cf66)));break;case'STR':_0x310a10=_0x30996b[_0x5d9667]!==''?String(_0x30996b[_0x5d9667]):'';break;case _0x1021('0x119'):_0x1dae40=_0x30996b[_0x5d9667]!==''?JSON['parse'](_0x30996b[_0x5d9667]):[],_0x310a10=_0x1dae40[_0x1021('0x228')](_0xd11d9e=>String(_0xd11d9e));break;case _0x1021('0x27a'):_0x8ba900=_0x30996b[_0x5d9667]!==''?JSON['parse'](_0x30996b[_0x5d9667]):{},_0x3d05a7[_0x193949]={},VisuMZ[_0x1021('0x10a')](_0x3d05a7[_0x193949],_0x8ba900);continue;case _0x1021('0x9b'):_0x1dae40=_0x30996b[_0x5d9667]!==''?JSON[_0x1021('0x22')](_0x30996b[_0x5d9667]):[],_0x310a10=_0x1dae40[_0x1021('0x228')](_0x4fdad8=>VisuMZ[_0x1021('0x10a')]({},JSON['parse'](_0x4fdad8)));break;default:continue;}_0x3d05a7[_0x193949]=_0x310a10;}}return _0x3d05a7;},(_0x67e4bf=>{const _0x325737=_0x67e4bf[_0x1021('0xd8')];for(const _0x4ea524 of dependencies){if(_0x1021('0x116')===_0x1021('0x8b')){function _0xc9150a(){this[_0x1021('0x2af')](_0x1836c3),this[_0x1021('0x87')](_0x5fb328),this[_0x1021('0x197')](_0x214a70),this[_0x1021('0x78')](_0x588167);}}else{if(!Imported[_0x4ea524]){if(_0x1021('0x73')===_0x1021('0x219')){function _0x94f8ad(){return this[_0x1021('0xbd')]&&this[_0x1021('0xbd')][_0x1021('0x22f')]?_0xc3896c[_0x1021('0x5f')]:'';}}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x1021('0x4b')](_0x325737,_0x4ea524)),SceneManager[_0x1021('0x224')]();break;}}}}const _0x4a0ebb=_0x67e4bf['description'];if(_0x4a0ebb[_0x1021('0x14e')](/\[Version[ ](.*?)\]/i)){if(_0x1021('0x124')==='cYirj'){const _0x405b77=Number(RegExp['$1']);_0x405b77!==VisuMZ[label][_0x1021('0x288')]&&(alert(_0x1021('0xdf')[_0x1021('0x4b')](_0x325737,_0x405b77)),SceneManager['exit']());}else{function _0x1faf05(){this[_0x1021('0x222')](_0x6362d3,_0x21a292);}}}if(_0x4a0ebb[_0x1021('0x14e')](/\[Tier[ ](\d+)\]/i)){const _0xd21266=Number(RegExp['$1']);_0xd21266<tier?(alert(_0x1021('0xe8')['format'](_0x325737,_0xd21266,tier)),SceneManager[_0x1021('0x224')]()):tier=Math[_0x1021('0x1eb')](_0xd21266,tier);}VisuMZ[_0x1021('0x10a')](VisuMZ[label][_0x1021('0xd4')],_0x67e4bf[_0x1021('0x295')]);})(pluginData),VisuMZ[_0x1021('0x29f')][_0x1021('0x158')]=Scene_Boot['prototype'][_0x1021('0x15a')],Scene_Boot[_0x1021('0x1a9')][_0x1021('0x15a')]=function(){VisuMZ[_0x1021('0x29f')][_0x1021('0x158')][_0x1021('0x28f')](this),this[_0x1021('0x3')]();},Scene_Boot[_0x1021('0x1a9')][_0x1021('0x3')]=function(){this[_0x1021('0x26f')](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();},Scene_Boot[_0x1021('0x1a9')][_0x1021('0x26f')]=function(){for(const _0x391226 of $dataSkills){if(!_0x391226)continue;this[_0x1021('0x22d')](_0x391226),this[_0x1021('0x28c')](_0x391226);}},Scene_Boot[_0x1021('0x1a9')][_0x1021('0x22d')]=function(_0x1eeb12){const _0x300450=_0x1eeb12[_0x1021('0xf2')];if(_0x300450[_0x1021('0x14e')](/<MP COST:[ ](\d+)>/i)){if(_0x1021('0xa1')!==_0x1021('0xa1')){function _0x1d152e(){const _0x86e0ae=_0x1021('0x1b3')[_0x1021('0x4b')](_0x1d48d7[_0x1021('0x211')]()),_0x350010=_0x1021('0x1fc')[_0x1021('0x4b')](_0x2d00ff['index']()),_0x377af0=_0x1021('0xa4')[_0x1021('0x4b')](_0x5767fd['getCurrentTroopUniqueID']());return _0x1021('0x1e2')[_0x1021('0x4b')](_0x86e0ae,_0x350010,_0x377af0);}}else _0x1eeb12[_0x1021('0x207')]=Number(RegExp['$1']);}if(_0x300450[_0x1021('0x14e')](/<TP COST:[ ](\d+)>/i)){if(_0x1021('0x212')==='RBMsT')_0x1eeb12[_0x1021('0x1d8')]=Number(RegExp['$1']);else{function _0x899079(){if(!this[_0x1021('0x0')])return;const _0x1efb57=this['_actor'][_0x1021('0x3b')]();for(const _0x434f1e of _0x1efb57){const _0x321fc3=this[_0x1021('0x64')](_0x434f1e);this[_0x1021('0x249')](_0x321fc3,_0x1021('0x65'),!![],_0x434f1e);}}}}},VisuMZ[_0x1021('0x29f')][_0x1021('0x58')]={},VisuMZ[_0x1021('0x29f')][_0x1021('0x85')]={},Scene_Boot[_0x1021('0x1a9')][_0x1021('0x28c')]=function(_0xa73661){const _0x190069=_0xa73661[_0x1021('0xf2')];if(_0x190069[_0x1021('0x14e')](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x2dff1d=String(RegExp['$1']),_0x1c9d75=_0x1021('0x27e')[_0x1021('0x4b')](_0x2dff1d);VisuMZ[_0x1021('0x29f')]['skillEnableJS'][_0xa73661['id']]=new Function(_0x1021('0x65'),_0x1c9d75);}if(_0x190069[_0x1021('0x14e')](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x4c794e=String(RegExp['$1']),_0x2a59d2='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20'[_0x1021('0x4b')](_0x4c794e);VisuMZ[_0x1021('0x29f')][_0x1021('0x85')][_0xa73661['id']]=new Function(_0x1021('0x65'),_0x2a59d2);}},Scene_Boot['prototype'][_0x1021('0xcf')]=function(){for(const _0x40133b of $dataStates){if(!_0x40133b)continue;this['process_VisuMZ_SkillsStatesCore_State_Category'](_0x40133b),this[_0x1021('0x2a3')](_0x40133b),this[_0x1021('0x27b')](_0x40133b),this[_0x1021('0x247')](_0x40133b);}},Scene_Boot[_0x1021('0x1a9')][_0x1021('0x137')]=function(_0x50ef4d){_0x50ef4d[_0x1021('0x6d')]=[_0x1021('0x17'),_0x1021('0xe7')];const _0x5c963a=_0x50ef4d[_0x1021('0xf2')],_0x32560b=_0x5c963a['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x32560b)for(const _0xbe977c of _0x32560b){if(_0x1021('0x69')===_0x1021('0x91')){function _0x432713(){return[];}}else{_0xbe977c[_0x1021('0x14e')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x9b2bc1=String(RegExp['$1'])['toUpperCase']()[_0x1021('0x1d')]()[_0x1021('0x30')](',');for(const _0x5892af of _0x9b2bc1){_0x50ef4d['categories'][_0x1021('0xa3')](_0x5892af[_0x1021('0x1d')]());}}}if(_0x5c963a[_0x1021('0x14e')](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if('NxMDt'===_0x1021('0x1ed')){function _0x21b169(){this['_costSettings']=_0x1fb357[0x0];}}else{const _0x56c4c9=RegExp['$1'][_0x1021('0x30')](/[\r\n]+/);for(const _0x5b431e of _0x56c4c9){_0x50ef4d[_0x1021('0x6d')][_0x1021('0xa3')](_0x5b431e[_0x1021('0xfb')]()['trim']());}}}_0x5c963a['match'](/<POSITIVE STATE>/i)&&_0x50ef4d['categories'][_0x1021('0xa3')]('POSITIVE');if(_0x5c963a[_0x1021('0x14e')](/<NEGATIVE STATE>/i)){if(_0x1021('0x191')==='sQPIy'){function _0x1e004e(){if(_0x318070<=0x0)return;this['removeState'](_0x1152ac['id']),this['_result'][_0x1021('0xa0')]=!![],_0x22a0f4--;}}else _0x50ef4d['categories']['push'](_0x1021('0xed'));}},VisuMZ[_0x1021('0x29f')][_0x1021('0x257')]={},Scene_Boot[_0x1021('0x1a9')][_0x1021('0x2a3')]=function(_0x24cee8){const _0x160431=_0x24cee8[_0x1021('0xf2')];if(_0x160431[_0x1021('0x14e')](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){if('YqaBl'===_0x1021('0x256')){const _0x19c32d=String(RegExp['$1']),_0x4a2215='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x1021('0x4b')](_0x19c32d);VisuMZ['SkillsStatesCore'][_0x1021('0x257')][_0x24cee8['id']]=new Function(_0x1021('0x135'),_0x4a2215);}else{function _0x1d18b0(){this[_0x1021('0x144')](_0x5b30c4),this[_0x1021('0x25d')](_0x5c600f),this[_0x1021('0x40')](_0x48601b);}}}},VisuMZ[_0x1021('0x29f')][_0x1021('0x18f')]={},VisuMZ['SkillsStatesCore'][_0x1021('0x26a')]={},VisuMZ[_0x1021('0x29f')][_0x1021('0x183')]={},VisuMZ[_0x1021('0x29f')][_0x1021('0x47')]={},VisuMZ['SkillsStatesCore'][_0x1021('0x140')]={},VisuMZ[_0x1021('0x29f')]['stateTpSlipHealJS']={},Scene_Boot[_0x1021('0x1a9')][_0x1021('0x27b')]=function(_0xd4100e){const _0x46883f=_0xd4100e[_0x1021('0xf2')],_0x2a7cea=_0x1021('0x192');if(_0x46883f[_0x1021('0x14e')](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x4979b9=String(RegExp['$1']),_0x5ec570=_0x2a7cea[_0x1021('0x4b')](_0x4979b9,_0x1021('0x38'),-0x1,_0x1021('0x7'));VisuMZ[_0x1021('0x29f')][_0x1021('0x18f')][_0xd4100e['id']]=new Function('stateId',_0x5ec570);}else{if(_0x46883f[_0x1021('0x14e')](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x4c5b98=String(RegExp['$1']),_0x36a92a=_0x2a7cea[_0x1021('0x4b')](_0x4c5b98,_0x1021('0x2bc'),0x1,_0x1021('0x7'));VisuMZ[_0x1021('0x29f')][_0x1021('0x26a')][_0xd4100e['id']]=new Function(_0x1021('0x20a'),_0x36a92a);}}if(_0x46883f[_0x1021('0x14e')](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if(_0x1021('0x179')!==_0x1021('0x179')){function _0x2b836b(){this[_0x1021('0x194')]['fontFace']=_0x539888[_0x1021('0xe5')](),this[_0x1021('0x194')]['fontSize']=_0x3c65c4[_0x1021('0x13a')](),this[_0x1021('0x52')]();}}else{const _0x44ace9=String(RegExp['$1']),_0x19dbf2=_0x2a7cea[_0x1021('0x4b')](_0x44ace9,'damage',-0x1,_0x1021('0x279'));VisuMZ[_0x1021('0x29f')][_0x1021('0x183')][_0xd4100e['id']]=new Function(_0x1021('0x20a'),_0x19dbf2);}}else{if(_0x46883f[_0x1021('0x14e')](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x11195c=String(RegExp['$1']),_0x5457d8=_0x2a7cea[_0x1021('0x4b')](_0x11195c,_0x1021('0x2bc'),0x1,_0x1021('0x279'));VisuMZ[_0x1021('0x29f')][_0x1021('0x47')][_0xd4100e['id']]=new Function(_0x1021('0x20a'),_0x5457d8);}}if(_0x46883f[_0x1021('0x14e')](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x911c83=String(RegExp['$1']),_0x3e6a85=_0x2a7cea[_0x1021('0x4b')](_0x911c83,'damage',-0x1,_0x1021('0x220'));VisuMZ[_0x1021('0x29f')][_0x1021('0x140')][_0xd4100e['id']]=new Function(_0x1021('0x20a'),_0x3e6a85);}else{if(_0x46883f[_0x1021('0x14e')](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if(_0x1021('0x282')!==_0x1021('0x260')){const _0x1969d5=String(RegExp['$1']),_0x5f3d12=_0x2a7cea[_0x1021('0x4b')](_0x1969d5,_0x1021('0x2bc'),0x1,_0x1021('0x220'));VisuMZ['SkillsStatesCore'][_0x1021('0xcc')][_0xd4100e['id']]=new Function(_0x1021('0x20a'),_0x5f3d12);}else{function _0x45bc76(){const _0x29ebf2=this[_0x1021('0x1d9')],_0x54c4b9=_0x241605[_0x1021('0x74')](),_0x31b7c7=_0x18b129['x']+_0x3d7e73[_0x1021('0xb1')](_0x4e1b3e[_0x1021('0x10d')]/0x2)+_0x54c4b9;_0x29ebf2['x']=_0x29ebf2[_0x1021('0x10d')]/-0x2+_0x31b7c7,_0x29ebf2['y']=_0x5b15a7[_0x1021('0xb1')](_0x6e21fd[_0x1021('0x1f6')]/0x2);}}}}},VisuMZ[_0x1021('0x29f')][_0x1021('0x1d7')]={},VisuMZ['SkillsStatesCore'][_0x1021('0x76')]={},VisuMZ[_0x1021('0x29f')][_0x1021('0x293')]={},Scene_Boot[_0x1021('0x1a9')][_0x1021('0x247')]=function(_0x5ac9a0){const _0x25bb09=_0x5ac9a0[_0x1021('0xf2')],_0x4e94cf=_0x1021('0x1aa');if(_0x25bb09[_0x1021('0x14e')](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x44fe1c=String(RegExp['$1']),_0x2169dd=_0x4e94cf[_0x1021('0x4b')](_0x44fe1c);VisuMZ[_0x1021('0x29f')][_0x1021('0x1d7')][_0x5ac9a0['id']]=new Function(_0x1021('0x20a'),_0x2169dd);}if(_0x25bb09[_0x1021('0x14e')](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x408d2b=String(RegExp['$1']),_0x1b9bb7=_0x4e94cf['format'](_0x408d2b);VisuMZ['SkillsStatesCore'][_0x1021('0x1d7')][_0x5ac9a0['id']]=new Function(_0x1021('0x20a'),_0x1b9bb7);}if(_0x25bb09[_0x1021('0x14e')](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x2296e2=String(RegExp['$1']),_0x1939c3=_0x4e94cf[_0x1021('0x4b')](_0x2296e2);VisuMZ[_0x1021('0x29f')][_0x1021('0x1d7')][_0x5ac9a0['id']]=new Function(_0x1021('0x20a'),_0x1939c3);}},DataManager[_0x1021('0xdc')]=function(_0x1ecc5e){this[_0x1021('0x3a')]=this[_0x1021('0x3a')]||{};if(this[_0x1021('0x3a')][_0x1ecc5e['id']])return this[_0x1021('0x3a')][_0x1ecc5e['id']];this['_stypeIDs'][_0x1ecc5e['id']]=[_0x1ecc5e[_0x1021('0x1cc')]];if(_0x1ecc5e[_0x1021('0xf2')][_0x1021('0x14e')](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('Xhcky'===_0x1021('0x165')){const _0x1e4e05=JSON[_0x1021('0x22')]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x1021('0x3a')][_0x1ecc5e['id']]=this[_0x1021('0x3a')][_0x1ecc5e['id']]['concat'](_0x1e4e05);}else{function _0x186cc5(){this['_statusWindow'][_0x1021('0x283')](this[_0x1021('0x1da')](0x0));}}}else{if(_0x1ecc5e[_0x1021('0xf2')][_0x1021('0x14e')](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x1029bb=RegExp['$1']['split'](',');for(const _0x549563 of _0x1029bb){if(_0x1021('0x278')===_0x1021('0x1c3')){function _0x3d8220(){let _0x607873=0x0,_0x5e0a1a=0x0;if(_0x12ae46[_0x1021('0x14e')](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x607873=_0x5bf41e(_0x4522cd['$1']),_0x5e0a1a=_0x647671(_0x5f2718['$2']);else _0x178ecc[_0x1021('0x14e')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x607873=_0x386a31[_0x1021('0x26d')](_0x14faf6['$1']),_0x5e0a1a=_0x190994(_0xd2850a['$2']));_0x31f554['addStateTurns'](_0x607873,_0x5e0a1a),this[_0x1021('0x14d')](_0x2fb7e9);}}else{const _0x2ce60e=DataManager['getStypeIdWithName'](_0x549563);if(_0x2ce60e)this[_0x1021('0x3a')][_0x1ecc5e['id']][_0x1021('0xa3')](_0x2ce60e);}}}}return this[_0x1021('0x3a')][_0x1ecc5e['id']];},DataManager[_0x1021('0x72')]=function(_0x41d6c0){_0x41d6c0=_0x41d6c0[_0x1021('0xfb')]()[_0x1021('0x1d')](),this[_0x1021('0x3a')]=this[_0x1021('0x3a')]||{};if(this[_0x1021('0x3a')][_0x41d6c0])return this[_0x1021('0x3a')][_0x41d6c0];for(let _0xbce83b=0x1;_0xbce83b<0x64;_0xbce83b++){if(_0x1021('0x17d')!==_0x1021('0x2a4')){if(!$dataSystem[_0x1021('0x3b')][_0xbce83b])continue;let _0x54e7fd=$dataSystem['skillTypes'][_0xbce83b][_0x1021('0xfb')]()['trim']();_0x54e7fd=_0x54e7fd[_0x1021('0x168')](/\x1I\[(\d+)\]/gi,''),_0x54e7fd=_0x54e7fd[_0x1021('0x168')](/\\I\[(\d+)\]/gi,''),this[_0x1021('0x3a')][_0x54e7fd]=_0xbce83b;}else{function _0x3ac9fe(){return _0x129688[_0x1021('0x5f')];}}}return this['_stypeIDs'][_0x41d6c0]||0x0;},DataManager[_0x1021('0xbf')]=function(_0x595ef1){_0x595ef1=_0x595ef1[_0x1021('0xfb')]()[_0x1021('0x1d')](),this['_skillIDs']=this[_0x1021('0xa8')]||{};if(this[_0x1021('0xa8')][_0x595ef1])return this[_0x1021('0xa8')][_0x595ef1];for(const _0x305013 of $dataSkills){if(!_0x305013)continue;this[_0x1021('0xa8')][_0x305013[_0x1021('0xd8')]['toUpperCase']()[_0x1021('0x1d')]()]=_0x305013['id'];}return this[_0x1021('0xa8')][_0x595ef1]||0x0;},DataManager[_0x1021('0x26d')]=function(_0x6faa1d){_0x6faa1d=_0x6faa1d[_0x1021('0xfb')]()[_0x1021('0x1d')](),this[_0x1021('0x1c6')]=this[_0x1021('0x1c6')]||{};if(this[_0x1021('0x1c6')][_0x6faa1d])return this[_0x1021('0x1c6')][_0x6faa1d];for(const _0x9b0e27 of $dataStates){if(!_0x9b0e27)continue;this[_0x1021('0x1c6')][_0x9b0e27['name'][_0x1021('0xfb')]()[_0x1021('0x1d')]()]=_0x9b0e27['id'];}return this[_0x1021('0x1c6')][_0x6faa1d]||0x0;},DataManager[_0x1021('0xf')]=function(_0xfd1c6f){this[_0x1021('0xaa')]=this[_0x1021('0xaa')]||{};if(this[_0x1021('0xaa')][_0xfd1c6f])return this[_0x1021('0xaa')][_0xfd1c6f];return $dataStates[_0xfd1c6f][_0x1021('0xf2')][_0x1021('0x14e')](/<MAX TURNS:[ ](\d+)>/i)?this['_stateMaxTurns'][_0xfd1c6f]=Number(RegExp['$1']):this['_stateMaxTurns'][_0xfd1c6f]=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x171')]['MaxTurns'],this[_0x1021('0xaa')][_0xfd1c6f];},ColorManager['getColorDataFromPluginParameters']=function(_0xdb431a,_0x4eeed6){return _0x4eeed6=String(_0x4eeed6),this[_0x1021('0x68')]=this[_0x1021('0x68')]||{},_0x4eeed6['match'](/#(.*)/i)?this[_0x1021('0x68')][_0xdb431a]='#%1'[_0x1021('0x4b')](String(RegExp['$1'])):this['_colorCache'][_0xdb431a]=this[_0x1021('0x162')](Number(_0x4eeed6)),this[_0x1021('0x68')][_0xdb431a];},ColorManager[_0x1021('0x1e5')]=function(_0xd2806c){_0xd2806c=String(_0xd2806c);if(_0xd2806c[_0x1021('0x14e')](/#(.*)/i)){if(_0x1021('0x114')!==_0x1021('0x280'))return _0x1021('0x12b')['format'](String(RegExp['$1']));else{function _0x1196e0(){return _0x1021('0xc9')[_0x1021('0x4b')](_0x3b748f[_0x1021('0x1c0')]());}}}else{if(_0x1021('0x117')===_0x1021('0x117'))return this[_0x1021('0x162')](Number(_0xd2806c));else{function _0x6c3bac(){return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x1021('0x111')]():_0x19ba1c[_0x1021('0x29f')][_0x1021('0x29b')][_0x1021('0x28f')](this);}}}},ColorManager[_0x1021('0x229')]=function(_0xefc0a0){if(typeof _0xefc0a0===_0x1021('0x6e'))_0xefc0a0=$dataStates[_0xefc0a0];const _0x943b84='_stored_state-%1-color'['format'](_0xefc0a0['id']);this[_0x1021('0x68')]=this[_0x1021('0x68')]||{};if(this[_0x1021('0x68')][_0x943b84])return this['_colorCache'][_0x943b84];const _0x1e36c9=this[_0x1021('0x57')](_0xefc0a0);return this[_0x1021('0x2b2')](_0x943b84,_0x1e36c9);},ColorManager[_0x1021('0x57')]=function(_0x3d20cf){const _0xe78306=_0x3d20cf['note'];if(_0xe78306[_0x1021('0x14e')](/<TURN COLOR:[ ](.*)>/i)){if(_0x1021('0xb2')!==_0x1021('0x23d'))return String(RegExp['$1']);else{function _0x27dd9f(){this[_0x1021('0x131')]=_0xf9e55f;}}}else{if(_0xe78306[_0x1021('0x14e')](/<POSITIVE STATE>/i)){if(_0x1021('0x161')===_0x1021('0x188')){function _0x2d008c(){let _0x184f22=0x0,_0x351504=0x0;if(_0x4d0bf9[_0x1021('0x14e')](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x184f22=_0x2d48d0(_0x27c8b4['$1']),_0x351504=_0x190cd0(_0xbe5762['$2']);else _0x259843[_0x1021('0x14e')](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x184f22=_0x5d3975['getStateIdWithName'](_0x53c706['$1']),_0x351504=_0x5d218c(_0x106398['$2']));_0x1722a1[_0x1021('0x25a')](_0x184f22,_0x351504),this[_0x1021('0x14d')](_0x5ef759);}}else return VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')]['States'][_0x1021('0x43')];}else{if(_0xe78306[_0x1021('0x14e')](/<NEGATIVE STATE>/i))return VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x171')]['ColorNegative'];else{if(_0x1021('0x2c4')!==_0x1021('0x237'))return VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x171')][_0x1021('0x11a')];else{function _0x2b9eaa(){const _0x2ed37c=_0x4de51a[_0x1021('0xf2')];if(_0x5d2329===_0x1021('0x109')&&_0x2ed37c['match'](/<NO DEATH CLEAR>/i))return![];if(_0x2e64e1===_0x1021('0x157')&&_0x2ed37c[_0x1021('0x14e')](/<NO RECOVER ALL CLEAR>/i))return![];}}}}}},ColorManager['buffColor']=function(){const _0x1315a8=_0x1021('0x286');this[_0x1021('0x68')]=this[_0x1021('0x68')]||{};if(this[_0x1021('0x68')][_0x1315a8])return this[_0x1021('0x68')][_0x1315a8];const _0x166311=VisuMZ['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0x149')];return this[_0x1021('0x2b2')](_0x1315a8,_0x166311);},ColorManager[_0x1021('0x2')]=function(){const _0x1b62ae=_0x1021('0x203');this[_0x1021('0x68')]=this[_0x1021('0x68')]||{};if(this[_0x1021('0x68')][_0x1b62ae])return this[_0x1021('0x68')][_0x1b62ae];const _0x395a26=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')]['Buffs'][_0x1021('0x97')];return this[_0x1021('0x2b2')](_0x1b62ae,_0x395a26);},VisuMZ[_0x1021('0x29f')][_0x1021('0x82')]=Game_Action['prototype']['applyItemUserEffect'],Game_Action[_0x1021('0x1a9')][_0x1021('0x11e')]=function(_0x52f7b7){VisuMZ[_0x1021('0x29f')][_0x1021('0x82')][_0x1021('0x28f')](this,_0x52f7b7),this['applySkillsStatesCoreEffects'](_0x52f7b7);},Game_Action[_0x1021('0x1a9')]['applySkillsStatesCoreEffects']=function(_0x377d84){this[_0x1021('0x1b4')](_0x377d84),this[_0x1021('0x1a5')](_0x377d84),this['applyBuffTurnManipulationEffects'](_0x377d84),this[_0x1021('0x221')](_0x377d84);},Game_Action[_0x1021('0x1a9')][_0x1021('0x1b4')]=function(_0x2a058d){if(_0x2a058d[_0x1021('0x70')]()['length']<=0x0)return;const _0x45e464=this[_0x1021('0xb8')]()[_0x1021('0xf2')],_0x1541a0=_0x45e464['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x1541a0){if('TYUiO'!==_0x1021('0x1b7')){function _0x854f59(){const _0x4968b5=_0x464d6e(_0x2220ed['$1']),_0x102cae=_0x865e86[_0x1021('0x4b')](_0x4968b5);_0x5d460c[_0x1021('0x29f')]['stateAddJS'][_0x37593a['id']]=new _0x5a574f(_0x1021('0x20a'),_0x102cae);}}else for(const _0x3ba320 of _0x1541a0){if(_0x1021('0x19a')===_0x1021('0x2b9')){function _0x30617c(){const _0x25ae1f=_0x3d247c(_0x562456['$1']),_0x403f0f=_0x48e49b[_0x1021('0x4b')](_0x25ae1f);_0x43d915[_0x1021('0x29f')][_0x1021('0x1d7')][_0x2246f6['id']]=new _0x506207(_0x1021('0x20a'),_0x403f0f);}}else{_0x3ba320['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x3c208b=String(RegExp['$1']),_0x28694d=Number(RegExp['$2']);_0x2a058d['removeStatesByCategory'](_0x3c208b,_0x28694d);}}}},Game_Action[_0x1021('0x1a9')][_0x1021('0x1a5')]=function(_0x619377){const _0x4a48f4=this[_0x1021('0xb8')]()[_0x1021('0xf2')],_0x29ecd1=_0x4a48f4[_0x1021('0x14e')](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x29ecd1)for(const _0x50079f of _0x29ecd1){if(_0x1021('0x15f')!=='gqxFk'){let _0x3db504=0x0,_0x2527ab=0x0;if(_0x50079f[_0x1021('0x14e')](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x3db504=Number(RegExp['$1']),_0x2527ab=Number(RegExp['$2']);else _0x50079f[_0x1021('0x14e')](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x3db504=DataManager[_0x1021('0x26d')](RegExp['$1']),_0x2527ab=Number(RegExp['$2']));_0x619377[_0x1021('0x25a')](_0x3db504,_0x2527ab),this[_0x1021('0x14d')](_0x619377);}else{function _0x489e81(){this[_0x1021('0x1b4')](_0x491a2d),this[_0x1021('0x1a5')](_0x13f8ea),this[_0x1021('0x45')](_0x4470f5),this[_0x1021('0x221')](_0x523f5d);}}}const _0x76219a=_0x4a48f4['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x76219a){if(_0x1021('0x5a')===_0x1021('0x193')){function _0x1b016c(){const _0x5c9030=_0x451394['note'];if(_0x5c9030[_0x1021('0x14e')](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x2dcbc5=_0x182eea(_0x5caaf3['$1']),_0x254a4f='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x1021('0x4b')](_0x2dcbc5);_0x1aa8ef['SkillsStatesCore'][_0x1021('0x257')][_0x327e4d['id']]=new _0x354673('state',_0x254a4f);}}}else for(const _0x2959e7 of _0x76219a){let _0x3c9f2c=0x0,_0x47ea87=0x0;if(_0x2959e7[_0x1021('0x14e')](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x3c9f2c=Number(RegExp['$1']),_0x47ea87=Number(RegExp['$2']);else _0x2959e7[_0x1021('0x14e')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x3c9f2c=DataManager[_0x1021('0x26d')](RegExp['$1']),_0x47ea87=Number(RegExp['$2']));_0x619377[_0x1021('0x2a')](_0x3c9f2c,_0x47ea87),this[_0x1021('0x14d')](_0x619377);}}},Game_Action[_0x1021('0x1a9')]['applyBuffTurnManipulationEffects']=function(_0x2e0e17){const _0x598cb9=[_0x1021('0xbe'),'MAXMP',_0x1021('0x100'),_0x1021('0x2a5'),_0x1021('0x23c'),_0x1021('0xcd'),_0x1021('0x281'),_0x1021('0x29')],_0x503290=this[_0x1021('0xb8')]()[_0x1021('0xf2')],_0x170c81=_0x503290[_0x1021('0x14e')](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x170c81)for(const _0x19e19e of _0x170c81){_0x19e19e[_0x1021('0x14e')](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0xce88b1=_0x598cb9[_0x1021('0x9d')](String(RegExp['$1'])['toUpperCase']()),_0x24ba40=Number(RegExp['$2']);if(_0xce88b1>=0x0){if(_0x1021('0x99')===_0x1021('0x20b')){function _0x99b021(){for(const _0x56edaa of _0x4bcf7a){_0x56edaa[_0x1021('0x14e')](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x1c3735=_0x2f75f5[_0x1021('0x9d')](_0x339cad(_0x17426e['$1'])[_0x1021('0xfb')]()),_0x298a3b=_0x12c876(_0x404c1b['$2']);_0x1c3735>=0x0&&(_0x26bf7f[_0x1021('0xc7')](_0x1c3735,_0x298a3b),this[_0x1021('0x14d')](_0x584af2));}}}else _0x2e0e17[_0x1021('0x59')](_0xce88b1,_0x24ba40),this['makeSuccess'](_0x2e0e17);}}const _0x477d99=_0x503290[_0x1021('0x14e')](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x477d99){if(_0x1021('0xda')===_0x1021('0xda'))for(const _0x6a98de of _0x170c81){if(_0x1021('0xe6')!==_0x1021('0xe6')){function _0x2dd03f(){return this['_costSettings'][_0x1021('0x102')]['call'](this[_0x1021('0x7c')]);}}else{_0x6a98de[_0x1021('0x14e')](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x1e5a0e=_0x598cb9[_0x1021('0x9d')](String(RegExp['$1'])['toUpperCase']()),_0x336812=Number(RegExp['$2']);_0x1e5a0e>=0x0&&(_0x2e0e17[_0x1021('0xc7')](_0x1e5a0e,_0x336812),this[_0x1021('0x14d')](_0x2e0e17));}}else{function _0x363aa8(){if(!this[_0x1021('0x12e')](_0x336366))return![];if(!this[_0x1021('0x24b')](_0x3f6986))return![];if(!this[_0x1021('0x155')](_0x577f52))return![];return!![];}}}},Game_Action['prototype'][_0x1021('0x221')]=function(_0x251215){const _0x4a3d8a=['MAXHP',_0x1021('0xb4'),'ATK',_0x1021('0x2a5'),_0x1021('0x23c'),_0x1021('0xcd'),_0x1021('0x281'),_0x1021('0x29')],_0x29725d=this[_0x1021('0xb8')]()[_0x1021('0xf2')],_0x4f31bc=_0x29725d['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x4f31bc){if('gIzNq'!=='gIzNq'){function _0x5c53c0(){for(const _0x18847d of _0x4ed326){let _0x3e1cdc=0x0,_0x41c12e=0x0;if(_0x18847d[_0x1021('0x14e')](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x3e1cdc=_0x2d5a5a(_0xcb8ea6['$1']),_0x41c12e=_0x5a0e7d(_0x1ad639['$2']);else _0x18847d[_0x1021('0x14e')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x3e1cdc=_0x4b57ea[_0x1021('0x26d')](_0x2e75f8['$1']),_0x41c12e=_0x54fbf2(_0x3bc095['$2']));_0xbd7132[_0x1021('0x2a')](_0x3e1cdc,_0x41c12e),this[_0x1021('0x14d')](_0x3ccd76);}}}else for(const _0x3c61ee of _0x4f31bc){_0x3c61ee['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0xa622ba=_0x4a3d8a[_0x1021('0x9d')](String(RegExp['$1'])[_0x1021('0xfb')]()),_0x12a354=Number(RegExp['$2']);if(_0xa622ba>=0x0){if(_0x1021('0x14a')===_0x1021('0x46')){function _0x3b8c9f(){_0x38d6de[_0x1021('0x29f')][_0x1021('0x2c')][_0x1021('0x28f')](this,_0x367952);if(!this[_0x1021('0x177')](_0x182b80))this[_0x1021('0xca')](_0x5b0133);}}else _0x251215[_0x1021('0x8c')](_0xa622ba,_0x12a354),this[_0x1021('0x14d')](_0x251215);}}}const _0x44fc04=_0x29725d[_0x1021('0x14e')](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x44fc04)for(const _0x348fff of _0x4f31bc){_0x348fff[_0x1021('0x14e')](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x388195=_0x4a3d8a[_0x1021('0x9d')](String(RegExp['$1'])[_0x1021('0xfb')]()),_0x412dc7=Number(RegExp['$2']);if(_0x388195>=0x0){if(_0x1021('0x13c')!=='GcPnz'){function _0x58719a(){const _0x7d529a=_0x2beb3d[_0x1021('0x22')]('['+_0xc3b7b3['$1']['match'](/\d+/g)+']');for(const _0x3531c7 of _0x7d529a){if(!_0x19142d[_0x1021('0x2d')](_0x3531c7))return![];}return!![];}}else _0x251215[_0x1021('0xe1')](_0x388195,_0x412dc7),this[_0x1021('0x14d')](_0x251215);}}},VisuMZ[_0x1021('0x29f')][_0x1021('0x136')]=Game_BattlerBase['prototype'][_0x1021('0x1e0')],Game_BattlerBase['prototype'][_0x1021('0x1e0')]=function(){this[_0x1021('0x14c')]={},this[_0x1021('0x141')](),VisuMZ[_0x1021('0x29f')]['Game_BattlerBase_initMembers'][_0x1021('0x28f')](this);},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x141')]=function(){this[_0x1021('0x131')]='',this[_0x1021('0x5c')]={},this['_stateDisplay']={},this[_0x1021('0x2b1')]={};},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x1f9')]=function(_0x50c90c){return this[_0x1021('0x14c')]=this[_0x1021('0x14c')]||{},this['_cache'][_0x50c90c]!==undefined;},VisuMZ[_0x1021('0x29f')][_0x1021('0x1a7')]=Game_BattlerBase['prototype']['refresh'],Game_BattlerBase[_0x1021('0x1a9')]['refresh']=function(){this['_cache']={},VisuMZ[_0x1021('0x29f')][_0x1021('0x1a7')]['call'](this);},VisuMZ[_0x1021('0x29f')][_0x1021('0x267')]=Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x62')],Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x62')]=function(_0x19b07b){VisuMZ[_0x1021('0x29f')][_0x1021('0x267')][_0x1021('0x28f')](this,_0x19b07b),this[_0x1021('0x24e')](_0x19b07b);},Game_BattlerBase[_0x1021('0x1a9')]['onRemoveState']=function(_0x4d6912){this['clearStateData'](_0x4d6912),this[_0x1021('0x25d')](_0x4d6912),this[_0x1021('0x40')](_0x4d6912);},VisuMZ[_0x1021('0x29f')][_0x1021('0x23a')]=Game_BattlerBase[_0x1021('0x1a9')]['resetStateCounts'],Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x19b')]=function(_0x41f2b5){const _0x2feb75=$dataStates[_0x41f2b5],_0x17d033=this[_0x1021('0x1db')](_0x41f2b5),_0x3f8a1b=this['getStateReapplyRulings'](_0x2feb75)[_0x1021('0x24d')]()['trim']();switch(_0x3f8a1b){case'ignore':if(_0x17d033<=0x0)VisuMZ[_0x1021('0x29f')][_0x1021('0x23a')][_0x1021('0x28f')](this,_0x41f2b5);break;case'reset':VisuMZ[_0x1021('0x29f')][_0x1021('0x23a')][_0x1021('0x28f')](this,_0x41f2b5);break;case _0x1021('0x19'):VisuMZ[_0x1021('0x29f')]['Game_BattlerBase_resetStateCounts']['call'](this,_0x41f2b5),this[_0x1021('0x12f')][_0x41f2b5]=Math[_0x1021('0x1eb')](this[_0x1021('0x12f')][_0x41f2b5],_0x17d033);break;case _0x1021('0x270'):VisuMZ[_0x1021('0x29f')][_0x1021('0x23a')][_0x1021('0x28f')](this,_0x41f2b5),this[_0x1021('0x12f')][_0x41f2b5]+=_0x17d033;break;default:VisuMZ[_0x1021('0x29f')][_0x1021('0x23a')]['call'](this,_0x41f2b5);break;}},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x2aa')]=function(_0x923304){const _0x4623d2=_0x923304['note'];return _0x4623d2['match'](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x171')][_0x1021('0xef')];},VisuMZ[_0x1021('0x29f')][_0x1021('0x1ca')]=Game_BattlerBase['prototype'][_0x1021('0x2b8')],Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x2b8')]=function(_0x5cc3be,_0x189846){const _0x4c56e6=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0xef')],_0x57ebe7=this[_0x1021('0x1bd')](_0x5cc3be);switch(_0x4c56e6){case _0x1021('0x35'):if(_0x57ebe7<=0x0)this[_0x1021('0x80')][_0x5cc3be]=_0x189846;break;case _0x1021('0x18b'):this[_0x1021('0x80')][_0x5cc3be]=_0x189846;break;case _0x1021('0x19'):this[_0x1021('0x80')][_0x5cc3be]=Math['max'](_0x57ebe7,_0x189846);break;case _0x1021('0x270'):this['_buffTurns'][_0x5cc3be]+=_0x189846;break;default:VisuMZ[_0x1021('0x29f')][_0x1021('0x1ca')][_0x1021('0x28f')](this,_0x5cc3be,_0x189846);break;}const _0xc27e31=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0x84')];this['_buffTurns'][_0x5cc3be]=this[_0x1021('0x80')][_0x5cc3be][_0x1021('0x223')](0x0,_0xc27e31);},Game_BattlerBase[_0x1021('0x1a9')]['isGroupDefeatStateAffected']=function(){if(this[_0x1021('0x14c')]['groupDefeat']!==undefined)return this[_0x1021('0x14c')][_0x1021('0x29c')];this[_0x1021('0x14c')][_0x1021('0x29c')]=![];const _0x1feed3=this[_0x1021('0x70')]();for(const _0x24696b of _0x1feed3){if(_0x1021('0x1fd')===_0x1021('0x1fd')){if(!_0x24696b)continue;if(_0x24696b['note']['match'](/<GROUP DEFEAT>/i)){this[_0x1021('0x14c')]['groupDefeat']=!![];break;}}else{function _0x40c7c5(){_0x1bda05[_0x1021('0x29f')][_0x1021('0xd4')]['Buffs'][_0x1021('0x2b0')][_0x1021('0x28f')](this,_0x20d292);}}}return this[_0x1021('0x14c')]['groupDefeat'];},VisuMZ[_0x1021('0x29f')][_0x1021('0x1a0')]=Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x53')],Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x53')]=function(){this[_0x1021('0x196')]()!==''?this[_0x1021('0x2b6')]():(VisuMZ['SkillsStatesCore'][_0x1021('0x1a0')][_0x1021('0x28f')](this),this[_0x1021('0x141')]());},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x2b6')]=function(){const _0x506dd2=this[_0x1021('0x70')]();for(const _0x57ae2d of _0x506dd2){if(_0x1021('0x44')===_0x1021('0x44')){if(_0x57ae2d&&this[_0x1021('0x104')](_0x57ae2d))this[_0x1021('0x62')](_0x57ae2d['id']);}else{function _0x195e01(){_0x4c688a[_0x1021('0x29f')][_0x1021('0xd4')]['States'][_0x1021('0x291')][_0x1021('0x28f')](this,_0x2560aa);}}}this[_0x1021('0x14c')]={};},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x104')]=function(_0x3106fd){const _0x2e87a4=this[_0x1021('0x196')]();if(_0x2e87a4!==''){if(_0x1021('0xfa')===_0x1021('0xfa')){const _0x4f010c=_0x3106fd[_0x1021('0xf2')];if(_0x2e87a4===_0x1021('0x109')&&_0x4f010c['match'](/<NO DEATH CLEAR>/i))return![];if(_0x2e87a4==='recover\x20all'&&_0x4f010c[_0x1021('0x14e')](/<NO RECOVER ALL CLEAR>/i))return![];}else{function _0x131559(){_0x130e8b[_0x1021('0x1a9')][_0x1021('0x299')][_0x1021('0x28f')](this);const _0x577635=_0x2c021e[_0x1021('0x29f')]['Settings'][_0x1021('0x138')][_0x1021('0x1ad')];this[_0x1021('0x14c')][_0x1021('0x244')]=this[_0x1021('0x14c')][_0x1021('0x244')][_0x1021('0x297')](_0x577635);}}}return this[_0x1021('0x1a1')](_0x3106fd['id']);},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x196')]=function(){return this[_0x1021('0x131')];},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x92')]=function(_0x5eadbf){this[_0x1021('0x131')]=_0x5eadbf;},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x24c')]=function(){this[_0x1021('0x131')]='';},VisuMZ[_0x1021('0x29f')][_0x1021('0x16c')]=Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x18a')],Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x18a')]=function(){this[_0x1021('0x92')](_0x1021('0x109')),VisuMZ[_0x1021('0x29f')][_0x1021('0x16c')][_0x1021('0x28f')](this),this[_0x1021('0x24c')]();},VisuMZ[_0x1021('0x29f')][_0x1021('0x225')]=Game_BattlerBase['prototype'][_0x1021('0x21c')],Game_BattlerBase['prototype'][_0x1021('0x21c')]=function(){this[_0x1021('0x92')](_0x1021('0x157')),VisuMZ[_0x1021('0x29f')]['Game_BattlerBase_recoverAll'][_0x1021('0x28f')](this),this[_0x1021('0x24c')]();},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x113')]=function(_0x2f778c){for(settings of VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x7d')]){if(_0x1021('0x2be')!=='uEsku'){function _0x236a60(){if(_0x311fb9[_0x1021('0x2d')](_0x5799ca))return!![];}}else{const _0x5173f2=settings[_0x1021('0x29a')][_0x1021('0x28f')](this,_0x2f778c);if(!settings[_0x1021('0xde')][_0x1021('0x28f')](this,_0x2f778c,_0x5173f2))return![];}}return!![];},Game_BattlerBase[_0x1021('0x1a9')]['paySkillCost']=function(_0x4bed7f){for(settings of VisuMZ[_0x1021('0x29f')]['Settings'][_0x1021('0x7d')]){const _0x25f750=settings[_0x1021('0x29a')][_0x1021('0x28f')](this,_0x4bed7f);settings[_0x1021('0x48')][_0x1021('0x28f')](this,_0x4bed7f,_0x25f750);}},VisuMZ[_0x1021('0x29f')]['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x145')],Game_BattlerBase['prototype'][_0x1021('0x145')]=function(_0x460c3b){if(!_0x460c3b)return![];if(!VisuMZ[_0x1021('0x29f')][_0x1021('0x1df')][_0x1021('0x28f')](this,_0x460c3b))return![];if(!this[_0x1021('0x1b')](_0x460c3b))return![];if(!this[_0x1021('0x127')](_0x460c3b))return![];if(!this[_0x1021('0x8a')](_0x460c3b))return![];return!![];},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x1b')]=function(_0x47622d){if(!this[_0x1021('0xe9')](_0x47622d))return![];return!![];},Game_BattlerBase['prototype'][_0x1021('0xe9')]=function(_0x2f3ad4){const _0x211760=_0x2f3ad4[_0x1021('0xf2')];if(_0x211760['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xc0c173=JSON['parse']('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x2a34a5 of _0xc0c173){if(_0x1021('0x1ab')===_0x1021('0x1ab')){if(!$gameSwitches[_0x1021('0x2d')](_0x2a34a5))return![];}else{function _0x28abf5(){const _0x5aaf61=_0x52a57c(_0x594edb['$1']),_0x38a39a=_0x526b05[_0x1021('0x4b')](_0x5aaf61,_0x1021('0x38'),-0x1,'slipHp');_0x4f954e[_0x1021('0x29f')][_0x1021('0x18f')][_0x5468e7['id']]=new _0x227394('stateId',_0x38a39a);}}}return!![];}if(_0x211760[_0x1021('0x14e')](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x331437=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x2f0c58 of _0x331437){if(_0x1021('0x1e7')!=='ihzKY'){function _0x4c7a94(){_0x2d74fb[_0x1021('0x29f')][_0x1021('0xd4')]['Buffs'][_0x1021('0xb')][_0x1021('0x28f')](this,_0x423427);}}else{if(!$gameSwitches['value'](_0x2f0c58))return![];}}return!![];}if(_0x211760[_0x1021('0x14e')](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1546d9=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x150fe2 of _0x1546d9){if('rWbAr'!==_0x1021('0xf9')){if($gameSwitches['value'](_0x150fe2))return!![];}else{function _0x1d80fb(){_0x5031b0[_0x1021('0x29f')]['Sprite_Gauge_initMembers'][_0x1021('0x28f')](this),this['_costSettings']=null;}}}return![];}if(_0x211760[_0x1021('0x14e')](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x169b05=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x182673 of _0x169b05){if(!$gameSwitches[_0x1021('0x2d')](_0x182673))return!![];}return![];}if(_0x211760[_0x1021('0x14e')](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1482f5=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x13a98c of _0x1482f5){if(!$gameSwitches['value'](_0x13a98c))return!![];}return![];}if(_0x211760[_0x1021('0x14e')](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x118626=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x568d62 of _0x118626){if($gameSwitches['value'](_0x568d62))return![];}return!![];}return!![];},Game_BattlerBase['prototype'][_0x1021('0x127')]=function(_0x11c37e){const _0x528ea2=_0x11c37e[_0x1021('0xf2')],_0x3646bb=VisuMZ['SkillsStatesCore'][_0x1021('0x58')];if(_0x3646bb[_0x11c37e['id']]){if(_0x1021('0x204')===_0x1021('0x18d')){function _0x3f6e5e(){this[_0x1021('0x2c3')]=null;}}else return _0x3646bb[_0x11c37e['id']][_0x1021('0x28f')](this,_0x11c37e);}else return!![];},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x8a')]=function(_0x2daa2f){return VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x176')][_0x1021('0xf7')][_0x1021('0x28f')](this,_0x2daa2f);},VisuMZ[_0x1021('0x29f')]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x8')],Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x8')]=function(_0x3e48ac){for(settings of VisuMZ['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x7d')]){if(settings[_0x1021('0x143')]['toUpperCase']()==='MP'){if(_0x1021('0x21')===_0x1021('0x276')){function _0x37dcea(){if(!_0x15787d[_0x1021('0x275')]())return![];}}else return settings[_0x1021('0x29a')][_0x1021('0x28f')](this,_0x3e48ac);}}return VisuMZ[_0x1021('0x29f')]['Game_BattlerBase_skillMpCost'][_0x1021('0x28f')](this,_0x3e48ac);},VisuMZ[_0x1021('0x29f')][_0x1021('0x1e')]=Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x1d5')],Game_BattlerBase['prototype'][_0x1021('0x1d5')]=function(_0xf2959){for(settings of VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x7d')]){if(settings[_0x1021('0x143')][_0x1021('0xfb')]()==='TP'){if(_0x1021('0x1d3')==='qyZiF')return settings[_0x1021('0x29a')]['call'](this,_0xf2959);else{function _0x3d9b36(){if(!_0x4d6958[_0x1021('0x2d')](_0x2bc7f1))return![];}}}}return VisuMZ[_0x1021('0x29f')][_0x1021('0x1e')][_0x1021('0x28f')](this,_0xf2959);},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x147')]=function(_0x2e38f1){if(typeof _0x2e38f1===_0x1021('0x6e'))_0x2e38f1=$dataStates[_0x2e38f1];return this[_0x1021('0x70')]()[_0x1021('0x17c')](_0x2e38f1);},VisuMZ[_0x1021('0x29f')]['Game_BattlerBase_states']=Game_BattlerBase['prototype'][_0x1021('0x70')],Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x70')]=function(){let _0x4b2f6d=VisuMZ[_0x1021('0x29f')][_0x1021('0x10f')][_0x1021('0x28f')](this);return this[_0x1021('0x79')](_0x4b2f6d),_0x4b2f6d;},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x79')]=function(_0x14568b){const _0x189b8a=this[_0x1021('0x244')]();for(state of _0x189b8a){if(!state)continue;if(!this[_0x1021('0x28')](state)&&_0x14568b[_0x1021('0x17c')](state))continue;_0x14568b[_0x1021('0xa3')](state);}if(_0x189b8a[_0x1021('0x14f')]>0x0){if(_0x1021('0xf3')==='rvTDS')_0x14568b[_0x1021('0x1ac')]((_0x240488,_0x4eef2c)=>{if(_0x1021('0x218')===_0x1021('0x218')){const _0x38197b=_0x240488[_0x1021('0xc5')],_0x6df93=_0x4eef2c[_0x1021('0xc5')];if(_0x38197b!==_0x6df93)return _0x6df93-_0x38197b;return _0x240488-_0x4eef2c;}else{function _0x440665(){return _0xe0214a['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x171')][_0x1021('0x43')];}}});else{function _0x59f43a(){return this[_0x1021('0x7c')]&&this[_0x1021('0x2c3')]?this[_0x1021('0x298')]():_0x85e5e[_0x1021('0x29f')]['Sprite_Gauge_currentMaxValue'][_0x1021('0x28f')](this);}}}},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x28')]=function(_0xff8205){return _0xff8205[_0x1021('0xf2')][_0x1021('0x14e')](/<PASSIVE STACKABLE>/i);},Game_BattlerBase['prototype'][_0x1021('0x178')]=function(){const _0x227090=[];for(const _0x5aba0d of this[_0x1021('0x14c')][_0x1021('0x244')]){const _0x2d56cb=$dataStates[_0x5aba0d];if(!_0x2d56cb)continue;if(!this[_0x1021('0x15c')](_0x2d56cb))continue;_0x227090[_0x1021('0xa3')](_0x2d56cb);}return _0x227090;},Game_BattlerBase[_0x1021('0x1a9')]['meetsPassiveStateConditions']=function(_0x4e80f5){if(!this[_0x1021('0x206')](_0x4e80f5))return![];if(!this[_0x1021('0x134')](_0x4e80f5))return![];if(!this[_0x1021('0x8d')](_0x4e80f5))return![];return!![];},Game_BattlerBase['prototype']['meetsPassiveStateConditionSwitches']=function(_0x2b954f){const _0xc2983d=_0x2b954f[_0x1021('0xf2')];if(_0xc2983d[_0x1021('0x14e')](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x44b78e=JSON['parse']('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x14bdbf of _0x44b78e){if(!$gameSwitches[_0x1021('0x2d')](_0x14bdbf))return![];}return!![];}if(_0xc2983d[_0x1021('0x14e')](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1021('0x71')===_0x1021('0x71')){const _0x3d223b=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x23c241 of _0x3d223b){if(!$gameSwitches[_0x1021('0x2d')](_0x23c241))return![];}return!![];}else{function _0x216ff(){_0x48e56f=_0x185d2f,_0x2057de+=_0x308826;}}}if(_0xc2983d[_0x1021('0x14e')](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1021('0x10c')===_0x1021('0x15d')){function _0x3d7dae(){const _0x4d2431=_0xae5be4(_0x1e4aaa['$1']),_0x3bbb5d=_0x863cf0[_0x1021('0x4b')](_0x4d2431,_0x1021('0x2bc'),0x1,'slipTp');_0x5f04fb[_0x1021('0x29f')]['stateTpSlipHealJS'][_0x2948a7['id']]=new _0x32881a(_0x1021('0x20a'),_0x3bbb5d);}}else{const _0x19beeb=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x236c3e of _0x19beeb){if($gameSwitches['value'](_0x236c3e))return!![];}return![];}}if(_0xc2983d[_0x1021('0x14e')](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4a084f=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x428be6 of _0x4a084f){if(_0x1021('0x167')!==_0x1021('0x167')){function _0x5a32b4(){if(!this[_0x1021('0x206')](_0x45136e))return![];if(!this[_0x1021('0x134')](_0x27233c))return![];if(!this[_0x1021('0x8d')](_0x2840d8))return![];return!![];}}else{if(!$gameSwitches[_0x1021('0x2d')](_0x428be6))return!![];}}return![];}if(_0xc2983d[_0x1021('0x14e')](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1021('0x75')!==_0x1021('0x75')){function _0x2bf21a(){_0x1f767e[_0x1021('0x14e')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x50c944=_0x1b0470(_0x4e464d['$1'])[_0x1021('0xfb')]()[_0x1021('0x1d')]()['split'](',');for(const _0x2872e3 of _0x50c944){_0x3d6c68[_0x1021('0x6d')][_0x1021('0xa3')](_0x2872e3[_0x1021('0x1d')]());}}}else{const _0x55df96=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x2babae of _0x55df96){if(!$gameSwitches[_0x1021('0x2d')](_0x2babae))return!![];}return![];}}if(_0xc2983d[_0x1021('0x14e')](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20f164=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x2f1916 of _0x20f164){if(_0x1021('0x254')===_0x1021('0x285')){function _0x1fd9e5(){if(!_0x13926d['value'](_0x2f88f9))return![];}}else{if($gameSwitches[_0x1021('0x2d')](_0x2f1916))return![];}}return!![];}return!![];},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x134')]=function(_0x59c46d){const _0x44f622=VisuMZ[_0x1021('0x29f')][_0x1021('0x257')];if(_0x44f622[_0x59c46d['id']]&&!_0x44f622[_0x59c46d['id']][_0x1021('0x28f')](this,_0x59c46d))return![];return!![];},Game_BattlerBase[_0x1021('0x1a9')]['meetsPassiveStateGlobalConditionJS']=function(_0x37e97c){return VisuMZ[_0x1021('0x29f')]['Settings'][_0x1021('0x138')][_0x1021('0x189')][_0x1021('0x28f')](this,_0x37e97c);},Game_BattlerBase['prototype'][_0x1021('0x244')]=function(){if(this[_0x1021('0x1f9')](_0x1021('0x244')))return this[_0x1021('0x178')]();return this[_0x1021('0x14c')][_0x1021('0x244')]=[],this[_0x1021('0x18e')](),this[_0x1021('0xf5')](),this['addPassiveStatesByPluginParameters'](),this[_0x1021('0x178')]();},Game_BattlerBase['prototype'][_0x1021('0x18e')]=function(){if(Imported[_0x1021('0x152')])this[_0x1021('0x1')]();},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x98')]=function(){return[];},Game_BattlerBase[_0x1021('0x1a9')]['addPassiveStatesByNotetag']=function(){const _0x538023=this['passiveStateObjects']();for(const _0x42aaf2 of _0x538023){if(_0x1021('0x9f')!==_0x1021('0x33')){if(!_0x42aaf2)continue;const _0x1154ff=_0x42aaf2[_0x1021('0xf2')]['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x1154ff)for(const _0xa24cb1 of _0x1154ff){_0xa24cb1[_0x1021('0x14e')](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x12e2fe=RegExp['$1'];if(_0x12e2fe[_0x1021('0x14e')](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x18f2f5=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');this[_0x1021('0x14c')][_0x1021('0x244')]=this[_0x1021('0x14c')]['passiveStates'][_0x1021('0x297')](_0x18f2f5);}else{if(_0x1021('0x10b')===_0x1021('0x10b')){const _0x4dd791=_0x12e2fe[_0x1021('0x30')](',');for(const _0x2a08af of _0x4dd791){if(_0x1021('0x28a')===_0x1021('0x28a')){const _0x5d7890=DataManager[_0x1021('0x26d')](_0x2a08af);if(_0x5d7890)this['_cache'][_0x1021('0x244')][_0x1021('0xa3')](_0x5d7890);}else{function _0x363ac7(){return _0x49ea32[_0x1021('0x29f')]['Window_SkillList_maxCols'][_0x1021('0x28f')](this);}}}}else{function _0x1fc638(){if(_0x509a43[_0x1021('0x2d')](_0x196159))return![];}}}}}else{function _0x4b8442(){this[_0x1021('0x131')]='';}}}},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x299')]=function(){const _0x1d7e61=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')]['PassiveStates'][_0x1021('0xe4')];this['_cache']['passiveStates']=this[_0x1021('0x14c')]['passiveStates'][_0x1021('0x297')](_0x1d7e61);},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x1db')]=function(_0x3829ad){if(typeof _0x3829ad!==_0x1021('0x6e'))_0x3829ad=_0x3829ad['id'];return this[_0x1021('0x12f')][_0x3829ad]||0x0;},Game_BattlerBase['prototype'][_0x1021('0x25a')]=function(_0x383641,_0x548d93){if(typeof _0x383641!==_0x1021('0x6e'))_0x383641=_0x383641['id'];if(this[_0x1021('0x1a1')](_0x383641)){if(_0x1021('0x9')==='NzDDr'){function _0x1e833a(){const _0x491ad1=this[_0x1021('0x64')](_0x2afc5d);this[_0x1021('0x249')](_0x491ad1,_0x1021('0x65'),!![],_0x32f5bc);}}else{const _0x595bb1=DataManager['stateMaximumTurns'](_0x383641);this['_stateTurns'][_0x383641]=_0x548d93[_0x1021('0x223')](0x0,_0x595bb1);if(this[_0x1021('0x12f')][_0x383641]<=0x0)this[_0x1021('0x4')](_0x383641);}}},Game_BattlerBase['prototype'][_0x1021('0x2a')]=function(_0x193aa9,_0x501211){if(typeof _0x193aa9!=='number')_0x193aa9=_0x193aa9['id'];if(this[_0x1021('0x1a1')](_0x193aa9)){if(_0x1021('0x130')===_0x1021('0x130'))_0x501211+=this[_0x1021('0x1db')](_0x193aa9),this[_0x1021('0x25a')](_0x193aa9,_0x501211);else{function _0x437031(){_0x316176[_0x1021('0x29f')]['Sprite_StateIcon_loadBitmap'][_0x1021('0x28f')](this),this[_0x1021('0x1c5')]();}}}},VisuMZ[_0x1021('0x29f')][_0x1021('0x2e')]=Game_BattlerBase['prototype'][_0x1021('0xca')],Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0xca')]=function(_0x234bd3){const _0x1bda11=this[_0x1021('0x12d')][_0x234bd3];VisuMZ[_0x1021('0x29f')]['Game_BattlerBase_eraseBuff'][_0x1021('0x28f')](this,_0x234bd3);if(_0x1bda11>0x0)this[_0x1021('0x1d4')](_0x234bd3);if(_0x1bda11<0x0)this[_0x1021('0xd2')](_0x234bd3);},VisuMZ[_0x1021('0x29f')][_0x1021('0x2c')]=Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x4f')],Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x4f')]=function(_0x2ee3ed){VisuMZ[_0x1021('0x29f')]['Game_BattlerBase_increaseBuff'][_0x1021('0x28f')](this,_0x2ee3ed);if(!this[_0x1021('0x177')](_0x2ee3ed))this[_0x1021('0xca')](_0x2ee3ed);},VisuMZ[_0x1021('0x29f')][_0x1021('0x187')]=Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x271')],Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x271')]=function(_0x5ec752){VisuMZ[_0x1021('0x29f')][_0x1021('0x187')]['call'](this,_0x5ec752);if(!this[_0x1021('0x177')](_0x5ec752))this['eraseBuff'](_0x5ec752);},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x1d4')]=function(_0x2a5080){},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0xd2')]=function(_0x47c4fa){},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x2bf')]=function(_0x4b1889){return this['_buffs'][_0x4b1889]===VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0x241')];},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x7b')]=function(_0x1ed649){return this['_buffs'][_0x1ed649]===-VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0x108')];},VisuMZ[_0x1021('0x29f')][_0x1021('0x246')]=Game_BattlerBase[_0x1021('0x1a9')]['buffIconIndex'],Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x150')]=function(_0x445744,_0x3c4675){return _0x445744=_0x445744[_0x1021('0x223')](-0x2,0x2),VisuMZ[_0x1021('0x29f')][_0x1021('0x246')]['call'](this,_0x445744,_0x3c4675);},Game_BattlerBase['prototype']['paramBuffRate']=function(_0xda7c1d){const _0x5e695b=this['_buffs'][_0xda7c1d];return VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0x4a')]['call'](this,_0xda7c1d,_0x5e695b);},Game_BattlerBase[_0x1021('0x1a9')]['buffTurns']=function(_0x41fa2e){return this[_0x1021('0x80')][_0x41fa2e]||0x0;},Game_BattlerBase['prototype'][_0x1021('0x19d')]=function(_0x1a6170){return this[_0x1021('0x1bd')](_0x1a6170);},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x59')]=function(_0x36c872,_0xb021c){if(this[_0x1021('0x28d')](_0x36c872)){const _0x11206c=VisuMZ['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x1c2')]['MaxTurns'];this['_buffTurns'][_0x36c872]=_0xb021c[_0x1021('0x223')](0x0,_0x11206c);}},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0xc7')]=function(_0x364fdd,_0x48fc84){if(this[_0x1021('0x28d')](_0x364fdd)){if('XuTmX'!=='XuTmX'){function _0x546dca(){if(typeof _0x1e6b61!=='number')_0x6bac61=_0x56809f['id'];return this[_0x1021('0x2ba')]=this[_0x1021('0x2ba')]||{},this[_0x1021('0x2ba')][_0x4bd68a]===_0x4037aa&&(this['_stateDisplay'][_0xb7065b]=''),this[_0x1021('0x2ba')][_0x23c1d6];}}else _0x48fc84+=this[_0x1021('0x1bd')](stateId),this[_0x1021('0x25a')](_0x364fdd,_0x48fc84);}},Game_BattlerBase['prototype'][_0x1021('0x8c')]=function(_0x15c19a,_0x29ab37){if(this[_0x1021('0x8f')](_0x15c19a)){if(_0x1021('0x24f')!==_0x1021('0x205')){const _0x1782a3=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')]['MaxTurns'];this['_buffTurns'][_0x15c19a]=_0x29ab37[_0x1021('0x223')](0x0,_0x1782a3);}else{function _0x4c82bc(){if(typeof _0xb01327!==_0x1021('0x6e'))_0x51c39d=_0x44c47e['id'];return this['_stateTurns'][_0x3d1f93]||0x0;}}}},Game_BattlerBase[_0x1021('0x1a9')]['addDebuffTurns']=function(_0x3b5db6,_0x43250f){this['isDebuffAffected'](_0x3b5db6)&&(_0x43250f+=this['buffTurns'](stateId),this['setStateTurns'](_0x3b5db6,_0x43250f));},Game_BattlerBase[_0x1021('0x1a9')]['stateData']=function(_0x5ec3e2){if(typeof _0x5ec3e2!==_0x1021('0x6e'))_0x5ec3e2=_0x5ec3e2['id'];return this[_0x1021('0x5c')]=this[_0x1021('0x5c')]||{},this[_0x1021('0x5c')][_0x5ec3e2]=this['_stateData'][_0x5ec3e2]||{},this['_stateData'][_0x5ec3e2];},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x163')]=function(_0x457e61,_0x46a807){if(typeof _0x457e61!==_0x1021('0x6e'))_0x457e61=_0x457e61['id'];const _0x1df711=this[_0x1021('0xc6')](_0x457e61);return _0x1df711[_0x46a807];},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x21a')]=function(_0x2bee0d,_0x21dd0a,_0x4cedc3){if(typeof _0x2bee0d!==_0x1021('0x6e'))_0x2bee0d=_0x2bee0d['id'];const _0x4efea5=this[_0x1021('0xc6')](_0x2bee0d);_0x4efea5[_0x21dd0a]=_0x4cedc3;},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x144')]=function(_0x45cf45){if(typeof _0x45cf45!==_0x1021('0x6e'))_0x45cf45=_0x45cf45['id'];this[_0x1021('0x5c')]=this[_0x1021('0x5c')]||{},this[_0x1021('0x5c')][_0x45cf45]={};},Game_BattlerBase[_0x1021('0x1a9')]['getStateDisplay']=function(_0x144928){if(typeof _0x144928!==_0x1021('0x6e'))_0x144928=_0x144928['id'];this['_stateDisplay']=this[_0x1021('0x2ba')]||{};if(this[_0x1021('0x2ba')][_0x144928]===undefined){if(_0x1021('0x195')!==_0x1021('0x21e'))this[_0x1021('0x2ba')][_0x144928]='';else{function _0x2fb7a0(){_0x1ee579['SkillsStatesCore'][_0x1021('0x81')][_0x1021('0x28f')](this,_0x20d16c,_0x43c33f),this['isBuffAffected'](_0x5cc7e3)&&this['onAddBuff'](_0x357bbb,_0x45b471);}}}return this[_0x1021('0x2ba')][_0x144928];},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x173')]=function(_0x389f2b,_0x255437){if(typeof _0x389f2b!=='number')_0x389f2b=_0x389f2b['id'];this[_0x1021('0x2ba')]=this[_0x1021('0x2ba')]||{},this[_0x1021('0x2ba')][_0x389f2b]=_0x255437;},Game_BattlerBase[_0x1021('0x1a9')]['clearStateDisplay']=function(_0x5165d8){if(typeof _0x5165d8!==_0x1021('0x6e'))_0x5165d8=_0x5165d8['id'];this[_0x1021('0x2ba')]=this[_0x1021('0x2ba')]||{},this[_0x1021('0x2ba')][_0x5165d8]='';},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x2c2')]=function(_0x100708){if(typeof _0x100708!==_0x1021('0x6e'))_0x100708=_0x100708['id'];this[_0x1021('0x2b1')]=this['_stateOrigin']||{},this[_0x1021('0x2b1')][_0x100708]=this[_0x1021('0x2b1')][_0x100708]||'user';const _0x35ca07=this['_stateOrigin'][_0x100708];return this['getStateOriginByKey'](_0x35ca07);},Game_BattlerBase[_0x1021('0x1a9')]['setStateOrigin']=function(_0x1963ab,_0x19abce){this[_0x1021('0x2b1')]=this[_0x1021('0x2b1')]||{};const _0x2833cc=_0x19abce?this[_0x1021('0x13e')](_0x19abce):this[_0x1021('0x1b0')]();this[_0x1021('0x2b1')][_0x1963ab]=_0x2833cc;},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x40')]=function(_0x40fe1d){this['_stateOrigin']=this[_0x1021('0x2b1')]||{},delete this['_stateOrigin'][_0x40fe1d];},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x1b0')]=function(){const _0x3208b7=this[_0x1021('0xa9')]();return this[_0x1021('0x13e')](_0x3208b7);},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0xa9')]=function(){if($gameParty['inBattle']()){if(BattleManager[_0x1021('0x3d')])return BattleManager[_0x1021('0x3d')];else{if(BattleManager[_0x1021('0x1f0')])return BattleManager[_0x1021('0x1f0')];}}else{const _0x4d49fc=SceneManager[_0x1021('0x174')];if(![Scene_Map,Scene_Item][_0x1021('0x17c')](_0x4d49fc[_0x1021('0xec')]))return $gameParty[_0x1021('0x239')]();}return this;},Game_BattlerBase['prototype'][_0x1021('0x13e')]=function(_0x4f5441){if(!_0x4f5441)return _0x1021('0x67');if(_0x4f5441[_0x1021('0x1af')]())return _0x1021('0xc9')[_0x1021('0x4b')](_0x4f5441[_0x1021('0x1c0')]());else{const _0x47f851=_0x1021('0x1b3')[_0x1021('0x4b')](_0x4f5441[_0x1021('0x211')]()),_0xbd1917=_0x1021('0x1fc')[_0x1021('0x4b')](_0x4f5441[_0x1021('0x86')]()),_0x733377=_0x1021('0xa4')['format']($gameTroop[_0x1021('0x42')]());return _0x1021('0x1e2')['format'](_0x47f851,_0xbd1917,_0x733377);}return _0x1021('0x67');},Game_BattlerBase['prototype'][_0x1021('0x1de')]=function(_0x477bc2){if(_0x477bc2===_0x1021('0x67'))return this;else{if(_0x477bc2[_0x1021('0x14e')](/<actor-(\d+)>/i))return $gameActors[_0x1021('0x2f')](Number(RegExp['$1']));else{if($gameParty[_0x1021('0x20')]()&&_0x477bc2[_0x1021('0x14e')](/<troop-(\d+)>/i)){const _0x1ed366=Number(RegExp['$1']);if(_0x1ed366===$gameTroop[_0x1021('0x42')]()){if(_0x1021('0x1a8')===_0x1021('0x1a8')){if(_0x477bc2['match'](/<member-(\d+)>/i)){if(_0x1021('0xc0')!==_0x1021('0x128'))return $gameTroop['members']()[Number(RegExp['$1'])];else{function _0x2701fb(){this[_0x1021('0x68')][_0x5472d6]=this[_0x1021('0x162')](_0x45451a(_0x1aab01));}}}}else{function _0x1ae21f(){let _0x1e8fd1=_0x14df6e['SkillsStatesCore'][_0x1021('0x10f')][_0x1021('0x28f')](this);return this['addPassiveStates'](_0x1e8fd1),_0x1e8fd1;}}}}if(_0x477bc2['match'](/<enemy-(\d+)>/i)){if(_0x1021('0x83')!==_0x1021('0x1ec'))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);else{function _0x4e83b5(){return _0x1ea522(_0x2a8c09['$1']);}}}}}return this;},VisuMZ[_0x1021('0x29f')][_0x1021('0x17e')]=Game_Battler[_0x1021('0x1a9')]['addState'],Game_Battler[_0x1021('0x1a9')]['addState']=function(_0x1be118){VisuMZ[_0x1021('0x29f')][_0x1021('0x17e')]['call'](this,_0x1be118);if(this[_0x1021('0x147')]($dataStates[_0x1be118])){if(_0x1021('0x11')===_0x1021('0x11')){this[_0x1021('0x172')](_0x1be118);;}else{function _0x22fff4(){return _0x1c82a4;}}}},Game_Battler[_0x1021('0x1a9')][_0x1021('0x172')]=function(_0x515a56){this['setStateOrigin'](_0x515a56),this[_0x1021('0x87')](_0x515a56),this[_0x1021('0x197')](_0x515a56),this[_0x1021('0x78')](_0x515a56);},Game_Battler[_0x1021('0x1a9')][_0x1021('0x24e')]=function(_0x5786f3){Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x24e')]['call'](this,_0x5786f3),this[_0x1021('0x50')](_0x5786f3),this[_0x1021('0x181')](_0x5786f3);},Game_Battler[_0x1021('0x1a9')]['removeStatesAuto']=function(_0x4ac2dd){for(const _0x43bf49 of this[_0x1021('0x70')]()){this[_0x1021('0x264')](_0x43bf49['id'])&&_0x43bf49[_0x1021('0x6c')]===_0x4ac2dd&&(this[_0x1021('0x4')](_0x43bf49['id']),this[_0x1021('0x29e')](_0x43bf49['id']),this[_0x1021('0x198')](_0x43bf49['id']));}},Game_Battler[_0x1021('0x1a9')]['onExpireState']=function(_0x499446){this['onExpireStateCustomJS'](_0x499446);},Game_Battler[_0x1021('0x1a9')][_0x1021('0x197')]=function(_0x3cb7d6){const _0x5ec295=VisuMZ[_0x1021('0x29f')]['stateAddJS'];if(_0x5ec295[_0x3cb7d6])_0x5ec295[_0x3cb7d6][_0x1021('0x28f')](this,_0x3cb7d6);},Game_Battler[_0x1021('0x1a9')][_0x1021('0x50')]=function(_0x3b9053){const _0x32cf47=VisuMZ[_0x1021('0x29f')][_0x1021('0x76')];if(_0x32cf47[_0x3b9053])_0x32cf47[_0x3b9053]['call'](this,_0x3b9053);},Game_Battler['prototype'][_0x1021('0x66')]=function(_0x5eadf5){const _0x9e1be0=VisuMZ[_0x1021('0x29f')]['stateExpireJS'];if(_0x9e1be0[_0x5eadf5])_0x9e1be0[_0x5eadf5][_0x1021('0x28f')](this,_0x5eadf5);},Game_Battler['prototype'][_0x1021('0x78')]=function(_0x51e38e){try{VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x171')]['onAddStateJS']['call'](this,_0x51e38e);}catch(_0x3499f7){if($gameTemp[_0x1021('0x1fe')]())console[_0x1021('0xe')](_0x3499f7);}},Game_Battler[_0x1021('0x1a9')][_0x1021('0x181')]=function(_0xc4bb54){try{VisuMZ[_0x1021('0x29f')]['Settings']['States'][_0x1021('0x23b')][_0x1021('0x28f')](this,_0xc4bb54);}catch(_0x113c4e){if($gameTemp[_0x1021('0x1fe')]())console[_0x1021('0xe')](_0x113c4e);}},Game_Battler[_0x1021('0x1a9')][_0x1021('0x198')]=function(_0x4dfa2c){try{VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')]['States']['onExpireStateJS']['call'](this,_0x4dfa2c);}catch(_0x403bd4){if(_0x1021('0x1d6')==='iTBxV'){if($gameTemp[_0x1021('0x1fe')]())console[_0x1021('0xe')](_0x403bd4);}else{function _0x48d2ee(){return this[_0x1021('0x12d')][_0x3cbab1]===-_0x304311[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0x108')];}}}},Game_Battler['prototype']['statesByCategory']=function(_0x49c0f4){return _0x49c0f4=_0x49c0f4[_0x1021('0xfb')]()['trim'](),this['states']()[_0x1021('0x1e6')](_0x2e8016=>_0x2e8016[_0x1021('0x6d')]['includes'](_0x49c0f4));},Game_Battler[_0x1021('0x1a9')][_0x1021('0x22c')]=function(_0x73a879,_0x48f675){_0x73a879=_0x73a879[_0x1021('0xfb')]()[_0x1021('0x1d')](),_0x48f675=_0x48f675||0x0;const _0x1981ba=this[_0x1021('0x1f2')](_0x73a879);for(state of _0x1981ba){if(_0x48f675<=0x0)return;this[_0x1021('0x4')](state['id']),this[_0x1021('0x1a6')][_0x1021('0xa0')]=!![],_0x48f675--;}},VisuMZ[_0x1021('0x29f')][_0x1021('0x81')]=Game_Battler[_0x1021('0x1a9')][_0x1021('0xb6')],Game_Battler[_0x1021('0x1a9')]['addBuff']=function(_0x30b3c3,_0x441606){VisuMZ[_0x1021('0x29f')][_0x1021('0x81')][_0x1021('0x28f')](this,_0x30b3c3,_0x441606),this[_0x1021('0x28d')](_0x30b3c3)&&this[_0x1021('0x1cd')](_0x30b3c3,_0x441606);},VisuMZ[_0x1021('0x29f')]['Game_Battler_addDebuff']=Game_Battler[_0x1021('0x1a9')][_0x1021('0x3e')],Game_Battler[_0x1021('0x1a9')][_0x1021('0x3e')]=function(_0xbc4734,_0x5e0ab4){VisuMZ[_0x1021('0x29f')]['Game_Battler_addDebuff'][_0x1021('0x28f')](this,_0xbc4734,_0x5e0ab4);if(this[_0x1021('0x8f')](_0xbc4734)){if(_0x1021('0x4d')!==_0x1021('0x142'))this[_0x1021('0x27d')](_0xbc4734,_0x5e0ab4);else{function _0x26fc04(){return this[_0x1021('0x1bd')](_0x52a815);}}}},Game_Battler[_0x1021('0x1a9')][_0x1021('0xff')]=function(){for(let _0x24a0c5=0x0;_0x24a0c5<this[_0x1021('0x2b7')]();_0x24a0c5++){if(this['isBuffExpired'](_0x24a0c5)){const _0x1b4943=this[_0x1021('0x12d')][_0x24a0c5];this[_0x1021('0x2a8')](_0x24a0c5);if(_0x1b4943>0x0)this[_0x1021('0x21b')](_0x24a0c5);if(_0x1b4943<0x0)this[_0x1021('0x129')](_0x24a0c5);}}},Game_Battler[_0x1021('0x1a9')][_0x1021('0x1cd')]=function(_0x55458f,_0x4f1af7){this[_0x1021('0x16b')](_0x55458f,_0x4f1af7);},Game_Battler['prototype'][_0x1021('0x27d')]=function(_0x519633,_0x5a8626){this[_0x1021('0x222')](_0x519633,_0x5a8626);},Game_Battler[_0x1021('0x1a9')][_0x1021('0x1d4')]=function(_0x59161d){Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x1d4')]['call'](this,_0x59161d),this[_0x1021('0x1c7')](_0x59161d);},Game_Battler[_0x1021('0x1a9')][_0x1021('0xd2')]=function(_0x574f33){Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0xd2')][_0x1021('0x28f')](this,_0x574f33),this[_0x1021('0x120')](_0x574f33);},Game_Battler[_0x1021('0x1a9')]['onExpireBuff']=function(_0xb0d4b5){this[_0x1021('0x60')](_0xb0d4b5);},Game_Battler[_0x1021('0x1a9')]['onExpireDebuff']=function(_0x1796da){this[_0x1021('0x17a')](_0x1796da);},Game_Battler[_0x1021('0x1a9')][_0x1021('0x16b')]=function(_0x32e77e,_0x3fae9d){VisuMZ['SkillsStatesCore']['Settings'][_0x1021('0x1c2')][_0x1021('0x209')]['call'](this,_0x32e77e,_0x3fae9d);},Game_Battler['prototype'][_0x1021('0x222')]=function(_0x3f73f4,_0x50d028){VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')]['onAddDebuffJS']['call'](this,_0x3f73f4,_0x50d028);},Game_BattlerBase[_0x1021('0x1a9')][_0x1021('0x1c7')]=function(_0x1014b9){VisuMZ[_0x1021('0x29f')]['Settings'][_0x1021('0x1c2')][_0x1021('0x1dc')][_0x1021('0x28f')](this,_0x1014b9);},Game_BattlerBase['prototype'][_0x1021('0x120')]=function(_0x400229){VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0xb')][_0x1021('0x28f')](this,_0x400229);},Game_Battler[_0x1021('0x1a9')][_0x1021('0x60')]=function(_0x2675c6){VisuMZ['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0xe2')]['call'](this,_0x2675c6);},Game_Battler[_0x1021('0x1a9')]['onExpireDebuffGlobalJS']=function(_0x2353d6){VisuMZ['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x1c2')]['onExpireDebuffJS'][_0x1021('0x28f')](this,_0x2353d6);},Game_Battler[_0x1021('0x1a9')]['onAddStateMakeCustomSlipValues']=function(_0x5cf2ca){const _0x3b127a=VisuMZ[_0x1021('0x29f')],_0x4cb115=[_0x1021('0x18f'),_0x1021('0x26a'),_0x1021('0x183'),_0x1021('0x47'),_0x1021('0x140'),'stateTpSlipHealJS'];for(const _0x2a5e1f of _0x4cb115){if(_0x3b127a[_0x2a5e1f][_0x5cf2ca]){if(_0x1021('0x20e')==='fvemM')_0x3b127a[_0x2a5e1f][_0x5cf2ca][_0x1021('0x28f')](this,_0x5cf2ca);else{function _0x1346ee(){this[_0x1021('0x1bb')](_0x10725e[_0x1021('0xd0')]()),this[_0x1021('0xb9')](_0x3a47ec[_0x1021('0xb0')]());}}}}},VisuMZ[_0x1021('0x29f')][_0x1021('0x1f4')]=Game_Battler[_0x1021('0x1a9')]['regenerateAll'],Game_Battler[_0x1021('0x1a9')][_0x1021('0x1e3')]=function(){VisuMZ['SkillsStatesCore'][_0x1021('0x1f4')][_0x1021('0x28f')](this),this[_0x1021('0x25c')]();},Game_Battler[_0x1021('0x1a9')][_0x1021('0x25c')]=function(){if(!this[_0x1021('0x6a')]())return;const _0x5054f6=this[_0x1021('0x70')]();for(const _0x27842f of _0x5054f6){if(!_0x27842f)continue;this[_0x1021('0x214')](_0x27842f);}},Game_Battler['prototype']['onRegenerateCustomStateDamageOverTime']=function(_0x4d6aa3){const _0x222c49=this[_0x1021('0x163')](_0x4d6aa3['id'],'slipHp')||0x0,_0x49f49d=-this[_0x1021('0x5d')](),_0x34ef38=Math[_0x1021('0x1eb')](_0x222c49,_0x49f49d);if(_0x34ef38!==0x0)this[_0x1021('0x1fa')](_0x34ef38);const _0x578b97=this[_0x1021('0x163')](_0x4d6aa3['id'],'slipMp')||0x0;if(_0x578b97!==0x0)this[_0x1021('0x154')](_0x578b97);const _0x2029e9=this[_0x1021('0x163')](_0x4d6aa3['id'],_0x1021('0x220'))||0x0;if(_0x2029e9!==0x0)this[_0x1021('0x17f')](_0x578b97);},VisuMZ[_0x1021('0x29f')][_0x1021('0x159')]=Game_Actor[_0x1021('0x1a9')][_0x1021('0x3b')],Game_Actor['prototype'][_0x1021('0x3b')]=function(){const _0x2a6156=VisuMZ[_0x1021('0x29f')][_0x1021('0x159')][_0x1021('0x28f')](this),_0x1d84e=VisuMZ['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x176')];let _0x49a563=_0x1d84e[_0x1021('0x121')];return $gameParty[_0x1021('0x20')]()&&(_0x49a563=_0x49a563[_0x1021('0x297')](_0x1d84e[_0x1021('0xa6')])),_0x2a6156[_0x1021('0x1e6')](_0x2d237f=>!_0x49a563[_0x1021('0x17c')](_0x2d237f));},Game_Actor[_0x1021('0x1a9')][_0x1021('0x39')]=function(){return this[_0x1021('0x2a9')]()['filter'](_0x31773c=>this['isSkillUsableForAutoBattle'](_0x31773c));},Game_Actor[_0x1021('0x1a9')][_0x1021('0x1ba')]=function(_0xbe9fc5){if(!this[_0x1021('0x233')](_0xbe9fc5))return![];const _0x3bdd9e=this[_0x1021('0x3b')](),_0x3a45a9=DataManager[_0x1021('0xdc')](_0xbe9fc5),_0x46d6f5=_0x3bdd9e[_0x1021('0x1e6')](_0x4f81c7=>_0x3a45a9[_0x1021('0x17c')](_0x4f81c7));return _0x46d6f5[_0x1021('0x14f')]>0x0;},Game_Actor[_0x1021('0x1a9')]['passiveStateObjects']=function(){let _0x3ab1af=[this[_0x1021('0x2f')](),this[_0x1021('0x290')]()];_0x3ab1af=_0x3ab1af[_0x1021('0x297')](this[_0x1021('0x1a4')]()[_0x1021('0x1e6')](_0x2be534=>_0x2be534));for(const _0x15d5b8 of this[_0x1021('0x29d')]){if('mLlii'!==_0x1021('0xb5')){function _0x5a7e54(){_0x290a06[_0x1021('0x1a9')][_0x1021('0x277')][_0x1021('0x28f')](this);}}else{const _0x64b6fe=$dataSkills[_0x15d5b8];if(_0x64b6fe)_0x3ab1af[_0x1021('0xa3')](_0x64b6fe);}}return _0x3ab1af;},Game_Actor[_0x1021('0x1a9')][_0x1021('0x299')]=function(){Game_Battler[_0x1021('0x1a9')]['addPassiveStatesByPluginParameters'][_0x1021('0x28f')](this);const _0x4697df=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x138')][_0x1021('0x16e')];this[_0x1021('0x14c')][_0x1021('0x244')]=this[_0x1021('0x14c')]['passiveStates'][_0x1021('0x297')](_0x4697df);},VisuMZ[_0x1021('0x29f')][_0x1021('0x269')]=Game_Actor[_0x1021('0x1a9')][_0x1021('0x28e')],Game_Actor[_0x1021('0x1a9')][_0x1021('0x28e')]=function(_0x3d9ebd){VisuMZ[_0x1021('0x29f')][_0x1021('0x269')][_0x1021('0x28f')](this,_0x3d9ebd),this[_0x1021('0x14c')]={};},VisuMZ['SkillsStatesCore'][_0x1021('0x36')]=Game_Actor[_0x1021('0x1a9')]['forgetSkill'],Game_Actor[_0x1021('0x1a9')][_0x1021('0x266')]=function(_0x21a767){VisuMZ[_0x1021('0x29f')][_0x1021('0x36')]['call'](this,_0x21a767),this[_0x1021('0x14c')]={};},Game_Enemy[_0x1021('0x1a9')][_0x1021('0x98')]=function(){let _0x4efc94=[this['enemy']()];return _0x4efc94[_0x1021('0x297')](this[_0x1021('0x2a9')]());},Game_Enemy[_0x1021('0x1a9')][_0x1021('0x299')]=function(){Game_Battler['prototype'][_0x1021('0x299')][_0x1021('0x28f')](this);const _0x27f356=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x138')]['Enemy'];this['_cache'][_0x1021('0x244')]=this[_0x1021('0x14c')][_0x1021('0x244')][_0x1021('0x297')](_0x27f356);},Game_Enemy[_0x1021('0x1a9')][_0x1021('0x2a9')]=function(){const _0xc79351=[];for(const _0x2d0cf6 of this['enemy']()[_0x1021('0xdd')]){const _0x44f02a=$dataSkills[_0x2d0cf6[_0x1021('0x8e')]];if(_0x44f02a&&!_0xc79351[_0x1021('0x17c')](_0x44f02a))_0xc79351['push'](_0x44f02a);}return _0xc79351;},Game_Enemy['prototype'][_0x1021('0xf4')]=function(_0x350535){return this['hasState']($dataStates[_0x350535]);},VisuMZ[_0x1021('0x29f')][_0x1021('0x94')]=Game_Unit['prototype'][_0x1021('0x9a')],Game_Unit['prototype']['isAllDead']=function(){if(this[_0x1021('0x63')]())return!![];return VisuMZ[_0x1021('0x29f')]['Game_Unit_isAllDead']['call'](this);},Game_Unit[_0x1021('0x1a9')][_0x1021('0x63')]=function(){const _0x479de3=this[_0x1021('0xad')]();for(const _0x55016d of _0x479de3){if(!_0x55016d[_0x1021('0x275')]())return![];}return!![];},VisuMZ[_0x1021('0x29f')][_0x1021('0x101')]=Game_Troop[_0x1021('0x1a9')][_0x1021('0x27f')],Game_Troop[_0x1021('0x1a9')][_0x1021('0x27f')]=function(_0x5b4015){VisuMZ[_0x1021('0x29f')][_0x1021('0x101')][_0x1021('0x28f')](this,_0x5b4015),this[_0x1021('0x1cb')]();},Game_Troop[_0x1021('0x1a9')][_0x1021('0x1cb')]=function(){this[_0x1021('0x1b2')]=Graphics[_0x1021('0x16a')];},Game_Troop[_0x1021('0x1a9')][_0x1021('0x42')]=function(){return this[_0x1021('0x1b2')]=this[_0x1021('0x1b2')]||Graphics[_0x1021('0x16a')],this['_currentTroopUniqueID'];},Scene_Skill[_0x1021('0x1a9')][_0x1021('0x180')]=function(){if(ConfigManager[_0x1021('0x170')]&&ConfigManager[_0x1021('0x20f')]!==undefined){if(_0x1021('0x1a2')===_0x1021('0x1c8')){function _0x5dfe80(){this[_0x1021('0x3a')]=this[_0x1021('0x3a')]||{};if(this[_0x1021('0x3a')][_0x3fdc1f['id']])return this[_0x1021('0x3a')][_0x14b100['id']];this[_0x1021('0x3a')][_0x4bf579['id']]=[_0x2e9c78[_0x1021('0x1cc')]];if(_0x267c5b[_0x1021('0xf2')][_0x1021('0x14e')](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x41e304=_0x375a6d[_0x1021('0x22')]('['+_0x4e8eff['$1'][_0x1021('0x14e')](/\d+/g)+']');this['_stypeIDs'][_0xd54248['id']]=this[_0x1021('0x3a')][_0x2093e6['id']][_0x1021('0x297')](_0x41e304);}else{if(_0x27c5fc[_0x1021('0xf2')][_0x1021('0x14e')](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x1346ac=_0x26a3ef['$1'][_0x1021('0x30')](',');for(const _0x18025b of _0x1346ac){const _0x2b23be=_0x1eab14[_0x1021('0x72')](_0x18025b);if(_0x2b23be)this[_0x1021('0x3a')][_0x39d84d['id']]['push'](_0x2b23be);}}}return this[_0x1021('0x3a')][_0x551451['id']];}}else return ConfigManager[_0x1021('0x20f')];}else{if(this[_0x1021('0x1e1')]())return this[_0x1021('0x234')]()[_0x1021('0x14e')](/LOWER/i);else Scene_ItemBase[_0x1021('0x1a9')][_0x1021('0x277')]['call'](this);}},Scene_Skill[_0x1021('0x1a9')][_0x1021('0x277')]=function(){if(ConfigManager[_0x1021('0x170')]&&ConfigManager[_0x1021('0xd5')]!==undefined)return ConfigManager[_0x1021('0xd5')];else{if(this[_0x1021('0x1e1')]()){if(_0x1021('0x153')===_0x1021('0x95')){function _0x2b683f(){return this[_0x1021('0x14c')]=this[_0x1021('0x14c')]||{},this[_0x1021('0x14c')][_0xa55f49]!==_0x576a64;}}else return this[_0x1021('0x234')]()[_0x1021('0x14e')](/RIGHT/i);}else Scene_ItemBase['prototype'][_0x1021('0x277')][_0x1021('0x28f')](this);}},Scene_Skill[_0x1021('0x1a9')][_0x1021('0x234')]=function(){return VisuMZ['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x176')][_0x1021('0x132')];},Scene_Skill['prototype'][_0x1021('0x12c')]=function(){return this[_0x1021('0x19c')]&&this[_0x1021('0x19c')][_0x1021('0x12c')]();},Scene_Skill[_0x1021('0x1a9')][_0x1021('0x1e1')]=function(){return VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x176')][_0x1021('0xac')];},VisuMZ[_0x1021('0x29f')]['Scene_Skill_helpWindowRect']=Scene_Skill[_0x1021('0x1a9')][_0x1021('0x126')],Scene_Skill[_0x1021('0x1a9')][_0x1021('0x126')]=function(){return this[_0x1021('0x1e1')]()?this[_0x1021('0x2ae')]():VisuMZ[_0x1021('0x29f')][_0x1021('0xfc')]['call'](this);},Scene_Skill[_0x1021('0x1a9')][_0x1021('0x2ae')]=function(){const _0x42f46f=0x0,_0x356aea=this[_0x1021('0x10')](),_0x31a47a=Graphics[_0x1021('0xc8')],_0x78f9ea=this[_0x1021('0x261')]();return new Rectangle(_0x42f46f,_0x356aea,_0x31a47a,_0x78f9ea);},VisuMZ['SkillsStatesCore'][_0x1021('0x232')]=Scene_Skill[_0x1021('0x1a9')][_0x1021('0xc2')],Scene_Skill[_0x1021('0x1a9')][_0x1021('0xc2')]=function(){if(this[_0x1021('0x1e1')]()){if(_0x1021('0x125')!==_0x1021('0xd7'))return this[_0x1021('0x14b')]();else{function _0x51901b(){const _0x4af0f6=_0x57f68b[_0x1021('0xf2')],_0x181111=_0x3032b5['SkillsStatesCore']['skillVisibleJS'];return _0x181111[_0x19f527['id']]?_0x181111[_0x330659['id']][_0x1021('0x28f')](this,_0x4169ca):!![];}}}else return VisuMZ[_0x1021('0x29f')][_0x1021('0x232')][_0x1021('0x28f')](this);},Scene_Skill[_0x1021('0x1a9')][_0x1021('0x14b')]=function(){const _0x3b257f=this[_0x1021('0x9e')](),_0x30a53c=this[_0x1021('0xd3')](0x3,!![]),_0x530468=this['isRightInputMode']()?Graphics[_0x1021('0xc8')]-_0x3b257f:0x0,_0x256237=this[_0x1021('0x11c')]();return new Rectangle(_0x530468,_0x256237,_0x3b257f,_0x30a53c);},VisuMZ[_0x1021('0x29f')][_0x1021('0x29b')]=Scene_Skill[_0x1021('0x1a9')]['statusWindowRect'],Scene_Skill[_0x1021('0x1a9')][_0x1021('0x10e')]=function(){if(this[_0x1021('0x1e1')]()){if(_0x1021('0x12a')===_0x1021('0x13')){function _0x4fc0cf(){const _0x2f7f33=_0x2685f3[_0x1021('0x22')]('['+_0x5efb44['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x3ea066 of _0x2f7f33){if(this[_0x1021('0x0')][_0x1021('0x1a')](_0x3ea066))return!![];}return![];}}else return this['statusWindowRectSkillsStatesCore']();}else return VisuMZ[_0x1021('0x29f')][_0x1021('0x29b')][_0x1021('0x28f')](this);},Scene_Skill[_0x1021('0x1a9')][_0x1021('0x111')]=function(){const _0x4b6cbb=Graphics[_0x1021('0xc8')]-this[_0x1021('0x9e')](),_0x2941b9=this[_0x1021('0xbd')][_0x1021('0x1f6')],_0x49f350=this[_0x1021('0x277')]()?0x0:Graphics[_0x1021('0xc8')]-_0x4b6cbb,_0xda815e=this[_0x1021('0x11c')]();return new Rectangle(_0x49f350,_0xda815e,_0x4b6cbb,_0x2941b9);},VisuMZ[_0x1021('0x29f')][_0x1021('0x5e')]=Scene_Skill['prototype'][_0x1021('0x252')],Scene_Skill[_0x1021('0x1a9')][_0x1021('0x252')]=function(){VisuMZ[_0x1021('0x29f')][_0x1021('0x5e')]['call'](this),this[_0x1021('0x227')]()&&this[_0x1021('0x1b5')]();},VisuMZ[_0x1021('0x29f')][_0x1021('0x2a1')]=Scene_Skill[_0x1021('0x1a9')]['itemWindowRect'],Scene_Skill[_0x1021('0x1a9')]['itemWindowRect']=function(){if(this[_0x1021('0x1e1')]())return this[_0x1021('0x6b')]();else{const _0x45fc4f=VisuMZ[_0x1021('0x29f')][_0x1021('0x2a1')]['call'](this);if(this[_0x1021('0x227')]()&&this[_0x1021('0xd9')]()){if(_0x1021('0x259')!==_0x1021('0x1c'))_0x45fc4f['width']-=this[_0x1021('0xdb')]();else{function _0x155de8(){return _0x32d6cd['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x138')][_0x1021('0x189')]['call'](this,_0x3b040e);}}}}return rect;},Scene_Skill[_0x1021('0x1a9')]['itemWindowRectSkillsStatesCore']=function(){const _0x522850=Graphics[_0x1021('0xc8')]-this[_0x1021('0xdb')](),_0x462b03=this[_0x1021('0x201')]()-this['_statusWindow']['height'],_0x21b97a=this[_0x1021('0x277')]()?Graphics[_0x1021('0xc8')]-_0x522850:0x0,_0x6d4888=this['_statusWindow']['y']+this[_0x1021('0xf0')][_0x1021('0x1f6')];return new Rectangle(_0x21b97a,_0x6d4888,_0x522850,_0x462b03);},Scene_Skill[_0x1021('0x1a9')][_0x1021('0x227')]=function(){if(!Imported[_0x1021('0x1dd')])return![];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return!![];else{if('GaGWB'!==_0x1021('0xa5'))return VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')]['Skills'][_0x1021('0x110')];else{function _0x345f83(){_0x17afa6[_0x1021('0x14e')](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x2472d0=_0x52ba92[_0x1021('0x9d')](_0x35efb7(_0x13542b['$1'])[_0x1021('0xfb')]()),_0x1b2970=_0x3494b0(_0x30fa6c['$2']);_0x2472d0>=0x0&&(_0x46513e[_0x1021('0x59')](_0x2472d0,_0x1b2970),this[_0x1021('0x14d')](_0x54e303));}}}}},Scene_Skill[_0x1021('0x1a9')][_0x1021('0xd9')]=function(){return VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x176')][_0x1021('0x13d')];},Scene_Skill[_0x1021('0x1a9')]['createShopStatusWindow']=function(){const _0x35aa9f=this[_0x1021('0x26')]();this[_0x1021('0x1b1')]=new Window_ShopStatus(_0x35aa9f),this[_0x1021('0x106')](this[_0x1021('0x1b1')]),this[_0x1021('0x51')][_0x1021('0x5b')](this[_0x1021('0x1b1')]);},Scene_Skill[_0x1021('0x1a9')][_0x1021('0x26')]=function(){if(this[_0x1021('0x1e1')]()){if(_0x1021('0x54')!==_0x1021('0x27c'))return this[_0x1021('0x296')]();else{function _0x40e797(){this[_0x1021('0x2b6')]();}}}else return VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x176')][_0x1021('0x2b5')][_0x1021('0x28f')](this);},Scene_Skill[_0x1021('0x1a9')][_0x1021('0x296')]=function(){const _0x40482a=this[_0x1021('0xdb')](),_0x52aaaa=this[_0x1021('0x51')][_0x1021('0x1f6')],_0x56726c=this[_0x1021('0x277')]()?0x0:Graphics[_0x1021('0xc8')]-this[_0x1021('0xdb')](),_0x490356=this[_0x1021('0x51')]['y'];return new Rectangle(_0x56726c,_0x490356,_0x40482a,_0x52aaaa);},Scene_Skill[_0x1021('0x1a9')][_0x1021('0xdb')]=function(){if(Imported[_0x1021('0x1dd')])return Scene_Shop[_0x1021('0x1a9')][_0x1021('0x1bc')]();else{if(_0x1021('0x2ab')!==_0x1021('0x2ab')){function _0x47bd06(){const _0x10bb8b=_0x39fab6[_0x1021('0x29f')][_0x1021('0x2a1')]['call'](this);this[_0x1021('0x227')]()&&this[_0x1021('0xd9')]()&&(_0x10bb8b[_0x1021('0x10d')]-=this[_0x1021('0xdb')]());}}else return 0x0;}},Scene_Skill[_0x1021('0x1a9')][_0x1021('0x182')]=function(){if(this[_0x1021('0xbd')]&&this[_0x1021('0xbd')][_0x1021('0x22f')]){if(_0x1021('0xea')!==_0x1021('0xea')){function _0x29fdda(){this[_0x1021('0x4')](_0x232025['id']),this[_0x1021('0x29e')](_0x3614f4['id']),this[_0x1021('0x198')](_0x8e1f4c['id']);}}else return TextManager[_0x1021('0x5f')];}else return'';},VisuMZ['SkillsStatesCore'][_0x1021('0x19e')]=Sprite_Gauge[_0x1021('0x1a9')][_0x1021('0x1e0')],Sprite_Gauge['prototype']['initMembers']=function(){VisuMZ[_0x1021('0x29f')][_0x1021('0x19e')][_0x1021('0x28f')](this),this['_costSettings']=null;},VisuMZ[_0x1021('0x29f')][_0x1021('0x231')]=Sprite_Gauge[_0x1021('0x1a9')][_0x1021('0x27f')],Sprite_Gauge[_0x1021('0x1a9')]['setup']=function(_0x731422,_0x16ac5a){this['setupSkillsStatesCore'](_0x731422,_0x16ac5a),_0x16ac5a=_0x16ac5a[_0x1021('0x24d')](),VisuMZ[_0x1021('0x29f')][_0x1021('0x231')]['call'](this,_0x731422,_0x16ac5a);},Sprite_Gauge[_0x1021('0x1a9')][_0x1021('0x265')]=function(_0x452a99,_0x3ce32c){const _0x5d14cb=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x7d')][_0x1021('0x1e6')](_0x496cf6=>_0x496cf6['Name'][_0x1021('0xfb')]()===_0x3ce32c[_0x1021('0xfb')]());if(_0x5d14cb['length']>=0x1){if(_0x1021('0x105')!==_0x1021('0x2a0'))this[_0x1021('0x2c3')]=_0x5d14cb[0x0];else{function _0x4861ee(){const _0x104726=_0x388e1f[_0x1021('0x22')]('['+_0x3bd366['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x761751 of _0x104726){if(!this[_0x1021('0x0')][_0x1021('0x1a')](_0x761751))return![];}return!![];}}}else this['_costSettings']=null;},VisuMZ[_0x1021('0x29f')][_0x1021('0x22e')]=Sprite_Gauge[_0x1021('0x1a9')][_0x1021('0xd1')],Sprite_Gauge['prototype']['currentValue']=function(){if(this[_0x1021('0x7c')]&&this[_0x1021('0x2c3')])return this[_0x1021('0x41')]();else{if('bHvQR'===_0x1021('0x169')){function _0x16e39d(){_0x4fab8a+=_0x1050f2+0x18;}}else return VisuMZ[_0x1021('0x29f')]['Sprite_Gauge_currentValue'][_0x1021('0x28f')](this);}},Sprite_Gauge['prototype'][_0x1021('0x41')]=function(){return this[_0x1021('0x2c3')][_0x1021('0xba')][_0x1021('0x28f')](this[_0x1021('0x7c')]);},VisuMZ[_0x1021('0x29f')][_0x1021('0x24')]=Sprite_Gauge[_0x1021('0x1a9')]['currentMaxValue'],Sprite_Gauge[_0x1021('0x1a9')]['currentMaxValue']=function(){return this['_battler']&&this[_0x1021('0x2c3')]?this[_0x1021('0x298')]():VisuMZ[_0x1021('0x29f')][_0x1021('0x24')][_0x1021('0x28f')](this);},Sprite_Gauge[_0x1021('0x1a9')][_0x1021('0x298')]=function(){return this[_0x1021('0x2c3')]['GaugeMaxJS'][_0x1021('0x28f')](this[_0x1021('0x7c')]);},VisuMZ[_0x1021('0x29f')]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x1021('0x1a9')][_0x1021('0x112')],Sprite_Gauge[_0x1021('0x1a9')][_0x1021('0x112')]=function(){const _0x383ce0=VisuMZ['SkillsStatesCore']['Sprite_Gauge_gaugeRate'][_0x1021('0x28f')](this);return _0x383ce0[_0x1021('0x223')](0x0,0x1);},VisuMZ[_0x1021('0x29f')]['Sprite_Gauge_redraw']=Sprite_Gauge['prototype'][_0x1021('0x160')],Sprite_Gauge[_0x1021('0x1a9')][_0x1021('0x160')]=function(){if(this[_0x1021('0x7c')]&&this[_0x1021('0x2c3')]){if('XocJC'==='hhsdm'){function _0x26bbab(){if(!_0x27d4b7[_0x1021('0x2d')](_0x54490a))return!![];}}else this[_0x1021('0x27')]['clear'](),this[_0x1021('0x3f')]();}else{if(_0x1021('0x11b')!==_0x1021('0x11b')){function _0xc706ce(){return _0x1021('0x12b')[_0x1021('0x4b')](_0x3c50dd(_0x211609['$1']));}}else VisuMZ[_0x1021('0x29f')][_0x1021('0x250')][_0x1021('0x28f')](this);}},Sprite_Gauge['prototype'][_0x1021('0xb7')]=function(){let _0x41514d=this[_0x1021('0xd1')]();return Imported[_0x1021('0x292')]&&this[_0x1021('0x1d2')]()&&(_0x41514d=VisuMZ[_0x1021('0x2c0')](_0x41514d)),_0x41514d;},Sprite_Gauge[_0x1021('0x1a9')][_0x1021('0x3f')]=function(){this[_0x1021('0x2c3')][_0x1021('0x122')][_0x1021('0x28f')](this);},Sprite_Gauge[_0x1021('0x1a9')][_0x1021('0xcb')]=function(_0x49b4c1,_0x1e3607,_0x2ba7de,_0x28f94d,_0x4a4e1b,_0x18e259){const _0x2130ee=this[_0x1021('0x112')](),_0x5697ee=Math['floor']((_0x4a4e1b-0x2)*_0x2130ee),_0x27d2d5=_0x18e259-0x2,_0x158e80=this['gaugeBackColor']();this[_0x1021('0x27')][_0x1021('0xf8')](_0x2ba7de,_0x28f94d,_0x4a4e1b,_0x18e259,_0x158e80),this[_0x1021('0x27')][_0x1021('0xae')](_0x2ba7de+0x1,_0x28f94d+0x1,_0x5697ee,_0x27d2d5,_0x49b4c1,_0x1e3607);},VisuMZ['SkillsStatesCore']['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x1021('0x1a9')][_0x1021('0x1f5')],Sprite_StateIcon[_0x1021('0x1a9')][_0x1021('0x1f5')]=function(){VisuMZ[_0x1021('0x29f')]['Sprite_StateIcon_loadBitmap']['call'](this),this[_0x1021('0x1c5')]();},Sprite_StateIcon[_0x1021('0x1a9')][_0x1021('0x1c5')]=function(){const _0x47a3a1=Window_Base['prototype'][_0x1021('0x7f')]();this[_0x1021('0x16d')]=new Sprite(),this[_0x1021('0x16d')][_0x1021('0x27')]=new Bitmap(ImageManager[_0x1021('0x1ae')],_0x47a3a1),this['_turnDisplaySprite']['anchor']['x']=this[_0x1021('0x258')]['x'],this['_turnDisplaySprite'][_0x1021('0x258')]['y']=this[_0x1021('0x258')]['y'],this['addChild'](this[_0x1021('0x16d')]),this[_0x1021('0x194')]=this[_0x1021('0x16d')][_0x1021('0x27')];},VisuMZ['SkillsStatesCore'][_0x1021('0x89')]=Sprite_StateIcon['prototype'][_0x1021('0x235')],Sprite_StateIcon[_0x1021('0x1a9')]['updateFrame']=function(){VisuMZ[_0x1021('0x29f')]['Sprite_StateIcon_updateFrame'][_0x1021('0x28f')](this),this[_0x1021('0x31')]();},Sprite_StateIcon[_0x1021('0x1a9')][_0x1021('0x185')]=function(_0x5edc29,_0x44392a,_0x5ad9a0,_0x4b36c7,_0x36546a){this[_0x1021('0x194')][_0x1021('0x185')](_0x5edc29,_0x44392a,_0x5ad9a0,_0x4b36c7,this[_0x1021('0x194')][_0x1021('0x1f6')],_0x36546a);},Sprite_StateIcon['prototype']['updateTurnDisplaySprite']=function(){this[_0x1021('0x1f3')](),this[_0x1021('0x194')][_0x1021('0x13f')]();const _0x26d70d=this[_0x1021('0x7c')];if(!_0x26d70d)return;const _0xf8d020=_0x26d70d[_0x1021('0x70')]()[_0x1021('0x1e6')](_0x4ba046=>_0x4ba046[_0x1021('0x20d')]>0x0),_0x2bc33c=[...Array(0x8)[_0x1021('0x151')]()][_0x1021('0x1e6')](_0x1d43bf=>_0x26d70d['buff'](_0x1d43bf)!==0x0),_0x36d42b=this[_0x1021('0x1e9')],_0x3869ab=_0xf8d020[_0x36d42b];if(_0x3869ab){if(_0x1021('0x156')!==_0x1021('0x236'))Window_Base[_0x1021('0x1a9')][_0x1021('0x1b6')][_0x1021('0x28f')](this,_0x26d70d,_0x3869ab,0x0,0x0),Window_Base[_0x1021('0x1a9')][_0x1021('0x213')][_0x1021('0x28f')](this,_0x26d70d,_0x3869ab,0x0,0x0);else{function _0x9aa42a(){const _0x524922=_0xcd1306(_0x473724['$1']);if(_0x524922===_0x688f2c[_0x1021('0x42')]()){if(_0x5d47d6[_0x1021('0x14e')](/<member-(\d+)>/i))return _0x5d509f[_0x1021('0x294')]()[_0xf1b53f(_0x45b1cb['$1'])];}}}}else{const _0x40d89f=_0x2bc33c[_0x36d42b-_0xf8d020[_0x1021('0x14f')]];if(!_0x40d89f)return;Window_Base[_0x1021('0x1a9')]['drawActorBuffTurns'][_0x1021('0x28f')](this,_0x26d70d,_0x40d89f,0x0,0x0),Window_Base['prototype'][_0x1021('0x1b9')]['call'](this,_0x26d70d,_0x40d89f,0x0,0x0);}},Sprite_StateIcon[_0x1021('0x1a9')][_0x1021('0x1f3')]=function(){this[_0x1021('0x194')][_0x1021('0x1ff')]=$gameSystem[_0x1021('0xe5')](),this[_0x1021('0x194')]['fontSize']=$gameSystem['mainFontSize'](),this[_0x1021('0x52')]();},Sprite_StateIcon[_0x1021('0x1a9')][_0x1021('0x52')]=function(){this[_0x1021('0x1bb')](ColorManager[_0x1021('0xd0')]()),this[_0x1021('0xb9')](ColorManager[_0x1021('0xb0')]());},Sprite_StateIcon[_0x1021('0x1a9')][_0x1021('0x1bb')]=function(_0x3e25bb){this[_0x1021('0x194')][_0x1021('0x162')]=_0x3e25bb;},Sprite_StateIcon['prototype'][_0x1021('0xb9')]=function(_0x2765f1){this[_0x1021('0x194')]['outlineColor']=_0x2765f1;},Window_Base[_0x1021('0x1a9')][_0x1021('0x202')]=function(_0xbca681,_0x387cf0,_0xe5af56,_0x273d6d,_0x5068ec){const _0x230ccc=this[_0x1021('0x17b')](_0xbca681,_0x387cf0),_0x22221e=this[_0x1021('0x1f')](_0x230ccc,_0xe5af56,_0x273d6d,_0x5068ec),_0x5de7c2=_0xe5af56+_0x5068ec-_0x22221e['width'];this['drawTextEx'](_0x230ccc,_0x5de7c2,_0x273d6d,_0x5068ec),this[_0x1021('0x1f3')]();},Window_Base[_0x1021('0x1a9')][_0x1021('0x17b')]=function(_0x1191d9,_0x57d7fc){let _0x60632e='';for(settings of VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x7d')]){if(_0x1021('0x1f7')===_0x1021('0x1f7')){if(!this[_0x1021('0x210')](_0x1191d9,_0x57d7fc,settings))continue;if(_0x60632e[_0x1021('0x14f')]>0x0)_0x60632e+=this[_0x1021('0x1c9')]();_0x60632e+=this['createSkillCostText'](_0x1191d9,_0x57d7fc,settings);}else{function _0xef158(){if(!_0x1b3423[_0x1021('0x2d')](_0x2433fb))return![];}}}_0x60632e=this['makeAdditionalSkillCostText'](_0x1191d9,_0x57d7fc,_0x60632e);if(_0x57d7fc[_0x1021('0xf2')][_0x1021('0x14e')](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x60632e[_0x1021('0x14f')]>0x0)_0x60632e+=this[_0x1021('0x1c9')]();_0x60632e+=String(RegExp['$1']);}return _0x60632e;},Window_Base['prototype'][_0x1021('0x268')]=function(_0x403ab7,_0x5dc7f2,_0x3c7482){return _0x3c7482;},Window_Base[_0x1021('0x1a9')][_0x1021('0x210')]=function(_0x12c5f8,_0xb751ae,_0x258a7e){const _0x2b9252=_0x258a7e[_0x1021('0x29a')]['call'](_0x12c5f8,_0xb751ae);return _0x258a7e['ShowJS'][_0x1021('0x28f')](_0x12c5f8,_0xb751ae,_0x2b9252,_0x258a7e);},Window_Base[_0x1021('0x1a9')][_0x1021('0x2b3')]=function(_0x29850c,_0x148bb2,_0x1ded29){const _0x14da99=_0x1ded29[_0x1021('0x29a')][_0x1021('0x28f')](_0x29850c,_0x148bb2);return _0x1ded29[_0x1021('0xbc')]['call'](_0x29850c,_0x148bb2,_0x14da99,_0x1ded29);},Window_Base[_0x1021('0x1a9')][_0x1021('0x1c9')]=function(){return'\x20';},Window_Base['prototype'][_0x1021('0x216')]=function(_0x59df9e,_0x18749b,_0x2206f7,_0x2b5a74){if(!_0x59df9e)return;VisuMZ['SkillsStatesCore'][_0x1021('0x18')][_0x1021('0x28f')](this,_0x59df9e,_0x18749b,_0x2206f7,_0x2b5a74),this[_0x1021('0x133')](_0x59df9e,_0x18749b,_0x2206f7,_0x2b5a74);},Window_Base['prototype'][_0x1021('0x133')]=function(_0x3a16b7,_0x4deb6d,_0x4a759d,_0x17f2e9){_0x17f2e9=_0x17f2e9||0x90;const _0x4f5e45=ImageManager[_0x1021('0x1ae')],_0x29cb50=_0x3a16b7[_0x1021('0x21f')]()[_0x1021('0x28b')](0x0,Math[_0x1021('0xb1')](_0x17f2e9/_0x4f5e45)),_0x49f358=_0x3a16b7[_0x1021('0x70')]()[_0x1021('0x1e6')](_0x164145=>_0x164145['iconIndex']>0x0),_0x5c21af=[...Array(0x8)[_0x1021('0x151')]()][_0x1021('0x1e6')](_0xff73d7=>_0x3a16b7[_0x1021('0x7a')](_0xff73d7)!==0x0),_0x1bcb8d=[];let _0x388b2a=_0x4deb6d;for(let _0x2607ab=0x0;_0x2607ab<_0x29cb50[_0x1021('0x14f')];_0x2607ab++){this[_0x1021('0x1f3')]();const _0x953ded=_0x49f358[_0x2607ab];if(_0x953ded)!_0x1bcb8d[_0x1021('0x17c')](_0x953ded)&&this[_0x1021('0x1b6')](_0x3a16b7,_0x953ded,_0x388b2a,_0x4a759d),this[_0x1021('0x213')](_0x3a16b7,_0x953ded,_0x388b2a,_0x4a759d),_0x1bcb8d[_0x1021('0xa3')](_0x953ded);else{const _0x476dcd=_0x5c21af[_0x2607ab-_0x49f358['length']];this[_0x1021('0x1d0')](_0x3a16b7,_0x476dcd,_0x388b2a,_0x4a759d),this[_0x1021('0x1b9')](_0x3a16b7,_0x476dcd,_0x388b2a,_0x4a759d);}_0x388b2a+=_0x4f5e45;}},Window_Base[_0x1021('0x1a9')][_0x1021('0x1b6')]=function(_0x23ea6a,_0x1b1f34,_0x1abee5,_0x4c252e){if(!VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x171')][_0x1021('0x242')])return;if(!_0x23ea6a[_0x1021('0x1a1')](_0x1b1f34['id']))return;if(_0x1b1f34['autoRemovalTiming']===0x0)return;if(_0x1b1f34[_0x1021('0xf2')][_0x1021('0x14e')](/<HIDE STATE TURNS>/i))return;const _0x40bf82=_0x23ea6a[_0x1021('0x1db')](_0x1b1f34['id']),_0x3749d2=ImageManager[_0x1021('0x1ae')],_0x5195c9=ColorManager[_0x1021('0x229')](_0x1b1f34);this[_0x1021('0x1bb')](_0x5195c9),this[_0x1021('0xb9')](_0x1021('0x166')),this[_0x1021('0x194')][_0x1021('0x1f8')]=!![],this[_0x1021('0x194')][_0x1021('0x139')]=VisuMZ['SkillsStatesCore']['Settings'][_0x1021('0x171')]['TurnFontSize'],_0x1abee5+=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x171')][_0x1021('0x2bb')],_0x4c252e+=VisuMZ[_0x1021('0x29f')]['Settings'][_0x1021('0x171')][_0x1021('0x23f')],this[_0x1021('0x185')](_0x40bf82,_0x1abee5,_0x4c252e,_0x3749d2,_0x1021('0x12')),this['contents'][_0x1021('0x1f8')]=![],this[_0x1021('0x1f3')]();},Window_Base[_0x1021('0x1a9')][_0x1021('0x213')]=function(_0x5d8f67,_0x47eeec,_0x1a2b39,_0xa295bd){if(!VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')]['States'][_0x1021('0x25b')])return;const _0x42ee65=ImageManager[_0x1021('0x1ae')],_0x17f2b6=ImageManager[_0x1021('0x175')]/0x2,_0x2931bb=ColorManager[_0x1021('0xd0')]();this[_0x1021('0x1bb')](_0x2931bb),this['changeOutlineColor'](_0x1021('0x166')),this[_0x1021('0x194')]['fontBold']=!![],this[_0x1021('0x194')][_0x1021('0x139')]=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x171')][_0x1021('0x2ad')],_0x1a2b39+=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x171')][_0x1021('0x26c')],_0xa295bd+=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x171')][_0x1021('0x1fb')];const _0x3c2a49=String(_0x5d8f67[_0x1021('0x230')](_0x47eeec['id']));this[_0x1021('0x185')](_0x3c2a49,_0x1a2b39,_0xa295bd,_0x42ee65,'center'),this[_0x1021('0x194')][_0x1021('0x1f8')]=![],this[_0x1021('0x1f3')]();},Window_Base[_0x1021('0x1a9')][_0x1021('0x1d0')]=function(_0x192d5c,_0x1dcafe,_0x3df82e,_0x11c1a3){if(!VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')]['Buffs'][_0x1021('0x242')])return;const _0x17e2f8=_0x192d5c[_0x1021('0x7a')](_0x1dcafe);if(_0x17e2f8===0x0)return;const _0xc55791=_0x192d5c[_0x1021('0x1bd')](_0x1dcafe),_0x239d1d=ImageManager[_0x1021('0x1ae')],_0x4a1b11=_0x17e2f8>0x0?ColorManager[_0x1021('0x9c')]():ColorManager['debuffColor']();this[_0x1021('0x1bb')](_0x4a1b11),this[_0x1021('0xb9')](_0x1021('0x166')),this[_0x1021('0x194')][_0x1021('0x1f8')]=!![],this[_0x1021('0x194')][_0x1021('0x139')]=VisuMZ[_0x1021('0x29f')]['Settings']['Buffs'][_0x1021('0x22a')],_0x3df82e+=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0x2bb')],_0x11c1a3+=VisuMZ['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x1c2')]['TurnOffsetY'],this['drawText'](_0xc55791,_0x3df82e,_0x11c1a3,_0x239d1d,'right'),this[_0x1021('0x194')][_0x1021('0x1f8')]=![],this[_0x1021('0x1f3')]();},Window_Base[_0x1021('0x1a9')][_0x1021('0x1b9')]=function(_0x299e6e,_0x2fec3b,_0x419eec,_0x2eb3fe){if(!VisuMZ['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0x25b')])return;const _0x50c69e=_0x299e6e['paramBuffRate'](_0x2fec3b),_0x639b0e=_0x299e6e['buff'](_0x2fec3b),_0x4d544c=ImageManager[_0x1021('0x1ae')],_0x10c215=ImageManager['iconHeight']/0x2,_0xeb352b=_0x639b0e>0x0?ColorManager[_0x1021('0x9c')]():ColorManager[_0x1021('0x2')]();this['changeTextColor'](_0xeb352b),this[_0x1021('0xb9')]('rgba(0,\x200,\x200,\x201)'),this[_0x1021('0x194')]['fontBold']=!![],this[_0x1021('0x194')][_0x1021('0x139')]=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')]['DataFontSize'],_0x419eec+=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0x26c')],_0x2eb3fe+=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0x1fb')];const _0x3d028a=_0x1021('0xfe')['format'](Math[_0x1021('0x26b')](_0x50c69e*0x64));this[_0x1021('0x185')](_0x3d028a,_0x419eec,_0x2eb3fe,_0x4d544c,_0x1021('0x19f')),this['contents'][_0x1021('0x1f8')]=![],this[_0x1021('0x1f3')]();},VisuMZ[_0x1021('0x29f')][_0x1021('0x118')]=Window_StatusBase[_0x1021('0x1a9')][_0x1021('0xd')],Window_StatusBase[_0x1021('0x1a9')]['placeGauge']=function(_0x2496fb,_0x1bd35c,_0x158f00,_0x42bd78){if(_0x2496fb[_0x1021('0x1af')]())_0x1bd35c=this[_0x1021('0x1f1')](_0x2496fb,_0x1bd35c);this[_0x1021('0x25')](_0x2496fb,_0x1bd35c,_0x158f00,_0x42bd78);},Window_StatusBase['prototype'][_0x1021('0x25')]=function(_0x480a73,_0x4c0796,_0x2fb952,_0x5c43ad){if([_0x1021('0x6f'),_0x1021('0x1ce')]['includes'](_0x4c0796['toLowerCase']()))return;VisuMZ[_0x1021('0x29f')][_0x1021('0x118')][_0x1021('0x28f')](this,_0x480a73,_0x4c0796,_0x2fb952,_0x5c43ad);},Window_StatusBase[_0x1021('0x1a9')][_0x1021('0x1f1')]=function(_0x5d65a3,_0x1fde56){const _0x537721=_0x5d65a3[_0x1021('0x290')]()[_0x1021('0xf2')];if(_0x1fde56==='hp'&&_0x537721[_0x1021('0x14e')](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1fde56==='mp'&&_0x537721[_0x1021('0x14e')](/<REPLACE MP GAUGE:[ ](.*)>/i)){if(_0x1021('0x184')===_0x1021('0x184'))return String(RegExp['$1']);else{function _0x2fe6aa(){return _0x1021('0x93');}}}else{if(_0x1fde56==='tp'&&_0x537721[_0x1021('0x14e')](/<REPLACE TP GAUGE:[ ](.*)>/i)){if(_0x1021('0x289')!==_0x1021('0x190'))return String(RegExp['$1']);else{function _0x4d617e(){_0x35e16d[_0x1021('0x29f')][_0x1021('0x36')][_0x1021('0x28f')](this,_0x1cecbb),this[_0x1021('0x14c')]={};}}}else{if(_0x1021('0x4e')!==_0x1021('0x90'))return _0x1fde56;else{function _0x3cf3a0(){_0x55b8b9[_0x1021('0x29f')][_0x1021('0x101')][_0x1021('0x28f')](this,_0x5ce250),this[_0x1021('0x1cb')]();}}}}}},VisuMZ[_0x1021('0x29f')]['Window_StatusBase_drawActorIcons']=Window_StatusBase[_0x1021('0x1a9')][_0x1021('0x216')],Window_StatusBase['prototype'][_0x1021('0x216')]=function(_0x735318,_0x23dbb6,_0x68dbdf,_0x5598a4){if(!_0x735318)return;Window_Base[_0x1021('0x1a9')][_0x1021('0x216')][_0x1021('0x28f')](this,_0x735318,_0x23dbb6,_0x68dbdf,_0x5598a4);},VisuMZ[_0x1021('0x29f')][_0x1021('0x11d')]=Window_SkillType[_0x1021('0x1a9')][_0x1021('0xaf')],Window_SkillType[_0x1021('0x1a9')][_0x1021('0xaf')]=function(_0x2a3dc3){VisuMZ[_0x1021('0x29f')][_0x1021('0x11d')][_0x1021('0x28f')](this,_0x2a3dc3),this[_0x1021('0x96')](_0x2a3dc3);},Window_SkillType[_0x1021('0x1a9')][_0x1021('0x96')]=function(_0x271516){const _0x286c44=new Rectangle(0x0,0x0,_0x271516[_0x1021('0x10d')],_0x271516[_0x1021('0x1f6')]);this[_0x1021('0x1d9')]=new Window_Base(_0x286c44),this[_0x1021('0x1d9')][_0x1021('0xc3')]=0x0,this['addChild'](this[_0x1021('0x1d9')]),this[_0x1021('0xc4')]();},Window_SkillType[_0x1021('0x1a9')][_0x1021('0x164')]=function(){Window_Command[_0x1021('0x1a9')][_0x1021('0x164')][_0x1021('0x28f')](this);if(this['_commandNameWindow'])this[_0x1021('0xc4')]();},Window_SkillType[_0x1021('0x1a9')][_0x1021('0xc4')]=function(){const _0x54396b=this[_0x1021('0x1d9')];_0x54396b[_0x1021('0x194')][_0x1021('0x13f')]();const _0x6b6a0f=this['commandStyleCheck'](this[_0x1021('0x86')]());if(_0x6b6a0f===_0x1021('0x93')&&this[_0x1021('0x1ee')]()>0x0){const _0x21a9a8=this['itemLineRect'](this[_0x1021('0x86')]());let _0x2032ca=this['commandName'](this['index']());_0x2032ca=_0x2032ca[_0x1021('0x168')](/\\I\[(\d+)\]/gi,''),_0x54396b['resetFontSettings'](),this[_0x1021('0x37')](_0x2032ca,_0x21a9a8),this[_0x1021('0x32')](_0x2032ca,_0x21a9a8),this[_0x1021('0x14')](_0x2032ca,_0x21a9a8);}},Window_SkillType['prototype'][_0x1021('0x37')]=function(_0x49fad6,_0x1b0266){},Window_SkillType[_0x1021('0x1a9')][_0x1021('0x32')]=function(_0x47e58,_0x410967){const _0xd02bc6=this[_0x1021('0x1d9')];_0xd02bc6[_0x1021('0x185')](_0x47e58,0x0,_0x410967['y'],_0xd02bc6[_0x1021('0xe0')],_0x1021('0x19f'));},Window_SkillType[_0x1021('0x1a9')][_0x1021('0x14')]=function(_0x4d2293,_0x53a6d8){const _0x9ea11c=this[_0x1021('0x1d9')],_0x57420b=$gameSystem[_0x1021('0x74')](),_0x420988=_0x53a6d8['x']+Math[_0x1021('0xb1')](_0x53a6d8['width']/0x2)+_0x57420b;_0x9ea11c['x']=_0x9ea11c[_0x1021('0x10d')]/-0x2+_0x420988,_0x9ea11c['y']=Math[_0x1021('0xb1')](_0x53a6d8[_0x1021('0x1f6')]/0x2);},Window_SkillType[_0x1021('0x1a9')][_0x1021('0x12c')]=function(){return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x1021('0x1a9')][_0x1021('0x12c')][_0x1021('0x28f')](this);},Window_SkillType['prototype'][_0x1021('0x123')]=function(){if(!this[_0x1021('0x0')])return;const _0x5deda6=this['_actor'][_0x1021('0x3b')]();for(const _0x5a26ca of _0x5deda6){const _0x3f9d4f=this['makeCommandName'](_0x5a26ca);this[_0x1021('0x249')](_0x3f9d4f,_0x1021('0x65'),!![],_0x5a26ca);}},Window_SkillType[_0x1021('0x1a9')][_0x1021('0x64')]=function(_0x531f6b){let _0x3a7c06=$dataSystem[_0x1021('0x3b')][_0x531f6b];if(_0x3a7c06['match'](/\\I\[(\d+)\]/i))return _0x3a7c06;const _0x25e884=VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x176')],_0x52b64d=$dataSystem['magicSkills'][_0x1021('0x17c')](_0x531f6b),_0x1fbc1e=_0x52b64d?_0x25e884['IconStypeMagic']:_0x25e884[_0x1021('0x15e')];return'\x5cI[%1]%2'[_0x1021('0x4b')](_0x1fbc1e,_0x3a7c06);},Window_SkillType[_0x1021('0x1a9')][_0x1021('0x287')]=function(){return VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')]['Skills'][_0x1021('0x115')];},Window_SkillType[_0x1021('0x1a9')][_0x1021('0x272')]=function(_0x2baa29){const _0x363a8f=this['commandStyleCheck'](_0x2baa29);if(_0x363a8f===_0x1021('0x226'))this[_0x1021('0x262')](_0x2baa29);else{if(_0x363a8f===_0x1021('0x93'))this['drawItemStyleIcon'](_0x2baa29);else{if(_0x1021('0x1a3')===_0x1021('0x1a3'))Window_Command[_0x1021('0x1a9')][_0x1021('0x272')]['call'](this,_0x2baa29);else{function _0x4ca8a4(){const _0x20cdb=_0x205079[_0x1021('0x22')]('['+_0x39ac0c['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x365bf5 of _0x20cdb){if(!_0x5176a6[_0x1021('0x2d')](_0x365bf5))return!![];}return![];}}}}},Window_SkillType[_0x1021('0x1a9')]['commandStyle']=function(){return VisuMZ['SkillsStatesCore'][_0x1021('0xd4')][_0x1021('0x176')][_0x1021('0x11f')];},Window_SkillType[_0x1021('0x1a9')][_0x1021('0x2a7')]=function(_0x331d96){if(_0x331d96<0x0)return _0x1021('0x25e');const _0x3ac504=this[_0x1021('0x217')]();if(_0x3ac504!==_0x1021('0x24a')){if('MEhGI'===_0x1021('0x245')){function _0x4a6ca2(){this[_0x1021('0x92')](_0x1021('0x109')),_0x5221a0['SkillsStatesCore']['Game_BattlerBase_die'][_0x1021('0x28f')](this),this[_0x1021('0x24c')]();}}else return _0x3ac504;}else{if(this[_0x1021('0x1ee')]()>0x0){const _0x4f8976=this[_0x1021('0x215')](_0x331d96);if(_0x4f8976['match'](/\\I\[(\d+)\]/i)){const _0x50b248=this['itemLineRect'](_0x331d96),_0xb169ca=this[_0x1021('0x1f')](_0x4f8976)[_0x1021('0x10d')];if(_0xb169ca<=_0x50b248['width'])return _0x1021('0x226');else{if(_0x1021('0xfd')!==_0x1021('0x1c1'))return _0x1021('0x93');else{function _0x398555(){_0x3e563e['addBuffTurns'](_0x23f8be,_0x364294),this[_0x1021('0x14d')](_0x4e5a01);}}}}}}return _0x1021('0x25e');},Window_SkillType[_0x1021('0x1a9')][_0x1021('0x262')]=function(_0x5e9b0e){const _0x277eb1=this[_0x1021('0x26e')](_0x5e9b0e),_0x18dbc2=this[_0x1021('0x215')](_0x5e9b0e),_0x560575=this[_0x1021('0x1f')](_0x18dbc2)[_0x1021('0x10d')];this['changePaintOpacity'](this[_0x1021('0xce')](_0x5e9b0e));const _0x383d29=this[_0x1021('0x287')]();if(_0x383d29===_0x1021('0x12')){if(_0x1021('0x2ac')!=='XKYye')this[_0x1021('0x186')](_0x18dbc2,_0x277eb1['x']+_0x277eb1[_0x1021('0x10d')]-_0x560575,_0x277eb1['y'],_0x560575);else{function _0x1afcfe(){_0x1c6a78[_0x1021('0x14e')](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x11997b=_0x506b45[_0x1021('0x9d')](_0x197f4c(_0x2fc455['$1'])[_0x1021('0xfb')]()),_0x56356b=_0x338915(_0x130e8e['$2']);_0x11997b>=0x0&&(_0x4abdb9[_0x1021('0xe1')](_0x11997b,_0x56356b),this[_0x1021('0x14d')](_0x4805a4));}}}else{if(_0x383d29==='center'){if('WZjVy'==='WZjVy'){const _0x171ceb=_0x277eb1['x']+Math[_0x1021('0xb1')]((_0x277eb1[_0x1021('0x10d')]-_0x560575)/0x2);this[_0x1021('0x186')](_0x18dbc2,_0x171ceb,_0x277eb1['y'],_0x560575);}else{function _0x834a65(){let _0x380b97=[this[_0x1021('0x77')]()];return _0x380b97[_0x1021('0x297')](this[_0x1021('0x2a9')]());}}}else this[_0x1021('0x186')](_0x18dbc2,_0x277eb1['x'],_0x277eb1['y'],_0x560575);}},Window_SkillType[_0x1021('0x1a9')][_0x1021('0x2b4')]=function(_0x2a4c27){this[_0x1021('0x215')](_0x2a4c27)[_0x1021('0x14e')](/\\I\[(\d+)\]/i);const _0x1203e6=Number(RegExp['$1'])||0x0,_0x32a617=this['itemLineRect'](_0x2a4c27),_0x284a19=_0x32a617['x']+Math['floor']((_0x32a617[_0x1021('0x10d')]-ImageManager['iconWidth'])/0x2),_0x228241=_0x32a617['y']+(_0x32a617['height']-ImageManager[_0x1021('0x175')])/0x2;this[_0x1021('0x25f')](_0x1203e6,_0x284a19,_0x228241);},VisuMZ['SkillsStatesCore'][_0x1021('0x274')]=Window_SkillStatus[_0x1021('0x1a9')][_0x1021('0x1be')],Window_SkillStatus['prototype'][_0x1021('0x1be')]=function(){VisuMZ[_0x1021('0x29f')][_0x1021('0x274')][_0x1021('0x28f')](this);if(this['_actor'])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus[_0x1021('0x1a9')][_0x1021('0x6')]=function(){if(!Imported[_0x1021('0x292')])return;if(!Imported[_0x1021('0x21d')])return;const _0x5909a9=this[_0x1021('0x4c')]();let _0x538a7d=this[_0x1021('0x1c4')]()/0x2+0xb4+0xb4+0xb4,_0x5ce613=this['innerWidth']-_0x538a7d-0x2;if(_0x5ce613>=0x12c){if(_0x1021('0x34')!==_0x1021('0x34')){function _0x10f323(){for(let _0x33c0db=0x0;_0x33c0db<this['buffLength']();_0x33c0db++){if(this[_0x1021('0x23')](_0x33c0db)){const _0x2d00bb=this[_0x1021('0x12d')][_0x33c0db];this['removeBuff'](_0x33c0db);if(_0x2d00bb>0x0)this[_0x1021('0x21b')](_0x33c0db);if(_0x2d00bb<0x0)this[_0x1021('0x129')](_0x33c0db);}}}}else{const _0x8190eb=VisuMZ['CoreEngine'][_0x1021('0xd4')][_0x1021('0xee')]['DisplayedParams'],_0x1c3753=Math[_0x1021('0xb1')](_0x5ce613/0x2)-0x18;let _0x567c30=_0x538a7d,_0x28aa88=Math[_0x1021('0xb1')]((this[_0x1021('0x2c1')]-Math[_0x1021('0x88')](_0x8190eb[_0x1021('0x14f')]/0x2)*_0x5909a9)/0x2),_0x192388=0x0;for(const _0x57ee20 of _0x8190eb){if('KHSgD'===_0x1021('0x23e')){function _0x13da2a(){_0x371782[_0x1021('0x1a9')][_0x1021('0xd2')][_0x1021('0x28f')](this,_0x54b23d),this[_0x1021('0x120')](_0x13b769);}}else{this[_0x1021('0x1f3')](),this[_0x1021('0x199')](_0x567c30,_0x28aa88,_0x1c3753,_0x57ee20,!![]),this[_0x1021('0x52')](),this[_0x1021('0x194')][_0x1021('0x139')]-=0x8;const _0x49a8a=this[_0x1021('0x0')][_0x1021('0x2a6')](_0x57ee20,!![]);this['contents'][_0x1021('0x185')](_0x49a8a,_0x567c30,_0x28aa88,_0x1c3753,_0x5909a9,_0x1021('0x12')),_0x192388++;if(_0x192388%0x2===0x0){if(_0x1021('0x263')===_0x1021('0xc1')){function _0x51befb(){const _0x5b73e0=this[_0x1021('0x12d')][_0x59514e];_0x55c3e3['SkillsStatesCore'][_0x1021('0x2e')]['call'](this,_0x4323db);if(_0x5b73e0>0x0)this[_0x1021('0x1d4')](_0xbac194);if(_0x5b73e0<0x0)this[_0x1021('0xd2')](_0x362cd7);}}else _0x567c30=_0x538a7d,_0x28aa88+=_0x5909a9;}else{if(_0x1021('0x2b')!==_0x1021('0x2b')){function _0x1057f2(){const _0x10b1b9=_0x374346[_0x1021('0xf2')];_0x10b1b9['match'](/<MP COST:[ ](\d+)>/i)&&(_0x29e132[_0x1021('0x207')]=_0x4f62e3(_0xc4317f['$1'])),_0x10b1b9[_0x1021('0x14e')](/<TP COST:[ ](\d+)>/i)&&(_0x1412be[_0x1021('0x1d8')]=_0x45ac58(_0x3700ab['$1']));}}else _0x567c30+=_0x1c3753+0x18;}}}}}this[_0x1021('0x1f3')]();},VisuMZ[_0x1021('0x29f')][_0x1021('0x3c')]=Window_SkillList[_0x1021('0x1a9')][_0x1021('0x17c')],Window_SkillList[_0x1021('0x1a9')][_0x1021('0x17c')]=function(_0x4df4ad){return this[_0x1021('0x56')](_0x4df4ad);},VisuMZ[_0x1021('0x29f')][_0x1021('0x253')]=Window_SkillList['prototype'][_0x1021('0x1d1')],Window_SkillList['prototype']['maxCols']=function(){if(SceneManager['_scene']['constructor']===Scene_Battle){if('SqLzq'!==_0x1021('0xa')){function _0x1afc76(){return _0x23dfc4[_0x1021('0xdc')](_0x369698)[_0x1021('0x17c')](this[_0x1021('0x255')]);}}else return VisuMZ['SkillsStatesCore'][_0x1021('0x253')][_0x1021('0x28f')](this);}else{if(_0x1021('0x61')===_0x1021('0x22b')){function _0x58ec11(){if(!_0x5aabc4)return _0x1021('0x67');if(_0x2a293d[_0x1021('0x1af')]())return _0x1021('0xc9')[_0x1021('0x4b')](_0xda1126[_0x1021('0x1c0')]());else{const _0x567f4b=_0x1021('0x1b3')[_0x1021('0x4b')](_0x2c65dd[_0x1021('0x211')]()),_0x37eb77=_0x1021('0x1fc')[_0x1021('0x4b')](_0x4186db['index']()),_0x31ada4='<troop-%1>'[_0x1021('0x4b')](_0x1175de['getCurrentTroopUniqueID']());return'%1\x20%2\x20%3'['format'](_0x567f4b,_0x37eb77,_0x31ada4);}return _0x1021('0x67');}}else return VisuMZ[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x176')][_0x1021('0xa2')];}},VisuMZ[_0x1021('0x29f')][_0x1021('0x1ef')]=Window_SkillList[_0x1021('0x1a9')]['setActor'],Window_SkillList[_0x1021('0x1a9')][_0x1021('0x18c')]=function(_0x33c47b){const _0x29423f=this[_0x1021('0x0')]!==_0x33c47b;VisuMZ[_0x1021('0x29f')][_0x1021('0x1ef')][_0x1021('0x28f')](this,_0x33c47b);if(_0x29423f){if(_0x1021('0x16f')===_0x1021('0x16f')){if(this[_0x1021('0xf0')]&&this['_statusWindow'][_0x1021('0xec')]===Window_ShopStatus){if(_0x1021('0x1bf')===_0x1021('0x1bf'))this[_0x1021('0xf0')][_0x1021('0x283')](this[_0x1021('0x1da')](0x0));else{function _0x2f3301(){if(_0x4ca061[_0x1021('0x1af')]())_0x1c9b27=this['convertGaugeTypeSkillsStatesCore'](_0x294252,_0x5b97d4);this[_0x1021('0x25')](_0x58794f,_0x441962,_0xec2dcd,_0x55b964);}}}}else{function _0xee60c9(){_0x234461['mpCost']=_0x35fbb7(_0x25de45['$1']);}}}},Window_SkillList[_0x1021('0x1a9')]['setStypeId']=function(_0x5802cf){if(this['_stypeId']===_0x5802cf)return;this[_0x1021('0x255')]=_0x5802cf,this['refresh'](),this['scrollTo'](0x0,0x0);if(this[_0x1021('0xf0')]&&this[_0x1021('0xf0')][_0x1021('0xec')]===Window_ShopStatus){if('NMWmc'!==_0x1021('0x146')){function _0x13d5d6(){_0xf215eb[_0x1021('0x1ac')]((_0x5a89b5,_0x2f4e46)=>{const _0xcf2b2f=_0x5a89b5[_0x1021('0xc5')],_0x3f4f77=_0x2f4e46['priority'];if(_0xcf2b2f!==_0x3f4f77)return _0x3f4f77-_0xcf2b2f;return _0x5a89b5-_0x2f4e46;});}}else this['_statusWindow'][_0x1021('0x283')](this[_0x1021('0x1da')](0x0));}},Window_SkillList[_0x1021('0x1a9')][_0x1021('0x56')]=function(_0x3b1f9a){if(!_0x3b1f9a)return VisuMZ[_0x1021('0x29f')][_0x1021('0x3c')][_0x1021('0x28f')](this,_0x3b1f9a);if(!this[_0x1021('0x5')](_0x3b1f9a))return![];if(!this[_0x1021('0x208')](_0x3b1f9a))return![];if(!this['checkShowHideJS'](_0x3b1f9a))return![];return!![];},Window_SkillList[_0x1021('0x1a9')]['checkSkillTypeMatch']=function(_0x547825){return DataManager[_0x1021('0xdc')](_0x547825)[_0x1021('0x17c')](this[_0x1021('0x255')]);},Window_SkillList[_0x1021('0x1a9')][_0x1021('0x208')]=function(_0x4c6a62){if(!this[_0x1021('0x12e')](_0x4c6a62))return![];if(!this[_0x1021('0x24b')](_0x4c6a62))return![];if(!this['checkShowHideSkillNotetags'](_0x4c6a62))return![];return!![];},Window_SkillList['prototype'][_0x1021('0x12e')]=function(_0x86e2){const _0x28fdbf=_0x86e2[_0x1021('0xf2')];if(_0x28fdbf[_0x1021('0x14e')](/<HIDE IN BATTLE>/i)&&$gameParty[_0x1021('0x20')]()){if(_0x1021('0x107')===_0x1021('0xe3')){function _0x418dc1(){if(_0x743c69[_0x1021('0x1fe')]())_0x330d29[_0x1021('0xe')](_0x1dd2e8);}}else return![];}else{if(_0x28fdbf['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()){if(_0x1021('0x2a2')!==_0x1021('0x2a2')){function _0x425ef7(){for(const _0x33b2d1 of _0x573b90){let _0x32da56=0x0,_0x342c64=0x0;if(_0x33b2d1[_0x1021('0x14e')](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x32da56=_0x2ce41f(_0x453998['$1']),_0x342c64=_0x3a3adf(_0x49ce55['$2']);else _0x33b2d1[_0x1021('0x14e')](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x32da56=_0x353760[_0x1021('0x26d')](_0x25de79['$1']),_0x342c64=_0x249ab7(_0x878ed7['$2']));_0x6bd97[_0x1021('0x25a')](_0x32da56,_0x342c64),this[_0x1021('0x14d')](_0x7b131e);}}}else return![];}else return!![];}},Window_SkillList[_0x1021('0x1a9')][_0x1021('0x24b')]=function(_0x2c552a){const _0x27ea94=_0x2c552a['note'];if(_0x27ea94['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1021('0x15b')!==_0x1021('0xbb')){const _0x228fe7=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x1481a3 of _0x228fe7){if(_0x1021('0x148')===_0x1021('0x148')){if(!$gameSwitches[_0x1021('0x2d')](_0x1481a3))return![];}else{function _0x1f6c4c(){if(!_0x31d624[_0x1021('0x29f')]['Settings']['Buffs'][_0x1021('0x242')])return;const _0x5841d1=_0x12ec3b[_0x1021('0x7a')](_0x131ba7);if(_0x5841d1===0x0)return;const _0x1f43e4=_0x423a31[_0x1021('0x1bd')](_0x31d4d1),_0x17b961=_0x17e9b9[_0x1021('0x1ae')],_0x49e35b=_0x5841d1>0x0?_0x2d6dd9[_0x1021('0x9c')]():_0x1234b5[_0x1021('0x2')]();this[_0x1021('0x1bb')](_0x49e35b),this[_0x1021('0xb9')]('rgba(0,\x200,\x200,\x201)'),this[_0x1021('0x194')][_0x1021('0x1f8')]=!![],this[_0x1021('0x194')][_0x1021('0x139')]=_0x7b6d97['SkillsStatesCore'][_0x1021('0xd4')]['Buffs']['TurnFontSize'],_0x4ab5ed+=_0x144886[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')][_0x1021('0x2bb')],_0x14a95c+=_0x5908bb[_0x1021('0x29f')]['Settings'][_0x1021('0x1c2')]['TurnOffsetY'],this[_0x1021('0x185')](_0x1f43e4,_0x56d54f,_0x4262f9,_0x17b961,_0x1021('0x12')),this[_0x1021('0x194')][_0x1021('0x1f8')]=![],this['resetFontSettings']();}}}return!![];}else{function _0x480e92(){return this[_0x1021('0x12d')][_0x5d5ba5]===_0x35fa41[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x1c2')]['StackBuffMax'];}}}if(_0x27ea94[_0x1021('0x14e')](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x145382=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x4f87de of _0x145382){if(_0x1021('0x13b')!==_0x1021('0x1e4')){if(!$gameSwitches[_0x1021('0x2d')](_0x4f87de))return![];}else{function _0x16662e(){try{_0x1c3dfa['SkillsStatesCore'][_0x1021('0xd4')]['States'][_0x1021('0x23b')][_0x1021('0x28f')](this,_0x47958b);}catch(_0x262e53){if(_0x46a2b4[_0x1021('0x1fe')]())_0x258570[_0x1021('0xe')](_0x262e53);}}}}return!![];}if(_0x27ea94['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('QVLZQ'===_0x1021('0xab')){function _0x12d961(){const _0x4e1e20=_0x1cb582['SkillsStatesCore'][_0x1021('0x55')][_0x1021('0x28f')](this);return _0x4e1e20[_0x1021('0x223')](0x0,0x1);}}else{const _0x23d718=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x6507f4 of _0x23d718){if('ZOOjp'===_0x1021('0xeb')){function _0x46714f(){_0xb9cb77[_0x1021('0x29f')][_0x1021('0x274')][_0x1021('0x28f')](this);if(this[_0x1021('0x0')])this[_0x1021('0x6')]();}}else{if($gameSwitches[_0x1021('0x2d')](_0x6507f4))return!![];}}return![];}}if(_0x27ea94['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x178c55=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x17ae73 of _0x178c55){if(!$gameSwitches['value'](_0x17ae73))return!![];}return![];}if(_0x27ea94['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1021('0x2bd')!==_0x1021('0x2bd')){function _0x3a8264(){_0x502291[_0x1021('0x59')](_0x9fbc0a,_0xa1f12e),this['makeSuccess'](_0xb2e07);}}else{const _0x13a8f7=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x14322d of _0x13a8f7){if(!$gameSwitches[_0x1021('0x2d')](_0x14322d))return!![];}return![];}}if(_0x27ea94[_0x1021('0x14e')](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd381e7=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x1af6c6 of _0xd381e7){if($gameSwitches[_0x1021('0x2d')](_0x1af6c6))return![];}return!![];}return!![];},Window_SkillList[_0x1021('0x1a9')][_0x1021('0x155')]=function(_0x4e6684){const _0x2e3bf0=_0x4e6684[_0x1021('0xf2')];if(_0x2e3bf0['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x505973=JSON[_0x1021('0x22')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5c46ee of _0x505973){if(_0x1021('0xf1')!==_0x1021('0x20c')){if(!this[_0x1021('0x0')][_0x1021('0x1a')](_0x5c46ee))return![];}else{function _0x222e59(){return _0x2e024b['uiInputPosition'];}}}return!![];}else{if(_0x2e3bf0[_0x1021('0x14e')](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x1021('0x251')===_0x1021('0x1cf')){function _0x3d7607(){return this['currentValueSkillsStatesCore']();}}else{const _0xc48171=RegExp['$1'][_0x1021('0x30')](',');for(const _0x3f2721 of _0xc48171){const _0xc75448=DataManager[_0x1021('0xbf')](_0xc75448);if(!_0xc75448)continue;if(!this[_0x1021('0x0')][_0x1021('0x1a')](_0xc75448))return![];}return!![];}}}if(_0x2e3bf0[_0x1021('0x14e')](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b417d=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x5be5e5 of _0x1b417d){if(!this[_0x1021('0x0')]['isLearnedSkill'](_0x5be5e5))return![];}return!![];}else{if(_0x2e3bf0[_0x1021('0x14e')](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x49e243=RegExp['$1'][_0x1021('0x30')](',');for(const _0x1a6c63 of _0x49e243){const _0x2878ae=DataManager[_0x1021('0xbf')](_0x2878ae);if(!_0x2878ae)continue;if(!this[_0x1021('0x0')][_0x1021('0x1a')](_0x2878ae))return![];}return!![];}}if(_0x2e3bf0[_0x1021('0x14e')](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1021('0x16')===_0x1021('0x16')){const _0x4a214a=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x10c1e9 of _0x4a214a){if(_0x1021('0x103')!==_0x1021('0x248')){if(this[_0x1021('0x0')]['isLearnedSkill'](_0x10c1e9))return!![];}else{function _0x3ec819(){const _0x1ae845=_0x3b0aae['parse']('['+_0x1dd0a9['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0xd978cc of _0x1ae845){if(!_0x1b63cf[_0x1021('0x2d')](_0xd978cc))return![];}return!![];}}}return![];}else{function _0xfaa218(){_0x17705a(_0x1021('0xdf')[_0x1021('0x4b')](_0x5cd45d,_0x14c63a)),_0x2ce2f6[_0x1021('0x224')]();}}}else{if(_0x2e3bf0[_0x1021('0x14e')](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x1021('0x7e')!==_0x1021('0x1e8')){const _0x429cf0=RegExp['$1'][_0x1021('0x30')](',');for(const _0x59993a of _0x429cf0){const _0x4e34af=DataManager[_0x1021('0xbf')](_0x4e34af);if(!_0x4e34af)continue;if(this[_0x1021('0x0')][_0x1021('0x1a')](_0x4e34af))return!![];}return![];}else{function _0x4017b9(){const _0x496b3d=_0x474ab1[_0x1021('0x29f')],_0x1bd8f0=[_0x1021('0x18f'),_0x1021('0x26a'),_0x1021('0x183'),_0x1021('0x47'),_0x1021('0x140'),'stateTpSlipHealJS'];for(const _0x10562a of _0x1bd8f0){_0x496b3d[_0x10562a][_0x4db366]&&_0x496b3d[_0x10562a][_0x1950a6]['call'](this,_0x2ca71f);}}}}}if(_0x2e3bf0['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1021('0x284')===_0x1021('0x284')){const _0x86c85f=JSON['parse']('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x421083 of _0x86c85f){if(!this[_0x1021('0x0')][_0x1021('0x1a')](_0x421083))return!![];}return![];}else{function _0x25b431(){return _0x1dbefb[_0x1021('0x292')]&&_0x16f439[_0x1021('0x1a9')][_0x1021('0x12c')][_0x1021('0x28f')](this);}}}else{if(_0x2e3bf0[_0x1021('0x14e')](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4340f7=RegExp['$1'][_0x1021('0x30')](',');for(const _0x3995f8 of _0x4340f7){if(_0x1021('0x200')!==_0x1021('0x200')){function _0x3539c3(){if(!_0x992eea)return;_0x10e46c['prototype'][_0x1021('0x216')]['call'](this,_0xd7b35f,_0x5862a6,_0xd9ddc7,_0x39fc0c);}}else{const _0x3b81cc=DataManager[_0x1021('0xbf')](_0x3b81cc);if(!_0x3b81cc)continue;if(!this[_0x1021('0x0')]['isLearnedSkill'](_0x3b81cc))return!![];}}return![];}}if(_0x2e3bf0[_0x1021('0x14e')](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5c41d8=JSON[_0x1021('0x22')]('['+RegExp['$1'][_0x1021('0x14e')](/\d+/g)+']');for(const _0x5c410c of _0x5c41d8){if(!this['_actor'][_0x1021('0x1a')](_0x5c410c))return!![];}return![];}else{if(_0x2e3bf0[_0x1021('0x14e')](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x208b2c=RegExp['$1'][_0x1021('0x30')](',');for(const _0x16d9a5 of _0x208b2c){if('CWVRe'===_0x1021('0x243')){const _0x55a3f6=DataManager[_0x1021('0xbf')](_0x55a3f6);if(!_0x55a3f6)continue;if(!this[_0x1021('0x0')][_0x1021('0x1a')](_0x55a3f6))return!![];}else{function _0x1d4cce(){_0x42d332[_0x1021('0x1a9')][_0x1021('0x299')][_0x1021('0x28f')](this);const _0x5926f6=_0x3db5ad[_0x1021('0x29f')][_0x1021('0xd4')][_0x1021('0x138')][_0x1021('0x16e')];this[_0x1021('0x14c')][_0x1021('0x244')]=this[_0x1021('0x14c')][_0x1021('0x244')][_0x1021('0x297')](_0x5926f6);}}}return![];}}if(_0x2e3bf0[_0x1021('0x14e')](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x198a6d=JSON[_0x1021('0x22')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1c126f of _0x198a6d){if(this['_actor'][_0x1021('0x1a')](_0x1c126f))return![];}return!![];}else{if(_0x2e3bf0[_0x1021('0x14e')](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('AUoHW'===_0x1021('0x15')){function _0x5cbbab(){_0x445886['tpCost']=_0x55c00b(_0x1b11e9['$1']);}}else{const _0x19a88c=RegExp['$1']['split'](',');for(const _0x4924dc of _0x19a88c){const _0x17f443=DataManager[_0x1021('0xbf')](_0x17f443);if(!_0x17f443)continue;if(this[_0x1021('0x0')]['isLearnedSkill'](_0x17f443))return![];}return!![];}}}return!![];},Window_SkillList[_0x1021('0x1a9')][_0x1021('0x1ea')]=function(_0x3e32b0){const _0x5af43=_0x3e32b0[_0x1021('0xf2')],_0x424fd9=VisuMZ[_0x1021('0x29f')]['skillVisibleJS'];return _0x424fd9[_0x3e32b0['id']]?_0x424fd9[_0x3e32b0['id']][_0x1021('0x28f')](this,_0x3e32b0):!![];},Window_SkillList[_0x1021('0x1a9')][_0x1021('0x202')]=function(_0x1fcba2,_0x2300b7,_0x1d0031,_0x5ec4b4){Window_Base[_0x1021('0x1a9')][_0x1021('0x202')][_0x1021('0x28f')](this,this[_0x1021('0x0')],_0x1fcba2,_0x2300b7,_0x1d0031,_0x5ec4b4);},Window_SkillList[_0x1021('0x1a9')][_0x1021('0x5b')]=function(_0x24150a){this[_0x1021('0xf0')]=_0x24150a,this[_0x1021('0x164')]();},VisuMZ[_0x1021('0x29f')][_0x1021('0x238')]=Window_SkillList['prototype'][_0x1021('0xd6')],Window_SkillList[_0x1021('0x1a9')][_0x1021('0xd6')]=function(){VisuMZ[_0x1021('0x29f')][_0x1021('0x238')][_0x1021('0x28f')](this),this[_0x1021('0xf0')]&&this[_0x1021('0xf0')][_0x1021('0xec')]===Window_ShopStatus&&this[_0x1021('0xf0')][_0x1021('0x283')](this['item']());};