///<reference path="../../rangy.d.ts"/>

import {ILanguage} from "./ILanguage";
import {IGrammarCheckerSettings} from "./IGrammarCheckerSettings";
import {IServiceSettings} from "./IServiceSettings";
import {Node as PMNode} from "@types/prosemirror-model";

export interface BGOptions {
    service ?: IServiceSettings;
    grammar?: IGrammarCheckerSettings;
}

export interface GrammarCheckerConstuctor{
    new (element: HTMLElement, serviceSettings : IServiceSettings, grammarCheckerSettings?: IGrammarCheckerSettings, editorWrapper?: IEditableWrapper):IGrammarChecker;
}

export interface BeyondGrammarModule{
    GrammarChecker : GrammarCheckerConstuctor;
    getThesaurusData(contextWindow : Window, $container : JQuery, $target:JQuery, isContextual : boolean ) : ThesaurusData;
    loadPwaMarkStyles(win : Window);
}

export interface INodeWrapper{
    node : PMNode;
    textContent : string;
}

//Interfaces from BeyondGrammar Core : 


export interface DictionaryEntry {
    Id : string;
    Word : string;
    Replacement ?: string;
}

export interface IGrammarCheckerConstructor{
    new ( element : HTMLElement, serviceSettings : IServiceSettings, grammarCheckerSettings ?: IGrammarCheckerSettings ): IGrammarChecker;
}

export interface IGrammarChecker {
    init() : Promise<void>;

    activate();
    deactivate();
    isActivated();

    checkAll(forceClearCache ?: boolean) : void;

    clearMarks(): void;
    reloadMarks(): void;

    setSettings(settings: IGrammarCheckerSettings): void;
    getSettings(): IGrammarCheckerSettings;

    getAvailableLanguages(): ILanguage[];
    getApplicationName() : string;
    getApplicationVersion() : string;
    getVersionedApplicationName() : string;
    getCopyrightUrl() : string;
    getBrandImageUrl() : string;

    addToDictionary( word : string, replacement ?: string ) : Promise<DictionaryEntry[]>;
    removeFromDictionary( id : string ) : Promise<any>;
    getDictionaryEntries() : Promise<DictionaryEntry[]>;
}

/*export class GrammarCheckerSettings {
    languageFilter ?: string[];
    languageIsoCode ?: string;
    checkGrammar ?: boolean;
    checkSpelling ?: boolean;
    checkStyle ?: boolean;
    showThesaurusByDoubleClick ?: boolean;
    showContextThesaurus ?: boolean;
    checkerIsEnabled ?: boolean;
    disableDictionary ?:boolean;
}*/

/*export interface ServiceSettings{
    sourcePath?: string;
    serviceUrl ?: string;
    userId ?: string;
    apiKey ?: string;
}*/

export interface Tag{
    startPos : number;
    endPos : number;
    hint : string;
    suggestions : string[];
    category : string;
    ruleId : string;
    text: string;
}

export interface TextAreaRange {
    underlay : HTMLElement;
    $underlay : JQuery;
    textarea : HTMLElement;
    $textarea : JQuery;

    selectionStart : number;
    selectionEnd : number
}

export interface ThesaurusData{
    textAreaRange ?: TextAreaRange;
    wordRange : RangyRange;
    isContextual : boolean;
    word : string;
    context ?: string;
    start ?: number;
    end ?: number;
}

/*
Implement this interface if you want to support a different type of editor, e.g. ProseMirror or CodeMirror or something else
 */
export interface IEditableWrapper {
    onShowThesaurus: (thesaurusData: ThesaurusData, contextWindow: Window)=>boolean;
    /*
    get the text from a specific element
     */
    getText(blockElement: HTMLElement):string;
    /*
    Clear all the marks from the text
     */
    clearMarks(skipIgnored : boolean): void;
    /*
    start bindings
     */
    bindEditable(): void;
    /*
    end bindings
     */
    unbindEditable(): void;

    /*
    start change events being logged
     */
    bindChangeEvents(): void;

    /*
    Stop change events being raised
     */
    unbindChangeEvents() : void;

    /*
    Get all block elements
     */
    getAllElements(): HTMLElement[];

    /*
    Apply the highlights to the specified block
     */
    applyHighlightsSingleBlock(elem: HTMLElement, text: string, tags: Tag[], checkAll: boolean): void;

    /*
    Remove all highlights that match this uid
     */
    onAddToDictionary(uid: string): void;

    /*
    Get the info for the specified highlight
     */
    getHighlightInfo(uid: string): HighlightInfo;
    
    updateAfterPaste(): void;
    /*
    This should be called when a block of text is changed. Usually a paragraph.
     */
    onBlockChanged: (block: HTMLElement)=> void;
    onPopupClose: ()=> void;
    onPopupDeferClose: ()=>void;
    onCheckRequired: ()=> void;
    onShowPopup: (uid:string, elem: Element)=>void;
    resetSpellCheck():void;
    restoreSpellCheck():void;
    /*
    Count the number of errors in the document
     */
    getCurrentErrorCount(): number;
    
    //applying user's choices
    /*
    Ignore the specified highlight
     */
    ignore(uid: string): void;
    /*
    Omit the specified highlight
     */
    omit(uid: string): void;
    /*
    Accept the specified highlight
     */
    accept(uid: string, suggestion: string):void;
    /*
    Apply the specified replacement to the word selected for the thesaurus
     */
    applyThesaurus( replacement : string ) : void;
}

export class HighlightInfo{
    public word: string;
    public category: string;
    public hint: string;
    public suggestions: string[];
}

