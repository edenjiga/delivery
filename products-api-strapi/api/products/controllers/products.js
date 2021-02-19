"use strict";
const { sanitizeEntity } = require("strapi-utils");
const Big = require("big.js");

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    const entities = await strapi.services.products.find(ctx.query);

    return entities.map((entity) => {
      const { price = 0, discount } = entity;
      let finalPrice = price;
      let discountValue = 0;

      if (discount) {
        discountValue = new Big(price).times(discount).div(100).toNumber();
        finalPrice = new Big(price).minus(discountValue).toNumber();
      }

      return {
        ...sanitizeEntity(entity, { model: strapi.models.products }),
        finalPrice,
        discountValue,
      };
    });
  },

  async sold(ctx) {
    const products = ctx.request.body;

    const result = await Promise.all(
      products.map(async ({ soldUnits, id }) => {
        return strapi.query("products").model.updateOne(
          {
            _id: id,
          },
          {
            $inc: {
              unitsInStock: -soldUnits,
            },
          }
        );
      })
    );

    return result;
  },
};
