# Dynamic Values

The sample event contains two _dynamic_ values. Dynamic values are values in a JSON Patch document that are neither static nor derived from input via JSON Pointers. Dynamic values are typically computed at runtime.

The dyanmic values in the sample event are:

- ID - the event unique identifier e.g. `base64(countryCode:paymentId:time:type)`
- Time - the event's timestamp e.g. `new Date().toISOString()`

JSON Patch is not designed to support dynamic values, so we need devise a method for computing these values during the patch operation.

Here are some initial ideas for computing dynamic values during a patch:

- Add dynamic values to event post-patch
- Extend a JSON Patch library with these functions
- Use execution environment e.g. AWS Step Functions Intrinsic Functions, AWS Lambda Function
