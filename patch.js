import { applyPatch } from "json-joy/es6/json-patch";
import Ajv from "ajv";
import toSchema from "./schema/to.json" assert { type: "json" };
import patch from "./patch/from-to.patch.json" assert { type: "json" };

const ajv = new Ajv();

// TODO: Match notification/event schema to EB->CE (see PN)

const notification = {
  notificationId: "123",
  externalId: "T100",
  message: "hello",
};

// TODO: Can `add` use existing values??
// e.g. { "op": "add", "path": "/metadata/externalId", "value": "$.externalId" }

const { doc: event } = applyPatch(notification, patch, false);

// TODO: Catch runtime errors e.g. NOT_FOUND, others?
// TODO: Test runtime error catching

console.log(event);

// TODO: Move schema validation to unit test, assert on validate.errors

const validate = ajv.compile(toSchema);

const valid = validate(event);

if (!valid) console.log(validate.errors);

// TODO: How could we use Schema Registry as a form of Contract Testing (e.g. message pacts)?

// TODO: Add AsyncAPI and Backstage
