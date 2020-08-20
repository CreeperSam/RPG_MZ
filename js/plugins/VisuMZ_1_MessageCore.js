//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.00] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * - Control over general message settings.
 * - Auto-Color key words and/or database entries.
 * - Increases the text codes available to perform newer functions/effects.
 * - Ability for you to implement custom Text Code actions.
 * - Ability for you to implement custom Text code string replacements.
 * - Invoke a macro system to speed up the dev process.
 * - Add a Text Speed option to the Options menu.
 * - Add the ever so useful Word Wrap to your message system.
 * - Extend the choice selection process to your liking.
 * - The ability to enable/disable as well as show/hide certain choices.
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
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned. *Note1*
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned. *Note1*
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned. *Note1*
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start. Does not work with Word Wrap.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<x>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<x>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace 'x' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"shift","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"6","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"6","Classes:str":"4","Skills:str":"4","Items:str":"4","Weapons:str":"4","Armors:str":"4","Enemies:str":"2","States:str":"4","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(1);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default shift
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type num
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 6
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 6
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 2
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x4aaf=['textSpeedStatusText','maxChoiceWidth','mainFontSize','tEzte','yLxPC','clearCommandList','FontChangeValue','currentCommand','round','setHelpWindowWordWrap','nextEventCode','_messageCommonEvents','updateRelativePosition','Window_ChoiceList_updatePlacement','isWeapon','_wholeMoveDuration','isBusy','outputHeight','ConvertParams','ANY','nRAQO','adjustShowChoiceExtension','convertShowChoiceEscapeCodes','changeVolume','getChoiceListTextAlign','iconIndex','boxWidth','PWcmq','exec','textCodeResult','MessageWindowProperties','AddOption','processMessageCoreEscapeActions','Window_Options_makeCommandList','isContinuePrepareShowTextCommands','_textDelay','COLORLOCK','createContents','convertVariableEscapeCharacters','innerWidth','isAutoColorAffected','resetTextColor','LvhJs','setupItemChoice','setLastGainedItemData','hnAei','blt','maxFontSizeInLine','getTextAlignment','Armors','TEXTALIGNMENT','updateBackground','setBackground','setTextDelay','eMvkI','makeDeepCopy','processFsTextCode','ChoiceWindowTextAlign','floor','<B>','isMessageWindowWordWrap','clamp','<WORDWRAP>','prototype','value','currentExt','postConvertEscapeCharacters','DISABLE','_indent','placeCancelButton','setupNumInput','_commonEventId','sort','addLoadListener','WAIT','prepareShowTextFollowups','ARRAYFUNC','CreateAutoColorRegExpListEntries','list','nPrzA','changePaintOpacity','</I>','ULiOB','contentsBack','choice','isRTL','_moveTargetY','outLineColor','fontFace','moveTo','processCustomWait','choiceCols','fontBold','mainFontFace','processFontChangeItalic','anchor','TextCodeReplace','fontSize','OqDXx','launchMessageCommonEvent','easeIn','AddAutoColor','event','processAllText','calcMoveEasing','Window_Base_initialize','boxHeight','getChoiceListLineHeight','startWait','FastForwardKey','newPage','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','clearFlags','split','toUpperCase','PREVCOLOR','slice','WRAPBREAK','BpGGb','choicePositionType','MessageCore','qLOfg','COLORLOCK[1]','maxCols','type','onChoice','SHOW','MaxCols','tdxnV','true','</WORDWRAP>','updateDimensions','addCommand','MiInp','Window_Message_newPage','match','TextJS','textSizeEx','messageWindowRect','preConvertEscapeCharacters','ZvUTe','TkjPX','CNjOs','colSpacing','lastGainedObjectName','statusText','min','fontItalic','AutoColor','_moveTargetHeight','process_VisuMZ_MessageCore_TextCodes_Replace','ceil','convertBackslashCharacters','processWrapBreak','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Window_Help_refresh','</B>','addWrapBreakAfterPunctuation','clear','text','mWIbA','getChoiceListMaxRows','Classes','parse','makeCommandList','choiceTextAlign','textCodeCheck','getConfigValue','process_VisuMZ_MessageCore_AutoColor','convertEscapeCharacters','StretchDimmedBg','messageWidth','jauGH','max','refreshDimmerBitmap','registerActorNameAutoColorChanges','Window_Base_processEscapeCharacter','Default','indent','right','outlineColor','refresh','Window_Message_terminateMessage','_lastGainedItemData','paintOpacity','changeValue','WordWrap','STRUCT','registerResetRect','includes','call','processPreviousColor','KJqes','isPressed','processTextAlignmentX','C[%1]%2PREVCOLOR[0]','BOLD[0]','return\x200','pbtlw','HUMAm','cRcgf','bind','NlXPT','rUQtM','AutoColorBypassList','_centerMessageWindow','updateNameBoxMove','DCGMH','addContinuousShowChoices','[0]','setTextAlignment','maxCommands','lnCNA','onNewPageMessageCore','uFPEa','command101','TextCodeActions','Nkfnp','FxRxM','GGmIW','NameBoxWindowDefaultColor','Game_Map_updateEvents','onDatabaseLoaded','windowX','updateOffsetPosition','_moveEasingType','setupEvents','isChoiceVisible','add','prepareWordWrapEscapeCharacters','length','constructor','TextMacros','map','Name','false','IyQLc','height','processStoredAutoColorChanges','itemLineRect','_eventId','ENABLE','kVjRS','Window_Message_isTriggered','UWwAn','KtyRa','CENTERPICTURE','outlineWidth','uAsrs','rtl','isCommandEnabled','PICTURE','convertTextAlignmentEscapeCharacters','setChoiceListMaxRows','textSpeed','_textColorStack','mnlgv','<RIGHT>','processPyTextCode','TextColor','join','splice','Game_Party_initialize','drawing','messageCoreTextSpeed','_textDelayCount','States','update','FUHnZ','jdUJq','Window_Options_isVolumeSymbol','MessageRows','resetRect','isTriggered','IYVPH','_relativePosition','Vgnhv','helpWordWrap','Window_NameBox_refresh','choiceLineHeight','width','isChoiceEnabled','KIJVP','Scene_Options_maxCommands','_resetRect','messageCoreWindowX','processNewLine','TextSpeed','choices','isVolumeSymbol','Window_Options_statusText','return\x20\x27','itemRectWithPadding','updateMessageCommonEvents','replace','FontBiggerCap','LineBreakSpace','qTWrd','left','processActorNameAutoColorChanges','messageWordWrap','isItem','YUkww','Window_Message_processEscapeCharacter','_list','_nameBoxWindow','addContinuousShowTextCommands','partyMemberName','BOLD[1]','canMove','startX','processPxTextCode','_moveTargetWidth','YuBev','</LEFT>','Width','actorName','kSxny','<LEFT>','format','TEXTALIGNMENT','obtainEscapeString','messageRows','addMessageCoreCommands','itemPadding','indexOf','adjustShowChoiceDefault','setChoiceListLineHeight','setRelativePosition','faceWidth','_data','Scene_Boot_onDatabaseLoaded','eYXAH','loadPicture','_autoColorActorNames','convertFontSettingsEscapeCharacters','SortObjectByKeyLength','choiceRows','Enemies','resetPositionX','start','Weapons','YIMOU','csPUc','Game_Party_gainItem','HIDE','isWordWrapEnabled','processCommonEvent','substr','JXmxX','maxLines','Window_Options_changeVolume','prepareShowTextCommand','Actors','_moveDuration','drawBackPicture','setChoiceListMaxColumns','eSrXJ','Match','_index','pVUxC','hEbBt','zeOor','GETsD','QboFN','getLastGainedItemData','JOJZk','Items','processDrawPicture','Window_Base_changeTextColor','fNHLf','HelpWindow','lineHeight','addExtraShowChoices','ChoiceWindowProperties','name','_wordWrap','changeTextColor','setChoiceListTextAlign','GmZJp','status','_messageWindow','getPreservedFontSettings','MessageWindow','easeInOut','open','_dimmerSprite','i[%1]%2','drawTextEx','TEXTALIGNMENT[1]','<I>','tWETP','resetWordWrap','OcmRp','textSizeExTextAlignment','instantTextSpeed','processColorLock','makeFontSmaller','Window_Base_update','MessageTextDelay','Window_ChoiceList_windowX','windowWidth','TightWrap','processTextAlignmentChange','ARRAYJSON','quantity','_showFast','_colorLock','TextStr','convertTextMacros','addMessageCommonEvent','drawBackCenteredPicture','TextAlign','convertBaseEscapeCharacters','version','CreateAutoColorRegExpLists','resetFontSettings','commandSymbol','padding','isArmor','returnPreservedFontSettings','isColorLocked','puAln','MessageWidth','_textAlignment','RelativePXPY','parameters','numVisibleRows','NameBoxWindowOffsetY','ZqlGt','hwiyJ','TYQyp','ITALIC','isRunning','initMessageCore','<%1>','textSizeExWordWrap','updateEvents','addMessageCoreTextSpeedCommand','clearActorNameAutoColor','applyData','moveBy','COMMONEVENT','_cancelButton','Type','normalColor','setWaitMode','OXpJU','currencyUnit','setSpeakerName','</RIGHT>','getChoiceListMaxColumns','DDGLV','ConfigManager_applyData','Settings','setMessageWindowWordWrap','innerHeight','createTextState','easeOut','gainItem','convertLockColorsEscapeCharacters','process_VisuMZ_MessageCore_TextCodes_Action','ChoiceWindowMaxRows','setWordWrap','FontSmallerCap','_interpreter','changeTextSpeed','ARRAYSTR','activate','ALL','ConfigManager_makeData','process_VisuMZ_MessageCore_TextMacros','Game_Map_initialize','</CENTER>','adjustShowChoiceCancel','TEXTALIGNMENT[2]','push','zIiGm','toLowerCase','setFaceImage','ITALIC[1]','itemHeight','setMessageWindowRows','AutoColorRegExp','message','LAIuZ','setPositionType','CommonEvent','<CENTER>','TEXTALIGNMENT[0]','Window_Message_updatePlacement','ChoiceWindowLineHeight','isHelpWindowWordWrap','_MessageCoreSettings','obtainEscapeParam','COLORLOCK[0]','Game_Interpreter_setupChoices','processCharacter','clampPlacementPosition','setupChoices','</COLORLOCK>','applyDatabaseAutoColor','contents','updateMove','Game_System_initialize','makeFontBigger','convertMessageCoreEscapeActions','setup','default','_moveTargetX','ARRAYSTRUCT','EVAL','changeOutlineColor','Window_Message_clearFlags','inBattle','center','getMessageWindowRows','substring','setColorLock','processAutoColorWords','ChoiceWindowMaxCols','Skills','processEscapeCharacter','axtcp','VisuMZ_0_CoreEngine','ARRAYNUM','NameBoxWindowOffsetX','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','terminateMessage','Window_Base_processControlCharacter','processDrawCenteredPicture','registerCommand','PQrwk','code','<COLORLOCK>','sEkko','processFontChangeBold','JCTWs','JSON','index','pLifP','SWITCH','_texts','ryofj','databaseObjectName','updatePlacement','makeData','selectDefault','initialize','KEyjf','shift','getMessageWindowWidth','General','faceName','BOLD','startY','HtmhX','HwwFZ','filter','textColor','Window_NameBox_updatePlacement','exit','close','outputWidth','trim','Game_Map_setupEvents','stretchDimmerSprite','applyMoveEasing','actor','ITALIC[0]','description','Undefined','Window_Base_processNewLine','onProcessCharacter'];(function(_0x8d776e,_0x4aaf70){const _0x15be9a=function(_0x5a0e49){while(--_0x5a0e49){_0x8d776e['push'](_0x8d776e['shift']());}};_0x15be9a(++_0x4aaf70);}(_0x4aaf,0x89));const _0x15be=function(_0x8d776e,_0x4aaf70){_0x8d776e=_0x8d776e-0x0;let _0x15be9a=_0x4aaf[_0x8d776e];return _0x15be9a;};var label=_0x15be('0x22d'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x15be('0x1a5')](function(_0x8276d0){return _0x8276d0[_0x15be('0xf3')]&&_0x8276d0['description'][_0x15be('0x34')]('['+label+']');})[0x0];VisuMZ[label][_0x15be('0x13d')]=VisuMZ[label][_0x15be('0x13d')]||{},VisuMZ[_0x15be('0x1c7')]=function(_0x1c9949,_0x4200ae){for(const _0x5f5d9e in _0x4200ae){if(_0x15be('0xcd')!=='YIMOU'){function _0x4025fb(){const _0x260547=_0x313472[_0x15be('0x1a')]('['+_0x5ce27c['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x763e0f of _0x260547){if(!_0x2f014f[_0x15be('0x1f5')](_0x763e0f))return![];}return!![];}}else{if(_0x5f5d9e['match'](/(.*):(.*)/i)){if('hnAei'===_0x15be('0x1e2')){const _0x440eb6=String(RegExp['$1']),_0x29b140=String(RegExp['$2'])['toUpperCase']()[_0x15be('0x1ab')]();let _0x3dbfb6,_0x574bb1,_0x4d307f;switch(_0x29b140){case'NUM':_0x3dbfb6=_0x4200ae[_0x5f5d9e]!==''?Number(_0x4200ae[_0x5f5d9e]):0x0;break;case _0x15be('0x184'):_0x574bb1=_0x4200ae[_0x5f5d9e]!==''?JSON[_0x15be('0x1a')](_0x4200ae[_0x5f5d9e]):[],_0x3dbfb6=_0x574bb1[_0x15be('0x60')](_0x3a313e=>Number(_0x3a313e));break;case _0x15be('0x176'):_0x3dbfb6=_0x4200ae[_0x5f5d9e]!==''?eval(_0x4200ae[_0x5f5d9e]):null;break;case'ARRAYEVAL':_0x574bb1=_0x4200ae[_0x5f5d9e]!==''?JSON['parse'](_0x4200ae[_0x5f5d9e]):[],_0x3dbfb6=_0x574bb1[_0x15be('0x60')](_0x327c6b=>eval(_0x327c6b));break;case _0x15be('0x191'):_0x3dbfb6=_0x4200ae[_0x5f5d9e]!==''?JSON[_0x15be('0x1a')](_0x4200ae[_0x5f5d9e]):'';break;case _0x15be('0x10b'):_0x574bb1=_0x4200ae[_0x5f5d9e]!==''?JSON[_0x15be('0x1a')](_0x4200ae[_0x5f5d9e]):[],_0x3dbfb6=_0x574bb1[_0x15be('0x60')](_0x267875=>JSON[_0x15be('0x1a')](_0x267875));break;case'FUNC':_0x3dbfb6=_0x4200ae[_0x5f5d9e]!==''?new Function(JSON['parse'](_0x4200ae[_0x5f5d9e])):new Function(_0x15be('0x3c'));break;case _0x15be('0x201'):_0x574bb1=_0x4200ae[_0x5f5d9e]!==''?JSON['parse'](_0x4200ae[_0x5f5d9e]):[],_0x3dbfb6=_0x574bb1[_0x15be('0x60')](_0x15050d=>new Function(JSON[_0x15be('0x1a')](_0x15050d)));break;case'STR':_0x3dbfb6=_0x4200ae[_0x5f5d9e]!==''?String(_0x4200ae[_0x5f5d9e]):'';break;case _0x15be('0x14a'):_0x574bb1=_0x4200ae[_0x5f5d9e]!==''?JSON[_0x15be('0x1a')](_0x4200ae[_0x5f5d9e]):[],_0x3dbfb6=_0x574bb1[_0x15be('0x60')](_0x4e0d99=>String(_0x4e0d99));break;case _0x15be('0x32'):_0x4d307f=_0x4200ae[_0x5f5d9e]!==''?JSON[_0x15be('0x1a')](_0x4200ae[_0x5f5d9e]):{},_0x1c9949[_0x440eb6]={},VisuMZ[_0x15be('0x1c7')](_0x1c9949[_0x440eb6],_0x4d307f);continue;case _0x15be('0x175'):_0x574bb1=_0x4200ae[_0x5f5d9e]!==''?JSON[_0x15be('0x1a')](_0x4200ae[_0x5f5d9e]):[],_0x3dbfb6=_0x574bb1[_0x15be('0x60')](_0x26037c=>VisuMZ[_0x15be('0x1c7')]({},JSON['parse'](_0x26037c)));break;default:continue;}_0x1c9949[_0x440eb6]=_0x3dbfb6;}else{function _0xbb962(){_0x446352='';}}}}}return _0x1c9949;},(_0x4491ee=>{const _0x419ae2=_0x4491ee[_0x15be('0xee')];for(const _0x494e3d of dependencies){if(_0x15be('0x6b')==='UWwAn'){if(!Imported[_0x494e3d]){alert(_0x15be('0x186')[_0x15be('0xb6')](_0x419ae2,_0x494e3d)),SceneManager[_0x15be('0x1a8')]();break;}}else{function _0x2d40c7(){_0x4ae096[_0x15be('0x82')]();}}}const _0x568e1c=_0x4491ee[_0x15be('0x1b1')];if(_0x568e1c[_0x15be('0x23c')](/\[Version[ ](.*?)\]/i)){if(_0x15be('0x3f')===_0x15be('0x51')){function _0x523a2e(){this['_interpreter']=null;}}else{const _0x34b272=Number(RegExp['$1']);if(_0x34b272!==VisuMZ[label][_0x15be('0x115')]){if('osuGB'!=='osuGB'){function _0x521834(){this['_list'][_0x51a5c5]['parameters'][0x1]=_0x31e1cd['parameters'][0x1];}}else alert(_0x15be('0x224')['format'](_0x419ae2,_0x34b272)),SceneManager[_0x15be('0x1a8')]();}}}if(_0x568e1c['match'](/\[Tier[ ](\d+)\]/i)){if(_0x15be('0x1a4')!=='HwwFZ'){function _0x2f8658(){_0x42a782['addMessageCommonEvent'](_0x430f28);}}else{const _0x4ca045=Number(RegExp['$1']);if(_0x4ca045<tier){if(_0x15be('0x6c')!==_0x15be('0x1eb'))alert(_0x15be('0x11')[_0x15be('0xb6')](_0x419ae2,_0x4ca045,tier)),SceneManager[_0x15be('0x1a8')]();else{function _0x5c6948(){_0x5f3301[_0x15be('0x22d')][_0x15be('0xa6')][_0x15be('0x35')](this,_0x1307d3,_0x2bc15a);}}}else tier=Math[_0x15be('0x24')](_0x4ca045,tier);}}VisuMZ[_0x15be('0x1c7')](VisuMZ[label][_0x15be('0x13d')],_0x4491ee[_0x15be('0x121')]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x15be('0xee')],_0x15be('0xed'),_0xe52697=>{VisuMZ['ConvertParams'](_0xe52697,_0xe52697);const _0x8857e5=_0xe52697['LineHeight']||$gameSystem[_0x15be('0x220')]()||0x1,_0x29e74a=_0xe52697['MaxRows']||$gameSystem['getChoiceListMaxRows']()||0x1,_0x1e021d=_0xe52697[_0x15be('0x234')]||$gameSystem[_0x15be('0x13a')]()||0x1,_0x2d54de=_0xe52697[_0x15be('0x113')][_0x15be('0x155')]()||_0x15be('0x173');$gameSystem[_0x15be('0xbe')](_0x8857e5),$gameSystem[_0x15be('0x74')](_0x29e74a),$gameSystem[_0x15be('0xdb')](_0x1e021d),$gameSystem[_0x15be('0xf1')](_0x2d54de);}),PluginManager[_0x15be('0x18a')](pluginData[_0x15be('0xee')],_0x15be('0x1d3'),_0x5d29ff=>{VisuMZ[_0x15be('0x1c7')](_0x5d29ff,_0x5d29ff);const _0x1e8d47=_0x5d29ff['Rows']||$gameSystem[_0x15be('0x17b')]()||0x1,_0x39fdcb=_0x5d29ff[_0x15be('0xb2')]||$gameSystem[_0x15be('0x19e')]()||0x1;$gameTemp[_0x15be('0x44')]=_0x5d29ff['Center']||![];const _0x533e9a=_0x5d29ff['WordWrap'][_0x15be('0x155')]();$gameSystem[_0x15be('0x159')](_0x1e8d47),$gameSystem['setMessageWindowWidth'](_0x39fdcb),[_0x15be('0x236'),_0x15be('0x62')][_0x15be('0x34')](_0x533e9a)&&$gameSystem[_0x15be('0x13e')](eval(_0x533e9a));}),VisuMZ[_0x15be('0x22d')][_0x15be('0xc2')]=Scene_Boot[_0x15be('0x1f4')][_0x15be('0x55')],Scene_Boot[_0x15be('0x1f4')][_0x15be('0x55')]=function(){VisuMZ[_0x15be('0x22d')][_0x15be('0xc2')]['call'](this),this[_0x15be('0x144')](),this[_0x15be('0xd')](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x15be('0x1f')]();},VisuMZ['MessageCore'][_0x15be('0xc7')]=function(_0x25bff7){const _0x7d9c2b=VisuMZ[_0x15be('0x22d')]['Settings'][_0x25bff7];_0x7d9c2b[_0x15be('0x1fd')]((_0x34aceb,_0x3fb380)=>{if(!_0x34aceb||!_0x3fb380)return-0x1;return _0x3fb380['Match'][_0x15be('0x5d')]-_0x34aceb[_0x15be('0xdd')][_0x15be('0x5d')];});},Scene_Boot[_0x15be('0x1f4')][_0x15be('0x144')]=function(){VisuMZ[_0x15be('0x22d')][_0x15be('0xc7')](_0x15be('0x4f'));for(const _0x196582 of VisuMZ['MessageCore'][_0x15be('0x13d')][_0x15be('0x4f')]){_0x196582['Match']=_0x196582[_0x15be('0xdd')][_0x15be('0x227')](),_0x196582[_0x15be('0x1d')]=new RegExp(''+_0x196582[_0x15be('0xdd')],'gi'),_0x196582['textCodeResult']=''+_0x196582[_0x15be('0xdd')];if(_0x196582['Type']==='')_0x196582['textCodeResult']+=_0x15be('0x48');}},Scene_Boot[_0x15be('0x1f4')][_0x15be('0xd')]=function(){VisuMZ[_0x15be('0x22d')][_0x15be('0xc7')](_0x15be('0x215'));for(const _0x2f6282 of VisuMZ['MessageCore'][_0x15be('0x13d')]['TextCodeReplace']){_0x2f6282['textCodeCheck']=new RegExp(''+_0x2f6282[_0x15be('0xdd')]+_0x2f6282[_0x15be('0x133')],'gi');if(_0x2f6282['TextStr']!==''&&_0x2f6282[_0x15be('0x10f')]!==_0x15be('0x1b2')){if(_0x15be('0x182')!==_0x15be('0x182')){function _0x134ee4(){_0x21ddd8['y']=this['obtainEscapeParam'](_0x1fc989),_0x5e1bb2['MessageCore'][_0x15be('0x13d')][_0x15be('0x19f')][_0x15be('0x120')]&&(_0x147612['y']+=_0x3ec610[_0x15be('0x1a2')]);}}else _0x2f6282[_0x15be('0x1d2')]=new Function('return\x20\x27'+_0x2f6282[_0x15be('0x10f')][_0x15be('0x9d')](/\\/g,'')+'\x27');}else{if(_0x15be('0xf2')!==_0x15be('0xa5'))_0x2f6282[_0x15be('0x1d2')]=_0x2f6282[_0x15be('0x23d')];else{function _0x210696(){if(!_0x460133[_0x15be('0x1f5')](_0x2c08e8))return!![];}}}}},Scene_Boot[_0x15be('0x1f4')][_0x15be('0x14e')]=function(){for(const _0x3832b0 of VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x5f')]){if('YUbFH'!=='iwSOe'){_0x3832b0[_0x15be('0x1d')]=new RegExp('\x5c['+_0x3832b0['Match']+'\x5c]','gi');if(_0x3832b0[_0x15be('0x10f')]!==''&&_0x3832b0[_0x15be('0x10f')]!==_0x15be('0x1b2'))_0x3832b0[_0x15be('0x1d2')]=new Function('return\x20\x27'+_0x3832b0[_0x15be('0x10f')]['replace'](/\\/g,'')+'\x27');else{if(_0x15be('0xe2')!==_0x15be('0xe2')){function _0x17e7d3(){this['contents'][_0x15be('0xa')]=!!_0x4f9d27;}}else _0x3832b0['textCodeResult']=_0x3832b0[_0x15be('0x23d')];}}else{function _0x52491d(){_0x45aef4[_0x15be('0x22d')]['Window_Base_processAllText'][_0x15be('0x35')](this,_0x56fc1f);if(_0x3f999c[_0x15be('0x7e')])this[_0x15be('0x49')]('default');}}}},Scene_Boot[_0x15be('0x1f4')][_0x15be('0x1f')]=function(){const _0x990a66=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0xb')];VisuMZ[_0x15be('0x22d')][_0x15be('0x21a')]($dataClasses,_0x990a66['Classes']),VisuMZ[_0x15be('0x22d')][_0x15be('0x21a')]($dataSkills,_0x990a66[_0x15be('0x180')]),VisuMZ[_0x15be('0x22d')]['AddAutoColor']($dataItems,_0x990a66['Items']),VisuMZ[_0x15be('0x22d')][_0x15be('0x21a')]($dataWeapons,_0x990a66['Weapons']),VisuMZ[_0x15be('0x22d')][_0x15be('0x21a')]($dataArmors,_0x990a66[_0x15be('0x1e6')]),VisuMZ[_0x15be('0x22d')][_0x15be('0x21a')]($dataEnemies,_0x990a66['Enemies']),VisuMZ[_0x15be('0x22d')]['AddAutoColor']($dataStates,_0x990a66[_0x15be('0x81')]),VisuMZ[_0x15be('0x22d')][_0x15be('0x116')]();},VisuMZ[_0x15be('0x22d')][_0x15be('0x43')]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x15be('0x1f0'),_0x15be('0x13'),_0x15be('0xfd'),_0x15be('0x206'),_0x15be('0xb5'),_0x15be('0xb1'),_0x15be('0x15f'),_0x15be('0x150'),_0x15be('0x78'),_0x15be('0x139'),_0x15be('0x18d'),_0x15be('0x16b'),_0x15be('0x1f3'),_0x15be('0x237'),'<BR>','<LINE\x20BREAK>',_0x15be('0x72'),_0x15be('0x6d'),_0x15be('0x131'),_0x15be('0x1ff'),_0x15be('0x233'),_0x15be('0xd0'),_0x15be('0x68'),_0x15be('0x1f8'),_0x15be('0x194'),'SWITCHES',_0x15be('0x14c'),_0x15be('0x1c8')],VisuMZ['MessageCore']['AddAutoColor']=function(_0x3343e1,_0x53678f){if(_0x53678f<=0x0)return;const _0x54b61e=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0xb')][_0x15be('0x7a')+_0x53678f],_0xd744df=JsonEx[_0x15be('0x1ec')](_0x3343e1);for(const _0x302a59 of _0xd744df){if(!_0x302a59)continue;let _0x304d6d=_0x302a59[_0x15be('0xee')][_0x15be('0x1ab')]();if(VisuMZ[_0x15be('0x22d')]['AutoColorBypassList'][_0x15be('0x34')](_0x304d6d[_0x15be('0x227')]()))continue;_0x304d6d=_0x304d6d[_0x15be('0x9d')](/\\I\[(\d+)\]/gi,''),_0x304d6d=_0x304d6d['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x304d6d[_0x15be('0x5d')]<=0x0)continue;_0x54b61e['push'](_0x304d6d);}},VisuMZ[_0x15be('0x22d')][_0x15be('0x116')]=function(){VisuMZ[_0x15be('0x22d')][_0x15be('0x15a')]=[];for(let _0x3fc698=0x1;_0x3fc698<=0x1f;_0x3fc698++){const _0x1704d2='TextColor%1'[_0x15be('0xb6')](_0x3fc698),_0x19b1a4=VisuMZ['MessageCore'][_0x15be('0x13d')][_0x15be('0xb')][_0x1704d2];_0x19b1a4[_0x15be('0x1fd')]((_0x504c01,_0x513b47)=>{if(_0x15be('0x136')!==_0x15be('0x193')){if(!_0x504c01||!_0x513b47)return-0x1;return _0x513b47[_0x15be('0x5d')]-_0x504c01['length'];}else{function _0x1439c5(){this['setWordWrap'](![]);}}}),this[_0x15be('0x202')](_0x19b1a4,_0x3fc698);}},VisuMZ[_0x15be('0x22d')]['CreateAutoColorRegExpListEntries']=function(_0x2c7bbf,_0x3f7017){for(const _0xf889a0 of _0x2c7bbf){if(_0xf889a0[_0x15be('0x5d')]<=0x0)continue;if(_0xf889a0[_0x15be('0x23c')](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x127c40=new RegExp(_0xf889a0,'i');else var _0x127c40=new RegExp('\x5cb'+_0xf889a0+'\x5cb','g');VisuMZ['MessageCore'][_0x15be('0x15a')]['push']([_0x127c40,_0x15be('0x3a')['format'](_0x3f7017,_0xf889a0)]);}},ConfigManager[_0x15be('0x75')]=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x96')][_0x15be('0x28')],VisuMZ['MessageCore'][_0x15be('0x14d')]=ConfigManager[_0x15be('0x199')],ConfigManager[_0x15be('0x199')]=function(){const _0x425a09=VisuMZ[_0x15be('0x22d')][_0x15be('0x14d')]['call'](this);return _0x425a09[_0x15be('0x75')]=this[_0x15be('0x75')],_0x425a09;},VisuMZ['MessageCore'][_0x15be('0x13c')]=ConfigManager[_0x15be('0x12f')],ConfigManager[_0x15be('0x12f')]=function(_0x1024f5){VisuMZ['MessageCore'][_0x15be('0x13c')][_0x15be('0x35')](this,_0x1024f5);if(_0x15be('0x75')in _0x1024f5){if('lJcyR'===_0x15be('0xb4')){function _0x573e50(){const _0x785659=_0xe40d87,_0x188a32=this['isChoiceEnabled'](_0x8c18d);this[_0x15be('0x239')](_0x785659,_0x15be('0x209'),_0x188a32,_0x5c150d);}}else this[_0x15be('0x75')]=Number(_0x1024f5['textSpeed'])[_0x15be('0x1f2')](0x1,0xb);}else{if(_0x15be('0x8b')!==_0x15be('0x8b')){function _0x260e7e(){const _0x2acee2=this['getConfigValue']('textSpeed');return _0x2acee2>0xa?_0x417dcc['instantTextSpeed']:_0x2acee2;}}else this[_0x15be('0x75')]=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')]['TextSpeed'][_0x15be('0x28')];}},TextManager['messageCoreTextSpeed']=VisuMZ['MessageCore'][_0x15be('0x13d')][_0x15be('0x96')][_0x15be('0x61')],TextManager[_0x15be('0x102')]=VisuMZ['MessageCore'][_0x15be('0x13d')][_0x15be('0x96')]['Instant'],VisuMZ['MessageCore'][_0x15be('0x16f')]=Game_System['prototype'][_0x15be('0x19b')],Game_System[_0x15be('0x1f4')][_0x15be('0x19b')]=function(){VisuMZ['MessageCore'][_0x15be('0x16f')][_0x15be('0x35')](this),this[_0x15be('0x129')]();},Game_System[_0x15be('0x1f4')]['initMessageCore']=function(){const _0x4b75fb=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x19f')],_0x34de52=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x31')];this[_0x15be('0x164')]={'messageRows':_0x4b75fb[_0x15be('0x86')],'messageWidth':_0x4b75fb[_0x15be('0x11e')],'messageWordWrap':_0x34de52[_0x15be('0xf6')],'helpWordWrap':_0x34de52[_0x15be('0xea')],'choiceLineHeight':_0x4b75fb[_0x15be('0x162')],'choiceRows':_0x4b75fb[_0x15be('0x145')],'choiceCols':_0x4b75fb[_0x15be('0x17f')],'choiceTextAlign':_0x4b75fb[_0x15be('0x1ee')]};},Game_System[_0x15be('0x1f4')][_0x15be('0x17b')]=function(){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')]['messageRows']===undefined)this[_0x15be('0x129')]();return this[_0x15be('0x164')][_0x15be('0xb9')];},Game_System['prototype'][_0x15be('0x159')]=function(_0x5e573c){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')][_0x15be('0xb9')]===undefined)this[_0x15be('0x129')]();this[_0x15be('0x164')][_0x15be('0xb9')]=_0x5e573c||0x1;},Game_System[_0x15be('0x1f4')][_0x15be('0x19e')]=function(){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')][_0x15be('0x22')]===undefined)this[_0x15be('0x129')]();return this[_0x15be('0x164')][_0x15be('0x22')];},Game_System['prototype']['setMessageWindowWidth']=function(_0x318bc7){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')][_0x15be('0x22')]===undefined)this[_0x15be('0x129')]();this[_0x15be('0x164')][_0x15be('0x22')]=_0x318bc7||0x1;},Game_System[_0x15be('0x1f4')]['isMessageWindowWordWrap']=function(){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this['_MessageCoreSettings'][_0x15be('0xa3')]===undefined)this[_0x15be('0x129')]();return this[_0x15be('0x164')][_0x15be('0xa3')];},Game_System[_0x15be('0x1f4')][_0x15be('0x13e')]=function(_0x3b09ba){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')]['messageWordWrap']===undefined)this['initMessageCore']();this['_MessageCoreSettings']['messageWordWrap']=_0x3b09ba;},Game_System[_0x15be('0x1f4')][_0x15be('0x163')]=function(){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')][_0x15be('0x8c')]===undefined)this[_0x15be('0x129')]();return this[_0x15be('0x164')]['helpWordWrap'];},Game_System[_0x15be('0x1f4')][_0x15be('0x1be')]=function(_0x3df134){if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x15be('0x164')][_0x15be('0x8c')]===undefined)this[_0x15be('0x129')]();this[_0x15be('0x164')][_0x15be('0x8c')]=_0x3df134;},Game_System[_0x15be('0x1f4')][_0x15be('0x220')]=function(){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')][_0x15be('0x8e')]===undefined)this[_0x15be('0x129')]();return this[_0x15be('0x164')]['choiceLineHeight'];},Game_System[_0x15be('0x1f4')]['setChoiceListLineHeight']=function(_0x48fcce){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')][_0x15be('0x8e')]===undefined)this[_0x15be('0x129')]();this[_0x15be('0x164')][_0x15be('0x8e')]=_0x48fcce||0x1;},Game_System[_0x15be('0x1f4')][_0x15be('0x18')]=function(){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')][_0x15be('0xc8')]===undefined)this['initMessageCore']();return this[_0x15be('0x164')][_0x15be('0xc8')];},Game_System[_0x15be('0x1f4')][_0x15be('0x74')]=function(_0x5cdb55){if(this[_0x15be('0x164')]===undefined)this['initMessageCore']();if(this[_0x15be('0x164')][_0x15be('0xc8')]===undefined)this[_0x15be('0x129')]();this[_0x15be('0x164')][_0x15be('0xc8')]=_0x5cdb55||0x1;},Game_System[_0x15be('0x1f4')][_0x15be('0x13a')]=function(){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this['_MessageCoreSettings'][_0x15be('0x210')]===undefined)this[_0x15be('0x129')]();return this[_0x15be('0x164')]['choiceCols'];},Game_System[_0x15be('0x1f4')][_0x15be('0xdb')]=function(_0x8c9b4e){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')][_0x15be('0x210')]===undefined)this['initMessageCore']();this[_0x15be('0x164')][_0x15be('0x210')]=_0x8c9b4e||0x1;},Game_System[_0x15be('0x1f4')]['getChoiceListTextAlign']=function(){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')][_0x15be('0x1c')]===undefined)this[_0x15be('0x129')]();return this[_0x15be('0x164')][_0x15be('0x1c')];},Game_System[_0x15be('0x1f4')]['setChoiceListTextAlign']=function(_0x37f6b8){if(this[_0x15be('0x164')]===undefined)this[_0x15be('0x129')]();if(this[_0x15be('0x164')]['choiceTextAlign']===undefined)this['initMessageCore']();this[_0x15be('0x164')][_0x15be('0x1c')]=_0x37f6b8['toLowerCase']();},VisuMZ[_0x15be('0x22d')]['Game_Party_initialize']=Game_Party[_0x15be('0x1f4')][_0x15be('0x19b')],Game_Party[_0x15be('0x1f4')][_0x15be('0x19b')]=function(){VisuMZ[_0x15be('0x22d')]['Game_Party_initialize'][_0x15be('0x35')](this),this['initMessageCore']();},Game_Party[_0x15be('0x1f4')][_0x15be('0x129')]=function(){this[_0x15be('0x2e')]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x15be('0x1f4')][_0x15be('0xe4')]=function(){if(this[_0x15be('0x2e')]===undefined)this[_0x15be('0x129')]();return this[_0x15be('0x2e')];},Game_Party['prototype'][_0x15be('0x1e1')]=function(_0x34bc15,_0x55a31c){if(this[_0x15be('0x2e')]===undefined)this[_0x15be('0x129')]();if(!_0x34bc15)return;if(DataManager[_0x15be('0xa4')](_0x34bc15)){if(_0x15be('0x1b8')!==_0x15be('0xe5'))this[_0x15be('0x2e')][_0x15be('0x231')]=0x0;else{function _0x2d24ba(){_0x298798['x']=this[_0x15be('0x8f')]+_0x1241e4;}}}else{if(DataManager[_0x15be('0x1c3')](_0x34bc15))this[_0x15be('0x2e')][_0x15be('0x231')]=0x1;else DataManager[_0x15be('0x11a')](_0x34bc15)&&(this[_0x15be('0x2e')][_0x15be('0x231')]=0x2);}this[_0x15be('0x2e')]['id']=_0x34bc15['id'],this[_0x15be('0x2e')][_0x15be('0x10c')]=_0x55a31c;},VisuMZ[_0x15be('0x22d')][_0x15be('0xcf')]=Game_Party[_0x15be('0x1f4')][_0x15be('0x142')],Game_Party['prototype'][_0x15be('0x142')]=function(_0x4982ef,_0x599d5f,_0x81f8e0){VisuMZ[_0x15be('0x22d')][_0x15be('0xcf')][_0x15be('0x35')](this,_0x4982ef,_0x599d5f,_0x81f8e0),_0x599d5f>0x0&&this[_0x15be('0x1e1')](_0x4982ef,_0x599d5f);},VisuMZ['MessageCore'][_0x15be('0x14f')]=Game_Map[_0x15be('0x1f4')][_0x15be('0x19b')],Game_Map[_0x15be('0x1f4')][_0x15be('0x19b')]=function(){VisuMZ[_0x15be('0x22d')]['Game_Map_initialize'][_0x15be('0x35')](this),this[_0x15be('0x1c0')]=[];},VisuMZ[_0x15be('0x22d')][_0x15be('0x1ac')]=Game_Map[_0x15be('0x1f4')]['setupEvents'],Game_Map['prototype'][_0x15be('0x59')]=function(){VisuMZ[_0x15be('0x22d')][_0x15be('0x1ac')][_0x15be('0x35')](this),this['_messageCommonEvents']=[];},VisuMZ['MessageCore'][_0x15be('0x54')]=Game_Map['prototype']['updateEvents'],Game_Map[_0x15be('0x1f4')][_0x15be('0x12c')]=function(){VisuMZ['MessageCore']['Game_Map_updateEvents']['call'](this),this[_0x15be('0x9c')]();},Game_Map[_0x15be('0x1f4')][_0x15be('0x111')]=function(_0x355035){this[_0x15be('0x1c0')]=this['_messageCommonEvents']||[];const _0x3bccdf=this[_0x15be('0x148')]['_eventId'],_0x215059=new Game_MessageCommonEvent(_0x355035,_0x3bccdf);this[_0x15be('0x1c0')][_0x15be('0x153')](_0x215059);},Game_Map['prototype'][_0x15be('0x9c')]=function(){this[_0x15be('0x1c0')]=this[_0x15be('0x1c0')]||[];for(const _0x329cdc of this[_0x15be('0x1c0')]){if(!_0x329cdc[_0x15be('0x148')]){if(_0x15be('0xc3')!==_0x15be('0x4'))this['_messageCommonEvents']['remove'](_0x329cdc);else{function _0x27a858(){_0x572dec('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x15be('0xb6')](_0x4f4b42,_0x352e06)),_0x5d4b9c[_0x15be('0x1a8')]();}}}else _0x329cdc['update']();}},Game_Interpreter['prototype'][_0x15be('0x4e')]=function(_0x2cfd7d){if($gameMessage['isBusy']())return![];return this[_0x15be('0xd7')](_0x2cfd7d),this[_0x15be('0xa9')](_0x2cfd7d),this['prepareShowTextFollowups'](_0x2cfd7d),this[_0x15be('0x135')]('message'),!![];},Game_Interpreter[_0x15be('0x1f4')][_0x15be('0xd7')]=function(_0x27d665){$gameMessage[_0x15be('0x156')](_0x27d665[0x0],_0x27d665[0x1]),$gameMessage[_0x15be('0x1e9')](_0x27d665[0x2]),$gameMessage[_0x15be('0x15d')](_0x27d665[0x3]),$gameMessage[_0x15be('0x138')](_0x27d665[0x4]);},Game_Interpreter[_0x15be('0x1f4')][_0x15be('0xa9')]=function(_0xa395c6){while(this[_0x15be('0x1d7')]()){this[_0x15be('0xde')]++;if(this[_0x15be('0x1bc')]()[_0x15be('0x18c')]===0x191){if('ryofj'!==_0x15be('0x196')){function _0x1acc00(){_0xec3dc5=_0x14475d['replace'](_0x3c5d80[_0x15be('0x1d')],_0x4490f7['textCodeResult']),_0x506934=this[_0x15be('0x1db')](_0x4d8a33);}}else $gameMessage[_0x15be('0x5b')](this[_0x15be('0x1bc')]()[_0x15be('0x121')][0x0]);}if(this['isBreakShowTextCommands']())break;}},Game_Interpreter[_0x15be('0x1f4')][_0x15be('0x1d7')]=function(){if(this[_0x15be('0x1bf')]()===0x65&&$gameSystem[_0x15be('0x17b')]()>0x4){if('OqDXx'!==_0x15be('0x217')){function _0x216922(){this[_0x15be('0x1c0')]=this[_0x15be('0x1c0')]||[];const _0x23786c=this[_0x15be('0x148')][_0x15be('0x67')],_0x30b94f=new _0x4d92b7(_0x1373a2,_0x23786c);this[_0x15be('0x1c0')][_0x15be('0x153')](_0x30b94f);}}else return!![];}else return this[_0x15be('0x1bf')]()===0x191;},Game_Interpreter[_0x15be('0x1f4')]['isBreakShowTextCommands']=function(){return $gameMessage[_0x15be('0x195')][_0x15be('0x5d')]>=$gameSystem['getMessageWindowRows']()&&this[_0x15be('0x1bf')]()!==0x191;},Game_Interpreter['prototype'][_0x15be('0x200')]=function(_0x3b8781){switch(this['nextEventCode']()){case 0x66:this[_0x15be('0xde')]++,this[_0x15be('0x16a')](this[_0x15be('0x1bc')]()[_0x15be('0x121')]);break;case 0x67:this[_0x15be('0xde')]++,this[_0x15be('0x1fb')](this[_0x15be('0x1bc')]()[_0x15be('0x121')]);break;case 0x68:this['_index']++,this[_0x15be('0x1e0')](this[_0x15be('0x1bc')]()[_0x15be('0x121')]);break;}},VisuMZ[_0x15be('0x22d')][_0x15be('0x167')]=Game_Interpreter[_0x15be('0x1f4')][_0x15be('0x16a')],Game_Interpreter['prototype'][_0x15be('0x16a')]=function(_0x1e1a1c){_0x1e1a1c=this[_0x15be('0x47')](),VisuMZ['MessageCore']['Game_Interpreter_setupChoices'][_0x15be('0x35')](this,_0x1e1a1c);},Game_Interpreter[_0x15be('0x1f4')][_0x15be('0x47')]=function(){const _0x57cf64=this[_0x15be('0xde')],_0x17b3fe=[];let _0x3a5359=0x0;this[_0x15be('0xde')]++;while(this[_0x15be('0xde')]<this['_list'][_0x15be('0x5d')]){if(_0x15be('0x22b')==='wLiVz'){function _0x49efde(){const _0x2a0fb5=_0x3b7c48['parse']('['+_0x3b37eb['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x200e7d of _0x2a0fb5){if(!_0x1b0aff[_0x15be('0x1f5')](_0x200e7d))return!![];}return![];}}else{if(this[_0x15be('0x1bc')]()[_0x15be('0x29')]===this[_0x15be('0x1f9')]){if(this[_0x15be('0x1bc')]()[_0x15be('0x18c')]===0x194&&this[_0x15be('0x1bf')]()!==0x66)break;else{if(this[_0x15be('0x1bc')]()[_0x15be('0x18c')]===0x66)this[_0x15be('0x1ca')](_0x3a5359,this['currentCommand'](),_0x57cf64),this['_index']-=0x2;else this[_0x15be('0x1bc')]()[_0x15be('0x18c')]===0x192&&(this[_0x15be('0x1bc')]()[_0x15be('0x121')][0x0]=_0x3a5359,_0x3a5359++);}}this[_0x15be('0xde')]++;}}return this[_0x15be('0xde')]=_0x57cf64,this[_0x15be('0x1bc')]()[_0x15be('0x121')];},Game_Interpreter['prototype'][_0x15be('0x1ca')]=function(_0x433727,_0x381fa5,_0x35081d){this['adjustShowChoiceDefault'](_0x433727,_0x381fa5,_0x35081d),this[_0x15be('0x151')](_0x433727,_0x381fa5,_0x35081d),this[_0x15be('0xec')](_0x381fa5,_0x35081d);},Game_Interpreter[_0x15be('0x1f4')][_0x15be('0xbd')]=function(_0x407f11,_0x4f80b3,_0x7abb1a){if(_0x4f80b3[_0x15be('0x121')][0x2]<0x0)return;const _0x45e46c=_0x4f80b3[_0x15be('0x121')][0x2]+_0x407f11;this[_0x15be('0xa7')][_0x7abb1a][_0x15be('0x121')][0x2]=_0x45e46c;},Game_Interpreter[_0x15be('0x1f4')][_0x15be('0x151')]=function(_0x28a558,_0x375cea,_0x2ed92b){if(_0x375cea[_0x15be('0x121')][0x1]>=0x0){var _0x4a7ff6=_0x375cea['parameters'][0x1]+_0x28a558;this['_list'][_0x2ed92b][_0x15be('0x121')][0x1]=_0x4a7ff6;}else _0x375cea[_0x15be('0x121')][0x1]===-0x2&&(this[_0x15be('0xa7')][_0x2ed92b][_0x15be('0x121')][0x1]=_0x375cea['parameters'][0x1]);},Game_Interpreter[_0x15be('0x1f4')][_0x15be('0xec')]=function(_0x327ca9,_0x569095){for(const _0x3cfc9f of _0x327ca9[_0x15be('0x121')][0x0]){this[_0x15be('0xa7')][_0x569095][_0x15be('0x121')][0x0][_0x15be('0x153')](_0x3cfc9f);}this[_0x15be('0xa7')][_0x15be('0x7c')](this[_0x15be('0xde')]-0x1,0x2);};function Game_MessageCommonEvent(){this[_0x15be('0x19b')](...arguments);}Game_MessageCommonEvent[_0x15be('0x1f4')][_0x15be('0x19b')]=function(_0x2d1349,_0x6c9013){this[_0x15be('0x1fc')]=_0x2d1349,this['_eventId']=_0x6c9013||0x0,this[_0x15be('0x2c')]();},Game_MessageCommonEvent['prototype']['event']=function(){return $dataCommonEvents[this[_0x15be('0x1fc')]];},Game_MessageCommonEvent['prototype'][_0x15be('0x203')]=function(){return this[_0x15be('0x21b')]()[_0x15be('0x203')];},Game_MessageCommonEvent[_0x15be('0x1f4')][_0x15be('0x2c')]=function(){this['_interpreter']=new Game_Interpreter(),this[_0x15be('0x148')][_0x15be('0x172')](this[_0x15be('0x203')](),this['_eventId']);},Game_MessageCommonEvent[_0x15be('0x1f4')][_0x15be('0x82')]=function(){if(this[_0x15be('0x148')]){if(this[_0x15be('0x148')][_0x15be('0x128')]()){if('AoaZi'===_0x15be('0x3')){function _0x3e9721(){const _0x4c338c=this[_0x15be('0x165')](_0x5cab31);this[_0x15be('0x5e')]===_0x3dbfb7&&_0x3a428d[_0x15be('0x7e')]&&this['startWait'](_0x4c338c);}}else this['_interpreter'][_0x15be('0x82')]();}else{if('sEkko'===_0x15be('0x18e'))this[_0x15be('0x15')]();else{function _0x1fd36e(){if(!_0xc45b41||!_0x5e5005)return-0x1;return _0x3c5633['length']-_0x3b149e[_0x15be('0x5d')];}}}}},Game_MessageCommonEvent[_0x15be('0x1f4')][_0x15be('0x15')]=function(){this[_0x15be('0x148')]=null;},Scene_Message[_0x15be('0x1f4')][_0x15be('0x1')]=function(){const _0xd7e3f6=Math['min'](Graphics[_0x15be('0x8f')],$gameSystem[_0x15be('0x19e')]()),_0x322e1e=$gameSystem[_0x15be('0x17b')](),_0x420da9=this['calcWindowHeight'](_0x322e1e,![]),_0x162349=(Graphics[_0x15be('0x1cf')]-_0xd7e3f6)/0x2,_0x444557=0x0;return new Rectangle(_0x162349,_0x444557,_0xd7e3f6,_0x420da9);},VisuMZ[_0x15be('0x22d')][_0x15be('0x92')]=Scene_Options[_0x15be('0x1f4')][_0x15be('0x4a')],Scene_Options['prototype']['maxCommands']=function(){let _0x335233=VisuMZ[_0x15be('0x22d')][_0x15be('0x92')][_0x15be('0x35')](this);const _0x51d12e=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')];if(_0x51d12e[_0x15be('0x96')][_0x15be('0x1d4')]&&_0x51d12e[_0x15be('0x96')]['AdjustRect'])_0x335233++;return _0x335233;},VisuMZ[_0x15be('0x22d')][_0x15be('0x21e')]=Window_Base[_0x15be('0x1f4')][_0x15be('0x19b')],Window_Base[_0x15be('0x1f4')][_0x15be('0x19b')]=function(_0x2813e3){this[_0x15be('0x129')](_0x2813e3),VisuMZ[_0x15be('0x22d')][_0x15be('0x21e')][_0x15be('0x35')](this,_0x2813e3);},Window_Base[_0x15be('0x1f4')][_0x15be('0x129')]=function(_0x2ea44f){this['initTextAlignement'](),this[_0x15be('0xff')](),this[_0x15be('0x33')](_0x2ea44f);},Window_Base[_0x15be('0x1f4')]['initTextAlignement']=function(){this[_0x15be('0x49')]('default');},Window_Base[_0x15be('0x1f4')][_0x15be('0x49')]=function(_0x4772a9){if(this[_0x15be('0xd1')]())_0x4772a9=_0x15be('0x173');this[_0x15be('0x11f')]=_0x4772a9;},Window_Base['prototype'][_0x15be('0x1e5')]=function(){return this[_0x15be('0x11f')];},VisuMZ['MessageCore']['Window_Base_processAllText']=Window_Base[_0x15be('0x1f4')][_0x15be('0x21c')],Window_Base[_0x15be('0x1f4')]['processAllText']=function(_0x51928f){VisuMZ[_0x15be('0x22d')]['Window_Base_processAllText'][_0x15be('0x35')](this,_0x51928f);if(_0x51928f[_0x15be('0x7e')])this[_0x15be('0x49')](_0x15be('0x173'));},Window_Base[_0x15be('0x1f4')][_0x15be('0xff')]=function(){this[_0x15be('0x146')](![]);},Window_Base['prototype'][_0x15be('0xd1')]=function(){return this[_0x15be('0xef')];},Window_Base['prototype']['setWordWrap']=function(_0x4b6340){return this[_0x15be('0xef')]=_0x4b6340,'';},Window_Base[_0x15be('0x1f4')][_0x15be('0x33')]=function(_0x424772){this[_0x15be('0x93')]=JsonEx[_0x15be('0x1ec')](_0x424772);},Window_Base['prototype'][_0x15be('0x117')]=function(){this[_0x15be('0x16d')][_0x15be('0x20d')]=$gameSystem[_0x15be('0x212')](),this['contents'][_0x15be('0x216')]=$gameSystem[_0x15be('0x1b7')](),this['contents'][_0x15be('0x211')]=![],this[_0x15be('0x16d')]['fontItalic']=![],this['resetTextColor']();},Window_Base['prototype'][_0x15be('0x1de')]=function(){this[_0x15be('0xf0')](ColorManager[_0x15be('0x134')]()),this[_0x15be('0x177')](ColorManager[_0x15be('0x2b')]()),this[_0x15be('0x16d')][_0x15be('0x6e')]=0x3,this['setColorLock'](![]);},Window_Base[_0x15be('0x1f4')][_0x15be('0x17d')]=function(_0x5d0f20){this[_0x15be('0x10e')]=_0x5d0f20;},Window_Base[_0x15be('0x1f4')][_0x15be('0x11c')]=function(){return this[_0x15be('0x10e')];},Window_Base[_0x15be('0x1f4')]['isAutoColorAffected']=function(){return![];},Window_Base['prototype']['getPreservedFontSettings']=function(){const _0x7241d4=[_0x15be('0x20d'),_0x15be('0x216'),_0x15be('0x211'),_0x15be('0xa'),'textColor',_0x15be('0x20c'),'outlineWidth',_0x15be('0x2f')];let _0x59521a={};for(const _0x25e179 of _0x7241d4){_0x59521a[_0x25e179]=this[_0x15be('0x16d')][_0x25e179];}return _0x59521a;},Window_Base['prototype']['returnPreservedFontSettings']=function(_0x23d27f){for(const _0x1585fe in _0x23d27f){if(_0x15be('0x125')===_0x15be('0x125'))this[_0x15be('0x16d')][_0x1585fe]=_0x23d27f[_0x1585fe];else{function _0x50df95(){this[_0x15be('0x16d')][_0x15be('0x216')]+=_0x515c91['MessageCore'][_0x15be('0x13d')][_0x15be('0x19f')][_0x15be('0x1bb')],this[_0x15be('0x16d')][_0x15be('0x216')]=_0x43901a['min'](this[_0x15be('0x16d')][_0x15be('0x216')],_0x36008e[_0x15be('0x22d')]['Settings']['General'][_0x15be('0x9e')]);}}}},VisuMZ[_0x15be('0x22d')][_0x15be('0x105')]=Window_Base[_0x15be('0x1f4')]['update'],Window_Base['prototype']['update']=function(){VisuMZ[_0x15be('0x22d')]['Window_Base_update']['call'](this),this[_0x15be('0x16e')]();},Window_Base[_0x15be('0x1f4')][_0x15be('0xac')]=function(){return![];},Window_Base[_0x15be('0x1f4')][_0x15be('0x16e')]=function(){this['_moveDuration']>0x0&&(this[_0x15be('0xac')]()&&(this['x']=this[_0x15be('0x1ae')](this['x'],this[_0x15be('0x174')]),this['y']=this[_0x15be('0x1ae')](this['y'],this['_moveTargetY']),this[_0x15be('0x8f')]=this['applyMoveEasing'](this[_0x15be('0x8f')],this[_0x15be('0xaf')]),this[_0x15be('0x64')]=this[_0x15be('0x1ae')](this['height'],this[_0x15be('0xc')]),this['clampPlacementPosition']()),this[_0x15be('0xd9')]--);},Window_Base[_0x15be('0x1f4')][_0x15be('0x169')]=function(){this[_0x15be('0x8f')]=Math[_0x15be('0x9')](this['width'],Graphics[_0x15be('0x8f')]),this['height']=Math['min'](this[_0x15be('0x64')],Graphics[_0x15be('0x64')]);const _0x43f2c4=-(Math[_0x15be('0x1ef')](Graphics[_0x15be('0x8f')]-Graphics[_0x15be('0x1cf')])/0x2),_0x37cdaa=_0x43f2c4+Graphics['width']-this[_0x15be('0x8f')],_0x20624b=-(Math['floor'](Graphics['height']-Graphics[_0x15be('0x21f')])/0x2),_0x337451=_0x20624b+Graphics[_0x15be('0x64')]-this[_0x15be('0x64')];this['x']=this['x']['clamp'](_0x43f2c4,_0x37cdaa),this['y']=this['y'][_0x15be('0x1f2')](_0x20624b,_0x337451);},Window_Base[_0x15be('0x1f4')][_0x15be('0x1ae')]=function(_0x3e0501,_0x5488dd){const _0x4c0704=this[_0x15be('0xd9')],_0x4ba14d=this[_0x15be('0x1c4')],_0x583a00=this[_0x15be('0x21d')]((_0x4ba14d-_0x4c0704)/_0x4ba14d),_0x7185fd=this['calcMoveEasing']((_0x4ba14d-_0x4c0704+0x1)/_0x4ba14d),_0x14683b=(_0x3e0501-_0x5488dd*_0x583a00)/(0x1-_0x583a00);return _0x14683b+(_0x5488dd-_0x14683b)*_0x7185fd;},Window_Base[_0x15be('0x1f4')][_0x15be('0x21d')]=function(_0xdd9963){const _0x19476c=0x2;switch(this[_0x15be('0x58')]){case 0x0:return _0xdd9963;case 0x1:return this[_0x15be('0x219')](_0xdd9963,_0x19476c);case 0x2:return this[_0x15be('0x141')](_0xdd9963,_0x19476c);case 0x3:return this[_0x15be('0xf7')](_0xdd9963,_0x19476c);default:return Imported[_0x15be('0x183')]?VisuMZ[_0x15be('0x1ae')](_0xdd9963,this[_0x15be('0x58')]):_0xdd9963;}},Window_Base[_0x15be('0x1f4')][_0x15be('0x20e')]=function(_0x4c43b7,_0x1fa2fe,_0x31a52c,_0x22e615,_0x4eec44,_0x456676){this[_0x15be('0x174')]=_0x4c43b7,this[_0x15be('0x20b')]=_0x1fa2fe,this[_0x15be('0xaf')]=_0x31a52c||this[_0x15be('0x8f')],this[_0x15be('0xc')]=_0x22e615||this[_0x15be('0x64')],this[_0x15be('0xd9')]=_0x4eec44||0x1;if(this[_0x15be('0xd9')]<=0x0)this[_0x15be('0xd9')]=0x1;this[_0x15be('0x1c4')]=this[_0x15be('0xd9')],this['_moveEasingType']=_0x456676||0x0;},Window_Base[_0x15be('0x1f4')][_0x15be('0x130')]=function(_0x391b4b,_0xc9d3b1,_0x51024b,_0x2ed631,_0x3c0e2d,_0x2a16da){this['_moveTargetX']=this['x']+_0x391b4b,this['_moveTargetY']=this['y']+_0xc9d3b1,this[_0x15be('0xaf')]=this[_0x15be('0x8f')]+(_0x51024b||0x0),this[_0x15be('0xc')]=this[_0x15be('0x64')]+(_0x2ed631||0x0),this[_0x15be('0xd9')]=_0x3c0e2d||0x1;if(this[_0x15be('0xd9')]<=0x0)this['_moveDuration']=0x1;this['_wholeMoveDuration']=this[_0x15be('0xd9')],this[_0x15be('0x58')]=_0x2a16da||0x0;},Window_Base[_0x15be('0x1f4')][_0x15be('0x87')]=function(_0x5d17db,_0x4cda1c){this[_0x15be('0x20e')](this['_resetRect']['x'],this[_0x15be('0x93')]['y'],this[_0x15be('0x93')]['width'],this[_0x15be('0x93')][_0x15be('0x64')],_0x5d17db,_0x4cda1c);},VisuMZ[_0x15be('0x22d')][_0x15be('0xe8')]=Window_Base[_0x15be('0x1f4')][_0x15be('0xf0')],Window_Base[_0x15be('0x1f4')][_0x15be('0xf0')]=function(_0x7f006d){if(this[_0x15be('0x11c')]())return;this[_0x15be('0x76')]=this[_0x15be('0x76')]||[],this[_0x15be('0x76')]['unshift'](this[_0x15be('0x16d')][_0x15be('0x1a6')]),VisuMZ[_0x15be('0x22d')][_0x15be('0xe8')][_0x15be('0x35')](this,_0x7f006d);},Window_Base[_0x15be('0x1f4')][_0x15be('0x36')]=function(_0x595ee5){this[_0x15be('0x165')](_0x595ee5);if(this[_0x15be('0x11c')]())return;_0x595ee5[_0x15be('0x7e')]&&(this[_0x15be('0x76')]=this[_0x15be('0x76')]||[],this[_0x15be('0x16d')]['textColor']=this[_0x15be('0x76')][_0x15be('0x19d')]()||ColorManager[_0x15be('0x134')]());},Window_Base[_0x15be('0x1f4')][_0x15be('0x20')]=function(_0x1be7b6){return _0x1be7b6=this[_0x15be('0x110')](_0x1be7b6),_0x1be7b6=this[_0x15be('0xf')](_0x1be7b6),_0x1be7b6=this[_0x15be('0x1db')](_0x1be7b6),_0x1be7b6=this[_0x15be('0x2')](_0x1be7b6),_0x1be7b6=this['convertShowChoiceEscapeCodes'](_0x1be7b6),_0x1be7b6=this[_0x15be('0xc6')](_0x1be7b6),_0x1be7b6=this[_0x15be('0x73')](_0x1be7b6),_0x1be7b6=this['convertLockColorsEscapeCharacters'](_0x1be7b6),_0x1be7b6=this[_0x15be('0x114')](_0x1be7b6),_0x1be7b6=this['convertMessageCoreEscapeActions'](_0x1be7b6),_0x1be7b6=this['convertMessageCoreEscapeReplacements'](_0x1be7b6),_0x1be7b6=this['postConvertEscapeCharacters'](_0x1be7b6),_0x1be7b6=this[_0x15be('0x1db')](_0x1be7b6),_0x1be7b6=this[_0x15be('0x17e')](_0x1be7b6),_0x1be7b6=this[_0x15be('0x5c')](_0x1be7b6),_0x1be7b6;},Window_Base[_0x15be('0x1f4')][_0x15be('0x110')]=function(_0x1e62d0){for(const _0x4dbb84 of VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x5f')]){if(_0x15be('0x1b9')==='gHZEt'){function _0x4fc6e2(){if(_0x1a5cb9[_0x15be('0x1f5')](_0x20d596))return![];}}else{if(_0x1e62d0['match'](_0x4dbb84[_0x15be('0x1d')])){if(_0x15be('0x3d')===_0x15be('0x207')){function _0x48afbd(){const _0x2d980f=_0x1b7c53(_0x955679['$1']);_0x2d980f<_0x5f5869?(_0x820731(_0x15be('0x11')[_0x15be('0xb6')](_0x194d22,_0x2d980f,_0x163887)),_0x147229[_0x15be('0x1a8')]()):_0x4fb185=_0x1cc0fd[_0x15be('0x24')](_0x2d980f,_0x484fef);}}else _0x1e62d0=_0x1e62d0[_0x15be('0x9d')](_0x4dbb84[_0x15be('0x1d')],_0x4dbb84['textCodeResult'][_0x15be('0x40')](this));}}}return _0x1e62d0;},Window_Base[_0x15be('0x1f4')]['convertBackslashCharacters']=function(_0xfc3d27){return _0xfc3d27=_0xfc3d27['replace'](/\\/g,''),_0xfc3d27=_0xfc3d27[_0x15be('0x9d')](/\x1b\x1b/g,'\x5c'),_0xfc3d27;},Window_Base[_0x15be('0x1f4')]['convertVariableEscapeCharacters']=function(_0x586436){for(;;){if(_0x15be('0x6f')!==_0x15be('0x6f')){function _0x41321a(){_0x5128b9[_0x15be('0x22d')][_0x15be('0x14f')][_0x15be('0x35')](this),this[_0x15be('0x1c0')]=[];}}else{if(_0x586436[_0x15be('0x23c')](/\\V\[(\d+)\]/gi))_0x586436=_0x586436[_0x15be('0x9d')](/\\V\[(\d+)\]/gi,(_0x589058,_0x127ee2)=>this['convertBackslashCharacters'](String($gameVariables['value'](parseInt(_0x127ee2)))));else{if(_0x586436[_0x15be('0x23c')](/\x1bV\[(\d+)\]/gi))_0x586436=_0x586436[_0x15be('0x9d')](/\x1bV\[(\d+)\]/gi,(_0x27c068,_0x1c824a)=>this[_0x15be('0xf')](String($gameVariables[_0x15be('0x1f5')](parseInt(_0x1c824a)))));else{if(_0x15be('0x69')===_0x15be('0x69'))break;else{function _0x52530b(){for(const _0x4d788f in _0x10b981){this[_0x15be('0x16d')][_0x4d788f]=_0x3bd760[_0x4d788f];}}}}}}}return _0x586436;},Window_Base[_0x15be('0x1f4')]['preConvertEscapeCharacters']=function(_0x34ac47){return this['registerActorNameAutoColorChanges'](),_0x34ac47;},Window_Base[_0x15be('0x1f4')][_0x15be('0x1f7')]=function(_0x5b6bcc){return _0x5b6bcc;},Window_Base[_0x15be('0x1f4')][_0x15be('0x1cb')]=function(_0x1064c3){return _0x1064c3=_0x1064c3[_0x15be('0x9d')](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x1064c3=_0x1064c3[_0x15be('0x9d')](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x1064c3=_0x1064c3[_0x15be('0x9d')](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x1064c3;},Window_Base[_0x15be('0x1f4')]['convertFontSettingsEscapeCharacters']=function(_0x97c23d){return _0x97c23d=_0x97c23d[_0x15be('0x9d')](/<B>/gi,_0x15be('0xab')),_0x97c23d=_0x97c23d[_0x15be('0x9d')](/<\/B>/gi,_0x15be('0x3b')),_0x97c23d=_0x97c23d[_0x15be('0x9d')](/<I>/gi,_0x15be('0x157')),_0x97c23d=_0x97c23d[_0x15be('0x9d')](/<\/I>/gi,_0x15be('0x1b0')),_0x97c23d;},Window_Base[_0x15be('0x1f4')][_0x15be('0x73')]=function(_0x65f7ec){return _0x65f7ec=_0x65f7ec[_0x15be('0x9d')](/<LEFT>/gi,_0x15be('0xfc')),_0x65f7ec=_0x65f7ec[_0x15be('0x9d')](/<\/LEFT>/gi,_0x15be('0x160')),_0x65f7ec=_0x65f7ec[_0x15be('0x9d')](/<CENTER>/gi,_0x15be('0x152')),_0x65f7ec=_0x65f7ec[_0x15be('0x9d')](/<\/CENTER>/gi,_0x15be('0x160')),_0x65f7ec=_0x65f7ec['replace'](/<RIGHT>/gi,'TEXTALIGNMENT[3]'),_0x65f7ec=_0x65f7ec[_0x15be('0x9d')](/<\/RIGHT>/gi,_0x15be('0x160')),_0x65f7ec;},Window_Base[_0x15be('0x1f4')][_0x15be('0x143')]=function(_0x224c01){return _0x224c01=_0x224c01[_0x15be('0x9d')](/<COLORLOCK>/gi,_0x15be('0x22f')),_0x224c01=_0x224c01['replace'](/<\/COLORLOCK>/gi,_0x15be('0x166')),_0x224c01;},Window_Base[_0x15be('0x1f4')][_0x15be('0x114')]=function(_0x46101a){return _0x46101a=_0x46101a[_0x15be('0x9d')](/\x1bN\[(\d+)\]/gi,(_0x3837d7,_0x39dc28)=>this[_0x15be('0xb3')](parseInt(_0x39dc28))),_0x46101a=_0x46101a[_0x15be('0x9d')](/\x1bP\[(\d+)\]/gi,(_0x6ce958,_0xf0cf52)=>this[_0x15be('0xaa')](parseInt(_0xf0cf52))),_0x46101a=_0x46101a[_0x15be('0x9d')](/\x1bG/gi,TextManager[_0x15be('0x137')]),_0x46101a;},Window_Base[_0x15be('0x1f4')][_0x15be('0x171')]=function(_0x52d6fd){for(const _0x1ad3f5 of VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')]['TextCodeActions']){if(_0x15be('0x100')===_0x15be('0x100'))_0x52d6fd[_0x15be('0x23c')](_0x1ad3f5[_0x15be('0x1d')])&&(_0x52d6fd=_0x52d6fd[_0x15be('0x9d')](_0x1ad3f5[_0x15be('0x1d')],_0x1ad3f5[_0x15be('0x1d2')]),_0x52d6fd=this['convertVariableEscapeCharacters'](_0x52d6fd));else{function _0x16d63d(){this[_0x15be('0x20e')](this[_0x15be('0x93')]['x'],this['_positionType']*(_0x5bdcf8[_0x15be('0x21f')]-this[_0x15be('0x64')])/0x2,this[_0x15be('0x93')][_0x15be('0x8f')],this[_0x15be('0x93')][_0x15be('0x64')],_0x131e05,_0x477e0f);}}}return _0x52d6fd;},Window_Base[_0x15be('0x1f4')]['convertMessageCoreEscapeReplacements']=function(_0xe7b2f9){for(const _0xfaf181 of VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x215')]){_0xe7b2f9[_0x15be('0x23c')](_0xfaf181[_0x15be('0x1d')])&&(_0xe7b2f9=_0xe7b2f9[_0x15be('0x9d')](_0xfaf181['textCodeCheck'],_0xfaf181[_0x15be('0x1d2')][_0x15be('0x40')](this)),_0xe7b2f9=this[_0x15be('0x1db')](_0xe7b2f9));}return _0xe7b2f9;},Window_Base[_0x15be('0x1f4')]['actorName']=function(_0x1e442b){const _0x1e8026=_0x1e442b>=0x1?$gameActors[_0x15be('0x1af')](_0x1e442b):null,_0x4728c4=_0x1e8026?_0x1e8026[_0x15be('0xee')]():'',_0x51bab1=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0xb')][_0x15be('0xd8')];return this[_0x15be('0x1dd')]()&&_0x51bab1!==0x0?'C[%1]%2PREVCOLOR[0]'[_0x15be('0xb6')](_0x51bab1,_0x4728c4):_0x4728c4;},Window_Base[_0x15be('0x1f4')][_0x15be('0xaa')]=function(_0x27d363){const _0xb47853=_0x27d363>=0x1?$gameParty['members']()[_0x27d363-0x1]:null,_0x47c8cc=_0xb47853?_0xb47853[_0x15be('0xee')]():'',_0x4e023f=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0xb')][_0x15be('0xd8')];if(this[_0x15be('0x1dd')]()&&_0x4e023f!==0x0)return _0x15be('0x3a')[_0x15be('0xb6')](_0x4e023f,_0x47c8cc);else{if(_0x15be('0xdc')!==_0x15be('0xdc')){function _0x542d3c(){const _0x4f8add=_0x3250da>=0x1?_0xbdb7e7[_0x15be('0x1af')](_0x570133):null,_0x367e6b=_0x4f8add?_0x4f8add[_0x15be('0xee')]():'',_0x4caf53=_0x4a3867[_0x15be('0x22d')][_0x15be('0x13d')]['AutoColor'][_0x15be('0xd8')];return this[_0x15be('0x1dd')]()&&_0x4caf53!==0x0?_0x15be('0x3a')[_0x15be('0xb6')](_0x4caf53,_0x367e6b):_0x367e6b;}}else return _0x47c8cc;}},Window_Base[_0x15be('0x1f4')][_0x15be('0x17e')]=function(_0x5b16af){if(this[_0x15be('0x1dd')]()){if(_0x15be('0x190')===_0x15be('0x89')){function _0x25a710(){return this[_0x15be('0x1bf')]()===0x191;}}else _0x5b16af=this[_0x15be('0x65')](_0x5b16af),_0x5b16af=this[_0x15be('0xa2')](_0x5b16af);}return _0x5b16af;},Window_Base['prototype'][_0x15be('0x65')]=function(_0x438861){for(autoColor of VisuMZ['MessageCore'][_0x15be('0x15a')]){if(_0x15be('0xa0')!==_0x15be('0xa0')){function _0x5eaada(){_0x38921d['x']-=_0x50059e[_0x15be('0xad')];}}else _0x438861=_0x438861[_0x15be('0x9d')](autoColor[0x0],autoColor[0x1]);}return _0x438861;},Window_Base[_0x15be('0x1f4')][_0x15be('0x12e')]=function(){this[_0x15be('0xc5')]=[];},Window_Base[_0x15be('0x1f4')][_0x15be('0x26')]=function(){this[_0x15be('0x12e')]();const _0x56a2ba=VisuMZ[_0x15be('0x22d')]['Settings'][_0x15be('0xb')],_0xa311df=_0x56a2ba[_0x15be('0xd8')];if(_0xa311df<=0x0)return;for(const _0x1f934a of $gameActors[_0x15be('0xc1')]){if(_0x15be('0xe3')===_0x15be('0x52')){function _0x348c00(){return![];}}else{if(!_0x1f934a)continue;const _0x198461=_0x1f934a[_0x15be('0xee')](),_0x4b9270=new RegExp('\x5cb'+_0x198461+'\x5cb','g'),_0x54e434='C[%1]%2PREVCOLOR[0]'[_0x15be('0xb6')](_0xa311df,_0x198461);this[_0x15be('0xc5')][_0x15be('0x153')]([_0x4b9270,_0x54e434]);}}},Window_Base[_0x15be('0x1f4')][_0x15be('0xa2')]=function(_0x305765){if(this[_0x15be('0xc5')]===undefined){if(_0x15be('0xce')===_0x15be('0xce'))this['registerActorNameAutoColorChanges']();else{function _0x562aab(){if(this[_0x15be('0x164')]===_0x218cb3)this[_0x15be('0x129')]();if(this[_0x15be('0x164')][_0x15be('0xb9')]===_0x59f1e3)this[_0x15be('0x129')]();return this['_MessageCoreSettings'][_0x15be('0xb9')];}}}for(autoColor of this[_0x15be('0xc5')]){if(_0x15be('0x22e')!==_0x15be('0x13b'))_0x305765=_0x305765[_0x15be('0x9d')](autoColor[0x0],autoColor[0x1]);else{function _0x3374b1(){return _0x31bdd9;}}}return _0x305765;},Window_Base[_0x15be('0x1f4')][_0x15be('0x197')]=function(_0x567284,_0x475f51,_0x13d4e4){if(!_0x567284)return'';const _0x389b37=_0x567284[_0x475f51];let _0x505d6a='';if(_0x389b37&&_0x13d4e4&&_0x389b37[_0x15be('0x1ce')]){const _0x2ae525='i[%1]%2';_0x505d6a=_0x2ae525[_0x15be('0xb6')](_0x389b37[_0x15be('0x1ce')],_0x389b37['name']);}else{if(_0x389b37){if(_0x15be('0x204')==='thPxI'){function _0x1b4365(){return this[_0x15be('0xf4')]['x']+this[_0x15be('0xf4')][_0x15be('0x8f')]-this[_0x15be('0x108')]();}}else _0x505d6a=_0x389b37['name'];}else{if('kPEqD'===_0x15be('0x83')){function _0x58048b(){return _0x36733e=_0x8faee2['replace'](/<LEFT>/gi,this[_0x15be('0xbf')][_0x15be('0x40')](this,0x0)),_0x1d196=_0x3870e4[_0x15be('0x9d')](/<CENTER>/gi,this[_0x15be('0xbf')][_0x15be('0x40')](this,0x5)),_0x5ae840=_0x25463b[_0x15be('0x9d')](/<RIGHT>/gi,this[_0x15be('0xbf')][_0x15be('0x40')](this,0xa)),_0x1f9250=_0x58558b[_0x15be('0x9d')](/<POSITION:[ ](\d+)>/gi,(_0x4c5a27,_0x48968b)=>this[_0x15be('0xbf')](_0x3b3a6f(_0x48968b))),_0x4b8515=_0x3b94b3[_0x15be('0x9d')](/<\/LEFT>/gi,''),_0x3be427=_0x3bd41c['replace'](/<\/CENTER>/gi,''),_0x51543d=_0x117510['replace'](/<\/RIGHT>/gi,''),_0x32f816['prototype'][_0x15be('0x2')][_0x15be('0x35')](this,_0x592948);}}else _0x505d6a='';}}return this[_0x15be('0x1dd')]()&&(_0x505d6a=this[_0x15be('0x16c')](_0x505d6a,_0x567284)),_0x505d6a;},Window_Base[_0x15be('0x1f4')][_0x15be('0x7')]=function(_0xa70270){const _0x23fe98=$gameParty['getLastGainedItemData']();if(_0x23fe98['id']<0x0)return'';let _0x14ddeb=null;if(_0x23fe98[_0x15be('0x231')]===0x0)_0x14ddeb=$dataItems[_0x23fe98['id']];if(_0x23fe98[_0x15be('0x231')]===0x1)_0x14ddeb=$dataWeapons[_0x23fe98['id']];if(_0x23fe98['type']===0x2)_0x14ddeb=$dataArmors[_0x23fe98['id']];if(!_0x14ddeb)return'';return _0xa70270?_0x15be('0xfa')[_0x15be('0xb6')](_0x14ddeb[_0x15be('0x1ce')],_0x14ddeb[_0x15be('0xee')]):_0x14ddeb['name'];},Window_Base[_0x15be('0x1f4')]['lastGainedObjectQuantity']=function(){const _0x3498a9=$gameParty[_0x15be('0xe4')]();if(_0x3498a9['id']<=0x0)return'';return _0x3498a9['quantity'];},Window_Base[_0x15be('0x1f4')]['applyDatabaseAutoColor']=function(_0x5b41d6,_0x5c1aee){const _0x35a3d2=VisuMZ['MessageCore'][_0x15be('0x13d')][_0x15be('0xb')];let _0x3b85c4=0x0;if(_0x5c1aee===$dataActors)_0x3b85c4=_0x35a3d2[_0x15be('0xd8')];if(_0x5c1aee===$dataClasses)_0x3b85c4=_0x35a3d2[_0x15be('0x19')];if(_0x5c1aee===$dataSkills)_0x3b85c4=_0x35a3d2[_0x15be('0x180')];if(_0x5c1aee===$dataItems)_0x3b85c4=_0x35a3d2[_0x15be('0xe6')];if(_0x5c1aee===$dataWeapons)_0x3b85c4=_0x35a3d2[_0x15be('0xcc')];if(_0x5c1aee===$dataArmors)_0x3b85c4=_0x35a3d2['Armors'];if(_0x5c1aee===$dataEnemies)_0x3b85c4=_0x35a3d2[_0x15be('0xc9')];if(_0x5c1aee===$dataStates)_0x3b85c4=_0x35a3d2[_0x15be('0x81')];if(_0x3b85c4>0x0){if(_0x15be('0xd4')!==_0x15be('0x23a'))_0x5b41d6='C[%1]%2PREVCOLOR[0]'['format'](_0x3b85c4,_0x5b41d6);else{function _0x433f8c(){return _0x5c20dc=_0xa3194f[_0x15be('0x9d')](/<B>/gi,_0x15be('0xab')),_0x29895a=_0x555150['replace'](/<\/B>/gi,_0x15be('0x3b')),_0x52c910=_0x1ce82f[_0x15be('0x9d')](/<I>/gi,_0x15be('0x157')),_0xa1343c=_0x2b8ccd[_0x15be('0x9d')](/<\/I>/gi,'ITALIC[0]'),_0x443b5f;}}}return _0x5b41d6;},Window_Base[_0x15be('0x1f4')]['prepareWordWrapEscapeCharacters']=function(_0x322b70){_0x322b70=_0x322b70[_0x15be('0x9d')](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x5bcc9c,_0x5aa6f0)=>this['setWordWrap'](!![])),_0x322b70=_0x322b70['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x4b1b24,_0x423f89)=>this['setWordWrap'](![]));if(!this[_0x15be('0xd1')]())return _0x322b70;if(_0x322b70['length']<=0x0)return _0x322b70;return VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x31')][_0x15be('0x9f')]&&(_0x322b70=_0x322b70[_0x15be('0x9d')](/[\n\r]+/g,'\x20')),_0x322b70=this[_0x15be('0x14')](_0x322b70),_0x322b70=_0x322b70[_0x15be('0x226')]('\x20')[_0x15be('0x7b')]('WrapBreak[0]'),_0x322b70=_0x322b70[_0x15be('0x9d')](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x322b70=_0x322b70[_0x15be('0x9d')](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x322b70;},Window_Base[_0x15be('0x1f4')][_0x15be('0x14')]=function(_0x2d3078){return _0x2d3078;},VisuMZ[_0x15be('0x22d')][_0x15be('0x1b3')]=Window_Base[_0x15be('0x1f4')]['processNewLine'],Window_Base[_0x15be('0x1f4')][_0x15be('0x95')]=function(_0x1f671f){VisuMZ[_0x15be('0x22d')][_0x15be('0x1b3')][_0x15be('0x35')](this,_0x1f671f),this[_0x15be('0x39')](_0x1f671f);},VisuMZ[_0x15be('0x22d')][_0x15be('0x188')]=Window_Base[_0x15be('0x1f4')]['processControlCharacter'],Window_Base[_0x15be('0x1f4')]['processControlCharacter']=function(_0x556b26,_0x42ccbf){VisuMZ[_0x15be('0x22d')][_0x15be('0x188')][_0x15be('0x35')](this,_0x556b26,_0x42ccbf),_0x42ccbf==='WrapBreak[0]'&&this[_0x15be('0x10')](_0x556b26);},Window_Base[_0x15be('0x1f4')][_0x15be('0xb8')]=function(_0x397849){var _0x37c751=/^\<(.*?)\>/[_0x15be('0x1d1')](_0x397849[_0x15be('0x16')]['slice'](_0x397849['index']));return _0x37c751?(_0x397849['index']+=_0x37c751[0x0][_0x15be('0x5d')],String(_0x37c751[0x0][_0x15be('0x229')](0x1,_0x37c751[0x0][_0x15be('0x5d')]-0x1))):'';},VisuMZ[_0x15be('0x22d')][_0x15be('0x27')]=Window_Base[_0x15be('0x1f4')][_0x15be('0x181')],Window_Base[_0x15be('0x1f4')][_0x15be('0x181')]=function(_0x1b1db1,_0x22643e){switch(_0x1b1db1){case'C':if(_0x22643e[_0x15be('0x7e')]){if(_0x15be('0x1a3')==='yjbbz'){function _0x2f9da5(){return _0x1f0b75[_0x15be('0x13a')]();}}else VisuMZ[_0x15be('0x22d')][_0x15be('0x27')]['call'](this,_0x1b1db1,_0x22643e);}else this[_0x15be('0x165')](_0x22643e);break;case'I':case'{':case'}':VisuMZ[_0x15be('0x22d')][_0x15be('0x27')][_0x15be('0x35')](this,_0x1b1db1,_0x22643e);break;case'FS':this[_0x15be('0x1ed')](_0x22643e);break;case'PX':this['processPxTextCode'](_0x22643e);break;case'PY':this[_0x15be('0x79')](_0x22643e);break;case _0x15be('0x1a1'):this['processFontChangeBold'](this[_0x15be('0x165')](_0x22643e));break;case _0x15be('0x6d'):this[_0x15be('0x189')](_0x22643e);break;case _0x15be('0x1d9'):this[_0x15be('0x103')](_0x22643e);break;case _0x15be('0x131'):this['processCommonEvent'](_0x22643e);break;case _0x15be('0x127'):this[_0x15be('0x213')](this[_0x15be('0x165')](_0x22643e));break;case'PICTURE':this[_0x15be('0xe7')](_0x22643e);break;case _0x15be('0x228'):this[_0x15be('0x36')](_0x22643e);break;case _0x15be('0xb7'):this[_0x15be('0x10a')](_0x22643e);break;case'WAIT':this['processCustomWait'](_0x22643e);break;case _0x15be('0x22a'):this[_0x15be('0x10')](_0x22643e);break;default:this[_0x15be('0x1d5')](_0x1b1db1,_0x22643e);}},Window_Base[_0x15be('0x1f4')]['processMessageCoreEscapeActions']=function(_0x40ded4,_0x2d99a6){for(const _0x3872db of VisuMZ['MessageCore'][_0x15be('0x13d')][_0x15be('0x4f')]){if('GLKEz'!==_0x15be('0x4d')){if(_0x3872db[_0x15be('0xdd')]===_0x40ded4){if(_0x3872db[_0x15be('0x133')]==='')this['obtainEscapeParam'](_0x2d99a6);_0x3872db['ActionJS'][_0x15be('0x35')](this,_0x2d99a6);if(this[_0x15be('0x5e')]===Window_Message){const _0x4eff67=_0x3872db[_0x15be('0x15e')]||0x0;if(_0x4eff67>0x0)this['launchMessageCommonEvent'](_0x4eff67);}}}else{function _0x2bddac(){_0x56fa5a['x']+=_0x33e6e9[_0x15be('0xad')];}}}},Window_Base[_0x15be('0x1f4')][_0x15be('0x170')]=function(){this['contents'][_0x15be('0x216')]+=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x19f')]['FontChangeValue'],this[_0x15be('0x16d')][_0x15be('0x216')]=Math[_0x15be('0x9')](this[_0x15be('0x16d')][_0x15be('0x216')],VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x19f')][_0x15be('0x9e')]);},Window_Base[_0x15be('0x1f4')][_0x15be('0x104')]=function(){this['contents'][_0x15be('0x216')]-=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x19f')]['FontChangeValue'],this[_0x15be('0x16d')]['fontSize']=Math[_0x15be('0x24')](this[_0x15be('0x16d')][_0x15be('0x216')],VisuMZ['MessageCore'][_0x15be('0x13d')][_0x15be('0x19f')][_0x15be('0x147')]);},Window_Base[_0x15be('0x1f4')]['processFsTextCode']=function(_0xd3015a){const _0xa235c2=this[_0x15be('0x165')](_0xd3015a);this[_0x15be('0x16d')]['fontSize']=_0xa235c2['clamp'](VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')]['General'][_0x15be('0x147')],VisuMZ['MessageCore'][_0x15be('0x13d')][_0x15be('0x19f')][_0x15be('0x9e')]);},Window_Base[_0x15be('0x1f4')][_0x15be('0x1e4')]=function(_0x531c3f){let _0x42035f=this[_0x15be('0x16d')][_0x15be('0x216')];const _0x3189c1=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x2b16c3=_0x3189c1[_0x15be('0x1d1')](_0x531c3f);if(!_0x2b16c3)break;const _0x1f850b=String(_0x2b16c3[0x1])['toUpperCase']();if(_0x1f850b==='{')this[_0x15be('0x170')]();else{if(_0x1f850b==='}'){if(_0x15be('0xfe')!==_0x15be('0xe9'))this[_0x15be('0x104')]();else{function _0x55ec6a(){return 0x4;}}}else{if(_0x1f850b==='FS'){if('PgvOZ'==='PgvOZ')this[_0x15be('0x16d')]['fontSize']=parseInt(_0x2b16c3[0x3])[_0x15be('0x1f2')](VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x19f')][_0x15be('0x147')],VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')]['General']['FontBiggerCap']);else{function _0x583ebb(){_0x1cda1a=_0x20f425['replace'](/\x1bV\[(\d+)\]/gi,(_0x1dc66d,_0x29984d)=>this[_0x15be('0xf')](_0x3d8be7(_0x2abcce['value'](_0x4c97f0(_0x29984d)))));}}}}}if(this['contents'][_0x15be('0x216')]>_0x42035f){if(_0x15be('0x235')===_0x15be('0x235'))_0x42035f=this['contents'][_0x15be('0x216')];else{function _0x56bd01(){this['clear']();}}}}return _0x42035f;},Window_Base[_0x15be('0x1f4')][_0x15be('0xae')]=function(_0xc375d0){_0xc375d0['x']=this[_0x15be('0x165')](_0xc375d0),VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x19f')][_0x15be('0x120')]&&(_0xc375d0['x']+=_0xc375d0[_0x15be('0xad')]);},Window_Base[_0x15be('0x1f4')][_0x15be('0x79')]=function(_0x31faac){_0x31faac['y']=this[_0x15be('0x165')](_0x31faac),VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x19f')][_0x15be('0x120')]&&(_0x31faac['y']+=_0x31faac[_0x15be('0x1a2')]);},Window_Base[_0x15be('0x1f4')][_0x15be('0x18f')]=function(_0x54e8ae){this[_0x15be('0x16d')]['fontBold']=!!_0x54e8ae;},Window_Base['prototype'][_0x15be('0x213')]=function(_0x108dd9){this[_0x15be('0x16d')][_0x15be('0xa')]=!!_0x108dd9;},Window_Base[_0x15be('0x1f4')][_0x15be('0x10a')]=function(_0x24690f){const _0x1f6792=this[_0x15be('0x165')](_0x24690f);if(!_0x24690f[_0x15be('0x7e')])return;switch(_0x1f6792){case 0x0:this['setTextAlignment']('default');return;break;case 0x1:this['setTextAlignment'](_0x15be('0xa1'));break;case 0x2:this[_0x15be('0x49')](_0x15be('0x17a'));break;case 0x3:this[_0x15be('0x49')]('right');break;}this[_0x15be('0x39')](_0x24690f);},Window_Base[_0x15be('0x1f4')][_0x15be('0x39')]=function(_0x4e5be7){if(!_0x4e5be7[_0x15be('0x7e')])return;if(_0x4e5be7[_0x15be('0x70')])return;if(this[_0x15be('0x1e5')]()===_0x15be('0x173'))return;let _0x3b42c2=_0x4e5be7[_0x15be('0x16')][_0x15be('0xbc')](_0x15be('0x1e7'),_0x4e5be7[_0x15be('0x192')]+0x1),_0x248c2b=_0x4e5be7[_0x15be('0x16')][_0x15be('0xbc')]('\x0a',_0x4e5be7[_0x15be('0x192')]+0x1);if(_0x3b42c2<0x0)_0x3b42c2=_0x4e5be7[_0x15be('0x16')][_0x15be('0x5d')]+0x1;if(_0x248c2b>0x0)_0x3b42c2=Math[_0x15be('0x9')](_0x3b42c2,_0x248c2b);const _0x2498a0=_0x4e5be7[_0x15be('0x16')][_0x15be('0x17c')](_0x4e5be7[_0x15be('0x192')],_0x3b42c2),_0x41b75d=this[_0x15be('0x101')](_0x2498a0)[_0x15be('0x8f')],_0x260bfb=_0x4e5be7[_0x15be('0x8f')]||this[_0x15be('0x1dc')],_0x460740=this[_0x15be('0x5e')]===Window_Message&&$gameMessage[_0x15be('0x1a0')]()!=='';switch(this[_0x15be('0x1e5')]()){case _0x15be('0xa1'):_0x4e5be7['x']=_0x4e5be7[_0x15be('0xad')];break;case _0x15be('0x17a'):_0x4e5be7['x']=_0x4e5be7[_0x15be('0xad')],_0x4e5be7['x']+=Math[_0x15be('0x1ef')]((_0x260bfb-_0x41b75d)/0x2);_0x460740&&(_0x4e5be7['x']-=_0x4e5be7['startX']/0x2);break;case _0x15be('0x2a'):_0x4e5be7['x']=_0x260bfb-_0x41b75d+_0x4e5be7[_0x15be('0xad')];if(_0x460740){if(_0x15be('0x154')===_0x15be('0x124')){function _0x1cd6c9(){this['contents'][_0x558338]=_0x3a6545[_0x1ce3eb];}}else _0x4e5be7['x']-=_0x4e5be7[_0x15be('0xad')];}break;}},Window_Base[_0x15be('0x1f4')][_0x15be('0x101')]=function(_0x45f9ff){_0x45f9ff=_0x45f9ff[_0x15be('0x9d')](/\x1b!/g,''),_0x45f9ff=_0x45f9ff[_0x15be('0x9d')](/\x1b\|/g,''),_0x45f9ff=_0x45f9ff[_0x15be('0x9d')](/\x1b\./g,'');const _0x2b9ec9=this[_0x15be('0x140')](_0x45f9ff,0x0,0x0,0x0),_0x5a9916=this[_0x15be('0xf5')]();return _0x2b9ec9[_0x15be('0x7e')]=![],this[_0x15be('0x21c')](_0x2b9ec9),this[_0x15be('0x11b')](_0x5a9916),{'width':_0x2b9ec9[_0x15be('0x1aa')],'height':_0x2b9ec9[_0x15be('0x1c6')]};},Window_Base[_0x15be('0x1f4')][_0x15be('0x10')]=function(_0xecf4cc){const _0x428fa1=(_0xecf4cc[_0x15be('0x70')]?-0x1:0x1)*this['textWidth']('\x20');_0xecf4cc['x']+=_0x428fa1;if(this[_0x15be('0x165')](_0xecf4cc)>0x0)_0xecf4cc['x']+=_0x428fa1;if(_0xecf4cc[_0x15be('0x70')])return;let _0x559e7f=_0xecf4cc[_0x15be('0x16')][_0x15be('0xbc')]('WrapBreak[0]',_0xecf4cc[_0x15be('0x192')]+0x1);_0x559e7f=Math[_0x15be('0x9')](_0x559e7f,_0xecf4cc[_0x15be('0x16')][_0x15be('0xbc')]('',_0xecf4cc[_0x15be('0x192')]+0x1));let _0x7bf248=_0xecf4cc['text'][_0x15be('0xbc')]('\x0a',_0xecf4cc[_0x15be('0x192')]+0x1);if(_0x559e7f<0x0)_0x559e7f=_0xecf4cc[_0x15be('0x16')][_0x15be('0x5d')]+0x1;if(_0x7bf248>0x0)_0x559e7f=Math[_0x15be('0x9')](_0x559e7f,_0x7bf248);const _0x3ce624=_0xecf4cc[_0x15be('0x16')]['substring'](_0xecf4cc[_0x15be('0x192')],_0x559e7f),_0x1b521d=this[_0x15be('0x12b')](_0x3ce624)[_0x15be('0x8f')];let _0x50cc13=_0xecf4cc['width']||this[_0x15be('0x1dc')];if(this[_0x15be('0x5e')]===Window_Message){const _0x274b0e=$gameMessage['faceName']()===''?0x0:ImageManager[_0x15be('0xc0')]+0x14;_0x50cc13-=_0x274b0e;if(VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x31')][_0x15be('0x109')]){if('uvuMN'==='fmXxv'){function _0x4a0f64(){return _0x503072[this[_0x15be('0x1fc')]];}}else _0x50cc13-=_0x274b0e;}}_0xecf4cc['x']+_0x1b521d>_0xecf4cc[_0x15be('0xad')]+_0x50cc13&&(_0xecf4cc['text']=_0xecf4cc['text'][_0x15be('0x229')](0x0,_0xecf4cc[_0x15be('0x192')])+'\x0a'+_0xecf4cc[_0x15be('0x16')][_0x15be('0xd3')](_0xecf4cc[_0x15be('0x192')]));},Window_Base[_0x15be('0x1f4')][_0x15be('0x12b')]=function(_0xce6018){const _0x1ea38f=this['createTextState'](_0xce6018,0x0,0x0,0x0),_0x289e0a=this['getPreservedFontSettings']();return _0x1ea38f[_0x15be('0x7e')]=![],this[_0x15be('0x146')](![]),this[_0x15be('0x21c')](_0x1ea38f),this[_0x15be('0x146')](!![]),this[_0x15be('0x11b')](_0x289e0a),{'width':_0x1ea38f['outputWidth'],'height':_0x1ea38f[_0x15be('0x1c6')]};},Window_Base[_0x15be('0x1f4')][_0x15be('0xd2')]=function(_0x56ecbd){return this[_0x15be('0x165')](_0x56ecbd);},Window_Base['prototype'][_0x15be('0xe7')]=function(_0x303dd1){const _0x7f135c=this[_0x15be('0xb8')](_0x303dd1)[_0x15be('0x226')](',');if(!_0x303dd1['drawing'])return;const _0x25825b=_0x7f135c[0x0][_0x15be('0x1ab')](),_0x39d975=_0x7f135c[0x1]||0x0,_0x285e8f=_0x7f135c[0x2]||0x0,_0x197826=ImageManager[_0x15be('0xc4')](_0x25825b),_0x12b3be=this[_0x15be('0x16d')][_0x15be('0x2f')];_0x197826['addLoadListener'](this['drawBackPicture'][_0x15be('0x40')](this,_0x197826,_0x303dd1['x'],_0x303dd1['y'],_0x39d975,_0x285e8f,_0x12b3be));},Window_Base[_0x15be('0x1f4')][_0x15be('0xda')]=function(_0x1e4959,_0x1039d8,_0x2669b8,_0x497c6e,_0x2133b8,_0x4bce34){_0x497c6e=_0x497c6e||_0x1e4959[_0x15be('0x8f')],_0x2133b8=_0x2133b8||_0x1e4959[_0x15be('0x64')],this[_0x15be('0x208')][_0x15be('0x2f')]=_0x4bce34,this['contentsBack'][_0x15be('0x1e3')](_0x1e4959,0x0,0x0,_0x1e4959[_0x15be('0x8f')],_0x1e4959[_0x15be('0x64')],_0x1039d8,_0x2669b8,_0x497c6e,_0x2133b8),this[_0x15be('0x208')][_0x15be('0x2f')]=0xff;},Window_Base[_0x15be('0x1f4')][_0x15be('0x189')]=function(_0x28bace){const _0x5f1781=this['obtainEscapeString'](_0x28bace)[_0x15be('0x226')](',');if(!_0x28bace['drawing'])return;const _0x1089f9=_0x5f1781[0x0]['trim'](),_0x1a1467=ImageManager['loadPicture'](_0x1089f9),_0x16de3c=JsonEx[_0x15be('0x1ec')](_0x28bace),_0x387d54=this[_0x15be('0x16d')][_0x15be('0x2f')];_0x1a1467[_0x15be('0x1fe')](this[_0x15be('0x112')]['bind'](this,_0x1a1467,_0x16de3c,_0x387d54));},Window_Base[_0x15be('0x1f4')][_0x15be('0x112')]=function(_0x46d427,_0x5b60c4,_0x201cff){const _0x596bda=_0x5b60c4[_0x15be('0x8f')]||this['innerWidth'],_0xe19116=this[_0x15be('0xde')]!==undefined?this[_0x15be('0x158')]():this[_0x15be('0x13f')],_0x7a556e=_0x596bda/_0x46d427[_0x15be('0x8f')],_0xe71923=_0xe19116/_0x46d427[_0x15be('0x64')],_0x349cd=Math[_0x15be('0x9')](_0x7a556e,_0xe71923,0x1),_0x51e027=this['_index']!==undefined?(this[_0x15be('0x9b')](0x0)[_0x15be('0x64')]-this[_0x15be('0xeb')]())/0x2:0x0,_0x4803b2=_0x46d427['width']*_0x349cd,_0x4ea6e3=_0x46d427[_0x15be('0x64')]*_0x349cd,_0x4c6b45=Math[_0x15be('0x1ef')]((_0x596bda-_0x4803b2)/0x2)+_0x5b60c4[_0x15be('0xad')],_0x1aa7f5=Math[_0x15be('0x1ef')]((_0xe19116-_0x4ea6e3)/0x2)+_0x5b60c4[_0x15be('0x1a2')]-_0x51e027*0x2;this[_0x15be('0x208')][_0x15be('0x2f')]=_0x201cff,this['contentsBack'][_0x15be('0x1e3')](_0x46d427,0x0,0x0,_0x46d427[_0x15be('0x8f')],_0x46d427[_0x15be('0x64')],_0x4c6b45,_0x1aa7f5,_0x4803b2,_0x4ea6e3),this[_0x15be('0x208')][_0x15be('0x2f')]=0xff;},Window_Base[_0x15be('0x1f4')]['processColorLock']=function(_0x339ed4){const _0xada2d8=this[_0x15be('0x165')](_0x339ed4);if(_0x339ed4[_0x15be('0x7e')])this[_0x15be('0x17d')](_0xada2d8>0x0);},Window_Base['prototype'][_0x15be('0x20f')]=function(_0x56e173){const _0x28317b=this[_0x15be('0x165')](_0x56e173);this[_0x15be('0x5e')]===Window_Message&&_0x56e173[_0x15be('0x7e')]&&this[_0x15be('0x221')](_0x28317b);},Window_Help['prototype'][_0x15be('0xff')]=function(){this[_0x15be('0x146')]($gameSystem[_0x15be('0x163')]());},Window_Help[_0x15be('0x1f4')]['isAutoColorAffected']=function(){return!![];},VisuMZ['MessageCore'][_0x15be('0x12')]=Window_Help[_0x15be('0x1f4')][_0x15be('0x2c')],Window_Help[_0x15be('0x1f4')][_0x15be('0x2c')]=function(){this[_0x15be('0x12e')](),VisuMZ[_0x15be('0x22d')]['Window_Help_refresh'][_0x15be('0x35')](this),this[_0x15be('0xff')]();},VisuMZ[_0x15be('0x22d')][_0x15be('0x1d6')]=Window_Options[_0x15be('0x1f4')][_0x15be('0x1b')],Window_Options[_0x15be('0x1f4')][_0x15be('0x1b')]=function(){VisuMZ[_0x15be('0x22d')][_0x15be('0x1d6')][_0x15be('0x35')](this),this[_0x15be('0xba')]();},Window_Options[_0x15be('0x1f4')][_0x15be('0xba')]=function(){if(VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x96')][_0x15be('0x1d4')]){if(_0x15be('0x23')!==_0x15be('0x23')){function _0x370d14(){if(this['_MessageCoreSettings']===_0x12d6db)this[_0x15be('0x129')]();if(this[_0x15be('0x164')][_0x15be('0x8c')]===_0x3c63f6)this[_0x15be('0x129')]();return this[_0x15be('0x164')][_0x15be('0x8c')];}}else this[_0x15be('0x12d')]();}},Window_Options[_0x15be('0x1f4')][_0x15be('0x12d')]=function(){const _0x5df50d=TextManager[_0x15be('0x7f')],_0x51f940=_0x15be('0x75');this['addCommand'](_0x5df50d,_0x51f940);},VisuMZ[_0x15be('0x22d')][_0x15be('0x99')]=Window_Options['prototype'][_0x15be('0x8')],Window_Options[_0x15be('0x1f4')][_0x15be('0x8')]=function(_0x4e624b){const _0x2999a5=this[_0x15be('0x118')](_0x4e624b);if(_0x2999a5===_0x15be('0x75'))return this[_0x15be('0x1b5')]();return VisuMZ[_0x15be('0x22d')][_0x15be('0x99')][_0x15be('0x35')](this,_0x4e624b);},VisuMZ['MessageCore'][_0x15be('0x85')]=Window_Options[_0x15be('0x1f4')][_0x15be('0x98')],Window_Options[_0x15be('0x1f4')][_0x15be('0x98')]=function(_0x53ffe4){if(_0x53ffe4===_0x15be('0x75'))return!![];return VisuMZ[_0x15be('0x22d')][_0x15be('0x85')][_0x15be('0x35')](this,_0x53ffe4);},Window_Options[_0x15be('0x1f4')][_0x15be('0x1b5')]=function(){const _0x3a6636=this[_0x15be('0x1e')](_0x15be('0x75'));if(_0x3a6636>0xa)return TextManager[_0x15be('0x102')];else{if(_0x15be('0x5')===_0x15be('0x5'))return _0x3a6636;else{function _0x47d7df(){return _0x15be('0x3a')['format'](_0x1962cd,_0x86cfd);}}}},VisuMZ[_0x15be('0x22d')][_0x15be('0xd6')]=Window_Options['prototype'][_0x15be('0x1cc')],Window_Options[_0x15be('0x1f4')]['changeVolume']=function(_0x434002,_0x14178b,_0x29fad7){if(_0x434002==='textSpeed')return this[_0x15be('0x149')](_0x434002,_0x14178b,_0x29fad7);VisuMZ[_0x15be('0x22d')]['Window_Options_changeVolume'][_0x15be('0x35')](this,_0x434002,_0x14178b,_0x29fad7);},Window_Options['prototype'][_0x15be('0x149')]=function(_0x331e79,_0x1e7bb9,_0x6f823c){const _0x400aac=this['getConfigValue'](_0x331e79),_0x4aafe4=0x1,_0x4a072c=_0x400aac+(_0x1e7bb9?_0x4aafe4:-_0x4aafe4);_0x4a072c>0xb&&_0x6f823c?this[_0x15be('0x30')](_0x331e79,0x1):this['changeValue'](_0x331e79,_0x4a072c[_0x15be('0x1f2')](0x1,0xb));},Window_Message[_0x15be('0x1f4')][_0x15be('0x25')]=function(){Window_Base[_0x15be('0x1f4')][_0x15be('0x25')][_0x15be('0x35')](this),VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x19f')][_0x15be('0x21')]&&this[_0x15be('0x1ad')]();},Window_Message[_0x15be('0x1f4')][_0x15be('0x1ad')]=function(){this[_0x15be('0xf9')]['x']=Math[_0x15be('0x1bd')](this[_0x15be('0x8f')]/0x2),this[_0x15be('0xf9')][_0x15be('0x214')]['x']=0.5,this[_0x15be('0xf9')]['scale']['x']=Graphics[_0x15be('0x8f')];},VisuMZ[_0x15be('0x22d')][_0x15be('0x178')]=Window_Message[_0x15be('0x1f4')][_0x15be('0x225')],Window_Message['prototype'][_0x15be('0x225')]=function(){VisuMZ[_0x15be('0x22d')][_0x15be('0x178')][_0x15be('0x35')](this),this[_0x15be('0x12e')](),this[_0x15be('0xff')](),this[_0x15be('0x17d')](![]),this[_0x15be('0x49')](_0x15be('0x173')),this[_0x15be('0x1ea')](VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x19f')][_0x15be('0x106')]);},Window_Message[_0x15be('0x1f4')][_0x15be('0xff')]=function(){this[_0x15be('0x146')]($gameSystem[_0x15be('0x1f1')]());},Window_Message[_0x15be('0x1f4')][_0x15be('0x1dd')]=function(){return!![];},Window_Message[_0x15be('0x1f4')][_0x15be('0x1ea')]=function(_0x6f06c0){const _0xad63a3=0xb-ConfigManager['textSpeed'];_0x6f06c0=Math[_0x15be('0x1bd')](_0x6f06c0*_0xad63a3),this[_0x15be('0x80')]=_0x6f06c0,this[_0x15be('0x1d8')]=_0x6f06c0;},VisuMZ[_0x15be('0x22d')][_0x15be('0x6a')]=Window_Message[_0x15be('0x1f4')][_0x15be('0x88')],Window_Message[_0x15be('0x1f4')][_0x15be('0x88')]=function(){return VisuMZ[_0x15be('0x22d')][_0x15be('0x6a')][_0x15be('0x35')](this)||Input[_0x15be('0x38')](VisuMZ[_0x15be('0x22d')]['Settings'][_0x15be('0x19f')][_0x15be('0x222')]);},VisuMZ[_0x15be('0x22d')]['Window_Message_updatePlacement']=Window_Message['prototype'][_0x15be('0x198')],Window_Message[_0x15be('0x1f4')][_0x15be('0x198')]=function(){VisuMZ[_0x15be('0x22d')][_0x15be('0x161')][_0x15be('0x35')](this),this[_0x15be('0x169')]();},VisuMZ['MessageCore'][_0x15be('0x23b')]=Window_Message[_0x15be('0x1f4')][_0x15be('0x223')],Window_Message[_0x15be('0x1f4')]['newPage']=function(_0x3472f5){this[_0x15be('0x4c')](_0x3472f5),VisuMZ[_0x15be('0x22d')][_0x15be('0x23b')][_0x15be('0x35')](this,_0x3472f5),this[_0x15be('0x1da')]();},Window_Message[_0x15be('0x1f4')]['onNewPageMessageCore']=function(_0x291b52){this[_0x15be('0x238')]();},VisuMZ[_0x15be('0x22d')][_0x15be('0x2d')]=Window_Message[_0x15be('0x1f4')]['terminateMessage'],Window_Message['prototype'][_0x15be('0x187')]=function(){VisuMZ[_0x15be('0x22d')][_0x15be('0x2d')][_0x15be('0x35')](this),this[_0x15be('0x225')]();},Window_Message[_0x15be('0x1f4')][_0x15be('0x238')]=function(){this['width']=$gameSystem[_0x15be('0x19e')](),this[_0x15be('0x8f')]=Math['min'](Graphics[_0x15be('0x8f')],this[_0x15be('0x8f')]);const _0x301928=$gameSystem[_0x15be('0x17b')]();this[_0x15be('0x64')]=SceneManager['_scene']['calcWindowHeight'](_0x301928,![]),this[_0x15be('0x64')]=Math[_0x15be('0x9')](Graphics[_0x15be('0x64')],this[_0x15be('0x64')]);if($gameTemp['_centerMessageWindow'])this['resetPositionX']();},Window_Message['prototype'][_0x15be('0xca')]=function(){this['x']=(Graphics[_0x15be('0x1cf')]-this[_0x15be('0x8f')])/0x2,$gameTemp['_centerMessageWindow']=undefined,this[_0x15be('0x169')]();},Window_Message[_0x15be('0x1f4')]['updateMove']=function(){const _0x2f9cc9={'x':this['x'],'y':this['y']};Window_Base['prototype'][_0x15be('0x16e')][_0x15be('0x35')](this),this[_0x15be('0x45')](_0x2f9cc9);},Window_Message[_0x15be('0x1f4')][_0x15be('0xac')]=function(){return!![];},Window_Message[_0x15be('0x1f4')][_0x15be('0x45')]=function(_0x4fff70){if(this[_0x15be('0xa8')]){if(_0x15be('0x1df')===_0x15be('0x1df'))this[_0x15be('0xa8')]['x']+=this['x']-_0x4fff70['x'],this[_0x15be('0xa8')]['y']+=this['y']-_0x4fff70['y'];else{function _0x6bd772(){const _0x58a11e=_0x5c2bcf['parse']('['+_0x357057['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x5526c7 of _0x58a11e){if(_0x53d4a6['value'](_0x5526c7))return!![];}return![];}}}},Window_Message[_0x15be('0x1f4')][_0x15be('0x87')]=function(_0x8fd901,_0xe5e145){this[_0x15be('0x20e')](this[_0x15be('0x93')]['x'],this['_positionType']*(Graphics['boxHeight']-this[_0x15be('0x64')])/0x2,this[_0x15be('0x93')][_0x15be('0x8f')],this[_0x15be('0x93')]['height'],_0x8fd901,_0xe5e145);},Window_Message[_0x15be('0x1f4')][_0x15be('0xd2')]=function(_0xb98f96){const _0x421f3a=Window_Base[_0x15be('0x1f4')]['processCommonEvent']['call'](this,_0xb98f96);this[_0x15be('0x218')](_0x421f3a);},Window_Message[_0x15be('0x1f4')][_0x15be('0x218')]=function(_0x1d113d){if($gameParty[_0x15be('0x179')]()){}else $gameMap[_0x15be('0x111')](_0x1d113d);},Window_Message[_0x15be('0x1f4')][_0x15be('0x168')]=function(_0x434c0a){this[_0x15be('0x80')]--;if(this[_0x15be('0x80')]<=0x0){if(_0x15be('0x3e')===_0x15be('0x1c9')){function _0x4848e4(){for(const _0x123bb6 of _0x395f46['MessageCore']['Settings'][_0x15be('0x5f')]){_0x1b5e93[_0x15be('0x23c')](_0x123bb6[_0x15be('0x1d')])&&(_0x4c1ba8=_0x5b4d0f[_0x15be('0x9d')](_0x123bb6[_0x15be('0x1d')],_0x123bb6['textCodeResult'][_0x15be('0x40')](this)));}return _0x43f617;}}else this[_0x15be('0x1b4')](_0x434c0a),Window_Base[_0x15be('0x1f4')][_0x15be('0x168')][_0x15be('0x35')](this,_0x434c0a);}},Window_Message[_0x15be('0x1f4')]['onProcessCharacter']=function(_0x378caf){this[_0x15be('0x80')]=this[_0x15be('0x1d8')];if(this[_0x15be('0x1d8')]<=0x0)this[_0x15be('0x10d')]=!![];},VisuMZ[_0x15be('0x22d')]['Window_Message_processEscapeCharacter']=Window_Message[_0x15be('0x1f4')][_0x15be('0x181')],Window_Message[_0x15be('0x1f4')]['processEscapeCharacter']=function(_0x206a70,_0x580e3a){if(!_0x580e3a[_0x15be('0x7e')]){if(_0x15be('0x91')==='vjINy'){function _0x56ccf1(){_0x1e5ec0[_0x15be('0x22d')][_0x15be('0x7d')][_0x15be('0x35')](this),this[_0x15be('0x129')]();}}else Window_Base[_0x15be('0x1f4')]['processEscapeCharacter'][_0x15be('0x35')](this,_0x206a70,_0x580e3a);}else VisuMZ[_0x15be('0x22d')][_0x15be('0xa6')][_0x15be('0x35')](this,_0x206a70,_0x580e3a);},Window_NameBox['prototype']['isAutoColorAffected']=function(){return![];},Window_NameBox[_0x15be('0x1f4')][_0x15be('0x1de')]=function(){Window_Base['prototype']['resetTextColor'][_0x15be('0x35')](this),this[_0x15be('0xf0')](this['defaultColor']());},Window_NameBox[_0x15be('0x1f4')]['defaultColor']=function(){const _0x52237f=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')]['General'][_0x15be('0x53')];return ColorManager[_0x15be('0x1a6')](_0x52237f);},VisuMZ[_0x15be('0x22d')][_0x15be('0x1a7')]=Window_NameBox[_0x15be('0x1f4')]['updatePlacement'],Window_NameBox[_0x15be('0x1f4')]['updatePlacement']=function(){VisuMZ[_0x15be('0x22d')][_0x15be('0x1a7')]['call'](this),this[_0x15be('0x1c1')](),this[_0x15be('0x57')](),this[_0x15be('0x169')]();},Window_NameBox[_0x15be('0x1f4')][_0x15be('0x2')]=function(_0x338757){return _0x338757=_0x338757[_0x15be('0x9d')](/<LEFT>/gi,this[_0x15be('0xbf')][_0x15be('0x40')](this,0x0)),_0x338757=_0x338757['replace'](/<CENTER>/gi,this[_0x15be('0xbf')][_0x15be('0x40')](this,0x5)),_0x338757=_0x338757[_0x15be('0x9d')](/<RIGHT>/gi,this[_0x15be('0xbf')][_0x15be('0x40')](this,0xa)),_0x338757=_0x338757['replace'](/<POSITION:[ ](\d+)>/gi,(_0x2c1770,_0xddc491)=>this['setRelativePosition'](parseInt(_0xddc491))),_0x338757=_0x338757['replace'](/<\/LEFT>/gi,''),_0x338757=_0x338757[_0x15be('0x9d')](/<\/CENTER>/gi,''),_0x338757=_0x338757[_0x15be('0x9d')](/<\/RIGHT>/gi,''),Window_Base[_0x15be('0x1f4')][_0x15be('0x2')][_0x15be('0x35')](this,_0x338757);},Window_NameBox[_0x15be('0x1f4')][_0x15be('0xbf')]=function(_0x167ade){return this[_0x15be('0x8a')]=_0x167ade,'';},Window_NameBox[_0x15be('0x1f4')]['updateRelativePosition']=function(){if($gameMessage[_0x15be('0x20a')]())return;this[_0x15be('0x8a')]=this[_0x15be('0x8a')]||0x0;const _0xce69e0=this[_0x15be('0xf4')],_0x3de3b8=Math[_0x15be('0x1ef')](_0xce69e0[_0x15be('0x8f')]*this[_0x15be('0x8a')]/0xa);this['x']=_0xce69e0['x']+_0x3de3b8-Math[_0x15be('0x1ef')](this[_0x15be('0x8f')]/0x2),this['x']=this['x'][_0x15be('0x1f2')](_0xce69e0['x'],_0xce69e0['x']+_0xce69e0[_0x15be('0x8f')]-this[_0x15be('0x8f')]);},Window_NameBox[_0x15be('0x1f4')][_0x15be('0x57')]=function(){if($gameMessage[_0x15be('0x20a')]())return;this[_0x15be('0x8a')]=this['_relativePosition']||0x0;const _0x3dde48=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')]['General'][_0x15be('0x185')],_0x37825f=VisuMZ[_0x15be('0x22d')][_0x15be('0x13d')][_0x15be('0x19f')][_0x15be('0x123')],_0x508c28=(0x5-this[_0x15be('0x8a')])/0x5;this['x']+=Math[_0x15be('0x1ef')](_0x3dde48*_0x508c28),this['y']+=_0x37825f;},VisuMZ[_0x15be('0x22d')][_0x15be('0x8d')]=Window_NameBox[_0x15be('0x1f4')][_0x15be('0x2c')],Window_NameBox[_0x15be('0x1f4')][_0x15be('0x2c')]=function(){this[_0x15be('0x8a')]=0x0,VisuMZ[_0x15be('0x22d')][_0x15be('0x8d')][_0x15be('0x35')](this);},Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0xd1')]=function(){return![];},Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x1dd')]=function(){return!![];},Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0xeb')]=function(){return $gameSystem[_0x15be('0x220')]();},Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x230')]=function(){return $gameSystem['getChoiceListMaxColumns']();},Window_ChoiceList['prototype'][_0x15be('0xcb')]=function(){this['updateBackground'](),this[_0x15be('0x2c')](),this[_0x15be('0x19a')](),this[_0x15be('0xf8')](),this[_0x15be('0x14b')]();},Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x2c')]=function(){this[_0x15be('0x1ba')](),this[_0x15be('0x1b')](),this[_0x15be('0xf4')]&&(this[_0x15be('0x198')](),this[_0x15be('0x1fa')]()),this[_0x15be('0x1da')](),Window_Selectable['prototype'][_0x15be('0x2c')][_0x15be('0x35')](this);},Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x1b')]=function(){const _0x5e3771=$gameMessage[_0x15be('0x97')]();let _0x15b42a=0x0;for(const _0x2f69f3 of _0x5e3771){if(this[_0x15be('0x5a')](_0x2f69f3)){const _0x20d0bd=_0x2f69f3,_0x201b7e=this[_0x15be('0x90')](_0x2f69f3);this[_0x15be('0x239')](_0x20d0bd,_0x15be('0x209'),_0x201b7e,_0x15b42a);}_0x15b42a++;}},Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x5a')]=function(_0x42532f){if(_0x42532f[_0x15be('0x23c')](/<HIDE>/i))return![];if(_0x42532f[_0x15be('0x23c')](/<SHOW>/i))return!![];if(_0x42532f['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5f26ba=JSON[_0x15be('0x1a')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x528cb3 of _0x5f26ba){if('hYjZA'!==_0x15be('0xe1')){if(!$gameSwitches[_0x15be('0x1f5')](_0x528cb3))return![];}else{function _0xd78f1d(){if(!_0x5c1607[_0x15be('0x1f5')](_0x191206))return!![];}}}return!![];}if(_0x42532f[_0x15be('0x23c')](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x15be('0x4b')==='QwZpj'){function _0x2700c0(){_0x12105f[_0x15be('0x156')](_0x1c62e9[0x0],_0x5138a1[0x1]),_0x1cd3b0[_0x15be('0x1e9')](_0x16e162[0x2]),_0x11cf79[_0x15be('0x15d')](_0x29e844[0x3]),_0x354a82[_0x15be('0x138')](_0x85917a[0x4]);}}else{const _0x2f6550=JSON[_0x15be('0x1a')]('['+RegExp['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x5c178b of _0x2f6550){if(!$gameSwitches[_0x15be('0x1f5')](_0x5c178b))return![];}return!![];}}if(_0x42532f['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x486ffa=JSON[_0x15be('0x1a')]('['+RegExp['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x10a40b of _0x486ffa){if(_0x15be('0x126')!==_0x15be('0x126')){function _0x5c1db4(){_0x85fb00['x']=-_0x10fa5a[_0x15be('0x8f')]-_0x1507fc;}}else{if($gameSwitches[_0x15be('0x1f5')](_0x10a40b))return!![];}}return![];}if(_0x42532f[_0x15be('0x23c')](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x15be('0x63')!==_0x15be('0x84')){const _0x48749b=JSON[_0x15be('0x1a')]('['+RegExp['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x38c577 of _0x48749b){if(!$gameSwitches[_0x15be('0x1f5')](_0x38c577))return!![];}return![];}else{function _0x1e27a0(){const _0x2e468d=this[_0x15be('0x66')](_0x5e18f7),_0xb82029=_0x16fcba[_0x15be('0x1cd')]()!==_0x15be('0x173')?'<%1>'['format'](_0x460f79[_0x15be('0x1cd')]()):'',_0x44eda8=_0xb82029+this['commandName'](_0x284ac2);this[_0x15be('0x205')](this['isCommandEnabled'](_0x5ce9a2)),this[_0x15be('0xfb')](_0x44eda8,_0x2e468d['x'],_0x2e468d['y'],_0x2e468d[_0x15be('0x8f')]);}}}if(_0x42532f[_0x15be('0x23c')](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32578d=JSON[_0x15be('0x1a')]('['+RegExp['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x54c9ac of _0x32578d){if(!$gameSwitches[_0x15be('0x1f5')](_0x54c9ac))return!![];}return![];}if(_0x42532f[_0x15be('0x23c')](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x36c21f=JSON[_0x15be('0x1a')]('['+RegExp['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x45c62f of _0x36c21f){if($gameSwitches[_0x15be('0x1f5')](_0x45c62f))return![];}return!![];}return!![];},Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x90')]=function(_0x497216){if(_0x497216[_0x15be('0x23c')](/<DISABLE>/i))return![];if(_0x497216[_0x15be('0x23c')](/<ENABLE>/i))return!![];if(_0x497216['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1a412e=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4006ac of _0x1a412e){if(!$gameSwitches[_0x15be('0x1f5')](_0x4006ac))return![];}return!![];}if(_0x497216[_0x15be('0x23c')](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2676ae=JSON[_0x15be('0x1a')]('['+RegExp['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x51ec9b of _0x2676ae){if(!$gameSwitches[_0x15be('0x1f5')](_0x51ec9b))return![];}return!![];}if(_0x497216['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x15be('0x41')!==_0x15be('0x19c')){const _0x45df48=JSON[_0x15be('0x1a')]('['+RegExp['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x471821 of _0x45df48){if(_0x15be('0x18b')===_0x15be('0x77')){function _0x4c8fd6(){_0x2a03d3[_0x15be('0x22d')][_0x15be('0x54')][_0x15be('0x35')](this),this['updateMessageCommonEvents']();}}else{if($gameSwitches[_0x15be('0x1f5')](_0x471821))return!![];}}return![];}else{function _0x1b7883(){return _0x1927c8['status']&&_0x3dc6ce[_0x15be('0x1b1')][_0x15be('0x34')]('['+_0x130aae+']');}}}if(_0x497216['match'](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x15be('0x42')===_0x15be('0xb0')){function _0x439ca5(){this[_0x15be('0x2e')]={'type':0x0,'id':0x0,'quantity':0x0};}}else{const _0x3d5b2c=JSON[_0x15be('0x1a')]('['+RegExp['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x2ead3a of _0x3d5b2c){if(!$gameSwitches[_0x15be('0x1f5')](_0x2ead3a))return!![];}return![];}}if(_0x497216[_0x15be('0x23c')](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('mWIbA'===_0x15be('0x17')){const _0x2191ec=JSON[_0x15be('0x1a')]('['+RegExp['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x5b3b36 of _0x2191ec){if(!$gameSwitches['value'](_0x5b3b36))return!![];}return![];}else{function _0x38014a(){_0x3f12cf[_0x15be('0x1d2')]=new _0x386a30(_0x15be('0x9a')+_0x398360[_0x15be('0x10f')][_0x15be('0x9d')](/\\/g,'')+'\x27');}}}if(_0x497216[_0x15be('0x23c')](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x124fdb=JSON[_0x15be('0x1a')]('['+RegExp['$1'][_0x15be('0x23c')](/\d+/g)+']');for(const _0x353708 of _0x124fdb){if($gameSwitches[_0x15be('0x1f5')](_0x353708))return![];}return!![];}return!![];},VisuMZ[_0x15be('0x22d')][_0x15be('0x1c2')]=Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x198')],Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x198')]=function(){VisuMZ[_0x15be('0x22d')]['Window_ChoiceList_updatePlacement'][_0x15be('0x35')](this),this[_0x15be('0x169')]();},Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x1fa')]=function(){if(!this[_0x15be('0x132')])return;const _0x3c0f24=0x8,_0x58275a=this[_0x15be('0x132')],_0x1b6dfc=this['x']+this['width'],_0x10d3b7=Math[_0x15be('0x1ef')]((Graphics[_0x15be('0x8f')]-Graphics[_0x15be('0x1cf')])/0x2);if(_0x1b6dfc>=Graphics[_0x15be('0x1cf')]+_0x10d3b7-_0x58275a[_0x15be('0x8f')]+_0x3c0f24){if(_0x15be('0x15c')!==_0x15be('0x1d0'))_0x58275a['x']=-_0x58275a[_0x15be('0x8f')]-_0x3c0f24;else{function _0xc07543(){return this[_0x15be('0x8a')]=_0x58ff1d,'';}}}else _0x58275a['x']=this['width']+_0x3c0f24;_0x58275a['y']=this[_0x15be('0x64')]/0x2-_0x58275a[_0x15be('0x64')]/0x2;},VisuMZ[_0x15be('0x22d')][_0x15be('0x107')]=Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x56')],Window_ChoiceList['prototype'][_0x15be('0x56')]=function(){if(this['_messageWindow'])return this['messageCoreWindowX']();else{if(_0x15be('0x46')!==_0x15be('0x46')){function _0x23864e(){_0x14598c=_0x1b9bbf[_0x15be('0x9d')](_0x467995[_0x15be('0x1d')],_0x2341a5['textCodeResult'][_0x15be('0x40')](this)),_0x4d55a4=this['convertVariableEscapeCharacters'](_0xd7aa72);}}else return VisuMZ[_0x15be('0x22d')][_0x15be('0x107')][_0x15be('0x35')](this);}},Window_ChoiceList['prototype'][_0x15be('0x94')]=function(){const _0x33d1df=$gameMessage[_0x15be('0x22c')]();if(_0x33d1df===0x1)return(Graphics[_0x15be('0x1cf')]-this[_0x15be('0x108')]())/0x2;else{if(_0x33d1df===0x2){if('xKtsF'!=='JafqB')return this[_0x15be('0xf4')]['x']+this[_0x15be('0xf4')][_0x15be('0x8f')]-this[_0x15be('0x108')]();else{function _0x5516ed(){this[_0x15be('0x1e8')](),this[_0x15be('0x2c')](),this[_0x15be('0x19a')](),this[_0x15be('0xf8')](),this['activate']();}}}else{if(_0x15be('0x11d')!==_0x15be('0x11d')){function _0xe546ac(){_0x2f9c01[_0x15be('0x1d2')]=new _0x325c6a(_0x15be('0x9a')+_0x277f6b[_0x15be('0x10f')][_0x15be('0x9d')](/\\/g,'')+'\x27');}}else return this[_0x15be('0xf4')]['x'];}}},Window_ChoiceList['prototype'][_0x15be('0x108')]=function(){const _0x899e34=(this[_0x15be('0x1b6')]()+this[_0x15be('0x6')]())*this[_0x15be('0x230')]()+this[_0x15be('0x119')]*0x2;return Math[_0x15be('0x9')](_0x899e34,Graphics[_0x15be('0x8f')]);},Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x122')]=function(){const _0x5e2f37=Math['ceil']($gameMessage[_0x15be('0x97')]()[_0x15be('0x5d')]/this[_0x15be('0x230')]());return Math[_0x15be('0x9')](_0x5e2f37,this[_0x15be('0xd5')]());},Window_ChoiceList['prototype'][_0x15be('0xd5')]=function(){const _0x4201a1=this[_0x15be('0xf4')],_0x14817=_0x4201a1?_0x4201a1['y']:0x0,_0x52aaf9=_0x4201a1?_0x4201a1[_0x15be('0x64')]:0x0,_0x3e57d4=Graphics[_0x15be('0x21f')]/0x2;return _0x14817<_0x3e57d4&&_0x14817+_0x52aaf9>_0x3e57d4?0x4:$gameSystem[_0x15be('0x18')]();},Window_ChoiceList[_0x15be('0x1f4')][_0x15be('0x1b6')]=function(){let _0xb75589=0x60;for(const _0x142914 of this['_list']){if(_0x15be('0x50')===_0x15be('0xdf')){function _0x367c01(){return![];}}else{const _0x22d812=_0x142914['name'],_0x58dfdd=this[_0x15be('0x0')](_0x22d812)[_0x15be('0x8f')],_0xbaf281=Math[_0x15be('0xe')](_0x58dfdd)+this[_0x15be('0xbb')]()*0x2;if(_0xb75589<_0xbaf281){if(_0x15be('0x37')!==_0x15be('0xe0'))_0xb75589=_0xbaf281;else{function _0x1c25d0(){if(_0x328680[_0x15be('0x1c5')]())return![];return this[_0x15be('0xd7')](_0x2a42d5),this[_0x15be('0xa9')](_0x28179e),this[_0x15be('0x200')](_0x200b80),this[_0x15be('0x135')](_0x15be('0x15b')),!![];}}}}}return _0xb75589;},Window_ChoiceList[_0x15be('0x1f4')]['drawItem']=function(_0x2a7676){const _0x100090=this[_0x15be('0x66')](_0x2a7676),_0xf33cb2=$gameSystem[_0x15be('0x1cd')]()!==_0x15be('0x173')?_0x15be('0x12a')[_0x15be('0xb6')]($gameSystem[_0x15be('0x1cd')]()):'',_0x2b21c8=_0xf33cb2+this['commandName'](_0x2a7676);this[_0x15be('0x205')](this[_0x15be('0x71')](_0x2a7676)),this[_0x15be('0xfb')](_0x2b21c8,_0x100090['x'],_0x100090['y'],_0x100090[_0x15be('0x8f')]);},Window_ChoiceList[_0x15be('0x1f4')]['callOkHandler']=function(){$gameMessage[_0x15be('0x232')](this[_0x15be('0x1f6')]()),this[_0x15be('0xf4')][_0x15be('0x187')](),this[_0x15be('0x1a9')]();};