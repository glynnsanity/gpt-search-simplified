export interface LDDecisionResultType {
  ldFlagDecision: {
    reason: {
      kind: string;
    }
    value: string;
    variationIndex: number;
  };
  gptActivationDecision: {
    flag_name: string;
    relevance: number;
    reasoning: string;
    context_alignment: string;
  };
}