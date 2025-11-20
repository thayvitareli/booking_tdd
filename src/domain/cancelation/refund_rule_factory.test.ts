import { RefundRuleFactory } from "../cancelation/refund_rule_factory";
import { FullRefund } from "./full_refund";
import { NoRefund } from "./no_refund copy";
import { PartialRefund } from "./partial_refund";

describe("Refund Rule", () => {
  it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
    const refundRole = RefundRuleFactory.getRefundRule(10);

    expect(refundRole).toBeInstanceOf(FullRefund);
  });
  it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", () => {
    7;
    const refundRole = RefundRuleFactory.getRefundRule(5);

    expect(refundRole).toBeInstanceOf(PartialRefund);
  });
  it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
    const refundRole = RefundRuleFactory.getRefundRule(0);

    expect(refundRole).toBeInstanceOf(NoRefund);
  });
});
