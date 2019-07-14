<a name="module_URLDiff"></a>

## URLDiff

* [URLDiff](#module_URLDiff)
    * [.calcuateURLScore(primaryURL, secondaryURL)](#module_URLDiff.calcuateURLScore) ⇒ <code>Number</code>
    * [.sortByURL(referenceURL, arr, [minScore], [valueGetter])](#module_URLDiff.sortByURL) ⇒ <code>Array</code>

<a name="module_URLDiff.calcuateURLScore"></a>

### URLDiff.calcuateURLScore(primaryURL, secondaryURL) ⇒ <code>Number</code>
Calculate the likeness score of 2 URLs

**Kind**: static method of [<code>URLDiff</code>](#module_URLDiff)  
**Returns**: <code>Number</code> - The likeness score (0-1)  

| Param | Type | Description |
| --- | --- | --- |
| primaryURL | <code>String</code> | The reference URL |
| secondaryURL | <code>String</code> | URL to compare |

<a name="module_URLDiff.sortByURL"></a>

### URLDiff.sortByURL(referenceURL, arr, [minScore], [valueGetter]) ⇒ <code>Array</code>
Sort an array of URLs or items containing URLs by how they
score against a reference URL

**Kind**: static method of [<code>URLDiff</code>](#module_URLDiff)  
**Returns**: <code>Array</code> - Sorted and filtered results array  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| referenceURL | <code>String</code> |  | A URL to use as a reference |
| arr | <code>Array.&lt;Object&gt;</code> \| <code>Array.&lt;String&gt;</code> |  | An array of URLs or items containing URLs |
| [minScore] | <code>Number</code> | <code>0</code> | The minimum comparison score, filtering out  URL items that fall below it (default = 0) |
| [valueGetter] | <code>function</code> |  | A getter function that can help return  the value from an object or complex instance (defaults to returning the  array element) |

