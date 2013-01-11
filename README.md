#Dreamweaver Extension: HTMLinter
This tool is to clean up HTML files outputted by word processors namely Word and Wordperfect. It should go through a list of Regular Expressions to correct potential problems. We choose the Regular Expressions approach versus a hard coded one because it is highly extensible as it's just a matter of replacing a query in the Regular Expression folder to add or remove a feature. In case you'd rather have a hard coded extension, the functionality section explains how to do it in pseudo-code.

##Installation
![http://share.kyleneath.com/captures/ColorSnapper-20121020-135135.png](http://share.kyleneath.com/captures/ColorSnapper-20121020-135135.png)
From the **downloadable source code archives** button, you can obtain a zip file that could be unzipped into `\Adobe Dreamweaver CS[your version number]\configuration\Commands` folder. Restart Dreamweaver or hold `Ctrl` while clicking on the `Common` dropdown in the `Insert` panel and select `Reload Extension` if Dreamweaver is open. 

You may remove the `README.md`, `.gitignore` and `.gitattributes` file from the download afterwards.

##Regex Numbering Convention
**0000-0999** Regexes that cover unwanted attributes issues.

**1000-1999** Regexes that cover unwanted elements issues.

**2000-2999** Regexes that cover empty elements issues.

**3000-3999** Regexes that cover structure issues.

**4000-4999** Regexes that cover HTML entities issues.

##Roadmap
* //TODO: Progress bar with a cancel option
* //TODO: Generate a report of changes done on file
* //TODO: Make option to choose between all open documents or only current document

##Caution
Use caution if using this tool to convert your code, as this can sometimes yield unwanted results. Check your code carefully.

##Functionality

###Attribute cleaning
The attribute cleaning function removes all attributes that are extraneous from HTML elements. There are two methods of accomplishing this task:
* The whitelist method: Identify all attributes to keep and remove every other attribute.
* The blacklist method: Identify all attributes to remove and keep every other attribute.
As most HTML elements do not require any attributes, the whitelist method is the most appropriate to use. The whitelist for attribute cleaning is inTable 1.

###Whitelist for attribute cleaning.
ElementAttribute(s) to keep:
* &lt;a&gt;
 * href
 * name (?)
 * id (?)
* &lt;img&gt;
 * src
 * alt
* &lt;td&gt;, &lt;th&gt;
 * colspan
 * rowspan

Implementing the attribute cleaning functionality as a whitelist can be done in two ways:
* Element-by-element: 
 * Process the HTML document one element at a time. If the element is in the white list, remove all non-whitelisted attributes; if the element is not in the whitelist, remove all attributes. 

Code fragment 1 shows one implementation of element-by-element attribute cleaning.

Element type-by-element type: Process the HTML document one element type at a time. If an element type is in the white list, remove all non-whitelisted attributes for every element of that type in the HTML document; if an element type is not in the whitelist, remove all attributes for every element of that type in the HTML document.

Code fragment 2 shows one implementation of element type-by-element type attribute cleaning.

Element-by-element attribute cleaning pseudo-code.

For each element in HTML document
 If element in whitelist
  from = to = “”
  For each attribute-to-keep in element.attributes-to-keep
   from = from + (( [a-z]+=”[^”]+”)*)( (element.attributes-to-keep)=”[^”]+”)?
   to = to + $(attribute-to-keep.index × 3)
   from = &lt;element + from + &gt;
   to = &lt;element + to + &gt;
   s/from/to/
 Else
  s/&lt;element(( [a-z]+=”[^”]+”)*)&gt;/&lt;element&gt;/
 
Element type-by-element type attribute cleaning pseudo-code.

For each element in element list
 If element in whitelist
  from = to = “”
  For each attribute-to-keep in element.attributes-to-keep
   from = from + (( [a-z]+=”[^”]+”)*)( (element.attributes-to-keep)=”[^”]+”)?
   to = to + $(attribute-to-keep.index × 3)
   from = &lt;element + from + &gt;
   to = &lt;element + to + &gt;
   s/from/to/g
 Else
  s/&lt;element(( [a-z]+=”[^”]+”)*)&gt;/&lt;element&gt;/g

##Character entity conversion
The character entity conversion function converts all characters to their respective HTML entities when applicable. HTML entities are listed in [Appendix A.2 of the XHTML specifications]("http://www.w3.org/TR/xhtml1/"). There are two methods of accomplishing this task:
* Character-by-character: Process the HTML document one character at a time. For each character, if it is in the list of characters having an entity, replace the character by its entity.
* Entity-by-entity: Process the list of entities one entity at a time. For each entity, replace all occurrences of the characters associated with the entity with the entity in the HTML document.

As the list of entities is likely to always be shorter than the number of characters in an HTML document, the character-by-character method would result in many more operations than the entity-by-entity method.

Code fragment 3shows a model implementation of the entity-by-entity method.
Code fragment 3.

Entity-by-entity conversion of character entities pseudo-code.
For each entity in entity list
 s/entity.chars/entity.entity/g

##Empty element removal
The empty element removal function removes empty HTML elements that are left by the Word or WordPerfect HTML conversion routines. An empty element is an element that contains only whitespace characters or one or more elements containing only whitespace characters. There are 2 methods of accomplishing this task:
* Element-by-element: Process the HTML document element by element. For each element, if the element is empty, remove it.
* Document-at-once: Find all empty elements in the HTML document and remove them.

For each method, two implementations are available to deal with nested empty elements:
* Multi-pass: Remove nested empty elements first, with the number of passes needed being equal to the maximum depth of nesting occurring in the document. This is equivalent to changing the definition of an empty element to exclude elements containing one or more elements containing only whitespace characters.
* Single-pass: Remove empty elements, including all nested empty elements at once.
Sometimes the simplest solutions are the best. In this case, a multi-pass, document-at-once solution is the simplest to implement.

Code fragment 4 shows one implementation of multi-pass, document-at-once empty element removal.

Code fragment 4. Multi-pass, document-at-once empty element removal pseudo-code.

While m/<([a-z1-6]+)>\s*</$1>/
 s/<([a-z1-6]+)>\s*</$1>//g

##Unwanted Element cleaning
The element cleaning function removes all elements outside of W3C specifications. There are two methods of accomplishing this task:
* The whitelist method: Identify all elements to keep and remove every other attribute.
* The blacklist method: Identify all elements to remove and keep every other attribute.

As most HTML elements are known, the whitelist method is the most appropriate to use, since the possibilities of tag outside W3C specification could be infinite.
