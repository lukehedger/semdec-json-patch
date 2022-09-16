import Ajv from "ajv";
import { applyPatch } from "json-joy/es6/json-patch";
import { ulid } from "ulid";

import paymentCloudEvents from "./schema/payment.cloudevents.json" assert { type: "json" };
import paymentPatch from "./patch/payment.patch.json" assert { type: "json" };
import paymentNotification from "./data/payment-notification.json" assert { type: "json" };

const ajv = new Ajv();

const { doc: event } = applyPatch(paymentNotification, paymentPatch, false);

event.id = ulid();

event.time = new Date().toISOString();

const validate = ajv.compile(paymentCloudEvents);

const valid = validate(event);

if (!valid) {
  console.error(validate.errors);
} else {
  console.log(event);
}
