//=============================================================================
// VisuStella MZ - Save Core
// VisuMZ_1_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SaveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SaveCore = VisuMZ.SaveCore || {};
VisuMZ.SaveCore.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.00] [SaveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Save_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Save Core plugin adds upon the existing functionality of how saves
 * operate in RPG Maker MZ and how the Save Menu appears in-game. Control over
 * autosaves is also provided by this plugin as well as the ability to make
 * Global Switches and Variables accessible across all game saves (including
 * new games).
 *
 * Features include all (but not limited to) the following:
 * 
 * - Save file technicalities including how filenames are made and or how
 *   forage keys are labeled to distinguish games from one another.
 * - Save types (standard, slot-locked, or single) to change saving to be
 *   suited for each game type.
 * - Save confirmation window added to relay information to player on whether
 *   or not a save has been made successfully.
 * - Global Switches and Variables that span across all saves and new games.
 * - Control over how autosaves handle (their own file, save over existing
 *   files, and/or both).
 * - Plugin Commands that enable/disable autosaves and forcefully activate them
 *   or request them.
 * - Change up how the Save Menu appears with various save styles.
 * - Add descriptions and pictures to the save files.
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
 * Global Switches and Global Variables
 * ============================================================================
 *
 * Global Switches and Global Variables are now added into the game engine via
 * this plugin. Global Switches and Global Variables exist in the same state
 * across all save files. This means if Switch 40 is declared to be a Global
 * Switch and is turned ON, then whether you start up a new game or open a
 * different save file, Switch 40 will be in the ON state. Similar will occur
 * with Global Variables.
 *
 * ---
 *
 * <Global> Switch/Variable Name
 *
 * To declare Global Switches and/or Global Variables, insert <Global> into
 * the Switch/Variable's name. That's all there is to it. Whatever value you
 * change the Global Switch/Variable to after declaring it will be changed
 * across all saves.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <Global>, <JS>, or <Self> simultaneously.
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
 * Autosave: Enable/Disable
 * - Enable or Disable Autosave
 * - Requires Database => System 1 => [x] Enable Autosave
 *
 *   Enable or Disable?:
 *   - Enable or disable autosave?
 *
 * ---
 *
 * Autosave: (Stage 1) Request
 * - Autosaves the game at current point if enabled.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - Autosave does not go through if it is neither enabled in the database or
 *   in-game through the "Autosave: Enable/Disable" plugin command.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 2) Execute
 * - Executes autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 3) Force
 * - Forces autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 *
 * ---
 *
 * Save: Current Slot
 * - Process the game's current save at the current point.
 * - Must be outside of battle and on the map.
 *
 * ---
 *
 * Save: Set Description
 * - Set the description text that will appear in the save files.
 *
 *   Text:
 *   - Insert desired save description text here.
 *   - Text codes supported.
 *
 * ---
 *
 * Save: Set Picture
 * - Set the picture that would appear in the save file.
 *
 *   Filename:
 *   - Input the filename here of the desired picture.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Save Settings
 * ============================================================================
 *
 * These are general settings pertaining to saves and the technicalities behind
 * how saves work in your game.
 *
 * ---
 *
 * General
 * 
 *   Save Style:
 *   - Select a save style for the game. Some of these options may alter other
 *     Plugin Parameter settings.
 *   - Standard: Save freely in any slot.
 *   - Slot-Locked: Select one dedicated slot at New Game.
 *   - Single: Only one slot is available for the game.
 * 
 *   Max Save Files:
 *   - Maximum number of save files for the game.
 * 
 *   Autosave Counts?:
 *   - Count the autosave file towards the max count?
 *
 * ---
 *
 * Local Mode
 * 
 *   Local Mode?:
 *   - When running the game on client, use the Local Mode of saving via files
 *     or store saves to forage keys?
 * 
 *   Filename Format:
 *   - Filename format for save files.
 *   - %1 - Save File ID
 * 
 *   Extension Format:
 *   - Filename extension format for save files.
 *   - %1 - Save Name
 *
 * ---
 *
 * Forage Key
 * 
 *   Forage Key Format:
 *   - Forage Key format when saving to memory.
 *   - %1 - Game ID, %2 - Save Name
 * 
 *   Forage Key Test:
 *   - Key used to test if saving a forage key is possible.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Help: Slot-Locked:
 *   - Help description used for initial slot-locked selection.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Save Success:
 *   - Code to perform when a save is successful.
 * 
 *   JS: On Save Failure:
 *   - Code to perform when a save has failed.
 * 
 *   JS: On Load Success:
 *   - Code to perform when a load is successful.
 * 
 *   JS: On Load Failure:
 *   - Code to perform when a load has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Confirm Window Settings
 * ============================================================================
 *
 * The Save Confirmation Window is a new feature added through this plugin.
 * It gives the player visual feedback letting the player know that a save is
 * successful or not.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Save Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions of the Save Confirmation Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for a "Save Success" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Save Failure:
 *   - Text used for a "Save Failure" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Load Failure:
 *   - Text used for a "Load Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Settings
 * ============================================================================
 *
 * These settings adjust how autosaves work in your game project. The settings
 * will encompass the original autosave settings made by RPG Maker MZ as well
 * as new settings added through this plugin.
 *
 * ---
 *
 * General
 * 
 *   Autosave Type:
 *   - Select autosave type.
 *   - Requires Database => System 1 => [x] Enable Autosave
 *   - Autosave File: Dedicated save file for autosaves.
 *   - Current File: Overwrites the current save file.
 *   - Autosave File + Current File: Both of the above.
 * 
 *   Start Enabled?:
 *   - Start with autosave enabled?
 *   - Requires Database => System 1 => [x] Enable Autosave
 *
 * ---
 *
 * Requests
 * 
 *   Requires Save Enable?:
 *   - Autosave requests require Saving to be enabled?
 * 
 *   Request after Battle?:
 *   - Requests an autosave after battle?
 * 
 *   Request on Transfer?:
 *   - Requests an autosave after a map transfer?
 * 
 *   Request on Menu Open?:
 *   - Requests an autosave after opening the main menu?
 * 
 *   Request on Menu Exit?:
 *   - Requests an autosave after exiting the main menu?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Success:
 *   - Code to perform when an autosave is successful.
 * 
 *   JS: On Failure:
 *   - Code to perform when an autosave has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Confirm Window Settings
 * ============================================================================
 *
 * The Autosave Confirmation Window is a new feature added by this plugin to
 * notify the player whenever autosaving occurs.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Autoave Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   Screen Position:
 *   - Where does this window appear on the screen?
 *   - Lower Left
 *   - Lower Center
 *   - Lower Right
 *   - Middle Left
 *   - Middle Center
 *   - Middle Right
 *   - Upper Left
 *   - Upper Center
 *   - Upper Right
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for an "Autosave Success" message popup.
 *   - Text codes are allowed
 * 
 *   Pop Up: Save Failure:
 *   - Text used for an "Autosave Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Options Settings
 * ============================================================================
 *
 * This plugin adds the "Autosave" option to the Options menu, allowing players
 * to decide if they want autosave enabled or not. This feature can be disabled
 * as well, to better suit games. If the "Autosave" option is turned off by the
 * player, then any Autosave requests and executions.
 *
 * ---
 *
 * Autosave Options
 * 
 *   Add Option?:
 *   - Add the 'Autosave' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - Determine the default value of this option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Graphic Settings
 * ============================================================================
 *
 * This Plugin Parameter lets you select which graphic to use for displaying
 * the actor party found inside the save menu.
 *
 * ---
 *
 * Actor Graphic
 * 
 *   None:
 *   - Don't display any actors.
 * 
 *   Face:
 *   - Display the face graphics for the actors.
 * 
 *   Map Sprite:
 *   - Display the sprite graphics for the actors.
 * 
 *   Sideview Battler:
 *   - Display the SV Battler graphics for the actors.
 *   * Note: If you have an existing save made before this plugin was
 *     installed, you may need to save over the existing ones to see the
 *     Sideview Battler graphics.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Menu Styles
 * ============================================================================
 *
 * Save Menu Styles affect how the save files themselves appear to the player,
 * as long horizontal lists, vertical columns, small boxes, or a large file.
 *
 * ---
 *
 * Save Menu Styles
 * 
 *   List:
 *   - Save files stretch horizontally across the screen.
 *   - Save files are listed as rows.
 * 
 *   Vertical:
 *   - Save files are stretched vertically across the screen.
 *   - Save files are depicted as columns.
 * 
 *   Box:
 *   - Save files are small boxes shown on the screen.
 *   - Save files are sign in both rows and columns.
 * 
 *   Large:
 *   - Save files take up the whole screen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Style Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to manipulate how the save styles
 * appear in-game if they're not to your liking. JavaScript familiarity is a
 * must to adjust them.
 *
 * ---
 *
 * General
 * 
 *   Latest Text:
 *   - Text used to depict latest save file.
 * 
 *   Latest Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Sprite Width:
 *   - Pixel width of map sprites when drawn in the Save Menu.
 * 
 *   SV Battler Width:
 *   - Pixel width of sv battlers when drawn in the Save Menu.
 *
 *   JS: Save Display Info:
 *   - Code that, upon saving, determines which info is quickly stored
 *     for displaying.
 *
 * ---
 *
 * List Style
 * Vertical Style
 * Box Style
 * Large Style
 * 
 *   Rows:
 *   - Number of rows for this style.
 * 
 *   Columns:
 *   - Number of column for this style.
 * 
 *   JS: Draw Contents:
 *   - Code on how to draw the contents for this style.
 * 
 *   JS: Draw File Data:
 *   - Code on how to draw the file data for this style.
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
 * @command AutosaveEnable
 * @text Autosave: Enable/Disable
 * @desc Enable or Disable Autosave
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @arg Enable:eval
 * @text Enable or Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable autosave?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveRequest
 * @text Autosave: (Stage 1) Request
 * @desc Autosaves the game at current point if enabled.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveExecute
 * @text Autosave: (Stage 2) Execute
 * @desc Executes autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveForce
 * @text Autosave: (Stage 3) Force
 * @desc Force autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveCurrentSlot
 * @text Save: Current Slot
 * @desc Process the game's current save at the current point.
 * Must be outside of battle and on the map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveDescription
 * @text Save: Set Description
 * @desc Set the description text that will appear in the save files.
 *
 * @arg Text:str
 * @text Text
 * @desc Insert desired save description text here.
 * Text codes supported.
 * @default Text
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SavePicture
 * @text Save: Set Picture
 * @desc Set the picture that would appear in the save file.
 *
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Input the filename here of the desired picture.
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
 * @param SaveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Save:struct
 * @text Save Settings
 * @type struct<Save>
 * @desc General save settings pertaining to the game.
 * @default {"General":"","SaveStyle:str":"standard","MaxSaveFiles:num":"20","AutosaveMaxCount:eval":"false","LocalMode":"","LocalMode:eval":"true","FilenameFmt:str":"file%1","ExtensionFmt:str":"%1.rmmzsave","ForageKey":"","KeyFmt:str":"rmmzsave.%1.%2","TestKey:str":"rmmzsave.test","Vocabulary":"","VocabLockedSaveSlot:str":"Pick a file to start a new game.","JavaScript":"","OnSaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnSaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param SaveConfirm:struct
 * @text Confirm Window
 * @parent Save:struct
 * @type struct<SaveConfirm>
 * @desc Settings regarding the Save Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ConfirmRect:func":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Vocabulary":"","VocabSaveSuccess:str":"Save Successful!","VocabSaveFailure:str":"Could not save!","VocabLoadFailure:str":"Could not load save file!"}
 *
 * @param Autosave:struct
 * @text Autoave Settings
 * @type struct<Autosave>
 * @desc Game settings related to autosave.
 * @default {"General":"","AutosaveType:str":"file0","StartEnabled:eval":"true","Requests":"","RequestsRequireSaveEnable:eval":"true","AfterBattle:eval":"true","AfterTransfer:eval":"true","AfterMenuCall:eval":"true","AfterExitMenu:eval":"true","JavaScript":"","OnAutosaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnAutosaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param AutosaveConfirm:struct
 * @text Confirm Window
 * @parent Autosave:struct
 * @type struct<AutosaveConfirm>
 * @desc Settings regarding the Autosave Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ScreenPosition:str":"lower right","Vocabulary":"","VocabAutosaveSuccess:str":"\\I[193]Autosaved!","VocabAutosaveFailure:str":"\\I[194]Autosave failed!"}
 *
 * @param AutosaveOption:struct
 * @text Options Settings
 * @parent Autosave:struct
 * @type struct<AutosaveOption>
 * @desc Options Menu settings regarding Autosave.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Autosave","Default:num":"true"}
 *
 * @param StyleBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorGraphic:str
 * @text Actor Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in save menus.
 * @default face
 *
 * @param SaveMenuStyle:str
 * @text Save Menu Style
 * @type select
 * @option List
 * @value list
 * @option Vertical
 * @value vertical
 * @option Box
 * @value box
 * @option Large
 * @value large
 * @desc Choose what kind of style to use for the Save Menu.
 * @default box
 *
 * @param SaveMenu:struct
 * @text Style Settings
 * @parent SaveMenuStyle:str
 * @type struct<SaveMenu>
 * @desc Settings regarding the individual Save Menu styles.
 * @default {"General":"","LatestText:str":"NEW!","LatestColor:str":"#f49ac1","SpriteWidth:num":"48","SvBattlerWidth:num":"64","MakeSavefileInfoJS:func":"\"// Declare Constants\\nconst info = arguments[0];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() || '';\\ninfo.picture = $gameSystem.getSavePicture() || '';\\n\\n// Return Save Info\\nreturn info;\"","List":"","ListRows:num":"4","ListCols:num":"1","ListContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold || info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","ListFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","Vertical":"","VertRows:num":"1","VertCols:num":"3","VertContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","VertFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Box":"","BoxRows:num":"2","BoxCols:num":"3","BoxContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","BoxFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Large":"","LargeRows:num":"1","LargeCols:num":"1","LargeContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","LargeFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\""}
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
 * General Save Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Save:
 *
 * @param General
 *
 * @param SaveStyle:str
 * @text Save Style
 * @parent General
 * @type select
 * @option Standard: Save freely in any slot.
 * @value standard
 * @option Slot-Locked: Select one dedicated slot at New Game.
 * @value locked
 * @option Single: Only one slot is available for the game.
 * @value single
 * @desc Select a save style for the game. Some of these options
 * may alter other Plugin Parameter settings.
 * @default standard
 *
 * @param MaxSaveFiles:num
 * @text Max Save Files
 * @parent General
 * @desc Maximum number of save files for the game.
 * @default 20
 *
 * @param AutosaveMaxCount:eval
 * @text Autosave Counts?
 * @parent General
 * @type boolean
 * @on Counts Towards Max
 * @off Doesn't Count
 * @desc Count the autosave file towards the max count?
 * @default false
 *
 * @param LocalMode
 * @text Local Mode
 *
 * @param LocalMode:eval
 * @text Local Mode?
 * @parent LocalMode
 * @type boolean
 * @on Local File
 * @off Forage Key
 * @desc When running the game on client, use the Local Mode of
 * saving via files or store saves to forage keys?
 * @default true
 *
 * @param FilenameFmt:str
 * @text Filename Format
 * @parent LocalMode
 * @desc Filename format for save files.
 * %1 - Save File ID
 * @default file%1
 *
 * @param ExtensionFmt:str
 * @text Extension Format
 * @parent LocalMode
 * @desc Filename extension format for save files.
 * %1 - Save Name
 * @default %1.rmmzsave
 *
 * @param ForageKey
 * @text Forage Key
 *
 * @param KeyFmt:str
 * @text Forage Key Format
 * @parent ForageKey
 * @desc Forage Key format when saving to memory.
 * %1 - Game ID, %2 - Save Name
 * @default rmmzsave.%1.%2
 *
 * @param TestKey:str
 * @text Forage Key Test
 * @parent ForageKey
 * @desc Key used to test if saving a forage key is possible.
 * @default rmmzsave.test
 *
 * @param Vocabulary
 *
 * @param VocabLockedSaveSlot:str
 * @text Help: Slot-Locked
 * @parent Vocabulary
 * @desc Help description used for initial slot-locked selection.
 * @default Pick a file to start a new game.
 *
 * @param JavaScript
 *
 * @param OnSaveSuccessJS:func
 * @text JS: On Save Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnSaveFailureJS:func
 * @text JS: On Save Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadSuccessJS:func
 * @text JS: On Load Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadFailureJS:func
 * @text JS: On Load Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Save Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ConfirmRect:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions of the 
 * Save Confirmation Window.
 * @default "const width = Graphics.boxWidth / 2;\nconst height = this.calcWindowHeight(1, false);\nconst x = (Graphics.width - width) / 2;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Vocabulary
 *
 * @param VocabSaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for a "Save Success" message popup.
 * Text codes are allowed.
 * @default Save Successful!
 *
 * @param VocabSaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for a "Save Failure" message popup.
 * Text codes are allowed.
 * @default Could not save!
 *
 * @param VocabLoadFailure:str
 * @text Pop Up: Load Failure
 * @parent Vocabulary
 * @desc Text used for a "Load Failure" message popup.
 * Text codes are allowed.
 * @default Could not load save file!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Autosave:
 *
 * @param General
 *
 * @param AutosaveType:str
 * @text Autosave Type
 * @parent General
 * @type select
 * @option Autosave File: Dedicated file for autosaves.
 * @value file0
 * @option Current File: Overwrites the current save file.
 * @value current
 * @option Autosave File + Current File: Both of the above.
 * @value both
 * @desc Select autosave type.
 * Requires Database => System 1 => [x] Enable Autosave
 * @default file0
 *
 * @param StartEnabled:eval
 * @text Start Enabled?
 * @parent General
 * @type boolean
 * @on Start Enabled
 * @off Start Disabled
 * @desc Start with autosave enabled?
 * Requires Database => System 1 => [x] Enable Autosave
 * @default true
 *
 * @param Requests
 *
 * @param RequestsRequireSaveEnable:eval
 * @text Requires Save Enable?
 * @parent Requests
 * @type boolean
 * @on Requires Save Enable
 * @off Doesn't Require
 * @desc Autosave requests require Saving to be enabled?
 * @default true
 *
 * @param AfterBattle:eval
 * @text Request after Battle?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after battle?
 * @default true
 *
 * @param AfterTransfer:eval
 * @text Request on Transfer?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after a map transfer?
 * @default true
 *
 * @param AfterMenuCall:eval
 * @text Request on Menu Open?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after opening the main menu?
 * @default true
 *
 * @param AfterExitMenu:eval
 * @text Request on Menu Exit?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after exiting the main menu?
 * @default true
 *
 * @param JavaScript
 *
 * @param OnAutosaveSuccessJS:func
 * @text JS: On Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnAutosaveFailureJS:func
 * @text JS: On Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Autoave Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ScreenPosition:str
 * @text Screen Position
 * @parent General
 * @type select
 * @option Lower Left
 * @value lower left
 * @option Lower Center
 * @value lower center
 * @option Lower Right
 * @value lower right
 * @option Middle Left
 * @value middle left
 * @option Middle Center
 * @value middle center
 * @option Middle Right
 * @value middle right
 * @option Upper Left
 * @value upper left
 * @option Upper Center
 * @value upper center
 * @option Upper Right
 * @value upper right
 * @desc Where does this window appear on the screen?
 * @default lower right
 *
 * @param Vocabulary
 *
 * @param VocabAutosaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for an "Autosave Success" message popup.
 * Text codes are allowed.
 * @default \I[193]Autosaved!
 *
 * @param VocabAutosaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for an "Autosave Failure" message popup.
 * Text codes are allowed.
 * @default \I[194]Autosave failed!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveOption:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Autosave' option to the Options menu?
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
 * @default Autosave
 *
 * @param Default:eval
 * @text Default Value
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Determine the default value of this option.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param General
 *
 * @param LatestText:str
 * @text Latest Text
 * @parent General
 * @desc Text used to depict latest save file.
 * @default NEW!
 *
 * @param LatestColor:str
 * @text Latest Color
 * @parent General
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f49ac1
 *
 * @param SpriteWidth:num
 * @text Sprite Width
 * @parent General
 * @type number
 * @desc Pixel width of map sprites when drawn in the Save Menu.
 * @default 48
 *
 * @param SvBattlerWidth:num
 * @text SV Battler Width
 * @parent General
 * @type number
 * @desc Pixel width of sv battlers when drawn in the Save Menu.
 * @default 64
 *
 * @param MakeSavefileInfoJS:func
 * @text JS: Save Display Info
 * @parent General
 * @type note
 * @desc Code that, upon saving, determines which info is quickly stored for displaying.
 * @default "// Declare Constants\nconst info = arguments[0];\n\n// Store Displayed Save Data\ninfo.gold = $gameParty.gold();\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\ninfo.description = $gameSystem.getSaveDescription() || '';\ninfo.picture = $gameSystem.getSavePicture() || '';\n\n// Return Save Info\nreturn info;"
 *
 * @param List
 * @text List Style
 *
 * @param ListRows:num
 * @text Rows
 * @parent List
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 4
 *
 * @param ListCols:num
 * @text Columns
 * @parent List
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param ListContentsJS:func
 * @text JS: Draw Contents
 * @parent List
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nlet ch = rect.height;\nif (this.actorStyle() === 'sprite') {\n    ch -= lineHeight - 8;\n} else if (this.actorStyle() === 'svbattler') {\n    ch -= lineHeight - 12;\n}\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nif (info.gold || info.description) {\n    const gy = rect.y + rect.height - lineHeight;\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n}\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight;\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');"
 *
 * @param ListFileDataJS:func
 * @text JS: Draw File Data
 * @parent List
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);"
 *
 * @param Vertical
 * @text Vertical Style
 *
 * @param VertRows:num
 * @text Rows
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param VertCols:num
 * @text Columns
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param VertContentsJS:func
 * @text JS: Draw Contents
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + rect.height - lineHeight;\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny -= lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    y -= lineHeight;\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param VertFileDataJS:func
 * @text JS: Draw File Data
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Box
 * @text Box Style
 *
 * @param BoxRows:num
 * @text Rows
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 2
 *
 * @param BoxCols:num
 * @text Columns
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param BoxContentsJS:func
 * @text JS: Draw Contents
 * @parent Box
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst rh = rect.height - lineHeight * 3;\nconst ch = ImageManager.faceHeight;\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + lineHeight;\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\ny += lineHeight;\nconst hw = rect.width / 2;\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nif (info.gold) {\n    // Ignore drawing gold in this style\n    // y = rect.y + rect.height - lineHeight * 3;\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);"
 *
 * @param BoxFileDataJS:func
 * @text JS: Draw File Data
 * @parent Box
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Large
 * @text Large Style
 *
 * @param LargeRows:num
 * @text Rows
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param LargeCols:num
 * @text Columns
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param LargeContentsJS:func
 * @text JS: Draw Contents
 * @parent Large
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 1.5;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param LargeFileDataJS:func
 * @text JS: Draw File Data
 * @parent Large
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 */
//=============================================================================

const _0x4e45=['CYwGq','ConfigManager_makeData','numVisibleRows','file','fileDirectoryPath','drawTextEx','advanced','xSsMH','onSaveSuccess','ScreenPosition','shouldAutosave','CwdaN','VertFileDataJS','executeAutosave','isSaveEnabled','filePath','ConvertParams','variables','VocabLockedSaveSlot','center','_autosaveConfirmWindow','GlobalSwitches','getHours','aGMTG','setFadeSpeed','drawPlaytime','drawFace','loadSvActor','name','loadFailure','Scene_Menu_commandSave','reloadMapIfUpdated','exitMenu','faces','constructor','getMinutes','AutosaveEnable','calcWindowHeight','ListCols','maxCommands','drawSvActor','isEventTest','transfer','playSave','saveFailure','globalValue','switches','enableAutosave','call','description','commandSaveLocked','Autosave','forageTestKey','drawItem','onSaveCoreLoadSuccess','battle','BoxCols','saveMenuSpriteWidth','sprite','OnAutosaveSuccessJS','Scene_Load_onLoadSuccess','Duration','saveConfirmationWindowRect','changeTextColor','saveGame','catch','mainCommandWidth','Scene_Title_terminate','swKmu','getSaveDescription','playtime','parse','openness','_pickLockedSaveSlot','TluRP','glVeG','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','AutosaveMaxCount','openSaveConfirmationWindow','floor','createContents','autosaveFailure','setSavePicture','_processingAutosave','Default','_bypassAutosave','process_VisuMZ_SaveCore_Settings','playLoad','onLoadSuccess','OnAutosaveFailureJS','autosaveSuccess','drawDescription','VocabAutosaveFailure','resetWordWrap','Game_Variables_value','addGeneralOptions','ceil','file0','onTransferEnd','bxsPS','Save','AutosaveForce','drawTimestamp','popScene','ARRAYFUNC','commandContinueSaveCoreSingle','windowPadding','Scene_Base_onAutosaveFailure','onAfterLoad','drawCenteredPicture','isAutosaveEnabled','drawLargeStyleFileData','_active','drawListStyleContents','Scene_Menu_create','LargeRows','VertRows','AutosaveType','AddOption','onSaveCoreSaveSuccess','initialize','_SaveCoreSettings','autosaveOption','split','addCommand','create','GCEpA','isGlobal','drawListStyleFileData','VisuMZ_1_MessageCore','setSetSuccess','forceAutosave','STRUCT','executeSave','openAutosaveConfirmationWindow','commandNewGame','clear','latestSavefile','autosaveEnabled','isLocalMode','drawVerticalStyleContents','Window_Options_addGeneralOptions','_scene','vvzFN','onSaveCoreSaveFailure','refresh','drawCurrency','commandContinue','drawLatestMarker','Name','opacity','currencyUnit','yapSx','OnSaveSuccessJS','SaveMenuStyle','getColorDataFromPluginParameters','setupNewGame','drawCharacter','forageKey','drawBackground','innerWidth','face','pfZui','current','Game_Variables_setValue','onDatabaseLoaded','_fadeSpeed','AutosaveExecute','setSavefileId','drawActorFaces','createSaveConfirmationWindow','dIwDM','Game_Switches_value','_saveConfirmWindow','BoxFileDataJS','registerCommand','zLaJz','getSavePicture','loadPicture','loadFailureConfirmationWindow','faceWidth','svActorHorzCells','[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]','goto','ActorGraphic','drawText','autosaveType','KeyFmt','smoothSelect','closeAutosaveConfirmationWindow','aKbpo','tyUJn','Scene_Boot_onDatabaseLoaded','updateFade','RequestsRequireSaveEnable','large','makeSavename','itemRect','Game_System_initialize','zhLFJ','parameters','match','AfterMenuCall','ARRAYJSON','_commandWindow','activateListWindow','_loadSuccess','_colorCache','FilenameFmt','ExtensionFmt','isNwjs','ListContentsJS','saveCurrentSlot','bind','contentsBack','svbattlers','pickLockedSaveSlot','log','isEnabled','contentsOpacity','status','determineAutosaveBypass','padStart','commandSave','box','setGlobalValue','POmjv','contents','updatePosition','addSaveCoreAutosaveCommand','callMenu','DaSnB','Scene_Title_commandContinue','YFFgI','globalVariables','JjxeU','TestKey','isPreviousScene','vAbRo','ConfirmRect','getDate','autosaveConfirmationWindowRect','saveDescription','getScreenPosition','saveSuccess','applyData','exit','ARRAYNUM','_stored_latestSavefile','addLoadListener','_savefileId','version','resetFontSettings','setValue','number','SvBattlerWidth','map','createAutosaveConfirmationWindow','height','MaxSaveFiles','picture','onSaveCoreLoadFailure','onSaveFailure','left','Game_System_savefileId','actorStyle','requestAutosave','value','removeChild','getMonth','OnSaveFailureJS','FUNC','svbattler','ipctE','StartEnabled','drawBoxStyleFileData','drawFileData','saveMenuSvBattlerWidth','format','innerHeight','activate','menuStyle','setMode','globalSwitches','akeYE','autosave','width','SaveConfirm','VertCols','then','blt','changePaintOpacity','helpWindowText','onBeforeSave','tzadP','battleMembers','drawBoxStyleContents','textSizeEx','timestamp','single','AutosaveRequest','Scene_Save_onSaveFailure','close','onLoadFailure','Pevsk','drawLargeStyleContents','push','update','drawContents','MakeSavefileInfoJS','Scene_Map_onTransferEnd','ARRAYEVAL','Scene_Base_requestAutosave','inBattle','maxCols','LocalMode','optAutosave','min','save','SaveCore','maxSavefiles','savefileId','Scene_Title_commandNewGame','Nxexh','epaAd','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','svActorVertCells','drawActorSprites','Scene_Save_helpWindowText','onMapLoaded','fadeOut','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','onAutosaveFailure','bLuAf','initSaveCore','isBattleTest','saveStyle','Window_SavefileList_setMode','drawContentsLoaded','gold','ARRAYSTRUCT','OnLoadFailureJS','includes','characters','return\x200','_listWindow','VocabLoadFailure','svbattlersForSaveFile','dimColor1','itemPadding','gradientFillRect','max','OnLoadSuccessJS','VertContentsJS','AutosaveConfirm','Scene_Map_onMapLoaded','playBuzzer','gameId','isSaveConfirmWindowEnabled','saXwl','OKNLx','vertical','_success','addChild','Scene_Base_onAutosaveSuccess','LargeFileDataJS','startNewGameLockedSave','makeData','terminate','SaveMenu','isAutosaveConfirmWindowEnabled','savefileInfo','Filename','getTimestamp','right','AdjustRect','drawTitle','LatestText','toUpperCase','join','fadeOutAll','AfterExitMenu','round','prototype','Scene_Options_maxCommands','replace','latestSave','DataManager_makeSavefileInfo','drawPicture','maxBattleMembers','Enable','AutosaveOption','drawVerticalStyleFileData','commandNewGameSaveCoreLocked','drawSvBattlerSprites','both','setSaveDescription','Settings','Scene_Title_initialize','locked','process_VisuMZ_SaveCore_Switches_Variables','addSaveCoreCommands','VFAMF','fadeIn','Scene_Save_executeSave','savePicture','length','closeSaveConfirmationWindow','onAutosaveSuccess','VocabSaveFailure','isAutosaveCompatible'];(function(_0x285865,_0x4e45a5){const _0x1c65f9=function(_0x2ac9db){while(--_0x2ac9db){_0x285865['push'](_0x285865['shift']());}};_0x1c65f9(++_0x4e45a5);}(_0x4e45,0x10d));const _0x1c65=function(_0x285865,_0x4e45a5){_0x285865=_0x285865-0x0;let _0x1c65f9=_0x4e45[_0x285865];return _0x1c65f9;};var label=_0x1c65('0x32'),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x10c3c1){return _0x10c3c1[_0x1c65('0x16a')]&&_0x10c3c1[_0x1c65('0xbf')][_0x1c65('0x49')]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x1c65('0x9e')]=function(_0x5afaae,_0xea320){for(const _0x4cbbaa in _0xea320){if(_0x4cbbaa['match'](/(.*):(.*)/i)){const _0x143f3f=String(RegExp['$1']),_0x17480e=String(RegExp['$2'])[_0x1c65('0x6d')]()['trim']();let _0x54bdf3,_0x3ff4bd,_0x1f1dc0;switch(_0x17480e){case'NUM':_0x54bdf3=_0xea320[_0x4cbbaa]!==''?Number(_0xea320[_0x4cbbaa]):0x0;break;case _0x1c65('0x185'):_0x3ff4bd=_0xea320[_0x4cbbaa]!==''?JSON[_0x1c65('0xd5')](_0xea320[_0x4cbbaa]):[],_0x54bdf3=_0x3ff4bd[_0x1c65('0x18e')](_0x47c119=>Number(_0x47c119));break;case'EVAL':_0x54bdf3=_0xea320[_0x4cbbaa]!==''?eval(_0xea320[_0x4cbbaa]):null;break;case _0x1c65('0x2a'):_0x3ff4bd=_0xea320[_0x4cbbaa]!==''?JSON[_0x1c65('0xd5')](_0xea320[_0x4cbbaa]):[],_0x54bdf3=_0x3ff4bd['map'](_0x2f5add=>eval(_0x2f5add));break;case'JSON':_0x54bdf3=_0xea320[_0x4cbbaa]!==''?JSON[_0x1c65('0xd5')](_0xea320[_0x4cbbaa]):'';break;case _0x1c65('0x159'):_0x3ff4bd=_0xea320[_0x4cbbaa]!==''?JSON[_0x1c65('0xd5')](_0xea320[_0x4cbbaa]):[],_0x54bdf3=_0x3ff4bd[_0x1c65('0x18e')](_0x400e16=>JSON[_0x1c65('0xd5')](_0x400e16));break;case _0x1c65('0x2'):_0x54bdf3=_0xea320[_0x4cbbaa]!==''?new Function(JSON[_0x1c65('0xd5')](_0xea320[_0x4cbbaa])):new Function(_0x1c65('0x4b'));break;case _0x1c65('0xf6'):_0x3ff4bd=_0xea320[_0x4cbbaa]!==''?JSON[_0x1c65('0xd5')](_0xea320[_0x4cbbaa]):[],_0x54bdf3=_0x3ff4bd['map'](_0x542ba5=>new Function(JSON[_0x1c65('0xd5')](_0x542ba5)));break;case'STR':_0x54bdf3=_0xea320[_0x4cbbaa]!==''?String(_0xea320[_0x4cbbaa]):'';break;case'ARRAYSTR':_0x3ff4bd=_0xea320[_0x4cbbaa]!==''?JSON[_0x1c65('0xd5')](_0xea320[_0x4cbbaa]):[],_0x54bdf3=_0x3ff4bd[_0x1c65('0x18e')](_0x329b24=>String(_0x329b24));break;case _0x1c65('0x112'):_0x1f1dc0=_0xea320[_0x4cbbaa]!==''?JSON[_0x1c65('0xd5')](_0xea320[_0x4cbbaa]):{},_0x5afaae[_0x143f3f]={},VisuMZ['ConvertParams'](_0x5afaae[_0x143f3f],_0x1f1dc0);continue;case _0x1c65('0x47'):_0x3ff4bd=_0xea320[_0x4cbbaa]!==''?JSON['parse'](_0xea320[_0x4cbbaa]):[],_0x54bdf3=_0x3ff4bd[_0x1c65('0x18e')](_0xef91c3=>VisuMZ[_0x1c65('0x9e')]({},JSON[_0x1c65('0xd5')](_0xef91c3)));break;default:continue;}_0x5afaae[_0x143f3f]=_0x54bdf3;}}return _0x5afaae;},(_0xa0e4e4=>{const _0x1d530a=_0xa0e4e4[_0x1c65('0xaa')];for(const _0x47b2c5 of dependencies){if(!Imported[_0x47b2c5]){alert(_0x1c65('0x38')[_0x1c65('0x9')](_0x1d530a,_0x47b2c5)),SceneManager[_0x1c65('0x184')]();break;}}const _0x131e11=_0xa0e4e4[_0x1c65('0xbf')];if(_0x131e11[_0x1c65('0x157')](/\[Version[ ](.*?)\]/i)){if(_0x1c65('0x179')==='dQtHK'){function _0x24c261(){_0x3919b7[_0x1c65('0x32')][_0x1c65('0xca')][_0x1c65('0xbe')](this),_0x2a0b79['SaveCore']['Settings']['Save'][_0x1c65('0x53')][_0x1c65('0xbe')](this);}}else{const _0x320bd9=Number(RegExp['$1']);_0x320bd9!==VisuMZ[label][_0x1c65('0x189')]&&(alert(_0x1c65('0x3e')[_0x1c65('0x9')](_0x1d530a,_0x320bd9)),SceneManager['exit']());}}if(_0x131e11[_0x1c65('0x157')](/\[Tier[ ](\d+)\]/i)){const _0x1c1925=Number(RegExp['$1']);if(_0x1c1925<tier)alert(_0x1c65('0xda')[_0x1c65('0x9')](_0x1d530a,_0x1c1925,tier)),SceneManager[_0x1c65('0x184')]();else{if(_0x1c65('0x13e')!=='zLaJz'){function _0x183e1b(){if(this[_0x1c65('0xe1')])return;_0x5f12a9[_0x1c65('0x32')][_0x1c65('0x5f')][_0x1c65('0xbe')](this),_0x7add2c[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xc1')][_0x1c65('0xc9')][_0x1c65('0xbe')](this),this[_0x1c65('0x114')](!![]),this[_0x1c65('0xe1')]=!![];}}else tier=Math[_0x1c65('0x52')](_0x1c1925,tier);}}VisuMZ[_0x1c65('0x9e')](VisuMZ[label][_0x1c65('0x80')],_0xa0e4e4[_0x1c65('0x156')]);})(pluginData),PluginManager[_0x1c65('0x13d')](pluginData[_0x1c65('0xaa')],_0x1c65('0xb2'),_0x1b70dc=>{if(!DataManager[_0x1c65('0x8d')]())return;VisuMZ[_0x1c65('0x9e')](_0x1b70dc,_0x1b70dc);if($gameSystem)$gameSystem[_0x1c65('0xbd')](_0x1b70dc[_0x1c65('0x79')]);}),PluginManager[_0x1c65('0x13d')](pluginData[_0x1c65('0xaa')],_0x1c65('0x1f'),_0x287b24=>{if(!DataManager['isAutosaveCompatible']()||$gameParty[_0x1c65('0x2c')]())return;SceneManager[_0x1c65('0x11c')][_0x1c65('0x198')]();}),PluginManager[_0x1c65('0x13d')](pluginData['name'],_0x1c65('0x135'),_0xbb1c5c=>{if(!DataManager[_0x1c65('0x8d')]()||$gameParty[_0x1c65('0x2c')]())return;SceneManager[_0x1c65('0x11c')][_0x1c65('0x9b')]();}),PluginManager[_0x1c65('0x13d')](pluginData[_0x1c65('0xaa')],_0x1c65('0xf3'),_0x2dbfb2=>{if(!DataManager[_0x1c65('0x8d')]()||$gameParty[_0x1c65('0x2c')]())return;SceneManager[_0x1c65('0x11c')][_0x1c65('0x111')]();}),PluginManager[_0x1c65('0x13d')](pluginData['name'],'SaveCurrentSlot',_0x43d963=>{SceneManager['_scene']['saveCurrentSlot']();}),PluginManager[_0x1c65('0x13d')](pluginData[_0x1c65('0xaa')],'SaveDescription',_0x1fc8d7=>{VisuMZ[_0x1c65('0x9e')](_0x1fc8d7,_0x1fc8d7);if($gameSystem)$gameSystem[_0x1c65('0x7f')](_0x1fc8d7['Text']);}),PluginManager[_0x1c65('0x13d')](pluginData[_0x1c65('0xaa')],'SavePicture',_0x57272d=>{VisuMZ[_0x1c65('0x9e')](_0x57272d,_0x57272d);if($gameSystem)$gameSystem[_0x1c65('0xe0')](_0x57272d[_0x1c65('0x67')]);}),VisuMZ[_0x1c65('0x32')][_0x1c65('0x14e')]=Scene_Boot[_0x1c65('0x72')][_0x1c65('0x133')],Scene_Boot[_0x1c65('0x72')][_0x1c65('0x133')]=function(){VisuMZ[_0x1c65('0x32')][_0x1c65('0x14e')][_0x1c65('0xbe')](this),this[_0x1c65('0xe4')](),this['process_VisuMZ_SaveCore_Switches_Variables']();},Scene_Boot[_0x1c65('0x72')][_0x1c65('0xe4')]=function(){if(StorageManager['saveStyle']()===_0x1c65('0x1e'))$dataSystem['optAutosave']=!![];},VisuMZ[_0x1c65('0xa3')]=[],VisuMZ['GlobalVariables']=[],Scene_Boot[_0x1c65('0x72')][_0x1c65('0x83')]=function(){for(let _0x4f4e6a=0x1;_0x4f4e6a<$dataSystem[_0x1c65('0xbc')][_0x1c65('0x89')];_0x4f4e6a++){if(_0x1c65('0x130')!==_0x1c65('0x85')){if($dataSystem['switches'][_0x4f4e6a][_0x1c65('0x157')](/<GLOBAL>/i))VisuMZ['GlobalSwitches'][_0x1c65('0x25')](_0x4f4e6a);}else{function _0x2b8130(){const _0x4d3b42=_0x5ccb2d[_0x1c65('0xa9')](_0x1d8db9),_0x3a6c10=_0x4d3b42[_0x1c65('0x11')]/_0x349bf2['svActorHorzCells'],_0x58d4b1=_0x4d3b42[_0x1c65('0x190')]/_0x36e263[_0x1c65('0x39')],_0x2b860c=0x0,_0x1259e5=0x0;this['contents']['blt'](_0x4d3b42,_0x2b860c,_0x1259e5,_0x3a6c10,_0x58d4b1,_0x1d63a9-_0x3a6c10/0x2,_0x171d88-_0x58d4b1);}}}for(let _0x4d4cf6=0x1;_0x4d4cf6<$dataSystem[_0x1c65('0x9f')][_0x1c65('0x89')];_0x4d4cf6++){if($dataSystem[_0x1c65('0x9f')][_0x4d4cf6][_0x1c65('0x157')](/<GLOBAL>/i))VisuMZ['GlobalVariables'][_0x1c65('0x25')](_0x4d4cf6);}},DataManager[_0x1c65('0x8d')]=function(){return!DataManager[_0x1c65('0x42')]()&&!DataManager[_0x1c65('0xb7')]()&&$dataSystem['optAutosave'];},DataManager[_0x1c65('0x33')]=function(){if(StorageManager[_0x1c65('0x43')]()===_0x1c65('0x1e'))return 0x1;let _0x23351e=VisuMZ['SaveCore']['Settings'][_0x1c65('0xf2')][_0x1c65('0xdb')]?0x0:0x1;return VisuMZ[_0x1c65('0x32')]['Settings'][_0x1c65('0xf2')][_0x1c65('0x191')]+_0x23351e;},DataManager[_0x1c65('0x152')]=function(_0x37114e){const _0x5edd29=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')]['Save'][_0x1c65('0x15e')];return _0x5edd29[_0x1c65('0x9')](_0x37114e);},VisuMZ[_0x1c65('0x32')]['DataManager_makeSavefileInfo']=DataManager['makeSavefileInfo'],DataManager['makeSavefileInfo']=function(){const _0x3cb6fd=VisuMZ[_0x1c65('0x32')][_0x1c65('0x76')][_0x1c65('0xbe')](this);return VisuMZ[_0x1c65('0x32')]['Settings'][_0x1c65('0x64')][_0x1c65('0x28')][_0x1c65('0xbe')](this,_0x3cb6fd);},ConfigManager[_0x1c65('0x10')]=VisuMZ['SaveCore'][_0x1c65('0x80')][_0x1c65('0x7a')][_0x1c65('0xe2')],ConfigManager['globalSwitches']=[],ConfigManager[_0x1c65('0x178')]=[],VisuMZ[_0x1c65('0x32')][_0x1c65('0x8f')]=ConfigManager[_0x1c65('0x62')],ConfigManager[_0x1c65('0x62')]=function(){const _0x1166f1=VisuMZ[_0x1c65('0x32')][_0x1c65('0x8f')][_0x1c65('0xbe')](this);return _0x1166f1[_0x1c65('0x10')]=this[_0x1c65('0x10')]||VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x7a')][_0x1c65('0xe2')],_0x1166f1[_0x1c65('0xe')]=this[_0x1c65('0xe')]||[],_0x1166f1[_0x1c65('0x178')]=this[_0x1c65('0x178')]||[],_0x1166f1;},VisuMZ[_0x1c65('0x32')]['ConfigManager_applyData']=ConfigManager[_0x1c65('0x183')],ConfigManager[_0x1c65('0x183')]=function(_0xea5f3e){VisuMZ[_0x1c65('0x32')]['ConfigManager_applyData'][_0x1c65('0xbe')](this,_0xea5f3e),this[_0x1c65('0x10')]=_0xea5f3e[_0x1c65('0x10')]!==undefined?_0xea5f3e[_0x1c65('0x10')]:VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x7a')][_0x1c65('0xe2')],this['globalSwitches']=_0xea5f3e['globalSwitches']||[],this[_0x1c65('0x178')]=_0xea5f3e[_0x1c65('0x178')]||[];},StorageManager[_0x1c65('0x119')]=function(){return Utils[_0x1c65('0x160')]()?VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x2e')]:![];},StorageManager[_0x1c65('0x9d')]=function(_0x5105e5){const _0x1be590=this[_0x1c65('0x92')](),_0x26838d=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x15f')];return _0x1be590+_0x26838d['format'](_0x5105e5);},StorageManager[_0x1c65('0x12c')]=function(_0x20b656){const _0xb5200=$dataSystem[_0x1c65('0x94')][_0x1c65('0x58')],_0x2df572=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x149')];return _0x2df572[_0x1c65('0x9')](_0xb5200,_0x20b656);},StorageManager[_0x1c65('0xc2')]=function(){return VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x17a')];},StorageManager[_0x1c65('0x43')]=function(){return VisuMZ['SaveCore'][_0x1c65('0x80')][_0x1c65('0xf2')]['SaveStyle'];},StorageManager[_0x1c65('0x148')]=function(){if(this[_0x1c65('0x43')]()===_0x1c65('0x1e'))return _0x1c65('0xef');else{if(_0x1c65('0x177')!==_0x1c65('0xd2'))return VisuMZ['SaveCore']['Settings'][_0x1c65('0xc1')][_0x1c65('0x103')];else{function _0x35d44b(){const _0x48bf15=_0x154241[_0x1c65('0x94')][_0x1c65('0x58')],_0x137cdd=_0x11362f[_0x1c65('0x32')][_0x1c65('0x80')]['Save']['KeyFmt'];return _0x137cdd['format'](_0x48bf15,_0x22203a);}}}},TextManager[_0x1c65('0x166')]=VisuMZ[_0x1c65('0x32')]['Settings'][_0x1c65('0xf2')][_0x1c65('0xa0')],TextManager['saveSuccess']=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x12')]['VocabSaveSuccess'],TextManager['saveFailure']=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x12')][_0x1c65('0x8c')],TextManager[_0x1c65('0xab')]=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x12')][_0x1c65('0x4d')],TextManager['autosaveOption']=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x7a')][_0x1c65('0x123')],TextManager[_0x1c65('0xe8')]=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x55')]['VocabAutosaveSuccess'],TextManager[_0x1c65('0xdf')]=VisuMZ['SaveCore'][_0x1c65('0x80')][_0x1c65('0x55')][_0x1c65('0xea')],TextManager['latestSave']=VisuMZ[_0x1c65('0x32')]['Settings'][_0x1c65('0x64')][_0x1c65('0x6c')],ColorManager[_0x1c65('0x117')]=function(){const _0x985871='_stored_latestSavefile';this[_0x1c65('0x15d')]=this[_0x1c65('0x15d')]||{};if(this[_0x1c65('0x15d')][_0x985871])return this[_0x1c65('0x15d')][_0x985871];const _0x22a16f=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x64')]['LatestColor'];return this[_0x1c65('0x129')](_0x985871,_0x22a16f);},VisuMZ[_0x1c65('0x32')][_0x1c65('0x154')]=Game_System[_0x1c65('0x72')][_0x1c65('0x106')],Game_System[_0x1c65('0x72')]['initialize']=function(){VisuMZ['SaveCore'][_0x1c65('0x154')][_0x1c65('0xbe')](this),this[_0x1c65('0x41')]();},Game_System['prototype'][_0x1c65('0x41')]=function(){this[_0x1c65('0x107')]={'autosaveEnabled':VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xc1')][_0x1c65('0x5')],'saveDescription':'','savePicture':''};},Game_System['prototype'][_0x1c65('0xfc')]=function(){if(!$dataSystem[_0x1c65('0x2f')])return![];if(this['_SaveCoreSettings']===undefined)this[_0x1c65('0x41')]();if(this[_0x1c65('0x107')][_0x1c65('0x118')]===undefined)this[_0x1c65('0x41')]();return this[_0x1c65('0x107')][_0x1c65('0x118')];},Game_System['prototype'][_0x1c65('0xbd')]=function(_0x22f894){if(!$dataSystem[_0x1c65('0x2f')])return;if(this[_0x1c65('0x107')]===undefined)this[_0x1c65('0x41')]();if(this[_0x1c65('0x107')][_0x1c65('0x118')]===undefined)this[_0x1c65('0x41')]();this[_0x1c65('0x107')][_0x1c65('0x118')]=_0x22f894;},Game_System[_0x1c65('0x72')][_0x1c65('0xd3')]=function(){if(!$dataSystem[_0x1c65('0x2f')])return![];if(this[_0x1c65('0x107')]===undefined)this[_0x1c65('0x41')]();if(this[_0x1c65('0x107')][_0x1c65('0x180')]===undefined)this[_0x1c65('0x41')]();return this[_0x1c65('0x107')][_0x1c65('0x180')];},Game_System[_0x1c65('0x72')][_0x1c65('0x7f')]=function(_0x1eff4a){if(!$dataSystem[_0x1c65('0x2f')])return![];if(this[_0x1c65('0x107')]===undefined)this[_0x1c65('0x41')]();if(this[_0x1c65('0x107')][_0x1c65('0x180')]===undefined)this[_0x1c65('0x41')]();this[_0x1c65('0x107')][_0x1c65('0x180')]=_0x1eff4a;},Game_System[_0x1c65('0x72')][_0x1c65('0x13f')]=function(){if(!$dataSystem[_0x1c65('0x2f')])return![];if(this[_0x1c65('0x107')]===undefined)this[_0x1c65('0x41')]();if(this['_SaveCoreSettings'][_0x1c65('0x88')]===undefined)this[_0x1c65('0x41')]();return this[_0x1c65('0x107')][_0x1c65('0x88')];},Game_System[_0x1c65('0x72')][_0x1c65('0xe0')]=function(_0x1779df){if(!$dataSystem[_0x1c65('0x2f')])return![];if(this['_SaveCoreSettings']===undefined)this[_0x1c65('0x41')]();if(this[_0x1c65('0x107')][_0x1c65('0x88')]===undefined)this['initSaveCore']();this[_0x1c65('0x107')][_0x1c65('0x88')]=_0x1779df;},VisuMZ[_0x1c65('0x32')][_0x1c65('0x196')]=Game_System[_0x1c65('0x72')][_0x1c65('0x34')],Game_System[_0x1c65('0x72')][_0x1c65('0x34')]=function(){const _0x5b37d0=StorageManager[_0x1c65('0x43')]();switch(_0x5b37d0){case _0x1c65('0x82'):return VisuMZ[_0x1c65('0x32')][_0x1c65('0x196')][_0x1c65('0xbe')](this)||0x1;break;case _0x1c65('0x1e'):return 0x0;break;default:return VisuMZ['SaveCore'][_0x1c65('0x196')][_0x1c65('0xbe')](this);break;}},Game_Switches[_0x1c65('0x72')][_0x1c65('0x10d')]=function(_0x594ceb){return $dataSystem['switches'][_0x594ceb]&&VisuMZ['GlobalSwitches']['includes'](_0x594ceb);},VisuMZ[_0x1c65('0x32')][_0x1c65('0x13a')]=Game_Switches[_0x1c65('0x72')][_0x1c65('0x199')],Game_Switches[_0x1c65('0x72')][_0x1c65('0x199')]=function(_0x5f0610){if(this[_0x1c65('0x10d')](_0x5f0610))return this[_0x1c65('0xbb')](_0x5f0610);else{if(_0x1c65('0x17c')!==_0x1c65('0x95'))return VisuMZ[_0x1c65('0x32')][_0x1c65('0x13a')][_0x1c65('0xbe')](this,_0x5f0610);else{function _0x309e3a(){_0x1a460d[_0x1c65('0x32')][_0x1c65('0x56')][_0x1c65('0xbe')](this);if(_0x437ae1[_0x1c65('0x17b')](_0x367b7b))this['determineAutosaveBypass'](_0x1c65('0xae')),this[_0x1c65('0x198')]();else _0x263daa[_0x1c65('0x17b')](_0x3709f0)&&(this[_0x1c65('0x16b')](_0x1c65('0xc5')),this[_0x1c65('0x198')]());}}}},Game_Switches[_0x1c65('0x72')][_0x1c65('0xbb')]=function(_0x3a7941){return ConfigManager[_0x1c65('0xe')]=ConfigManager[_0x1c65('0xe')]||[],!!ConfigManager[_0x1c65('0xe')][_0x3a7941];},VisuMZ['SaveCore']['Game_Switches_setValue']=Game_Switches[_0x1c65('0x72')][_0x1c65('0x18b')],Game_Switches[_0x1c65('0x72')]['setValue']=function(_0x1fad9b,_0x3639f4){if(this[_0x1c65('0x10d')](_0x1fad9b))this[_0x1c65('0x16f')](_0x1fad9b,_0x3639f4);VisuMZ[_0x1c65('0x32')]['Game_Switches_setValue'][_0x1c65('0xbe')](this,_0x1fad9b,_0x3639f4);},Game_Switches[_0x1c65('0x72')]['setGlobalValue']=function(_0x5bf432,_0xb4dc0a){_0x5bf432>0x0&&_0x5bf432<$dataSystem[_0x1c65('0xbc')][_0x1c65('0x89')]&&(ConfigManager['globalSwitches']=ConfigManager[_0x1c65('0xe')]||[],ConfigManager[_0x1c65('0xe')][_0x5bf432]=_0xb4dc0a,ConfigManager[_0x1c65('0x31')]());},Game_Variables[_0x1c65('0x72')][_0x1c65('0x10d')]=function(_0x405c2b){return $dataSystem[_0x1c65('0x9f')][_0x405c2b]&&VisuMZ['GlobalVariables'][_0x1c65('0x49')](_0x405c2b);},VisuMZ[_0x1c65('0x32')][_0x1c65('0xec')]=Game_Variables['prototype'][_0x1c65('0x199')],Game_Variables[_0x1c65('0x72')][_0x1c65('0x199')]=function(_0x1131be){if(this[_0x1c65('0x10d')](_0x1131be))return this['globalValue'](_0x1131be);else{if(_0x1c65('0x99')!==_0x1c65('0x11d'))return VisuMZ[_0x1c65('0x32')][_0x1c65('0xec')][_0x1c65('0xbe')](this,_0x1131be);else{function _0x1faccd(){_0x38e254[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x64')][_0x1c65('0x13c')][_0x1c65('0xbe')](this,_0x16598d,_0x1bbda1);}}}},Game_Variables[_0x1c65('0x72')][_0x1c65('0xbb')]=function(_0x1cefa0){ConfigManager[_0x1c65('0x178')]=ConfigManager[_0x1c65('0x178')]||[];if(ConfigManager['globalVariables'][_0x1cefa0]===undefined){if(_0x1c65('0xa5')!==_0x1c65('0xa5')){function _0x139518(){const _0x28f48c=this[_0x1c65('0x92')](),_0x450f46=_0x5d4969[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x15f')];return _0x28f48c+_0x450f46[_0x1c65('0x9')](_0x5d2739);}}else ConfigManager[_0x1c65('0x178')][_0x1cefa0]=0x0;}return ConfigManager[_0x1c65('0x178')][_0x1cefa0];},VisuMZ[_0x1c65('0x32')][_0x1c65('0x132')]=Game_Variables[_0x1c65('0x72')][_0x1c65('0x18b')],Game_Variables[_0x1c65('0x72')][_0x1c65('0x18b')]=function(_0x48f7aa,_0x732923){if(this['isGlobal'](_0x48f7aa))this[_0x1c65('0x16f')](_0x48f7aa,_0x732923);VisuMZ[_0x1c65('0x32')][_0x1c65('0x132')][_0x1c65('0xbe')](this,_0x48f7aa,_0x732923);},Game_Variables[_0x1c65('0x72')][_0x1c65('0x16f')]=function(_0x100c6d,_0x2fffd7){if(_0x100c6d>0x0&&_0x100c6d<$dataSystem['variables'][_0x1c65('0x89')]){ConfigManager['globalVariables']=ConfigManager[_0x1c65('0x178')]||[];if(typeof _0x2fffd7===_0x1c65('0x18c'))_0x2fffd7=Math[_0x1c65('0xdd')](_0x2fffd7);ConfigManager[_0x1c65('0x178')][_0x100c6d]=_0x2fffd7,ConfigManager[_0x1c65('0x31')]();}},Game_Party[_0x1c65('0x72')][_0x1c65('0x4e')]=function(){return this[_0x1c65('0x1a')]()['map'](_0x59a176=>_0x59a176['battlerName']());},Scene_Base[_0x1c65('0x72')][_0x1c65('0x16b')]=function(_0x3eec00){const _0x21312a=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xc1')];switch(_0x3eec00){case _0x1c65('0xc5'):this[_0x1c65('0xe3')]=!_0x21312a['AfterBattle'];break;case _0x1c65('0xb8'):if(!this['shouldAutosave']())return;this['_bypassAutosave']=!_0x21312a['AfterTransfer'];break;case'callMenu':this[_0x1c65('0xe3')]=!_0x21312a[_0x1c65('0x158')];break;case _0x1c65('0xae'):this[_0x1c65('0xe3')]=!_0x21312a[_0x1c65('0x70')];break;}},VisuMZ['SaveCore'][_0x1c65('0x2b')]=Scene_Base[_0x1c65('0x72')][_0x1c65('0x198')],Scene_Base[_0x1c65('0x72')][_0x1c65('0x198')]=function(){!this[_0x1c65('0xe3')]&&VisuMZ[_0x1c65('0x32')][_0x1c65('0x2b')][_0x1c65('0xbe')](this),this[_0x1c65('0xe3')]=![];},Scene_Base[_0x1c65('0x72')][_0x1c65('0xfc')]=function(){return!DataManager[_0x1c65('0x42')]()&&!DataManager[_0x1c65('0xb7')]()&&$gameSystem[_0x1c65('0xfc')]()&&(VisuMZ['SaveCore'][_0x1c65('0x80')][_0x1c65('0xc1')][_0x1c65('0x150')]?$gameSystem[_0x1c65('0x9c')]():!![]);},Scene_Base['prototype'][_0x1c65('0x9b')]=function(){if(!ConfigManager['autosave'])return;this[_0x1c65('0x111')]();},Scene_Base[_0x1c65('0x72')][_0x1c65('0x111')]=function(){$gameSystem[_0x1c65('0x18')](),this[_0x1c65('0xe1')]=![];const _0x33b425=StorageManager[_0x1c65('0x148')]();[_0x1c65('0xef'),_0x1c65('0x7e')][_0x1c65('0x49')](_0x33b425)&&DataManager[_0x1c65('0xce')](0x0)[_0x1c65('0x14')](()=>this['onAutosaveSuccess']())['catch'](()=>this[_0x1c65('0x3f')]());if([_0x1c65('0x131'),_0x1c65('0x7e')][_0x1c65('0x49')](_0x33b425)){if('IFJbD'===_0x1c65('0xf1')){function _0x157504(){if(!_0x30a995[_0x1c65('0x2f')])return![];if(this[_0x1c65('0x107')]===_0x4a6d66)this[_0x1c65('0x41')]();if(this[_0x1c65('0x107')]['autosaveEnabled']===_0x17d77)this['initSaveCore']();return this[_0x1c65('0x107')][_0x1c65('0x118')];}}else{const _0xf603de=$gameSystem[_0x1c65('0x34')]();_0xf603de>0x0&&DataManager[_0x1c65('0xce')](_0xf603de)['then'](()=>this[_0x1c65('0x8b')]())[_0x1c65('0xcf')](()=>this[_0x1c65('0x3f')]());}}this[_0x1c65('0xe1')]=![];},VisuMZ[_0x1c65('0x32')][_0x1c65('0x5f')]=Scene_Base[_0x1c65('0x72')]['onAutosaveSuccess'],Scene_Base[_0x1c65('0x72')]['onAutosaveSuccess']=function(){if(this['_processingAutosave'])return;VisuMZ[_0x1c65('0x32')][_0x1c65('0x5f')][_0x1c65('0xbe')](this),VisuMZ[_0x1c65('0x32')]['Settings'][_0x1c65('0xc1')][_0x1c65('0xc9')]['call'](this),this['openAutosaveConfirmationWindow'](!![]),this[_0x1c65('0xe1')]=!![];},VisuMZ[_0x1c65('0x32')]['Scene_Base_onAutosaveFailure']=Scene_Base[_0x1c65('0x72')][_0x1c65('0x3f')],Scene_Base[_0x1c65('0x72')][_0x1c65('0x3f')]=function(){if(this[_0x1c65('0xe1')])return;VisuMZ[_0x1c65('0x32')][_0x1c65('0xf9')][_0x1c65('0xbe')](this),VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xc1')][_0x1c65('0xe7')][_0x1c65('0xbe')](this),this[_0x1c65('0x114')](![]);},Scene_Base[_0x1c65('0x72')]['createSaveConfirmationWindow']=function(){if(this[_0x1c65('0x13b')])return;const _0x3fa190=this['saveConfirmationWindowRect']();this['_saveConfirmWindow']=new Window_Base(_0x3fa190),this[_0x1c65('0x13b')][_0x1c65('0xd6')]=0x0;},Scene_Base[_0x1c65('0x72')][_0x1c65('0xcc')]=function(){return VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x12')][_0x1c65('0x17d')][_0x1c65('0xbe')](this);},Scene_Base['prototype'][_0x1c65('0x59')]=function(){return VisuMZ[_0x1c65('0x32')]['Settings'][_0x1c65('0x12')][_0x1c65('0x79')];},Scene_Base[_0x1c65('0x72')]['openSaveConfirmationWindow']=function(_0x24f059,_0x436f30){if(!this[_0x1c65('0x59')]())return this[_0x1c65('0x8a')](_0x24f059);if(!this[_0x1c65('0x13b')])this[_0x1c65('0x138')]();const _0x102e7d=this[_0x1c65('0x13b')];this[_0x1c65('0x19a')](_0x102e7d),this[_0x1c65('0x5e')](_0x102e7d),_0x102e7d['open'](),_0x102e7d[_0x1c65('0x18a')](),_0x102e7d[_0x1c65('0x171')]['clear']();let _0x5a5743='';if(_0x436f30)_0x5a5743=TextManager[_0x1c65('0xab')];else{if(_0x1c65('0x10c')===_0x1c65('0x10c'))_0x5a5743=_0x24f059?TextManager[_0x1c65('0x182')]:TextManager[_0x1c65('0xba')];else{function _0x4f2b1c(){_0x5b7696['saveGame'](0x0)[_0x1c65('0x14')](()=>this[_0x1c65('0x8b')]())[_0x1c65('0xcf')](()=>this[_0x1c65('0x3f')]());}}}const _0x5185a4=_0x102e7d[_0x1c65('0x1c')](_0x5a5743)[_0x1c65('0x11')],_0x11e3cc=(_0x102e7d['innerWidth']-_0x5185a4)/0x2;_0x102e7d[_0x1c65('0x93')](_0x5a5743,_0x11e3cc,0x0,_0x5185a4);const _0x461852=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x12')][_0x1c65('0xcb')];setTimeout(this[_0x1c65('0x8a')][_0x1c65('0x163')](this,_0x24f059),_0x461852);},Scene_Base[_0x1c65('0x72')][_0x1c65('0x141')]=function(){this[_0x1c65('0xdc')](![],!![]);},Scene_Base[_0x1c65('0x72')][_0x1c65('0x8a')]=function(_0x541973){this[_0x1c65('0x13b')][_0x1c65('0x21')]();},Scene_Base[_0x1c65('0x72')][_0x1c65('0x18f')]=function(){if(this[_0x1c65('0xa2')])return;const _0x59033e=this[_0x1c65('0x17f')]();this[_0x1c65('0xa2')]=new Window_AutosaveConfirm(_0x59033e);},Scene_Base[_0x1c65('0x72')][_0x1c65('0x17f')]=function(){const _0x5e2f7b=this[_0x1c65('0xd0')](),_0xd4fd0a=this[_0x1c65('0xb3')](0x1,![]),_0x153e51=Graphics[_0x1c65('0x11')]-_0x5e2f7b,_0x593d57=Graphics[_0x1c65('0x190')]-_0xd4fd0a;return new Rectangle(_0x153e51,_0x593d57,_0x5e2f7b,_0xd4fd0a);},Scene_Base['prototype'][_0x1c65('0x65')]=function(){return VisuMZ[_0x1c65('0x32')]['Settings'][_0x1c65('0x55')][_0x1c65('0x79')];},Scene_Base[_0x1c65('0x72')][_0x1c65('0x114')]=function(_0x583b1f){if(!this[_0x1c65('0x65')]())return this[_0x1c65('0x14b')](_0x583b1f);if(!this[_0x1c65('0xa2')])this[_0x1c65('0x18f')]();const _0x2495c3=this[_0x1c65('0xa2')];this[_0x1c65('0x19a')](_0x2495c3),this[_0x1c65('0x5e')](_0x2495c3),_0x2495c3[_0x1c65('0x110')](_0x583b1f),_0x2495c3[_0x1c65('0x86')]();const _0x15784c=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x12')]['Duration'];setTimeout(this['closeAutosaveConfirmationWindow'][_0x1c65('0x163')](this,_0x583b1f),_0x15784c);},Scene_Base[_0x1c65('0x72')][_0x1c65('0x14b')]=function(_0x1bf7f3){this['_autosaveConfirmWindow'][_0x1c65('0x3d')]();},Scene_Base[_0x1c65('0x72')]['saveCurrentSlot']=function(){},VisuMZ[_0x1c65('0x32')][_0x1c65('0x81')]=Scene_Title[_0x1c65('0x72')]['initialize'],Scene_Title[_0x1c65('0x72')][_0x1c65('0x106')]=function(){VisuMZ['SaveCore'][_0x1c65('0x81')]['call'](this),this['_loadSuccess']=![];},VisuMZ[_0x1c65('0x32')][_0x1c65('0xd1')]=Scene_Title[_0x1c65('0x72')][_0x1c65('0x63')],Scene_Title['prototype']['terminate']=function(){VisuMZ[_0x1c65('0x32')][_0x1c65('0xd1')]['call'](this);if(this['_loadSuccess'])$gameSystem[_0x1c65('0xfa')]();},VisuMZ['SaveCore'][_0x1c65('0x35')]=Scene_Title[_0x1c65('0x72')]['commandNewGame'],Scene_Title[_0x1c65('0x72')][_0x1c65('0x115')]=function(){if(StorageManager[_0x1c65('0x43')]()===_0x1c65('0x82')){if(_0x1c65('0xd8')!==_0x1c65('0xd8')){function _0x44d28b(){if(_0x8507fd==='')return;_0x1edf4e+=0x2,_0x5c0720+=0x2,_0x3c05e1-=0x4,_0x30dbc6-=0x4;const _0x1214c7=_0x279eda[_0x1c65('0x140')](_0xd6c0ab),_0x54e652=_0x1214c7[_0x1c65('0x11')],_0x416e39=_0x1214c7[_0x1c65('0x190')],_0x280421=_0x34db04[_0x1c65('0x30')](_0x8ced2d/_0x54e652,_0x5e2fb0/_0x416e39,_0x32d8f1?0x1:0x3e8),_0x205c97=_0x47acdd[_0x1c65('0xee')](_0x1214c7[_0x1c65('0x11')]*_0x280421),_0x2645d2=_0x45d52e[_0x1c65('0xee')](_0x1214c7[_0x1c65('0x190')]*_0x280421);this['contentsBack'][_0x1c65('0x15')](_0x1214c7,0x0,0x0,_0x54e652,_0x416e39,_0x2b46a2,_0x5859f0,_0x205c97,_0x2645d2);}}else this[_0x1c65('0x7c')]();}else{if(_0x1c65('0x36')==='Nxexh')VisuMZ['SaveCore'][_0x1c65('0x35')][_0x1c65('0xbe')](this);else{function _0x2a57cf(){const _0x51673c=_0x54d9c5(_0x170c03['$1']);_0x51673c!==_0x4c692f[_0x359a9e][_0x1c65('0x189')]&&(_0x5079c3(_0x1c65('0x3e')[_0x1c65('0x9')](_0x27673c,_0x51673c)),_0xe3802e[_0x1c65('0x184')]());}}}},Scene_Title[_0x1c65('0x72')]['commandNewGameSaveCoreLocked']=function(){DataManager[_0x1c65('0x12a')](),$gameTemp[_0x1c65('0xd7')]=!![],this[_0x1c65('0x15a')][_0x1c65('0x21')](),SceneManager[_0x1c65('0x25')](Scene_Save);},VisuMZ[_0x1c65('0x32')][_0x1c65('0x176')]=Scene_Title[_0x1c65('0x72')][_0x1c65('0x121')],Scene_Title[_0x1c65('0x72')][_0x1c65('0x121')]=function(){StorageManager[_0x1c65('0x43')]()===_0x1c65('0x1e')?this[_0x1c65('0xf7')]():VisuMZ[_0x1c65('0x32')][_0x1c65('0x176')][_0x1c65('0xbe')](this);},Scene_Title[_0x1c65('0x72')][_0x1c65('0xf7')]=function(){DataManager['loadGame'](0x0)[_0x1c65('0x14')](()=>this[_0x1c65('0xc4')]())[_0x1c65('0xcf')](()=>this[_0x1c65('0x193')]());},Scene_Title[_0x1c65('0x72')][_0x1c65('0xc4')]=function(){this['_commandWindow'][_0x1c65('0x21')](),SoundManager[_0x1c65('0xe5')](),this[_0x1c65('0x6f')](),Scene_Load[_0x1c65('0x72')][_0x1c65('0xad')](),SceneManager[_0x1c65('0x145')](Scene_Map),this[_0x1c65('0x15c')]=!![],VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')]['Save'][_0x1c65('0x53')][_0x1c65('0xbe')](this);},Scene_Title['prototype'][_0x1c65('0x193')]=function(){SoundManager[_0x1c65('0x57')](),VisuMZ[_0x1c65('0x32')]['Settings'][_0x1c65('0xf2')]['OnLoadFailureJS'][_0x1c65('0xbe')](this),this[_0x1c65('0x141')]();},Scene_Title['prototype']['closeSaveConfirmationWindow']=function(_0x8ad1aa){Scene_Base['prototype'][_0x1c65('0x8a')][_0x1c65('0xbe')](this,_0x8ad1aa),this[_0x1c65('0x15a')]['open'](),this[_0x1c65('0x15a')][_0x1c65('0xb')]();},VisuMZ[_0x1c65('0x32')]['Scene_Map_onMapLoaded']=Scene_Map[_0x1c65('0x72')][_0x1c65('0x3c')],Scene_Map[_0x1c65('0x72')][_0x1c65('0x3c')]=function(){VisuMZ['SaveCore'][_0x1c65('0x56')][_0x1c65('0xbe')](this);if(SceneManager[_0x1c65('0x17b')](Scene_Menu)){if(_0x1c65('0x155')!==_0x1c65('0x155')){function _0xeab624(){return _0x398838['SaveCore'][_0x1c65('0x13a')][_0x1c65('0xbe')](this,_0x6eb927);}}else this[_0x1c65('0x16b')](_0x1c65('0xae')),this[_0x1c65('0x198')]();}else{if(SceneManager[_0x1c65('0x17b')](Scene_Battle)){if('saXwl'!==_0x1c65('0x5a')){function _0x27dcd1(){_0x231bac['setupNewGame'](),_0x245407[_0x1c65('0xd7')]=!![],this[_0x1c65('0x15a')][_0x1c65('0x21')](),_0x4b3c6c['push'](_0x52217c);}}else this[_0x1c65('0x16b')]('battle'),this[_0x1c65('0x198')]();}}},VisuMZ[_0x1c65('0x32')]['Scene_Map_onTransferEnd']=Scene_Map[_0x1c65('0x72')][_0x1c65('0xf0')],Scene_Map[_0x1c65('0x72')][_0x1c65('0xf0')]=function(){this[_0x1c65('0x98')]()&&this[_0x1c65('0x16b')](_0x1c65('0xb8')),VisuMZ[_0x1c65('0x32')][_0x1c65('0x29')][_0x1c65('0xbe')](this);},Scene_Map[_0x1c65('0x72')][_0x1c65('0x162')]=function(){const _0x21e426=$gameSystem[_0x1c65('0x34')]();console[_0x1c65('0x167')](_0x21e426);if(StorageManager[_0x1c65('0x43')]()!==_0x1c65('0x1e')&&_0x21e426<=0x0)return;this[_0x1c65('0xfe')]=![],DataManager[_0x1c65('0xce')](_0x21e426)[_0x1c65('0x14')](()=>this[_0x1c65('0x96')]())[_0x1c65('0xcf')](()=>this[_0x1c65('0x194')]());},Scene_Map['prototype'][_0x1c65('0x96')]=function(){SoundManager[_0x1c65('0xb9')](),VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x127')][_0x1c65('0xbe')](this),this[_0x1c65('0xdc')](!![]);},Scene_Map[_0x1c65('0x72')][_0x1c65('0x194')]=function(){SoundManager['playBuzzer'](),VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x1')][_0x1c65('0xbe')](this),this[_0x1c65('0xdc')](![]);},Scene_Map[_0x1c65('0x72')]['closeSaveConfirmationWindow']=function(_0x4fcc57){Scene_Message[_0x1c65('0x72')][_0x1c65('0x8a')]['call'](this,_0x4fcc57),this[_0x1c65('0xfe')]=!![];},VisuMZ[_0x1c65('0x32')][_0x1c65('0x100')]=Scene_Menu[_0x1c65('0x72')][_0x1c65('0x10b')],Scene_Menu[_0x1c65('0x72')][_0x1c65('0x10b')]=function(){VisuMZ['SaveCore']['Scene_Menu_create'][_0x1c65('0xbe')](this);if(SceneManager['isPreviousScene'](Scene_Map)){if('glVeG'===_0x1c65('0xd9'))this[_0x1c65('0x16b')](_0x1c65('0x174')),this['requestAutosave']();else{function _0x4fdffa(){this[_0x1c65('0xf7')]();}}}},VisuMZ[_0x1c65('0x32')][_0x1c65('0xac')]=Scene_Menu['prototype'][_0x1c65('0x16d')],Scene_Menu[_0x1c65('0x72')][_0x1c65('0x16d')]=function(){const _0x22d6cb=StorageManager[_0x1c65('0x43')]();switch(_0x22d6cb){case _0x1c65('0x82'):case'single':this[_0x1c65('0xc0')]();break;default:VisuMZ[_0x1c65('0x32')][_0x1c65('0xac')][_0x1c65('0xbe')](this);break;}},Scene_Menu[_0x1c65('0x72')]['commandSaveLocked']=function(){const _0x465d57=$gameSystem[_0x1c65('0x34')]();DataManager[_0x1c65('0xce')](_0x465d57)[_0x1c65('0x14')](()=>this[_0x1c65('0x105')]())[_0x1c65('0xcf')](()=>this['onSaveCoreSaveFailure']());},Scene_Menu[_0x1c65('0x72')][_0x1c65('0x105')]=function(){SoundManager[_0x1c65('0xb9')](),VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x127')][_0x1c65('0xbe')](this),this[_0x1c65('0xdc')](!![]);},Scene_Menu[_0x1c65('0x72')][_0x1c65('0x11e')]=function(){SoundManager[_0x1c65('0x57')](),VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x1')][_0x1c65('0xbe')](this),this[_0x1c65('0xdc')](![]);},Scene_Menu[_0x1c65('0x72')]['closeSaveConfirmationWindow']=function(_0x2175f8){Scene_MenuBase[_0x1c65('0x72')][_0x1c65('0x8a')][_0x1c65('0xbe')](this,_0x2175f8),this[_0x1c65('0x15a')][_0x1c65('0xb')]();},Scene_Battle[_0x1c65('0x72')]['requestAutosave']=function(){},VisuMZ['SaveCore']['Scene_Options_maxCommands']=Scene_Options['prototype'][_0x1c65('0xb5')],Scene_Options[_0x1c65('0x72')][_0x1c65('0xb5')]=function(){let _0x533e53=VisuMZ[_0x1c65('0x32')][_0x1c65('0x73')][_0x1c65('0xbe')](this);const _0x554078=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')];if(_0x554078[_0x1c65('0x7a')]['AddOption']&&_0x554078[_0x1c65('0x7a')][_0x1c65('0x6a')])_0x533e53++;return _0x533e53;},Scene_Save['prototype'][_0x1c65('0x96')]=function(){SoundManager['playSave'](),VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x127')]['call'](this),this[_0x1c65('0x4c')][_0x1c65('0x11f')](),this['openSaveConfirmationWindow'](!![]);},VisuMZ[_0x1c65('0x32')][_0x1c65('0x20')]=Scene_Save['prototype'][_0x1c65('0x194')],Scene_Save['prototype'][_0x1c65('0x194')]=function(){SoundManager[_0x1c65('0x57')](),VisuMZ['SaveCore'][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x1')][_0x1c65('0xbe')](this),this[_0x1c65('0xdc')](![]);},Scene_Save[_0x1c65('0x72')][_0x1c65('0x8a')]=function(_0x557fff){Scene_File[_0x1c65('0x72')][_0x1c65('0x8a')][_0x1c65('0xbe')](this,_0x557fff),_0x557fff?this[_0x1c65('0x15b')]():this[_0x1c65('0x15b')]();},Scene_Save[_0x1c65('0x72')][_0x1c65('0xf5')]=function(){$gameTemp[_0x1c65('0xd7')]=![],Scene_File[_0x1c65('0x72')]['popScene'][_0x1c65('0xbe')](this);},VisuMZ[_0x1c65('0x32')][_0x1c65('0x3b')]=Scene_Save[_0x1c65('0x72')][_0x1c65('0x17')],Scene_Save[_0x1c65('0x72')]['helpWindowText']=function(){if($gameTemp[_0x1c65('0xd7')]){if(_0x1c65('0x5b')!==_0x1c65('0x5b')){function _0x40a5b1(){_0x5cdd46['SaveCore'][_0x1c65('0xd1')][_0x1c65('0xbe')](this);if(this[_0x1c65('0x15c')])_0x15e54e[_0x1c65('0xfa')]();}}else return TextManager[_0x1c65('0x166')];}else return VisuMZ[_0x1c65('0x32')][_0x1c65('0x3b')][_0x1c65('0xbe')](this);},VisuMZ[_0x1c65('0x32')][_0x1c65('0x87')]=Scene_Save[_0x1c65('0x72')][_0x1c65('0x113')],Scene_Save[_0x1c65('0x72')]['executeSave']=function(_0x334337){if($gameTemp[_0x1c65('0xd7')]){if(_0x1c65('0x19')===_0x1c65('0x19'))this[_0x1c65('0x61')](_0x334337);else{function _0x16ad0d(){const _0x21b95f=_0x429895[_0x1c65('0x52')](0x0,this['savefileIdToIndex'](_0x512117));this[_0x1c65('0x14a')](_0x21b95f);}}}else{if(_0x1c65('0x14c')!=='aKbpo'){function _0x2fd63f(){if(!_0x56063d['isAutosaveCompatible']()||_0x3f7d33[_0x1c65('0x2c')]())return;_0x2d6a95[_0x1c65('0x11c')][_0x1c65('0x9b')]();}}else VisuMZ[_0x1c65('0x32')][_0x1c65('0x87')][_0x1c65('0xbe')](this,_0x334337);}},Scene_Save[_0x1c65('0x72')]['startNewGameLockedSave']=function(_0x1d1e01){$gameTemp[_0x1c65('0xd7')]=![],SoundManager[_0x1c65('0xe5')](),$gameSystem[_0x1c65('0x136')](_0x1d1e01),this[_0x1c65('0x6f')](),SceneManager[_0x1c65('0x145')](Scene_Map);},VisuMZ[_0x1c65('0x32')][_0x1c65('0xca')]=Scene_Load[_0x1c65('0x72')][_0x1c65('0xe6')],Scene_Load['prototype'][_0x1c65('0xe6')]=function(){VisuMZ[_0x1c65('0x32')][_0x1c65('0xca')][_0x1c65('0xbe')](this),VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')]['OnLoadSuccessJS'][_0x1c65('0xbe')](this);},Scene_Load[_0x1c65('0x72')][_0x1c65('0x22')]=function(){SoundManager['playBuzzer'](),VisuMZ[_0x1c65('0x32')]['Settings'][_0x1c65('0xf2')][_0x1c65('0x48')][_0x1c65('0xbe')](this),this['loadFailureConfirmationWindow']();},Scene_Load['prototype']['closeSaveConfirmationWindow']=function(_0x4595e1){Scene_File['prototype'][_0x1c65('0x8a')][_0x1c65('0xbe')](this,_0x4595e1),this['activateListWindow']();},ImageManager[_0x1c65('0x143')]=0x9,ImageManager[_0x1c65('0x39')]=0x6,Window_Base[_0x1c65('0x72')][_0x1c65('0xb6')]=function(_0x208f78,_0x48021b,_0x49ff15){const _0x519b64=ImageManager[_0x1c65('0xa9')](_0x208f78),_0x51138d=_0x519b64[_0x1c65('0x11')]/ImageManager[_0x1c65('0x143')],_0xc19eba=_0x519b64[_0x1c65('0x190')]/ImageManager[_0x1c65('0x39')],_0x19bc16=0x0,_0x40170c=0x0;this[_0x1c65('0x171')][_0x1c65('0x15')](_0x519b64,_0x19bc16,_0x40170c,_0x51138d,_0xc19eba,_0x48021b-_0x51138d/0x2,_0x49ff15-_0xc19eba);},VisuMZ[_0x1c65('0x32')][_0x1c65('0x11b')]=Window_Options[_0x1c65('0x72')][_0x1c65('0xed')],Window_Options['prototype'][_0x1c65('0xed')]=function(){VisuMZ[_0x1c65('0x32')][_0x1c65('0x11b')]['call'](this),this['addSaveCoreCommands']();},Window_Options['prototype'][_0x1c65('0x84')]=function(){VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x7a')][_0x1c65('0x104')]&&this[_0x1c65('0x173')]();},Window_Options[_0x1c65('0x72')]['addSaveCoreAutosaveCommand']=function(){const _0x192787=TextManager[_0x1c65('0x108')],_0x28a891='autosave';this[_0x1c65('0x10a')](_0x192787,_0x28a891);};function Window_AutosaveConfirm(){this[_0x1c65('0x106')](...arguments);}Window_AutosaveConfirm[_0x1c65('0x72')]=Object[_0x1c65('0x10b')](Window_Base['prototype']),Window_AutosaveConfirm[_0x1c65('0x72')][_0x1c65('0xb0')]=Window_AutosaveConfirm,Window_AutosaveConfirm[_0x1c65('0x72')][_0x1c65('0x106')]=function(_0x33f151){this[_0x1c65('0x134')]=0x0,Window_Base[_0x1c65('0x72')][_0x1c65('0x106')][_0x1c65('0xbe')](this,_0x33f151),this[_0x1c65('0x124')]=0x0,this[_0x1c65('0x169')]=0x0;},Window_AutosaveConfirm[_0x1c65('0x72')]['drawBackground']=function(){const _0x123f5e=0x0,_0x349805=0x0,_0x135a41=this[_0x1c65('0x12e')],_0x48b924=this[_0x1c65('0xa')],_0x3666a4=ColorManager[_0x1c65('0x4f')](),_0x230a2c=ColorManager['dimColor2'](),_0x2b7fc0=_0x135a41/0x2;this[_0x1c65('0x171')][_0x1c65('0x51')](_0x123f5e,_0x349805,_0x2b7fc0,_0x48b924,_0x230a2c,_0x3666a4),this['contents'][_0x1c65('0x51')](_0x123f5e+_0x2b7fc0,_0x349805,_0x2b7fc0,_0x48b924,_0x3666a4,_0x230a2c);},Window_AutosaveConfirm[_0x1c65('0x72')][_0x1c65('0x110')]=function(_0x494819){this[_0x1c65('0x5d')]=_0x494819,this[_0x1c65('0x11f')]();},Window_AutosaveConfirm[_0x1c65('0x72')][_0x1c65('0x11f')]=function(){this[_0x1c65('0x171')][_0x1c65('0x116')]();const _0x38caa0=this['_success']?TextManager['autosaveSuccess']:TextManager[_0x1c65('0xdf')],_0x491f1b=this[_0x1c65('0x1c')](_0x38caa0)[_0x1c65('0x11')];this[_0x1c65('0x11')]=_0x491f1b+($gameSystem[_0x1c65('0xf8')]()+this[_0x1c65('0x50')]())*0x2,this['updatePosition'](),this[_0x1c65('0xde')]();const _0x475276=(this[_0x1c65('0x12e')]-_0x491f1b)/0x2;this[_0x1c65('0x12d')](),this[_0x1c65('0x93')](_0x38caa0,_0x475276,0x0,_0x491f1b);},Window_AutosaveConfirm['prototype'][_0x1c65('0x181')]=function(){return VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x55')][_0x1c65('0x97')];},Window_AutosaveConfirm[_0x1c65('0x72')][_0x1c65('0x172')]=function(){const _0xc905f7=this[_0x1c65('0x181')]();if(_0xc905f7[_0x1c65('0x157')](/upper/i)){if(_0x1c65('0x37')===_0x1c65('0x40')){function _0x196325(){const _0x51f5b8=_0x1c65('0x186');this[_0x1c65('0x15d')]=this[_0x1c65('0x15d')]||{};if(this[_0x1c65('0x15d')][_0x51f5b8])return this['_colorCache'][_0x51f5b8];const _0x1355a3=_0x132777[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x64')]['LatestColor'];return this['getColorDataFromPluginParameters'](_0x51f5b8,_0x1355a3);}}else this['y']=-0x1*$gameSystem['windowPadding']();}else{if(_0xc905f7['match'](/lower/i)){if(_0x1c65('0x170')==='iZWRf'){function _0x26506c(){_0x52294a[_0x1c65('0xb9')](),_0x2dc01e[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0xf2')][_0x1c65('0x127')]['call'](this),this[_0x1c65('0x4c')][_0x1c65('0x11f')](),this[_0x1c65('0xdc')](!![]);}}else this['y']=Graphics[_0x1c65('0x190')]-this['height']+$gameSystem[_0x1c65('0xf8')]();}else this['y']=(Graphics[_0x1c65('0x190')]-this[_0x1c65('0x190')])/0x2;}if(_0xc905f7['match'](/left/i))this['x']=-0x1*$gameSystem['windowPadding']();else _0xc905f7['match'](/right/i)?this['x']=Graphics[_0x1c65('0x11')]-this[_0x1c65('0x11')]+$gameSystem[_0x1c65('0xf8')]():this['x']=(Graphics[_0x1c65('0x11')]-this[_0x1c65('0x11')])/0x2;},Window_AutosaveConfirm[_0x1c65('0x72')][_0x1c65('0x26')]=function(){Window_Base[_0x1c65('0x72')][_0x1c65('0x26')][_0x1c65('0xbe')](this);if(this[_0x1c65('0x134')]!==0x0)this[_0x1c65('0x14f')]();},Window_AutosaveConfirm['prototype'][_0x1c65('0x14f')]=function(){this['contentsOpacity']+=this[_0x1c65('0x134')];if(this[_0x1c65('0x169')]>=0xff||this[_0x1c65('0x169')]<=0x0)this[_0x1c65('0xa6')](0x0);},Window_AutosaveConfirm['prototype'][_0x1c65('0xa6')]=function(_0x19f7b2){this[_0x1c65('0x134')]=_0x19f7b2;},Window_AutosaveConfirm[_0x1c65('0x72')][_0x1c65('0x86')]=function(){this[_0x1c65('0xa6')](0x10);},Window_AutosaveConfirm[_0x1c65('0x72')][_0x1c65('0x3d')]=function(){this[_0x1c65('0xa6')](-0x10);},VisuMZ[_0x1c65('0x32')][_0x1c65('0x44')]=Window_SavefileList[_0x1c65('0x72')][_0x1c65('0xd')],Window_SavefileList[_0x1c65('0x72')][_0x1c65('0xd')]=function(_0x23b67f,_0x11507e){if(StorageManager[_0x1c65('0x148')]()===_0x1c65('0x131'))_0x11507e=![];if($gameTemp[_0x1c65('0xd7')])_0x11507e=![];VisuMZ['SaveCore'][_0x1c65('0x44')]['call'](this,_0x23b67f,_0x11507e);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x90')]=function(){const _0x128ea1=VisuMZ[_0x1c65('0x32')]['Settings']['SaveMenu'],_0x136400=this[_0x1c65('0xc')]();switch(_0x136400){case _0x1c65('0x5c'):return _0x128ea1[_0x1c65('0x102')];break;case _0x1c65('0x16e'):return _0x128ea1['BoxRows'];break;case _0x1c65('0x151'):return _0x128ea1[_0x1c65('0x101')];break;default:return _0x128ea1['ListRows'];break;}},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x2d')]=function(){const _0x778ab9=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')]['SaveMenu'],_0x50df16=this['menuStyle']();switch(_0x50df16){case'vertical':return _0x778ab9[_0x1c65('0x13')];break;case'box':return _0x778ab9[_0x1c65('0xc6')];break;case'large':return _0x778ab9['LargeCols'];break;default:return _0x778ab9[_0x1c65('0xb4')];break;}},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0xeb')]=function(){if(Imported[_0x1c65('0x10f')]){if(_0x1c65('0x4')!==_0x1c65('0xf'))Window_Selectable[_0x1c65('0x72')][_0x1c65('0xeb')][_0x1c65('0xbe')](this);else{function _0x1e31b9(){return _0x5c9149['SaveCore']['Settings']['Save'][_0x1c65('0x2e')];}}}},Window_SavefileList[_0x1c65('0x72')]['setWordWrap']=function(_0x32649a){if(Imported[_0x1c65('0x10f')]){if(_0x1c65('0x175')===_0x1c65('0x139')){function _0x4dd8c0(){_0x5eeeeb[_0x1c65('0x32')][_0x1c65('0x2b')]['call'](this);}}else return Window_Selectable[_0x1c65('0x72')]['setWordWrap']['call'](this,_0x32649a);}else return'';},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x197')]=function(){return VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x146')];},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0xc')]=function(){return VisuMZ[_0x1c65('0x32')]['Settings'][_0x1c65('0x128')];},Window_SavefileList[_0x1c65('0x72')]['selectSavefile']=function(_0x1c5a3f){const _0x38ee7a=Math[_0x1c65('0x52')](0x0,this['savefileIdToIndex'](_0x1c5a3f));this[_0x1c65('0x14a')](_0x38ee7a);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0xc3')]=function(_0x4cd042){const _0x56fb69=this['indexToSavefileId'](_0x4cd042),_0x45eb98=DataManager[_0x1c65('0x66')](_0x56fb69);if(_0x45eb98)_0x45eb98[_0x1c65('0x34')]=_0x56fb69;this[_0x1c65('0x188')]=_0x56fb69;const _0x1bd3e9=this[_0x1c65('0x153')](_0x4cd042);this[_0x1c65('0x18a')](),this[_0x1c65('0x16')](this[_0x1c65('0x168')](_0x56fb69)),this[_0x1c65('0x27')](_0x45eb98,_0x1bd3e9);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x6b')]=function(_0x3dd68c,_0x2116e9,_0xa9a61c){if(_0x3dd68c===0x0){if(_0x1c65('0x14d')===_0x1c65('0x14d'))this[_0x1c65('0x147')](TextManager['autosave'],_0x2116e9,_0xa9a61c,0xb4);else{function _0x165ee0(){this['determineAutosaveBypass']('battle'),this[_0x1c65('0x198')]();}}}else this[_0x1c65('0x147')](TextManager[_0x1c65('0x91')]+'\x20'+_0x3dd68c,_0x2116e9,_0xa9a61c,0xb4);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x122')]=function(_0x584bf6,_0x2bfd71,_0x2d0426){if(_0x584bf6===0x0||DataManager['latestSavefileId']()!==_0x584bf6)return;const _0x957d04=TextManager[_0x1c65('0x75')];this[_0x1c65('0xcd')](ColorManager[_0x1c65('0x117')]()),this[_0x1c65('0x147')](_0x957d04,_0x2bfd71,_0x2d0426,0xb4);},Window_SavefileList[_0x1c65('0x72')]['drawActors']=function(_0x2d729,_0x501b2e,_0x3a6eb3,_0x2fe1e3,_0x1f7f46){if(!_0x2d729['characters'])return;const _0x25082d=this[_0x1c65('0x197')]();switch(_0x25082d){case _0x1c65('0x12f'):this[_0x1c65('0x137')](_0x2d729,_0x501b2e,_0x3a6eb3,_0x2fe1e3,_0x1f7f46);break;case _0x1c65('0xc8'):this[_0x1c65('0x3a')](_0x2d729,_0x501b2e,_0x3a6eb3,_0x2fe1e3,_0x1f7f46);break;case _0x1c65('0x3'):this[_0x1c65('0x7d')](_0x2d729,_0x501b2e,_0x3a6eb3,_0x2fe1e3,_0x1f7f46);break;default:break;}},Window_SavefileList['prototype'][_0x1c65('0x137')]=function(_0x365764,_0x47ec08,_0x1db2c5,_0x4645d5,_0x5de931){const _0x58c484=Math[_0x1c65('0x30')](_0x365764[_0x1c65('0xaf')][_0x1c65('0x89')],$gameParty[_0x1c65('0x78')]()),_0x4385a9=Math[_0x1c65('0x30')](ImageManager[_0x1c65('0x142')],Math['floor'](_0x4645d5/_0x58c484));_0x47ec08=_0x47ec08+Math['round']((_0x4645d5-_0x58c484*_0x4385a9)/0x2);for(const _0x53d93a of _0x365764[_0x1c65('0xaf')]){this[_0x1c65('0xa8')](_0x53d93a[0x0],_0x53d93a[0x1],_0x47ec08,_0x1db2c5+0x1,_0x4385a9,_0x5de931-0x2),_0x47ec08+=_0x4385a9;}},ImageManager[_0x1c65('0xc7')]=VisuMZ['SaveCore']['Settings'][_0x1c65('0x64')]['SpriteWidth'],ImageManager[_0x1c65('0x8')]=VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')]['SaveMenu'][_0x1c65('0x18d')],Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x3a')]=function(_0x40e5af,_0x41130b,_0x1a1770,_0x351181,_0x2aad9a){const _0x1d8d3a=Math[_0x1c65('0x30')](_0x40e5af[_0x1c65('0x4a')]['length'],$gameParty['maxBattleMembers']()),_0x236775=ImageManager[_0x1c65('0xc7')];_0x41130b=_0x41130b+Math[_0x1c65('0x71')]((_0x351181-_0x1d8d3a*_0x236775)/0x2)+_0x236775/0x2,_0x1a1770=_0x1a1770+_0x2aad9a-0x8;for(const _0xeca042 of _0x40e5af[_0x1c65('0x4a')]){this[_0x1c65('0x12b')](_0xeca042[0x0],_0xeca042[0x1],_0x41130b,_0x1a1770),_0x41130b+=_0x236775;}},Window_SavefileList['prototype'][_0x1c65('0x7d')]=function(_0x32007b,_0x5ba7e5,_0x4195f2,_0xab198d,_0x27514e){if(!_0x32007b[_0x1c65('0x165')])return this[_0x1c65('0x3a')](_0x32007b,_0x5ba7e5,_0x4195f2,_0xab198d,_0x27514e);const _0x3ecc3b=Math['min'](_0x32007b[_0x1c65('0x165')][_0x1c65('0x89')],$gameParty['maxBattleMembers']()),_0xb4d996=ImageManager[_0x1c65('0x8')];_0x5ba7e5=_0x5ba7e5+Math['round']((_0xab198d-_0x3ecc3b*_0xb4d996)/0x2)+_0xb4d996/0x2,_0x4195f2=_0x4195f2+_0x27514e-0x8;for(const _0x4f6826 of _0x32007b['svbattlers']){this[_0x1c65('0xb6')](_0x4f6826,_0x5ba7e5,_0x4195f2),_0x5ba7e5+=_0xb4d996;}},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x77')]=function(_0x3ac86b,_0x4b5c02,_0xeb0d55,_0x2c4ae3,_0x76a69d,_0xe37013){if(_0x3ac86b==='')return;_0x4b5c02+=0x2,_0xeb0d55+=0x2,_0x2c4ae3-=0x4,_0x76a69d-=0x4;const _0x1276c7=ImageManager[_0x1c65('0x140')](_0x3ac86b),_0x3bec24=_0x1276c7[_0x1c65('0x11')],_0x58cc18=_0x1276c7[_0x1c65('0x190')],_0x4e9250=Math[_0x1c65('0x30')](_0x2c4ae3/_0x3bec24,_0x76a69d/_0x58cc18,_0xe37013?0x1:0x3e8),_0x3485b5=Math[_0x1c65('0xee')](_0x1276c7[_0x1c65('0x11')]*_0x4e9250),_0x185704=Math[_0x1c65('0xee')](_0x1276c7[_0x1c65('0x190')]*_0x4e9250);this[_0x1c65('0x164')][_0x1c65('0x15')](_0x1276c7,0x0,0x0,_0x3bec24,_0x58cc18,_0x4b5c02,_0xeb0d55,_0x3485b5,_0x185704);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0xfb')]=function(_0x1e2ea0,_0x57401e,_0x3a35ba,_0x24d44f,_0x2654fc,_0x2af161){if(_0x1e2ea0==='')return;_0x57401e+=0x2,_0x3a35ba+=0x2,_0x24d44f-=0x4,_0x2654fc-=0x4;const _0x1d06bd=ImageManager[_0x1c65('0x140')](_0x1e2ea0),_0x91a39c=_0x1d06bd['width'],_0x348a6b=_0x1d06bd[_0x1c65('0x190')],_0x3e4191=Math['min'](_0x24d44f/_0x91a39c,_0x2654fc/_0x348a6b,_0x2af161?0x1:0x3e8),_0x396ddd=Math[_0x1c65('0xee')](_0x1d06bd['width']*_0x3e4191),_0x5f1ed8=Math['ceil'](_0x1d06bd[_0x1c65('0x190')]*_0x3e4191);_0x57401e+=(_0x24d44f-_0x396ddd)/0x2,_0x3a35ba+=(_0x2654fc-_0x5f1ed8)/0x2,this[_0x1c65('0x164')][_0x1c65('0x15')](_0x1d06bd,0x0,0x0,_0x91a39c,_0x348a6b,_0x57401e,_0x3a35ba,_0x396ddd,_0x5f1ed8);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0xa7')]=function(_0x4318d3,_0x2a4fa0,_0x565a91,_0x441bec,_0x9a0794){if(_0x4318d3[_0x1c65('0xd4')]){if(_0x1c65('0x8e')!=='pYHVb')_0x9a0794=_0x9a0794||_0x1c65('0x195'),this[_0x1c65('0x147')](_0x4318d3[_0x1c65('0xd4')],_0x2a4fa0,_0x565a91,_0x441bec,_0x9a0794);else{function _0x326e46(){return this[_0x1c65('0x10d')](_0x374e44)?this[_0x1c65('0xbb')](_0x528e85):_0x2d993c[_0x1c65('0x32')][_0x1c65('0xec')][_0x1c65('0xbe')](this,_0x226679);}}}},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0xf4')]=function(_0xbf632b,_0x23a23f,_0x5f5dbc,_0x5d9064,_0x5b111d){if(_0xbf632b[_0x1c65('0x1d')]){if(_0x1c65('0x126')===_0x1c65('0x126')){_0x5b111d=_0x5b111d||'left';const _0x3faffc=this[_0x1c65('0x68')](_0xbf632b);this[_0x1c65('0x147')](_0x3faffc,_0x23a23f,_0x5f5dbc,_0x5d9064,_0x5b111d);}else{function _0x15126f(){this['x']=-0x1*_0x128824['windowPadding']();}}}},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x68')]=function(_0xb19d2a){const _0x3eae30=_0xb19d2a[_0x1c65('0x1d')],_0x1fd590=new Date(_0x3eae30);let _0x2eb459=_0x1c65('0x144');_0x2eb459=_0x2eb459[_0x1c65('0x74')](/\[YEAR\]/gi,'%1'),_0x2eb459=_0x2eb459[_0x1c65('0x74')](/\[MONTH\]/gi,'%2'),_0x2eb459=_0x2eb459[_0x1c65('0x74')](/\[DATE\]/gi,'%3'),_0x2eb459=_0x2eb459[_0x1c65('0x74')](/\[HOUR\]/gi,'%4'),_0x2eb459=_0x2eb459[_0x1c65('0x74')](/\[MINUTE\]/gi,'%5'),_0x2eb459=_0x2eb459['replace'](/\[SECOND\]/gi,'%6');let _0x2cd259=String(_0x1fd590['getFullYear']())[_0x1c65('0x109')]('')[_0x1c65('0x6e')]('​');return _0x2eb459['format'](_0x2cd259[_0x1c65('0x16c')](0x4,'0'),String(_0x1fd590[_0x1c65('0x0')]())[_0x1c65('0x16c')](0x2,'0'),String(_0x1fd590[_0x1c65('0x17e')]())['padStart'](0x2,'0'),String(_0x1fd590[_0x1c65('0xa4')]())[_0x1c65('0x16c')](0x2,'0'),String(_0x1fd590[_0x1c65('0xb1')]())['padStart'](0x2,'0'),String(_0x1fd590['getSeconds']())[_0x1c65('0x16c')](0x2,'0'));},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x120')]=function(_0x460be4,_0x463515,_0x2b7b2b,_0x521d55){if(_0x460be4['gold']===undefined)return;const _0x54c553=_0x460be4[_0x1c65('0x46')],_0x1e7e68=TextManager[_0x1c65('0x125')];Window_SavefileList[_0x1c65('0x72')]['drawCurrencyValue'][_0x1c65('0xbe')](this,_0x54c553,_0x1e7e68,_0x463515,_0x2b7b2b,_0x521d55);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0xe9')]=function(_0xb104d3,_0x9d0958,_0x53e67a,_0x7d0ac,_0x290ea6){if(_0xb104d3[_0x1c65('0xbf')]){const _0x3f1aab=this[_0x1c65('0x1c')](_0xb104d3[_0x1c65('0xbf')])[_0x1c65('0x11')];_0x290ea6=_0x290ea6||_0x1c65('0x195');if(_0x290ea6===_0x1c65('0x69'))_0x9d0958=_0x9d0958+_0x7d0ac-_0x3f1aab;else _0x290ea6===_0x1c65('0xa1')&&(_0x9d0958=_0x9d0958+(_0x7d0ac-_0x3f1aab)/0x2);this[_0x1c65('0x93')](_0xb104d3[_0x1c65('0xbf')],_0x9d0958,_0x53e67a,_0x7d0ac);}},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x27')]=function(_0x43d5c6,_0x5ebc7c){if(_0x43d5c6){const _0x5f24de=ImageManager['loadPicture'](_0x43d5c6[_0x1c65('0x192')]||'');_0x5f24de[_0x1c65('0x187')](this[_0x1c65('0x45')]['bind'](this,_0x43d5c6,_0x5ebc7c));}else{if(_0x1c65('0x23')==='Pevsk')this[_0x1c65('0x7')](this[_0x1c65('0x188')],_0x5ebc7c);else{function _0x2e93c6(){_0x194e06[_0x1c65('0xd7')]=![],_0xb7116d[_0x1c65('0xe5')](),_0xc578e9[_0x1c65('0x136')](_0x2fe3f1),this[_0x1c65('0x6f')](),_0x38d8eb['goto'](_0x2fa558);}}}},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x45')]=function(_0x21c31e,_0x58b2ac){const _0x102e32=this[_0x1c65('0xc')]();switch(_0x102e32){case'vertical':this[_0x1c65('0x11a')](_0x21c31e,_0x58b2ac);break;case _0x1c65('0x16e'):this[_0x1c65('0x1b')](_0x21c31e,_0x58b2ac);break;case _0x1c65('0x151'):this[_0x1c65('0x24')](_0x21c31e,_0x58b2ac);break;default:this[_0x1c65('0xff')](_0x21c31e,_0x58b2ac);break;}this[_0x1c65('0x18a')]();const _0x1b9e8c=_0x21c31e[_0x1c65('0x34')];this[_0x1c65('0x7')](_0x1b9e8c,_0x58b2ac);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x7')]=function(_0x16c3b4,_0x2f8412){const _0x79f8ba=this[_0x1c65('0xc')]();switch(_0x79f8ba){case _0x1c65('0x5c'):this[_0x1c65('0x7b')](_0x16c3b4,_0x2f8412);break;case _0x1c65('0x16e'):this[_0x1c65('0x6')](_0x16c3b4,_0x2f8412);break;case _0x1c65('0x151'):this[_0x1c65('0xfd')](_0x16c3b4,_0x2f8412);break;default:this[_0x1c65('0x10e')](_0x16c3b4,_0x2f8412);break;}},Window_SavefileList[_0x1c65('0x72')]['drawListStyleContents']=function(_0x304dad,_0x343a58){VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')]['SaveMenu'][_0x1c65('0x161')][_0x1c65('0xbe')](this,_0x304dad,_0x343a58);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x11a')]=function(_0x1c722d,_0x328619){VisuMZ['SaveCore'][_0x1c65('0x80')][_0x1c65('0x64')][_0x1c65('0x54')]['call'](this,_0x1c722d,_0x328619);},Window_SavefileList['prototype'][_0x1c65('0x1b')]=function(_0x1a0b95,_0x487062){VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x64')]['BoxContentsJS']['call'](this,_0x1a0b95,_0x487062);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x24')]=function(_0x50090a,_0x2df168){VisuMZ[_0x1c65('0x32')]['Settings'][_0x1c65('0x64')]['LargeContentsJS'][_0x1c65('0xbe')](this,_0x50090a,_0x2df168);},Window_SavefileList['prototype'][_0x1c65('0x10e')]=function(_0x2674ab,_0x39516f){VisuMZ['SaveCore'][_0x1c65('0x80')][_0x1c65('0x64')]['ListFileDataJS'][_0x1c65('0xbe')](this,_0x2674ab,_0x39516f);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x7b')]=function(_0x6f2af2,_0x39cc33){VisuMZ['SaveCore'][_0x1c65('0x80')]['SaveMenu'][_0x1c65('0x9a')][_0x1c65('0xbe')](this,_0x6f2af2,_0x39cc33);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0x6')]=function(_0x3b0d0a,_0x4f30f1){VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')][_0x1c65('0x64')][_0x1c65('0x13c')]['call'](this,_0x3b0d0a,_0x4f30f1);},Window_SavefileList[_0x1c65('0x72')][_0x1c65('0xfd')]=function(_0xa57ac3,_0x1adc36){VisuMZ[_0x1c65('0x32')][_0x1c65('0x80')]['SaveMenu'][_0x1c65('0x60')][_0x1c65('0xbe')](this,_0xa57ac3,_0x1adc36);};