import { applyPatch } from "json-joy/es6/json-patch";
import Ajv from "ajv";

import paymentCloudEvents from "./schema/payment.cloudevents.json" assert { type: "json" };
import paymentPatch from "./patch/payment.patch.json" assert { type: "json" };
import paymentNotification from "./data/payment-notification.json" assert { type: "json" };

const ajv = new Ajv();

const { doc: event } = applyPatch(paymentNotification, paymentPatch, false);

const validate = ajv.compile(paymentCloudEvents);

const valid = validate(event);

if (!valid) {
  console.error(validate.errors);
} else {
  console.log(event);
}
