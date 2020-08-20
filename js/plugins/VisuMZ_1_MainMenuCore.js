//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.00] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * - Control over general Main Menu settings.
 * - The ability to set Menu Background Portraits for individual actors.
 * - Flexibility in changing which commands appear in the Main Menu.
 * - Add new windows like the Playtime Window and Variable windows.
 * - Change the style of how the windows are arranged in the Main Menu.
 * - Change the way the status list is displayed and the way it's displayed.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Image: filename>
 *
 * - Used for: Actor
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
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
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Actor:
 *   - Select which ID(s) to affect.
 *
 *     Single:
 *     - Select which specific ID to affect.
 *
 *     Variable Reference:
 *     - Which variable is used to determine which ID to affect?
 *
 *     Range Start:
 *     - Select where the ID range begins.
 *
 *     Range End:
 *     - Select where the ID range ends.
 *
 *     Group:
 *     - Select which group of ID(s) to affect.
 *
 *     JavaScript:
 *     - JavaScript code to return an array on which ID(s) to affect.
 *
 *   Step 2: Target:
 *   - Select operation on what to change the switch(es) to.
 *   - Depending on what you pick here, one of the following actions are used
 *     in combination with the ID's picked from Step 1.
 *
 *     Filename:
 *     - Selected actor(s) will have their menu images changed to this.
 *
 *     Variable Reference:
 *     - Select the variable used to determine filename used for the selected
 *       actor(s).
 *
 *     JavaScript:
 *     - JavaScript code to determine what filename is used for the selected
 *       actor(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
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
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
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
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
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
 * @param MainMenuCore
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
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
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
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
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
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
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
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x3c3f=['addFormationCommand','ARRAYEVAL','mobile','goldWindowRectBottomStyle','resetFontSettings','mainCommandWidth','_playtimeText','commandNameWindowCenter','Scene_Menu_commandFormation','Jxamu','InnerMenuListStyle','isArray','ThinStyle','TextStr','value','iconWidth','_actorMenuBgSprite','Scene_Menu_onFormationCancel','statusWindowRectMobileStyle','gqunD','format','members','onPersonalCancel','Icon','auto','xjEbE','XyumT','addWindow','center','currentSymbol','CustomCmdWin','commandWindowRectThinBottomStyle','commandWindowStyle','vraox','commandWindowRectThinTopStyle','WjdPq','drawTextEx','createGoldWindow','_playtimeWindow','MainMenuCore','commandStyle','addOptionsCommand','makeMainMenuCoreCommandList','isDisplayActorMenuBackgroundImage','drawItemImage','updateTimer','rJply','thicker','ARRAYFUNC','_statusWindow','prototype','initMenuImage','lineHeight','getMenuImage','pnKve','ceil','ARRAYSTR','top','topIndex','default','_bitmapReady','Window_MenuStatus_drawItemImage','ShowReserve','fittingHeight','innerWidth','setTargetActor','bind','maxItems','_timer','boxWidth','setup','_data','max','_duration','drawPlaytime','xucPB','changePaintOpacity','Scene_Menu_commandWindowRect','MtfuM','addChild','Step2','faceWidth','applyThinnerGoldWindowRect','min','drawItemStatusVerticalStyle','ChangeActorMenuImageGroup','activate','AutoGoldY','commandFormation','commandWindowRectTopStyle','status','GsByT','adjustCommandHeightByVariable','create','lyzDs','CommandList','General','FontSize','name','Scene_Menu_createStatusWindow','NFstx','commandNameWindowDrawText','_commandWindow','length','PnScG','constructor','systemColor','EEnLv','portrait','adjustDefaultCommandWindowRect','drawTimeIcon','contents','drawItemStyleIconText','maxCols','Step1End','MOhEp','lQmQe','thinBottom','aqltO','drawTimeLabel','STRUCT','faceHeight','addGameEndCommand','_commandNameWindow','PortraitStyle','StatusGraphic','hKvvS','drawItemActorMenuImage','close','KejPL','WindowRect','setMenuImage','createStatusWindow','addMainCommands','KLnGi','battlerName','Step1Start','includes','registerCommand','push','statusWindowRect','calcWindowHeight','Time','ARRAYSTRUCT','updateOpacity','Playtime','loadBitmap','drawItemBackground','loadPicture','commandCommonEvent','blt','Scene_Menu_create','adjustCommandHeightByPlaytime','updateCommandNameWindow','Settings','svActorVertCells','drawSvActor','commandNameWindowDrawBackground','Cols','formation','drawText','playtimeWindowRectTopStyle','Window_MenuCommand_initialize','exit','maxBattleMembers','width','IREvn','return\x200','iconText','battleMembers','Window_MenuStatus_itemHeight','onPersonalOk','createPlaytimeWindow','parse','initialize','createVariableWindow','DXxwS','listStyle','createCommandNameWindow','setBackgroundType','yPiCj','kGUQw','TextAlign','xDAWJ','JSON','_goldWindow','RwUqi','statusWindowRectTopStyle','AdjustCommandHeight','jVHEl','graphicType','gameEnd','goldWindowRectTopStyle','map','shift','fill','drawItemStyleIcon','exPkY','toUpperCase','UIIsJ','onFormationCancel','needsDummyWindow','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','right','trim','ConvertParams','svActorHorzCells','clear','version','DefaultStyle','PersonalHandlerJS','drawAllItems','\x5cI[%1]%2','canCreateVariableWindow','ActorBgMenuJS','_dummyWindow','reserveCommonEvent','bottom','MobileThickness','TextJS','Enable','itemRect','drawActorGraphic','BOpaa','match','ThickerStyle','textSizeEx','innerHeight','SoloQuick','drawItem','loadCharacter','drawItemStatus','openness','currentExt','drawItemStatusPortraitStyleOnLoad','maxVisibleItems','update','thinTop','call','sprite','icon','setActor','drawItemActorFace','itemLineRect','drawItemStatusPortraitStyle','loadFaceImages','ShowJS','aVCiv','parameters','refresh','updatePosition','thin','EVAL','windowPadding','solo','loadSvActor','dHtmE','Scene_MenuBase_updateActor','itemHeight','TqAcP','isExpGaugeDrawn','iconHeight','createActorMenuBackgroundImageSprite','left','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','WCVAi','_targetY','actor','ChangeActorMenuImageJS','GzSsI','callUpdateHelp','Scene_MenuBase_createBackground','Scene_Menu_statusWindowRect','resetTextColor','isBigCharacter','isSoloQuickMode','Symbol','createDummyWindow','height','showOnlyBattleMembers','changeTextColor','playtimeWindowRectBottomStyle','Game_Actor_setup','playtimeWindowRect','Scene_Menu_onPersonalCancel','drawPendingItemBackground','VarList','eRcnF','variableWindowRect','isBattleMember','_menuImage','addLoadListener','variableWindowRectTopStyle','createCommandWindow','drawItemStatusThinStyle','Variable','hpcOU','loadOtherActorImages','uiXEz','replace','createBackground','StatusListStyle','vQrDy','setHandler','numVisibleRows','Window_MenuStatus_maxItems','qutQZ','Style','STR','_list','addSaveCommand','drawItemStatusThickerStyle','drawItemActorSvBattler','text','xLDxx','popScene','Window_StatusBase_loadFaceImages','ARRAYJSON','BgType','addSymbolBridge','Scene_Menu_goldWindowRect','Scene_Menu_commandPersonal','drawActorFace','vertical','drawItemStatusSoloStyleOnLoad','kVYDL','normalColor','EpOpS','HideMainMenuOnly','EnableJS','floor','variables','description','variableWindowRectBottomStyle','sjeAG','commandWindowRectBottomStyle','_actor','filter','cancel','mainAreaBottom','_targetX','updateDuration','goldWindowRect','updateActor','commandStyleCheck','mainAreaTop','HnsOn','thinGoldWindow','playtimeText','statusWindowRectBottomStyle','addOriginalCommands','DmvKu','none','commandWindowRect','_scene','commandWindowRectMobileStyle','IgMpq','_variableWindow','colSpacing','adjustStatusWindowMobile','characterName','ThinGoldWindow','fontSize','drawIcon','drawItemStatusSoloStyle','VerticalStyle','svbattler','Untitled','round','opacity','NUM','Step1','ExtJS','onBitmapLoad','commandPersonal','addCommand','bitmap','index','commandName','AutoGoldHeight','YsDHP','boxHeight','_commandList','drawItemStatusDefaultStyle','drawItemActorSprite','CallHandlerJS','open','ListStyles','itemTextAlign','Rows','Rlewx','mainAreaHeight','canCreatePlaytimeWindow'];(function(_0x54ce2e,_0x3c3fe5){const _0x317d6b=function(_0x20f543){while(--_0x20f543){_0x54ce2e['push'](_0x54ce2e['shift']());}};_0x317d6b(++_0x3c3fe5);}(_0x3c3f,0x1c8));const _0x317d=function(_0x54ce2e,_0x3c3fe5){_0x54ce2e=_0x54ce2e-0x0;let _0x317d6b=_0x3c3f[_0x54ce2e];return _0x317d6b;};var label=_0x317d('0x171'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x317d('0x112')](function(_0x9981cc){return _0x9981cc[_0x317d('0x1b')]&&_0x9981cc[_0x317d('0x10d')][_0x317d('0x4a')]('['+label+']');})[0x0];VisuMZ[label][_0x317d('0x5b')]=VisuMZ[label][_0x317d('0x5b')]||{},VisuMZ[_0x317d('0x8e')]=function(_0x153df5,_0x1f012a){for(const _0x2f871b in _0x1f012a){if(_0x317d('0x47')===_0x317d('0x47')){if(_0x2f871b['match'](/(.*):(.*)/i)){const _0x3407a2=String(RegExp['$1']),_0x28f21c=String(RegExp['$2'])[_0x317d('0x87')]()[_0x317d('0x8d')]();let _0x25e9ab,_0x31451e,_0x5be865;switch(_0x28f21c){case _0x317d('0x133'):_0x25e9ab=_0x1f012a[_0x2f871b]!==''?Number(_0x1f012a[_0x2f871b]):0x0;break;case'ARRAYNUM':_0x31451e=_0x1f012a[_0x2f871b]!==''?JSON[_0x317d('0x6e')](_0x1f012a[_0x2f871b]):[],_0x25e9ab=_0x31451e[_0x317d('0x82')](_0x44e548=>Number(_0x44e548));break;case _0x317d('0xbd'):_0x25e9ab=_0x1f012a[_0x2f871b]!==''?eval(_0x1f012a[_0x2f871b]):null;break;case _0x317d('0x14b'):_0x31451e=_0x1f012a[_0x2f871b]!==''?JSON['parse'](_0x1f012a[_0x2f871b]):[],_0x25e9ab=_0x31451e[_0x317d('0x82')](_0x3ac8db=>eval(_0x3ac8db));break;case _0x317d('0x79'):_0x25e9ab=_0x1f012a[_0x2f871b]!==''?JSON[_0x317d('0x6e')](_0x1f012a[_0x2f871b]):'';break;case _0x317d('0xfe'):_0x31451e=_0x1f012a[_0x2f871b]!==''?JSON[_0x317d('0x6e')](_0x1f012a[_0x2f871b]):[],_0x25e9ab=_0x31451e[_0x317d('0x82')](_0x3ce588=>JSON[_0x317d('0x6e')](_0x3ce588));break;case'FUNC':_0x25e9ab=_0x1f012a[_0x2f871b]!==''?new Function(JSON['parse'](_0x1f012a[_0x2f871b])):new Function(_0x317d('0x68'));break;case _0x317d('0x17a'):_0x31451e=_0x1f012a[_0x2f871b]!==''?JSON[_0x317d('0x6e')](_0x1f012a[_0x2f871b]):[],_0x25e9ab=_0x31451e[_0x317d('0x82')](_0x24d509=>new Function(JSON[_0x317d('0x6e')](_0x24d509)));break;case _0x317d('0xf5'):_0x25e9ab=_0x1f012a[_0x2f871b]!==''?String(_0x1f012a[_0x2f871b]):'';break;case _0x317d('0x182'):_0x31451e=_0x1f012a[_0x2f871b]!==''?JSON[_0x317d('0x6e')](_0x1f012a[_0x2f871b]):[],_0x25e9ab=_0x31451e[_0x317d('0x82')](_0x147a84=>String(_0x147a84));break;case _0x317d('0x39'):_0x5be865=_0x1f012a[_0x2f871b]!==''?JSON[_0x317d('0x6e')](_0x1f012a[_0x2f871b]):{},_0x153df5[_0x3407a2]={},VisuMZ[_0x317d('0x8e')](_0x153df5[_0x3407a2],_0x5be865);continue;case _0x317d('0x50'):_0x31451e=_0x1f012a[_0x2f871b]!==''?JSON[_0x317d('0x6e')](_0x1f012a[_0x2f871b]):[],_0x25e9ab=_0x31451e[_0x317d('0x82')](_0x24467b=>VisuMZ[_0x317d('0x8e')]({},JSON[_0x317d('0x6e')](_0x24467b)));break;default:continue;}_0x153df5[_0x3407a2]=_0x25e9ab;}}else{function _0x2d1de7(){const _0x349139=this['mainCommandWidth'](),_0x14568e=this[_0x317d('0x4e')](0x1,![]),_0x18844e=_0x9a949[_0x317d('0x6')]-_0x349139,_0x3c1e33=this[_0x317d('0x114')]()-_0x14568e;return new _0x309de7(_0x18844e,_0x3c1e33,_0x349139,_0x14568e);}}}return _0x153df5;},(_0x541b99=>{const _0x1955f3=_0x541b99[_0x317d('0x23')];for(const _0xaea7fd of dependencies){if(!Imported[_0xaea7fd]){alert(_0x317d('0xc9')[_0x317d('0x15e')](_0x1955f3,_0xaea7fd)),SceneManager[_0x317d('0x64')]();break;}}const _0x30152a=_0x541b99[_0x317d('0x10d')];if(_0x30152a[_0x317d('0xa1')](/\[Version[ ](.*?)\]/i)){if(_0x317d('0xf')!=='MtfuM'){function _0x3ac246(){const _0x35c646=_0x5eee15[_0x317d('0x171')][_0x317d('0x5b')]['General'];if(_0x35c646['ShowReserve']===_0x34b996)_0x35c646[_0x317d('0x188')]=!![];const _0x5ebaeb=_0x4e4210[_0x317d('0x123')];if(!_0x35c646[_0x317d('0x188')]){if(_0x35c646['HideMainMenuOnly'])return _0x5ebaeb[_0x317d('0x2a')]===_0x3fe1e5;return!![];}return![];}}else{const _0x5bf48d=Number(RegExp['$1']);if(_0x5bf48d!==VisuMZ[label][_0x317d('0x91')]){if('GzSsI'===_0x317d('0xce'))alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x317d('0x15e')](_0x1955f3,_0x5bf48d)),SceneManager['exit']();else{function _0x1f01ce(){_0xf97fcb[_0x317d('0x99')](_0x1ed6fd),this[_0x317d('0xfc')]();}}}}}if(_0x30152a['match'](/\[Tier[ ](\d+)\]/i)){const _0x3ff723=Number(RegExp['$1']);if(_0x3ff723<tier)alert(_0x317d('0x8b')[_0x317d('0x15e')](_0x1955f3,_0x3ff723,tier)),SceneManager[_0x317d('0x64')]();else{if(_0x317d('0xc4')!==_0x317d('0x15d'))tier=Math[_0x317d('0x9')](_0x3ff723,tier);else{function _0x5c9349(){this[_0x317d('0x51')](),this[_0x317d('0xbb')](),this[_0x317d('0x116')]();}}}}VisuMZ[_0x317d('0x8e')](VisuMZ[label]['Settings'],_0x541b99[_0x317d('0xb9')]);})(pluginData),PluginManager[_0x317d('0x4b')](pluginData[_0x317d('0x23')],_0x317d('0x16'),_0x49c494=>{VisuMZ[_0x317d('0x8e')](_0x49c494,_0x49c494);const _0x295c3a=_0x49c494[_0x317d('0x134')],_0xfa0763=_0x49c494[_0x317d('0x11')];for(let _0x4b4196 of _0x295c3a){_0x4b4196=parseInt(_0x4b4196)||0x0;if(_0x4b4196<=0x0)continue;const _0x5a464d=$gameActors['actor'](_0x4b4196);if(!_0x5a464d)continue;_0x5a464d[_0x317d('0x44')](_0xfa0763);}}),PluginManager['registerCommand'](pluginData[_0x317d('0x23')],'ChangeActorMenuImageRange',_0x2ac05b=>{VisuMZ[_0x317d('0x8e')](_0x2ac05b,_0x2ac05b);const _0x4bf300=_0x2ac05b[_0x317d('0x33')]>=_0x2ac05b[_0x317d('0x49')]?_0x2ac05b[_0x317d('0x49')]:_0x2ac05b['Step1End'],_0x58d060=_0x2ac05b[_0x317d('0x33')]>=_0x2ac05b[_0x317d('0x49')]?_0x2ac05b[_0x317d('0x33')]:_0x2ac05b[_0x317d('0x49')],_0x32d3ae=Array(_0x58d060-_0x4bf300+0x1)[_0x317d('0x84')]()[_0x317d('0x82')]((_0x350a47,_0x45d307)=>_0x4bf300+_0x45d307),_0x213009=_0x2ac05b[_0x317d('0x11')];for(let _0x1d18fa of _0x32d3ae){_0x1d18fa=parseInt(_0x1d18fa)||0x0;if(_0x1d18fa<=0x0)continue;const _0x3eee98=$gameActors[_0x317d('0xcc')](_0x1d18fa);if(!_0x3eee98)continue;_0x3eee98['setMenuImage'](_0x213009);}}),PluginManager[_0x317d('0x4b')](pluginData[_0x317d('0x23')],_0x317d('0xcd'),_0x414db6=>{VisuMZ[_0x317d('0x8e')](_0x414db6,_0x414db6);const _0x55201e=_0x414db6[_0x317d('0x134')];let _0x252ddc=[];while(_0x55201e[_0x317d('0x28')]>0x0){const _0x3a03e9=_0x55201e[_0x317d('0x83')]();Array[_0x317d('0x155')](_0x3a03e9)?_0x252ddc=_0x252ddc['concat'](_0x3a03e9):_0x252ddc[_0x317d('0x4c')](_0x3a03e9);}const _0x47f15a=_0x414db6[_0x317d('0x11')];for(let _0x332c1a of _0x252ddc){if(_0x317d('0x16b')!==_0x317d('0x108')){_0x332c1a=parseInt(_0x332c1a)||0x0;if(_0x332c1a<=0x0)continue;const _0x174abd=$gameActors[_0x317d('0xcc')](_0x332c1a);if(!_0x174abd)continue;_0x174abd['setMenuImage'](_0x47f15a);}else{function _0x50ef76(){this[_0x317d('0x17b')][_0x317d('0xa9')]=0x0;}}}}),VisuMZ[_0x317d('0x171')][_0x317d('0xdb')]=Game_Actor[_0x317d('0x17c')][_0x317d('0x7')],Game_Actor['prototype'][_0x317d('0x7')]=function(_0x48d768){VisuMZ[_0x317d('0x171')][_0x317d('0xdb')][_0x317d('0xaf')](this,_0x48d768),this[_0x317d('0x17d')]();},Game_Actor[_0x317d('0x17c')][_0x317d('0x17d')]=function(){this['_menuImage']='',this['actor']()&&this['actor']()['note'][_0x317d('0xa1')](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x317d('0xe3')]=String(RegExp['$1']));},Game_Actor[_0x317d('0x17c')]['getMenuImage']=function(){if(this[_0x317d('0xe3')]===undefined)this[_0x317d('0x17d')]();return this[_0x317d('0xe3')];},Game_Actor[_0x317d('0x17c')][_0x317d('0x44')]=function(_0x44e515){if(this[_0x317d('0xe3')]===undefined)this[_0x317d('0x17d')]();this[_0x317d('0xe3')]=_0x44e515;},Scene_MenuBase[_0x317d('0x17c')][_0x317d('0x175')]=function(){return VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x21')]['ActorBgMenus']['includes'](this[_0x317d('0x2a')][_0x317d('0x23')]);},VisuMZ[_0x317d('0x171')][_0x317d('0xd0')]=Scene_MenuBase[_0x317d('0x17c')][_0x317d('0xed')],Scene_MenuBase[_0x317d('0x17c')][_0x317d('0xed')]=function(){VisuMZ['MainMenuCore'][_0x317d('0xd0')][_0x317d('0xaf')](this),this['createActorMenuBackgroundImageSprite']();},Scene_MenuBase['prototype'][_0x317d('0xc7')]=function(){this[_0x317d('0x15a')]=new Sprite_MenuBackgroundActor(),this[_0x317d('0x10')](this[_0x317d('0x15a')]);},VisuMZ[_0x317d('0x171')]['Scene_MenuBase_updateActor']=Scene_MenuBase[_0x317d('0x17c')][_0x317d('0x118')],Scene_MenuBase[_0x317d('0x17c')][_0x317d('0x118')]=function(){VisuMZ[_0x317d('0x171')][_0x317d('0xc2')][_0x317d('0xaf')](this),this[_0x317d('0x175')]()&&this[_0x317d('0x15a')]&&this[_0x317d('0x15a')][_0x317d('0xb2')](this[_0x317d('0x111')]);},VisuMZ[_0x317d('0x171')][_0x317d('0x58')]=Scene_Menu[_0x317d('0x17c')][_0x317d('0x1e')],Scene_Menu[_0x317d('0x17c')]['create']=function(){VisuMZ[_0x317d('0x171')][_0x317d('0x58')]['call'](this),this[_0x317d('0x6d')](),this[_0x317d('0x70')](),this[_0x317d('0xd6')]();},Scene_Menu[_0x317d('0x17c')][_0x317d('0xe6')]=function(){const _0x2bf8d2=this[_0x317d('0x122')](),_0x8ec385=new Window_MenuCommand(_0x2bf8d2);_0x8ec385[_0x317d('0xf0')](_0x317d('0x113'),this[_0x317d('0xfc')][_0x317d('0x3')](this)),this[_0x317d('0x165')](_0x8ec385),this[_0x317d('0x27')]=_0x8ec385;},VisuMZ[_0x317d('0x171')][_0x317d('0xe')]=Scene_Menu[_0x317d('0x17c')]['commandWindowRect'],Scene_Menu[_0x317d('0x17c')][_0x317d('0x122')]=function(){const _0x57b79b=this['commandWindowStyle']();if(_0x57b79b===_0x317d('0x183'))return this[_0x317d('0x1a')]();else{if(_0x57b79b===_0x317d('0xae'))return this[_0x317d('0x16c')]();else{if(_0x57b79b===_0x317d('0x9a'))return this[_0x317d('0x110')]();else{if(_0x57b79b===_0x317d('0x36')){if(_0x317d('0xeb')===_0x317d('0x153')){function _0x215f9d(){const _0x33f4eb=this[_0x317d('0x16a')]();if(['top',_0x317d('0xae'),_0x317d('0x14c')]['includes'](_0x33f4eb))return this[_0x317d('0x62')]();else return[_0x317d('0x9a'),_0x317d('0x36')][_0x317d('0x4a')](_0x33f4eb)?this[_0x317d('0xda')]():_0x31eb57[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x52')]['WindowRect']['call'](this);}}else return this[_0x317d('0x169')]();}else{if(_0x57b79b===_0x317d('0x14c'))return this['commandWindowRectMobileStyle']();else{const _0x43bc98=VisuMZ[_0x317d('0x171')][_0x317d('0xe')][_0x317d('0xaf')](this);return this[_0x317d('0x2e')](_0x43bc98),_0x43bc98;}}}}}},Scene_Menu['prototype'][_0x317d('0x2e')]=function(_0x52b7c6){if(this[_0x317d('0x59')]()){if(_0x317d('0x178')===_0x317d('0x67')){function _0x110282(){const _0x1edf74=_0x5569e4[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x168')]['Rows'],_0x122b3f=_0x4efa7a[_0x317d('0x6')],_0xc8d81=_0x1c4ff5[_0x317d('0x17c')][_0x317d('0x0')](_0x1edf74),_0x1de5ce=0x0,_0x47294b=_0x4e6c78[_0x317d('0x131')]((_0x6e59e9[_0x317d('0x13e')]-_0xc8d81)/0x2);return new _0x239303(_0x1de5ce,_0x47294b,_0x122b3f,_0xc8d81);}}else _0x52b7c6['height']-=this[_0x317d('0xdc')]()[_0x317d('0xd7')];}if(this[_0x317d('0x1d')]()){if(_0x317d('0xca')!=='sAPuy')_0x52b7c6[_0x317d('0xd7')]-=this['variableWindowRect']()[_0x317d('0xd7')];else{function _0x3ff3bd(){return this[_0x317d('0xda')]();}}}},Scene_Menu['prototype'][_0x317d('0x1a')]=function(){const _0xe3635e=VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x168')][_0x317d('0x146')],_0x1af377=Graphics[_0x317d('0x6')],_0x11d237=this[_0x317d('0x4e')](_0xe3635e,!![]),_0x80259=0x0,_0xab4a52=this[_0x317d('0x11a')]();return new Rectangle(_0x80259,_0xab4a52,_0x1af377,_0x11d237);},Scene_Menu[_0x317d('0x17c')][_0x317d('0x16c')]=function(){const _0x4346b1=VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x168')][_0x317d('0x146')],_0x117cc9=Graphics[_0x317d('0x6')],_0x4f47d3=this[_0x317d('0x4e')](0x1,!![]),_0x22cc5a=0x0,_0x1dbcc7=this[_0x317d('0x11a')]();return new Rectangle(_0x22cc5a,_0x1dbcc7,_0x117cc9,_0x4f47d3);},Scene_Menu['prototype'][_0x317d('0x110')]=function(){const _0x1a8894=VisuMZ['MainMenuCore'][_0x317d('0x5b')][_0x317d('0x168')][_0x317d('0x146')],_0x56fcea=Graphics[_0x317d('0x6')],_0x1bbc84=this[_0x317d('0x4e')](_0x1a8894,!![]),_0x234dcd=0x0,_0x28f467=this[_0x317d('0x114')]()-_0x1bbc84;return new Rectangle(_0x234dcd,_0x28f467,_0x56fcea,_0x1bbc84);},Scene_Menu[_0x317d('0x17c')][_0x317d('0x169')]=function(){const _0x47733b=VisuMZ[_0x317d('0x171')][_0x317d('0x5b')]['CustomCmdWin'][_0x317d('0x146')],_0x119e49=Graphics['boxWidth'],_0x1f4a45=this[_0x317d('0x4e')](0x1,!![]),_0x5e4de0=0x0,_0x32bd38=this['mainAreaBottom']()-_0x1f4a45;return new Rectangle(_0x5e4de0,_0x32bd38,_0x119e49,_0x1f4a45);},Scene_Menu[_0x317d('0x17c')][_0x317d('0x124')]=function(){const _0x5e5b9a=VisuMZ[_0x317d('0x171')]['Settings']['CustomCmdWin'][_0x317d('0x146')],_0x6b50e0=Graphics['boxWidth'],_0x3788fe=Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x0')](_0x5e5b9a),_0x57bfde=0x0,_0x17e8fc=Math[_0x317d('0x131')]((Graphics[_0x317d('0x13e')]-_0x3788fe)/0x2);return new Rectangle(_0x57bfde,_0x17e8fc,_0x6b50e0,_0x3788fe);},Scene_Menu[_0x317d('0x17c')][_0x317d('0x16a')]=function(){return VisuMZ[_0x317d('0x171')][_0x317d('0x5b')]['CommandWindowStyle'];},Scene_Menu[_0x317d('0x17c')][_0x317d('0x11c')]=function(){if(this[_0x317d('0x16a')]()!==_0x317d('0x185'))return!![];return VisuMZ['MainMenuCore'][_0x317d('0x5b')][_0x317d('0x21')][_0x317d('0x12a')];},Scene_Menu[_0x317d('0x17c')][_0x317d('0x16f')]=function(){const _0x415630=this[_0x317d('0x117')]();this[_0x317d('0x7a')]=this[_0x317d('0x11c')]()?new Window_ThinGold(_0x415630):new Window_Gold(_0x415630),this['addWindow'](this[_0x317d('0x7a')]);},VisuMZ[_0x317d('0x171')][_0x317d('0x101')]=Scene_Menu[_0x317d('0x17c')][_0x317d('0x117')],Scene_Menu['prototype'][_0x317d('0x117')]=function(){const _0x349f4c=this['commandWindowStyle']();if([_0x317d('0x183'),_0x317d('0xae'),_0x317d('0x14c')]['includes'](_0x349f4c))return this[_0x317d('0x81')]();else{if([_0x317d('0x9a'),'thinBottom'][_0x317d('0x4a')](_0x349f4c))return this[_0x317d('0x14d')]();else{if(_0x317d('0x106')!==_0x317d('0x16d')){const _0x13c833=VisuMZ[_0x317d('0x171')][_0x317d('0x101')][_0x317d('0xaf')](this);return this[_0x317d('0x13')](_0x13c833),_0x13c833;}else{function _0x32d01b(){_0x31239c[_0x317d('0x17c')][_0x317d('0x6f')]['call'](this,_0x554f46),this['_data']=_0x5aa88e['MainMenuCore'][_0x317d('0x5b')][_0x317d('0xe8')][_0x317d('0xdf')],this[_0x317d('0xba')]();}}}}},Scene_Menu[_0x317d('0x17c')][_0x317d('0x13')]=function(_0x45a5a0){if(this[_0x317d('0x11c')]()){if(VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x21')][_0x317d('0x18')]){if(_0x317d('0x42')!==_0x317d('0xfb')){const _0x39003b=_0x45a5a0[_0x317d('0xd7')]-this[_0x317d('0x4e')](0x1,![]);_0x45a5a0['y']+=_0x39003b;}else{function _0x1fd7a0(){return _0x2882de[_0x317d('0x17c')][_0x317d('0x127')][_0x317d('0xaf')](this);}}}VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x21')][_0x317d('0x13c')]&&(_0x45a5a0[_0x317d('0xd7')]=this[_0x317d('0x4e')](0x1,![]));}},Scene_Menu['prototype'][_0x317d('0x81')]=function(){const _0x5eece3=this[_0x317d('0x14f')](),_0x22e858=this['calcWindowHeight'](0x1,![]),_0x4a9534=Graphics['boxWidth']-_0x5eece3,_0x251f01=this['mainAreaBottom']()-_0x22e858;return new Rectangle(_0x4a9534,_0x251f01,_0x5eece3,_0x22e858);},Scene_Menu[_0x317d('0x17c')][_0x317d('0x14d')]=function(){const _0x2d2518=this[_0x317d('0x14f')](),_0x342422=this['calcWindowHeight'](0x1,![]),_0x21d1f6=Graphics[_0x317d('0x6')]-_0x2d2518,_0x560dc1=this['mainAreaTop']();return new Rectangle(_0x21d1f6,_0x560dc1,_0x2d2518,_0x342422);},VisuMZ[_0x317d('0x171')]['Scene_Menu_createStatusWindow']=Scene_Menu[_0x317d('0x17c')][_0x317d('0x45')],Scene_Menu[_0x317d('0x17c')][_0x317d('0x45')]=function(){VisuMZ[_0x317d('0x171')][_0x317d('0x24')]['call'](this),this[_0x317d('0x128')]();},Scene_Menu[_0x317d('0x17c')][_0x317d('0x128')]=function(){this[_0x317d('0x16a')]()===_0x317d('0x14c')&&(this[_0x317d('0x17b')][_0x317d('0xa9')]=0x0);},VisuMZ[_0x317d('0x171')][_0x317d('0xd1')]=Scene_Menu['prototype'][_0x317d('0x4d')],Scene_Menu[_0x317d('0x17c')][_0x317d('0x4d')]=function(){const _0x2267f1=this[_0x317d('0x16a')]();if([_0x317d('0x183'),_0x317d('0xae')][_0x317d('0x4a')](_0x2267f1)){if(_0x317d('0xc')===_0x317d('0x7e')){function _0x3207c1(){const _0x25a73e=_0x47008b[_0x317d('0x6')]-this[_0x317d('0x7a')][_0x317d('0x66')]-(this[_0x317d('0x170')]?this[_0x317d('0x170')]['width']:0x0),_0x16a876=this[_0x317d('0x4e')](0x1,![]),_0x12095f=this['_goldWindow']['x']-_0x25a73e,_0x232472=this[_0x317d('0x11a')]();return new _0x3acb28(_0x12095f,_0x232472,_0x25a73e,_0x16a876);}}else return this[_0x317d('0x7c')]();}else{if([_0x317d('0x9a'),_0x317d('0x36')]['includes'](_0x2267f1))return this[_0x317d('0x11e')]();else return _0x2267f1===_0x317d('0x14c')?this[_0x317d('0x15c')]():VisuMZ[_0x317d('0x171')][_0x317d('0xd1')]['call'](this);}},Scene_Menu['prototype'][_0x317d('0x7c')]=function(){const _0x4e4935=Graphics[_0x317d('0x6')],_0x511353=this[_0x317d('0x148')]()-this[_0x317d('0x27')][_0x317d('0xd7')]-this['_goldWindow'][_0x317d('0xd7')],_0x443914=0x0,_0xc03741=this['_commandWindow']['y']+this[_0x317d('0x27')][_0x317d('0xd7')];return new Rectangle(_0x443914,_0xc03741,_0x4e4935,_0x511353);},Scene_Menu['prototype']['statusWindowRectBottomStyle']=function(){const _0x3a47e1=Graphics[_0x317d('0x6')],_0x5ca0ba=this[_0x317d('0x148')]()-this[_0x317d('0x27')][_0x317d('0xd7')]-this[_0x317d('0x7a')][_0x317d('0xd7')],_0xe4793f=0x0,_0x1ef8cb=this[_0x317d('0x7a')]['y']+this[_0x317d('0x7a')][_0x317d('0xd7')];return new Rectangle(_0xe4793f,_0x1ef8cb,_0x3a47e1,_0x5ca0ba);},Scene_Menu[_0x317d('0x17c')]['statusWindowRectMobileStyle']=function(){const _0x344292=Graphics[_0x317d('0x6')],_0x54245f=this[_0x317d('0x148')]()-this[_0x317d('0x7a')][_0x317d('0xd7')],_0x288fde=0x0,_0x25ed34=this[_0x317d('0x114')]()-this['_goldWindow']['height']-_0x54245f;return new Rectangle(_0x288fde,_0x25ed34,_0x344292,_0x54245f);},Scene_Menu[_0x317d('0x17c')][_0x317d('0x6d')]=function(){if(!this[_0x317d('0x149')]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x2d9f9a=this[_0x317d('0xdc')]();this[_0x317d('0x170')]=new Window_Playtime(_0x2d9f9a),this[_0x317d('0x170')][_0x317d('0x74')](VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x52')][_0x317d('0xff')]),this[_0x317d('0x165')](this[_0x317d('0x170')]);},Scene_Menu[_0x317d('0x17c')][_0x317d('0x149')]=function(){return VisuMZ[_0x317d('0x171')][_0x317d('0x5b')]['Playtime'][_0x317d('0x9d')];},Scene_Menu[_0x317d('0x17c')][_0x317d('0x59')]=function(){return this[_0x317d('0x149')]()&&VisuMZ[_0x317d('0x171')]['Settings'][_0x317d('0x52')][_0x317d('0x7d')];},Scene_Menu[_0x317d('0x17c')][_0x317d('0xdc')]=function(){const _0x12b3b2=this[_0x317d('0x16a')]();if([_0x317d('0x183'),_0x317d('0xae'),_0x317d('0x14c')][_0x317d('0x4a')](_0x12b3b2))return this[_0x317d('0x62')]();else return['bottom',_0x317d('0x36')][_0x317d('0x4a')](_0x12b3b2)?this[_0x317d('0xda')]():VisuMZ[_0x317d('0x171')][_0x317d('0x5b')]['Playtime'][_0x317d('0x43')]['call'](this);},Scene_Menu[_0x317d('0x17c')]['playtimeWindowRectTopStyle']=function(){const _0x2d978=this[_0x317d('0x14f')](),_0x11ce68=this[_0x317d('0x4e')](0x1,![]),_0x5232c1=0x0,_0x26d06d=this[_0x317d('0x114')]()-_0x11ce68;return new Rectangle(_0x5232c1,_0x26d06d,_0x2d978,_0x11ce68);},Scene_Menu['prototype'][_0x317d('0xda')]=function(){const _0x57eaee=this[_0x317d('0x14f')](),_0x5beefd=this[_0x317d('0x4e')](0x1,![]),_0x5c9050=0x0,_0x5c5178=this[_0x317d('0x11a')]();return new Rectangle(_0x5c9050,_0x5c5178,_0x57eaee,_0x5beefd);},Scene_Menu['prototype']['createVariableWindow']=function(){if(!this[_0x317d('0x96')]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x3567c8=this[_0x317d('0xe1')]();this[_0x317d('0x126')]=new Window_MenuVariables(_0x3567c8),this[_0x317d('0x126')][_0x317d('0x74')](VisuMZ[_0x317d('0x171')]['Settings'][_0x317d('0xe8')]['BgType']),this[_0x317d('0x165')](this['_variableWindow']);},Scene_Menu['prototype'][_0x317d('0x96')]=function(){return VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0xe8')][_0x317d('0x9d')];},Scene_Menu[_0x317d('0x17c')]['adjustCommandHeightByVariable']=function(){return this[_0x317d('0x96')]()&&VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0xe8')]['AdjustCommandHeight'];},Scene_Menu[_0x317d('0x17c')][_0x317d('0xe1')]=function(){const _0x32ba7c=this[_0x317d('0x16a')]();if([_0x317d('0x183'),_0x317d('0xae'),_0x317d('0x14c')][_0x317d('0x4a')](_0x32ba7c))return this[_0x317d('0xe5')]();else{if([_0x317d('0x9a'),_0x317d('0x36')][_0x317d('0x4a')](_0x32ba7c)){if(_0x317d('0x147')===_0x317d('0x147'))return this[_0x317d('0x10e')]();else{function _0x4bfa43(){if(this[_0x317d('0xa')]>0x0){const _0x3ab123=this[_0x317d('0xa')];this['x']=(this['x']*(_0x3ab123-0x1)+this[_0x317d('0x115')])/_0x3ab123,this['y']=(this['y']*(_0x3ab123-0x1)+this[_0x317d('0xcb')])/_0x3ab123;}}}}else{if(_0x317d('0xc1')!=='edNbr')return VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0xe8')][_0x317d('0x43')][_0x317d('0xaf')](this);else{function _0x2ebf11(){if(_0x466626['MainMenuCore'][_0x317d('0x5b')][_0x317d('0x52')][_0x317d('0x161')]>0x0){const _0x1a3fde=_0x16daa9[_0x317d('0x171')][_0x317d('0x5b')]['Playtime'][_0x317d('0x161')],_0x43d88e=_0xfb108d['y']+(this[_0x317d('0x17e')]()-_0x4b14a3[_0x317d('0xc6')])/0x2;this[_0x317d('0x12c')](_0x1a3fde,_0x35ba5e['x'],_0x43d88e);const _0x565ab9=_0x3825f2[_0x317d('0x159')]+0x4;_0x464954['x']+=_0x565ab9,_0x5b71bb[_0x317d('0x66')]-=_0x565ab9;}}}}}},Scene_Menu[_0x317d('0x17c')][_0x317d('0xe5')]=function(){const _0x1db581=Graphics['boxWidth']-this['_goldWindow'][_0x317d('0x66')]-(this[_0x317d('0x170')]?this['_playtimeWindow'][_0x317d('0x66')]:0x0),_0x54cf5f=this[_0x317d('0x4e')](0x1,![]),_0x18499c=this[_0x317d('0x7a')]['x']-_0x1db581,_0x437c58=this[_0x317d('0x114')]()-_0x54cf5f;return new Rectangle(_0x18499c,_0x437c58,_0x1db581,_0x54cf5f);},Scene_Menu[_0x317d('0x17c')][_0x317d('0x10e')]=function(){const _0x396a00=Graphics[_0x317d('0x6')]-this[_0x317d('0x7a')][_0x317d('0x66')]-(this[_0x317d('0x170')]?this['_playtimeWindow'][_0x317d('0x66')]:0x0),_0x8e7d98=this[_0x317d('0x4e')](0x1,![]),_0x2bcaf2=this[_0x317d('0x7a')]['x']-_0x396a00,_0x5a32e4=this[_0x317d('0x11a')]();return new Rectangle(_0x2bcaf2,_0x5a32e4,_0x396a00,_0x8e7d98);},Scene_Menu[_0x317d('0x17c')][_0x317d('0xd6')]=function(){if(!this['needsDummyWindow']())return;const _0x24ff60=this[_0x317d('0xe1')]();this[_0x317d('0x98')]=new Window_Base(_0x24ff60),this[_0x317d('0x98')][_0x317d('0x74')](VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0xe8')][_0x317d('0xff')]),this[_0x317d('0x165')](this[_0x317d('0x98')]);},Scene_Menu['prototype'][_0x317d('0x8a')]=function(){if([_0x317d('0x185'),_0x317d('0x14c')]['includes'](this[_0x317d('0x16a')]()))return![];if(this['_variableWindow'])return![];return!![];},VisuMZ[_0x317d('0x171')]['Scene_Menu_commandPersonal']=Scene_Menu['prototype'][_0x317d('0x137')],Scene_Menu[_0x317d('0x17c')][_0x317d('0x137')]=function(){if(this[_0x317d('0xd4')]()&&this[_0x317d('0x17b')])$gameParty[_0x317d('0x2')]($gameParty[_0x317d('0x15f')]()[0x0]),this['onPersonalOk']();else{if('pnKve'===_0x317d('0x180')){if(this[_0x317d('0x16a')]()===_0x317d('0x14c'))this[_0x317d('0x17b')][_0x317d('0x143')]();VisuMZ[_0x317d('0x171')][_0x317d('0x102')]['call'](this);}else{function _0xd259c8(){_0x5d4b28['MainMenuCore'][_0x317d('0xc2')][_0x317d('0xaf')](this),this[_0x317d('0x175')]()&&this[_0x317d('0x15a')]&&this[_0x317d('0x15a')][_0x317d('0xb2')](this[_0x317d('0x111')]);}}}},Scene_Menu[_0x317d('0x17c')]['isSoloQuickMode']=function(){return VisuMZ[_0x317d('0x171')]['Settings'][_0x317d('0x21')][_0x317d('0xa5')]&&$gameParty['members']()[_0x317d('0x28')]<=0x1;},Scene_Menu[_0x317d('0x17c')][_0x317d('0x6c')]=function(){const _0x10fe76=this[_0x317d('0x27')][_0x317d('0x167')](),_0x241222=this[_0x317d('0x27')][_0x317d('0xaa')]();for(const _0x17c64e of Window_MenuCommand[_0x317d('0x13f')]){if(_0x317d('0x34')===_0x317d('0x34')){if(_0x17c64e['Symbol']===_0x10fe76){if(_0x317d('0x1f')!=='lyzDs'){function _0x1a1c6f(){this['_bitmapReady']=![],this['_actor']?(this[_0x317d('0x139')]=_0x39dd7a['loadPicture'](this[_0x317d('0x111')][_0x317d('0x17f')]()),this[_0x317d('0x139')][_0x317d('0xe4')](this[_0x317d('0x136')]['bind'](this))):this[_0x317d('0x139')]=new _0x89acd2(0x1,0x1);}}else{_0x17c64e[_0x317d('0x93')][_0x317d('0xaf')](this,_0x241222);return;}}}else{function _0x3f5f51(){const _0x19fb79=_0x2de5db[_0x317d('0x6')],_0x46a4fc=this[_0x317d('0x148')]()-this['_commandWindow'][_0x317d('0xd7')]-this[_0x317d('0x7a')][_0x317d('0xd7')],_0x2332c2=0x0,_0x59b3e8=this[_0x317d('0x27')]['y']+this[_0x317d('0x27')]['height'];return new _0xfde7df(_0x2332c2,_0x59b3e8,_0x19fb79,_0x46a4fc);}}}},VisuMZ['MainMenuCore'][_0x317d('0xdd')]=Scene_Menu[_0x317d('0x17c')][_0x317d('0x160')],Scene_Menu[_0x317d('0x17c')][_0x317d('0x160')]=function(){VisuMZ[_0x317d('0x171')][_0x317d('0xdd')]['call'](this);if(this[_0x317d('0x16a')]()===_0x317d('0x14c'))this[_0x317d('0x17b')][_0x317d('0x41')]();},Scene_Menu[_0x317d('0x17c')][_0x317d('0x56')]=function(){const _0x539003=parseInt(this['_commandWindow']['currentExt']());if(_0x539003)$gameTemp[_0x317d('0x99')](_0x539003),this[_0x317d('0xfc')]();else{if('ifNcU'!=='ZNmYr')this['_commandWindow']['activate']();else{function _0x124d9c(){_0x33f9ce=_0xe42798[_0x317d('0x9')](_0x490e13,_0x36b83f);}}}},VisuMZ[_0x317d('0x171')][_0x317d('0x152')]=Scene_Menu['prototype'][_0x317d('0x19')],Scene_Menu[_0x317d('0x17c')][_0x317d('0x19')]=function(){VisuMZ['MainMenuCore'][_0x317d('0x152')][_0x317d('0xaf')](this);if(this[_0x317d('0x16a')]()===_0x317d('0x14c'))this['_statusWindow'][_0x317d('0x143')]();},VisuMZ['MainMenuCore'][_0x317d('0x15b')]=Scene_Menu[_0x317d('0x17c')][_0x317d('0x89')],Scene_Menu[_0x317d('0x17c')][_0x317d('0x89')]=function(){VisuMZ['MainMenuCore'][_0x317d('0x15b')][_0x317d('0xaf')](this);if(this[_0x317d('0x16a')]()===_0x317d('0x14c'))this[_0x317d('0x17b')][_0x317d('0x41')]();};function Sprite_MenuBackgroundActor(){this['initialize'](...arguments);}Sprite_MenuBackgroundActor[_0x317d('0x17c')]=Object['create'](Sprite[_0x317d('0x17c')]),Sprite_MenuBackgroundActor[_0x317d('0x17c')][_0x317d('0x2a')]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x317d('0x17c')][_0x317d('0x6f')]=function(){this['_actor']=null,this[_0x317d('0x186')]=![],Sprite[_0x317d('0x17c')][_0x317d('0x6f')]['call'](this),this['x']=Graphics[_0x317d('0x66')];},Sprite_MenuBackgroundActor[_0x317d('0x17c')][_0x317d('0xb2')]=function(_0x351dc3){this[_0x317d('0x111')]!==_0x351dc3&&(this[_0x317d('0x111')]=_0x351dc3,this[_0x317d('0x53')]());},Sprite_MenuBackgroundActor[_0x317d('0x17c')][_0x317d('0x53')]=function(){this[_0x317d('0x186')]=![];if(this[_0x317d('0x111')]){if(_0x317d('0x88')!==_0x317d('0x88')){function _0x3ef201(){const _0x2a3b76=_0x1dd84b['loadPicture'](_0x523b86[_0x317d('0x17f')]());_0x39d36b=(_0x4eba81||_0x582d90['faceWidth'])-0x2,_0x32b940=(_0x3aa634||_0x3970c9[_0x317d('0x3a')])-0x2;const _0x10d0a2=_0x2a3b76[_0x317d('0x66')],_0x2ebcf3=_0x2a3b76[_0x317d('0xd7')],_0xbd2bce=_0x167562,_0x3536be=_0x23e89a-0x2,_0x125035=_0xe4d457+_0x43eb5d[_0x317d('0x10b')](_0xbd2bce/0x2),_0x2e269d=_0x41d6e4+_0x2edacc[_0x317d('0x181')]((_0x12b69e+_0x2ebcf3)/0x2);this[_0x317d('0x2a')]===_0x2dae09&&this[_0x317d('0xd')](_0x1dc777[_0x317d('0xe2')]());const _0x55d34b=_0x3c53a5[_0x317d('0x14')](_0x4cd744,_0x10d0a2),_0x251c25=_0x1b6b76['min'](_0x415e7e,_0x2ebcf3),_0x5dd7c2=_0x16c641+0x1,_0x131cc3=_0x3e602e[_0x317d('0x9')](_0xdf86ea+0x1,_0x123ecb+_0x3536be-_0x2ebcf3+0x3),_0x1a4b9b=(_0x10d0a2-_0x55d34b)/0x2,_0x1d14b4=(_0x2ebcf3-_0x251c25)/0x2;this['contents'][_0x317d('0x57')](_0x2a3b76,_0x1a4b9b,_0x1d14b4,_0x55d34b,_0x251c25,_0x5dd7c2,_0x131cc3),this['changePaintOpacity'](!![]);}}else this[_0x317d('0x139')]=ImageManager[_0x317d('0x55')](this[_0x317d('0x111')][_0x317d('0x17f')]()),this[_0x317d('0x139')][_0x317d('0xe4')](this[_0x317d('0x136')][_0x317d('0x3')](this));}else this[_0x317d('0x139')]=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x317d('0x17c')][_0x317d('0x136')]=function(){this[_0x317d('0x186')]=!![],VisuMZ[_0x317d('0x171')]['Settings']['General'][_0x317d('0x97')][_0x317d('0xaf')](this);},Sprite_MenuBackgroundActor[_0x317d('0x17c')][_0x317d('0xad')]=function(){Sprite[_0x317d('0x17c')][_0x317d('0xad')][_0x317d('0xaf')](this);if(this[_0x317d('0x186')]){if(_0x317d('0x7b')!==_0x317d('0x37'))this['updateOpacity'](),this['updatePosition'](),this['updateDuration']();else{function _0x12df1c(){this[_0x317d('0x27')][_0x317d('0x17')]();}}}},Sprite_MenuBackgroundActor[_0x317d('0x17c')][_0x317d('0x51')]=function(){if(this['_duration']>0x0){const _0x5f3fe3=this[_0x317d('0xa')];this['opacity']=(this[_0x317d('0x132')]*(_0x5f3fe3-0x1)+0xff)/_0x5f3fe3;}},Sprite_MenuBackgroundActor[_0x317d('0x17c')]['updatePosition']=function(){if(this['_duration']>0x0){const _0x3a40c9=this[_0x317d('0xa')];this['x']=(this['x']*(_0x3a40c9-0x1)+this[_0x317d('0x115')])/_0x3a40c9,this['y']=(this['y']*(_0x3a40c9-0x1)+this[_0x317d('0xcb')])/_0x3a40c9;}},Sprite_MenuBackgroundActor[_0x317d('0x17c')][_0x317d('0x116')]=function(){if(this['_duration']>0x0)this[_0x317d('0xa')]--;},ImageManager['svActorHorzCells']=0x9,ImageManager[_0x317d('0x5c')]=0x6,Window_Base[_0x317d('0x17c')][_0x317d('0x5d')]=function(_0x15f1a0,_0x4d7de6,_0x848b97){const _0x48da86=ImageManager[_0x317d('0xc0')](_0x15f1a0),_0x27c2d9=_0x48da86['width']/ImageManager['svActorHorzCells'],_0x285c37=_0x48da86['height']/ImageManager[_0x317d('0x5c')],_0x2c5d25=0x0,_0x1c3bc8=0x0;this[_0x317d('0x30')][_0x317d('0x57')](_0x48da86,_0x2c5d25,_0x1c3bc8,_0x27c2d9,_0x285c37,_0x4d7de6-_0x27c2d9/0x2,_0x848b97-_0x285c37);},Window_MenuCommand[_0x317d('0x13f')]=VisuMZ['MainMenuCore'][_0x317d('0x5b')][_0x317d('0x20')],VisuMZ[_0x317d('0x171')][_0x317d('0x63')]=Window_MenuCommand[_0x317d('0x17c')]['initialize'],Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x6f')]=function(_0x4bb4d8){VisuMZ['MainMenuCore'][_0x317d('0x63')]['call'](this,_0x4bb4d8),this[_0x317d('0x73')](_0x4bb4d8);},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x73')]=function(_0x4f1810){const _0x2fc75b=new Rectangle(0x0,0x0,_0x4f1810[_0x317d('0x66')],_0x4f1810[_0x317d('0xd7')]);this[_0x317d('0x3c')]=new Window_Base(_0x2fc75b),this[_0x317d('0x3c')][_0x317d('0x132')]=0x0,this[_0x317d('0x10')](this[_0x317d('0x3c')]),this[_0x317d('0x5a')]();},Window_MenuCommand[_0x317d('0x17c')]['callUpdateHelp']=function(){Window_HorzCommand[_0x317d('0x17c')][_0x317d('0xcf')]['call'](this);if(this[_0x317d('0x3c')])this[_0x317d('0x5a')]();},Window_MenuCommand['prototype'][_0x317d('0x5a')]=function(){const _0x1643dd=this[_0x317d('0x3c')];_0x1643dd['contents'][_0x317d('0x90')]();const _0x3a8c7c=this[_0x317d('0x119')](this[_0x317d('0x13a')]());if(_0x3a8c7c===_0x317d('0xb1')){const _0x5d3b33=this['itemLineRect'](this[_0x317d('0x13a')]());let _0x479b11=this[_0x317d('0x13b')](this[_0x317d('0x13a')]());_0x479b11=_0x479b11['replace'](/\\I\[(\d+)\]/gi,''),_0x1643dd[_0x317d('0x14e')](),this[_0x317d('0x5e')](_0x479b11,_0x5d3b33),this[_0x317d('0x26')](_0x479b11,_0x5d3b33),this[_0x317d('0x151')](_0x479b11,_0x5d3b33);}},Window_MenuCommand['prototype'][_0x317d('0x5e')]=function(_0x3da797,_0x3165dc){},Window_MenuCommand[_0x317d('0x17c')]['commandNameWindowDrawText']=function(_0x2479f2,_0x20dce1){const _0x5550e8=this['_commandNameWindow'];_0x5550e8['drawText'](_0x2479f2,0x0,_0x20dce1['y'],_0x5550e8['innerWidth'],_0x317d('0x166'));},Window_MenuCommand['prototype'][_0x317d('0x151')]=function(_0x5a3344,_0x15ea6d){const _0x49636b=this[_0x317d('0x3c')],_0x9a7fa0=$gameSystem[_0x317d('0xbe')](),_0x190035=_0x15ea6d['x']+Math[_0x317d('0x10b')](_0x15ea6d[_0x317d('0x66')]/0x2)+_0x9a7fa0;_0x49636b['x']=_0x49636b['width']/-0x2+_0x190035,_0x49636b['y']=Math[_0x317d('0x10b')](_0x15ea6d['height']/0x4);},Window_MenuCommand[_0x317d('0x17c')]['itemHeight']=function(){const _0x2bc042=SceneManager['_scene'][_0x317d('0x16a')]();if(_0x2bc042===_0x317d('0x14c')){if(_0x317d('0x10f')!==_0x317d('0x3f')){const _0x1c1774=VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x168')][_0x317d('0x9b')];return this[_0x317d('0x17e')]()*_0x1c1774+0x8;}else{function _0x5882fe(){const _0x3e4cc8=this[_0x317d('0xb4')](_0xbacdb8),_0x48e636=this[_0x317d('0x13b')](_0x560e53),_0x5c7527=this[_0x317d('0xa3')](_0x48e636)[_0x317d('0x66')];this[_0x317d('0xd')](this['isCommandEnabled'](_0x37be4b));let _0x29572b=this['itemTextAlign']();if(_0x29572b===_0x317d('0x8c'))this[_0x317d('0x16e')](_0x48e636,_0x3e4cc8['x']+_0x3e4cc8[_0x317d('0x66')]-_0x5c7527,_0x3e4cc8['y'],_0x5c7527);else{if(_0x29572b==='center'){const _0x453a36=_0x3e4cc8['x']+_0x350c9d[_0x317d('0x10b')]((_0x3e4cc8[_0x317d('0x66')]-_0x5c7527)/0x2);this[_0x317d('0x16e')](_0x48e636,_0x453a36,_0x3e4cc8['y'],_0x5c7527);}else this[_0x317d('0x16e')](_0x48e636,_0x3e4cc8['x'],_0x3e4cc8['y'],_0x5c7527);}}}}else{if('DmvKu'!==_0x317d('0x120')){function _0x755e4f(){if(_0xd58564['MainMenuCore'][_0x317d('0x5b')][_0x317d('0x21')]['AutoGoldY']){const _0x63d766=_0x1fdf84['height']-this[_0x317d('0x4e')](0x1,![]);_0x283320['y']+=_0x63d766;}_0x20fb19[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x21')][_0x317d('0x13c')]&&(_0x34c384[_0x317d('0xd7')]=this['calcWindowHeight'](0x1,![]));}}else return Window_Command[_0x317d('0x17c')]['itemHeight']['call'](this);}},Window_MenuCommand[_0x317d('0x17c')]['makeCommandList']=function(){this[_0x317d('0x174')]();},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x174')]=function(){for(const _0xeada58 of Window_MenuCommand[_0x317d('0x13f')]){if(_0x317d('0x11b')!==_0x317d('0x11b')){function _0x122739(){this['commandName'](_0x2930a4)[_0x317d('0xa1')](/\\I\[(\d+)\]/i);const _0x1d2635=_0x3fd68a(_0x2ad624['$1']),_0x242778=this[_0x317d('0xb4')](_0x30ddf9),_0x2dc77b=_0x242778['x']+_0x5583f7[_0x317d('0x10b')]((_0x242778[_0x317d('0x66')]-_0x3039ad[_0x317d('0x159')])/0x2),_0x4407f7=_0x242778['y']+(_0x242778[_0x317d('0xd7')]-_0x15aa11[_0x317d('0xc6')])/0x2;this[_0x317d('0x12c')](_0x1d2635,_0x2dc77b,_0x4407f7);}}else{const _0x175aae=_0xeada58[_0x317d('0xd5')];if(_0xeada58[_0x317d('0xb7')][_0x317d('0xaf')](this)){if(_0x317d('0x25')!==_0x317d('0x25')){function _0x23391f(){const _0x2cda5d=_0x7ac3fb[_0x317d('0xd5')];if(_0x55b60c[_0x317d('0xb7')][_0x317d('0xaf')](this)){let _0x58438d=_0x24c575[_0x317d('0x157')];if(['',_0x317d('0x130')][_0x317d('0x4a')](_0x58438d))_0x58438d=_0x560feb[_0x317d('0x9c')][_0x317d('0xaf')](this);const _0x51aecd=_0x74be78[_0x317d('0x161')];_0x51aecd>0x0&&this[_0x317d('0x172')]()!=='text'&&(_0x58438d='\x5cI[%1]%2'[_0x317d('0x15e')](_0x51aecd,_0x58438d));const _0x673ded=_0x1a9ff2[_0x317d('0x10a')][_0x317d('0xaf')](this),_0xb44f52=_0x46de29[_0x317d('0x135')][_0x317d('0xaf')](this);this[_0x317d('0x138')](_0x58438d,_0x2cda5d,_0x673ded,_0xb44f52),this['setHandler'](_0x2cda5d,_0x5e5ddc[_0x317d('0x142')][_0x317d('0x3')](this,_0xb44f52));}this[_0x317d('0x100')](_0x2cda5d);}}else{let _0xca9249=_0xeada58[_0x317d('0x157')];if(['',_0x317d('0x130')][_0x317d('0x4a')](_0xca9249))_0xca9249=_0xeada58[_0x317d('0x9c')][_0x317d('0xaf')](this);const _0x4be380=_0xeada58[_0x317d('0x161')];_0x4be380>0x0&&this[_0x317d('0x172')]()!==_0x317d('0xfa')&&(_0xca9249=_0x317d('0x95')[_0x317d('0x15e')](_0x4be380,_0xca9249));const _0x594b35=_0xeada58['EnableJS'][_0x317d('0xaf')](this),_0x38a8fe=_0xeada58[_0x317d('0x135')]['call'](this);this['addCommand'](_0xca9249,_0x175aae,_0x594b35,_0x38a8fe),this[_0x317d('0xf0')](_0x175aae,_0xeada58[_0x317d('0x142')][_0x317d('0x3')](this,_0x38a8fe));}}this[_0x317d('0x100')](_0x175aae);}}},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x100')]=function(_0x4029e6){switch(_0x4029e6){case'item':this[_0x317d('0x46')]();break;case _0x317d('0x60'):this[_0x317d('0x14a')](),this[_0x317d('0x11f')]();break;case'options':this[_0x317d('0x173')]();break;case'save':this[_0x317d('0xf7')]();break;case _0x317d('0x80'):this['addGameEndCommand']();break;}},Window_MenuCommand[_0x317d('0x17c')]['addMainCommands']=function(){},Window_MenuCommand[_0x317d('0x17c')]['addFormationCommand']=function(){},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x11f')]=function(){},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x173')]=function(){},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0xf7')]=function(){},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x3b')]=function(){},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x32')]=function(){const _0x237be4=SceneManager['_scene'][_0x317d('0x16a')]();if([_0x317d('0xae'),_0x317d('0x36')]['includes'](_0x237be4))return this[_0x317d('0xf6')]?this[_0x317d('0x4')]():0x4;else{if(_0x237be4!==_0x317d('0x185')){if(_0x317d('0xf3')!==_0x317d('0xef'))return VisuMZ[_0x317d('0x171')][_0x317d('0x5b')]['CustomCmdWin'][_0x317d('0x5f')];else{function _0x43c666(){const _0x174587=this[_0x317d('0x184')]();for(let _0x4b4d46=0x0;_0x4b4d46<this['maxVisibleItems']();_0x4b4d46++){const _0xccfb3e=_0x174587+_0x4b4d46;_0xccfb3e<this[_0x317d('0x4')]()&&(this[_0x317d('0x54')](_0xccfb3e),this[_0x317d('0xa6')](_0xccfb3e));}}}}else{if('FZkls'!=='FZkls'){function _0x9d06eb(){this[_0x317d('0x139')]=_0x349767[_0x317d('0x55')](this[_0x317d('0x111')][_0x317d('0x17f')]()),this[_0x317d('0x139')][_0x317d('0xe4')](this[_0x317d('0x136')][_0x317d('0x3')](this));}}else return Window_Command[_0x317d('0x17c')][_0x317d('0x32')][_0x317d('0xaf')](this);}}},Window_MenuCommand['prototype'][_0x317d('0x145')]=function(){return VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x168')][_0x317d('0x77')];},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0xa6')]=function(_0x78e9b1){const _0x5b8d22=this[_0x317d('0x119')](_0x78e9b1);if(_0x5b8d22==='iconText')this[_0x317d('0x31')](_0x78e9b1);else _0x5b8d22===_0x317d('0xb1')?this['drawItemStyleIcon'](_0x78e9b1):Window_Command[_0x317d('0x17c')][_0x317d('0xa6')][_0x317d('0xaf')](this,_0x78e9b1);},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x172')]=function(){return VisuMZ[_0x317d('0x171')][_0x317d('0x5b')]['CustomCmdWin'][_0x317d('0xf4')];},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x119')]=function(_0x54eb0e){const _0x4c0a97=this[_0x317d('0x172')]();if(_0x4c0a97!==_0x317d('0x162')){if(_0x317d('0x78')===_0x317d('0x78'))return _0x4c0a97;else{function _0x188192(){_0x4a89c1[_0x317d('0x171')][_0x317d('0xd0')]['call'](this),this[_0x317d('0xc7')]();}}}else{if(_0x317d('0x35')===_0x317d('0x35')){const _0x184b97=this[_0x317d('0x13b')](_0x54eb0e);if(_0x184b97[_0x317d('0xa1')](/\\I\[(\d+)\]/i)){if(_0x317d('0x76')===_0x317d('0x76')){const _0x128967=this[_0x317d('0xb4')](_0x54eb0e),_0x5ac56d=this[_0x317d('0xa3')](_0x184b97)['width'];return _0x5ac56d<=_0x128967[_0x317d('0x66')]?_0x317d('0x69'):_0x317d('0xb1');}else{function _0x1f433d(){this[_0x317d('0x16e')](_0x572c51,_0x1b0c22['x'],_0x4dc833['y'],_0x5e15c0);}}}else return _0x317d('0xfa');}else{function _0x203f5f(){this[_0x317d('0x6f')](...arguments);}}}},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x31')]=function(_0x33d2f7){const _0x5cf191=this[_0x317d('0xb4')](_0x33d2f7),_0x4ec9cc=this[_0x317d('0x13b')](_0x33d2f7),_0x3f0ef0=this[_0x317d('0xa3')](_0x4ec9cc)['width'];this[_0x317d('0xd')](this['isCommandEnabled'](_0x33d2f7));let _0x3b49c7=this[_0x317d('0x145')]();if(_0x3b49c7===_0x317d('0x8c'))this[_0x317d('0x16e')](_0x4ec9cc,_0x5cf191['x']+_0x5cf191[_0x317d('0x66')]-_0x3f0ef0,_0x5cf191['y'],_0x3f0ef0);else{if(_0x3b49c7===_0x317d('0x166')){const _0x427bf1=_0x5cf191['x']+Math[_0x317d('0x10b')]((_0x5cf191[_0x317d('0x66')]-_0x3f0ef0)/0x2);this[_0x317d('0x16e')](_0x4ec9cc,_0x427bf1,_0x5cf191['y'],_0x3f0ef0);}else this[_0x317d('0x16e')](_0x4ec9cc,_0x5cf191['x'],_0x5cf191['y'],_0x3f0ef0);}},Window_MenuCommand[_0x317d('0x17c')][_0x317d('0x85')]=function(_0x445be1){this['commandName'](_0x445be1)[_0x317d('0xa1')](/\\I\[(\d+)\]/i);const _0x4472ac=Number(RegExp['$1']),_0x21890c=this[_0x317d('0xb4')](_0x445be1),_0x52fce6=_0x21890c['x']+Math[_0x317d('0x10b')]((_0x21890c[_0x317d('0x66')]-ImageManager[_0x317d('0x159')])/0x2),_0x338b2d=_0x21890c['y']+(_0x21890c[_0x317d('0xd7')]-ImageManager[_0x317d('0xc6')])/0x2;this[_0x317d('0x12c')](_0x4472ac,_0x52fce6,_0x338b2d);},VisuMZ[_0x317d('0x171')][_0x317d('0xfd')]=Window_StatusBase[_0x317d('0x17c')][_0x317d('0xb6')],Window_StatusBase[_0x317d('0x17c')][_0x317d('0xb6')]=function(){VisuMZ['MainMenuCore'][_0x317d('0xfd')][_0x317d('0xaf')](this),this[_0x317d('0xea')]();},Window_StatusBase[_0x317d('0x17c')][_0x317d('0xea')]=function(){switch(this['graphicType']()){case'sprite':for(const _0x396560 of $gameParty[_0x317d('0x15f')]()){ImageManager[_0x317d('0xa7')](_0x396560[_0x317d('0x129')]());}break;case _0x317d('0x12f'):for(const _0x168482 of $gameParty[_0x317d('0x15f')]()){ImageManager['loadSvActor'](_0x168482['battlerName']());}break;}},Window_StatusBase[_0x317d('0x17c')][_0x317d('0x7f')]=function(){return VisuMZ['MainMenuCore'][_0x317d('0x5b')]['StatusGraphic'];},Window_StatusBase['prototype'][_0x317d('0xb3')]=function(_0x510b55,_0x373678,_0x5d76d4,_0x203f9c,_0x14b96f){_0x203f9c=_0x203f9c||ImageManager[_0x317d('0x12')],_0x14b96f=_0x14b96f||ImageManager[_0x317d('0x3a')];const _0x523d0b=ImageManager[_0x317d('0x12')],_0x260c6c=_0x14b96f-0x2,_0x45feae=_0x373678+Math[_0x317d('0x10b')]((_0x203f9c-_0x523d0b)/0x2);if(this[_0x317d('0x2a')]===Window_MenuStatus){if(_0x317d('0xa0')===_0x317d('0x164')){function _0x7d0c6c(){this[_0x317d('0x139')]=new _0x4bee83(0x1,0x1);}}else this[_0x317d('0xd')](_0x510b55['isBattleMember']());}this['drawActorFace'](_0x510b55,_0x45feae,_0x5d76d4,_0x523d0b,_0x260c6c),this['changePaintOpacity'](!![]);},Window_StatusBase[_0x317d('0x17c')][_0x317d('0x141')]=function(_0x439da1,_0x2e79a9,_0x302c46,_0x462a37,_0x96d562){_0x462a37=_0x462a37||ImageManager['faceWidth'],_0x96d562=_0x96d562||ImageManager[_0x317d('0x3a')];const _0x42b5d1=_0x439da1[_0x317d('0x129')](),_0x59686d=_0x439da1['characterIndex'](),_0x64aff2=ImageManager[_0x317d('0xa7')](_0x42b5d1),_0x450849=ImageManager[_0x317d('0xd3')](_0x42b5d1),_0x5ef249=_0x64aff2[_0x317d('0x66')]/(_0x450849?0x3:0xc),_0x2ca3de=_0x64aff2[_0x317d('0xd7')]/(_0x450849?0x4:0x8),_0x3f3658=_0x462a37,_0x23d0b2=_0x96d562-0x2,_0x147cb5=_0x2e79a9+Math[_0x317d('0x10b')](_0x3f3658/0x2),_0x107008=_0x302c46+Math[_0x317d('0x181')]((_0x96d562+_0x2ca3de)/0x2);if(this[_0x317d('0x2a')]===Window_MenuStatus){if(_0x317d('0xb8')==='irrwI'){function _0x79eac7(){const _0x81e8aa=this[_0x317d('0x3c')];_0x81e8aa[_0x317d('0x61')](_0x5c2ab7,0x0,_0x345a10['y'],_0x81e8aa[_0x317d('0x1')],_0x317d('0x166'));}}else this[_0x317d('0xd')](_0x439da1['isBattleMember']());}const _0x13832f=Math[_0x317d('0x14')](_0x462a37,_0x5ef249),_0x4492c2=Math['min'](_0x96d562,_0x2ca3de),_0x19954b=Math[_0x317d('0x10b')](_0x2e79a9+Math[_0x317d('0x9')](_0x462a37-_0x5ef249,0x0)/0x2),_0x1bd97d=Math[_0x317d('0x10b')](_0x302c46+Math[_0x317d('0x9')](_0x96d562-_0x2ca3de,0x0)/0x2),_0x4f5147=_0x450849?0x0:_0x59686d,_0x1da881=(_0x4f5147%0x4*0x3+0x1)*_0x5ef249,_0x52eee9=Math['floor'](_0x4f5147/0x4)*0x4*_0x2ca3de;this[_0x317d('0x30')][_0x317d('0x57')](_0x64aff2,_0x1da881,_0x52eee9,_0x13832f,_0x4492c2,_0x19954b,_0x1bd97d),this['changePaintOpacity'](!![]);},Window_StatusBase[_0x317d('0x17c')][_0x317d('0xf9')]=function(_0x31c13d,_0x2160f2,_0x4ea4cd,_0x5c5edf,_0x4010e4){_0x5c5edf=_0x5c5edf||ImageManager[_0x317d('0x12')],_0x4010e4=_0x4010e4||ImageManager[_0x317d('0x3a')];const _0x182587=ImageManager[_0x317d('0xc0')](_0x31c13d[_0x317d('0x48')]()),_0x3723ea=_0x182587[_0x317d('0x66')]/ImageManager[_0x317d('0x8f')],_0x242fcc=_0x182587['height']/ImageManager[_0x317d('0x5c')],_0x54a003=_0x5c5edf,_0x2b79e2=_0x4010e4-0x2,_0x1f266f=_0x2160f2+Math[_0x317d('0x10b')](_0x54a003/0x2),_0x171144=_0x4ea4cd+Math['ceil']((_0x4010e4+_0x242fcc)/0x2);if(this[_0x317d('0x2a')]===Window_MenuStatus){if(_0x317d('0x71')!==_0x317d('0x71')){function _0x5bc4e9(){return this[_0x317d('0x81')]();}}else this[_0x317d('0xd')](_0x31c13d['isBattleMember']());}const _0x48e0ca=Math[_0x317d('0x14')](_0x5c5edf,_0x3723ea),_0x486572=Math[_0x317d('0x14')](_0x4010e4,_0x242fcc),_0xa822bb=Math[_0x317d('0x10b')](_0x2160f2+Math[_0x317d('0x9')](_0x5c5edf-_0x3723ea,0x0)/0x2),_0x2bab86=Math[_0x317d('0x10b')](_0x4ea4cd+Math[_0x317d('0x9')](_0x4010e4-_0x242fcc,0x0)/0x2),_0x32a59c=0x0,_0x4d8baf=0x0;this[_0x317d('0x30')][_0x317d('0x57')](_0x182587,_0x32a59c,_0x4d8baf,_0x48e0ca,_0x486572,_0xa822bb,_0x2bab86),this[_0x317d('0xd')](!![]);},Window_StatusBase[_0x317d('0x17c')][_0x317d('0x40')]=function(_0x15cee9,_0x351a52,_0x54b8ca,_0x1fdfec,_0x17bafb){const _0xbbf4d6=ImageManager[_0x317d('0x55')](_0x15cee9[_0x317d('0x17f')]());_0x1fdfec=(_0x1fdfec||ImageManager[_0x317d('0x12')])-0x2,_0x17bafb=(_0x17bafb||ImageManager['faceHeight'])-0x2;const _0x29884f=_0xbbf4d6[_0x317d('0x66')],_0x1c51d3=_0xbbf4d6[_0x317d('0xd7')],_0x2eaa98=_0x1fdfec,_0x5902e5=_0x17bafb-0x2,_0x74f5ee=_0x351a52+Math[_0x317d('0x10b')](_0x2eaa98/0x2),_0x377264=_0x54b8ca+Math[_0x317d('0x181')]((_0x17bafb+_0x1c51d3)/0x2);this[_0x317d('0x2a')]===Window_MenuStatus&&this[_0x317d('0xd')](_0x15cee9[_0x317d('0xe2')]());const _0x458c82=Math[_0x317d('0x14')](_0x1fdfec,_0x29884f),_0x22485f=Math['min'](_0x17bafb,_0x1c51d3),_0x508c7b=_0x351a52+0x1,_0x2deba4=Math['max'](_0x54b8ca+0x1,_0x54b8ca+_0x5902e5-_0x1c51d3+0x3),_0x46d7e2=(_0x29884f-_0x458c82)/0x2,_0x5e078f=(_0x1c51d3-_0x22485f)/0x2;this['contents'][_0x317d('0x57')](_0xbbf4d6,_0x46d7e2,_0x5e078f,_0x458c82,_0x22485f,_0x508c7b,_0x2deba4),this[_0x317d('0xd')](!![]);},VisuMZ[_0x317d('0x171')][_0x317d('0xf2')]=Window_MenuStatus[_0x317d('0x17c')][_0x317d('0x4')],Window_MenuStatus[_0x317d('0x17c')][_0x317d('0x4')]=function(){if(this['showOnlyBattleMembers']()){if('woBdG'===_0x317d('0x125')){function _0x3e5dd1(){return this['commandWindowRectBottomStyle']();}}else return $gameParty[_0x317d('0x6a')]()[_0x317d('0x28')];}else{if('KbVFt'===_0x317d('0x86')){function _0x436792(){if(_0x2764b5[_0x317d('0xd5')]===_0x19d703){_0x2c7e2e[_0x317d('0x93')][_0x317d('0xaf')](this,_0x482fda);return;}}}else return VisuMZ[_0x317d('0x171')][_0x317d('0xf2')]['call'](this);}},Window_MenuStatus[_0x317d('0x17c')][_0x317d('0xd8')]=function(){const _0x223251=VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x21')];if(_0x223251[_0x317d('0x188')]===undefined)_0x223251['ShowReserve']=!![];const _0x483d44=SceneManager['_scene'];if(!_0x223251[_0x317d('0x188')]){if(_0x317d('0xe9')===_0x317d('0xe9')){if(_0x223251[_0x317d('0x109')])return _0x483d44[_0x317d('0x2a')]===Scene_Menu;return!![];}else{function _0xbfa014(){return _0x3cfd88[_0x317d('0x171')]['Settings'][_0x317d('0x3e')];}}}return![];},Window_MenuStatus[_0x317d('0x17c')][_0x317d('0x72')]=function(){const _0x351ea6=SceneManager[_0x317d('0x123')][_0x317d('0x2a')];if(_0x351ea6===Scene_Menu)return VisuMZ['MainMenuCore'][_0x317d('0x5b')][_0x317d('0xee')];else{if('VmXzC'===_0x317d('0x29')){function _0x354670(){this[_0x317d('0xde')](_0x476702),this['drawItemStatus'](_0xe212da);}}else return VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x154')];}},Window_MenuStatus[_0x317d('0x17c')][_0x317d('0xf1')]=function(){const _0x2eb5a2=this[_0x317d('0x72')]();switch(_0x2eb5a2){case _0x317d('0x104'):case _0x317d('0x2d'):return 0x1;case _0x317d('0xbf'):return 0x1;default:return $gameParty[_0x317d('0x65')]();}},Window_MenuStatus[_0x317d('0x17c')][_0x317d('0x32')]=function(){const _0x425876=this[_0x317d('0x72')]();switch(_0x425876){case _0x317d('0x104'):case _0x317d('0x2d'):return $gameParty[_0x317d('0x65')]();default:return 0x1;}},VisuMZ[_0x317d('0x171')][_0x317d('0x6b')]=Window_MenuStatus[_0x317d('0x17c')][_0x317d('0xc3')],Window_MenuStatus['prototype'][_0x317d('0xc3')]=function(){const _0x303b30=this[_0x317d('0x72')]();switch(_0x303b30){case _0x317d('0x104'):case _0x317d('0x2d'):case _0x317d('0xbf'):return this[_0x317d('0xa4')];case'thin':return Window_Selectable[_0x317d('0x17c')][_0x317d('0xc3')][_0x317d('0xaf')](this);case _0x317d('0x179'):return this[_0x317d('0x17e')]()*0x2+0x8;default:return VisuMZ[_0x317d('0x171')][_0x317d('0x6b')][_0x317d('0xaf')](this);}},Window_MenuStatus[_0x317d('0x17c')][_0x317d('0xa6')]=function(_0x123c40){this[_0x317d('0xde')](_0x123c40),this[_0x317d('0xa8')](_0x123c40);},VisuMZ[_0x317d('0x171')][_0x317d('0x187')]=Window_MenuStatus[_0x317d('0x17c')][_0x317d('0x176')],Window_MenuStatus[_0x317d('0x17c')][_0x317d('0x9f')]=function(_0x5e6b4e,_0x16052a,_0x571300,_0x121e44,_0xcf0ebe){switch(this[_0x317d('0x7f')]()){case'none':break;case _0x317d('0xb0'):this[_0x317d('0x141')](_0x5e6b4e,_0x16052a,_0x571300+0x1,_0x121e44,_0xcf0ebe-0x2);break;case'svbattler':this[_0x317d('0xf9')](_0x5e6b4e,_0x16052a,_0x571300+0x1,_0x121e44,_0xcf0ebe-0x2);break;default:this[_0x317d('0xb3')](_0x5e6b4e,_0x16052a,_0x571300,_0x121e44,_0xcf0ebe);break;}},Window_MenuStatus[_0x317d('0x17c')][_0x317d('0xa8')]=function(_0x175700){this[_0x317d('0x14e')]();const _0x101344=this[_0x317d('0xcc')](_0x175700),_0x19d73e=this[_0x317d('0x9e')](_0x175700),_0x40c998=this[_0x317d('0x72')]();switch(_0x40c998){case _0x317d('0x104'):this[_0x317d('0x15')](_0x101344,_0x19d73e);break;case _0x317d('0x2d'):this[_0x317d('0xb5')](_0x101344,_0x19d73e);break;case _0x317d('0xbf'):this[_0x317d('0x12d')](_0x101344,_0x19d73e);break;case'thin':this[_0x317d('0xe7')](_0x101344,_0x19d73e);break;case _0x317d('0x179'):this[_0x317d('0xf8')](_0x101344,_0x19d73e);break;default:this[_0x317d('0x140')](_0x101344,_0x19d73e);break;}},Window_MenuStatus[_0x317d('0x17c')][_0x317d('0x15')]=function(_0x5c2ec6,_0x21835d){VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x144')][_0x317d('0x12e')][_0x317d('0xaf')](this,_0x5c2ec6,_0x21835d);},Window_MenuStatus['prototype'][_0x317d('0xb5')]=function(_0x128157,_0xdede46){if(_0x128157[_0x317d('0x17f')]()!==''){if(_0x317d('0x75')==='lwCoY'){function _0x1ff99c(){this[_0x317d('0x6f')](...arguments);}}else{const _0x41c900=ImageManager['loadPicture'](_0x128157[_0x317d('0x17f')]());_0x41c900[_0x317d('0xe4')](this['drawItemStatusPortraitStyleOnLoad'][_0x317d('0x3')](this,_0x128157,_0xdede46));}}else this['drawItemStatusVerticalStyle'](_0x128157,_0xdede46);},Window_MenuStatus[_0x317d('0x17c')][_0x317d('0xab')]=function(_0x57f670,_0x58d71a){VisuMZ[_0x317d('0x171')]['Settings'][_0x317d('0x144')][_0x317d('0x3d')]['call'](this,_0x57f670,_0x58d71a);},Window_MenuStatus['prototype'][_0x317d('0x12d')]=function(_0x5a7a21,_0x5b34c5){const _0x502b43=ImageManager[_0x317d('0x55')](_0x5a7a21[_0x317d('0x17f')]());_0x502b43[_0x317d('0xe4')](this[_0x317d('0x105')][_0x317d('0x3')](this,_0x5a7a21,_0x5b34c5));},Window_MenuStatus[_0x317d('0x17c')][_0x317d('0x105')]=function(_0xad39b,_0x536aa9){VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x144')]['SoloStyle']['call'](this,_0xad39b,_0x536aa9);},Window_MenuStatus[_0x317d('0x17c')]['drawItemStatusThinStyle']=function(_0x148415,_0x241705){VisuMZ[_0x317d('0x171')][_0x317d('0x5b')]['ListStyles'][_0x317d('0x156')][_0x317d('0xaf')](this,_0x148415,_0x241705);},Window_MenuStatus[_0x317d('0x17c')][_0x317d('0xf8')]=function(_0x361ab4,_0x81372e){VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x144')][_0x317d('0xa2')][_0x317d('0xaf')](this,_0x361ab4,_0x81372e);},Window_MenuStatus['prototype'][_0x317d('0xc5')]=function(){const _0x24a5ae=this[_0x317d('0x72')]();if([_0x317d('0xbc'),_0x317d('0x179')]['includes'](_0x24a5ae))return![];return Window_StatusBase[_0x317d('0x17c')][_0x317d('0xc5')]['call'](this);},Window_MenuStatus[_0x317d('0x17c')][_0x317d('0x140')]=function(_0x195699,_0x40364f){VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x144')][_0x317d('0x92')][_0x317d('0xaf')](this,_0x195699,_0x40364f);},Window_SkillStatus[_0x317d('0x17c')][_0x317d('0x103')]=function(_0x377136,_0x576844,_0x646822,_0x53d59d,_0x52f2a8){switch(this[_0x317d('0x7f')]()){case _0x317d('0x121'):break;case _0x317d('0xb0'):this[_0x317d('0x141')](_0x377136,_0x576844,_0x646822,_0x53d59d,_0x52f2a8);break;case _0x317d('0x12f'):this[_0x317d('0xf9')](_0x377136,_0x576844,_0x646822,_0x53d59d,_0x52f2a8);break;default:Window_StatusBase[_0x317d('0x17c')][_0x317d('0x103')][_0x317d('0xaf')](this,_0x377136,_0x576844,_0x646822,_0x53d59d,_0x52f2a8);break;}},Window_EquipStatus[_0x317d('0x17c')][_0x317d('0x103')]=function(_0x2743fe,_0x730fee,_0x15c373,_0x295fab,_0x550777){switch(this['graphicType']()){case _0x317d('0x121'):break;case _0x317d('0xb0'):this[_0x317d('0x141')](_0x2743fe,_0x730fee,_0x15c373,_0x295fab,_0x550777);break;case _0x317d('0x12f'):this['drawItemActorSvBattler'](_0x2743fe,_0x730fee,_0x15c373,_0x295fab,_0x550777);break;default:Window_StatusBase['prototype'][_0x317d('0x103')][_0x317d('0xaf')](this,_0x2743fe,_0x730fee,_0x15c373,_0x295fab,_0x550777);break;}};function Window_ThinGold(){this['initialize'](...arguments);}Window_ThinGold['prototype']=Object[_0x317d('0x1e')](Window_Gold[_0x317d('0x17c')]),Window_ThinGold[_0x317d('0x17c')][_0x317d('0x2a')]=Window_ThinGold,Window_ThinGold[_0x317d('0x17c')][_0x317d('0xc3')]=function(){return this[_0x317d('0x17e')]();},Window_ThinGold[_0x317d('0x17c')][_0x317d('0x127')]=function(){return Window_Selectable[_0x317d('0x17c')][_0x317d('0x127')][_0x317d('0xaf')](this);};function Window_Playtime(){this[_0x317d('0x6f')](...arguments);}Window_Playtime[_0x317d('0x17c')]=Object[_0x317d('0x1e')](Window_Selectable[_0x317d('0x17c')]),Window_Playtime[_0x317d('0x17c')][_0x317d('0x2a')]=Window_Playtime,Window_Playtime[_0x317d('0x17c')][_0x317d('0x6f')]=function(_0x1665d6){this[_0x317d('0x150')]=$gameSystem['playtimeText'](),this[_0x317d('0x5')]=0x3c,Window_Selectable[_0x317d('0x17c')][_0x317d('0x6f')][_0x317d('0xaf')](this,_0x1665d6),this['refresh']();},Window_Playtime[_0x317d('0x17c')][_0x317d('0xc3')]=function(){return this['lineHeight']();},Window_Playtime[_0x317d('0x17c')][_0x317d('0xad')]=function(){Window_Selectable[_0x317d('0x17c')][_0x317d('0xad')]['call'](this),this[_0x317d('0x177')]();},Window_Playtime[_0x317d('0x17c')][_0x317d('0x177')]=function(){if(this[_0x317d('0x5')]-->0x0){if(_0x317d('0x13d')!==_0x317d('0x13d')){function _0x1c3d5b(){_0x5e6bee[_0x317d('0x171')][_0x317d('0x24')]['call'](this),this[_0x317d('0x128')]();}}else{if(this[_0x317d('0x5')]<=0x0)this[_0x317d('0xba')]();}}},Window_Playtime['prototype'][_0x317d('0xba')]=function(){this[_0x317d('0x5')]=0x3c;const _0xa9dfe2=this[_0x317d('0xb4')](0x0),_0x6cb2ff=_0xa9dfe2['x'],_0x587ede=_0xa9dfe2['y'],_0x1745e8=_0xa9dfe2[_0x317d('0x66')];this[_0x317d('0x30')][_0x317d('0x90')](),this[_0x317d('0x2f')](_0xa9dfe2),this[_0x317d('0x38')](_0xa9dfe2),this[_0x317d('0xb')](_0xa9dfe2);},Window_Playtime[_0x317d('0x17c')][_0x317d('0x14e')]=function(){Window_Selectable[_0x317d('0x17c')][_0x317d('0x14e')][_0x317d('0xaf')](this),this['contents']['fontSize']=VisuMZ[_0x317d('0x171')][_0x317d('0x5b')]['Playtime'][_0x317d('0x22')];},Window_Playtime[_0x317d('0x17c')][_0x317d('0x2f')]=function(_0x2f5f6c){if(VisuMZ[_0x317d('0x171')][_0x317d('0x5b')]['Playtime'][_0x317d('0x161')]>0x0){const _0x90e2ac=VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0x52')][_0x317d('0x161')],_0x1982c0=_0x2f5f6c['y']+(this[_0x317d('0x17e')]()-ImageManager[_0x317d('0xc6')])/0x2;this[_0x317d('0x12c')](_0x90e2ac,_0x2f5f6c['x'],_0x1982c0);const _0x521453=ImageManager[_0x317d('0x159')]+0x4;_0x2f5f6c['x']+=_0x521453,_0x2f5f6c['width']-=_0x521453;}},Window_Playtime['prototype'][_0x317d('0x38')]=function(_0x3287fd){this[_0x317d('0x14e')](),this[_0x317d('0xd9')](ColorManager[_0x317d('0x2b')]());const _0x9fe171=VisuMZ['MainMenuCore']['Settings'][_0x317d('0x52')][_0x317d('0x4f')];this['drawText'](_0x9fe171,_0x3287fd['x'],_0x3287fd['y'],_0x3287fd[_0x317d('0x66')],'left'),this[_0x317d('0xd2')]();},Window_Playtime[_0x317d('0x17c')][_0x317d('0xb')]=function(_0x3ed5ce){const _0x2c6679=$gameSystem[_0x317d('0x11d')]();this[_0x317d('0x61')](_0x2c6679,_0x3ed5ce['x'],_0x3ed5ce['y'],_0x3ed5ce[_0x317d('0x66')],_0x317d('0x8c'));};function Window_MenuVariables(){this['initialize'](...arguments);}Window_MenuVariables[_0x317d('0x17c')]=Object[_0x317d('0x1e')](Window_Selectable['prototype']),Window_MenuVariables[_0x317d('0x17c')]['constructor']=Window_MenuVariables,Window_MenuVariables[_0x317d('0x17c')][_0x317d('0x6f')]=function(_0xa6e621){Window_Selectable['prototype'][_0x317d('0x6f')][_0x317d('0xaf')](this,_0xa6e621),this[_0x317d('0x8')]=VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0xe8')][_0x317d('0xdf')],this['refresh']();},Window_MenuVariables[_0x317d('0x17c')][_0x317d('0xc3')]=function(){return this[_0x317d('0x17e')]();},Window_MenuVariables[_0x317d('0x17c')][_0x317d('0x32')]=function(){const _0x2d3f21=SceneManager[_0x317d('0x123')]['commandWindowStyle']();if(_0x2d3f21===_0x317d('0x185')){if(_0x317d('0x163')===_0x317d('0x163'))return 0x1;else{function _0x207f76(){const _0x550847=this[_0x317d('0x14f')](),_0x12d4cb=this[_0x317d('0x4e')](0x1,![]),_0x21cf44=0x0,_0x5dd583=this[_0x317d('0x11a')]();return new _0xeb105e(_0x21cf44,_0x5dd583,_0x550847,_0x12d4cb);}}}else{if('FKRKF'!==_0x317d('0xe0'))return VisuMZ[_0x317d('0x171')]['Settings']['Variable'][_0x317d('0xdf')][_0x317d('0x28')];else{function _0x53057e(){_0x1f5ebb[_0x317d('0xd7')]-=this[_0x317d('0xe1')]()['height'];}}}},Window_MenuVariables[_0x317d('0x17c')]['resetFontSettings']=function(){Window_Selectable[_0x317d('0x17c')]['resetFontSettings'][_0x317d('0xaf')](this),this[_0x317d('0x30')][_0x317d('0x12b')]=VisuMZ[_0x317d('0x171')][_0x317d('0x5b')][_0x317d('0xe8')][_0x317d('0x22')],this[_0x317d('0xd9')](ColorManager['systemColor']());},Window_MenuVariables[_0x317d('0x17c')][_0x317d('0x4')]=function(){return this[_0x317d('0x8')][_0x317d('0x28')];},Window_MenuVariables[_0x317d('0x17c')][_0x317d('0x94')]=function(){const _0x2dcfb1=this[_0x317d('0x184')]();for(let _0x2938ee=0x0;_0x2938ee<this[_0x317d('0xac')]();_0x2938ee++){if(_0x317d('0x1c')==='rLeYN'){function _0x475f3c(){const _0x3ca9bc=this[_0x317d('0x16a')]();if([_0x317d('0x183'),'thinTop','mobile'][_0x317d('0x4a')](_0x3ca9bc))return this[_0x317d('0x81')]();else{if([_0x317d('0x9a'),_0x317d('0x36')]['includes'](_0x3ca9bc))return this[_0x317d('0x14d')]();else{const _0x2eb369=_0x4e30b3[_0x317d('0x171')]['Scene_Menu_goldWindowRect'][_0x317d('0xaf')](this);return this[_0x317d('0x13')](_0x2eb369),_0x2eb369;}}}}else{const _0x39aa7c=_0x2dcfb1+_0x2938ee;_0x39aa7c<this[_0x317d('0x4')]()&&(this[_0x317d('0x54')](_0x39aa7c),this[_0x317d('0xa6')](_0x39aa7c));}}},Window_MenuVariables['prototype']['drawItemBackground']=function(_0x233955){},Window_MenuVariables[_0x317d('0x17c')][_0x317d('0xa6')]=function(_0x53989f){const _0x54cb26=this[_0x317d('0x8')][_0x53989f];if(_0x54cb26<=0x0)return;const _0x57f777=this[_0x317d('0xb4')](_0x53989f);this['resetFontSettings']();let _0x36fb88=0x0,_0x245143=$dataSystem[_0x317d('0x10c')][_0x54cb26][_0x317d('0x8d')]();_0x245143[_0x317d('0xa1')](/\\I\[(\d+)\]/i)&&(_0x36fb88=Number(RegExp['$1']),_0x245143=_0x245143[_0x317d('0xec')](/\\I\[(\d+)\]/i,'')[_0x317d('0x8d')]());if(_0x36fb88>0x0){if(_0x317d('0x2c')===_0x317d('0x2c')){const _0x1c30fb=_0x57f777['y']+(this[_0x317d('0x17e')]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x36fb88,_0x57f777['x'],_0x1c30fb);const _0xb54370=ImageManager['iconWidth']+0x4;_0x57f777['x']+=_0xb54370,_0x57f777[_0x317d('0x66')]-=_0xb54370;}else{function _0x47740d(){return this[_0x317d('0xe5')]();}}}this[_0x317d('0x61')](_0x245143,_0x57f777['x'],_0x57f777['y'],_0x57f777[_0x317d('0x66')],_0x317d('0xc8')),this[_0x317d('0xd9')](ColorManager[_0x317d('0x107')]()),this['drawText']($gameVariables[_0x317d('0x158')](_0x54cb26),_0x57f777['x'],_0x57f777['y'],_0x57f777['width'],_0x317d('0x8c'));};